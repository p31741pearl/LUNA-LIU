function SiteHeader({active,onNav}){
const links=['Work','About'];
const home=active==='Home';const [scrolled,setScrolled]=React.useState(window.scrollY>8);
React.useEffect(()=>{const f=()=>setScrolled(window.scrollY>8);f();window.addEventListener('scroll',f,{passive:true});return ()=>window.removeEventListener('scroll',f);},[]);
const solid=!home||scrolled;
const [narrow,setNarrow]=React.useState(window.innerWidth<640);const [tiny,setTiny]=React.useState(window.innerWidth<360);
React.useEffect(()=>{const f=()=>{setNarrow(window.innerWidth<640);setTiny(window.innerWidth<360);};window.addEventListener('resize',f);return ()=>window.removeEventListener('resize',f);},[]);
return React.createElement(React.Fragment,null,
React.createElement('header',{style:{position:'fixed',top:0,left:0,right:0,zIndex:1000,display:'flex',alignItems:'center',justifyContent:'space-between',padding:tiny?'20px 16px':narrow?'20px 20px':'20px 48px',gap:16,background:solid?'#FFFFFF':'rgba(255,255,255,0)',transition:'background-color 0.3s ease'}},
React.createElement('div',{'data-site-logo':'',style:{position:'relative',isolation:'isolate',fontFamily:"'Albert Sans',var(--font-sans,sans-serif)",fontSize:13,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0,cursor:'pointer'},onClick:()=>onNav('Home')},
React.createElement('span',{'data-site-moon':'','aria-hidden':true,style:{position:'absolute',left:-6,top:'50%',width:24,height:24,transform:'translateY(-50%)',borderRadius:'50%',background:'radial-gradient(38% 22% at 50% 6%, rgba(176,150,226,0.8), rgba(176,150,226,0) 100%), linear-gradient(195deg, #F2782A 0%, #F58A30 28%, #F7A83E 55%, #F9C752 80%, #FAD767 100%)',filter:'blur(3px)',opacity:0,zIndex:-1,pointerEvents:'none',transition:'opacity 0.15s linear'}}),
'Luna Liu'),
React.createElement('nav',{style:{display:'flex',alignItems:'center',gap:tiny?10:narrow?14:32,flexShrink:0}},
links.map(l=>React.createElement('span',{key:l,onClick:()=>onNav(l),style:{fontSize:14,fontWeight:500,whiteSpace:'nowrap',cursor:'pointer',color:active===l?'var(--text)':'var(--text-muted)',transition:'color var(--dur-fast) var(--ease-expo-out)'}},window.t(l))),
React.createElement('a',{href:window.langSwitchUrl(),lang:window.SITE_LANG==='zh'?'en':'zh-Hant',style:{fontSize:14,fontWeight:500,whiteSpace:'nowrap',color:'var(--text-muted)',textDecoration:'none'}},window.SITE_LANG==='zh'?'EN':'中文'),
React.createElement('a',{href:window.SITE_VARIANT.resumeUrl,target:'_blank',rel:'noopener noreferrer',style:{fontSize:14,fontWeight:500,color:'#FFFFFF',background:'var(--ink-900)',padding:tiny?'8px 12px':narrow?'8px 14px':'8px 18px',borderRadius:999,textDecoration:'none',lineHeight:1.2,whiteSpace:'nowrap'}},window.t('Resume'))
)
),
React.createElement('div',{style:{height:home?0:64}})
);
}
window.SiteHeader=SiteHeader;
