'use client';
import { useCallback, useState } from 'react';
import BabylonSquare from './BabylonSquare';
import RealWorldPromo from './RealWorldPromo';
import AuthControls from './AuthControls';
import {advertisers,advertiserSlug,minimumBid,BILLBOARD_COUNT} from './data';
const leaders=advertisers.map(([name,bid],index)=>({rank:index+1,name,bid}));
export default function Home(){const [selected,setSelected]=useState(1);const [hudOpen,setHudOpen]=useState(true);const [cardOpen,setCardOpen]=useState(true);const pick=useCallback((rank:number)=>{setSelected(rank);setCardOpen(true)},[]);const ad=leaders[selected-1],nextBid=minimumBid(ad.bid),isReal=selected===49;return <main className="square-shell babylon-page"><RealWorldPromo/>
  <header className="topbar"><a className="brand" href="#">TIMESQUARES<span>.LOL</span></a><div className="live-pill"><i/> LIVE <strong>{BILLBOARD_COUNT}</strong> BILLBOARDS</div><nav><a href="/">THE SQUARE</a><a href="/leaderboard">LEADERBOARD</a><a href="/real-times-square">MAKE IT TO TIMES SQUARE</a><AuthControls/></nav></header>
  <BabylonSquare onSelect={pick}/>
  {hudOpen&&<section className="square-hud"><button className="hud-close" aria-label="Close introduction" onClick={()=>setHudOpen(false)}>×</button><div><i/> {BILLBOARD_COUNT} LIVE BILLBOARDS</div><strong>CHOOSE YOUR SCREEN.</strong><span>Click any billboard to see its owner, current price, and the minimum bid required to take that exact location.</span><a href="/dashboard/bid">BROWSE BILLBOARDS ↗</a></section>}
  {cardOpen&&<aside className="rank-card"><div className="card-top"><span>BILLBOARD SLOT {String(ad.rank).padStart(2,'0')}</span><button aria-label="Close billboard details" onClick={()=>setCardOpen(false)}>×</button></div><div className="rank-row"><div className="rank-number">{String(ad.rank).padStart(2,'0')}</div><div><h2>{isReal?'REAL TIMES SQUARE':ad.name}</h2>{!isReal&&<a href={`/advertiser/${advertiserSlug(ad.name)}`}>VIEW PUBLIC PROFILE ↗</a>}</div></div><div className="stats-row"><div><span>{isReal?'PACKAGE':'CURRENT BID'}</span><strong>${isReal?'750':ad.bid.toLocaleString()}</strong></div><div><span>TYPE</span><strong>{isReal?'PHYSICAL + VIRTUAL':ad.rank<=5?'ICONIC':'STREET'}</strong></div></div><a className="outbid-btn" data-fast-goal="billboard_selected" data-fast-goal-slot={ad.rank} href={isReal?'/real-times-square':`/dashboard/bid?slot=${ad.rank}&amount=${nextBid}`}>{isReal?'BOOK BILLBOARD #49 — $750':`BID ON THIS SCREEN — $${nextBid.toLocaleString()}`} <b>↗</b></a><p>{isReal?'15 seconds every hour for 24 hours in Times Square and on Timesquares.lol.':'View the current advertiser or bid to take this exact screen.'}</p></aside>}
  <div className="scene-controls">WASD / ARROWS TO WALK <b>·</b> DRAG TO LOOK <b>·</b> CLICK BILLBOARD</div>
  <footer className="ticker"><span>LIVE ACTIVITY</span><div><b>▲</b> All {BILLBOARD_COUNT} billboard slots now open at $2</div><nav aria-label="Legal"><a href="/terms">TERMS</a><a href="/privacy">PRIVACY</a><a href="/advertising-rules">AD RULES</a></nav><a href="/leaderboard">VIEW ALL →</a></footer>
</main>}

