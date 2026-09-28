function SiteFooter(){
return React.createElement('footer',{style:{borderTop:'1px solid var(--border)',padding:'32px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text-faint)'}},
React.createElement('span',null,'© 2026 Luna Liu'),
React.createElement('a',{href:'mailto:pearl880517@gmail.com',style:{color:'var(--text-muted)',textDecoration:'none'}},'pearl880517@gmail.com')
);
}
window.SiteFooter=SiteFooter;
