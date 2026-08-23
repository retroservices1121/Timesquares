'use client';
import { useEffect, useRef } from 'react';

type Props={onSelect:(rank:number)=>void};
const featured=[
  {rank:1,name:'VOIDLABS',tag:'THE FUTURE IS YOURS',bg:'#08205f',accent:'#52a8ff'},
  {rank:2,name:'AURORA',tag:'MAKE YOUR OWN LIGHT',bg:'#562184',accent:'#ff70e6'},
  {rank:3,name:'KINETIC',tag:'MOVE DIFFERENT',bg:'#cbf52c',accent:'#0a0a0a'},
  {rank:4,name:'NOVA.FM',tag:'HEAR THE UNHEARD',bg:'#921f58',accent:'#ff83ad'},
  {rank:5,name:'PIXEL.FUN',tag:'PLAY FOREVER',bg:'#b42b55',accent:'#ffbc37'},
];
const supportingNames=['LAUNCH.XYZ','BUILDER.DEV','MONO','LOOP.AI','FORM','ORBIT','STACKED','NORTHSTAR','DAYBREAK','HYPERLINK','SIGNAL','MOTION','PRISM','ECHO','PARALLEL','NEON.HQ','FRAME','TOMORROW','MINT','SHIFT','ATLAS','TEMPO','VECTOR','LUMEN','LEVEL'];
const palette=[['#102d46','#5be7ff'],['#4a183f','#ff5ecf'],['#3b4311','#e0ff43'],['#4b2013','#ff8a3d'],['#17213e','#829eff']];
const ads=[...featured,...supportingNames.map((name,i)=>({rank:i+6,name,tag:i%2?'MAKE YOUR MARK':'LIVE IN THE SQUARE',bg:palette[i%palette.length][0],accent:palette[i%palette.length][1]}))];

