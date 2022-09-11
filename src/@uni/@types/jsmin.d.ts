interface Event {
  ctrlKey : boolean
  metaKey : boolean
  keyCode : number
  pageX : number
  pageY : number
  dataTransfer : any
}
interface EventTarget {
  closest : any
}
namespace Jsmin {
  type Args = any
  type Doms = any
  type Child = Jsmin.Args
  type Childs = Jsmin.Child[ ]

  interface jsMin {
    new ( v?:Args ) : Method
  }
  
  interface Method {
    [ index: number ]: Jsmin.Child
    [ Symbol.iterator ]() : void
    length : number
    queue : Function[]
    warn? : string
    src? : Jsmin.Args
    srcType? : string

    jsMin : Jsmin.jsMin
    get( v?:number ) : Jsmin.Childs
    for( v:ForFunction,n?:number ) : Jsmin.Childs[]
    is : Jsmin.IsCheck;
    click() : Jsmin.Method
    focus() : Jsmin.Method
    on( ... args:Jsmin.OnArgs ) : Jsmin.Method
    off( ... args:Jsmin.OffArgs ) : Jsmin.Method

    attr( ... v:Jsmin.AttrArgs ) : Jsmin.Method | string
    html( v:Jsmin.Doms ) : Jsmin.Method
    empty() : Jsmin.Method
    append( ... args:Jsmin.AppendArgs ) : Jsmin.Method
    remove() : Jsmin.Method
    val() : string;
    find( v:Jsmin.Doms | Jsmin.Child ) : Jsmin.Method
    parent( v?:string ) : Jsmin.Method
    before( ... v:Jsmin.Doms[] ) : Jsmin.Method
    after( ... v:Jsmin.Doms[] ) : Jsmin.Method
    children( v?:string | number ) : Jsmin.Method

    addClass( v:string ) : Jsmin.Method
    removeClass( v:string ) : Jsmin.Method
    toggleClass( v:string ) : Jsmin.Method
    hasClass( v:string ) : boolean
    css( v:React.CSSProperties ) : Jsmin.Method
    show() : Jsmin.Method
    hide() : Jsmin.Method
    position() : DOMRect
  }
  type ForFunction = {
    ( element:Childs,index:number ) : void
  }
  namespace IsCheck {
    type Args = any
  }
  interface IsCheck {
    what( v:Jsmin.IsCheck.Args ) : string
    exist( v:Jsmin.IsCheck.Args ) : boolean | 1 | 0
    jsmin( v:Jsmin.IsCheck.Args ) : v is Jsmin.Method
    str( v:Jsmin.IsCheck.Args ) : v is string
    string( v:Jsmin.IsCheck.Args ) : v is string
    bool( v:Jsmin.IsCheck.Args ) : v is boolean
    boolean( v:Jsmin.IsCheck.Args ) : v is boolean
    num( v:Jsmin.IsCheck.Args ) : v is number
    number( v:Jsmin.IsCheck.Args ) : v is number
    arr( v:Jsmin.IsCheck.Args ) : v is any[]
    array( v:Jsmin.IsCheck.Args ) : v is any[]
    fn( v:Jsmin.IsCheck.Args ) : v is Function
    function( v:Jsmin.IsCheck.Args ) : v is Function
    plain( v:Jsmin.IsCheck.Args ) : boolean
    plainObject( v:Jsmin.IsCheck.Args ) : boolean
    elm( v:Jsmin.IsCheck.Args ) : v is HTMLElement
    element( v:Jsmin.IsCheck.Args ) : v is HTMLElement
    elms( v:Jsmin.IsCheck.Args ) : v is HTMLElement[]
    elements( v:Jsmin.IsCheck.Args ) : v is HTMLElement[]
    date( v:Jsmin.IsCheck.Args ) : v is Date
  }
  namespace CreateElement {
    interface Args {
      tag? : string
      className? : string
      id? : string
      html? : Jsmin.Doms
      attr? : plainObject
      parent? : Jsmin.Doms
      style? : React.CSSProperties
    }
  }

