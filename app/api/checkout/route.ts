import {env} from 'cloudflare:workers';
import {clerkEmail,verifyClerkRequest} from '../../../lib/clerk';
import {LEGAL_VERSIONS} from '../../../lib/legal';

const current=[12500,8420,6180,4900,3740,3200,3085,2970,2855,2740,2625,2510,2395,2280,2165,2050,1935,1820,1705,1590,1475,1360,1245,1130,1015,900,785,670,555,440];
export async function POST(request:Request){
  const claims=await verifyClerkRequest(request);if(!claims)return Response.json({error:'Sign in with Clerk to continue.'},{status:401});
  const accepted=await env.DB.prepare(`SELECT 1 accepted FROM terms_acceptances WHERE user_id=? AND terms_type='terms' AND version=?`).bind(claims.sub,LEGAL_VERSIONS.terms).first();if(!accepted)return Response.json({error:'Accept the current Terms before placing your first paid bid.',requiresTerms:true},{status:428});
  const body=await request.json() as {amount?:number;slot?:number;mode?:'exact'|'best'};const amount=Math.floor(Number(body.amount));const requestedSlot=Math.floor(Number(body.slot));const mode=body.mode==='best'?'best':'exact';if(!Number.isFinite(amount)||amount<1||requestedSlot<1||requestedSlot>30)return Response.json({error:'Invalid bid.'},{status:400});
  const projected=current.findIndex(value=>amount>=Math.ceil(value*1.1))+1;const slot=mode==='best'?(projected||30):requestedSlot;const minimum=Math.ceil(current[slot-1]*1.1);if(amount<minimum)return Response.json({error:`Minimum for Billboard ${slot} is $${minimum.toLocaleString()}.`},{status:400});
  const apiKey=process.env.DODO_PAYMENTS_API_KEY,productId=process.env.DODO_PAYMENTS_PRODUCT_ID;if(!apiKey||!productId)return Response.json({error:'Checkout is ready, but Dodo Payments keys still need to be added.'},{status:503});
  const email=await clerkEmail(claims.sub);const origin=new URL(request.url).origin;const intentId=crypto.randomUUID();
  await env.DB.prepare('INSERT INTO checkout_intents (id, clerk_user_id, email, requested_slot, assigned_slot, mode, amount_cents, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(intentId,claims.sub,email,requestedSlot,slot,mode,amount*100,'pending',new Date().toISOString()).run();
  const checkout=await fetch(`${process.env.DODO_PAYMENTS_API_BASE||'https://live.dodopayments.com'}/checkouts`,{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({product_cart:[{product_id:productId,quantity:1,amount:amount*100}],customer:email?{email}:{},return_url:`${origin}/dashboard/bid?status=success&slot=${slot}`,cancel_url:`${origin}/dashboard/bid?slot=${requestedSlot}`,metadata:{intent_id:intentId,clerk_user_id:claims.sub,assigned_slot:String(slot),requested_slot:String(requestedSlot),mode,amount_cents:String(amount*100)}})});
  const result=await checkout.json() as {checkout_url?:string;session_id?:string;message?:string};if(!checkout.ok||!result.checkout_url)return Response.json({error:result.message||'Unable to start checkout.'},{status:502});
  await env.DB.prepare('UPDATE checkout_intents SET checkout_session_id = ? WHERE id = ?').bind(result.session_id||null,intentId).run();return Response.json({url:result.checkout_url,slot});
}
