export const REAL_BILLBOARD_SLOT=49;
export const REAL_BILLBOARD_DEFAULTS={priceCents:75000,providerCostCents:50000,durationSeconds:15,timezone:'America/New_York',appearances:24};
export type CampaignSchedule={campaign_start_datetime:string;campaign_end_datetime:string;scheduled_minute:number;duration_seconds:number;timezone:string};
export function campaignTiming(c:CampaignSchedule,now=new Date()){
 const start=new Date(c.campaign_start_datetime),end=new Date(c.campaign_end_datetime),minute=Math.max(0,Math.min(59,c.scheduled_minute));
 if(now<start)return{state:'upcoming' as const,next:start,completed:0,remaining:24};
 if(now>=end)return{state:'completed' as const,next:null,completed:24,remaining:0};
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:c.timezone,minute:'2-digit',second:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));const localMinute=Number(parts.minute),second=Number(parts.second),live=localMinute===minute&&second<c.duration_seconds;
 const secondsUntil=live?0:((minute-localMinute+60)%60)*60-second||3600;const next=live?new Date(now.getTime()-second*1000):new Date(now.getTime()+secondsUntil*1000);
 const completed=Math.max(0,Math.min(24,Math.floor((now.getTime()-start.getTime())/3600000)+(live?0:1)));
 return{state:live?'live' as const:'scheduled' as const,next,completed,remaining:Math.max(0,24-completed)};
}
