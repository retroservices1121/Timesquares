'use client';
import { useEffect, useRef, useState } from 'react';

type Props={onSelect:(rank:number)=>void};
const billboardNodes=['Plane.029','Plane.031','Plane.032','Plane.036','Cube.004','Cube.008','Cube.026','Cube.027','Cube.028','Cube.101','Plane.037','Cube.007','Cube.030','Cube.031','Cube.033','Cube.034','Cube.035','Cube.036','Cube.043','Cube.044','Cube.045','Cube.046','Cube.047','Cube.056','Cube.057','Cube.063','Cube.078','Cube.114','Cube.117','Cube.080'];
const featured=[['VOIDLABS','THE FUTURE IS YOURS','#071b52','#62b8ff'],['AURORA','MAKE YOUR OWN LIGHT','#421465','#ff78e8'],['KINETIC','MOVE DIFFERENT','#cdeb34','#111111'],['NOVA.FM','HEAR THE UNHEARD','#76183f','#ff75aa'],['PIXEL.FUN','PLAY FOREVER','#9e234d','#ffc240']] as const;

export default function BabylonSquare({onSelect}:Props){const canvas=useRef<HTMLCanvasElement>(null);const [status,setStatus]=useState('Loading the Square…');useEffect(()=>{let disposed=false;let cleanup=()=>{};(async()=>{
  const B=await import('@babylonjs/core');await import('@babylonjs/loaders/glTF');if(disposed||!canvas.current)return;
  const engine=new B.Engine(canvas.current,true,{preserveDrawingBuffer:true,stencil:true,adaptToDeviceRatio:true});engine.setHardwareScalingLevel(window.devicePixelRatio>1.5?1.35:1);
  const scene=new B.Scene(engine);scene.clearColor=new B.Color4(.004,.007,.014,1);scene.fogMode=B.Scene.FOGMODE_EXP2;scene.fogDensity=.0035;scene.fogColor=new B.Color3(.012,.02,.035);
  const camera=new B.ArcRotateCamera('camera',Math.PI/2,1.36,28,B.Vector3.Zero(),scene);camera.lowerBetaLimit=.62;camera.upperBetaLimit=1.54;camera.wheelPrecision=9;camera.pinchPrecision=12;camera.useNaturalPinchZoom=true;camera.panningSensibility=95;camera.attachControl(canvas.current,true);
  const hemi=new B.HemisphericLight('night',new B.Vector3(0,1,0),scene);hemi.intensity=.72;hemi.diffuse=new B.Color3(.52,.65,.8);hemi.groundColor=new B.Color3(.08,.06,.11);
  const glow=new B.GlowLayer('billboardGlow',scene,{blurKernelSize:22});glow.intensity=.35;
  try{
    const imported=await B.SceneLoader.ImportMeshAsync('', '/models/', 'timesquare-web.glb', scene);if(disposed)return;
    const roots=imported.meshes.filter(m=>!m.parent);const vectors=roots.length?roots[0].getHierarchyBoundingVectors(true):scene.getWorldExtends();const center=vectors.min.add(vectors.max).scale(.5);const extent=vectors.max.subtract(vectors.min);const radius=Math.max(extent.x,extent.y,extent.z);
    camera.setTarget(new B.Vector3(center.x,vectors.min.y+extent.y*.1,center.z+extent.z*.05));camera.radius=radius*.4;camera.lowerRadiusLimit=radius*.02;camera.upperRadiusLimit=radius*1.25;camera.inertia=.72;
    const placements=[{x:0,y:.34,w:.25,h:.19},{x:-.24,y:.28,w:.19,h:.135},{x:.24,y:.28,w:.19,h:.135},{x:-.4,y:.18,w:.14,h:.1},{x:.4,y:.18,w:.14,h:.1}];
    placements.forEach((p,index)=>{const [name,tag,bg,fg]=featured[index];const frame=B.MeshBuilder.CreateBox(`billboard_frame_0${index+1}`,{width:extent.x*p.w*1.04,height:extent.y*p.h*1.07,depth:extent.z*.012},scene);frame.position.set(center.x+extent.x*p.x,vectors.min.y+extent.y*p.y,center.z+extent.z*.47);const fm=new B.StandardMaterial(`frame_${index+1}`,scene);fm.diffuseColor=new B.Color3(.015,.02,.025);frame.material=fm;
      const plane=B.MeshBuilder.CreatePlane(`billboard_0${index+1}`,{width:extent.x*p.w,height:extent.y*p.h,sideOrientation:B.Mesh.DOUBLESIDE},scene);plane.position.set(frame.position.x,frame.position.y,frame.position.z+extent.z*.008);plane.rotation.y=Math.PI;plane.metadata={rank:index+1};plane.isPickable=true;
      const tex=new B.DynamicTexture(`featured_${index+1}`,{width:1024,height:512},scene,false);const ctx=tex.getContext();ctx.fillStyle=bg;ctx.fillRect(0,0,1024,512);ctx.strokeStyle=fg;ctx.lineWidth=12;ctx.strokeRect(18,18,988,476);ctx.fillStyle=fg;ctx.font='900 52px Arial';ctx.fillText(`#${index+1}`,48,82);ctx.font='900 130px Arial';ctx.fillText(name,48,286);ctx.font='bold 30px monospace';ctx.fillText(tag,52,382);tex.update();const bm=new B.StandardMaterial(`featured_material_${index+1}`,scene);bm.diffuseTexture=tex;bm.emissiveTexture=tex;bm.emissiveColor=B.Color3.White();bm.disableLighting=true;bm.backFaceCulling=false;plane.material=bm;});
    billboardNodes.forEach((name,index)=>{const mesh=scene.getMeshByName(name);if(mesh){mesh.metadata={...(mesh.metadata||{}),rank:index+1};mesh.isPickable=true}});
    scene.onPointerObservable.add(info=>{if(info.type===B.PointerEventTypes.POINTERPICK){let mesh=info.pickInfo?.pickedMesh;while(mesh&&!mesh.metadata?.rank)mesh=mesh.parent as B.AbstractMesh|null;if(mesh?.metadata?.rank)onSelect(mesh.metadata.rank)}});
    setStatus('');
  }catch(error){console.error(error);setStatus('3D scene unavailable — open the leaderboard');}
  engine.runRenderLoop(()=>scene.render());const resize=()=>engine.resize();window.addEventListener('resize',resize);cleanup=()=>{window.removeEventListener('resize',resize);scene.dispose();engine.dispose()};
  })();return()=>{disposed=true;cleanup()};},[onSelect]);return <div className="babylon-stage"><canvas ref={canvas} className="babylon-canvas" aria-label="Interactive 3D Times Square billboard leaderboard"/>{status&&<div className="scene-loading" role="status"><i/><span>{status}</span></div>}</div>}
