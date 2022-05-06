export interface ICartProduct {
  id: string;
  imgUrl: string;
  name: string;
  describe: string;
  prices: number;
  totalPrices: number;
  amounts: number;
}

export interface ICartTotal {
  cart: Array<ICartProduct>;
  count: number;
  totalPrices: number;
  totalAmounts: number;
}
