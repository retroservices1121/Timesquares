'use client';
import { useCallback, useState } from 'react';
import BabylonSquare from './BabylonSquare';
import RealWorldPromo from './RealWorldPromo';
import AuthControls from './AuthControls';
import {advertisers,advertiserSlug,minimumBid} from './data';
const leaders=advertisers.map(([name,bid],index)=>({rank:index+1,name,bid}));
export default function Home(){const [selected,setSelected]=useState(1);const [hudOpen,setHudOpen]=useState(true);const [cardOpen,setCardOpen]=useState(true);const pick=useCallback((rank:number)=>{setSelected(rank);setCardOpen(true)},[]);const ad=leaders[selected-1],nextBid=minimumBid(ad.bid);return <main className="square-shell babylon-page"><RealWorldPromo/>
  <header className="topbar"><a className="brand" href="#">TIMESQUARES<span>.LOL</span></a><div className="live-pill"><i/> LIVE <strong>30</strong> BILLBOARDS</div><nav><a href="/">THE SQUARE</a><a href="/leaderboard">LEADERBOARD</a><a href="/real-times-square">MAKE IT TO TIMES SQUARE</a><AuthControls/></nav></header>
  <BabylonSquare onSelect={pick}/>
  {hudOpen&&<section className="square-hud"><button className="hud-close" aria-label="Close introduction" onClick={()=>setHudOpen(false)}>×</button><div><i/> 30 LIVE BILLBOARDS</div><strong>CHOOSE YOUR SCREEN.</strong><span>Click any billboard to see its owner, current price, and the minimum bid required to take that exact location.</span><a href="/dashboard/bid">BROWSE BILLBOARDS ↗</a></section>}
  {cardOpen&&<aside className="rank-card"><div className="card-top"><span>BILLBOARD SLOT {String(ad.rank).padStart(2,'0')}</span><button aria-label="Close billboard details" onClick={()=>setCardOpen(false)}>×</button></div><div className="rank-row"><div className="rank-number">{String(ad.rank).padStart(2,'0')}</div><div><h2>{ad.name}</h2><a href={`/advertiser/${advertiserSlug(ad.name)}`}>VIEW PUBLIC PROFILE ↗</a></div></div><div className="stats-row"><div><span>CURRENT BID</span><strong>${ad.bid.toLocaleString()}</strong></div><div><span>VISIBILITY</span><strong>{ad.rank<=5?'ICONIC':'STREET'}</strong></div></div><a className="outbid-btn" data-fast-goal="billboard_selected" data-fast-goal-slot={ad.rank} href={`/dashboard/bid?slot=${ad.rank}&amount=${nextBid}`}>BID ON THIS SCREEN — ${nextBid.toLocaleString()} <b>↗</b></a><p>View the current advertiser or bid to take this exact screen.</p></aside>}
  <div className="scene-controls">WASD / ARROWS TO WALK <b>·</b> DRAG TO LOOK <b>·</b> CLICK BILLBOARD</div>
  <div className="ticker"><span>LIVE ACTIVITY</span><div><b>▲</b> AURORA® took Billboard Slot 02 for $8,420 <i>· 2m ago</i></div><a href="/leaderboard">VIEW ALL →</a></div>
</main>}
