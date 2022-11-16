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
  xtraMinifyComponent: {
    logos: {
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
        border={ 'normal' }
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
          phoneStyles={{
            flexDirection : 'col'
          }}
        >
          <Logo.Horizon
            size='L'
            icon={ AppIcon }
            title={ AppTitle }
          />
          <Box
            fontSize={ 4 }
            fontWeight={ 'bold' }
            children={ 'サインイン' }
          />
        </Flex>
        <Paragraph fontColor={ 2 }>
          RACCO はロータリクラブ・ローターアクトクラブ会員専用のアプリです
        </Paragraph>
        <Box borderTop={ 'normal' } paddingTop={ 1 } textAligin='left'>
          <Flex
            wrap={ false }
            gap={ 1 }
            padding={ 1 }
            align='center'
          >
            <MinifyIcon />
            <Box
              fontWeight={ 'bold' }
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
            $.fetch( {
              method: 'post',
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
          miniLoader={ true }
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

    $.fetch(
      {
        method: 'post',
        url: 'signLink/get',
        body: { token }
      },
      ( result ) => {
        if ( result.ok ) {
          let redirect = localStorage.getItem( 'siru' ) || '/';
          localStorage.removeItem( 'siru' );
          window.location.href = redirect;
          return;
        }
        set_error( true );
      }
    )
  },[] );

  if ( !val_error ) {
    return ( <Loading /> );
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
        <Button.Prime
          size='S'
          marginTop={ 1 }
          onClick={ () => {
            set_progress( 1 );
          } }
        >
          戻る
        </Button.Prime>
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