import {env} from 'cloudflare:workers';
import {verifyClerkRequest} from '../../../../lib/clerk';
import {requireAdmin} from '../../../../lib/admin';
export async function GET(request:Request){const user=await verifyClerkRequest(request);if(!user)return new Response('Unauthorized',{status:401});const key=new URL(request.url).searchParams.get('key')||'';if(!key.startsWith(`real-world/${user.sub}/`)&&!await requireAdmin(request))return new Response('Forbidden',{status:403});const object=await env.FILES.get(key);if(!object)return new Response('Not found',{status:404});return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'application/octet-stream','Cache-Control':'private, max-age=3600'}})}
