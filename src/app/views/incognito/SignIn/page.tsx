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

    RaccoIcon
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
      url : '/loginShare'
    });

    if ( result.ok ) {
      let { hash } = result.body;
      let currentUrl = new URL( location as any ).href;
      window.location.href = `http://localhost:10001/loginShare?hash=${ hash }&url=${ currentUrl.encode() }&appname=${ Env.AppName }`;
    }
  }
  Console() {
    let content =
    <>
      <Button
        type="main"
        onClickCallBack={() => {
          this.getLoginShareToken( );
        }}
        miniLoader={ true }
        rippleEffect={ true }
        padding={ [ 1,2 ] }
        tabIndex={ -1 }
        children={ 'セッションリンク' }
      />
    </>;
    
    return content;
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
          minWidth={ 36 }
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
              <RaccoIcon size='L' />
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
              racco は minify プラットフォームアプリの一つです。
              minify でセッションリンクを許可すると, racco をご利用できるようになります。
              <br />
              下のボタンからインタラクションを完了してください。
            </Paragraph>
          </Box>
          { this.Console() }
        </Flex>
      </Box>
    );
  }
}