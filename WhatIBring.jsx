const items=[
{n:'01',title:'Systems Thinking',desc:'Distill requirements into scalable rules'},
{n:'02',title:'User Research',desc:'Ground decisions in interviews and on-site observation'},
{n:'04',title:'Cross-team Collaboration',desc:'Define specs together with PMs and engineers'},
{n:'05',title:'Technical Curiosity',desc:'Build tools to eliminate repetitive work, saving time for work that truly needs judgment'}
];
function WhatIBring(){
const [w,setW]=React.useState(window.innerWidth);
React.useEffect(()=>{const f=()=>setW(window.innerWidth);window.addEventListener('resize',f);return ()=>window.removeEventListener('resize',f);},[]);
const cols=w<560?1:(w<820?2:4);
const gridRef=React.useRef(null);const [shown,setShown]=React.useState(false);
React.useEffect(()=>{const el=gridRef.current;if(!el)return;const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){setShown(true);io.disconnect();}},{threshold:0.2});io.observe(el);return ()=>io.disconnect();},[]);
return React.createElement('section',{id:'core-capabilities-section',style:{position:cols<4?'relative':'sticky',top:0,zIndex:2,display:'flex',flexDirection:'column',background:'#fff',padding:'40px 48px 96px'}},
React.createElement('div',{'aria-hidden':true,style:{position:'absolute',left:0,right:0,top:-80,height:80,pointerEvents:'none',background:'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 55%, #fff 100%)'}}),
React.createElement('div',{style:{maxWidth:1120,margin:'0 auto',width:'100%'}},
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:28,fontWeight:600,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'#A66A00',marginBottom:48,textAlign:'center'}},window.t('Core Strengths')),
React.createElement('div',{ref:gridRef,style:{position:'relative',display:'grid',gridTemplateColumns:'repeat('+cols+',minmax(0,1fr))',gap:16}},
React.createElement('div',{id:'sphere-target',style:{position:'absolute',left:'50%',top:'50%',width:'66.666%',aspectRatio:'1/1',transform:'translate(-50%,-50%)',pointerEvents:'none',visibility:'hidden'}}),
items.map((it,i)=>React.createElement('div',{key:it.n,style:{opacity:shown?1:0,transform:shown?'translateY(0)':'translateY(12px)',transition:'opacity 0.7s cubic-bezier(0.16,1,0.3,1) '+(i*0.08)+'s, transform 0.7s cubic-bezier(0.16,1,0.3,1) '+(i*0.08)+'s',position:'relative',zIndex:1,minWidth:0,background:'#E0E0E3',textAlign:'center',borderRadius:16,padding:'28px 24px'}},
React.createElement('div',{style:{width:128,height:128,margin:'0 auto 20px'}},React.createElement('image-slot',{id:'cap-icon-'+it.n,bare:'',hires:'',fit:'contain',placeholder:'Icon',style:{display:'block',width:'100%',height:'100%'}})),
React.createElement('div',{style:{fontSize:18,fontWeight:600,letterSpacing:'-0.01em',marginBottom:12}},window.t(it.title)),
React.createElement('div',{style:{height:1,background:'var(--border)',marginBottom:16}}),
React.createElement('div',{style:{fontSize:14,lineHeight:1.6,color:'#4A4A4F'}},window.t(it.desc))
))
)
)
);
}
window.WhatIBring=WhatIBring;
