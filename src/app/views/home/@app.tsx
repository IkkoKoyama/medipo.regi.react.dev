export { }

let {
  glob: {
    React,
    Render
  },
  atoms: {
    Icon,
    Link
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

import {
  RegionObjectPage
} from './Region/page';


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
                border: 'border',
                sticky: true,
                freeSpace:
                  <>
                    <Link
                      type='link'
                      href=''
                      fontSize={ 1 }
                      children={ 'raccoとは' }
                    />
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
                  label: '探す',
                  tipsContent: 'イベントを探す'
                },{
                  type: 'link',
                  icon: <Icon d='fal plus-square' />,
                  href: '/create-event',
                  label: '作る',
                  tipsContent: 'イベントを作成する'
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
                      },{
                        path : '/region/obj',
                        body : <RegionObjectPage />
                      }
                    ] }
                  />
              } }
            />
          </>
      }
    ] }
  />;

Render( {
  base: '#MAIN',
  content: Pages
} );