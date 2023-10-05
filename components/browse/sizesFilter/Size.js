import styles from '../styles.module.scss';

export default function Size({ size, active }) {
  return (
    <label htmlFor={size} className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} checked={active} />
      <label htmlFor={size}>{size}</label>
    </label>
  );
}
