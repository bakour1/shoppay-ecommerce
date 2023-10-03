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
import BrandsFilter from '../components/browse/brandsFilter';
import StylesFilter from '../components/browse/stylesFilter';
import PatternsFilter from '../components/browse/patternsFilter';
import MaterialsFilter from '../components/browse/materialsFilter';
import GenderFilter from '../components/browse/genderFilter';
import HeadingFilters from '../components/browse/headingFilters';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Browse({
  categories,
  subCategories,
  products,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials,
  country,
}) {
  const router = useRouter();
  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    gender,
    price,
    shipping,
    rating,
    sort,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    if (pattern) query.pattern = pattern;
    if (material) query.material = material;
    if (gender) query.gender = gender;
    if (price) query.price = price;
    if (shipping) query.shipping = shipping;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    // if (page) query.page = page;
    router.push({
      pathname: path,
      query: query,
    });
  };
  const searchHandler = (search) => {
    if (search == '') {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };
  const categoryHandler = (category) => {};
  const brandHandler = (brand) => {};
  const styleHandler = (style) => {};
  const sizeHandler = (size) => {};
  const colorHandler = (color) => {};
  const patternHandler = (pattern) => {};
  const materialHandler = (material) => {};
  const genderHandler = (gender) => {};
  const priceHandler = (price, type) => {};
  const multiPriceHandler = (min, max) => {};
  const shippingHandler = (shipping) => {};
  const ratingHandler = (rating) => {};
  const sortHandler = (sort) => {};

  function replaceQuery(queryName, value) {}
  const [scrollY, setScrollY] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <div className={styles.browse}>
      <div>
        <Header searchHandler={searchHandler} country={country} />
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
            <BrandsFilter
              brands={brands}
              brandHandler={brandHandler}
              replaceQuery={replaceQuery}
            />
            <StylesFilter
              data={stylesData}
              styleHandler={styleHandler}
              replaceQuery={replaceQuery}
            />
            <PatternsFilter
              patterns={patterns}
              patternHandler={patternHandler}
              replaceQuery={replaceQuery}
            />
            <MaterialsFilter
              materials={materials}
              materialHandler={materialHandler}
              replaceQuery={replaceQuery}
            />
            <GenderFilter
              genderHandler={genderHandler}
              replaceQuery={replaceQuery}
            />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilters
              priceHandler={priceHandler}
              multiPriceHandler={multiPriceHandler}
              shippingHandler={shippingHandler}
              ratingHandler={ratingHandler}
              replaceQuery={replaceQuery}
              sortHandler={sortHandler}
            />
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
  //-------------------------------------------------->
  const searchQuery = query.search || '';

  //-------------------------------------------------->
  const search =
    searchQuery && searchQuery !== ''
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  //-------------------------------------------------->

  db.connectDb();
  let productsDb = await Product.find({
    ...search,
  })
    .sort({ createdAt: -1 })
    .lean();

  // let productsDb = await Product.find({
  //   name: {
  //     $regex: searchQuery,
  //     $options: 'i',
  //   },
  // })
  //   .sort({ createdAt: -1 })
  //   .lean();

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
