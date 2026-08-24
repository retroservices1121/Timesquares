'use client';
import { useEffect, useRef, useState } from 'react';

type Props={onSelect:(rank:number)=>void};
const billboardNodes=['Plane.029','Plane.031','Plane.032','Plane.036','Cube.004','Cube.008','Cube.026','Cube.027','Cube.028','Cube.101','Plane.037','Cube.007','Cube.030','Cube.031','Cube.033','Cube.034','Cube.035','Cube.036','Cube.043','Cube.044','Cube.045','Cube.046','Cube.047','Cube.056','Cube.057','Cube.063','Cube.078','Cube.114','Cube.117','Cube.080'];

export default function BabylonSquare({onSelect}:Props){const canvas=useRef<HTMLCanvasElement>(null);const [status,setStatus]=useState('Loading the Square…');useEffect(()=>{let disposed=false;let cleanup=()=>{};(async()=>{
  const B=await import('@babylonjs/core');await import('@babylonjs/loaders/glTF');if(disposed||!canvas.current)return;
  const engine=new B.Engine(canvas.current,true,{preserveDrawingBuffer:true,stencil:true,adaptToDeviceRatio:true});engine.setHardwareScalingLevel(window.devicePixelRatio>1.5?1.35:1);
  const scene=new B.Scene(engine);scene.clearColor=new B.Color4(.004,.007,.014,1);scene.fogMode=B.Scene.FOGMODE_EXP2;scene.fogDensity=.0035;scene.fogColor=new B.Color3(.012,.02,.035);
  const camera=new B.ArcRotateCamera('camera',Math.PI/2,1.22,28,B.Vector3.Zero(),scene);camera.lowerBetaLimit=.7;camera.upperBetaLimit=1.48;camera.wheelPrecision=45;camera.panningSensibility=0;camera.attachControl(canvas.current,true);
  const hemi=new B.HemisphericLight('night',new B.Vector3(0,1,0),scene);hemi.intensity=.72;hemi.diffuse=new B.Color3(.52,.65,.8);hemi.groundColor=new B.Color3(.08,.06,.11);
  const glow=new B.GlowLayer('billboardGlow',scene,{blurKernelSize:22});glow.intensity=.35;
  try{
    const imported=await B.SceneLoader.ImportMeshAsync('', '/models/', 'timesquare-web.glb', scene);if(disposed)return;
    const roots=imported.meshes.filter(m=>!m.parent);const vectors=roots.length?roots[0].getHierarchyBoundingVectors(true):scene.getWorldExtends();const center=vectors.min.add(vectors.max).scale(.5);const extent=vectors.max.subtract(vectors.min);const radius=Math.max(extent.x,extent.y,extent.z);
    camera.setTarget(new B.Vector3(center.x,center.y*.62,center.z));camera.radius=radius*.72;camera.lowerRadiusLimit=radius*.38;camera.upperRadiusLimit=radius*1.05;
    billboardNodes.forEach((name,index)=>{const mesh=scene.getMeshByName(name);if(mesh){mesh.metadata={...(mesh.metadata||{}),rank:index+1};mesh.isPickable=true}});
    scene.onPointerObservable.add(info=>{if(info.type===B.PointerEventTypes.POINTERPICK){let mesh=info.pickInfo?.pickedMesh;while(mesh&&!mesh.metadata?.rank)mesh=mesh.parent as B.AbstractMesh|null;if(mesh?.metadata?.rank)onSelect(mesh.metadata.rank)}});
    setStatus('');
  }catch(error){console.error(error);setStatus('3D scene unavailable — open the leaderboard');}
  engine.runRenderLoop(()=>scene.render());const resize=()=>engine.resize();window.addEventListener('resize',resize);cleanup=()=>{window.removeEventListener('resize',resize);scene.dispose();engine.dispose()};
  })();return()=>{disposed=true;cleanup()};},[onSelect]);return <div className="babylon-stage"><canvas ref={canvas} className="babylon-canvas" aria-label="Interactive 3D Times Square billboard leaderboard"/>{status&&<div className="scene-loading" role="status"><i/><span>{status}</span></div>}</div>}
