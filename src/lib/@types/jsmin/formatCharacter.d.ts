interface JsminExtension {
  formatCharacter: {
    postal: {
      JP( params: string ): string
    }
    tel: {
      mobile( params: string ): string
      fixed( params: string ): string
    }
  }
  transformer: {
    weekday: {
      JP( params: number ): string
      shortJP( params: number ): string
    }
    
  }
}
namespace JsminExtension {

}