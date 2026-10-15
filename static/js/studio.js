import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';
const $=id=>document.getElementById(id), host=$('scene');
const scene=new THREE.Scene();scene.background=new THREE.Color('#24202a');
const camera=new THREE.PerspectiveCamera(52,1,.1,100);camera.position.set(0,3.4,9.7);
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;host.append(renderer.domElement);
const orbit=new OrbitControls(camera,renderer.domElement);orbit.target.set(0,1.65,0);orbit.enableDamping=true;orbit.maxPolarAngle=Math.PI*.49;orbit.minDistance=4;orbit.maxDistance=17;
const mat=(c,rough=.8,metal=0)=>new THREE.MeshStandardMaterial({color:c,roughness:rough,metalness:metal});
const peach=mat('#db977b'),dark=mat('#202126'),wood=mat('#9b5d3c'),woodTop=mat('#c28a61'),cream=mat('#ded0c4'),rug=mat('#b4a18d'),green=mat('#315f35'),gold=mat('#c5a476',.45,.45),glass=mat('#141923',.25,.4);
const objects={};const mesh=(g,m,parent=scene)=>{const o=new THREE.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o};
function box(w,h,d,m,parent=scene){return mesh(new THREE.BoxGeometry(w,h,d),m,parent)}
function sphere(r,m,parent=scene){return mesh(new THREE.SphereGeometry(r,14,10),m,parent)}
function cyl(r1,r2,h,m,parent=scene){return mesh(new THREE.CylinderGeometry(r1,r2,h,12),m,parent)}
function rod(a,b,r,m,parent=scene){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),v=B.clone().sub(A),o=cyl(r,r,v.length(),m,parent);o.position.copy(A.add(B).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return o}
const floor=box(14,.12,12,mat('#3e342e'));floor.position.y=-.1;
const back=box(14,6,.15,peach);back.position.set(0,3,-3.65);
const left=box(.15,6,11,mat('#6c5b51'));left.position.set(-7,3,1.8);
for(let i=0;i<85;i++){let strip=box(.034,5.8,.065,mat(i%3===0?'#f0b69a':'#c8826d'));strip.position.set(-6.9+i*.165,3,-3.53)}
const ceiling=box(14,.1,11,mat('#3c3331'));ceiling.position.set(0,6.05,1.5);
const carpet=box(10,.015,5.4,rug);carpet.position.set(0,.015,1.3);
for(let i=0;i<23;i++){let stripe=box(.018,.018,5.2,mat(i%2?'#776557':'#e2d4c2'));stripe.position.set(-4.8+i*.43,.029,1.3)}
// illuminated vertical green plant wall
let plantwall=box(2.25,5.6,.16,mat('#2b382a'));plantwall.position.set(-5.6,2.9,-3.37);
for(let i=0;i<125;i++){const x=-6.65+(i%12)*.18,z=-3.24+Math.sin(i*9)*.09,y=.35+Math.floor(i/12)*.48;const leaf=sphere(.13,mat(i%4===0?'#a3a34f':i%3===0?'#628047':'#436d3e'));leaf.scale.set(.55,1.1,.4);leaf.position.set(x,y,z);leaf.rotation.z=i*.61}
const lightBar=box(.1,4.7,.12,mat('#fff1d1',.2));lightBar.position.set(-4.32,2.9,-3.31);
// sign: plane plus canvas texture
const sign= new THREE.Group();scene.add(sign);objects.sign=sign;sign.position.set(0,3.75,-3.39);
const signBase=box(3.6,1.65,.12,cream,sign);signBase.position.z=.02;
const cv=document.createElement('canvas');cv.width=1024;cv.height=512;const ct=cv.getContext('2d');const texture=new THREE.CanvasTexture(cv);
const signFace=mesh(new THREE.PlaneGeometry(3.42,1.5),new THREE.MeshBasicMaterial({map:texture}),sign);signFace.position.z=.095;
function signText(){ct.fillStyle='#e5d8cf';ct.fillRect(0,0,1024,512);ct.fillStyle='#383139';ct.textAlign='center';ct.font='bold 125px sans-serif';ct.fillText('♩  ♫  ♩',512,230);ct.font='bold 88px sans-serif';ct.fillText(($('title').value||'PODCAST').slice(0,22).toUpperCase(),512,360);texture.needsUpdate=true}signText();
// table
const table=new THREE.Group();scene.add(table);objects.table=table;
let top=box(4.45,.16,2.1,woodTop,table);top.position.y=1.43;
for(const x of [-1.9,1.9])for(const z of [-.72,.72]){let leg=box(.09,1.36,.09,dark,table);leg.position.set(x,.69,z);leg.rotation.z=x>0?-.09:.09}
table.position.set(0,0,.7);
// padded armchairs
function chair(name,x,rot){const g=new THREE.Group();scene.add(g);objects[name]=g;
let seat=box(1.25,.23,1.1,cream,g);seat.position.y=.85;
let back=box(1.28,1.13,.23,cream,g);back.position.set(0,1.45,-.48);back.rotation.x=-.13;
for(const sx of [-.57,.57]){let arm=box(.21,.43,.94,cream,g);arm.position.set(sx,1.12,-.02)}
rod([0,.74,0],[0,.33,0],.055,gold,g);for(let i=0;i<5;i++){let a=i*Math.PI*2/5;rod([0,.34,0],[Math.cos(a)*.66,.08,Math.sin(a)*.66],.028,gold,g)}
g.position.set(x,0,1.9);g.rotation.y=rot}
chair('chairLeft',-2.75,-.35);chair('chairRight',2.75,.35);
// articulating mic booms
function mic(name,x){const g=new THREE.Group();scene.add(g);objects[name]=g;g.position.set(x,0,.65);
const sx=x<0?-1:1;
rod([0,1.55,0],[sx*.23,2.75,-.42],.026,dark,g);
rod([sx*.23,2.75,-.42],[sx*.76,2.3,-.13],.026,dark,g);
rod([sx*.23,2.75,-.40],[sx*.65,2.35,-.10],.011,dark,g);
let mic=cyl(.075,.085,.32,dark,g);mic.position.set(sx*.76,2.17,-.13);
let base=cyl(.15,.19,.06,dark,g);base.position.y=1.52}
mic('micLeft',-1.85);mic('micRight',1.85);
// open shelving right
const shelf=new THREE.Group();scene.add(shelf);shelf.position.set(5.4,0,-3);
for(const x of [-1.08,1.08])for(const z of [-.35,.35]){let pole=box(.055,5.6,.055,dark,shelf);pole.position.set(x,2.8,z)}
for(const y of [.55,1.8,3.05,4.3,5.45]){let plank=box(2.28,.09,.85,woodTop,shelf);plank.position.y=y}
for(let i=0;i<14;i++){let book=box(.1+Math.random()*.1,.34+Math.random()*.24,.34,mat(i%2?'#eee1c8':'#775b4b'),shelf);book.position.set(-.75+i*.12,4.55,-.1)}
for(let i=0;i<5;i++){let pot=cyl(.12,.09,.22,mat('#aa8266'),shelf);pot.position.set(.4+i*.31,3.2,.02)}
// plant right
const plant=new THREE.Group();scene.add(plant);objects.plant=plant;plant.position.set(6.25,0,1.35);
let pot=cyl(.3,.24,.6,dark,plant);pot.position.y=.3;
for(let i=0;i<18;i++){const a=i*2.4,r=.2+Math.random()*.25,h=.75+Math.random()*.85;rod([0,.55,0],[Math.cos(a)*r,h,Math.sin(a)*r],.012,green,plant);let leaf=sphere(.17,green,plant);leaf.scale.set(.4,1.3,.5);leaf.position.set(Math.cos(a)*r,h,Math.sin(a)*r);leaf.rotation.z=Math.cos(a)*.7}
// studio lights
scene.add(new THREE.AmbientLight('#ffffff',1.35));
const hemi=new THREE.HemisphereLight('#fce5cf','#514136',2);scene.add(hemi);
const key=new THREE.DirectionalLight('#ffd4b3',3.5);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-10;key.shadow.camera.right=10;key.shadow.camera.top=10;key.shadow.camera.bottom=-10;scene.add(key);
const fill=new THREE.PointLight('#ffb98c',65,11);fill.position.set(3,3,-1);scene.add(fill);
function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(host);resize();
function animate(){requestAnimationFrame(animate);orbit.update();renderer.render(scene,camera)}animate();
const selector=$('object');function sync(){const o=objects[selector.value];$('x').value=o.position.x;$('z').value=o.position.z;$('rotation').value=THREE.MathUtils.radToDeg(o.rotation.y)}selector.onchange=sync;sync();
for(const id of ['x','z','rotation'])$(id).oninput=()=>{const o=objects[selector.value];if(id==='rotation')o.rotation.y=THREE.MathUtils.degToRad(+$('rotation').value);else o.position[id]=+$(id).value};
$('wall').oninput=e=>peach.color.set(e.target.value);$('light').oninput=e=>{key.color.set(e.target.value);fill.color.set(e.target.value)};$('title').oninput=signText;
$('save').onclick=()=>{const data={objects:{},wall:$('wall').value,light:$('light').value,title:$('title').value};for(const [k,o] of Object.entries(objects))data.objects[k]={x:o.position.x,z:o.position.z,r:o.rotation.y};localStorage.setItem('mystudio3d',JSON.stringify(data));$('status').textContent='Studio design saved locally'};
$('load').onclick=()=>{const data=JSON.parse(localStorage.getItem('mystudio3d')||'null');if(!data)return $('status').textContent='No saved design found';for(const [k,p] of Object.entries(data.objects)){if(objects[k]){objects[k].position.x=p.x;objects[k].position.z=p.z;objects[k].rotation.y=p.r}}$('wall').value=data.wall;$('light').value=data.light;$('title').value=data.title;$('wall').oninput({target:$('wall')});$('light').oninput({target:$('light')});signText();sync();$('status').textContent='Design loaded'};
$('reset').onclick=()=>{camera.position.set(0,3.4,9.7);orbit.target.set(0,1.65,0);orbit.update()};
function download(url,name){let a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}
$('shot').onclick=()=>renderer.domElement.toBlob(b=>download(URL.createObjectURL(b),'mystudio-podcast.png'));
let media=null,rec=null,chunks=[];
$('start').onclick=async()=>{try{media=await navigator.mediaDevices.getUserMedia({video:true,audio:true});$('cameraVideo').srcObject=media;$('preview').style.display='block';$('status').textContent='Camera ready. Camera preview is not yet embedded in the 3D room.'}catch(e){$('status').textContent=e.message}};
$('rec').onclick=()=>{try{const tracks=renderer.domElement.captureStream(30).getVideoTracks();if(media)tracks.push(...media.getAudioTracks());const type=MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')?'video/webm;codecs=vp9,opus':'video/webm';rec=new MediaRecorder(new MediaStream(tracks),{mimeType:type});chunks=[];rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};rec.onstop=()=>download(URL.createObjectURL(new Blob(chunks,{type})),'mystudio-3d.webm');rec.start(500);$('stop').disabled=false;$('rec').disabled=true;$('status').textContent='Recording 3D scene and microphone audio (camera preview not included)'}catch(e){$('status').textContent=e.message}};
$('stop').onclick=()=>{if(rec&&rec.state!=='inactive')rec.stop();$('stop').disabled=true;$('rec').disabled=false};