export default function BabylonSquare({onSelect}:Props){const canvas=useRef<HTMLCanvasElement>(null);useEffect(()=>{let disposed=false;let cleanup=()=>{};(async()=>{
  const B=await import('@babylonjs/core');if(disposed||!canvas.current)return;
  const engine=new B.Engine(canvas.current,true,{preserveDrawingBuffer:true,stencil:true,adaptToDeviceRatio:true});
  const scene=new B.Scene(engine);scene.clearColor=new B.Color4(.008,.012,.025,1);scene.fogMode=B.Scene.FOGMODE_EXP2;scene.fogDensity=.013;scene.fogColor=new B.Color3(.018,.028,.055);
  const camera=new B.ArcRotateCamera('camera',Math.PI/2,-.08,58,new B.Vector3(0,11,3),scene);camera.lowerRadiusLimit=38;camera.upperRadiusLimit=72;camera.lowerBetaLimit=.85;camera.upperBetaLimit=1.5;camera.wheelPrecision=55;camera.panningSensibility=0;camera.attachControl(canvas.current,true);
  const hemi=new B.HemisphericLight('sky',new B.Vector3(0,1,0),scene);hemi.intensity=.32;hemi.diffuse=new B.Color3(.25,.37,.55);
  const streetLight=new B.PointLight('neon',new B.Vector3(0,12,3),scene);streetLight.diffuse=new B.Color3(.2,.55,1);streetLight.intensity=180;streetLight.range=55;
  const mat=(name:string,color:InstanceType<typeof B.Color3>)=>{const m=new B.PBRMaterial(name,scene);m.albedoColor=color;m.metallic=.58;m.roughness=.7;return m};
  const asphalt=mat('asphalt',new B.Color3(.025,.028,.034));const road=B.MeshBuilder.CreateGround('Broadway',{width:30,height:85},scene);road.material=asphalt;road.position.z=13;
  const sidewalk=mat('sidewalk',new B.Color3(.09,.09,.1));[-18,18].forEach((x,i)=>{const s=B.MeshBuilder.CreateBox('sidewalk'+i,{width:7,height:.5,depth:85},scene);s.position.set(x,.25,8);s.material=sidewalk});
  const yellow=mat('lane',new B.Color3(.7,.52,.09));for(let z=-24;z<48;z+=7){const l=B.MeshBuilder.CreateBox('lane',{width:.22,height:.03,depth:3.5},scene);l.position.set(0,.04,z);l.material=yellow}
  const white=mat('crosswalk',new B.Color3(.72,.74,.74));for(let x=-13;x<=13;x+=2.5){const stripe=B.MeshBuilder.CreateBox('crosswalk',{width:1.2,height:.035,depth:6},scene);stripe.position.set(x,.05,-4);stripe.material=white}
  const darkMats=[new B.Color3(.025,.035,.05),new B.Color3(.045,.04,.055),new B.Color3(.035,.05,.06)].map((c,i)=>mat('facade'+i,c));
  const makeBuilding=(x:number,z:number,w:number,h:number,d:number,mi:number)=>{const b=B.MeshBuilder.CreateBox('building',{width:w,height:h,depth:d},scene);b.position.set(x,h/2,z);b.material=darkMats[mi%3];
    const windowMat=new B.StandardMaterial('windows',scene);windowMat.emissiveColor=new B.Color3(.12,.25,.34);windowMat.diffuseColor=new B.Color3(.02,.03,.04);
    for(let y=3;y<h-2;y+=3.2)for(let wx=-w/2+1.4;wx<w/2-1;wx+=2.4){const win=B.MeshBuilder.CreatePlane('window',{width:1.15,height:1.05},scene);win.position.set(x+wx,y,z-d/2-.012);win.rotation.y=Math.PI;win.material=windowMat}
    return b};
  makeBuilding(-16,-11,15,34,12,0);makeBuilding(0,-17,17,48,13,1);makeBuilding(17,-10,16,39,13,2);makeBuilding(-24,7,10,28,13,1);makeBuilding(25,9,11,31,14,0);
  const addBillboard=(adIndex:number,x:number,y:number,z:number,w:number,h:number,ry=0)=>{const ad=ads[adIndex];const frame=B.MeshBuilder.CreateBox('frame',{width:w+.7,height:h+.7,depth:.45},scene);frame.position.set(x,y,z);frame.rotation.y=ry;frame.material=mat('frameMat',new B.Color3(.035,.04,.045));
    const plane=B.MeshBuilder.CreatePlane('billboard_'+String(ad.rank).padStart(2,'0'),{width:w,height:h},scene);plane.position.set(x,y,z-.24);plane.rotation.y=Math.PI+ry;plane.metadata={rank:ad.rank};
    const tex=new B.DynamicTexture('adTex',{width:1024,height:512},scene,false);const ctx=tex.getContext();ctx.fillStyle=ad.bg;ctx.fillRect(0,0,1024,512);ctx.fillStyle=ad.accent;ctx.font='bold 44px Arial';ctx.fillText('#'+ad.rank,44,70);ctx.font='900 132px Arial';ctx.fillText(ad.name,44,278);ctx.font='bold 30px monospace';ctx.fillText(ad.tag,48,362);ctx.strokeStyle=ad.accent;ctx.lineWidth=8;ctx.strokeRect(20,20,984,472);tex.update();
    const bm=new B.StandardMaterial('billboardMat'+ad.rank,scene);bm.diffuseTexture=tex;bm.emissiveTexture=tex;bm.emissiveColor=new B.Color3(.75,.75,.75);bm.disableLighting=true;plane.material=bm;
    const glow=new B.PointLight('adGlow'+ad.rank,new B.Vector3(x,y,z+2),scene);const c=B.Color3.FromHexString(ad.accent);glow.diffuse=c;glow.intensity=45;glow.range=18;return plane};
  addBillboard(0,0,25,-10.25,15,12);addBillboard(1,-16,18,-4.75,13,7);addBillboard(2,17,19,-3.25,14,7);addBillboard(3,-16,9,-4.75,9,4.5);addBillboard(4,17,10,-3.25,9,4.5);
  const secondary=[[-22,24,13.2,6.8,4],[-22,16,13.2,6.8,4],[22,25,14.2,7,4],[22,17,14.2,7,4],[-8,39,-10.2,5.5,3],[8,39,-10.2,5.5,3],[-8,34,-10.2,5.5,3],[8,34,-10.2,5.5,3],[-24,10,13.2,5,2.8],[24,10,14.2,5,2.8],[-16,27,-4.7,4.8,2.6],[17,28,-3.2,4.8,2.6],[-8,8,-10.2,4.5,2.4],[0,8,-10.2,4.5,2.4],[8,8,-10.2,4.5,2.4],[-24,5,13.2,4,2.2],[24,5,14.2,4,2.2],[-16,4,-4.7,4,2.2],[17,4,-3.2,4,2.2],[-9,4,-10.2,3.8,2],[-3,4,-10.2,3.8,2],[3,4,-10.2,3.8,2],[9,4,-10.2,3.8,2],[-24,30,13.2,4,2.2],[24,31,14.2,4,2.2]] as const;
  secondary.forEach((p,i)=>addBillboard(i+5,p[0],p[1],p[2],p[3],p[4]));
  for(let i=0;i<18;i++){const pole=B.MeshBuilder.CreateCylinder('lightPole',{height:6,diameter:.14},scene);pole.position.set(i%2?-13:13,3,-20+i*4.2);pole.material=darkMats[0];const bulb=new B.PointLight('streetLamp',new B.Vector3(pole.position.x,6,pole.position.z),scene);bulb.diffuse=new B.Color3(.65,.75,1);bulb.intensity=16;bulb.range=9}
  scene.onPointerObservable.add(info=>{if(info.type===B.PointerEventTypes.POINTERPICK){const rank=info.pickInfo?.pickedMesh?.metadata?.rank;if(rank)onSelect(rank)}});
  engine.runRenderLoop(()=>scene.render());const resize=()=>engine.resize();window.addEventListener('resize',resize);cleanup=()=>{window.removeEventListener('resize',resize);scene.dispose();engine.dispose()};
  })();return()=>{disposed=true;cleanup()};},[onSelect]);return <canvas ref={canvas} className="babylon-canvas" aria-label="Interactive 3D Times Square billboard leaderboard"/>}
