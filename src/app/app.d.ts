interface Session {
  userId: number
  userUuid: string
  userLevel: number
}
interface Org {
  id: string
}

declare var appSocket: _WebSocket.Methods;

declare var NFCPortLib: any;


namespace AppTypes {
  type TradeDetailsParams = {
    details: {
      tradeId: number
      tradeUuid: string

      changePrice: number
      totalPrice: number
      totalPriceTax: number
      totalTax: number
      depositTotal: number

      insuranceQuantity: number
      menuQuantity: number

      arriveDate: string
      arriveWeekday: number
      arriveTime: string
      leaveDate: string
      leaveWeekday: number
      leaveTime: string

      customerId: number
      customerUuid: string
      customerName: string
      customerKana: string
    }
    menus: {
      totalPrice: number
      totalPriceTax: number
      totalTax: number
      taxRate: number
      quantity: number
      type: number
      name: string
    }[]
  }
  type VisitDetailsParams = {
    visit: {
      visitId: number
      visitUuid: string
      viaType: number
      visitPhase: number
      preData: string

      lastVisitDate: string
      totalVisitCount: number

      arriveDate: string
      arriveWeekday: number
      arriveTime: string
      leaveDate: string
      leaveWeekday: number
      leaveTime: string

      customerId: number
      customerUuid: string
      customerName: string
      customerKana: string
    }
  }
  type OrderSelectedMenuTypes = {
    type: number // 101=施術商品,102=物販商品,200=コース,201=割引,202=サブスクリプション,203=売掛,400=柔整,401=鍼灸,402=マッサージ,999=カスタム
    typeId: number
    id: string

    name: string
    price: number
    priceType: number
    taxType: number
    treatMinutes: number

    quantity: number
  }
}