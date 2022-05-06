interface IData {
  id: number;
  value: number[];
  label: string;
}
export const rangePriceData: IData[] = [
  {
    id: 0,
    value: [],
    label: 'Tất cả',
  },

  {
    id: 1,
    value: [0, 3000000],
    label: 'Dưới 3 triệu',
  },
  {
    id: 2,
    value: [3000000, 8000000],
    label: 'Từ 3 - 8 triệu',
  },
  {
    id: 3,
    value: [8000000, 15000000],
    label: 'Từ 8 - 15 triệu',
  },
  {
    id: 4,
    value: [15000000],
    label: 'Trên 15 triệu',
  },
];
