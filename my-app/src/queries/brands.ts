import { queryFirestore } from 'utils/db';
import QueryData from './query';

class BrandsService extends QueryData {
 
  async getAllBrands() {
    let list: any[] = [];
    await super.fetchData(queryFirestore.brands).then((res) => {
      for (const doc of res) {
        const temp = doc;
        list.push(temp);
      }
    });
    return list;
  }

  getBrandByID = async (brandID: string) => {
    const brand = await super.getDataDocById(queryFirestore.userbrands(brandID));
    return brand;
  };
}
export default BrandsService;
