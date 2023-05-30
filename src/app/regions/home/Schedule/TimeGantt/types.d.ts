namespace TimeGantt {
  type Coloring = 'theme' | 'posi' | 'nega' | 'warn' | 'dark'

  type Params = {

  } & Atoms.BoxProps


  type SegmentParams = {
    id: number | string
    label: ReactElement
  }
  type CellObjectParams = {
    componentId: string
    segmentId: number | string
    from: number
    to: number
    color: Coloring
    rowIndex?: number
  }
  type UnitInfoParams = {
    time: number
    outCell: boolean
    stem: boolean
  }
  type StatusParams = {
    componentId: string,
    segmentType: string
    segments: SegmentParams[]
    unit: number
    unitPerHour: number

    openAt: number
    closeAt: number
    from: number
    to: number
    restFrom?: number
    restTo?: number

    colLength: number
    cells: CellObjectParams[]
    unitsInfo: UnitInfoParams[]
  }
  type GanttCellParams = {
    baseComponentId: string
    componentId: string
    color?: TimeGantt.Coloring
    active: boolean
  } & Atoms.FlexProps


  namespace Effect {
    namespace Stretch {
      type Params = {
        componentId: string
        dir: 'left' | 'right'
        cur: {
          x: number
          y: number
        }
        def: {
          x: number
          y: number
        }
        status : 'start' | 'end' | 'move'
      }
      type Callback = {
        ( params: Params ): void
      }
    }
    namespace Drag {
      type Params = {
        componentId: string
        cur: {
          x: number
          y: number
        }
        def: {
          x: number
          y: number
        }
        status : 'start' | 'end' | 'move'
      }
      type Callback = {
        ( params: Params ): void
      }
    }
  }
}