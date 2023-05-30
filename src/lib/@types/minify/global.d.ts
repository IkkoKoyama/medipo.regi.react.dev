declare var Env: EnvParams

interface EnvParams {
  isProduct: boolean
  app: {
    alias: string
    version: string
  }
  csrfToken: string
  region: string
  User: User
  Org: Org
  Session: Session
  CDN: {
    static: string
    dev: string
    public: string
  }
  Links: GlobalLinks
  Images: {
    minify: {
      Icon: string
      IconClear: string
    }
    mingoo: {
      pngIcon: string
    }
    app: {
      Icon: string
      IconClear: string
      AppIconPath: string
      Favicon: string
    }
    usr: {
      icon: {
        S: string
        R: string
        L: string
      }
      incognitor: {
        icon: {
          S: string
          R: string
          L: string
        }
      }
    }
  }
}

interface GlobalLinks {
  readonly admin: string
}
interface User {
  email: string
  anonmity: number
  kana: string
  name: string
  gender: number
  birthday: number
  id: string
  profiles: {
    iconImage: string
    tone: amotify.ToneTypes
    themeColor: number
    darkMode: number
  }
}
interface Session { }
interface Org { }