const {
  glob : {
    React
  },
  atoms : {
    Box,
    Flex,
    Input,
    Button,
    Icon
  },
  mols : {
    CardBox
  },
  orgs : {
    LayoutContent,
    Cropper
  }
} = AMOT;

import style from './style.module.scss';

export const CreateEventPage:FNC<{}> = () => {
  return (
    <LayoutContent
      size='S'
      styles={{
        margin : [ 3,'auto' ]
      }}
    >
      <CardBox
        space={ 1 }
        header={
          <Box
            fontSize={ 5 }
            fontWeight={ 3 }
            children={
              <>
                <Icon children='plus-square' fontColor='theme' /> イベントを作成する
              </>
            }
          />
        }
        body={
          <Flex type='col' gap={ 1 }>
            <Input.Text
              required={ true }
              form={ 'eventCreate' }
              label={ 'タイトル' }
              placeholder='タイトルを入力'
              delegationFormSubmit={ true }
            />
            <Input.Text
              required={ true }
              form={ 'eventCreate' }
              label={ 'サブタイトル' }
              placeholder='サブタイトルを入力'
              delegationFormSubmit={ true }
            />
            <Input.List
              type='radio'
              required={ true }
              form={ 'eventCreate' }
              label={ '公開範囲' }
              align='row'
              value={ [ 1 ] }
              list={[
                {
                  value : 1,
                  label : 'パブリック'
                },{
                  value : 2,
                  label : '同地区内'
                },{
                  value : 3,
                  label : '同クラブ内'
                },{
                  value : 4,
                  label : '招待したユーザー'
                }
              ]}
            />
            <Input.TextArea
              label={ '説明' }
              form={ 'eventCreate' }
              delegationFormSubmit={ true }
            />

            <Input.File
              label={ '添付ファイル' }
              // multiple={ true }
            />
            <Cropper
              use='head'
              onProcessFinished={ ( args ) => {
                console.log( args );
              } }
            />
          </Flex>
        }
        footer={
          <Button
            type='main'
            width={ 100 }
            rippleEffect={ true }
            miniLoader={ true }
            children={ '作成する' }
            submitFormName='eventCreate'
            delegationClickEvent={ [ 'auxEnter' ] }
            onClickCallBack={ async () => {
              let form = await $.FormCollect( 'eventCreate' );
              console.log( form );
            } }
          />
        }
      />

    </LayoutContent>
  );
}