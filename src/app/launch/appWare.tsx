export { }

const {
  atoms: {
    Flex,
    FontAwesomeIcon,
    Box
  }
} = amotify;

declare global {
  namespace amotify {
    interface APP {
      logo: {
        icon: FNC<Atoms.Logos.CommonParams>
        title: FNC<Atoms.Logos.CommonParams>
      }
    }
  }
  var appEnv: {
    genderName( genderId: number ): string
    productTypeName( type: number ): string

    visitPhaseName( phase: number ): string

    taxTypeRate( type: number ): number

    depositWithdrawTypeName( type: number ): string
    regiCheckTypeName( type: number ): string

    dynamicSearchStoreStaffInput: amotify.fn.Input.Chips.onDynamicSearch
    dynamicSearchCustomerInput: amotify.fn.Input.Chips.onDynamicSearch
  }
}

const {
  atoms: {
    Logo,
    Span
  },
  minifyComponent: {
    logos: {
      MinifyIcon,
      MinifyTitle
    }
  }
} = amotify;

global.amotify.app.logo = {
  icon: ( params ) => {
    return (
      <Logo.Icon { ...params }>
        <svg viewBox="0 0 167.75 123.66" className={ [
          'AppLogo',
          'Icon',
          'Size_' + ( params.size || 'R' ),
          'Color_' + ( params.color || 'normal' )
        ].join( ' ' ) }>
          <polygon className="p2" points="51.46 69.88 43.38 69.88 35.87 69.88 35.87 69.4 35.87 61.08 35.87 51.84 31.18 51.84 22.81 51.84 18.04 51.84 18.04 61.08 18.04 69.4 18.04 69.88 10.53 69.88 2.45 69.88 0 69.88 0 87.71 10.53 87.71 18.04 87.71 18.04 93.93 18.04 105.75 35.87 105.75 35.87 93.93 35.87 87.71 43.38 87.71 53.91 87.71 53.91 69.88 51.46 69.88" />
          <path className="p3" d="M452.71,290.79H400.12a6.29,6.29,0,0,0,0,12.57h1.16v62.08h50.27V345.3h0V303.36h1.16a6.29,6.29,0,0,0,0-12.57ZM443,357.12H409.81V297.07H443Z" transform="translate(-334.06 -241.78)" />
          <path className="p3" d="M418.05,316.14h15a3.67,3.67,0,0,0,0-7.34h-15a3.67,3.67,0,0,0,0,7.34Z" transform="translate(-334.06 -241.78)" />
          <path className="p3" d="M418.05,332.35h8.37a3.67,3.67,0,0,0,0-7.34h-8.37a3.67,3.67,0,0,0,0,7.34Z" transform="translate(-334.06 -241.78)" />
          <path className="p3" d="M431,341.63h-13a3.67,3.67,0,0,0,0,7.34h13a3.67,3.67,0,0,0,0-7.34Z" transform="translate(-334.06 -241.78)" />
          <path className="p4" d="M462.13,265.94a39.34,39.34,0,0,0-13.56,2.39l0,.07h0l0-.07,0,0h0l0,0a48.51,48.51,0,0,0-89.76,8.14c-.16.52-.3,1-.43,1.56a5.35,5.35,0,0,0,.05,1.5,4.22,4.22,0,0,0,3.27,3.62,4.36,4.36,0,0,0,4.66-2.78c.07-.28.15-.56.22-.84s.11-.52.19-.77A40.26,40.26,0,0,1,444.18,280a31.28,31.28,0,0,1,7.54-3.88s0,0,0-.05h0a.08.08,0,0,1,0,.05,31.33,31.33,0,1,1,14.57,60.6,31.69,31.69,0,0,1-4.16.31H451.55v8.32h10.58a40.79,40.79,0,0,0,4.16-.22,39.68,39.68,0,0,0-4.16-79.14Z" transform="translate(-334.06 -241.78)" />
        </svg>
      </Logo.Icon>
    );
  },
  title: ( params ) => {
    return (
      <Logo.Title { ...params }>
        <svg viewBox="0 0 260.32 71.08" className={ [
          'AppLogo',
          'Title',
          'Size_' + ( params.size || 'R' ),
          'Color_' + ( params.color || 'normal' )
        ].join( ' ' ) }
        >
          <path className="p1" d="M336,273.24A17.52,17.52,0,0,0,322.16,280a17.54,17.54,0,0,0-31.37,10.8v23.63h7.48V290.8a10.08,10.08,0,1,1,20.15,0v23.63h7.48V290.8a10.08,10.08,0,1,1,20.15,0v23.63h7.48V290.8A17.57,17.57,0,0,0,336,273.24Z" transform="translate(-290.79 -262.1)" />
          <path className="p1" d="M380.69,307.29h0a10.08,10.08,0,1,1,10.08-10.08h7.48a17.56,17.56,0,1,0-17.56,17.56h0Z" transform="translate(-290.79 -262.1)" />
          <rect className="p1" x="161.56" y="17.56" width="7.48" height="35.12" />
          <path className="p1" d="M434.56,262.1v20.75A17.55,17.55,0,1,0,442,297.21V262.1Zm-10.08,45.19a10.08,10.08,0,1,1,10.08-10.08A10.09,10.09,0,0,1,424.48,307.29Z" transform="translate(-290.79 -262.1)" />
          <circle className="p2" cx="89.91" cy="35.12" r="4.23" />
          <path className="p1" d="M488.83,280.51a17.57,17.57,0,0,0-17.56,17.55v35.12h7.49V312.42a17.55,17.55,0,1,0,10.07-31.91Zm0,27.63a10.08,10.08,0,1,1,10.07-10.08A10.08,10.08,0,0,1,488.83,308.14Z" transform="translate(-290.79 -262.1)" />
          <circle className="p1" cx="165.3" cy="4.23" r="4.23" />
          <path className="p1" d="M533.55,279.21a17.56,17.56,0,1,0,17.55,17.56A17.58,17.58,0,0,0,533.55,279.21Zm0,27.63a10.07,10.07,0,1,1,10.07-10.07A10.09,10.09,0,0,1,533.55,306.84Z" transform="translate(-290.79 -262.1)" />
          <circle className="p2" cx="242.76" cy="34.67" r="4.23" />
        </svg>
      </Logo.Title>
    );
  }
}


