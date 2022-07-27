declare module "*.scss";
declare module "react-dom";

interface plainObject {
  [ index:string ] : any;
}
interface PrototypeObject {
  prototype : any;
}


declare var userDevice : string;
declare var userIsPhoneSize : boolean;
declare var userIsTabletSize : boolean;
declare var userIsPhone : boolean;
declare var userIsMouseDevice : boolean;
declare var userIsTouchDevice : boolean;
declare var userIsIOS : boolean;

declare var root : any;
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
  imageId : string
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
}
declare var Comm : {
  
}

declare var Cdn : {
  readonly proEnv : string
  readonly devEnv : string
  readonly app : string
  readonly usr : string
  readonly comm : string
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
    incognitorHead : string
    top : string
  }
}
declare var StoreComponents : {
  [ key : string ] : plainObject
}

var google : any;