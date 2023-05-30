namespace Atoms {
  type BoxProps = amotifyBasicElement & {
    children?: ReactElement
  } & React.HTMLAttributes<HTMLDivElement>
  type SpanProps = amotifyBasicElement & {
    children?: ReactElement
  } & React.HTMLAttributes<HTMLSpanElement>
  type ParagraphProps = amotifyBasicElement & {
    children?: ReactElement
  } & React.HTMLAttributes<HTMLParagraphElement>

  namespace Canvas {
    type Props = amotifyBasicElement & React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>,HTMLCanvasElement>
  }
  namespace Iframe {
    type Props = amotifyBasicElement & {
      src?: string
      frameBorder?: string
    } & React.HTMLAttributes<HTMLIFrameElement>
  }
  namespace SVG {
    type Methods = {
      Base: FNC<BaseParams>
      Path: FNC<PathParams>
    }
    type BaseParams = amotifyBasicElement & {
      children?: ReactElement
    } & React.SVGProps<SVGSVGElement>
    type PathParams = amotifyBasicElement & React.SVGProps<SVGPathElement>
  }

  type FlexProps = amotifyBasicElement & {
    children?: ReactElement
  } & React.HTMLAttributes<HTMLDivElement>

  type GridProps = amotifyBasicElement & {
    children: ReactElement

    onClick?: {
      ( event: React.MouseEvent<HTMLDivElement,MouseEvent> ): void
    }
  } & React.HTMLAttributes<HTMLDivElement>

  type FontAwesomeIconParams = amotifyBasicElement & {
    iconFamily?: 'classic' | 'sharp'
    iconStyle?: 'solid' | 'regular' | 'light' | 'thin' | 'duotone'
    iconAnimation?: false | 'beat' | 'beat-fade' | 'bounce' | 'fade' | 'flip' | 'shake' | 'spin' | 'spin-reverse' | 'spin-pulse'
    brandIcon?: boolean
    d?: string
  } & React.HTMLAttributes<HTMLDivElement>

  type ImageProps = amotifyBasicElement & {
    src: string
    alt?: string
    showExpand?: boolean | string
  } & React.HTMLAttributes<HTMLImageElement>

  namespace Logos {
    type CommonParams = {
      size?: 'S' | 'R' | 'L' | '2L' | '3L'
      color?: 'normal' | 'white'
    }
    type ITProps = amotifyBasicElement & CommonParams & {
      children: ReactElement | FNC<any>
    }
    type HVProps = amotifyBasicElement & CommonParams & {
      icon: FNC<CommonParams>
      title: FNC<CommonParams>
    }

    type LogoTypes = {
      Icon: ( props: ITProps ) => JSX.Element
      Title: ( props: ITProps ) => JSX.Element
      Horizon: ( props: HVProps ) => JSX.Element
      Vertical: ( props: HVProps ) => JSX.Element
    }
  }
}

namespace amotify {
  interface Atoms {
    Box: FNC<Atoms.BoxProps>

    Flex: FNC<Atoms.FlexProps>
    FlexBr: FNC<amotifyUniStyleParams>

    Placeholder: FNC<Atoms.BoxProps>

    Canvas: FNC<Atoms.Canvas.Props>
    SVG: Atoms.SVG.Methods

    Iframe: FNC<Atoms.Iframe.Props>

    Grid: FNC<Atoms.GridProps>

    FontAwesomeIcon: FNC<Atoms.FontAwesomeIconParams>

    Span: FNC<Atoms.SpanProps>
    Paragraph: FNC<Atoms.ParagraphProps>
    Img: FNC<Atoms.ImageProps>

    Logo: Atoms.Logos.LogoTypes
  }
}