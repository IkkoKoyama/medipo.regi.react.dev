interface HTMLElement {
  [ index: string ]: string
  style: {
    [ index: string ]: string
  }
  position(): DOMRect
}
interface Number {
  zeroEmbed( digit: number ): string
  ratio( base: number,floatings?: number ): number
  rate( base: number,floatings?: number ): number
  rank( floatings?: number ): string
  rankJp(): string
  toDate( separate?: string ): string
}
interface String {
  compress(): string
  encode(): string
  decode(): string
  toLower(): string
  toUpper(): string
  toCapital(): string
  clip( from: number,to?: number ): string
  partReplace( begin: number,string: string ): string
  toBlob( mimeType: base64ToBlobTypeProps ): Blob | false
  toNumber(): number
}

namespace Array {
  type OrderProps = {
    direction: 'ASC' | 'DESC',
    keys?: ( string | number )[],
    numeral?: boolean
  }
}
interface Array {
  order: {
    ( props: Array.OrderProps ): Array<T>
  }
}

interface File {
  read(): Promise<ProgressEvent<FileReader>>
  toDataUrl(): Promise<string>
}