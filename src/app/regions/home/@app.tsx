export { }

let {
  glob: {
    React,
    Render
  },
  atoms: {
    Icon,
    Buttons: {
      Anchor
    },
    Logo
  },
  mols: {
  },
  orgs: {
    PageRouter
  },
  temps: {
    LayoutHNC,
    LayoutHC
  },
  app: {
    logo: {
      icon: AppIcon,
      title: AppTitle
    }
  },
  minifyGlobalComponent: {
    UniConsole
  }
} = AMOT;

import style from './style.module.scss';
style.launch;

import { RegiDeskPage } from './RegiDesk/page';
import { RegiCheck } from './RegiCheck/page';
import { MasterList } from './MasterList/page';
import { MasterObject } from './MasterObject/page';

let Pages = <PageRouter
  list={ [
    {
      path: '/regi',
      body: <RegiCheck />
    },{
      path: '*',
      body: <>
        <LayoutHNC
          header={ {
            sticky: true,
            leftSpace: <>
              <Anchor.Clear
                color={ 'trans' }
                href="/"
                height={ 4 }
                activeEffect={ 'ripple.theme' }
                borderRadius={ 'sphere' }
                paddingLeft={ '1/3' }
                paddingRight={ 1 }
                flexCenter={ true }
              >
                <Logo.Horizon
                  icon={ AppIcon }
                  title={ AppTitle }
                />
              </Anchor.Clear>
            </>,
            rightSpace: <>
              <UniConsole />
            </>
          } }
          navMenus={ [ {
            type: 'anchor',
            icon: <Icon d='fal desktop' />,
            href: '/',
            label: '受付画面',
            tipsContent: '受付画面'
          },{
            type: 'anchor',
            icon: <Icon d='fal cash-register' />,
            href: '/regi',
            label: '会計画面'
          },{
            type: 'anchor',
            icon: <Icon d='fal bars' />,
            href: '/master/list',
            label: 'マスター一覧'
          },{
            type: 'anchor',
            icon: <Icon d='fal ball-pile' />,
            href: '/master/obj',
            label: 'マスター詳細'
          } ] }
          content={
            <PageRouter
              list={ [
                {
                  path: '/',
                  body: <RegiDeskPage />
                },{
                  path: '/master/list',
                  body: <MasterList />
                },{
                  path: '/master/obj',
                  body: <MasterObject />
                }
              ] }
            />
          }
        />
      </>
    }
  ] }
/>;

Render( {
  base: '#MAIN',
  content: Pages
} );