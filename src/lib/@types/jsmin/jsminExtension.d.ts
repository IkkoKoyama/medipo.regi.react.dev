interface JsminExtension {
  FormCollect( form: string ): Promise<{
    valid: boolean
    data: plainObject
  }>
  fetch(
    params: JsminExtension.Fetch.params,
    callback?: JsminExtension.Fetch.callback
  ): Jsmin.Fetch.Res
  fetchList: string[]
  getCursor( event: Event ): {
    x: number
    y: number
  }
  getCurrentLocation: {
    (): Promise<{
      ok: false
      status: number
      body: {
        reason: any
      }
    } | {
      ok: true
      status: 200
      body: {
        lat: number
        lng: number
      }
    }>
  }
  getGeocode: {
    ( props: GeoCodeProps ): Promise<GeocodeResult>
  }
  copyToClipBoard: {
    ( type: 'string' | 'image',data: any ): void
  }
  CDNReader: {
    ( url: string ): void
  }

  ImageLoader: {
    ( dataUrl: string,img?: HTMLImageElement ): Promise<HTMLImageElement>
  }
  MapView: JsminExtension.MapView.init

  setCustomStyleSheet: {
    ( value: string ): void
  }

  exportToSpreadSheet: {
    ( props: JsminExtension.ExportToSpreadSheet.Props ): void
  }
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
  namespace ExportToSpreadSheet {
    type Props = {
      type?: 'xlsx' | 'csv'
      fileName: string
      sheets: {
        sheetName: string
        headers: HeadProps[]
        rows: {
          [ key: string ]: string | number
        }[]
      }[]
    }
    type HeadProps = {
      key: string
      value: string
    }
  }
  namespace MapView {
    type init = {
      ( props: constructorProps ): Promise<MapMethods>
    }
    type constructorProps = {
      target: HTMLElement
      options: google.maps.MapOptions
    }
    type MapMethods = {
      ok: boolean
      map: google.maps.Map | undefined
      setMarker: {
        ( props: setMarkerProps ): MapMethods
      }
      setCircle: {
        ( props: setCircleProps ): MapMethods
      }
      setInfoWindow: {
        ( props: setInfoWindowProps ): MapMethods
      }
    }

    type setMarkerProps = {
      id: string
      options: google.maps.MarkerOptions
    }
    type setCircleProps = {
      id: string
      options: google.maps.CircleOptions
    }
    type setInfoWindowProps = {
      id: string
      options: google.maps.InfoWindowOptions
    }
  }
}

type base64ToBlobTypeProps = 'image/png' | 'image/jpeg' | string

type GeoCodeProps = {
  type: 'address'
  params: string
} | {
  type: 'location'
  params: {
    lat: number
    lng: number
  }
}
type GeocodeResult = {
  ok: true
  body: GeocodeResultBody
} | {
  ok: false
  body: any
}
type GeocodeResultBody = {
  postal: string
  addr: string
  location: {
    lat: number
    lng: number
  }
  rowData: any
}

interface String {
  zen2hanNumber(): string
  partOverride( begin: number,string: string ): string
  toDateJP( separate?: string ): string
  toTimeJP( separate?: string ): string
  toBlob( mimeType: base64ToBlobTypeProps ): Blob | false
}


interface File {
  read(): Promise<ProgressEvent<FileReader>>
  toDataUrl(): Promise<string>
}