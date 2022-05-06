import BasicTabs from 'components/Tab';
import OrderService from 'queries/order';
import React from 'react';
import { useAppSelector } from 'stores/hooks';
import { IOrder } from 'types/order';
import OrderItem from './orderItem';


const OrderTabs = () => {
  const user = useAppSelector((state) => state.user);
  const [order, setOrder] = React.useState<IOrder[]>([]);

  React.useEffect(() => {
    async function getOrder() {
      const order = new OrderService();
      await order.getOrder(user.uid).then((res) => {
        setOrder(res);
      });
    }

    getOrder();
  }, [user.uid]);

  return (
    <>
      {order.length > 0 && (
        <BasicTabs
          titles={[
            'Tất cả đơn',
            'Chờ thanh toán',
            'Đang xử lý',
            'Đang vận chuyển',
            'Đã giao',
            'Đã hủy',
          ]}
        >
          {order.map((item) => (
            <OrderItem key={item.id} prod={item} />
          ))}
        </BasicTabs>
      )}
    </>
  );
};

export default OrderTabs;
