const {
  glob : {
    React,
    Component,
    useEffect
  },
  atoms : {
    Button,
    Box,
    Paragraph,
    Flex,
  },
  mols : {
  },
  logos : {
    MinifyIcon,
    AppIcon
  }
} = AMOT;

import style from './style.module.scss';

export class SignIn extends Component {
  state : {
    hash : string
    roomId : string
  }
  constructor( props:any ) {
    super( props );

    this.state = {
      hash : '',
      roomId : ''
    }
  }
  async getLoginShareToken() {
    let result = await $.fetch({
      method : 'post',
      url : '/signLink'
    });

    if ( result.ok ) {
      let {
        token
      } = result.body;

      let origin = new URL( location as any ).origin;

      window.location.href = 'http://localhost:10001/signLink?token=' + token + '&origin=' + origin.encode();
    }
  }
  componentDidMount() {
    {
      let redirectUrl = new URL( location.toString() ).href;

      $.setCookie( {
        name : 'signInRedirectUrl',
        value : redirectUrl
      } );
      $.setCookie( {
        name : 'incognito',
        value : '1'
      } )
    }
  }
  render() {
    return (
      <Box maxWidth={ 36 }>
        <Flex
          type='col'
          gap={ 2 }
          border={ 2 }
          padding={ 3 }
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
              <AppIcon size='L' />
              <Box
                fontSize={ 4 }
                fontWeight={ 3 }
                children={ 'RACCO サインイン' }
              />
            </Flex>
          <Paragraph fontColor={ 2 }>
            RACCO はロータリクラブ・ローターアクトクラブ会員専用のアプリです
          </Paragraph>

          <Box borderTop={ 2 } paddingTop={ 1 }  textAligin='left'>
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
            <Paragraph fontColor={ 2 }>
              racco は minify プラットフォームアプリケーションの一つです。
              <br />
              minify でサインリンクを許可すると racco をご利用できるようになります。
              <br />
              下のボタンからインタラクションを完了してください。
            </Paragraph>
          </Box>
          <Button
            type="main"
            onClick={() => {
              this.getLoginShareToken( );
            }}
            miniLoader={ true }
            rippleEffect={ true }
            padding={ [ 1,2 ] }
            children={ 'インタラクト' }
          />
        </Flex>
      </Box>
    );
  }
}