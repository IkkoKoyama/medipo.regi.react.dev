const {
  glob: {
    React,
    useEffect
  },
  atoms: {
    Box,
    Flex,
    Input,
    Button,
    Link,
    Icon,
    Img,
  },
  mols: {
    CardBox,
    Accordion,
    List,
  },
  orgs: {
    LayoutContent,
    Cropper,
    TabContent,
    Table
  }
} = AMOT;

import style from './style.module.scss';


import {
  RegionDashboard
} from './region/part';

import {
  ClubDashboard
} from './club/part';


const EventContent: FNC<{}> = () => {
  let DataData: Orgs.Tables.Data.RowProps[] = [];
  for ( var i = 0; i < 100; i++ ) {
    let random1 = Math.round( Math.random() * 50 + 1 );
    let random2 = Math.round( Math.random() * 50 + 1 );
    let random3 = Math.round( Math.random() * 50 + 1 );

    let Data1 = 'name_' + random1;
    let Data2 = 'data_' + random2;
    let Data3 = 'data_' + random3;
    let Row: Orgs.Tables.Data.RowProps = {
      columns: [
        {
          type: 'th',
          label: Data1,
          data: Data1
        },{
          type: 'td',
          label: Data2,
          data: Data2
        },{
          type: 'td',
          label: Data3,
          data: Data3,
        }
      ]
    }
    DataData.push( Row );
  }

  return (
    <Flex
      gap={ 2 }
      padding={ 2 }
      cols='auto'
      children={
        <>
          <Table.Data
            colLength={ 3 }
            head={ [
              { label: 'head1',data: 'head1' },
              { label: 'head2',data: 'head2' },
              { label: 'head3',data: 'head3' }
            ] }
            rows={ DataData }
            option={ {
              filter: [ true ]
            } }
          />
        </>
      }
    />
  );
}

export const ManagerPage: FNC<{}> = () => {
  let defaultTabIndex = Number( $.getCookie( 'raccoManagerTabIndex' ) ) | 0;

  return (
    <>
      <Box
        padding={ 2 }
        backgroundColor={ 1 }
        children={
          <>
            <h3>managing</h3>
            {
              JSON.stringify(
                Org
              )
            }
          </>
        }
      />
      <TabContent
        defaultTabIndex={ defaultTabIndex }
        tabBar={ {
          justify : 'center',
          stickyTarget : [
            '#TopHeader'
          ]
        } }
        AnimateSlide={ true }
        onTabChange={( index ) => {
          $.setCookie( {
            name: 'raccoManagerTabIndex',
            value: String( index )
          } );

          let name = [ 'region','club' ][ index ];
          let component = global.StoreComponents[ 'managerTab-' + name ];
          if ( component && component.refresh ) {
            component.refresh();
          }
        }}
        contents={ [
          {
            tab: '地区',
            body: <RegionDashboard />
          },{
            tab: 'クラブ',
            body: <ClubDashboard />
          },{
            tab: 'イベント',
            body: <EventContent />
          },{
            tab: '分析',
            body: 'AnalyticsContent'
          }
        ] }
      />
    </>
  );
}