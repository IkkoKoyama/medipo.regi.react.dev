export {}

let {
  glob : {
    React,
    Render
  },
  atoms : {
    Icon
  },
  mols : {
  },
  orgs : {
    PageRouter
  },
  temps : {
    LayoutHNC
  },
  logos : {
  }
} = AMOT;

import style from './style.module.scss';
style.launch;

import { AccountPage } from './Account/page';

import { HomePage } from './Home/page';

import { CreateEventPage } from './CreateEvent/page';

let Pages =
<PageRouter
  list={[
    {
      path : '*',
      body :
      <>
        <LayoutHNC
          responsiveNavBar='bottom'
          // responsiveNavBar='left'
          headerProps={{
            color : 'plain',
            sticky : true,
            border : 'border'
          }}
          navProps={{
            appearance : 'cell',
            color : 'plain',
            sticky : true,
            border : 'none',
            menus : [{
              type : 'link',
              icon : <Icon>fad home</Icon>,
              title : 'ホーム',
              href : '/',
              tipsContent : 'ホーム'
            },{
              type : 'link',
              icon : <Icon>fad search</Icon>,
              title : 'イベント一覧',
              tipsContent : 'イベント一覧',
              href : '/event-list'
            },{
              type : 'link',
              icon : <Icon>fad plus-square</Icon>,
              title : 'イベント作成',
              tipsContent : 'イベントを作成する',
              href : '/event-create'
            },{
              type : 'link',
              icon : <Icon>fad user-circle</Icon>,
              title : 'アカウント',
              tipsContent : 'アカウント',
              href : '/account'
            },{
              type : 'link',
              icon : <Icon>fad layer-group</Icon>,
              title : 'イベントページ',
              tipsContent : 'イベントページ',
              href : '/eventPage'
            },{
              type : 'link',
              icon : <Icon>fad gears</Icon>,
              title : '環境設定',
              tipsContent : '環境設定',
              href : '/settings'
            }]
          }}
          content={
            <>
              <PageRouter
                list={[
                  {
                    path : '/',
                    body : <HomePage />
                  },{
                    path : '/event-create',
                    body : <CreateEventPage />
                  }
                ]}
              />
            </>
          }
        />
      </>
    }
  ]}
/>;


let root = $('#root')[ 0 ];
if ( root ) Render( {
  base : root,
  content : Pages
} );
