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
    Tab,
    Table
  }
} = AMOT;

import style from './style.module.scss';


import {
  RegionContent
} from './region/part';

import {
  ClubContent
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
      auto={ true }
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
  return (
    <>
      <Box
        padding={ 2 }
        backgroundColor={ 1 }
        children={
          <>
            <h3>managing</h3>
          </>
        }
      />
      <Tab
        tabIndex={ 0 }
        header={ {
          labelName: 'testLabelName',
          tabListJustify: 'center',
          stickyTarget : [
            '#TopHeader'
          ]
        } }
        contents={ [
          {
            label: '地区',
            content: <RegionContent />
          },{
            label: 'クラブ',
            content: <ClubContent />
          },{
            label: 'イベント',
            content: <EventContent />
          },{
            label: '分析',
            content: 'AnalyticsContent'
          }
        ] }
      />
    </>
  );
}