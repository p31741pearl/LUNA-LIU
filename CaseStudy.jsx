function splitLead(text){
const m=text.match(/^(.*?[：;;。])/);
if(m&&m[1].length<text.length) return [m[1],text.slice(m[1].length)];
const idx=text.indexOf(',');
if(idx>2&&idx<text.length-2) return [text.slice(0,idx+1),text.slice(idx+1)];
return [text,''];
}

function BarRow(bar,j){
return React.createElement('div',{key:j,style:{display:'flex',alignItems:'center',gap:12}},
React.createElement('span',{style:{width:140,flexShrink:0,fontSize:13,fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",color:bar.bold?'#0b0b0b':'#52514e',textAlign:'right',fontWeight:bar.bold?500:400}},bar.label),
React.createElement('div',{style:{flex:1,background:'#E3E3E5',borderRadius:4,height:11,position:'relative'}},
React.createElement('div',{style:{width:bar.pct+'%',height:'100%',background:bar.color,borderRadius:4}})
),
React.createElement('span',{style:{width:34,flexShrink:0,fontSize:13,fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",fontWeight:500,color:'#0b0b0b',textAlign:'right'}},bar.value)
);
}
function BarChart(bars){
return React.createElement('div',{style:{maxWidth:420,margin:'0 auto',display:'flex',flexDirection:'column',gap:14,width:'100%'}},
bars.map(BarRow)
);
}
function CaseBlock(b,i,pid){
const cont=!b.heading;
const uid=(j,suf)=>'block-'+(pid||'p')+'-'+i+'-'+j+(suf||'');
return React.createElement('div',{key:i,style:{marginBottom:40,marginTop:cont?-24:0}},
b.heading&&React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:16,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:window.__csDark?'#E3A33B':'#A66A00',marginBottom:14}},b.heading),
b.type==='text'&&b.title&&React.createElement('div',{style:{fontSize:19,fontWeight:600,color:'var(--text)',marginBottom:14,lineHeight:1.5}},b.title),
React.createElement('div',{style:(b.sideImgId||b.sideChart)?{display:'flex',flexDirection:window.__csNarrow?'column':'row',gap:window.__csNarrow?24:32,alignItems:'stretch'}:null},
React.createElement('div',{style:{flex:1,minWidth:0}},
b.type==='text'&&b.items.map((t,j)=>{
const isObj=typeof t==='object';
const text=isObj?t.text:t;
if(isObj&&t.imgId)return React.createElement('div',{key:j,style:{display:'flex',flexWrap:'wrap',gap:20,alignItems:'flex-start',marginBottom:12}},
React.createElement('div',{style:{flex:'1 1 200px',maxWidth:window.__csPhone?'100%':200}},
React.createElement('image-slot',{id:'block-'+t.imgId,shape:'rect',fit:'contain',placeholder:'Add illustration'})
),
React.createElement('p',{style:{fontSize:16,lineHeight:1.7,color:'var(--text)',margin:0,flex:1}},text)
);
return React.createElement('p',{key:j,style:{fontSize:16,lineHeight:1.7,color:'var(--text)',marginBottom:12,whiteSpace:'pre-line'}},text);
}),
b.type==='bullets'&&React.createElement('ul',{style:{margin:0,paddingLeft:20,display:'flex',flexDirection:'column',gap:12}},b.items.map((t,j)=>{
const [lead,rest]=splitLead(t);
return React.createElement('li',{key:j,style:{fontSize:16,lineHeight:1.7,color:'var(--text)'}},lead,rest);
})),
b.type==='cards'&&(()=>{
// Wide screens (1100px+): cards sit side by side (stat on top); narrower screens keep the stacked rows.
const wide=!!window.__csWide;const n=b.items.length;const nStat=b.items.filter(x=>x.stat).length;
// Cards with numbers share a row; cards without one span the full width (a lone number card does too, unless it's one of four).
const splitRows=nStat>=1&&nStat<n&&(nStat>=2||n<=3);const cols=splitRows?nStat:(n===4?2:Math.min(n,3));
const cardStyle={background:window.__csDark?'#18181B':'#FFFFFF',border:'1px solid color-mix(in srgb, var(--ink-900) 7%, transparent)',borderRadius:16,padding:wide?'24px':'22px 24px',display:'flex',flexDirection:wide?'column':'row',flexWrap:wide?'nowrap':'wrap',alignItems:wide?'stretch':'center',gap:wide?14:'12px 32px',minWidth:0,boxShadow:(window.__csDark?'inset 0 1px 0 rgba(255,255,255,0.06)':'inset 0 1px 0 rgba(255,255,255,0.8)')+', 0 4px 14px -8px color-mix(in srgb, var(--ink-900) 14%, transparent)'};
const statEl=it=>React.createElement('div',{style:{flex:wide?'none':(window.__csPhone?'0 0 auto':'0 0 176px'),display:'flex',flexDirection:'column',gap:2}},
React.createElement('div',{style:{fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",fontSize:window.__csPhone?36:44,fontWeight:600,letterSpacing:'-0.03em',lineHeight:1,color:window.__csDark?'#E3A33B':'#A66A00',whiteSpace:'nowrap'}},String(it.stat).split(/\s*([\u4e00-\u9fff]+)/).map((part,k)=>/[\u4e00-\u9fff]/.test(part)?React.createElement('span',{key:k,style:{fontSize:'0.55em',marginLeft:'0.1em'}},part):part)),
React.createElement('div',{style:{fontSize:13,color:'var(--text-muted)',lineHeight:1.4}},it.statUnit)
);
// e.g. 46 of 50 test calls as a dot grid.
const dotsEl=it=>it.dots&&React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:6}},
React.createElement('div',{'aria-hidden':true,style:{display:'grid',gridTemplateColumns:'repeat(10,10px)',gap:5}},Array.from({length:it.dots.total},(_,k)=>React.createElement('span',{key:k,style:{width:10,height:10,borderRadius:5,background:k<it.dots.hit?(window.__csDark?'#E3A33B':'#A66A00'):'color-mix(in srgb, var(--ink-900) 14%, transparent)'}}))),
React.createElement('div',{style:{fontSize:12,color:'var(--text-muted)'}},it.dots.hit+' / '+it.dots.total+' '+window.t('calls completed'))
);
return React.createElement('div',{style:wide?{display:'grid',gridTemplateColumns:'repeat('+cols+',minmax(0,1fr))',gap:16}:{display:'flex',flexDirection:'column',gap:16}},b.items.map((it,j)=>React.createElement('div',{key:j,style:wide&&splitRows&&!it.stat?{...cardStyle,gridColumn:'1 / -1'}:cardStyle},
it.stat&&statEl(it),
React.createElement('div',{style:{flex:wide?'none':'1 1 240px',minWidth:0,display:'flex',flexDirection:'column',gap:6}},
React.createElement('div',{style:{fontSize:wide?17:18,fontWeight:600,color:'var(--text)',lineHeight:1.35}},it.title),
it.text&&React.createElement('div',{style:{fontSize:15,lineHeight:1.65,color:'var(--text-muted)'}},it.text)
),
dotsEl(it),
it.detail&&React.createElement('div',{style:{fontSize:14,lineHeight:1.7,color:'var(--text)',whiteSpace:'pre-line'}},it.detail)
)));})(),
b.type==='text-image'&&b.items.map((it,j)=>{const nx=b.items[j+1];const imgOnly=x=>x&&!x.title&&!x.text&&!x.noImage;return React.createElement('div',{key:j,style:{marginBottom:(imgOnly(nx)&&!it.noImage&&!it.caption)?16:28}},
it.sideImgId?React.createElement('div',{style:{display:'flex',flexWrap:'wrap',gap:24,alignItems:'flex-start',marginBottom:16}},
React.createElement('div',{style:{flex:'1 1 280px',minWidth:0}},
it.title&&React.createElement('div',{style:{fontSize:(it.small||it.title.startsWith('\u2022'))?16:19,fontWeight:600,color:'var(--text)',marginBottom:it.compact?0:8,lineHeight:it.compact?1.25:1.5}},it.title),
it.text&&React.createElement('p',{style:{fontSize:16,lineHeight:1.7,color:'var(--text)',marginBottom:0,whiteSpace:'pre-line'}},it.text)
),
React.createElement('div',{style:{flex:'1 1 240px',minWidth:0,borderRadius:'var(--radius-lg,16px)',overflow:'hidden'}},
React.createElement('image-slot',{id:'block-'+it.sideImgId,shape:'rect',fit:'contain','natural-ratio':'',placeholder:'Add illustration'})
)
):React.createElement(React.Fragment,null,
it.title&&React.createElement('div',{style:{fontSize:(it.small||it.title.startsWith('\u2022'))?16:19,fontWeight:600,color:'var(--text)',marginBottom:it.compact?0:8,lineHeight:it.compact?1.25:1.5}},it.title),
it.text&&React.createElement('p',{style:{fontSize:16,lineHeight:1.7,color:'var(--text)',marginBottom:16,whiteSpace:'pre-line'}},it.text)
),
it.extraImgId&&React.createElement('div',{style:{display:'flex',gap:16,marginBottom:16,alignItems:'stretch',height:340,maxWidth:'100%'}},
React.createElement('div',{style:{flex:'1 1 0',minWidth:0,borderRadius:'var(--radius-lg,16px)',overflow:'hidden',height:'100%'}},
React.createElement('image-slot',{id:'block-'+it.extraImgId,shape:'rect',fit:'contain',placeholder:'Add illustration'})
),
React.createElement('div',{style:{flex:'1.6 1 260px',minWidth:0,borderRadius:'var(--radius-lg,16px)',overflow:'hidden',height:'100%'}},
React.createElement('image-slot',{id:it.imgId?'block-'+it.imgId:uid(j),shape:'rect',fit:'contain',placeholder:'Add illustration'})
)
),
it.pairIds&&React.createElement('div',{style:{display:'grid',gridTemplateColumns:window.__csPhone?'minmax(0,1fr)':(it.pairCols||'repeat(2,minmax(0,1fr))'),gap:16,alignItems:'stretch'}},it.pairIds.map(pid=>React.createElement('div',{key:pid,style:{aspectRatio:it.pairCols?'auto':'4/3',height:it.pairCols?'clamp(220px,30vw,360px)':'auto',borderRadius:'var(--radius-lg,16px)',overflow:'hidden',background:window.__csDark?'#18181B':'#FFFFFF'}},React.createElement('image-slot',{id:'block-'+pid,shape:'rect',fit:'contain',placeholder:'Add illustration'})))),
!it.pairIds&&!it.extraImgId&&!it.noImage&&(it.natural?(it.imgId2?React.createElement('div',{style:{display:'flex',flexDirection:window.__csNarrow?'column':'row',gap:16,alignItems:window.__csNarrow?'stretch':'flex-start'}},
React.createElement('div',{style:{flex:window.__csNarrow?'none':(it.flex1||1)+' 1 0',minWidth:0,borderRadius:'var(--radius-lg,16px)',overflow:'hidden'}},
React.createElement('image-slot',{id:it.imgId?'block-'+it.imgId:uid(j),shape:'rect',fit:'contain','natural-ratio':'',placeholder:'Add illustration'})
),
React.createElement('div',{style:{flex:window.__csNarrow?'none':(it.flex2||1)+' 1 0',minWidth:0,borderRadius:'var(--radius-lg,16px)',overflow:'hidden'}},
React.createElement('image-slot',{id:it.imgId2?'block-'+it.imgId2:uid(j,'-b'),shape:'rect',fit:'contain','natural-ratio':'',placeholder:'Add illustration'})
)
):React.createElement('div',{style:{borderRadius:'var(--radius-lg,16px)',overflow:'hidden',maxWidth:it.smallImg?'60%':'100%'}},
React.createElement('image-slot',{id:it.imgId?'block-'+it.imgId:uid(j),shape:'rect',fit:'contain','natural-ratio':'',placeholder:'Add illustration'})
)):React.createElement('div',{style:{aspectRatio:it.ratio||'16/9',borderRadius:'var(--radius-lg,16px)',overflow:'hidden',background:window.__csDark?'#18181B':'#FFFFFF'}},
React.createElement('image-slot',{id:it.imgId?'block-'+it.imgId:uid(j),shape:'rect',placeholder:'Add illustration'})
)),
it.compare&&(()=>{
const cols={display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:window.__csPhone?8:16};
const tagStyle=tag=>({textAlign:'center',fontSize:13,fontWeight:600,color:tag==='New UI'?(window.__csDark?'#E3A33B':'#A66A00'):'var(--text-muted)'});
return React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:window.__csPhone?8:16}},
React.createElement('div',{style:cols},['Old UI','New UI'].map(tag=>React.createElement('div',{key:tag,style:tagStyle(tag)},window.t(tag)))),
it.compare.filter(c=>c.before&&c.after).map(c=>React.createElement('div',{key:c.before,style:cols},[['Old UI',c.before],['New UI',c.after]].map(([tag,src])=>React.createElement('div',{key:tag,style:{minWidth:0,borderRadius:window.__csPhone?8:12,overflow:'hidden',background:'#111',aspectRatio:'16/9'}},
React.createElement('img',{src,alt:window.t(c.label||'')+' '+window.t(tag),loading:'lazy',width:1280,height:720,style:{display:'block',width:'100%',height:'100%',objectFit:'cover'}})
))))
);})(),
it.chat&&React.createElement('div',{style:{display:'grid',gridTemplateColumns:window.__csPhone?'minmax(0,1fr)':'repeat(2,minmax(0,1fr))',gap:16}},[['Old',it.chat.before,false],['New',it.chat.after,true]].map(([tag,lines,good])=>React.createElement('div',{key:tag,style:{minWidth:0,borderRadius:16,padding:'16px 18px',background:window.__csDark?'#18181B':'#F4F4F6',border:good?'1.5px solid '+(window.__csDark?'#E3A33B':'#A66A00'):'1px solid color-mix(in srgb, var(--ink-900) 7%, transparent)',display:'flex',flexDirection:'column',gap:10}},
React.createElement('div',{style:{fontSize:13,fontWeight:600,color:good?(window.__csDark?'#E3A33B':'#A66A00'):'var(--text-muted)'}},window.t(tag==='Old'?'Before the guidelines':'After the guidelines')),
lines.map((l,k)=>{const ai=l.who==='ai';return React.createElement('div',{key:k,style:{display:'flex',flexDirection:'column',alignItems:ai?'flex-start':'flex-end',gap:3}},
React.createElement('div',{style:{fontSize:11,color:'var(--text-faint)'}},ai?'AI':window.t('Guest')),
React.createElement('div',{style:{maxWidth:'88%',fontSize:15,lineHeight:1.55,padding:'9px 13px',borderRadius:ai?'4px 14px 14px 14px':'14px 4px 14px 14px',background:ai?(good?(window.__csDark?'#3A2E17':'#FBF1DC'):(window.__csDark?'#26262A':'#FFFFFF')):(window.__csDark?'#2E2E33':'#E3E3E7'),color:'var(--text)'}},window.t(l.text)));})
))),
it.media&&React.createElement('div',{style:{borderRadius:'var(--radius-lg,16px)',overflow:'hidden',background:window.__csDark?'#18181B':'#F4F4F6',aspectRatio:it.mediaRatio||'16/9',border:'1px solid color-mix(in srgb, var(--ink-900) 7%, transparent)'}},
React.createElement('img',{src:it.media,alt:window.t(it.title||''),loading:'lazy',style:{display:'block',width:'100%',height:'100%',objectFit:'cover'}})),
it.iconGrid&&React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat('+(it.iconCols||5)+',minmax(0,1fr))',gap:window.__csPhone?6:12,maxWidth:640,margin:'8px auto 0'}},it.iconGrid.map(src=>React.createElement('img',{key:src,src,alt:'',loading:'lazy',style:{display:'block',width:'100%',height:'auto',borderRadius:4}}))),
it.caption&&React.createElement('div',{style:{fontSize:14,lineHeight:1.6,color:'var(--text-muted)',marginTop:10,textAlign:'center'}},it.caption)
);}),
b.type==='quotes'&&(()=>{
const [main,...rest]=b.items;
return React.createElement('div',null,
React.createElement('div',{style:{borderLeft:'3px solid var(--primary-strong)',paddingLeft:20}},
React.createElement('div',{style:{fontSize:20,lineHeight:1.5,fontWeight:500,color:'var(--text)',fontStyle:'italic'}},'“'+main.text+'”'),
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-muted)',marginTop:10}},'— '+main.source)
),
rest.length>0&&React.createElement('p',{style:{fontSize:13,lineHeight:1.7,color:'var(--text-faint)',marginTop:16}},
rest.map(q=>'“'+q.text+'” — '+q.source).join(' ')
)
);
})()
),
b.sideChart&&React.createElement('div',{style:{flex:window.__csNarrow?'none':'0 0 33.33%',alignSelf:window.__csNarrow?'stretch':'flex-start',display:'flex',justifyContent:'center',background:'#F2F2F4',borderRadius:'var(--radius-lg,16px)',padding:24}},BarChart(b.sideChart)),
b.sideImgId&&React.createElement('div',{style:{flex:window.__csNarrow?'none':'0 0 33.33%',aspectRatio:'341/400',borderRadius:'var(--radius-lg,16px)',overflow:'hidden',alignSelf:'flex-start'}},
React.createElement('image-slot',{id:'block-'+b.sideImgId,shape:'rect',fit:'cover',placeholder:'Add illustration'})
)
)
);
}

