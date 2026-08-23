'use client';
import { useState } from 'react';

const leaders=[
  {rank:1,name:'VOIDLABS',bid:'$12,500',tone:'void-ad',kicker:"BUILD WHAT'S NEXT",line:'THE FUTURE IS YOURS'},
  {rank:2,name:'AURORA®',bid:'$8,420',tone:'aurora-ad',kicker:'THE NIGHT IS OURS',line:'MAKE YOUR OWN LIGHT'},
  {rank:3,name:'KINETIC',bid:'$6,180',tone:'kinetic-ad',kicker:'NEVER STILL',line:'MOVE DIFFERENT'},
  {rank:4,name:'NOVA.FM',bid:'$4,900',tone:'nova-ad',kicker:'TUNE BEYOND',line:'HEAR THE UNHEARD'},
  {rank:5,name:'PIXEL.FUN',bid:'$3,740',tone:'pixel-ad',kicker:'PRESS START',line:'PLAY FOREVER'},
];

function Ad({index,onPick,className='' }:{index:number;onPick:(index:number)=>void;className?:string}){const ad=leaders[index];return <button className={`mounted-ad ${ad.tone} ${className}`} onClick={()=>onPick(index)} aria-label={`View ${ad.name}, rank ${ad.rank}`}><em>#{ad.rank}</em><small>{ad.kicker}</small><strong>{ad.name}</strong><span>{ad.line}</span></button>}

export default function Home(){const [selected,setSelected]=useState(0);const ad=leaders[selected];return <main className="square-shell city-first">
  <header className="topbar"><a className="brand" href="#">TIMESQUARE<span>.LOL</span></a><div className="live-pill"><i/> LIVE <strong>30</strong> BILLBOARDS</div><nav><a href="/leaderboard">LEADERBOARD</a><a href="/dashboard">DASHBOARD</a><a className="sign-in" href="/dashboard">SIGN IN ↗</a></nav></header>
  <section className="urban-scene" aria-label="Timesquare billboard leaderboard">
    <div className="night-haze"/><div className="far-tower far-one"/><div className="far-tower far-two"/>
    <div className="building building-west"><div className="roof-gear"/><div className="facade-windows"/><Ad index={1} onPick={setSelected} className="ad-west-main"/><Ad index={4} onPick={setSelected} className="ad-west-low"/><div className="storefront"><i/><i/><i/><span>WEST PLAZA</span></div></div>
    <div className="building building-center"><div className="spire"/><div className="facade-windows"/><Ad index={0} onPick={setSelected} className="ad-center-main"/><div className="vertical-sign">TIMESQUARE<span>.LOL</span></div><div className="storefront"><i/><i/><i/><i/><span>THE SQUARE</span></div></div>
    <div className="building building-east"><div className="roof-gear"/><div className="facade-windows"/><Ad index={2} onPick={setSelected} className="ad-east-main"/><Ad index={3} onPick={setSelected} className="ad-east-low"/><div className="storefront"><i/><i/><i/><span>EAST MARKET</span></div></div>
    <div className="avenue"><div className="lane-lines"/><div className="zebra zebra-left"/><div className="zebra zebra-right"/></div>
    <div className="street-glow glow-one"/><div className="street-glow glow-two"/><div className="crowd"><i/><i/><i/><i/><i/><i/><i/></div>
  </section>
  <section className="square-hud"><div><i/> LIVE LEADERBOARD</div><strong>BID MORE.<br/>MOVE UP THE SQUARE.</strong><span>Billboard size and position represent rank.</span><a href="/dashboard/bid">TAKE A BILLBOARD ↗</a></section>
  <aside className="rank-card"><div className="card-top"><span>BILLBOARD #{ad.rank}</span><button aria-label="Close">×</button></div><div className="rank-row"><div className="rank-number">#{ad.rank}</div><div><h2>{ad.name}</h2><a href={`/advertiser/${ad.name.toLowerCase().replace(/[^a-z]/g,'')}`}>VISIT PROFILE ↗</a></div></div><div className="stats-row"><div><span>CURRENT BID</span><strong>{ad.bid}</strong></div><div><span>HELD FOR</span><strong>{ad.rank===1?'18h 42m':'6h 14m'}</strong></div></div><a className="outbid-btn" href="/dashboard/bid">OUTBID — {ad.rank===1?'$13,750':'$9,262'} <b>↗</b></a><p>Minimum bid is 10% above the current bid.</p></aside>
  <div className="ticker"><span>LIVE ACTIVITY</span><div><b>▲</b> AURORA® jumped to Billboard #2 for $8,420 <i>· 2m ago</i></div><a href="/leaderboard">VIEW ALL →</a></div>
</main>}
