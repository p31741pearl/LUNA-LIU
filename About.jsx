const steps=[
{n:'01',title:'Uncover the real need',desc:'Use interviews and on-site observation to find where users actually get stuck. For example, walking into a hotel to observe how the front desk, housekeeping, and F&B teams really work.'},
{n:'02',title:'Validate assumptions with real data',desc:'Go back to call logs and back-office monitoring data to make sure assumptions hold up. For example, using call logs to pinpoint where a voice conversation flow breaks down.'},
{n:'03',title:'Systematize into scalable specs',desc:'Distill findings into design guidelines that are concrete, actionable, and able to keep scaling. For example, consolidating custom requests from many hotels into a single set of component specs.'}
];
const countries=['Taiwan','Singapore','Thailand','Vietnam'];
const career=[
{y:'2023 – Now',co:'Aiello',d:'Designer for AI voice and hospitality SaaS, covering smart speakers, phone ordering, and mobile web'},
{y:'2021–2023',co:'1177 Tech',d:'Financial back-office tools, a mobile payment app, the corporate website, and an internal EIP; built a design system spanning product lines'},
{y:'2020',co:'AVerMedia',d:'Designed boot-up lighting and device panel motion for a live-streaming mixer, bridging software UI and hardware LEDs'}
];
const stats=[{value:'8+',label:'Hotel brand partners'},{value:'4',label:'Countries / regions served'}];
function SiteAbout(){
const {Badge}=window.LunaLiuDesignSystem_29754e;
const skills=['User research','Design system planning (spec breakdown, component taxonomy)','Cross-functional collaboration (with engineers / PMs / clients)','Using AI tools to rapidly prototype and iterate','Hardware × software experience design (smart speakers, in-room smart devices)','Data-driven conversation flow optimization (call log analysis, data interpretation)'];
const tools=['Figma','HTML / CSS','Adobe'];
const [narrow,setNarrow]=React.useState(window.innerWidth<860);
React.useEffect(()=>{const f=()=>setNarrow(window.innerWidth<860);window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f);},[]);
const title=React.createElement('h2',{style:{fontSize:32,fontWeight:600,letterSpacing:'-0.03em',marginBottom:narrow?0:28,position:'relative',isolation:'isolate',display:'inline-block'}},React.createElement('span',{'aria-hidden':true,style:{position:'absolute',left:-28,top:'50%',width:96,height:96,transform:'translateY(-50%)',borderRadius:'50%',background:'radial-gradient(38% 22% at 50% 6%, rgba(176,150,226,0.8), rgba(176,150,226,0) 100%), linear-gradient(195deg, #F2782A 0%, #F58A30 28%, #F7A83E 55%, #F9C752 80%, #FAD767 100%)',filter:'blur(10px)',opacity:0.75,zIndex:-1,pointerEvents:'none'}}),'Luna Liu');
const photoEl=React.createElement('div',{style:{aspectRatio:'4 / 5',flexShrink:0,width:narrow?112:'100%',borderRadius:16,overflow:'hidden'}},React.createElement('image-slot',{id:'about-photo',hires:'',placeholder:'Profile photo',style:{display:'block',width:'100%',height:'100%'}}));
return React.createElement('section',{style:{padding:narrow?'64px 24px':'80px 48px',maxWidth:1120,margin:'0 auto',display:'grid',gridTemplateColumns:narrow?'minmax(0,1fr)':'200px minmax(0,640px)',justifyContent:'center',gap:narrow?28:64,alignItems:'start'}},
narrow?React.createElement('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}},title,photoEl):photoEl,
React.createElement('div',{style:{minWidth:0}},
narrow?null:title,
React.createElement('p',{style:{margin:'0 0 36px',fontSize:17,lineHeight:1.7,color:'var(--text)',textWrap:'pretty'}},'5 years of UI/UX experience, focused on AI voice and hospitality SaaS products. I specialize in translating engineering constraints and real-world usage into scalable design systems.'),
React.createElement('h3',{style:{fontSize:20,fontWeight:600,letterSpacing:'-0.01em',margin:'0 0 20px'}},'Working at the intersection of hardware and software'),
React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:20,marginBottom:48}},career.map(c=>React.createElement('div',{key:c.co,style:{display:'grid',gridTemplateColumns:narrow?'minmax(0,1fr)':'96px minmax(0,1fr)',gap:narrow?4:20}},
React.createElement('div',{style:{fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",fontSize:14,color:'#A66A00',paddingTop:2}},c.y),
React.createElement('div',{style:{fontSize:16,lineHeight:1.6,color:'var(--text)',textWrap:'pretty'}},React.createElement('span',{style:{fontWeight:600,display:'block',marginBottom:2}},c.co),c.d)
))),
React.createElement('div',{style:{fontSize:14,fontWeight:500,color:'var(--text-muted)',marginBottom:12}},'Tools'),
React.createElement('div',{style:{display:'flex',gap:10,flexWrap:'wrap',marginBottom:64}},tools.map(t=>React.createElement(Badge,{key:t,variant:'outline',style:{fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",fontSize:12}},t))),

React.createElement('h2',{style:{fontSize:20,fontWeight:600,letterSpacing:'-0.01em',marginBottom:28}},'How I Work'),
React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:20,marginBottom:64}},steps.map(s=>React.createElement('div',{key:s.n,style:{display:'flex',gap:20}},
React.createElement('div',{style:{fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",fontSize:14,color:'var(--primary-strong)',flexShrink:0,paddingTop:1}},s.n),
React.createElement('div',null,
React.createElement('div',{style:{fontSize:16,fontWeight:600,marginBottom:4}},s.title),
React.createElement('div',{style:{fontSize:14,lineHeight:1.6,color:'var(--text-muted)'}},s.desc)
)
))),
React.createElement('a',{href:'https://drive.google.com/drive/folders/1XALJ8GZUo-nuZVn3wBFxr7idXlIw1IAG?usp=sharing',target:'_blank',rel:'noopener noreferrer',style:{display:'inline-block',fontSize:14,fontWeight:500,color:'#FFFFFF',background:'var(--ink-900)',padding:'8px 18px',borderRadius:999,textDecoration:'none',lineHeight:1.2}},'Resume')
)
);
}
window.SiteAbout=SiteAbout;
