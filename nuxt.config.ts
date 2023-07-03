// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module'
  ],
  css: [
    '@/assets/css/common.css'
  ],
  app: {
    head: {
      script: [
        { innerHTML: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "hkr0anyws4");
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2TD6T9L2NP');`,
          type: 'text/javascript' 
        },
        { src: "https://www.googletagmanager.com/gtag/js?id=G-2TD6T9L2NP",
          async:true
        },
      ],
      htmlAttrs: {
        lang: 'en'
      },
    }
  }
})
