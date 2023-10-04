import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';

export default function PatternsFilter({ patterns, patternHandler }) {
  const router = useRouter();
  const existedPattern = router.query.pattern || '';
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Pattern <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {patterns.map((pattern, i) => {
            return (
              <dev
                key={i}
                htmlFor={pattern}
                className={styles.filter__sizes_size}
                onClick={() =>
                  patternHandler(
                    existedPattern ? `${existedPattern}_${pattern}` : pattern,
                  )
                }
              >
                <input type="checkbox" name="pattern" id={pattern} />
                <label htmlFor={pattern}>
                  {pattern.length > 12
                    ? `${pattern.substring(0, 12)}...`
                    : pattern}
                </label>
              </dev>
            );
          })}
        </div>
      )}
    </div>
  );
}
