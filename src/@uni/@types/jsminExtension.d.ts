var deviceId : string
interface JsminExtension {
  UpdateUsrImg( v:string ):void
  FormCollect( form:string ) : Promise<{
    valid : number
    data : plainObject
  }>
  fetch(o : {
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
    trafficControl? : boolean
    exclusive? : false
  }) : Jsmin.Fetch.Response
  fetchProgression:boolean
  getCursor( event:Event ) : {
    x : number
    y : number
  }
  getGeocode : {
    ( request : string ) : Promise<{
      ok : boolean
      status : number
      body : GeocodeResult | string
    }>
  }
  integrateMultipleRequest : {
    ( callback : Function,time : number ) : void
  }
  copyToClipBoard : {
    ( type:'string' | 'image',data:any ) : void
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
}

type base64ToBlobTypeProps = 'image/png' | 'image/jpeg'
type GeocodeResult = {
  addr : string
  location : {
    lat : number
    lng : number
  }
}

interface String {
  zen2hanNumber() : string
  partOverride( begin:number,string:string ) : string
}