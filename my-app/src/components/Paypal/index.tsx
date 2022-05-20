import { async } from '@firebase/util';
import { Box } from '@mui/material';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useEffect, useRef } from 'react';
import { useAppSelector } from 'stores/hooks';

const Paypal: React.FC<any> = ({ func }) => {
  const { totalPrices } = useAppSelector((state) => state.cart);
  const handleSuccess = () => {
    func(true);
  };
  return (
    <PayPalButtons
      style={{ color: 'silver', layout: 'horizontal', height: 48, tagline: false, shape: 'pill' }}
      createOrder={(data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'Thanh toán sản phẩm',
              amount: {
                value: (totalPrices / 23000).toFixed(2),
              },
            },
          ],
        });
      }}
      onApprove={async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log(order);

        handleSuccess();
      }}
      onError={(err: any) => {
        console.log(err);
      }}
    />
  );
};

export default Paypal;
