const items=[
{n:'01',title:'Systems Thinking',desc:'Distill requirements into scalable rules',project:'guestweb',name:'GuestWeb',proof:'Turned each hotel’s custom requests into configurable specs, so new brands launch without new development',glow:'radial-gradient(circle at 55% 45%, rgba(247,168,62,0.55), rgba(247,168,62,0) 58%), radial-gradient(circle at 80% 75%, rgba(240,168,192,0.45), rgba(240,168,192,0) 55%)'},
{n:'02',title:'User Research',desc:'Interview users, sales, and support; observe on site',project:'aca-ai',name:'AI Voice Agent',proof:'Call logs showed room service was a top request; the redesign took AI-completed orders from 0% to 95%',glow:'radial-gradient(circle at 55% 45%, rgba(176,150,226,0.5), rgba(176,150,226,0) 58%), radial-gradient(circle at 80% 78%, rgba(140,190,230,0.5), rgba(140,190,230,0) 55%)'},
{n:'03',iconId:'04',title:'Cross-team Collaboration',desc:'Define specs together with PMs and engineers',project:'17backstage',name:'1177 Merchant Back Office',proof:'Explained the reasoning behind the redesign; leadership adopted the guideline company-wide',glow:'radial-gradient(circle at 55% 45%, rgba(249,199,82,0.55), rgba(249,199,82,0) 58%), radial-gradient(circle at 80% 78%, rgba(150,210,170,0.5), rgba(150,210,170,0) 55%)'},
{n:'04',iconId:'05',title:'AI-Powered Workflow',desc:'AI in research and design systems; built a web-to-Figma plugin',project:'tms-ds',name:'TMS',proof:'Used Figma MCP and Claude Code to turn specs into a tokenized component library and a one-week prototype',glow:'radial-gradient(circle at 55% 45%, rgba(242,120,42,0.45), rgba(242,120,42,0) 58%), radial-gradient(circle at 80% 78%, rgba(176,150,226,0.5), rgba(176,150,226,0) 55%)'}
];
function WhatIBring({onOpen}){
const [w,setW]=React.useState(window.innerWidth);
React.useEffect(()=>{const f=()=>setW(window.innerWidth);window.addEventListener('resize',f);return ()=>window.removeEventListener('resize',f);},[]);
const narrow=w<820;
const zh=window.SITE_LANG==='zh';
const gridRef=React.useRef(null);const [shown,setShown]=React.useState(false);
React.useEffect(()=>{const el=gridRef.current;if(!el)return;const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){setShown(true);io.disconnect();}},{threshold:0.15});io.observe(el);return ()=>io.disconnect();},[]);
const [hover,setHover]=React.useState(null);
const open=id=>{const p=(window.PROJECTS_DATA||[]).find(x=>x.id===id);if(p&&onOpen)onOpen(p);};
const headSize='clamp(34px,4.4vw,52px)';
return React.createElement('section',{id:'core-capabilities-section',style:{position:'relative',zIndex:2,background:'#F7F5F1',padding:narrow?'64px 24px 72px':'96px 48px 104px'}},
React.createElement('div',{style:{maxWidth:1120,margin:'0 auto',width:'100%'}},
React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'20px 48px',marginBottom:narrow?32:56}},
React.createElement('div',null,
React.createElement('h2',{style:{margin:0,fontSize:headSize,lineHeight:1.12,letterSpacing:'-0.03em',fontWeight:600,color:'var(--ink-900)'}},
React.createElement('span',{style:{display:'block'}},window.t('What I bring')),
React.createElement('span',{style:{display:'block',fontWeight:400,fontStyle:zh?'normal':'italic',letterSpacing:zh?'0':'-0.01em',fontFamily:zh?"'Noto Serif TC','Songti TC',serif":"'Instrument Serif',Georgia,serif"}},window.t('to the team.')))
)
),
React.createElement('div',{ref:gridRef,style:{display:'grid',gridTemplateColumns:narrow?'minmax(0,1fr)':'repeat(2,minmax(0,1fr))',gap:16}},
items.map((it,i)=>React.createElement('div',{key:it.n,onClick:()=>open(it.project),onMouseEnter:()=>setHover(i),onMouseLeave:()=>setHover(null),style:{cursor:'pointer',position:'relative',overflow:'hidden',minWidth:0,minHeight:narrow?0:300,display:'flex',flexDirection:'column',borderRadius:20,background:'#FCFBF9',border:'1px solid rgba(36,29,24,0.06)',padding:narrow?'24px 22px':'30px 32px',boxShadow:hover===i?'0 18px 40px -24px rgba(36,29,24,0.28)':'0 1px 0 rgba(36,29,24,0.02)',opacity:shown?1:0,transform:shown?(hover===i?'translateY(-3px)':'translateY(0)'):'translateY(12px)',transition:'opacity 0.7s cubic-bezier(0.16,1,0.3,1) '+(i*0.08)+'s, transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s'}},
React.createElement('div',{'aria-hidden':true,style:{position:'absolute',right:narrow?-30:-40,top:narrow?-30:'50%',width:narrow?190:'52%',aspectRatio:'1/1',transform:narrow?'none':'translateY(-50%)',pointerEvents:'none'}},
React.createElement('div',{style:{position:'absolute',inset:0,background:it.glow,filter:'blur(18px)'}}),
React.createElement('div',{style:{position:'absolute',left:'50%',top:'50%',width:narrow?96:150,height:narrow?96:150,transform:'translate(-50%,-50%)'}},React.createElement('image-slot',{id:'cap-icon-'+(it.iconId||it.n),fetchpriority:'low',bare:'',hires:'',fit:'contain',placeholder:'Icon',style:{display:'block',width:'100%',height:'100%'}}))
),
React.createElement('div',{style:{position:'relative',maxWidth:narrow?'100%':'60%',display:'flex',flexDirection:'column',flex:1}},
React.createElement('div',{style:{fontSize:12,fontWeight:500,color:'var(--ink-900)',marginBottom:narrow?18:22}},it.n),
React.createElement('div',{style:{fontSize:narrow?21:24,fontWeight:500,lineHeight:1.25,letterSpacing:'-0.01em',color:'var(--ink-900)',marginBottom:12,paddingRight:narrow?120:0}},window.t(it.title)),
React.createElement('div',{style:{fontSize:14,lineHeight:1.6,color:'var(--text-muted)',marginBottom:12,paddingRight:narrow?100:0}},window.t(it.desc)),
React.createElement('div',{style:{fontSize:13.5,lineHeight:1.65,color:'#3B4657'}},window.t(it.proof)),
React.createElement('div',{style:{display:'flex',alignItems:'center',gap:12,marginTop:'auto',paddingTop:22}},
React.createElement('span',{style:{width:40,height:40,flexShrink:0,borderRadius:'50%',background:'var(--ink-900)',display:'flex',alignItems:'center',justifyContent:'center',transform:hover===i?'translateX(3px)':'none',transition:'transform 0.3s cubic-bezier(0.16,1,0.3,1)'}},
React.createElement('svg',{width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'#fff',strokeWidth:2.2,strokeLinecap:'round',strokeLinejoin:'round'},React.createElement('path',{d:'M5 12h14M13 6l6 6-6 6'}))),
React.createElement('span',{style:{fontSize:13,fontWeight:500,color:'var(--ink-900)'}},window.t(it.name)+(zh?' 案例':' case study'))
)
)
))
)
)
);
}
window.WhatIBring=WhatIBring;
