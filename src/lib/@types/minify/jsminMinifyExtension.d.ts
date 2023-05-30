interface JsminExtension {
  minifyEntities: {
    Images: {
      userIcon( value: string,size?: 'S' | 'R' | 'L' ): string
      orgIcon( value: string,size?: 'S' | 'R' | 'L' ): string
      orgHeader( value: string,size?: 'S' | 'R' | 'L' ): string
    }
    orgUserAuthorityName( level: number ): string
  }

  fetch: {
    get: JsminExtension.Fetch.CoreParams
    post: JsminExtension.Fetch.CoreParams
    put: JsminExtension.Fetch.CoreParams
    option: JsminExtension.Fetch.CoreParams
  }
  fetchList: string[]
}
namespace JsminExtension {
  namespace Fetch {
    type CoreParams = {
      ( params: JsminExtension.Fetch.Params,callback?: JsminExtension.Fetch.callback ): Jsmin.Fetch.Res
    }
    type Params = {
      key: string
      bodyStringify?: boolean
      timeout?: number
      loaderEffect?: 'top' | 'corner'
      trafficControl?: number
      preventMultiRequest?: boolean
    } & Omit<Jsmin.Fetch.Args,'method'>
    type callback = {
      ( result: Jsmin.Fetch.Res ): void
    }
  }
  namespace GoogleMaps {

  }
  interface GoogleMaps {

  }
}