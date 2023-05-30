export { }

const {
  glob: {
    React: {
      useEffect,
      useState
    }
  },
  atoms: {
    Box,
    FontAwesomeIcon,
    Flex,
    Span,
    Placeholder
  },
  mols: {
    List
  },
  fn: {
    Input,
    Buttons,
    Layout,
    Table,
    Modal,
    Loader,
    SnackBar
  }
} = amotify;

type DefParams = {
  dws: {
    id: number
    uuid: string
    price: number
    type: number
    eventDate: string
    eventTime: string
    name: string
    description: string
    staffId: number
    staffName: string
  }[]
  rcs: {
    id: number
    uuid: string
    total_price: number
    type: number
    eventDate: string
    eventTime: string
    description: string

    staffId: number
    staffName: string
  }[]
}

type ContentParams = {
  val_def: DefParams
  set_def: React.Dispatch<React.SetStateAction<DefParams>>
}



export const TradeDetails: FNC<{}> = () => {
  let [ val_init,set_init ] = useState( false );
  let [ val_def,set_def ] = useState( {} as DefParams );

  useEffect( () => {
    $.fetch.post( {
      key: 'listRegiCheck',
      url: '/regi-check/dashboard',
      trafficControl: 1000
    },( result ) => {
      if ( !result.ok ) return;
      set_init( true );
      set_def( {
        ...result.body
      } );
    } );
  },[] );

  let Contents = <></>;

  // if ( !val_init ) {
  //   Contents = <Components.Placeholder />;
  // } else {
  //   Contents = <>
  //     <Components.Header
  //       val_def={ val_def }
  //       set_def={ set_def }
  //     />
  //     <Components.Body
  //       val_def={ val_def }
  //       set_def={ set_def }
  //     />
  //   </>
  // }

  return (
    <Layout.Plate
      padding={ 3 }
      UnderBreakPointStyles={ {
        padding: 1
      } }
    >
      <Flex
        flexType="col"
        gap={ 3 }
      >
        { Contents }
      </Flex>
    </Layout.Plate>
  );
}