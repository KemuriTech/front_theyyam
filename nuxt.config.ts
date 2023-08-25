// https://nuxt.com/docs/api/configuration/nuxt-config
import dynamicRoutes from './src/helpers/dynamicRoutes'

export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-simple-sitemap'
  ],
  css: [
    '@/assets/css/common.css'
  ],
  runtimeConfig: {
    public: {
      googleAPIkey: process.env.GOOGLE_API_KEY,
      SERVICE_NAME: process.env.SERVICE_NAME,
      SITE_KEY: process.env.SITE_KEY,
      KUROCO_API_VER: process.env.KUROCO_API_VER,
      KUROCO_API_PREFIX: process.env.KUROCO_API_PREFIX,
      BASE_URL: process.env.BASE_URL,
      LANDING_PAGE_URL: process.env.LANDING_PAGE_URL,
      FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
      SITE_DESC: process.env.SITE_DESC ,
      KUROCO_API_VER_AUTH: process.env.KUROCO_API_VER_AUTH,
    }
  },
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
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-2TD6T9L2NP',
          async:true
        },
        { id:'vwoCode',
          type:'text/javascript',
          innerHTML:`
          window._vwo_code=window._vwo_code || (function() {
          var account_id=732335,
          version = 1.5,
          settings_tolerance=2000,
          library_tolerance=2500,
          use_existing_jquery=false,
          is_spa=1,
          hide_element='body',
          hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
          /* DO NOT EDIT BELOW THIS LINE */
          f=false,d=document,vwoCodeEl=d.querySelector('#vwoCode'),code={use_existing_jquery:function(){return use_existing_jquery},library_tolerance:function(){return library_tolerance},hide_element_style:function(){return'{'+hide_element_style+'}'},finish:function(){if(!f){f=true;var e=d.getElementById('_vis_opt_path_hides');if(e)e.parentNode.removeChild(e)}},finished:function(){return f},load:function(e){var t=d.createElement('script');t.fetchPriority='high';t.src=e;t.type='text/javascript';t.onerror=function(){_vwo_code.finish()};d.getElementsByTagName('head')[0].appendChild(t)},getVersion:function(){return version},getMatchedCookies:function(e){var t=[];if(document.cookie){t=document.cookie.match(e)||[]}return t},getCombinationCookie:function(){var e=code.getMatchedCookies(/(?:^|;)\\s?(_vis_opt_exp_\\d+_combi=[^;$]*)/gi);e=e.map(function(e){try{var t=decodeURIComponent(e);if(!/_vis_opt_exp_\\d+_combi=(?:\\d+,?)+\\s*$/.test(t)){return''}return t}catch(e){return''}});var i=[];e.forEach(function(e){var t=e.match(/([\\d,]+)/g);t&&i.push(t.join('-'))});return i.join('|')},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;window.settings_timer=setTimeout(function(){_vwo_code.finish()},settings_tolerance);var e=d.createElement('style'),t=hide_element?hide_element+'{'+hide_element_style+'}':'',i=d.getElementsByTagName('head')[0];e.setAttribute('id','_vis_opt_path_hides');vwoCodeEl&&e.setAttribute('nonce',vwoCodeEl.nonce);e.setAttribute('type','text/css');if(e.styleSheet)e.styleSheet.cssText=t;else e.appendChild(d.createTextNode(t));i.appendChild(e);var n=this.getCombinationCookie();this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+ +is_spa+'&vn='+version+(n?'&c='+n:''));return settings_timer}};window._vwo_settings_timer = code.init();return code;}());`
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href:'https://dev.visualwebsiteoptimizer.com'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      },
    }
  },
  auth: {
    baseURL: `https://${process.env.BASE_URL}/${process.env.KUROCO_API_PREFIX}/${process.env.KUROCO_API_VER_AUTH}`,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/logout', method: 'post' },
        getSession: { path: '/profile' }
      },
      token: {
        signInResponseTokenPointer: '/access_token/value',
        type: '',
        headerName: 'X-RCMS-API-ACCESS-TOKEN'
      },
      pages: {
        login: '/login',
      }
    },
    session: {
      enableRefreshPeriodically: false,
      enableRefreshOnWindowFocus: false,
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', 'sitemap.xml'],
    },
  },
  site: {
    url: `https://${process.env.FRONTEND_BASE_URL}`,
  },
  sitemap: {
    xsl: false,
    defaults: {
      priority: 1,
      changefreq: 'weekly'
    },
    cacheTtl: 60 * 60 * 24 * 1000
  }
})
