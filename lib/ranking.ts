export type RankedBid={id:string;amount:number;createdAt:string};
export const minimumTakeover=(current:number,increment=10)=>Math.ceil((current*(1+increment/100))/5)*5;
export const rankBids=(bids:RankedBid[])=>[...bids].sort((a,b)=>b.amount-a.amount||a.createdAt.localeCompare(b.createdAt)).map((bid,index)=>({...bid,rank:index+1,billboardId:index<36?`billboard_${String(index+1).padStart(2,'0')}`:null}));
export const isSafeAdvertiserUrl=(value:string)=>{try{const url=new URL(value);return ['http:','https:'].includes(url.protocol)&&!['localhost','127.0.0.1','0.0.0.0'].includes(url.hostname)}catch{return false}};
