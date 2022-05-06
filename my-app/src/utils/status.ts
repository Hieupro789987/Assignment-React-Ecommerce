export const statusName = (statusID: string) => {
  switch (statusID) {
    case '1':
      return 'Chờ thanh toán';

    case '2':
      return 'Đang xử lý';
    case '3':
      return 'Đang giao hàng';
    case '4':
      return 'Đã giao hàng';
    case '5':
      return 'Hủy đơn hàng';
    default:
  }
};