global.appEnv = {
  genderName: ( genderId ) => {
    return {
      '0': '未設定',
      '1': '男性',
      '2': '女性',
      '100': 'カスタム'
    }[ genderId ] || '';
  },
  productTypeName: ( type ) => {
    return {
      '101': '自費',
      '102': '物販',
      '999': 'カスタム',
    }[ type ] || '';
  },
  visitPhaseName: ( type ) => {
    return {
      0: '来店待ち(予約済)',
      100: '来店中',
      200: '会計済',
      '999': 'カスタム'
    }[ type ] || '';
  },

  taxTypeRate: ( type ) => {
    let rate = 0;
    if ( type == 1 ) rate = 10;
    else if ( type == 2 ) rate = 8;
    return rate;
  },

  depositWithdrawTypeName: ( type ) => {
    return {
      '1': '入金',
      '2': '出金'
    }[ type ] || '';
  },
  regiCheckTypeName: ( type ) => {
    return {
      '1': '点検',
      '2': '精算'
    }[ type ] || '';
  },

  dynamicSearchStoreStaffInput: async ( keyword ) => {
    let result = await $.fetch.post( {
      key: 'SearchStoreStaff',
      url: '/staff/search-store-staff',
      body: {
        keyword
      },
      trafficControl: 0
    } );
    if ( !result.ok ) return [];
    let { list } = result.body;
    let List: amotify.fn.Input.Chips.OptionParams[] = [];
    list.forEach( ( li: any ) => {
      let {
        name
      } = li;

      List.push( {
        value: li,
        icon: <FontAwesomeIcon
          d='clipboard-user'
        />,
        label: name
      } );
    } )
    return [ { options: List } ];
  },
  dynamicSearchCustomerInput: async ( keyword ) => {
    let result = await $.fetch.post( {
      key: 'SearchCustomer',
      url: '/customer/search',
      body: {
        keyword
      },
      trafficControl: 0
    } );
    if ( !result.ok ) return [];
    let { list } = result.body;
    let List: amotify.fn.Input.Chips.OptionParams[] = [];
    list.forEach( ( li: any ) => {
      let {
        name,
        kana,
        gender,
        age
      } = li;

      List.push( {
        value: li,
        label: <>
          <Box
            fontWeight='3.bold'
            fontSize='3.paragraph'
          >
            { kana } 様
          </Box>
          <Box
            fontSize='1.mini'
            fontColor='3.blur'
            children={ name || '--' }
          />
          <Box
            fontSize='1.mini'
            fontColor='3.blur'
          >
            { appEnv.genderName( gender ) } { age || '--' }歳
          </Box>
        </>
      } );
    } )
    return [ { options: List } ];
  },
}