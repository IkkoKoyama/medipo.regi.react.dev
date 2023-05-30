const {
  glob: {
    React: {
      useEffect,
      useState
    }
  },
  atoms: {
    Box,
    Iframe,
    Paragraph,
    Flex,
    Logo
  },
  fn: {
    Buttons,
    Loader
  },
  minifyComponent: {
    logos: {
      MinifyIcon,
    }
  }
} = amotify;

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
  } = global.amotify.app.logo;

  return (
    <Box
      style={ {
        maxWidth: 36 * 12
      } }
    >
      <Flex
        flexType='col'
        gap={ 2 }
        border
        padding={ 2 }
        borderRadius={ 3 }
        style={ {
          maxWidth: 36 * 12
        } }
        backgroundColor={ '1.layer.base' }
        margin={ [ 'auto',0 ] }
        textAlign={ 'center' }
        className={ style.Form }
      >
        <Flex
          flexWrap={ false }
          gap={ 1 }
          padding={ 1 }
          verticalAlign='center'
          horizontalAlign='center'
          UnderBreakPointStyles={ {
            flexType: 'col'
          } }
        >
          <Logo.Horizon
            size='L'
            icon={ AppIcon }
            title={ AppTitle }
          />
          <Box
            fontSize={ '3.paragraph' }
            fontWeight='3.bold'
            children={ 'サインイン' }
          />
        </Flex>
        <Paragraph fontColor={ '2.normal' }>
          [ medipoの説明 ]
        </Paragraph>
        <Box
          borderTop
          paddingTop={ 1 }
          textAlign='left'
        >
          <Flex
            flexWrap={ false }
            gap={ 1 }
            padding={ 1 }
            verticalAlign='center'
          >
            <MinifyIcon />
            <Box
              fontWeight={ '3.bold' }
              children={ 'racco を利用するには minify にサインインしてください' }
            />
          </Flex>
          <Paragraph
            fontColor={ '2.normal' }
            textAlign='center'
            padding={ 1 }
          >
            RACCO は minify プラットフォームアプリケーションの一つです。
            minify でサインリンク許可をすると racco をご利用できるようになります。
          </Paragraph>
        </Box>
        <Buttons.Button.Prime
          onClick={ () => {
            $.fetch.post( {
              key: 'getSignLinkToken',
              url: 'signLink/getSignLinkToken',
              trafficControl: 300
            },( result ) => {
              if ( result.ok ) {
                let token = result.body;
                let redirect = new URL( location as any ).origin;
                window.location.href = Env.Links.admin + 'signLink?token=' + token + '&redirect=' + redirect.encode();
              }
            } );
          } }
          ssMiniLoader={ {
            color: 'white'
          } }
          padding={ [ 1,2 ] }
          children={ 'インタラクト' }
        />
      </Flex>
    </Box>
  );
}
const GetRegion: FNC<{
  set_progress: React.Dispatch<React.SetStateAction<number>>
}> = ( props ) => {
  let {
    set_progress
  } = props;

  let [ val_error,set_error ] = useState( false );

  useEffect( () => {
    let { token } = $.getQueryParams();

    $.fetch.post( {
      key: 'interaceSignLink',
      url: 'signLink/get',
      body: { token }
    },( result ) => {
      if ( result.ok ) {
        let redirect = localStorage.getItem( 'siru' ) || '/';
        localStorage.removeItem( 'siru' );
        window.location.href = redirect;
        return;
      }
      set_error( true );
    } )
  },[] );

  if ( !val_error ) {
    return ( <Loader /> );
  }
  return (
    <>
      <Box
        ssCardBox={ true }
        padding={ 2 }
      >
        <Paragraph>
          サインリンクを完了できませんでした。
          <br />
          以下のボタンから再度実行してください
        </Paragraph>
        <Buttons.Button.Prime
          size='S'
          marginTop={ 1 }
          onClick={ () => {
            set_progress( 1 );
          } }
        >
          戻る
        </Buttons.Button.Prime>
      </Box>
    </>
  );
}

export const SignLink: FNC<{}> = () => {
  let Url = new URL( location.href );
  let Progress = 1;
  if ( Url.pathname == '/signLink/get' ) {
    let { token } = $.getQueryParams();

    if ( token ) Progress = 200;
  }
  let [ val_progress,set_progress ] = useState( Progress );

  return ( val_progress == 200 ? <GetRegion set_progress={ set_progress } /> : <InteractRegon /> );
}