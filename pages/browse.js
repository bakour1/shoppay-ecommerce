import styles from '../styles/browse.module.scss';
import db from '../utils/db';
import Product from '../models/Product';
import Category from '../models/Category';
import Header from '../components/header';
import SubCategory from '../models/SubCategory';
import {
  filterArray,
  randomize,
  removeDuplicates,
} from '../utils/arrays_utils';
import Link from 'next/link';
import ProductCard from '@/components/productCard';
import CategoryFilter from '../components/browse/categoryFilter';
import SizesFilter from '../components/browse/sizesFilter';
import ColorsFilter from '../components/browse/colorsFilter';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Browse({
  categories,
  subCategories,
  products,
  sizes,
  colors,
  country,
}) {
  const router = useRouter();
  const categoryHandler = (category) => {};
  const sizeHandler = (size) => {};
  const colorHandler = (color) => {};
  function replaceQuery(queryName, value) {}
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);
  return (
    <div className={styles.browse}>
      <div>
        <Header country={country} />
      </div>
      <div className={styles.browse__container}>
        <div>
          <div className={styles.browse__path}>Home / Browse</div>
          <div className={styles.browse__tags}>
            {categories.map((c) => (
              <Link href="" key={c._id}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={`${styles.browse__store} ${
            scrollY >= height ? 'styles.fixed' : ''
          }`}
        >
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar}`}
          >
            <button
              className={styles.browse__clearBtn}
              onClick={() => router.push('/browse')}
            >
              Clear All ({Object.keys(router.query).length})
            </button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
              categoryHandler={categoryHandler}
              replaceQuery={replaceQuery}
            />
            <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />
            <ColorsFilter
              colors={colors}
              colorHandler={colorHandler}
              replaceQuery={replaceQuery}
            />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
            <div className={styles.pagination}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(productsDb)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
      country: {
        name: 'Morocco',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
      },
    },
  };
}
