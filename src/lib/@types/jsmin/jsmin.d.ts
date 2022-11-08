interface Event {
  ctrlKey: boolean
  metaKey: boolean
  keyCode: number
  pageX: number
  pageY: number
  dataTransfer: any
}
interface EventTarget {
  closest: any
}
namespace Jsmin {
  type Args = any
  type Doms = any
  type Child = Jsmin.Args
  type Childs = Jsmin.Child[]

  interface jsMin {
    new( v?: Args ): Method
  }

  interface Method {
    [ Symbol.iterator ](): void
    [ index: number ]: Jsmin.Child
    length: number
    queue: Function[]
    queueProcess: boolean
    synchronous: boolean
    warn?: string
    src?: Jsmin.Args
    srcType?: string

    jsMin: Jsmin.jsMin

    get( v?: number ): Jsmin.Childs
    for( v: ForFunction,n?: number ): Jsmin.Childs[]

    sync(): Jsmin.Method
    async(): Jsmin.Method
    await( time: number ): Jsmin.Method
    abort(): Jsmin.Method
    callback: {
      ( fn: {
        ( jsmin: Jsmin.Method ): void
      } ): Jsmin.Method
    }

    click(): Jsmin.Method
    focus(): Jsmin.Method

    on( ...args: Jsmin.OnArgs ): Jsmin.Method
    off( ...args: Jsmin.OffArgs ): Jsmin.Method

    html( v: Jsmin.Doms ): Jsmin.Method
    empty(): Jsmin.Method
    append( ...args: Jsmin.AppendArgs ): Jsmin.Method
    remove(): Jsmin.Method
    before( ...v: Jsmin.Doms[] ): Jsmin.Method
    after( ...v: Jsmin.Doms[] ): Jsmin.Method
    find( v: Jsmin.Doms | Jsmin.Child ): Jsmin.Method
    parent( v?: string ): Jsmin.Method
    children( v?: string | 'first' | 'last' | number ): Jsmin.Method

    show(): Jsmin.Method
    hide(): Jsmin.Method
    addClass( v: string | string[] ): Jsmin.Method
    removeClass( v: string | string[] ): Jsmin.Method
    toggleClass( v: string ): Jsmin.Method
    hasClass( v: string ): boolean
    findClass( v: RegExp ): string[]
    css( v: React.CSSProperties ): Jsmin.Method

    getAttribute( key: string ): string
    setAttribute( key: string,value: string ): Jsmin.Method
    getStyleProperty( property: string ): string
    setStyleProperty( property: string,value: string ): string

    val(): string

    position(): DOMRect
  }
  type ForFunction = {
    ( element: Childs,index: number ): void
  }
  interface IsCheck {
    what( v: any ): string
    exist( v: any ): boolean
    nullish( val: any ): boolean
    jsmin( v: any ): v is Jsmin.Method
    string( v: any ): v is string
    boolean( v: any ): v is boolean
    number( v: any ): v is number
    array( v: any ): v is any[]
    function( v: any ): v is Function
    plainObject( v: any ): v is plainObject
    element( v: any ): v is HTMLElement
    elements( v: any ): v is HTMLElement[]
    date( v: any ): v is Date
  }
  namespace CreateElement {
    interface Args {
      tag?: string
      className?: string
      id?: string
      html?: Jsmin.Doms
      attr?: plainObject
      parent?: Jsmin.Doms
      style?: React.CSSProperties
    }
  }

