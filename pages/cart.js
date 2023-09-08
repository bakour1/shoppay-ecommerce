/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../components/cart/empty';
import Header from '../components/cart/header';
import styles from '../styles/cart.module.scss';
import Product from '../components/cart/product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CartHeader from '@/components/cart/cartHeader';
import Checkout from '@/components/cart/checkout';

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
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
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
            <Checkout
              subtotal="5455"
              shippingFee=""
              total="5455"
              selected={[]}
              // saveCartToDbHandler={saveCartToDbHandler}
            />
            {/* <PaymentMethods /> */}
          </div>
        ) : (
          <Empty />
        )}
        {/* <ProductsSwiper products={women_swiper} /> */}
      </div>
    </>
  );
}
