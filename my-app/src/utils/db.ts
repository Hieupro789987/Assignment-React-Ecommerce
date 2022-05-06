import { IProduct } from 'types/product';
import { IOrder, IOrderDetials, IProductInOrder } from 'types/order';
import { collection, doc, DocumentSnapshot } from 'firebase/firestore';
import { DB } from './firebase-connect';

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: DocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string, ...docPath: string[]) =>
  collection(DB, collectionPath, ...docPath).withConverter(converter<T>());

const docPoint = <T>(type: string, ...docPath: string[]) =>
  doc(DB, type, ...docPath).withConverter(converter<T>());

const queryFirestore = {
  propduct: dataPoint<IProduct>('products'),
  userProduct: (pathID: string) => docPoint<any>('products', pathID),
  brands: dataPoint<any>('brands'),
  userbrands: (id: string) => docPoint<any>('brands', id),
  categories: dataPoint<any>('categories'),
  categoriesChildrens: (id: string) => dataPoint<any>(`categories/${id}/childrens`),

  order: dataPoint<IOrder>('order'),

  docOrder: (id: string) => docPoint<IOrder>('order', id),

  docOrderProduct: (id: string) => dataPoint<IProductInOrder>('order', `${id}/product_item`),

  docOrderStatus: (id: string) => docPoint<IOrderDetials>('order', id),

  docUser: (id: string) => docPoint<any>('users', id),
};

export { queryFirestore };
