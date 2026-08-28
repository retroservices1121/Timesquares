'use client';

import {useEffect,useRef,useState} from 'react';

declare global { interface Window { Clerk?: any } }

export default function AuthControls(){
  const [signedIn,setSignedIn]=useState(false); const userButton=useRef<HTMLSpanElement>(null);
  useEffect(()=>{let cancelled=false; const boot=async()=>{for(let i=0;i<80&&!window.Clerk;i++)await new Promise(r=>setTimeout(r,100)); if(cancelled||!window.Clerk)return; await window.Clerk.load(); setSignedIn(Boolean(window.Clerk.user));}; boot(); return()=>{cancelled=true}},[]);
  useEffect(()=>{if(!signedIn||!window.Clerk||!userButton.current)return;const target=userButton.current;window.Clerk.mountUserButton(target,{appearance:{variables:{colorPrimary:'#d7ff35'}}});return()=>window.Clerk?.unmountUserButton(target)},[signedIn]);
  if(signedIn)return <span className="auth-signed-in"><a className="dashboard-link" href="/dashboard">DASHBOARD ↗</a><span className="clerk-user" ref={userButton}/></span>;
  return <a className="sign-in auth-button" href="https://accounts.timesquares.lol/sign-in?redirect_url=https%3A%2F%2Ftimesquares.lol%2Fdashboard">SIGN IN ↗</a>;
}

export async function clerkToken(){if(!window.Clerk?.session)return null;return window.Clerk.session.getToken()}

