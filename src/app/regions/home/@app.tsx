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

import { HomePage } from './Home/page';

import { CreateEventPage } from './CreateEvent/page';
import { ManagerPage } from './Manager/page';

import { LineConnectPage } from './LineConnect/page';

import { UserPage } from './Object/User/page';
import { EventPage } from './Object/Event/page';
import { EventEditPage } from './Object/EventEdit/page';
import { OrgPage } from './Object/Org/page';

let Pages = <PageRouter
  list={ [
    {
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
                paddingLeft={ -2 }
                paddingRight={ 1 }
                flexCenter={ true }
              >
                <Logo.Horizon
                  icon={ AppIcon }
                  title={ AppTitle }
                />
              </Anchor.Clear>
              {/* <Anchor.Link
                    href=''
                    fontColor={ 'inherit' }
                    fontSize={ 1 }
                  >
                    raccoとは <Icon d='arrow-up-right-from-square' />
                  </Anchor.Link> */}
            </>,
            rightSpace: <>
              <UniConsole />
            </>
          } }
          navMenus={ [ {
            type: 'anchor',
            icon: <Icon d='fal home' />,
            href: '/',
            label: 'ホーム',
            tipsContent: 'ホーム'
          },
          // {
          //   type: 'anchor',
          //   icon: <Icon d='fal plus-square' />,
          //   href: '/create-event',
          //   label: '作る',
          //   tipsContent: 'イベントを作成する'
          // },
          {
            type: 'anchor',
            icon: <Icon d='fal user-circle' />,
            href: '/user/obj',
            label: 'アカウント',
            tipsContent: 'アカウント'
          },{
            type: 'anchor',
            icon: <Icon d='fal folder-gear' />,
            href: '/manages',
            label: 'マネジメント',
            tipsContent: 'マネジメント'
          } ] }
          content={
            <PageRouter
              list={ [
                {
                  path: '/',
                  body: <HomePage />
                },{
                  path: '/create-event',
                  body: <CreateEventPage />
                },{
                  path: '/manages',
                  body: <ManagerPage />
                },{
                  path: '/user/obj',
                  body: <UserPage />
                },{
                  path: '/org/obj',
                  body: <OrgPage />
                },{
                  path: '/event/obj',
                  body: <EventPage />
                },{
                  path: '/event/edit',
                  body: <EventEditPage />
                },{
                  path: '/line-connect-user',
                  body: <LineConnectPage />
                },
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