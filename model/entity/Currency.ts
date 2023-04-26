export class Currency {
  readonly currencySign: string // 货币符号，例如：CNY
  readonly currencyName: string // 货币名称
  readonly currencyCountry: string // 货币国家
  currencyFlagUrl?: string // 旗帜，这里表示图片存储地址

  constructor(currencySign: string, currencyName: string, currencyCountry: string) {
    this.currencySign = currencySign
    this.currencyName = currencyName
    this.currencyCountry = currencyCountry
  }
}