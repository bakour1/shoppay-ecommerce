/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../components/cart/empty';
import Header from '../components/cart/header';
import styles from '../styles/cart.module.scss';
import Product from '../components/cart/product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
