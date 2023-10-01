import styles from '../styles/browse.module.scss';
import db from '../utils/db';
import Product from '../models/Product';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import {
  filterArray,
  randomize,
  removeDuplicates,
} from '../utils/arrays_utils';

export default function Browse({}) {}

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  db.connectDb();
  let productsDb = await Product.find().sort({ createdAt: -1 }).lean();
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: 'parent',
      model: Category,
    })
    .lean();
  let colors = await Product.find().distinct('subProducts.color.color');
  let brandsDb = await Product.find().distinct('brand');
  let sizes = await Product.find().distinct('subProducts.sizes.size');
  let details = await Product.find().distinct('details');

  let stylesDb = filterArray(details, 'Style');
  let patternsDb = filterArray(details, 'Pattern Type');
  let materialsDb = filterArray(details, 'Material');
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);
  console.log('randomize', randomize(styles));
  return {
    props: {},
  };
}
