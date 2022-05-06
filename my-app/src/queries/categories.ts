import { queryFirestore } from 'utils/db';
import QueryData from './query';

class CategoriesService extends QueryData {
  categoriesList: any[] = [];
  categories: any = {};

  async getCategories() {
    await super.fetchData(queryFirestore.categories).then(async (cates) => {
      for (const cate of cates) {
        const temp = {...cate};
        await super.fetchData(queryFirestore.categoriesChildrens(temp.id)).then( (children) => {
          if (children.length <= 0)  return;
           Object.assign(temp, {children});
        });
        this.categoriesList.push(temp);
      }
    });
    return this.categoriesList;
  }
}
export default CategoriesService;
