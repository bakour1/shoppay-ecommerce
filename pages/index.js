import Image from 'next/image';
// import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Main from '@/components/home/main';
import FlashDeals from '@/components/home/flashDeals';
import Category from '@/components/home/category';
import {
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from '@/data/home';
// const inter = Inter({ subsets: ['latin'] });
import { useMediaQuery } from 'react-responsive';
import ProductsSwiper from '@/components/productsSwiper';

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);
  const isMedium = useMediaQuery({ query: '(max-width:850px)' });
  const isMobile = useMediaQuery({ query: '(max-width:550px)' });

  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}
// https://api.ipregistry.co/45.221.5.34?key=rz7idv6zukxd8pk0

export async function getServerSideProps() {
  let data = await axios
    .get('https://api.ipregistry.co/45.221.5.34?key=rz7idv6zukxd8pk0')
    .then((result) => {
      return result.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      //country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: 'Morocco',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
      },
    },
  };
}