  interface EventCallback {
    ( this:HTMLElement,e:Event ) : any
  } 
  type EventType = 'input' | 'click' | 'mouseover' | 'mousemove' | 'mouseout' | 'mousedown' | 'mouseup' | 'mousewheel' | 'touchstart' | 'touchmove' | 'touchend' | 'keypress' | 'keydown' | 'keyup' | 'change' | 'focus' | 'dragstart' | 'drag' | 'dragend' | 'dragover' | 'dragleave' | 'drop' | 'beforeunload' | 'scroll'
  type EventOption = {
    passive? : boolean
  }
  type OnArgs = [ EventType,Jsmin.EventCallback ] | [ EventType,Jsmin.EventCallback,EventOption ] | [ EventType,Jsmin.Doms,Jsmin.EventCallback ] | [ EventType,Jsmin.Doms,Jsmin.EventCallback,EventOption ]
  type OffArgs = [ 'ALL' ] | [ Jsmin.EventType ] | [ Jsmin.EventType,Jsmin.EventCallback ] | [ Jsmin.EventType,Jsmin.Doms ] | [ Jsmin.EventType,Jsmin.Doms,Jsmin.EventCallback ]
  type AppendArgs = [ Jsmin.Doms ] | [ Jsmin.Doms,Jsmin.Method ]
  type AttrArgs = [ string ] | [ string,string ]

  namespace Fetch {
    interface Args {
      method : "get" | "post" | "option"
      mode? : "cors" | "navigate" | "no-cors" | "same-origin"
      credentials? : "include" | "omit" | "same-origin"
      url : string
      header? : RequestInit[ 'headers' ]
      body? : plainObject | string
      timeout? : number
      onSuccess? : Function | null
    }
    type Response = {
      httpStatus : number
      httpStatusText : string
      httpRequestTime : number
      ok : boolean
      status : number
      body : string | plainObject
    } | plainObject
  }
}
interface Jsmin {
  fn : Jsmin.Method | plainObject
  prototype : Jsmin.Method | plainObject
  expando : string

  ( v?:Jsmin.Args ) : Jsmin.Method

  extend( v:plainObject,t?:Jsmin | PrototypeObject ) : void
  uuidGen( v?:number ) : string
  createElement : ( v:Jsmin.CreateElement.Args ) => HTMLElement

  setCookie( props : {
    name : string,
    value : string,
    age? : number,
    path? : string,
    domain? : string
  } ) : void
  getCookie( name:string ) : string
  ajax( o:Jsmin.Fetch.Args ) : Promise< Jsmin.Fetch.Response >

  getStyleProperty( property:string ) : string
  setStyleProperty( property:string,value:string ) : void
  getScreenSize() : {
    height : number
    width : number
    scrollY,
    scrollX
  }
}
interface JsminExtension {
}
interface HTMLElement {
  [ index : string ] : string
  style : {
    [ index : string ] : string
  }
  position() : DOMRect
}
interface Number {
  zeroEmbed( digit:number ) : string
  ratio( base:number,floatings?:number ) : number
  rate( base:number,floatings?:number ) : number
  rank( floatings?:number ) : string
  rankJp() : string
}
interface String {
  compress() : string
  encode() : string
  decode() : string
  toLower() : string
  toUpper() : string
  toCapital() : string
  clip( from:number,to:number ) : string
}

namespace Array {
  type OrderProps = {
    direction : 'ASC' | 'DESC',
    keys? : ( string | number )[],
    numeral? : boolean
  }
}
interface Array {
  order : {
    ( props:Array.OrderProps ) : any
  }
}
interface Date {
  ymdhms() : string
  ymd( v?:string ) : string | null
  ym( v?:string ) : string | null
  y( v?:string ) : string | null
  hm( v?:string ) : string | null
  year( v:number ) : Date
  month( v:number ) : Date
  week( v:number ) : Date
  date( v:number ) : Date
  hour( v:number ) : Date
  minute( v:number ) : Date
  second( v:number ) : Date
  dLEN( v:Date ) : number
  dMF() : Date
  dML() : Date
  dWF() : Date
  dWL() : Date
}

type glob = typeof window | typeof global | typeof self;
var $ : Jsmin & JsminExtension;