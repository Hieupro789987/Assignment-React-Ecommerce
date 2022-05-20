import { queryFirestore } from 'utils/db';
import QueryData from './query';

class CategoriesService extends QueryData {
  async getCategories() {
    const list: any[] = [];
    await super.fetchData(queryFirestore.categories).then(async (cates) => {
      for (const cate of cates) {
        const temp = { ...cate };
        await super.fetchData(queryFirestore.categoriesChildrens(temp.id)).then((children) => {
          if (children.length <= 0) return;
          Object.assign(temp, { children });
        });
        list.push(temp);
      }
    });
    return list;
  }
}
export default CategoriesService;
