import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';
import styleFunctionSx from '@mui/system/styleFunctionSx';
export default function StyleFilter({ data, styleHandler }) {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const existedStyle = router.query.style || '';
  return (
    <div className={styles.filter}>
      <h3>
        Style <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {data.map((style, i) => {
            return (
              <div
                key={i}
                className={styles.filter__sizes_size}
                onClick={() =>
                  styleHandler(
                    existedStyle ? `${existedStyle}_${styleFunctionSx}` : style,
                  )
                }
              >
                <input type="checkbox" name="style" id={style} />
                <label htmlFor={style}>{style}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
