'use client';

import {useEffect,useRef,useState} from 'react';

declare global { interface Window { Clerk?: any } }

export default function AuthControls(){
  const [signedIn,setSignedIn]=useState<boolean|null>(null); const userButton=useRef<HTMLSpanElement>(null);
  useEffect(()=>{let cancelled=false; const boot=async()=>{try{for(let i=0;i<80&&!window.Clerk;i++)await new Promise(r=>setTimeout(r,100));if(cancelled)return;if(!window.Clerk){setSignedIn(false);return}await window.Clerk.load();if(!cancelled)setSignedIn(Boolean(window.Clerk.user))}catch(error){console.warn('Account controls unavailable',error);if(!cancelled)setSignedIn(false)}};boot();return()=>{cancelled=true}},[]);
  useEffect(()=>{if(!signedIn||!window.Clerk||!userButton.current)return;const target=userButton.current;try{window.Clerk.mountUserButton(target,{appearance:{variables:{colorPrimary:'#d7ff35'}}})}catch(error){console.warn('Account menu unavailable',error)}return()=>{try{window.Clerk?.unmountUserButton(target)}catch{}}},[signedIn]);
  return <span className="auth-signed-in">{signedIn===true?<><a className="dashboard-link" href="/dashboard">DASHBOARD ↗</a><span className="clerk-user" ref={userButton}/></>:signedIn===false?<a className="sign-in auth-button" href="https://accounts.timesquares.lol/sign-in?redirect_url=https%3A%2F%2Ftimesquares.lol%2Fdashboard">SIGN IN ↗</a>:null}</span>;
}

export async function clerkToken(){if(!window.Clerk?.session)return null;return window.Clerk.session.getToken()}

