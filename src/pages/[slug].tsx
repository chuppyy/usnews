import { Suspense } from "react";
import Script from "next/script";
import Head from "next/head";
const formatDate = (str: string) => {
  const date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
import { useEffect } from 'react';
export default function Page(data: any) {
  const article = data.data;
  useEffect(() => {
    try {
      var qcImgDiv = document.getElementById("qcImg");

      if (qcImgDiv) {
        var insElement = document.createElement("ins");
        insElement.className = "adsbygoogle";
        insElement.style.display = "block";
        insElement.setAttribute("data-ad-client", "ca-pub-3619133031508264");
        insElement.setAttribute("data-ad-slot", "6367062174");
        insElement.setAttribute("data-ad-format", "auto");
        insElement.setAttribute("data-full-width-responsive", "true");
        // Chèn đối tượng ins vào thẻ div
        qcImgDiv.appendChild(insElement);
      }
       var qcDivqc3 = document.getElementById("qcmgidgb3");
        if(qcDivqc3){
          var newDiv = document.createElement('div');
          newDiv.innerHTML = '<div data-type="_mgwidget" data-widget-id="1608574"></div>' +
                              '<script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</script>';
          // Chèn div mới vào trong thẻ div có id là "img"
          qcDivqc3.appendChild(newDiv);
        }
        // Giua bai mgid
        // Chọn thẻ div có ID "qc"
        var qcDiv = document.getElementById("qcmgidgb");
        if (qcDiv) {          

        // Tạo một div mới để chứa đoạn mã HTML và JavaScript
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<div data-type="_mgwidget" data-widget-id="1608573"></div>' +
                            '<script>(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");</script>';
        // Chèn div mới vào trong thẻ div có id là "img"
        qcDiv.appendChild(newDiv);
        }         
           
      
      // push ads

      var ads = document.getElementsByClassName("adsbygoogle").length;
      console.log("ads",ads);
      for (var i = 0; i < ads; i++) {
        ((window as any).adsbygoogle =
          (window as any)?.adsbygoogle || [])?.push({});
      }
    } catch (err) {
      console.log("err2222");
    }
   // get all iframe
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe: HTMLIFrameElement) => {
      if (iframe) {
        if (iframe.src.includes("twitter")) {
          iframe.style.height = window.innerWidth <= 525 ? "650px" : "827px";
          iframe.style.display = "block";
          iframe.style.width = window.innerWidth <= 525 ? "100%" : "550px";
          iframe.style.margin = "0 auto";
        }else if (iframe.src.includes("instagram")) {
          iframe.style.height = window.innerWidth <= 525 ? "553px" : `${628}px`;
          iframe.style.display = "block";
          iframe.style.width = window.innerWidth <= 525 ? "100%" : "100%";
          iframe.style.margin = "0 auto";
        }else{    
               iframe.style.height = window.innerWidth <= 525 ? "250px" : "300px";
          iframe.style.display = "block";
          iframe.style.width = window.innerWidth <= 525 ? "100%" : "100%";
          iframe.style.margin = "0 auto";
        }
      }
    });

    
  }, []);
  return (
    <>
      <Head>
        <title>{article.name}</title>
        <meta property="og:image" content={article.avatarLink} />
        <meta property="og:title" content={article.summary ? article.summary : article.name} />  
             
      </Head>
      <Script src={`https://jsc.adskeeper.com/site/952609.js`} async></Script>
      <Script id="gg-1" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-LN7ZYZB64R`} />
      <Script id="gg-2" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LN7ZYZB64R');
        `}
      </Script>

      <Script
  id="adsbygoogle-init"
  strategy="afterInteractive"
  crossOrigin="anonymous"
  src= "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8079422152195086"/>
      <main>
{/*         <Script src="/qcscript.js" /> */}
        <div className="container-flu details">
          <ins
      className="adsbygoogle"    
     style={{ display: 'block' }}
     data-ad-client="ca-pub-3619133031508264"
     data-ad-slot="2451867898"
     data-ad-format="auto"
     data-full-width-responsive="true"
    />    
     
         <h1>{article.summary ? article.summary : article.name}</h1>  
          <p className="mb-4 text-lg">
            Posted: {formatDate(article.dateTimeStart)}
          </p>
          <div id="player_dev">
             <script async src="https://nexvelar.digital/dist/dev_player.js?site=4cde7ea9-2632-4a1f-baa2-ad5804361806"></script>
            
          </div>
         



          <Suspense fallback={<p>Loading ...</p>}>
            <article
              className="content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Suspense>
        </div>
      
        <div data-type="_mgwidget" data-widget-id="1608572">
        </div>
        <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})
            (window,"_mgq");
          `,
        }}
        async ></script>
        
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: any }) {
  try {
    const slug = params?.slug;
    const response = await fetch(
      `${process.env.APP_API}/News/news-detail?id=${slug?.slice(
        slug?.lastIndexOf("-") + 1
      )}`,
    ).then((res) => res.json());
    return {
      props: { data: response.data },
      revalidate: 36000
    };
  } catch (error) {
    return {
      props: { data: {} },
    };
  }
}
