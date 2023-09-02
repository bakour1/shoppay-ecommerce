import Menu from './menu';
import Offers from './offers';
import styles from './styles.module.scss';
import MainSwiper from './swiper';
import User from './user';
// import { useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { IoSettingsOutline } from 'react-icons/io5';
// import { HiOutlineClipboardList } from 'react-icons/hi';
// import { AiOutlineMessage } from 'react-icons/ai';
// import { BsHeart } from 'react-icons/bs';
// //-----------------------------
// import { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-cards';

// // import required modules
// import { EffectCards, Navigation } from 'swiper';
// import Header from './Header';

export default function Main() {
  //   const { data: session } = useSession();
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <Menu />

      <MainSwiper />

      <Offers />
      <User />
    </div>
  );
}
