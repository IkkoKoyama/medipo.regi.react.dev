interface JsminExtension {
  formCollect( form: string ): Promise<{
    valid: boolean
    data: plainObject
  }>
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

  pageBack(): void
  pagePush( path: string ): void

  exportToSpreadSheet: {
    ( props: JsminExtension.ExportToSpreadSheet.Props ): void
  }
  googleMaps: JsminExtension.Googlemaps
}
namespace JsminExtension {
  namespace ExportToSpreadSheet {
    type Props = {
      type?: 'xlsx' | 'csv'
      fileName: string
      sheets: SheetParams[]
    }
    type SheetParams = {
      sheetName: string
      headers: HeaderParams[]
      rows: RowParams[]
      merges?: ( [ string,string ] | [ null,null ] )[]
      styles?: StyleParams[]
    }
    type HeaderParams = {
      key: string
      value: string
    }
    type RowParams = {
      [ key: string ]: string | number
    }
    type StyleParams = {
      type: 'cell' | 'row' | 'column'
      target: string | number | ( string | number )[]
      values: {
        [ key: string ]: any
      }
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
  namespace Googlemaps {
    namespace Geocode {
      type Params = {
        type: 'address'
        params: string
      } | {
        type: 'location'
        params: {
          lat: number
          lng: number
        }
      }
      type Result = {
        ok: true
        body: ResultBody
      } | {
        ok: false
        body: any
      }
      type ResultBody = {
        postalCode: string
        country: string
        addressArray: string[]
        location: {
          lat: number
          lng: number
        }
        rawData: any
      }
    }
  }
  interface Googlemaps {
    getGeocode: {
      ( props: Googlemaps.Geocode.Params ): Promise<Googlemaps.Geocode.Result>
    }
  }
}

type base64ToBlobTypeProps = 'image/png' | 'image/jpeg' | string

interface String {
  zen2hanNumber(): string
}