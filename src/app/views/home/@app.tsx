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

let Pages =
<PageRouter
  list={[
    {
      path : '*',
      body :
      <>
        <LayoutHNC
          responsiveNavBar='left'
          headerProps={{
            color : 'plain',
            sticky : true,
            border : 'border'
          }}
          navProps={{
            appearance : 'cell',
            color : 'plain',
            sticky : true,
            border : 'border',
            menus : [{
              type : 'link',
              icon : <Icon>fal home</Icon>,
              title : 'ホーム',
              href : '/',
              tipsContent :
              <>
                <Icon children='fal home' /> ホーム
              </>
            },{
              type : 'link',
              icon : <Icon>fal user-circle</Icon>,
              title : 'アカウント',
              tipsContent : 'アカウント',
              href : '/account'
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
                    path : '/account',
                    body : <AccountPage />
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
