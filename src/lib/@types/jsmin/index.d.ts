interface plainObject {
  [ index: string ]: any;
}

namespace Jsmin {
  type Args = any
  type ElementableValue = any

  interface jsMin {
    new( v?: Args ): Method
  }

  interface Method {
    [ Symbol.iterator ](): void
    [ index: number ]: HTMLElement
    length: number
    queue: Function[]
    queueProcess: boolean
    synchronous: boolean
    warn?: string
    src?: Jsmin.Args
    srcType?: string

    jsMin: Jsmin.jsMin

    get( v?: number ): HTMLElement[]
    for( v: ForFunction,n?: number ): any[]

    await( time: number ): Jsmin.Method
    abort(): Jsmin.Method
    callback: {
      ( fn: {
        ( jsmin: Jsmin.Method ): void
      } ): Jsmin.Method
    }

    click(): Jsmin.Method
    focus(): Jsmin.Method

    addEvent( args: Events.AddEventInput ): Jsmin.Method
    removeEvent( args: Events.RemoveEventInput ): Jsmin.Method

    html( v: Jsmin.ElementableValue ): Jsmin.Method
    empty(): Jsmin.Method
    append( v: Jsmin.ElementableValue ): Jsmin.Method
    remove(): Jsmin.Method
    before( ...v: Jsmin.ElementableValue[] ): Jsmin.Method
    after( ...v: Jsmin.ElementableValue[] ): Jsmin.Method
    find( v: Jsmin.ElementableValue ): Jsmin.Method
    parent( v?: string ): Jsmin.Method
    children( v?: string | 'first' | 'last' | number ): Jsmin.Method

    addClass( v: string | string[] ): Jsmin.Method
    removeClass( v: string | string[] ): Jsmin.Method
    toggleClass( v: string ): Jsmin.Method
    hasClass( v: string ): boolean
    findClass( v: RegExp ): string[]
    css( v: React.CSSProperties ): Jsmin.Method

    getAttribute( key: string ): string
    setAttribute( key: string,value: string ): Jsmin.Method
    getStyleProperty( property: string ): string
    setStyleProperty( property: string,value: string ): Jsmin.Method

    val(): string

    position(): DOMRect
  }
  type ForFunction = {
    ( element: HTMLElement,index: number ): void
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
      html?: Jsmin.ElementableValue
      attr?: plainObject
      parent?: Jsmin.ElementableValue
      style?: React.CSSProperties
    }
  }

  namespace Events {
    type customEventListener = {
      ( this: HTMLElement,evt: any ): void;
    }
    type EventType = keyof WindowEventMap

    type AddEventInput = {
      eventType: EventType
      eventId?: string
      target?: string | Jsmin.Method | HTMLElement
      callback: customEventListener
      option?: {
        passive?: boolean
        capture?: boolean
      }
    }
    type RemoveEventInput = string | string[]
  }

  namespace Fetch {
    type Args = {
      url: string
      body?: any
      timeout?: number
    } & Omit<RequestInit,'body'>
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

  setLocalStrageData( key: string,value: any ): any
  getLocalStrageData( key: string ): any

  deleteCookie( name: string ): void

  ajax( o: Jsmin.Fetch.Args ): Promise<Jsmin.Fetch.Res>

  pending(
    callback: {
      ( resolve: {
        ( result: boolean ): void
      } ): void
    },
    seconds: number
  ): Promise<boolean>
  getCursor( event: Event | customEvent ): {
    x: number
    y: number
  }
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
    key: string
    value: string | number
  } ): string
  deleteQueryParam( props: {
    url?: string
    name: string
  } ): string

  is: Jsmin.IsCheck

  flatArray( v: any,regression?: '-R' ): any[]
  deepMerge<T>( target: T,...args: T[] ): T
  toJson( value: any ): {
    ok: boolean
    body: any
  }

  randomNumber: {
    ( min?: number,max?: number ): number
  }
}
interface JsminExtension {
}

type glob = typeof window | typeof global | typeof self;
var $: Jsmin & JsminExtension;