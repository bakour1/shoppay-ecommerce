import Link from 'next/link';
import styles from './styles.module.scss';
import { RiSearch2Line } from 'react-icons/ri';
import { FaOpencart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

// import { useState } from "react";
// import { useRouter } from "next/router";

export default function Main({ searchHandler }) {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <span className={styles.logo}>
            <img src="../../../logo.png" alt="" />
          </span>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </div>
        <Link href="/cart">
          <div className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
