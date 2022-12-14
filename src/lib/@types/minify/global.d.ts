declare var Env : {
  appId : string
  appAlias : string
  isProduct : boolean
  csrfToken : string
  region : string
  User : User
  Org : Org
  Session : Session
  CDN : {
    appVer : string
    static : string
    dev : string
    public : string
    preset : RegularCDN
  }
  Links : GlobalLinks
  Images : {
    minify : {
      Icon : string
      IconClear : string
    }
    mingoo : {
      pngIcon : string
    }
    app : {
      Icon : string
      IconClear : string
      AppIconPath : string
      Favicon : string
    }
    usr : {
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
}
interface RegularCDN {}
interface GlobalLinks {
  readonly admin : string
}
interface User {
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
    darkMode : boolean
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
interface Session {}
interface Org {}