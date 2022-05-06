import { where } from 'firebase/firestore';
import { IOrder, IProductInOrder } from 'types/order';
import { queryFirestore } from 'utils/db';
import QueryData from './query';

class OrderService extends QueryData {
  getOrder = async (userID: string) => {
    const orderList: IOrder[] = [];
    await super
      .fetchData(queryFirestore.order, where('userID', '==', userID))
      .then((items: IOrder[]) => {
        for (const item of items) {
          orderList.push(item);
        }
      });

    return orderList;
  };

  getOrderByID = async (orderID: string) => {
    let order: IOrder = {
      id:"",
      code:"",
      date:"",
      statusID:"",
      userID:"",
      totalPrices: 0,
      totalAmounts: 0,
      address:"",
      username:"",
      phoneNumber:"",
    };
    let product_item_order: IProductInOrder[] = [];
    await super.getDataDocById(queryFirestore.docOrder(orderID)).then(async (res: IOrder) => {
      order = { ...res };

      await super.fetchData(queryFirestore.docOrderProduct(res.id)).then(async (prod) => {
        product_item_order = [...prod];
      });
    });

    return { order, product_item_order };
  };

  addOrder = async (orderData: IOrder, orderProduct: IProductInOrder[]) => {
    try {
      await super.addDataDoc(orderData, queryFirestore.docOrder(orderData.id));

      orderProduct.forEach((prod: IProductInOrder) => {
        super.addDataCollection(prod, queryFirestore.docOrderProduct(orderData.id));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default OrderService;
