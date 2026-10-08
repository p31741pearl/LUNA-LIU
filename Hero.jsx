function ptOnEllipse(rx,ry,cx,cy,deg){
const a=deg*Math.PI/180;
return [Math.round((cx+rx*Math.cos(a))*10)/10, Math.round((cy+ry*Math.sin(a))*10)/10];
}
function easeInOutCubic(t){
return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
}
function cubicPt(p0,p1,p2,p3,t){
const mt=1-t;
const a=mt*mt*mt, b=3*mt*mt*t, c=3*mt*t*t, d=t*t*t;
return [a*p0[0]+b*p1[0]+c*p2[0]+d*p3[0], a*p0[1]+b*p1[1]+c*p2[1]+d*p3[1]];
}
function quadPath(p0,p3,bend){
const dx=p3[0]-p0[0], dy=p3[1]-p0[1];
const L=Math.hypot(dx,dy)||1;
const ux=dx/L, uy=dy/L;
const nx=-uy, ny=ux;
const cx=p0[0]+ux*L*0.5+nx*L*bend;
const cy=p0[1]+uy*L*0.5+ny*L*bend;
return 'M '+p0[0]+' '+p0[1]+' Q '+cx+' '+cy+' '+p3[0]+' '+p3[1];
}
function conePath(p0,p3,bend,startW,endW){
const dx=p3[0]-p0[0], dy=p3[1]-p0[1];
const L=Math.hypot(dx,dy)||1;
const ux=dx/L, uy=dy/L;
const nx=-uy, ny=ux;
const ctrl=[p0[0]+ux*L*0.5+nx*L*bend, p0[1]+uy*L*0.5+ny*L*bend];
function qpt(t){
const mt=1-t;
return [mt*mt*p0[0]+2*mt*t*ctrl[0]+t*t*p3[0], mt*mt*p0[1]+2*mt*t*ctrl[1]+t*t*p3[1]];
}
const N=14;
const pts=[];
for(let i=0;i<=N;i++) pts.push(qpt(i/N));
const left=[], right=[];
for(let i=0;i<=N;i++){
const t=i/N;
const w=(startW*(1-t)+endW*t)/2;
const prev=pts[Math.max(0,i-1)], next=pts[Math.min(N,i+1)];
let tx=next[0]-prev[0], ty=next[1]-prev[1];
const tl=Math.hypot(tx,ty)||1; tx/=tl; ty/=tl;
const ox=-ty*w, oy=tx*w;
left.push([pts[i][0]+ox,pts[i][1]+oy]);
right.push([pts[i][0]-ox,pts[i][1]-oy]);
}
return 'M '+left.map(pt=>pt[0]+' '+pt[1]).join(' L ')+' L '+right.slice().reverse().map(pt=>pt[0]+' '+pt[1]).join(' L ')+' Z';
}
function NetworkSphere({tilt,progress}){
const meridians=[{rx:150,ry:150,rot:0},{rx:105,ry:148,rot:8},{rx:60,ry:150,rot:-6}];
const lats=[
{cy:200,rx:150,ry:28},{cy:165,rx:90,ry:17}
];
const nodeDefs=[];
const mAngles=[[25,110,205,300],[55,140,235,330],[15,95,190,285]];
meridians.forEach((m,i)=>{
mAngles[i].forEach((deg,j)=>{
const [x,y]=ptOnEllipse(m.rx,m.ry,200,200,deg);
const front=Math.cos(deg*Math.PI/180)>0?1:0.65;
nodeDefs.push({x,y,r:(i+j)%3===0?7:(i+j)%2===0?4:2.2,blur:(i+j)%4===0,front});
});
});
const lAngles=[[20,160],[70,250]];
lats.forEach((l,i)=>{
lAngles[i].forEach((deg,j)=>{
const [x,y]=ptOnEllipse(l.rx,l.ry,200,l.cy,deg);
const front=Math.cos(deg*Math.PI/180)>0?1:0.65;
nodeDefs.push({x,y,r:(i+j)%2===0?6:2.5,blur:(i+j)%3===0,front});
});
});
const armAngles=[tilt.arm0||0, tilt.arm1||0, tilt.arm2||0];
const p=progress||0;
const maskStart=78+p*22;
const maskEnd=118+p*60;
const converge=[10,55,95,140,165,205,250,300,335].map((deg,i)=>{
const spread=14+((i*13)%18);
const outerR=190+((i*53)%150);
const a1=deg*Math.PI/180;
const a2=(deg+spread)*Math.PI/180;
const amid=(deg+spread/2)*Math.PI/180;
const midR=(outerR+150)/2;
return {
x1:Math.cos(a1)*outerR,y1:Math.sin(a1)*outerR,
cx:Math.cos(amid)*midR,cy:Math.sin(amid)*midR,
x2:Math.cos(a2)*150,y2:Math.sin(a2)*150,
id:'conv'+i
};
});
function seededRandom(seed){
const x=Math.sin(seed*9301+49297)*233280;
return x-Math.floor(x);
}
const particles=Array.from({length:12},(_,i)=>{
const deg=seededRandom(i*3.1)*360;
const a=deg*Math.PI/180;
const startR=220+seededRandom(i*7.7)*90;
const endR=140+seededRandom(i*5.3)*24;
return {
sx:Math.cos(a)*startR, sy:Math.sin(a)*startR,
ex:Math.cos(a)*endR, ey:Math.sin(a)*endR,
dur:10+seededRandom(i*11.3)*16, delay:-(seededRandom(i*4.9)*24)
};
});
return React.createElement('svg',{viewBox:'-40 -40 480 480',style:{width:'100%',height:'100%',display:'block',overflow:'visible'}},
React.createElement('g',{style:{transformOrigin:'200px 200px',animation:'sphereRotate 90s linear infinite',animationPlayState:p>0.9?'paused':'running',filter:'blur('+(p*3)+'px)',WebkitMaskImage:'linear-gradient(to bottom, black '+maskStart+'%, transparent '+maskEnd+'%)',maskImage:'linear-gradient(to bottom, black '+maskStart+'%, transparent '+maskEnd+'%)'}},
meridians.map((m,i)=>React.createElement('ellipse',{key:'m'+i,cx:200,cy:200,rx:m.rx,ry:m.ry,fill:'none',stroke:i===1?'#1E3A8A':'#FFFFFF',strokeWidth:0.6,opacity:i===1?0.5:0.7,style:i===1?{filter:'drop-shadow(0 0 3px rgba(30,58,138,0.2))'}:undefined,transform:'rotate('+((i<3?armAngles[i]:0)+m.rot)+' 200 200)'})),
lats.map((l,i)=>React.createElement('ellipse',{key:'lt'+i,cx:200,cy:l.cy,rx:l.rx,ry:l.ry,fill:'none',stroke:'#FFFFFF',strokeWidth:0.6,opacity:0.7})),
nodeDefs.map((n,i)=>React.createElement('circle',{key:'n'+i,cx:n.x,cy:n.y,r:n.r*0.65,fill:i%4===0?'#1B3A73':'#FFFFFF',opacity:i%4===0?0.85:0.9}))
),
particles.map((pt,i)=>React.createElement('circle',{key:'p'+i,cx:200,cy:200,r:4,fill:'#FFFFFF',style:{'--sx':pt.sx+'px','--sy':pt.sy+'px','--ex':pt.ex+'px','--ey':pt.ey+'px',animation:'particleDrift '+pt.dur+'s linear infinite',animationDelay:pt.delay+'s',opacity:1-p}}))
);
}
function ConvergePoint({heroRef,h1Ref,sphereRef}){
const [pos,setPos]=React.useState(null);
React.useEffect(()=>{
const measure=()=>{
if(!heroRef.current||!h1Ref.current||!sphereRef.current) return;
const heroRect=heroRef.current.getBoundingClientRect();
const h1Rect=h1Ref.current.getBoundingClientRect();
const sphRect=sphereRef.current.getBoundingClientRect();
const coreX=h1Rect.right-heroRect.left+90;
const coreY=(h1Rect.top+h1Rect.bottom)/2-heroRect.top;
const originX=sphRect.left+sphRect.width*0.15-heroRect.left;
const origins=[0.1,0.24,0.38].map(f=>({x:originX,y:sphRect.top+sphRect.height*f-heroRect.top}));
setPos({coreX,coreY,origins});
};
measure();
window.addEventListener('resize',measure);
const id=setInterval(measure,300);
return ()=>{window.removeEventListener('resize',measure);clearInterval(id);};
},[]);
if(!pos) return null;
const allX=[pos.coreX,...pos.origins.map(o=>o.x)];
const allY=[pos.coreY,...pos.origins.map(o=>o.y)];
const pad=40;
const minX=Math.min(...allX)-pad, maxX=Math.max(...allX)+pad;
const minY=Math.min(...allY)-pad, maxY=Math.max(...allY)+pad;
const W=maxX-minX, H=maxY-minY;
const core=[pos.coreX-minX,pos.coreY-minY];
const origins=pos.origins.map(o=>[o.x-minX,o.y-minY]);
const convergeLines=origins.map((o,i)=>({d:conePath(o,core,(i-1)*0.05,34,5),p0:o,id:'core'+i}));
return React.createElement('div',{style:{position:'absolute',left:minX,top:minY,width:W,height:H,pointerEvents:'none',zIndex:0}},
React.createElement('svg',{viewBox:'0 0 '+W+' '+H,style:{width:W,height:H,overflow:'visible'}},
React.createElement('defs',null,
convergeLines.map(c=>React.createElement('linearGradient',{key:c.id,id:c.id,gradientUnits:'userSpaceOnUse',x1:c.p0[0],y1:c.p0[1],x2:core[0],y2:core[1]},
React.createElement('stop',{offset:'0%',stopColor:'var(--surface-tint)',stopOpacity:0.5}),
React.createElement('stop',{offset:'55%',stopColor:'var(--secondary-strong)',stopOpacity:0.55}),
React.createElement('stop',{offset:'100%',stopColor:'#FFFFFF',stopOpacity:0.85})
)),
React.createElement('radialGradient',{id:'coreGlow',cx:'50%',cy:'50%',r:'50%'},
React.createElement('stop',{offset:'0%',stopColor:'#fff',stopOpacity:0.95}),
React.createElement('stop',{offset:'30%',stopColor:'#FFFFFF',stopOpacity:0.8}),
React.createElement('stop',{offset:'65%',stopColor:'var(--secondary-strong)',stopOpacity:0.25}),
React.createElement('stop',{offset:'100%',stopColor:'var(--secondary-strong)',stopOpacity:0})
)
),
convergeLines.map((c,i)=>React.createElement('circle',{key:'o'+i,cx:c.p0[0],cy:c.p0[1],r:2.5,fill:'#FFFFFF',opacity:0.4})),
convergeLines.map(c=>React.createElement('path',{key:c.id,d:c.d,fill:'url(#'+c.id+')'})),
React.createElement('circle',{cx:core[0],cy:core[1],r:30,fill:'url(#coreGlow)',style:{filter:'blur(3px)',animation:'coreBreathe 3.6s ease-in-out infinite',transformOrigin:core[0]+'px '+core[1]+'px'}}),
React.createElement('circle',{cx:core[0],cy:core[1],r:10,fill:'#fff'}),
React.createElement('circle',{cx:core[0],cy:core[1],r:10,fill:'#FFFFFF',opacity:0.8})
)
);
}
function useSphereScroll(heroRef){
const [box,setBox]=React.useState(null);
const springRef=React.useRef({pos:0,posV:0,scale:0,scaleV:0});
React.useEffect(()=>{
let last=performance.now();
const tick=()=>{
const now=performance.now();
const dt=Math.min((now-last)/1000,0.05);
last=now;
const heroEl=heroRef.current;
if(!heroEl) return;
const vh=window.innerHeight;
const heroRect=heroEl.getBoundingClientRect();
const startWidth=1180, startHeight=1180;
const startRight=heroRect.right+0.18*heroRect.width;
const startLeft=startRight-startWidth;
const startTop=heroRect.top-0.24*heroRect.width;
let targetP=0;
const targetEl=document.getElementById('sphere-target');
let targetRect=null;
if(targetEl){
targetRect=targetEl.getBoundingClientRect();
const heroDocBottom=heroRect.bottom+window.scrollY;
const targetDocCenterY=targetRect.top+targetRect.height/2+window.scrollY;
const scrollStart=Math.max(0,heroDocBottom-vh);
const scrollEnd=targetDocCenterY-vh/2;
const raw=scrollEnd>scrollStart?(window.scrollY-scrollStart)/(scrollEnd-scrollStart):1;
targetP=Math.max(0,Math.min(1,raw));
}
const easedTarget=easeInOutCubic(targetP);
const s=springRef.current;
const stiffPos=170, dampPos=24, stiffScale=90, dampScale=20;
const accPos=stiffPos*(easedTarget-s.pos)-dampPos*s.posV;
s.posV+=accPos*dt; s.pos+=s.posV*dt;
const accScale=stiffScale*(easedTarget-s.scale)-dampScale*s.scaleV;
s.scaleV+=accScale*dt; s.scale+=s.scaleV*dt;
const posP=Math.max(0,Math.min(1,s.pos));
const scaleP=Math.max(0,Math.min(1,s.scale));
let left=startLeft, top=startTop, width=startWidth, height=startHeight, opacity=0.9;
if(targetRect){
left=startLeft+(targetRect.left-startLeft)*posP;
top=startTop+(targetRect.top-startTop)*posP;
width=startWidth+(targetRect.width-startWidth)*scaleP;
height=startHeight+(targetRect.height-startHeight)*scaleP;
opacity=0.9+(0.4-0.9)*easedTarget;
const sectionEl=document.getElementById('core-capabilities-section');
if(sectionEl){
const sectionRect=sectionEl.getBoundingClientRect();
const sectionDocBottom=sectionRect.bottom+window.scrollY;
const fadeStart=sectionDocBottom-vh*0.5;
const fadeEnd=sectionDocBottom;
const fadeP=fadeEnd>fadeStart?(window.scrollY-fadeStart)/(fadeEnd-fadeStart):0;
const fade=1-Math.max(0,Math.min(1,fadeP));
opacity*=fade;
}
const gridEl=document.getElementById('project-grid-section');
if(gridEl){
const gridRect=gridEl.getBoundingClientRect();
const gridDocTop=gridRect.top+window.scrollY;
const gridDocBottom=gridRect.bottom+window.scrollY;
const buffer=vh*0.3;
if(window.scrollY+vh>gridDocTop+buffer&&window.scrollY<gridDocBottom-buffer){
opacity=0;
}else if(window.scrollY+vh>gridDocTop&&window.scrollY+vh<=gridDocTop+buffer){
opacity*=1-(window.scrollY+vh-gridDocTop)/buffer;
}else if(window.scrollY>=gridDocBottom-buffer&&window.scrollY<gridDocBottom){
opacity*=(window.scrollY-(gridDocBottom-buffer))/buffer;
}
}
}
setBox({left,top,width,height,opacity,progress:scaleP});
};
tick();
const iv=setInterval(tick,32);
return ()=>clearInterval(iv);
},[]);
return box;
}
function Title({tilt,titleRef,h1Ref}){
const fontSize='clamp(34px,4.6vw,62px)';
const name=window.SITE_VARIANT.headline;
const tags=['AI Voice','Smart Hardware','SaaS'];
const sharedTextStyle={position:'relative',margin:0,fontSize,fontWeight:400,fontFamily:"'Valley Sans',var(--font-sans,sans-serif)",letterSpacing:'0.02em',lineHeight:1.35,whiteSpace:'pre-line',maxWidth:'20ch'};
return React.createElement('div',{ref:titleRef,style:{position:'relative',zIndex:2,maxWidth:'100%',width:'fit-content',marginTop:'clamp(-200px, -14vw, -40px)',willChange:'filter,opacity'}},
React.createElement('h1',{ref:h1Ref,style:{...sharedTextStyle,color:'#241D18'}},name),
React.createElement('h1',{'aria-hidden':true,style:{...sharedTextStyle,position:'absolute',left:0,top:0,color:'transparent',backgroundImage:'radial-gradient(circle 120px at 9% 18%, rgba(170,175,182,0.9), rgba(170,175,182,0.35) 55%, transparent 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',pointerEvents:'none'}},name)
);
}
function Hero({onNav}){
const ds=window.LunaLiuDesignSystem_29754e;
const [ready,setReady]=React.useState(!!ds);
React.useEffect(()=>{
if(ready) return;
const id=setInterval(()=>{ if(window.LunaLiuDesignSystem_29754e){ setReady(true); clearInterval(id); } },50);
return ()=>clearInterval(id);
},[ready]);
const {Button}=window.LunaLiuDesignSystem_29754e||{};
const [tilt,setTilt]=React.useState({x:0,y:0,mx:50,arm0:0,arm1:0,arm2:0,tx:200,ty:40});
const targetTilt=React.useRef({x:0,y:0,mx:50,tx:200,ty:40});
const ref=React.useRef(null);
const titleRef=React.useRef(null);
const h1Ref=React.useRef(null);
const sphereRef=React.useRef(null);
const sphereBox=null;
const pRef=React.useRef(null);
React.useEffect(()=>{
const onScroll=()=>{
const p=Math.max(0,Math.min(1,window.scrollY/320));
const blur=(p*10).toFixed(1);
const op=(1-p*0.7).toFixed(2);
if(titleRef.current){titleRef.current.style.filter='blur('+blur+'px)';titleRef.current.style.opacity=op;}
if(pRef.current){pRef.current.style.filter='blur('+blur+'px)';pRef.current.style.opacity=op;}
};
onScroll();
window.addEventListener('scroll',onScroll,{passive:true});
return ()=>window.removeEventListener('scroll',onScroll);
},[]);
if(!ready) return React.createElement('section',{style:{minHeight:480}});
return React.createElement('section',{ref:ref,style:{position:'sticky',top:0,overflow:'hidden',padding:'calc(clamp(48px,10vw,72px) + 64px) clamp(20px,6vw,56px) clamp(16px,3vw,32px)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',height:'min(48vh, 440px, 80vw)',minHeight:300,gap:0,background:'#EFF0F2',zIndex:0}},
React.createElement(MemoSilk,null),
false&&sphereBox&&React.createElement('div',{ref:sphereRef,style:{position:'fixed',left:sphereBox.left,top:sphereBox.top,width:sphereBox.width,height:sphereBox.height,opacity:sphereBox.opacity,zIndex:1,pointerEvents:'none',transition:'opacity 0.2s linear'}},
React.createElement(NetworkSphere,{tilt,progress:sphereBox.progress})
),
React.createElement(MemoStars,null),
React.createElement(Title,{tilt,titleRef,h1Ref}),
React.createElement('p',{ref:pRef,style:{position:'relative',zIndex:1,fontSize:'clamp(20px,2vw,28px)',lineHeight:1.5,fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",color:'rgba(36,29,24,0.7)',margin:0,marginTop:16,willChange:'filter,opacity'}},window.SITE_VARIANT.tagline,React.createElement('span',{style:{display:'block',marginTop:14,fontSize:'clamp(14px,1.2vw,16px)',lineHeight:1.6,color:'rgba(36,29,24,0.6)',fontFamily:"'Albert Sans',var(--font-sans,sans-serif)"}},window.t('5 years of hands-on product design · End-to-end projects, from research to launch').split(/\s*[·・]\s*/).map((part,i)=>React.createElement(React.Fragment,{key:i},i>0&&window.innerWidth>=560&&React.createElement('span',{'aria-hidden':true,style:{margin:'0 8px'}},'・'),React.createElement('span',{style:{display:window.innerWidth>=560?'inline-block':'block'}},part))))),
);
}
function StarTwinkleOverlay(){
const outside=(l,t)=>{const dx=(l-50)/40,dy=(t-50)/42;return dx*dx+dy*dy>1;};
const cornerBias=(l,t)=>{const dx=Math.abs(l-50)/50,dy=Math.abs(t-50)/50;return Math.pow(Math.min(1,Math.sqrt((dx*dx+dy*dy)/2)),1.4);};
const pick=()=>{let l,t,g=0;do{l=Math.random()*100;t=Math.random()*100;g++;}while(g<50&&(!outside(l,t)||Math.random()>cornerBias(l,t)));return {l,t};};
const pickTop=()=>{let l,t,g=0;do{l=Math.random()*100;t=Math.random()*46;g++;}while(g<50&&(!outside(l,t)||Math.random()>cornerBias(l,t)));return {l,t};};
const stars=React.useMemo(()=>{
const n=Math.floor(40+Math.random()*15);
const main=Array.from({length:n}).map((_,i)=>{
const size=4+Math.random()*8;
const white=true;
const pt=pick();
return {
id:'m'+i,
top:pt.t,
left:pt.l,
size,
dur:(1.2+Math.random()*2.0).toFixed(2),
delay:(Math.random()*3).toFixed(2),
peak:(0.4+Math.random()*0.6).toFixed(2),
white
};
});
const topN=Math.floor(26+Math.random()*8);
const topBatch=Array.from({length:topN}).map((_,i)=>{
const size=3+Math.random()*7;
const staticStar=Math.random()<0.35;
const pt=pickTop();
return {
id:'t'+i,
top:pt.t,
left:pt.l,
size,
dur:(1.2+Math.random()*2.0).toFixed(2),
delay:(Math.random()*3).toFixed(2),
peak:(0.5+Math.random()*0.5).toFixed(2),
white:true,
staticStar
};
});
return main.concat(topBatch);
},[]);
return React.createElement('div',{style:{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',overflow:'hidden'}},
stars.map(s=>React.createElement('div',{key:s.id,className:s.staticStar?'':'hero-star',style:{position:'absolute',top:s.top+'%',left:s.left+'%',width:s.size*2.4,height:s.size*2.4,animationDuration:s.dur+'s',animationDelay:s.delay+'s','--peak':s.peak,opacity:s.staticStar?s.peak:undefined}},
React.createElement('div',{style:{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:s.size*1.15,height:s.size*1.15,background:s.white?'rgba(196,199,204,0.9)':'rgba(240,206,110,0.85)',clipPath:'polygon(50% 0%, 54% 42%, 58% 46%, 100% 50%, 58% 54%, 54% 58%, 50% 100%, 46% 58%, 42% 54%, 0% 50%, 42% 46%, 46% 42%)'}})
))
);
}
function SilkLinesBackground(){
// Drive the flow from JS (rAF) by setting the SVG transform attribute: CSS keyframes and SMIL
// on SVG <g> don't reliably repaint on iOS Safari, but attribute writes always do.
const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const flowDur=window.innerWidth<560?16:(window.innerWidth<860?26:45);
const rootRef=React.useRef(null);
React.useEffect(()=>{
if(reduceMotion)return;
let raf=0;
const tick=now=>{
const root=rootRef.current;
if(root)root.querySelectorAll('g[data-flow-delay]').forEach(g=>{const t=(now/1000+Number(g.dataset.flowDelay))%flowDur;g.setAttribute('transform','translate('+(-1120*t/flowDur).toFixed(2)+',0)');});
raf=requestAnimationFrame(tick);
};
raf=requestAnimationFrame(tick);
return ()=>cancelAnimationFrame(raf);
},[]);
const lines=React.useMemo(()=>{
const n=22;
const span=1120;
const x0=-40;
const sharedFreq=1;
const sharedPhase=Math.random()*Math.PI*2;
const sharedAmp=18+Math.random()*10;
return Array.from({length:n}).map((_,i)=>{
const t=i/(n-1);
const cluster=Math.sin(t*Math.PI*3.2)*0.5+0.5;
const y0=40+t*300+(cluster-0.5)*22*Math.sin(t*11.3);
const amp=sharedAmp*(0.85+Math.random()*0.3);
const freq=sharedFreq;
const phase=sharedPhase+(Math.random()-0.5)*0.25;
const steps=64;
let d='';
for(let s=0;s<=steps;s++){
const x=x0+(span*s)/steps;
const yWave=y0+amp*Math.sin((2*Math.PI*freq*(x-x0))/span+phase);
d+=(s===0?'M ':'L ')+x.toFixed(1)+' '+yWave.toFixed(1)+' ';
}
const bold=Math.random()<0.12;
const width=bold?(0.6+Math.random()*0.3):(0.3+Math.random()*0.25);
const dashed=Math.random()<0.22;
const bright=Math.random()<0.3;
const white=true;
const gradPick=Math.random();
const solidPick=Math.random();
const gradient=null;
const solidColor=solidPick<0.16?'#E8C659':null;
const hasDot=Math.random()<0.7;
const dotCount=1+Math.floor(Math.random()*2);
return {
id:i,
d,
width,
dashed,
opacity:(bright?0.42:0.24)+Math.random()*(bright?0.18:0.12),
color:solidColor?solidColor:(gradient?`url(#silk-grad-${gradient})`:(white?'#EDD27A':(bright?'#E6C24F':'#F0DA92'))),
delay:(Math.random()*45).toFixed(2),
hasDot,
dotCount,
dotDur:(4+Math.random()*4).toFixed(2)
};
});
},[]);
React.useEffect(()=>{const orbs=()=>Array.from(document.querySelectorAll('[data-hero-orb]'));orbs().forEach(el=>{if(!el.dataset.baseOpacity)el.dataset.baseOpacity=getComputedStyle(el).opacity;});let raf=0;const f=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const h=window.innerHeight||800;const t=Math.max(0,Math.min(1,window.scrollY/(h*0.75)));const e=t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;const list=orbs();const moon=document.querySelector('[data-site-moon]');const logo=document.querySelector('[data-site-logo]');if(!list.length)return;const root=list[0].parentElement.getBoundingClientRect();const lr=logo?logo.getBoundingClientRect():{left:48,top:20,height:24};const tx=lr.left+6,ty=lr.top+lr.height/2;list.forEach(el=>{const cx=root.left+el.offsetLeft,cy=root.top+el.offsetTop;const sc=1-(1-24/Math.max(1,el.offsetWidth))*e;el.style.transform='translate(-50%,-50%) translate('+((tx-cx)*e)+'px,'+((ty-cy)*e)+'px) scale('+sc+')';const fo=e<0.86?1:Math.max(0,1-(e-0.86)/0.14);el.style.opacity=String(fo*(+el.dataset.baseOpacity||1));el.style.visibility=fo<=0?'hidden':'visible';});if(moon)moon.style.opacity=String(e<0.86?0:0.75*Math.min(1,(e-0.86)/0.14));});};f();window.addEventListener('scroll',f,{passive:true});window.addEventListener('resize',f);return ()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',f);window.removeEventListener('resize',f);const m=document.querySelector('[data-site-moon]');if(m)m.style.opacity='0';};},[]);
return React.createElement('div',{ref:rootRef,style:{position:'absolute',inset:0,zIndex:0,overflow:'hidden',background:'linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0) 18%), radial-gradient(40% 22% at 50% 38%, rgba(255,210,70,0.30), rgba(255,224,120,0) 75%), radial-gradient(85% 78% at 0% 0%, rgba(255,255,255,0.98), rgba(255,255,255,0) 78%), radial-gradient(85% 78% at 100% 0%, rgba(255,255,255,0.98), rgba(255,255,255,0) 78%), radial-gradient(85% 78% at 0% 100%, rgba(255,255,255,0.98), rgba(255,255,255,0) 78%), radial-gradient(85% 78% at 100% 100%, rgba(255,255,255,0.98), rgba(255,255,255,0) 78%), #FBFAF3'}},
React.createElement('div',{'aria-hidden':true,'data-hero-orb':'',style:{position:'absolute',left:'50%',top:'calc(50% - 58px)',width:'min(44vw,52vh,480px)',aspectRatio:'1/1',transform:'translate(-50%,-50%)',borderRadius:'50%',pointerEvents:'none',background:'radial-gradient(38% 22% at 50% 6%, rgba(176,150,226,0.8), rgba(176,150,226,0) 100%), radial-gradient(60% 60% at 36% 34%, rgba(245,138,48,0.9) 0%, rgba(247,168,62,0.6) 45%, rgba(249,199,82,0) 100%)',borderRadius:0,filter:'blur(60px)',opacity:0.6,marginLeft:'-3%',marginTop:'-3%'}}),
React.createElement('div',{'aria-hidden':true,'data-hero-orb':'',style:{position:'absolute',left:'50%',top:'calc(50% - 58px)',width:'min(44vw,52vh,480px)',aspectRatio:'1/1',transform:'translate(-50%,-50%)',borderRadius:'50%',pointerEvents:'none',background:'radial-gradient(38% 22% at 50% 4%, rgba(176,150,226,0.85), rgba(176,150,226,0) 100%), linear-gradient(195deg, #F2782A 0%, #F58A30 28%, #F7A83E 55%, #F9C752 80%, #FAD767 100%)',filter:'blur(1.5px)',WebkitMaskImage:'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.45) 62%, transparent 82%)',maskImage:'linear-gradient(to bottom, black 0%, black 42%, rgba(0,0,0,0.45) 62%, transparent 82%)'}}),
React.createElement('div',{'aria-hidden':true,'data-hero-orb':'',style:{position:'absolute',left:'50%',top:'calc(50% - 58px)',width:'calc(min(44vw,52vh,480px) * 1.7)',aspectRatio:'1/1',transform:'translate(-50%,-50%)',pointerEvents:'none',background:'radial-gradient(30% 27% at 50% 60%, rgba(247,160,60,0.8) 0%, rgba(250,205,90,0.6) 50%, rgba(250,205,90,0) 100%)',filter:'blur(30px)',WebkitMaskImage:'linear-gradient(to bottom, transparent 40%, black 55%)',maskImage:'linear-gradient(to bottom, transparent 40%, black 55%)'}}),
React.createElement('div',{'aria-hidden':true,'data-hero-orb':'',style:{position:'absolute',left:'50%',top:'calc(50% - 58px)',width:'min(44vw,52vh,480px)',aspectRatio:'1/1',transform:'translate(-50%,-50%)',borderRadius:'50%',pointerEvents:'none',backgroundImage:'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix values=\'0 0 0 0 0.86 0 0 0 0 0.62 0 0 0 0 0.32 0 0 0 1.6 -0.45\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',backgroundSize:'160px 160px',opacity:0.75,mixBlendMode:'multiply',borderRadius:0,scale:'1.4',WebkitMaskImage:'radial-gradient(18% 18% at 60% 38%, black 0%, rgba(0,0,0,0.5) 45%, transparent 100%), radial-gradient(17% 17% at 47% 47%, black 0%, black 30%, rgba(0,0,0,0.45) 65%, transparent 100%)',maskImage:'radial-gradient(18% 18% at 60% 38%, black 0%, rgba(0,0,0,0.5) 45%, transparent 100%), radial-gradient(17% 17% at 47% 47%, black 0%, black 30%, rgba(0,0,0,0.45) 65%, transparent 100%)'}}),
React.createElement('svg',{className:'hero-silk',viewBox:'0 0 1000 560',preserveAspectRatio:'none',style:{position:'absolute',width:'110%',height:'110%',left:'-5%',top:'-5%',WebkitMaskImage:'linear-gradient(to bottom, transparent 0%, transparent 34%, black 46%, black 100%)',maskImage:'linear-gradient(to bottom, transparent 0%, transparent 34%, black 46%, black 100%)'}},
React.createElement('defs',null,
React.createElement('linearGradient',{id:'silk-grad-orange',x1:'0%',y1:'0%',x2:'100%',y2:'0%'},React.createElement('stop',{offset:'0%',stopColor:'#EAC85E'}),React.createElement('stop',{offset:'100%',stopColor:'#E8A870'})),
React.createElement('linearGradient',{id:'silk-grad-pink',x1:'0%',y1:'0%',x2:'100%',y2:'0%'},React.createElement('stop',{offset:'0%',stopColor:'#EAC85E'}),React.createElement('stop',{offset:'100%',stopColor:'#F0A8C0'})),
React.createElement('linearGradient',{id:'silk-grad-blue',x1:'0%',y1:'0%',x2:'100%',y2:'0%'},React.createElement('stop',{offset:'0%',stopColor:'#EAC85E'}),React.createElement('stop',{offset:'100%',stopColor:'#8CBEE6'}))
),
lines.map(l=>React.createElement('g',{key:l.id,'data-flow-delay':l.delay},
[0,1].map(copy=>React.createElement('path',{key:copy,id:`silk-path-${l.id}-${copy}`,d:l.d,transform:`translate(${copy*1120},0)`,fill:'none',stroke:l.color,strokeWidth:l.width,strokeDasharray:l.dashed?'2.5 4':undefined,opacity:l.opacity,strokeLinecap:'round'})),
false&&[0,1].map(copy=>Array.from({length:l.dotCount}).map((_,dIdx)=>React.createElement('circle',{key:'dot'+copy+'-'+dIdx,r:2.2,fill:'#C2C7CE',opacity:0.9},
React.createElement('animateMotion',{dur:l.dotDur+'s',begin:(-dIdx*l.dotDur/l.dotCount)+'s',repeatCount:'indefinite',rotate:'auto'},
React.createElement('mpath',{href:`#silk-path-${l.id}-${copy}`})
)
)))
))
),
React.createElement('div',{style:{position:'absolute',inset:0,pointerEvents:'none',WebkitMaskImage:'radial-gradient(circle min(18vw,22vh,200px) at 50% calc(50% - 90px), black 45%, transparent 100%)',maskImage:'radial-gradient(circle min(18vw,22vh,200px) at 50% calc(50% - 90px), black 45%, transparent 100%)'}},
React.createElement('svg',{className:'hero-silk',viewBox:'0 0 1000 560',preserveAspectRatio:'none',style:{position:'absolute',width:'110%',height:'110%',left:'-5%',top:'-5%',pointerEvents:'none',}},
lines.map(l=>React.createElement('g',{key:'w'+l.id,'data-flow-delay':l.delay},
[0,1].map(copy=>React.createElement('path',{key:copy,d:l.d,transform:'translate('+(copy*1120)+',0)',fill:'none',stroke:'#FFFFFF',strokeWidth:l.width,strokeDasharray:l.dashed?'2.5 4':undefined,opacity:Math.min(1,l.opacity*2.2),strokeLinecap:'round'}))
))
)
)
);
};
const MemoSilk=React.memo(SilkLinesBackground);
const MemoStars=React.memo(StarTwinkleOverlay);
window.PortfolioHero=Hero;
