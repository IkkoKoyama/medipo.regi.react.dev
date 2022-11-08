const {
  glob: {
    React,
    useEffect,
    useState
  },
  atoms: {
    Buttons: {
      Button,
      Anchor
    },
    Box,
    Paragraph,
    Flex,
    Loading,
    Logo
  },
  mols: {
  },
  xtraMinifyComponent : {
    logos : {
      MinifyIcon,
    }
  }
} = AMOT;

import style from './style.module.scss';


const InteractRegon: FNC<{}> = () => {
  useEffect( () => {
    ( () => {
      let {
        pathname,
        search,
        origin
      } = location;

      if ( pathname == '/' || pathname == '/signLink/get' ) return;

      localStorage.setItem( 'siru',origin + pathname + search );
    } )();
  },[] );

  let {
    icon: AppIcon,
    title: AppTitle
  } = global.AMOT.app.logo;

  return (
    <Box maxWidth={ 36 }>
      <Flex
        type='col'
        gap={ 2 }
        border={ 2 }
        padding={ 2 }
        borderRadius={ 3 }
        maxWidth={ 36 }
        backgroundColor={ 1 }
        margin={ [ 'auto',0 ] }
        textAligin={ 'center' }
        className={ style.Form }
      >
        <Flex
          wrap={ false }
          gap={ 1 }
          padding={ 1 }
          align='center'
          justify='center'
        >
          <Logo.Horizon
            size='L'
            icon={ AppIcon }
            title={ AppTitle }
          />
          <Box
            fontSize={ 4 }
            fontWeight={ 3 }
            children={ 'サインイン' }
          />
        </Flex>
        <Paragraph fontColor={ 2 }>
          RACCO はロータリクラブ・ローターアクトクラブ会員専用のアプリです
        </Paragraph>
        <Box borderTop={ 2 } paddingTop={ 1 } textAligin='left'>
          <Flex
            wrap={ false }
            gap={ 1 }
            padding={ 1 }
            align='center'
          >
            <MinifyIcon />
            <Box
              fontWeight={ 3 }
              children={ 'racco を利用するには minify にサインインしてください' }
            />
          </Flex>
          <Paragraph fontColor={ 2 } textAligin='center' padding={ 1 }>
            RACCO は minify プラットフォームアプリケーションの一つです。
            minify でサインリンク許可をすると racco をご利用できるようになります。
          </Paragraph>
        </Box>
        <Button.Prime
          onClick={ () => {
            $.fetch(
              {
                method: 'post',
                url: 'signLink/getToken',
                trafficControl: 300
              },
              ( result ) => {
                if ( result.ok ) {
                  let token = result.body;
                  let redirect = new URL( location as any ).origin;
                  window.location.href = Env.adminUrl + 'signLink?token=' + token + '&redirect=' + redirect.encode();
                }
              }
            );

          } }
          miniLoader={ true }
          padding={ [ 1,2 ] }
          children={ 'インタラクト' }
        />
      </Flex>
    </Box>
  );
}
const GetRegion: FNC<{}> = () => {
  let { AT,RT } = $.getQueryParams();
  useEffect( () => {
    $.fetch(
      {
        method: 'post',
        url: 'signLink/get',
        body: { AT,RT }
      },
      ( result ) => {
        if ( result.ok ) {
          let redirect = localStorage.getItem( 'siru' ) || '/';
          localStorage.removeItem( 'siru' );
          window.location.href = redirect;
        }
      }
    )
  },[] );

  return ( <Loading /> );
}

export const SignLink: FNC<{}> = () => {
  let Url = new URL( location.href );
  let Progress = 1;
  if ( Url.pathname == '/signLink/get' ) {
    let { AT,RT } = $.getQueryParams();

    if ( AT && RT ) {
      Progress = 200;
    }
  }
  let [ val_progress,set_progress ] = useState( Progress );

  return ( val_progress == 200 ? <GetRegion /> : <InteractRegon /> );
}