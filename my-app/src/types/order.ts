export interface IInformationCheckout {
  username: string;
  phoneNumber: number;
  address: string;
  typeAddress: number;
}

// export interface IOrder {
//   infomation: null | IInformationCheckout;
//   payment:null | number;
//   cart: null | ICartTotal;
//   status: null | number;
// }

export interface IOrder {
  id: string;
  code: string;
  date: string;
  statusID: string;
  userID: string;
  totalPrices: number;
  totalAmounts: number;
  address: string;
  username: string;
  phoneNumber: string;
  payment: string;
}

export interface IOrderDetials {
  id: string;
  username: string;
  address: string;
  paymentMethod: string;
  phoneNumber: number;
  totalAmounts: number;
  totalPrices: number;
}

export interface IProductInOrder {
  prices: number;
  productID: string;
  imgUrl: string;
  name: string;
  quanity: number;
  totalPrices: number;
}

export interface IOrderStatus {
  id: string;
  name: string;
}

export interface IOrderOverview {
  order: IOrder;
  orderDetail: IOrderDetials;
  product: IProductInOrder[];
}
