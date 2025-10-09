export const metadata = { title: "Optiloves Invest" };

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Fallback if JS disabled */}
        <noscript>
          <a id="buy-fixed" href="/thank-you"
             style={{position:"fixed",bottom:16,right:16,zIndex:2147483647,
                     padding:"12px 18px",borderRadius:9999,background:"#111",
                     color:"#fff",fontWeight:700,textDecoration:"none"}}>
            Buy
          </a>
        </noscript>
        {/* Client-side guarantee */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try{
                var id='buy-fixed';
                if(!document.getElementById(id)){
                  var a=document.createElement('a');
                  a.id=id; a.href='/thank-you'; a.textContent='Buy';
                  var s=a.style;
                  s.position='fixed'; s.bottom='16px'; s.right='16px';
                  s.zIndex='2147483647'; s.padding='12px 18px';
                  s.borderRadius='9999px'; s.background='#111';
                  s.color='#fff'; s.fontWeight='700'; s.textDecoration='none';
                  document.body.appendChild(a);
                }
              }catch(e){console.error('buy-fixed inject',e);}
            })();`
          }}
        />
      </body>
    </html>
  );
}