function SideItem(label,value){
if(!value)return null;
return React.createElement('div',null,
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--text-faint)',marginBottom:window.__csNarrow?2:4}},window.t(label)),
React.createElement('div',{style:{fontSize:14,lineHeight:window.__csNarrow?1.5:1.6,color:'var(--text)',whiteSpace:'pre-line'}},value)
);
}

// Dark theme for projects with dark:true: these tokens override the light ones for everything inside the case study.
const CASE_DARK_VARS={'--surface':'#0E0E10','--text':'#EDEDEF','--text-muted':'#A3A3AA','--text-faint':'#7A7A82','--ink-900':'#F4F4F6','--ink-700':'#D4D4D8','--border':'rgba(255,255,255,0.12)','--primary-strong':'#E3A33B'};

function DarkBackButton({onClick,style}){
const [hover,setHover]=React.useState(false);
return React.createElement('button',{onClick,onMouseEnter:()=>setHover(true),onMouseLeave:()=>setHover(false),style:{fontFamily:'var(--font-sans)',fontSize:12,fontWeight:'var(--fw-medium)',border:'none',borderRadius:'var(--radius-sm)',cursor:'pointer',background:hover?'rgba(255,255,255,0.08)':'transparent',color:hover?'var(--text)':'var(--text-muted)',transition:'all var(--dur-base) var(--ease-expo-out)',...style}},window.t('← Back to all work'));
}

