declare module "*.scss";
declare module "react-dom";
// declare module "react-router-dom";

interface plainObject {
  [ index:string ] : any;
}
interface PrototypeObject {
  prototype : any;
}


declare var userDevice : string;
declare var userIsMiniDisplay : boolean;
declare var userIsPhone : boolean;
declare var userIsMouseDevice : boolean;
declare var userIsTouchDevice : boolean;
declare var userIsIOS : boolean;

declare var socket : any;
declare var Env : {
  readonly AppAlias : string
  readonly AppName : string
  readonly csrfToken : string
  readonly sockRoot : string
  readonly cdn : {
    readonly pbl : string
    readonly enf : string
    readonly app : string
  }
  readonly region : string
  readonly option? : {
    readonly files? : {
      readonly all : boolean
      readonly mint : boolean
      readonly socket : boolean
    }
    readonly custom : {
      [ key:string ] : any
    }
  }
}
declare var Usr : {
  level : number
  profileImage : string
  email : string
  anonmity : number
  kana : string
  name : string
  id : number
  uuid : string
  profiles : {
    themeColor? : string
    displayMode? : string
  }
  az : {
    sub : string
  }
}
declare var Org: {
  level: number
  id: number
  uuid: string
  name: string
  apps: number[]
  usr: plainObject
}

declare var Cdn : {
  readonly proEnv : string
  readonly devEnv : string
  readonly app : string
  readonly usr : string
  readonly org : string
}
declare var FS : {
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
    incognitorTop : string
    profile : {
      icon : string
      display : string
      image : string
    }
  }
}
declare var Temps : {
  [ key : string ] : any
}
declare var StoreComponents : {
  [ key : string ] : plainObject
}

var ExcelJS : any;