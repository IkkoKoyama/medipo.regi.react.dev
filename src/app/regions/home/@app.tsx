export { }

let {
  glob: {
    React,
    LaunchReactApplication
  },
  atoms: {
    FontAwesomeIcon,
    Box,
    Flex,
    Logo
  },
  fn: {
    Layout,
    Buttons,
    Input
  },
  temps: {
    PlayGround
  },
  app: {
    logo: {
      icon: AppIcon,
      title: AppTitle
    }
  },
  minifyComponent: {
    UniConsole
  }
} = amotify;

import style from './style.module.scss';
style.launch;


import { DesignBook } from './AMOTDesign/page';

import { Reception } from './Reception/page';
import { ScheduleDashboard } from './Schedule/page';
import { RegiCheck } from './RegiCheck/page';
import { VisitHistory } from './VisitHistory/page';

import { CustomerRouter } from './Customer/_';
import { OrderRouter } from './Order/_';

import { Settings } from './Settings/page';

const {
  RootViewController: RVC
} = Layout;

let TopNavLeftSpace: FNC<{}> = () => {
  let Tone = amotify.config.tone;

  return (
    <>
      <Buttons.Anchor.Clear
        color={ Tone == 'Plain' ? 'theme' : 'white' }
        href="/"
        ssEffectsOnActive={ 'ripple.theme' }
        borderRadius={ 1 }
        fontColor='inherit'
        padding={ [ '1/4',1 ] }
        hoverStyles={ {
          opacity: 'high'
        } }
      >
        <Flex
          gap={ '1/2' }
          flexWrap={ false }
          verticalAlign='center'
        >
          <Logo.Horizon
            color={ Tone == 'Plain' && !amotify.config.darkMode ? 'normal' : 'white' }
            icon={ AppIcon }
            title={ AppTitle }
          />
          <Box children='reception' />
        </Flex>
      </Buttons.Anchor.Clear>
      <Flex
        backgroundColor={ 'lcOpLow' }
        borderRadius='sphere'
        _height={ 3 }
        verticalAlign='center'
        padding={ [ 0,1 ] }
        freeCSS={ {
          width: 12 * 20
        } }
        UnderBreakPointStyles={ {
          display: 'none'
        } }
        position='relative'
      >
        <Box
          fontSize={ '1.mini' }
        >
          アプリ内を検索
        </Box>
        <FontAwesomeIcon
          d="search"
          position='absolute'
          positionRight={ 1 }
          _height={ 3 }
        />
      </Flex>
      <Box id='testBox' />
    </>
  );
}

let Pages = <Layout.PageRouter
  pages={ [
    {
      path: '/order*',
      content: <OrderRouter />
    },{
      path: '*',
      content: <>
        <RVC.Base
          topNav={ {
            leftSpace: <TopNavLeftSpace />,
            rightSpace: <>
              <UniConsole />
            </>
          } }
          sideNav={ {
            // enable: false,
            // transformWhenTabPhone: 'leftDrawer',
            contents: <>
              <RVC.Attachs.Link
                href='/'
                icon={ <FontAwesomeIcon d='clipboard-check' /> }
                label='受付'
              />
              <RVC.Attachs.Link
                href='/schedule'
                icon={ <FontAwesomeIcon d='calendar-alt' /> }
                label='予約台帳'
              />
              <RVC.Attachs.Link
                href='/regi-check'
                icon={ <FontAwesomeIcon d='cash-register' /> }
                label='レジ管理'
              />
              <RVC.Attachs.Bar />
              <RVC.Attachs.Link
                href='/sales'
                icon={ <FontAwesomeIcon d='yen-sign' /> }
                label='売上'
              />
              <RVC.Attachs.Link
                href='/visit-history'
                icon={ <FontAwesomeIcon d='clock-rotate-left' /> }
                label='取引履歴'
              />
              <RVC.Attachs.Link
                href='/customer/list'
                pathGroup='/customer'
                icon={ <FontAwesomeIcon d='id-card-clip' /> }
                label='顧客台帳'
              />
              <RVC.Attachs.Bar />
              <RVC.Attachs.Link
                href='/settings'
                icon={ <FontAwesomeIcon d='gear' /> }
                label='設定'
              />
              <RVC.Attachs.Link
                href='/design'
                icon={ <FontAwesomeIcon d='pen' /> }
                label='DesignBook'
              />
            </>
          } }
        >
          <Layout.PageRouter
            pages={ [
              {
                path: '/design',
                content: <DesignBook />
              },{
                path: '/',
                content: <Reception />
              },{
                path: '/settings',
                content: <Settings />
              },{
                path: 'schedule',
                content: <ScheduleDashboard />
              },{
                path: 'visit-history',
                content: <VisitHistory />
              },{
                path: 'customer*',
                content: <CustomerRouter />
              },{
                path: 'regi-check',
                content: <RegiCheck />
              }
            ] }
          />
        </RVC.Base>
      </>
    }
  ] }
/>;

// Pages = <>
//   <PlayGround/>
// </>

LaunchReactApplication( {
  baseElement: '#MAIN',
  reactElement: Pages,
  appearances: {
    // themeColor: 27,
    tone: 'College'
  }
} );