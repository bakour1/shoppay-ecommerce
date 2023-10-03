/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';

export default function BrandsFilter({ brands, brandHandler }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedBrand = router.query.brand || '';
  return (
    <div className={styles.filter}>
      <h3>
        Brands <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            return (
              <button
                className={`${styles.filter__brand}`}
                key={i}
                onClick={() => {
                  brandHandler(
                    existedBrand ? `${existedBrand}_${brand}` : brand,
                  );
                }}
              >
                <img src={`../../../images/brands/${brand}.png`} alt="" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}