namespace Orgs {
  namespace Cropper {
    type Props = {
      use: 'profile' | 'header'
      triggerId?: string
      develops: DevelopParams[]
      onProcessFinished: {
        ( files: Input.Filer.CustomFile[] ): void
      }
    }

    type DevelopParams = {
      size: 'S' | 'R' | 'L'
      maxSize?: number
    }
  }
}

namespace amotify {
  interface Orgs {
    Cropper: FNC<Orgs.Cropper.Props>
  }
}