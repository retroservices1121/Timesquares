'use client';
import { useCallback, useState } from 'react';
import BabylonSquare from './BabylonSquare';
const leaders=[{rank:1,name:'VOIDLABS',bid:'$12,500'},{rank:2,name:'AURORA®',bid:'$8,420'},{rank:3,name:'KINETIC',bid:'$6,180'},{rank:4,name:'NOVA.FM',bid:'$4,900'},{rank:5,name:'PIXEL.FUN',bid:'$3,740'},...['LAUNCH.XYZ','BUILDER.DEV','MONO','LOOP.AI','FORM','ORBIT','STACKED','NORTHSTAR','DAYBREAK','HYPERLINK','SIGNAL','MOTION','PRISM','ECHO','PARALLEL','NEON.HQ','FRAME','TOMORROW','MINT','SHIFT','ATLAS','TEMPO','VECTOR','LUMEN','LEVEL'].map((name,i)=>({rank:i+6,name,bid:`$${Math.max(250,3200-i*115).toLocaleString()}`}))];
export default function Home(){const [selected,setSelected]=useState(1);const pick=useCallback((rank:number)=>setSelected(rank),[]);const ad=leaders[selected-1];return <main className="square-shell babylon-page">
  <header className="topbar"><a className="brand" href="#">TIMESQUARE<span>.LOL</span></a><div className="live-pill"><i/> LIVE <strong>30</strong> BILLBOARDS</div><nav><a href="/leaderboard">LEADERBOARD</a><a href="/dashboard">DASHBOARD</a><a className="sign-in" href="/dashboard">SIGN IN ↗</a></nav></header>
  <BabylonSquare onSelect={pick}/>
  <section className="square-hud"><div><i/> 30 LIVE BILLBOARDS</div><strong>TOP 5 OWN<br/>THE SKYLINE.</strong><span>All 30 ranks are live · Drag to explore · Click any screen</span><a href="/dashboard/bid">TAKE A BILLBOARD ↗</a></section>
  <aside className="rank-card"><div className="card-top"><span>BILLBOARD #{ad.rank}</span><button aria-label="Close">×</button></div><div className="rank-row"><div className="rank-number">#{ad.rank}</div><div><h2>{ad.name}</h2><a href={`/advertiser/${ad.name.toLowerCase().replace(/[^a-z]/g,'')}`}>VISIT PROFILE ↗</a></div></div><div className="stats-row"><div><span>CURRENT BID</span><strong>{ad.bid}</strong></div><div><span>HELD FOR</span><strong>{ad.rank===1?'18h 42m':'6h 14m'}</strong></div></div><a className="outbid-btn" href="/dashboard/bid">OUTBID — {ad.rank===1?'$13,750':'$9,262'} <b>↗</b></a><p>Minimum bid is 10% above the current bid.</p></aside>
  <div className="scene-controls">DRAG TO ORBIT <b>·</b> SCROLL TO ZOOM <b>·</b> CLICK BILLBOARD</div>
  <div className="ticker"><span>LIVE ACTIVITY</span><div><b>▲</b> AURORA® jumped to Billboard #2 for $8,420 <i>· 2m ago</i></div><a href="/leaderboard">VIEW ALL →</a></div>
</main>}
