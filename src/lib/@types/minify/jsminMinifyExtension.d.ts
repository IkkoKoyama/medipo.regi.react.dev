interface JsminExtension {
  UpdateUsrImg( v: string ): void
  userIconImage: {
    ( value: string,size?: 'S' | 'R' | 'L' ): string
  }
  fetch(
    params: JsminExtension.Fetch.params,
    callback?: JsminExtension.Fetch.callback
  ): Jsmin.Fetch.Res
  fetchList: string[]
}
namespace JsminExtension {
  namespace Fetch {
    type params = {
      name?: string
      method: "get" | "post" | "put" | "option"
      url: string
      mode?: "cors" | "navigate" | "no-cors" | "same-origin"
      credentials?: "include" | "omit" | "same-origin"
      header?: RequestInit[ 'headers' ]
      body?: any
      bodyStringify?: boolean
      timeout?: number
      loaderEffect?: 'top' | 'corner'
      onSuccess?(
        resolve: Function,
        reject: Function,
        result: any,
        option: {
          time: number
        }
      ): void
      trafficControl?: number
      preventMultiRequest?: boolean
    }
    type callback = {
      ( result: Jsmin.Fetch.Res ): void
    }
  }
}