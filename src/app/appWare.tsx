export { }

declare global {
  var appEnv: {
    orgUserLevelArray: {
      '0': string
      '16': string
      '32': string
      '64': string
      '128': string
      '256': string
      '1': string
    }
    eventAnonymity: {
      '1': string
      '2': string
      '3': string
      '4': string
    }
    eventWay: {
      '1': string
      '2': string
      '3': string
    }
    eventPurpose: {
      '1': string
      '2': string
    }
    eventStatus: {
      '200': string
      '400': string
      '401': string
    }
    eventHeaderImage: {
      ( value: string,size?: 'S' | 'R' | 'L' ): string
    }
    orgIconImage: {
      ( value: string,size?: 'S' | 'R' | 'L' ): string
    }
    orgHeaderImage: {
      ( value: string,size?: 'S' | 'R' | 'L' ): string
    }

    userHeaderImage: {
      ( value: string,size?: 'R' | 'L' ): string
    }

    lineLink: string
  }
}

global.appEnv = {} as any

global.appEnv.orgUserLevelArray = {
  '0': '休会',
  '16': 'ビジター',
  '32': '友好メンバー',
  '64': '一般メンバー',
  '128': '幹部',
  '256': '管理者',
  '1': 'その他'
}

global.appEnv.eventAnonymity = {
  '1': '誰でも参加可能',
  '2': '同地区会員',
  '3': '同クラブ会員',
  '4': '任意のユーザー'
}
global.appEnv.eventPurpose = {
  '1': '参加登録用',
  '2': '告知'
}
global.appEnv.eventWay = {
  '1': '現地参加',
  '2': 'オンライン',
  '3': '現地 + オンライン',
}
global.appEnv.eventStatus = {
  '200': '掲載中',
  '400': '一時掲載停止中',
  '401': '削除',
}

global.appEnv.eventHeaderImage = ( value = '',size = 'R' ) => {
  let src = CDN.proEnv + 'app/racco/event/header/' + ( ( !value || value.length <= 1 ) ? '_default/' + ( value || '1' ) : value ) + '/' + size + '.jpeg';
  return src;
}

global.appEnv.orgIconImage = ( value = '',size = 'R' ) => {
  let src = CDN.proEnv + 'app/racco/org/icon/' + ( value || '_default' ) + '/' + size + '.jpeg';
  return src;
}

global.appEnv.orgHeaderImage = ( value = '',size = 'R' ) => {
  let src = CDN.proEnv + 'app/racco/org/header/' + ( value || '_default' ) + '/' + size + '.jpeg';
  return src;
}

global.appEnv.userHeaderImage = ( value = '',size = 'R' ) => {
  let src = CDN.proEnv + 'app/racco/user/header/' + ( value || '_default' ) + '/' + size + '.jpeg';
  return src;
}


global.appEnv.lineLink = 'https://lin.ee/4Cm1oMO';


declare global {
  namespace AMOT {
    interface APP {
      logo: {
        icon: FNC<Atoms.Logos.SizeProps>
        title: FNC<Atoms.Logos.SizeProps>
      }
    }
  }
}

const {
  glob: { React },
  atoms: { Logo }
} = AMOT;

global.AMOT.app.logo = {
  icon: ( props ) => ( <Logo.Icon { ...props } children={
    <img
      src={ CDN.proEnv + 'app/racco/@logo/Rotaract_Icon.svg' }
      alt=''
      style={ {
        padding: '.25rem'
      } }
    />
  } /> ),
  title: ( props ) => ( <Logo.Title { ...props } children={ 'RACCO' } /> )
}