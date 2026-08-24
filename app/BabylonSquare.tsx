'use client';
import { useEffect, useRef, useState } from 'react';

type Props={onSelect:(rank:number)=>void};
const billboardNodes=['Plane.029','Plane.031','Plane.032','Plane.036','Cube.004','Cube.008','Cube.026','Cube.027','Cube.028','Cube.101','Plane.037','Cube.007','Cube.030','Cube.031','Cube.033','Cube.034','Cube.035','Cube.036','Cube.043','Cube.044','Cube.045','Cube.046','Cube.047','Cube.056','Cube.057','Cube.063','Cube.078','Cube.114','Cube.117','Cube.080'];
const featured=[['VOIDLABS','THE FUTURE IS YOURS','#071b52','#62b8ff'],['AURORA','MAKE YOUR OWN LIGHT','#421465','#ff78e8'],['KINETIC','MOVE DIFFERENT','#cdeb34','#111111'],['NOVA.FM','HEAR THE UNHEARD','#76183f','#ff75aa'],['PIXEL.FUN','PLAY FOREVER','#9e234d','#ffc240']] as const;

export default function BabylonSquare({onSelect}:Props){const canvas=useRef<HTMLCanvasElement>(null);const [status,setStatus]=useState('Loading the Square…');useEffect(()=>{let disposed=false;let cleanup=()=>{};(async()=>{
  const B=await import('@babylonjs/core');await import('@babylonjs/loaders/glTF');if(disposed||!canvas.current)return;
  const engine=new B.Engine(canvas.current,true,{preserveDrawingBuffer:true,stencil:true,adaptToDeviceRatio:true});engine.setHardwareScalingLevel(window.devicePixelRatio>1.5?1.35:1);
  const scene=new B.Scene(engine);scene.clearColor=new B.Color4(.004,.007,.014,1);scene.fogMode=B.Scene.FOGMODE_EXP2;scene.fogDensity=.0035;scene.fogColor=new B.Color3(.012,.02,.035);
  const camera=new B.UniversalCamera('streetCamera',B.Vector3.Zero(),scene);camera.minZ=.04;camera.inertia=.68;camera.angularSensibility=3200;camera.keysUp=[87,38];camera.keysDown=[83,40];camera.keysLeft=[65,37];camera.keysRight=[68,39];camera.attachControl(canvas.current,true);
  const hemi=new B.HemisphericLight('night',new B.Vector3(0,1,0),scene);hemi.intensity=.72;hemi.diffuse=new B.Color3(.52,.65,.8);hemi.groundColor=new B.Color3(.08,.06,.11);
  const glow=new B.GlowLayer('billboardGlow',scene,{blurKernelSize:22});glow.intensity=.35;
  try{
    const imported=await B.SceneLoader.ImportMeshAsync('', '/models/', 'timesquare-web.glb', scene);if(disposed)return;
    const roots=imported.meshes.filter(m=>!m.parent);const vectors=roots.length?roots[0].getHierarchyBoundingVectors(true):scene.getWorldExtends();const center=vectors.min.add(vectors.max).scale(.5);const extent=vectors.max.subtract(vectors.min);const radius=Math.max(extent.x,extent.y,extent.z);
    const eyeY=vectors.min.y+1.58;const marginX=extent.x*.055;const marginZ=extent.z*.035;const startZ=vectors.max.z-marginZ-extent.z*.08;
    camera.position.set(center.x,eyeY,startZ);camera.setTarget(new B.Vector3(center.x,eyeY,center.z));camera.speed=Math.max(.08,radius*.0038);
    const candidates=billboardNodes.map(name=>scene.getMeshByName(name)).filter((mesh):mesh is B.AbstractMesh=>Boolean(mesh));
    const area=(mesh:B.AbstractMesh)=>{const box=mesh.getBoundingInfo().boundingBox;const size=box.maximumWorld.subtract(box.minimumWorld);return Math.max(size.x*size.y,size.x*size.z,size.y*size.z)};
    candidates.sort((a,b)=>area(b)-area(a));
    candidates.slice(0,5).forEach((mesh,index)=>{const [name,tag,bg,fg]=featured[index];mesh.metadata={...(mesh.metadata||{}),rank:index+1};mesh.isPickable=true;
      const tex=new B.DynamicTexture(`featured_${index+1}`,{width:1024,height:512},scene,false);const ctx=tex.getContext();ctx.fillStyle=bg;ctx.fillRect(0,0,1024,512);ctx.strokeStyle=fg;ctx.lineWidth=12;ctx.strokeRect(18,18,988,476);ctx.fillStyle=fg;ctx.font='900 52px Arial';ctx.fillText(`#${index+1}`,48,82);ctx.font='900 130px Arial';ctx.fillText(name,48,286);ctx.font='bold 30px monospace';ctx.fillText(tag,52,382);tex.update();const bm=new B.StandardMaterial(`featured_material_${index+1}`,scene);bm.diffuseTexture=tex;bm.emissiveTexture=tex;bm.emissiveColor=B.Color3.White();bm.disableLighting=true;bm.backFaceCulling=false;mesh.material=bm;});
    candidates.slice(5).forEach((mesh,index)=>{mesh.metadata={...(mesh.metadata||{}),rank:index+6};mesh.isPickable=true});
    scene.onBeforeRenderObservable.add(()=>{camera.position.x=Math.min(vectors.max.x-marginX,Math.max(vectors.min.x+marginX,camera.position.x));camera.position.z=Math.min(vectors.max.z-marginZ,Math.max(vectors.min.z+marginZ,camera.position.z));camera.position.y=eyeY;camera.cameraDirection.y=0;});
    scene.onPointerObservable.add(info=>{if(info.type===B.PointerEventTypes.POINTERPICK){let mesh=info.pickInfo?.pickedMesh;while(mesh&&!mesh.metadata?.rank)mesh=mesh.parent as B.AbstractMesh|null;if(mesh?.metadata?.rank)onSelect(mesh.metadata.rank)}});
    setStatus('');
  }catch(error){console.error(error);setStatus('3D scene unavailable — open the leaderboard');}
  engine.runRenderLoop(()=>scene.render());const resize=()=>engine.resize();window.addEventListener('resize',resize);cleanup=()=>{window.removeEventListener('resize',resize);scene.dispose();engine.dispose()};
  })();return()=>{disposed=true;cleanup()};},[onSelect]);return <div className="babylon-stage"><canvas ref={canvas} className="babylon-canvas" aria-label="Interactive 3D Times Square billboard leaderboard"/>{status&&<div className="scene-loading" role="status"><i/><span>{status}</span></div>}</div>}
