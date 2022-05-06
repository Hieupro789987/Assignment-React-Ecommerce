import SuspenseLoader from 'components/SuspenseLoader';
import { Suspense, lazy } from 'react';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const HomePage = Loader(lazy(() => import('layouts/home')));
const ProductPage = Loader(lazy(() => import('layouts/products')));
const DetailPage = Loader(lazy(() => import('layouts/detail')));
const UserPage = Loader(lazy(() => import('layouts/user')));
const CartPage = Loader(lazy(() => import('layouts/cart')));
const CheckoutPage = Loader(lazy(() => import('layouts/checkout')));
const OrderComp = Loader(lazy(() => import('components/order/orderList')));
const OrderDetail = Loader(lazy(() => import('components/order/orderDetail')));
const Profile = Loader(lazy(() => import('components/user/user_infomation')));

export {
  HomePage,
  ProductPage,
  DetailPage,
  UserPage,
  CartPage,
  CheckoutPage,
  OrderComp,
  Profile,
  OrderDetail
};
