const {
  glob: {
    React: {
      useEffect,
      useState
    }
  },
  atoms: {
    Box,
    Flex,
    FontAwesomeIcon
  },
  fn: {
    Modal,
    Loader,
    Buttons,
    SnackBar
  }
} = amotify;

import * as PaSoRiWebClient from '../PaSoRiWebClient';


declare global {
  namespace _Felica {
    type ReaderParams = {
      callback: {
        ( params: CallbackParams ): void
      }
    }
    type CallbackParams = {
      valid: boolean
      data: any
    }
  }
}

let FelicaClient: {
  data: PaSoRiWebClient.NFCPortLib
  open: boolean
} = {
  data: null as any,
  open: false
}

const ConnectClient = async () => {
  if ( FelicaClient.data ) return true;
  let result = false;

  let client = new PaSoRiWebClient.NFCPortLib();
  try {
    {
      /** config */
      let config = new PaSoRiWebClient.Configuration(
        500, // ackTimeout
        500, // receiveTimeout
        true, // autoBaudRate
        true, // autoDeviceSelect
        'External', // devicePriority
        true // priorityLibrary
      );
      await client.init( config );
    }

    /** open */
    await client.open();

    result = true;
    FelicaClient.data = client;
  } catch ( err ) {
    SnackBar.add( {
      componentId: $.uuidGen(),
      secondsToClose: 10,
      children: <Box
      >
        ICカードリーダーを起動できませんでした
        <br />
        適切に接続されているか確認してください
        <br />
        対応するリーダー端末は
        <Buttons.Anchor.Link
          href=''
          fontColor={ 'posi' }
          margin={ [ 0,'1/4' ] }
        >
          こちら <FontAwesomeIcon d="arrow-up-right-from-square" />
        </Buttons.Anchor.Link>
        から確認できます
      </Box>
    } );
  }
  return result;
}

const PendingModal: FNC<{
  modalId: string
  callback( params: _Felica.CallbackParams ): void
}> = ( params ) => {
  let {
    modalId,
    callback
  } = params;

  let [ val_read,set_read ] = useState( {
    finished: false,
    data: {
      valid: false,
      data: '' as any
    }
  } );

  useEffect( () => {
    let {
      NFCPortLib,
      Configuration,
      DetectionOption
    } = PaSoRiWebClient;

    /** detectCard */
    let getDataOptions = new DetectionOption(
      new Uint8Array( [ 0x00,0x03 ] ), // systemCode, 交通系
      0, // timeSlot
      true, // requestSytemCode
      false, // requestBaudRate
      null
    );

    let pollingPendingSeconds = 0;
    let getData = async () => {
      await FelicaClient.data.detectCard( 'iso18092',getDataOptions )
        .then( data => {
          let idmStringArray = [];
          for ( let part of data.idm ) {
            idmStringArray.push( part.toString( 16 ) );
          }
          let ID = idmStringArray.join( '-' );

          set_read( {
            finished: true,
            data: {
              valid: true,
              data: {
                id: ID,
                rawData: data
              }
            }
          } );
          FelicaClient.open = false;
        },( error ) => {
          pollingPendingSeconds += .2;
          if ( pollingPendingSeconds >= 30 ) {
            Modal.close.pin( modalId );
            set_read( {
              finished: true,
              data: {
                valid: false,
                data: 'Timeout'
              }
            } )
            return;
          }
          setTimeout( () => {
            if ( !FelicaClient.open ) return;
            getData();
          },200 );
        } );
    }
    getData();
  },[] );

  useEffect( () => {
    if ( val_read.finished ) {
      setTimeout( () => {
        Modal.close.pin( modalId );
        callback( val_read.data );
      },1000 );
    }
  },[ val_read ] );

  let Content = <></>;
  if ( val_read.finished && val_read.data.valid ) {
    Content = <>
      <Box fontSize='5.subTitle'>
        ICを読み取り中
      </Box>
      <Loader
        padding={ 1 }
      />
    </>;
  } else {
    Content = <>
      <Box fontSize='5.subTitle'>
        ICカードをかざしてください
      </Box>
      <Loader
        padding={ 1 }
      />
      <Box
        textAlign='center'
      >
        戻るボタンやページリロードはしないでください
      </Box>
      <Flex horizontalAlign='between'>
        <Buttons.Button.Border
          onClick={ () => {
            Modal.close.pin( modalId );
          } }
          children='閉じる'
        />
      </Flex>
    </>;
  }

  return (
    <Flex
      flexType='col'
      gap={ 1 }
      padding={ 2 }
      flexCenter
      children={ Content }
    />
  );
}

export const FelicaReader = async ( params: _Felica.ReaderParams ) => {
  let {
    callback
  } = params;

  let init = await ConnectClient();
  if ( !init ) {
    callback( {
      valid: false,
      data: 'InitError'
    } );
    return;
  }
  FelicaClient.open = true;

  let ModalId = 'OpenICReaderModal';
  Modal.open( {
    modalId: ModalId,
    type: 'center',
    content: <PendingModal
      modalId={ ModalId }
      callback={ callback }
    />,
  } );
}