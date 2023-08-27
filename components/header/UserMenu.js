import Link from 'next/link';
import styles from './styles.module.scss';

export default function UserMenu({ isLoggedIn }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shoppay !</h4>
      {isLoggedIn ? (
        <div className={styles.flex}>
          <img
            src="https://media.licdn.com/dms/image/C4D03AQGtjs44ntybbg/profile-displayphoto-shrink_200_200/0/1653895906388?e=1696464000&v=beta&t=xwDynrXVWsh3-lIWXEHvHB2DFuHncHQcL8OH8EdaPZU"
            alt=""
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>sami</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button>Register</button>
          <button>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/whishlist">Whishlist</Link>
        </li>
      </ul>
    </div>
  );
}
