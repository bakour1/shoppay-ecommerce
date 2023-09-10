/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import styles from '../styles/checkout.module.scss';
import { getSession } from 'next-auth/react';
import db from '../utils/db';
import User from '@/models/User';
import Cart from '@/models/Cart';
import Header from '../components/cart/header';
import Shipping from '../components/checkout/shipping';

export default function checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        </div>
        <div className={styles.checkout__side}></div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);
  const user = await User.findById(session.user.id);
  if (!user) {
    return {
      redirect: {
        destination: '/signin',
      },
    };
  }
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: '/cart',
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
