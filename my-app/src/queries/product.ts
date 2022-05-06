import { IProduct } from './../types/product';
import { queryFirestore } from 'utils/db';
import { removeAccents } from 'utils/removeAccents';
import QueryData from './query';
import { limit, where } from 'firebase/firestore';

interface IOptions {
  prices: any[];
  brands: any;
}

class ProductService extends QueryData {
  productsList: IProduct[] = [];
  filterList: IProduct[] = [];

  async getAllProducts(id: null | string) {
    await super.fetchData(queryFirestore.propduct).then((res: IProduct[]) => {
      for (const item of res) {
        if (id == null) {
          this.productsList.push(item);
        } else {
          if (item.cateID === id) {
            this.productsList.push(item);
          }
        }
      }
    });
  }

  getProductRelated = async (cateID: string) => {
    let listTmp: IProduct[] = [];
    await super
      .fetchData(queryFirestore.propduct, where('cateID', '==', cateID))
      .then((res: IProduct[]) => {
        listTmp = [...res];
      });

    return listTmp;
  };

  getProductLimit = async () => {
    let listTmp: IProduct[] = [];
    await super.fetchData(queryFirestore.propduct, limit(8)).then((res: IProduct[]) => {
      listTmp = [...res];
    });
    return listTmp;
  };

  compare(a: any, b: any) {
    if (removeAccents(a.name) < removeAccents(b.name)) {
      return -1;
    }
    if (removeAccents(a.name) > removeAccents(b.name)) {
      return 1;
    }
    return 0;
  }

  searchProducts = async (strSearch: string) => {
   
    await this.getAllProducts(null);

    this.productsList = this.productsList.filter((item) =>
    removeAccents(item.name.toLowerCase()).includes(removeAccents(strSearch.toLowerCase()))
    );

    console.log('search', this.productsList)
  };

  async filterProduct(options: IOptions) {
    this.filterList = [...this.productsList];
    for (const [key, value] of Object.entries(options)) {
      if (key === 'prices') {
        console.log('prices', value);
        if (value[1]) {
          this.filterList = this.filterList.filter(
            (x: any) => x.prices >= value[0] && x.prices <= Number(value[1])
          );
        } else {
          this.filterList = this.filterList.filter((x: any) => x.prices >= Number(value[0]));

          console.log(this.filterList);
        }
      }
      if (key === 'brands') {
        value.forEach((id: number) => {
          this.filterList = this.filterList.filter((x: any) => Number(x.brandID) === Number(id));
        });
      }
      if (key === 'sort') {
        if (value === 1) {
          this.filterList = this.filterList.sort(this.compare);
        }
        if (value === 2) {
          this.filterList = this.filterList.sort(this.compare).reverse();
        }
        if (value === 3) {
          this.filterList = this.filterList.sort((a, b) => a.prices - b.prices);
        }
        if (value === 4) {
          this.filterList = this.filterList.sort((a, b) => b.prices - a.prices);
        }
      }
    }

    console.log('ket qua:', this.filterList);
  }

  paginateProducts(curentPage: number, displayItem: number, isFilter: boolean = false) {
    const currentList: any[] = isFilter ? this.filterList : this.productsList;
    console.log('pagination: ', currentList);
    const end = curentPage * displayItem;
    const start = end - displayItem;
    const newList = [];
    const numberPage: any = Math.ceil(currentList.length / displayItem);

    for (const item of currentList.slice(start, end)) {
      newList.push(item);
    }
    return [newList, numberPage];
  }

  async getProductById(id: string) {
    const product = await super.getDataDocById(queryFirestore.userProduct(id));

    return product;
  }
}

export default ProductService;
