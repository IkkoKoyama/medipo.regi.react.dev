namespace amotify {
  namespace fn {
    namespace Tables {
      type Methods = {
        Attachment: AttachmentMethods

        Normal: ( props: Normal.Params ) => JSX.Element
        Data: ( props: Data.Params ) => JSX.Element
        Drag: ( props: Drag.Params ) => JSX.Element
        Spread: () => JSX.Element

        getData( tableId: string ): Tables.Data.BodyRowParams[]
      }

      type AttachmentMethods = {
        Table: FNC<TableParams>
        Head: FNC<TableHeadParams>
        Body: FNC<TableBodyParams>
        Row: FNC<TRParams>
        Cell: {
          Head: FNC<TableCellParams>
          Data: FNC<TableCellParams>
        }
        RightIndicator: Uni.CellParams
      }

      type TableParams = amotifyBasicElement & React.TableHTMLAttributes<HTMLTableElement>
      type TableHeadParams = amotifyBasicElement & React.TableHTMLAttributes<HTMLTableSectionElement>
      type TableBodyParams = amotifyBasicElement & React.TableHTMLAttributes<HTMLTableSectionElement>
      type TRParams = amotifyBasicElement & React.HTMLAttributes<HTMLTableRowElement>
      type TableCellParams = amotifyBasicElement & React.ThHTMLAttributes<HTMLTableCellElement>


      type Types = 'normal' | 'data' | 'drag' | 'spread'
      type Tones = 'border' | 'cellBorder' | 'rowBorder' | 'plain' | 'layoutBase'

      type OnRowClick = {
        ( rowIdOrIndex: string | number,event: React.MouseEvent<HTMLTableRowElement,MouseEvent> ): void
      }

      type CellStyleCallbackParams = {
        ( params: {
          cellType: 'th' | 'td'
          type: 'body' | 'head'
          rowIndex: number
          colIndex: number
          end: {
            top: boolean
            left: boolean
            right: boolean
            bottom: boolean
          }
        } ): {
          className?: string
        } & amotifyUniStyleParams
      }

      namespace Uni {
        type CellParams = {
          colSpan?: number
          rowSpan?: number
          children?: ReactElement
          type?: 'th' | 'td'
        } & amotifyBasicElement
        type HeadRowParams = CellParams[]
        type BodyRowParams = Array<CellParams> & ArrayObjectParams

        type ArrayObjectParams = {
          rowId?: string | number
        }

        type Params = {
          tableId?: string
          tone?: Tones
          colLength: number
          cellStyles?: amotifyUniStyleParams
          cellClassName?: string

          cellStyleCallback?: CellStyleCallbackParams

          className?: string
        } & amotifyUniStyleParams
      }

      namespace Normal {
        type CellParams = Uni.BodyRowParams
        type HeadRowParams = Uni.HeadRowParams
        type BodyRowParams = Uni.BodyRowParams

        type Params = Uni.Params & {
          head: HeadRowParams | false
          rows: BodyRowParams[]

          onRowClick?: OnRowClick
        }
      }
      namespace Drag {
        type CellParams = Uni.BodyRowParams
        type HeadRowParams = Uni.HeadRowParams
        type BodyRowParams = Uni.BodyRowParams

        type Params = Uni.Params & {
          head: HeadRowParams | false
          rows: BodyRowParams[]

          onOrderChanged: {
            ( orderList: number[] ): void | number[]
          }
        }
      }

      namespace Data {
        type CellParams = Uni.CellParams & {
          data: string | number
          option?: any
          orderIndex?: string | number
        }
        type HeadRowParams = CellParams[]
        type BodyRowParams = Array<CellParams> & ArrayObjectParams

        type ArrayObjectParams = {
          rowId?: string | number
          searchData?: string
          checked?: boolean
          filtered?: boolean
          currentPage?: boolean
        }

        type Params = Uni.Params & {
          head: HeadRowParams
          rows: BodyRowParams[]
          onRowClick?: OnRowClick
          options?: Options
        }


        type Options = {
          consoleEnabled?: boolean
          eventId?: string

          info?: boolean

          sizeFixed?: boolean

          checkerCell?: boolean

          search?: boolean
          defaultSearchKeyword?: string

          filter?: boolean | boolean[]

          order?: boolean | boolean[]
          defaultOrder?: OrderProps

          paging?: boolean
          rowLengthChange?: boolean
          rowLengthList?: number[]
          defaultRowLength?: number
        }
        type FilterColumnsProps = {
          index: number
          keyword: string
          enabled: boolean
        }[]
        type OrderProps = [ number,'ASC' | 'DESC' ]
      }
      namespace Spread {

      }
    }
  }
}