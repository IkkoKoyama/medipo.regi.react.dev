let tags: Jsmin.CreateElement.Args[] = [];

{
  let base = document.head;
  tags = [
    {
      tag: 'meta',parent: base,attr: {
        name: 'viewport',content: 'width=device-width,initial-scale=1.0,maximum-scale=5.0,minimum-scale=1.0,viewport-fit=cover'
      },
    },{
      tag: 'link',parent: base,attr: {
        rel: 'icon',type: 'image/svg+xml',href: Env.Images.app.Favicon
      },
    },{
      tag: 'meta',parent: base,attr: {
        name: 'apple-mobile-web-app-capable',content: 'yes'
      },
    },{
      tag: 'meta',parent: base,attr: {
        name: 'apple-mobile-web-app-status-bar-style',content: 'black-translucent'
      },
    },{
      tag: 'link',parent: base,attr: {
        href: Env.Images.app.Icon,
        sizes: '192x192',
        rel: 'apple-touch-icon',type: 'image/svg+xml',async: true
      },
    },{
      tag: 'link',parent: base,attr: {
        async: true,
        rel: 'manifest',
        href: URL.createObjectURL( new Blob(
          [ JSON.stringify( {
            name: Env.app.alias,
            short_name: Env.app.alias,
            description: "",
            icons: ( () => {
              var iconInfo: any = [];
              [ 72,96,128,144,152,192,384,512 ].forEach( ( size ) => {
                iconInfo = [
                  ...iconInfo,
                  { src: Env.Images.app.AppIconPath + size + '.png',sizes: size + 'x' + size,type: 'image/png',purpose: 'any' },
                  { src: Env.Images.app.AppIconPath + size + '.png',sizes: size + 'x' + size,type: 'image/png',purpose: 'maskable' }
                ];
              } )
              return iconInfo;
            } )(),
            start_url: window.location.href,
            theme_color: '#e1e1e1',
            background_color: '#FFFFFF',
            display: 'fullscreen',
            orientation: 'portrait'
          } ) ],
          { type: 'application/json' }
        ) )
      }
    }
  ];
}
{
  let Prefix = Env.CDN.static + Env.app.alias + '/@versions/' + Env.app.version;
  if ( !Env.isProduct ) Prefix = Env.CDN.dev + '35000/' + Env.app.alias + '/root/';

  tags = [
    ...tags,
    ...[
      {
        tag: 'script',parent: document.body,attr: {
          src: Prefix + '/fn/appWare.js',
          async: false,defer: true
        },
      },{
        tag: 'script',parent: document.body,attr: {
          src: Prefix + '/fn/region/' + Env.region + '.js',
          async: false,defer: true
        },
      },{
        tag: 'link',parent: document.body,attr: {
          href: Prefix + '/ss/' + Env.region + '.min.css',
          rel: 'stylesheet',async: true
        },
      },{
        tag: 'link',parent: document.body,attr: {
          href: Prefix + '/ss/uni.min.css',
          rel: 'stylesheet',async: true
        },
      }
    ]
  ]
}
for ( let tag of tags ) $.createElement( tag );