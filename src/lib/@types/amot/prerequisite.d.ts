declare module "*.scss";
declare module "react-dom";

// interface PrototypeObject {
//   prototype : any;
// }

type FNC<P> = React.FC<P>;

declare var userDevice : string;
declare var userIsMiniDisplay : boolean;
declare var userIsPhone : boolean;
declare var userIsMouseDevice : boolean;
declare var userIsTouchDevice : boolean;
declare var userIsIOS : boolean;

interface plainObject {
  [ index:string ] : any;
}

declare var Temps : {
  [ key : string ] : any
}
declare var StoreComponents : {
  [ key : string ] : plainObject
}