import { queryFirestore } from 'utils/db';
import QueryData from './query';

class BrandsService extends QueryData {
  brandList: any[] = [];

  async getAllBrands() {
    await super.fetchData(queryFirestore.brands).then((res) => {
      for (const doc of res) {
        const temp = doc;
        this.brandList.push(temp);
      }
    });
    return this.brandList;
  }

  getBrandByID = async (brandID: string) => {
    const brand = await super.getDataDocById(queryFirestore.userbrands(brandID));
    return brand;
  };
}
export default BrandsService;