function CaseStudy({project,onBack,hideCover,onOpenOther}){
const rootRef=React.useRef(null);
React.useEffect(()=>{let el=rootRef.current&&rootRef.current.parentElement;while(el&&el!==document.body){const oy=getComputedStyle(el).overflowY;if(oy==='auto'||oy==='scroll'){el.scrollTop=0;break;}el=el.parentElement;}},[project&&project.id]);
const [vw,setVw]=React.useState(window.innerWidth);
React.useEffect(()=>{const f=()=>setVw(window.innerWidth);window.addEventListener('resize',f);return ()=>window.removeEventListener('resize',f);},[]);
window.__csNarrow=vw<820;window.__csPhone=vw<560;window.__csWide=vw>=1100;
if(!project)return null;
const dark=!!project.dark;window.__csDark=dark;
const narrow=vw<820;
const {Button}=window.LunaLiuDesignSystem_29754e;
return React.createElement('div',{ref:rootRef,style:dark?{...CASE_DARK_VARS,background:'var(--surface)',color:'var(--text)',colorScheme:'dark',minHeight:'100%'}:undefined},
React.createElement('section',{style:{padding:narrow?'32px 20px 72px':'56px 48px 96px',maxWidth:1120,margin:'0 auto',display:'grid',gridTemplateColumns:narrow?'minmax(0,1fr)':'240px minmax(0,1fr)',gap:narrow?32:56,alignItems:'start',animation:'caseTextFadeIn 0.5s ease-in-out 0.15s both'}},
React.createElement('div',{style:{position:narrow?'static':'sticky',top:56,minHeight:narrow?0:'calc(100vh - 112px)',display:'flex',flexDirection:'column',gap:narrow?12:20}},
React.createElement('div',{style:{fontSize:26,fontWeight:600,letterSpacing:'-0.02em',color:'var(--ink-900)',lineHeight:1.3}},project.title),
SideItem('Project Type',project.projectType||'UX Design · Data Analysis'),
project.timelineFirst?SideItem('Timeline',project.timeline):SideItem('Platform',project.platform),
project.timelineFirst?SideItem('Platform',project.platform):SideItem('Timeline',project.timeline),
SideItem('Collaborators',project.collaborators),
SideItem('My Role',project.scope),
!narrow&&(dark?React.createElement(DarkBackButton,{onClick:onBack,style:{alignSelf:'flex-start',padding:'10px 14px',marginTop:'auto',marginBottom:16}}):React.createElement(Button,{variant:'ghost',size:'sm',onClick:onBack,style:{alignSelf:'flex-start',padding:'10px 14px',marginTop:'auto',marginBottom:16}},window.t('← Back to all work')))
),
React.createElement('div',{style:{minWidth:0}},
!hideCover&&React.createElement('div',{style:{position:'relative',width:'100%',height:(project.coverNatural||project.coverRatio||narrow)?'auto':(project.id==='guestweb'?'clamp(340px,58vh,580px)':'clamp(280px,44vh,440px)'),aspectRatio:narrow?undefined:(project.coverRatio||undefined),overflow:'hidden',borderRadius:16,marginBottom:40,opacity:0,animation:'caseImgSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) both'}},
React.createElement('image-slot',{key:'cv'+(narrow?1:0),id:'modal-cover-'+project.id,shape:'rect','natural-ratio':(project.coverNatural||narrow)?'':undefined,placeholder:'Add a lifestyle photo for '+project.title})
),
project.coverHeadline&&React.createElement('div',{style:{fontSize:'clamp(26px,3vw,36px)',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.25,color:'var(--ink-900)',marginTop:-8,marginBottom:40,textWrap:'pretty'}},project.coverHeadline),
// Results and the finished product come first, so the page opens on outcomes and visuals before the story.
project.blocks.map((b,i)=>[b,i]).sort((x,y)=>((x[0].pin||9)-(y[0].pin||9))||(x[1]-y[1])).map(([b,i])=>CaseBlock(b,i,project.id)),
onOpenOther&&React.createElement('div',{style:{marginTop:24,paddingTop:40,borderTop:'1px solid var(--border)'}},
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:16,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:window.__csDark?'#E3A33B':'#A66A00',marginBottom:20}},window.t('Keep Reading')),
React.createElement('div',{style:{display:'grid',gridTemplateColumns:window.__csPhone?'minmax(0,1fr)':'repeat(2,minmax(0,1fr))',gap:24}},
window.SITE_VARIANT.order.filter(id=>id!==project.id).map(id=>(window.PROJECTS_DATA||[]).find(p=>p.id===id)).filter(Boolean).map(p=>React.createElement('div',{key:p.id,onClick:()=>onOpenOther(p),style:{cursor:'pointer',display:'flex',flexDirection:'column',gap:12},onMouseEnter:e=>{e.currentTarget.style.transform='translateY(-4px)';},onMouseLeave:e=>{e.currentTarget.style.transform='translateY(0)';}},
React.createElement('div',{style:{position:'relative',width:'100%',aspectRatio:'4/3',overflow:'hidden',borderRadius:16,background:window.__csDark?'#18181B':'#F4F4F6',boxShadow:'0 6px 18px -12px color-mix(in srgb, var(--ink-900) 18%, transparent)',pointerEvents:'none'}},
React.createElement('image-slot',{id:'cover-'+p.id+(p.id==='aca-ai'?'-v3':''),shape:'rect',placeholder:'Add a lifestyle photo for '+p.title})
),
React.createElement('div',{style:{display:'flex',flexWrap:'wrap',gap:6}},(p.labels||[]).map(l=>React.createElement('div',{key:l,style:{fontSize:12,fontWeight:500,color:'var(--ink-700,#3a3935)',background:'color-mix(in srgb, var(--ink-900) 6%, transparent)',padding:'5px 10px',borderRadius:8,whiteSpace:'nowrap'}},l))),
React.createElement('div',{style:{fontSize:17,fontWeight:600,letterSpacing:'-0.01em',color:'var(--ink-900)',lineHeight:1.4}},p.title)
))
)
)
)
)
);
}
window.PortfolioCaseStudy=CaseStudy;
window.LunaCaseBlock=CaseBlock;
