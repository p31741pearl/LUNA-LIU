function Contact(){
const {Button}=window.LunaLiuDesignSystem_29754e;
return React.createElement('section',{style:{padding:'80px 48px 128px',maxWidth:520,margin:'0 auto',textAlign:'center'}},
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:16}},window.t('03 / Contact')),
React.createElement('h2',{style:{fontSize:32,fontWeight:600,letterSpacing:'-0.03em',marginBottom:16}},window.t('Let’s talk.')),
React.createElement('p',{style:{fontSize:16,lineHeight:1.6,color:'var(--text-muted)',marginBottom:28}},window.t('Whether it’s hardware × software experience design or data-driven product iteration, I’d love to chat.')),
React.createElement(Button,{variant:'primary',onClick:()=>window.location.href='mailto:pearl880517@gmail.com'},'pearl880517@gmail.com')
);
}
window.Contact=Contact;
