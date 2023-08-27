import { useState } from 'react';

import styles from './styles.module.scss';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';
import UserMenu from './UserMenu';

export default function Top({ country }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country?.flag} alt="" />
            <span>{country?.name} / USD</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>

          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {isLoggedIn ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img
                    src="https://media.licdn.com/dms/image/C4D03AQGtjs44ntybbg/profile-displayphoto-shrink_200_200/0/1653895906388?e=1696464000&v=beta&t=xwDynrXVWsh3-lIWXEHvHB2DFuHncHQcL8OH8EdaPZU"
                    alt=""
                  />
                  <span>sami</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu isLoggedIn={isLoggedIn} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
