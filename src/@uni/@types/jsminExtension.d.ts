var deviceId : string
interface JsminExtension {
  UpdateUsrImg( v:string ) : void
  FormCollect( form:string ) : Promise < {
    valid : number
    data : plainObject
  } >
  fetch( o : {
    method : "get" | "post" | "option"
    url : string
    mode? : "cors" | "navigate" | "no-cors" | "same-origin"
    credentials?  :"include" | "omit" | "same-origin"
    header? : RequestInit['headers']
    body? : plainObject | string
    timeout? : number
    onSuccess?(
      resolve : Function,
      reject : Function,
      result : any,
      option : {
        time : number
      }
    ) : void
    trafficControl? : number | false
    exclusive? : false
  }) : Jsmin.Fetch.Response
  fetchProgression:boolean
  getCursor( event:Event ) : {
    x : number
    y : number
  }
  getCurrentLocation : {
    () : Promise<{
      ok : false
      status : number
      body : {
        reason : any
      }
    } | {
      ok : true
      status : 200
      body : {
        lat : number
        lng : number
      }
    }>
  }
  getGeocode : {
    ( props : GeoCodeProps ) : Promise< GeocodeResult >
  }
  integrateMultipleRequest : {
    ( callback : Function,time : number ) : void
  }
  copyToClipBoard : {
    ( type:'string' | 'image',data:any ) : void
  }
  CDNReader : {
    ( url : string ) : void
  }

  FileReader : {
    ( file : File ) : Promise< ProgressEvent<FileReader> >
  }
  ImageLoader : {
    ( dataUrl : string ) : Promise< HTMLImageElement >
  }
  base64ToBlob : {
    ( data:string,type:base64ToBlobTypeProps ) : any
  }
  MapView : MapView.init
}

namespace MapView {
  type init = {
    ( props : constructorProps ) : Promise< MapMethods >
  }
  type constructorProps = {
    target : HTMLElement
    options : google.maps.MapOptions
  }
  type MapMethods = {
    ok : boolean
    map : google.maps.Map | undefined
    setMarker : {
      ( props : setMarkerProps ) : MapMethods
    }
    setCircle : {
      ( props : setCircleProps ) : MapMethods
    }
    setInfoWindow : {
      ( props : setInfoWindowProps ) : MapMethods
    }
  }

  type setMarkerProps = {
    id : string
    options : google.maps.MarkerOptions
  }
  type setCircleProps = {
    id : string
    options : google.maps.CircleOptions
  }
  type setInfoWindowProps = {
    id : string
    options : google.maps.InfoWindowOptions
  }
}

type base64ToBlobTypeProps = 'image/png' | 'image/jpeg'

type GeoCodeProps = {
  type : 'address'
  params : string
} | {
  type : 'location'
  params : {
    lat : number
    lng : number
  }
}
type GeocodeResult = {
  ok : true
  status : 200
  body : GeocodeResultBody
} | {
  ok : false
  status : number
  body : any
}
type GeocodeResultBody = {
  postal : string
  addr : string
  location : {
    lat : number
    lng : number
  }
  rowData : any
}

interface String {
  zen2hanNumber() : string
  partOverride( begin:number,string:string ) : string
}