declare var Env : {
  readonly AppId : string
  readonly AppName : string
  readonly csrfToken : string
  readonly adminUrl? : string
  // readonly sockRoot : string
  readonly cdn : {
    readonly libVer : string
    readonly appVer : string
    readonly pbl : string
    readonly enf : string
    readonly app : string
  }
  readonly region : string
  readonly option? : any
}
declare var Usr : {
  email : string
  anonmity : number
  kana : string
  name : string
  gender : number
  birthday: number
  id : string
  profiles : {
    iconImage : string
    themeColor : number
    displayMode : number
    layoutStyle : number
  }
  mfaProtect : number
  signInfo : {
    basic : boolean
    oidc : boolean
    passwordChangedAt : number
    mfaProtect : boolean
    mfaSecret : number
  }
}
declare var Org: any
declare var Session : any

declare var CDN : {
  readonly libVer : string
  readonly appVer : string
  readonly proEnv : string
  readonly devEnv : string
  readonly usr : string
  // readonly org : string
}
declare var Images : {
  readonly minify : {
    readonly Icon : string
    readonly IconClear : string
  }
  readonly mingoo : {
    readonly pngIcon : string
  }
  readonly app : {
    readonly Icon : string
    readonly IconClear : string
    readonly AppIconPath : string
    readonly Favicon : string
  }
  readonly usr : {
    icon : {
      S : string
      R : string
      L : string
    }
    incognitor : {
      icon : {
        S : string
        R : string
        L : string
      }
    }
  }
}
declare var ExcelJS : any;
declare var socket : any;