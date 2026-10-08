function Contact(){
const link={display:'inline-block',fontSize:15,fontWeight:500,padding:'12px 24px',borderRadius:999,textDecoration:'none',lineHeight:1.2};
return React.createElement('section',{id:'contact-section',style:{position:'relative',zIndex:3,background:'#fff',padding:'48px 24px 112px',textAlign:'center'}},
React.createElement('div',{style:{maxWidth:560,margin:'0 auto'}},
React.createElement('div',{style:{fontFamily:'var(--font-mono)',fontSize:28,fontWeight:600,letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'#A66A00',marginBottom:20}},window.t('Contact')),
React.createElement('p',{style:{fontSize:17,lineHeight:1.7,color:'var(--text)',margin:'0 0 32px',textWrap:'pretty'}},window.t('Open to UI/UX and product design roles. Happy to walk through any project in detail.')),
React.createElement('div',{style:{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}},
React.createElement('a',{href:'mailto:pearl880517@gmail.com',style:{...link,color:'#fff',background:'var(--ink-900)'}},'pearl880517@gmail.com'),
React.createElement('a',{href:window.SITE_VARIANT.resumeUrl,target:'_blank',rel:'noopener noreferrer',style:{...link,color:'var(--ink-900)',background:'transparent',border:'1px solid var(--ink-900)'}},window.t('Resume'))
)
)
);
}
window.Contact=Contact;
