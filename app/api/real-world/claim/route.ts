import {env} from 'cloudflare:workers';
import {verifyClerkRequest} from '../../../../lib/clerk';
import {LEGAL_VERSIONS} from '../../../../lib/legal';
const dateOnly=(value:string)=>/^\d{4}-\d{2}-\d{2}$/.test(value);
export async function POST(request:Request){
  const user=await verifyClerkRequest(request);if(!user)return Response.json({error:'Unauthorized'},{status:401});
  const accepted=await env.DB.prepare(`SELECT 1 accepted FROM terms_acceptances WHERE user_id=? AND terms_type='real_times_square_reward_terms' AND version=?`).bind(user.sub,LEGAL_VERSIONS.real_times_square_reward_terms).first();
  if(!accepted)return Response.json({error:'Accept the current Real Times Square Reward Terms before claiming.',requiresRewardTerms:true},{status:428});
  const flag=await env.DB.prepare(`SELECT value FROM platform_settings WHERE key='real_world_claiming_enabled'`).first<{value:string}>();if(flag?.value!=='true')return Response.json({error:'Claiming is not available yet.'},{status:403});
  const body=await request.json() as Record<string,any>;const reward=await env.DB.prepare(`SELECT r.*,t.minimum_lead_days FROM real_world_rewards r JOIN real_world_reward_types t ON t.id=r.reward_type_id WHERE r.id=? AND r.user_id=?`).bind(body.rewardId,user.sub).first<Record<string,any>>();
  if(!reward)return Response.json({error:'Reward not found.'},{status:404});if(!['earned','creative_required','rejected'].includes(reward.status))return Response.json({error:'This reward has already been submitted.'},{status:409});
  const dates=[body.requestedDate1,body.requestedDate2,body.requestedDate3];if(dates.some(value=>!dateOnly(value)))return Response.json({error:'Choose three valid preferred dates.'},{status:400});const min=new Date();min.setUTCHours(0,0,0,0);min.setUTCDate(min.getUTCDate()+Number(reward.minimum_lead_days));if(dates.some(value=>new Date(`${value}T00:00:00Z`)<min))return Response.json({error:`Requested dates must be at least ${reward.minimum_lead_days} days away.`},{status:400});
  const headline=String(body.headline||'').trim();if(headline.length>80)return Response.json({error:'Keep the headline under 80 characters.'},{status:400});const now=new Date().toISOString(),creativeId=crypto.randomUUID();
  await env.DB.batch([env.DB.prepare(`INSERT INTO real_world_creatives (id,advertiser_id,reward_id,file_url,headline,destination_url,brand_name,domain,background_color,text_alignment,font_size,template,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, 'submitted',?,?)`).bind(creativeId,user.sub,reward.id,body.fileUrl||null,headline,body.destinationUrl||null,body.brandName||null,body.domain||null,body.backgroundColor||'#d7ff35',body.textAlignment||'left',Math.min(96,Math.max(24,Number(body.fontSize)||64)),['bold','minimal','product'].includes(body.template)?body.template:'bold',now,now),env.DB.prepare(`UPDATE real_world_rewards SET creative_id=?,requested_date_1=?,requested_date_2=?,requested_date_3=?,status='submitted',updated_at=? WHERE id=? AND user_id=?`).bind(creativeId,...dates,now,reward.id,user.sub)]);
  return Response.json({ok:true,rewardId:reward.id,creativeId});
}
