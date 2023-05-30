namespace Mols {
  namespace Accordion {
    type Params = {
      open?: boolean
      accordionId?: string
      slideAnimation?: 'none' | 'fast' | 'slow'
      children: ReactElement
      onToggleEvent?: {
        ( open: boolean ): void
      }
    } & Atoms.BoxProps
    type FNParams = {
      fn: {
        open( accordionId: string ): void
        close( accordionId: string ): void
        toggle( accordionId: string ): void
      }
    }
    type SetParams = FNC<Params> & FNParams
  }

  namespace List {
    type Params = amotifyBasicElement & {
      rowStyles?: amotifyUniStyleParams
      rows: RowsParams[]
    }

    type RowsParams = {
      children: ReactElement
    } & amotifyBasicElement
  }

  type LinkifyTextProps = {
    text: string
    placeholder?: ReactElement
  }
}

namespace amotify {
  interface Mols {
    List: FNC<Mols.List.Params>
    Accordion: Mols.Accordion.SetParams
    LinkifyText: FNC<Mols.LinkifyTextProps>
  }
}