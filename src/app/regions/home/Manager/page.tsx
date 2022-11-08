const {
  glob: {
    React,
    useEffect
  },
  atoms: {
  },
  mols: {
  },
  orgs: {
    TabContent
  }
} = AMOT;

import {
  RegionDashboard
} from './region/part';

import {
  ClubDashboard
} from './club/part';

import {
  EventDashBoard
} from './event/part';

export const ManagerPage: FNC<{}> = () => {
  let defaultTabIndex = Number( localStorage.getItem( 'raccoManagerTabIndex' ) ) | 0;

  return (
    <TabContent
      defaultTabIndex={ defaultTabIndex }
      tabBar={ {
        justify: 'center',
        sticky: [
          '#TopHeader'
        ]
      } }
      Swipeable={ true }
      onTabChange={ ( index ) => {
        localStorage.setItem(
          'raccoManagerTabIndex',
          String( index )
        )

        let name = [ 'region','club','event' ][ index ];
        let component = global.StoreComponents[ 'managerTab-' + name ];
        if ( component && component.refresh ) {
          component.refresh();
        }
      } }
      contents={ [
        {
          tab: '地区',
          body: <RegionDashboard />
        },{
          tab: 'クラブ',
          body: <ClubDashboard />
        },{
          tab: 'イベント',
          body: <EventDashBoard />
        },
        // {
        //   tab: '分析',
        //   body: 'AnalyticsContent'
        // }
      ] }
    />
  );
}