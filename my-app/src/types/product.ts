import { Timestamp } from 'firebase/firestore';


export interface IProduct {
    id: string;
    brandID: string;
    cateID: string;
    describe: string;
    imgUrl: Array<string>;
    'income-date': Timestamp;
    isDelete: boolean;
    name: string;
    numSales: number;
    numViews: number;
    prices: number;
    quantity: number
}