  interface EventCallback {
    ( this: HTMLElement,e: Event ): any
  }
  type EventType = 'input' | 'click' | 'mouseover' | 'mousemove' | 'mouseout' | 'mousedown' | 'mouseup' | 'mousewheel' | 'touchstart' | 'touchmove' | 'touchend' | 'keypress' | 'keydown' | 'keyup' | 'change' | 'focus' | 'blur' | 'dragstart' | 'drag' | 'dragend' | 'dragover' | 'dragleave' | 'drop' | 'beforeunload' | 'scroll'
  type EventOption = {
    passive?: boolean
    capture?: boolean
  }
  type OnArgs = [ EventType,Jsmin.EventCallback ] | [ EventType,Jsmin.EventCallback,EventOption ] | [ EventType,Jsmin.Doms,Jsmin.EventCallback ] | [ EventType,Jsmin.Doms,Jsmin.EventCallback,EventOption ]
  type OffArgs = [ 'ALL' ] | [ Jsmin.EventType ] | [ Jsmin.EventType,Jsmin.EventCallback ] | [ Jsmin.EventType,Jsmin.Doms ] | [ Jsmin.EventType,Jsmin.Doms,Jsmin.EventCallback ]
  type AppendArgs = [ Jsmin.Doms ] | [ Jsmin.Doms,Jsmin.Method ]

  namespace Fetch {
    interface Args {
      method: "get" | "post" | 'put' | "option"
      mode?: "cors" | "navigate" | "no-cors" | "same-origin"
      credentials?: "include" | "omit" | "same-origin"
      url: string
      header?: RequestInit[ 'headers' ]
      body?: plainObject | string
      timeout?: number
      onSuccess?: Function | null
    }
    type Res = {
      status: number
      statusText: string
      requestTime: number
      rawData: Response
      ok: boolean
      status: number
      body: any
    } | plainObject
  }
}
interface Jsmin {
  fn: Jsmin.Method | plainObject
  prototype: Jsmin.Method | plainObject
  expando: string

  ( v?: Jsmin.Args ): Jsmin.Method

  extend( v: plainObject,t?: Jsmin | PrototypeObject ): void
  uuidGen( v?: number ): string
  createElement: ( v: Jsmin.CreateElement.Args ) => HTMLElement

  setCookie( props: {
    name: string,
    value: string,
    age?: number,
    path?: string,
    domain?: string
    secure?: boolean
  } ): void
  getCookie( name: string ): string
  deleteCookie( name: string ): void

  ajax( o: Jsmin.Fetch.Args ): Promise<Jsmin.Fetch.Res>

  getScreenSize(): {
    height: number
    width: number
    scrollY: number
    scrollX: number
    pageYOffset: number
    pageXOffset: number
  }
  getQueryParams( url?: string ): plainObject
  setQueryParam( props: {
    url?: string
    name: string
    value: string
  } ): string
  deleteQueryParam( props: {
    url?: string
    name: string
  } ): string

  is: Jsmin.IsCheck
}
interface JsminExtension {
}
interface HTMLElement {
  [ index: string ]: string
  style: {
    [ index: string ]: string
  }
  position(): DOMRect
}
interface Number {
  zeroEmbed( digit: number ): string
  ratio( base: number,floatings?: number ): number
  rate( base: number,floatings?: number ): number
  rank( floatings?: number ): string
  rankJp(): string
  toDate( separate?: string ): string
}
interface String {
  compress(): string
  encode(): string
  decode(): string
  toLower(): string
  toUpper(): string
  toCapital(): string
  clip( from: number,to: number ): string
}

namespace Array {
  type OrderProps = {
    direction: 'ASC' | 'DESC',
    keys?: ( string | number )[],
    numeral?: boolean
  }
}
interface Array {
  order: {
    ( props: Array.OrderProps ): any
  }
}
interface Date {
  ymdhms(): string
  ymd( v?: string ): string
  ym( v?: string ): string
  y( v?: string ): string
  hm( v?: string ): string
  year( v: number ): Date
  month( v: number ): Date
  week( v: number ): Date
  date( v: number ): Date
  hour( v: number ): Date
  minute( v: number ): Date
  second( v: number ): Date
  dLEN( v: Date ): number
  dMF(): Date
  dML(): Date
  dWF(): Date
  dWL(): Date
}

type glob = typeof window | typeof global | typeof self;
var $: Jsmin & JsminExtension;