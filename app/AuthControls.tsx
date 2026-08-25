'use client';

import {useEffect,useRef,useState} from 'react';

declare global { interface Window { Clerk?: any } }

export default function AuthControls(){
  const [ready,setReady]=useState(false); const [signedIn,setSignedIn]=useState(false); const userButton=useRef<HTMLDivElement>(null);
  useEffect(()=>{let cancelled=false; const boot=async()=>{for(let i=0;i<80&&!window.Clerk;i++)await new Promise(r=>setTimeout(r,100)); if(cancelled||!window.Clerk)return; await window.Clerk.load(); setSignedIn(Boolean(window.Clerk.user)); setReady(true); if(window.Clerk.user&&userButton.current)window.Clerk.mountUserButton(userButton.current,{appearance:{variables:{colorPrimary:'#d7ff35'}}});}; boot(); return()=>{cancelled=true;if(window.Clerk&&userButton.current)window.Clerk.unmountUserButton(userButton.current)}},[]);
  if(signedIn)return <div className="clerk-user" ref={userButton}/>;
  return <button className="sign-in auth-button" disabled={!ready} onClick={()=>window.Clerk?.openSignIn({fallbackRedirectUrl:'/dashboard'})}>{ready?'SIGN IN ↗':'SIGN IN'}</button>;
}

export async function clerkToken(){if(!window.Clerk?.session)return null;return window.Clerk.session.getToken()}
