'use client';
import { useState } from 'react';

const leaders = [
  { rank: 2, name: 'AURORA®', bid: '$8,420', className: 'aurora' },
  { rank: 1, name: 'VOIDLABS', bid: '$12,500', className: 'voidlabs' },
  { rank: 3, name: 'KINETIC', bid: '$6,180', className: 'kinetic' },
  { rank: 4, name: 'NOVA.FM', bid: '$4,900', className: 'nova' },
  { rank: 5, name: 'PIXEL.FUN', bid: '$3,740', className: 'pixel' },
];

export default function Home() {
  const [selected, setSelected] = useState(leaders[1]);
  return <main className="square-shell">
    <header className="topbar"><a className="brand" href="#">TIMESQUARE<span>.LOL</span></a><div className="live-pill"><i /> LIVE <strong>30</strong> BILLBOARDS</div><nav><a href="/leaderboard">LEADERBOARD</a><a href="/dashboard">DASHBOARD</a><a className="sign-in" href="/dashboard">SIGN IN ↗</a></nav></header>
    <section className="square-hud"><div><i/> THE SQUARE IS LIVE</div><strong>BIGGEST BID.<br/>BIGGEST BILLBOARD.</strong><span>Click any billboard to see who owns it.</span><a href="/dashboard/bid">TAKE A BILLBOARD ↗</a></section>
    <section className="city" aria-label="Interactive billboard square"><div className="sky-glow"/><div className="tower tower-left"><div className="windows"/></div><div className="tower tower-mid"><div className="windows"/></div><div className="tower tower-right"><div className="windows"/></div><div className="street street-left"/><div className="street street-right"/><div className="crosswalk"/><div className="scene-label">THE SQUARE<br/><span>DRAG TO EXPLORE · CLICK A BILLBOARD</span></div>
      <button className="billboard aurora" onClick={()=>setSelected(leaders[0])}><em>#2</em><small>THE NIGHT IS OURS</small><strong>AURORA</strong><span>MAKE YOUR OWN LIGHT</span></button>
      <button className="billboard voidlabs" onClick={()=>setSelected(leaders[1])}><em>#1</em><small>BUILD WHAT&apos;S NEXT</small><strong>VOID<br/>LABS</strong><span>THE FUTURE IS YOURS</span></button>
      <button className="billboard kinetic" onClick={()=>setSelected(leaders[2])}><em>#3</em><small>NEVER STILL</small><strong>KINETIC</strong><span>MOVE DIFFERENT</span></button>
      <button className="billboard nova" onClick={()=>setSelected(leaders[3])}><em>#4</em><strong>NOVA.FM</strong><span>HEAR THE UNHEARD</span></button>
      <button className="billboard pixel" onClick={()=>setSelected(leaders[4])}><em>#5</em><strong>PIXEL<br/>FUN</strong><span>PLAY FOREVER</span></button>
    </section>
    <aside className="rank-card"><div className="card-top"><span>CURRENT KING OF THE SQUARE</span><button aria-label="Close">×</button></div><div className="rank-row"><div className="rank-number">#{selected.rank}</div><div><h2>{selected.name}</h2><a href={`/advertiser/${selected.name.toLowerCase().replace(/[^a-z]/g,'')}`}>VISIT PROFILE ↗</a></div></div><div className="stats-row"><div><span>CURRENT BID</span><strong>{selected.bid}</strong></div><div><span>HELD FOR</span><strong>{selected.rank===1?'18h 42m':'6h 14m'}</strong></div></div><a className="outbid-btn" href="/dashboard/bid">OUTBID — {selected.rank===1?'$13,750':'$9,262'} <b>↗</b></a><p>Minimum bid is 10% above the current bid.</p></aside>
    <div className="ticker"><span>LIVE ACTIVITY</span><div><b>▲</b> AURORA® jumped to Billboard #2 for $8,420 <i>· 2m ago</i></div><a href="/leaderboard">VIEW ALL →</a></div>
  </main>;
}
