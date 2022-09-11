export { }

let {
  glob: {
    React,
    Render
  },
  atoms: {
    Icon
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
  logos: {
  }
} = AMOT;

import style from './style.module.scss';
style.launch;

import { AccountPage } from './Account/page';

import { HomePage } from './Home/page';

import { CreateEventPage } from './CreateEvent/page';
import { EventsPage } from './Events/page';
import { EventPage } from './Event/page';
import { ManagerPage } from './Manager/page';


let Pages =
  <PageRouter
    list={ [
      {
        path: '*',
        body:
          <>
            <LayoutHNC
              responsiveNavBar='bottom'
              headerProps={ {
                color: 'plain',
                sticky: true,
                border: 'border',
                freeSpace:
                  <>
                    ホーム
                  </>
              } }
              navProps={ {
                color: 'plain',
                sticky: true,
                border: 'border',
                menus: [ {
                  type: 'link',
                  icon: <Icon d='fal home' />,
                  href: '/',
                  label: 'ホーム',
                  tipsContent: 'ホーム'
                },{
                  type: 'link',
                  icon: <Icon d='fal search' />,
                  href: '/events',
                  label: 'Events',
                  tipsContent: 'event'
                },{
                  type: 'link',
                  icon: <Icon d='fal plus-square' />,
                  href: '/create-event',
                  label: 'イベント作成',
                  tipsContent: 'イベント作成'
                },{
                  type: 'link',
                  icon: <Icon d='fal user-circle' />,
                  href: '/account',
                  label: 'アカウント',
                  tipsContent: 'アカウント'
                },{
                  type: 'link',
                  icon: <Icon d='fal folder-gear' />,
                  href: '/manages',
                  label: 'マネジメント',
                  tipsContent: 'マネジメント'
                } ]
              } }
              contentProps={ {
                color: 'plain',
                body:
                  <PageRouter
                    list={ [
                      {
                        path: '/',
                        body: <HomePage />
                      },{
                        path: '/create-event',
                        body: <CreateEventPage />
                      },{
                        path: '/events',
                        body: <EventsPage />
                      },{
                        path : '/event',
                        body : <EventPage />
                      },{
                        path: '/account',
                        body: <AccountPage />
                      },{
                        path: '/manages',
                        body: <ManagerPage />
                      }
                    ] }
                  />
              } }
            />
          </>
      }
    ] }
  />;


let root = $( '#root' )[ 0 ];
if ( root ) Render( {
  base: root,
  content: Pages
} );
