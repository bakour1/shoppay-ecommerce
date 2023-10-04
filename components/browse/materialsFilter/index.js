import { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import styles from '../styles.module.scss';
import { useRouter } from 'next/router';
export default function MaterialsFilter({ materials, materialHandler }) {
  const router = useRouter();
  const existedMaterials = router.query.material || '';
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Material <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {materials.map((material, i) => {
            return (
              <dev
                key={i}
                htmlFor={material}
                className={styles.filter__sizes_size}
                onClick={() =>
                  materialHandler(
                    existedMaterials
                      ? `${existedMaterials}_${material}`
                      : material,
                  )
                }
              >
                <input type="checkbox" name="material" id={material} />
                <label htmlFor={material}>
                  {material.length > 12
                    ? `${material.substring(0, 12)}...`
                    : material}
                </label>
              </dev>
            );
          })}
        </div>
      )}
    </div>
  );
}
