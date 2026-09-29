function ProjectCard(p){
const {project,onOpen,setRef,isMobile,wide}=p;
const [hover,setHover]=React.useState(false);
return React.createElement('div',{
ref:setRef,
'data-project-id':project.id,
onClick:()=>onOpen(project),
onMouseEnter:()=>setHover(true),
onMouseLeave:()=>setHover(false),
style:{cursor:'pointer',display:'flex',flexDirection:'column',transform:hover?'translateY(-4px)':'translateY(0)',transition:'transform 0.35s cubic-bezier(0.16,1,0.3,1)'}
},
React.createElement('div',{style:{position:'relative',width:'100%',aspectRatio:isMobile?'16/10':(wide?'21/9':'4/3'),overflow:'hidden',borderRadius:24,background:'#F4F4F6',boxShadow:hover?'0 18px 40px -16px color-mix(in srgb, var(--ink-900) 26%, transparent)':'0 6px 18px -12px color-mix(in srgb, var(--ink-900) 18%, transparent)',transition:'box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)'}},
React.createElement('image-slot',{id:'cover-'+project.id+(project.id==='aca-ai'?'-v3':''),shape:'rect',src:project.id==='aca-ai'?'uploads/39706.jpg':undefined,placeholder:'Add a lifestyle photo for '+project.title}),
),
React.createElement('div',{style:{display:'flex',flexDirection:'column',alignItems:'center',gap:12,padding:'22px 8px 0'}},
React.createElement('div',{style:{display:'flex',flexWrap:'wrap',gap:6,justifyContent:'center'}},
(project.labels||[]).map(l=>React.createElement('div',{key:l,style:{fontSize:12,fontWeight:500,color:'var(--ink-700,#3a3935)',background:'color-mix(in srgb, var(--ink-900) 6%, transparent)',padding:'5px 10px',borderRadius:8,whiteSpace:'nowrap'}},l))
),
React.createElement('div',{style:{fontSize:17,fontWeight:600,letterSpacing:'-0.01em',color:'var(--ink-900)',lineHeight:1.4,textAlign:'center',textWrap:'pretty'}},project.title)
)
);
}
function ProjectGrid({onOpen}){
const [ready,setReady]=React.useState(!!window.LunaLiuDesignSystem_29754e);
React.useEffect(()=>{
if(ready) return;
const id=setInterval(()=>{ if(window.LunaLiuDesignSystem_29754e){ setReady(true); clearInterval(id); } },50);
return ()=>clearInterval(id);
},[ready]);
const [isMobile,setIsMobile]=React.useState(false);
React.useEffect(()=>{
const check=()=>setIsMobile(window.innerWidth<860);
check();
window.addEventListener('resize',check);
return ()=>window.removeEventListener('resize',check);
},[]);
const refs=React.useRef({});
if(!ready) return React.createElement('section',{style:{minHeight:400}});
const data=window.PROJECTS_DATA;
const order=window.SITE_VARIANT.order;
const items=order.map(id=>data.find(p=>p.id===id)).filter(Boolean);
return React.createElement('section',{id:'project-grid-section',style:{position:'relative',zIndex:1}},
React.createElement('div',{style:{position:'absolute',inset:0,zIndex:0,background:'radial-gradient(85% 78% at 0% 0%, rgba(255,255,255,0.82), rgba(255,255,255,0) 78%), radial-gradient(85% 78% at 100% 0%, rgba(255,255,255,0.82), rgba(255,255,255,0) 78%), radial-gradient(85% 78% at 0% 100%, rgba(255,255,255,0.82), rgba(255,255,255,0) 78%), radial-gradient(85% 78% at 100% 100%, rgba(255,255,255,0.82), rgba(255,255,255,0) 78%), rgba(246,247,248,0.42)',WebkitMaskImage:'linear-gradient(to bottom, transparent 0, #000 120px, #000 calc(100% - 160px), transparent 100%)',maskImage:'linear-gradient(to bottom, transparent 0, #000 120px, #000 calc(100% - 160px), transparent 100%)'}}),
React.createElement('div',{style:{position:'relative',zIndex:1,padding:isMobile?'64px 24px':'88px 48px',maxWidth:1120,margin:'0 auto'}},
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:28,fontWeight:600,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'#A66A00',marginBottom:40,lineHeight:1.05}},'Selected Work'),
React.createElement('div',{style:{display:'grid',gridTemplateColumns:isMobile?'minmax(0,1fr)':'repeat(2,minmax(0,1fr))',gap:isMobile?32:40,alignItems:'stretch'}},
items.map((project,i)=>React.createElement('div',{key:project.id,style:{gridColumn:(!isMobile&&i===0)?'1 / -1':'auto'}},React.createElement(ProjectCard,{project,onOpen,isMobile,wide:i===0,setRef:el=>{refs.current[project.id]=el;}})))
)
)
);
}
window.LunaProjectGrid=ProjectGrid;
