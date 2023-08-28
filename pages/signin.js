import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/signin.module.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';

export default function signin() {
  const country = {
    name: 'Morocco',
    flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
  };
  return (
    <>
      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We`d be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik>
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <LoginInput icon="email" placeholder="Email Address" />
                  <LoginInput icon="password" placeholder="Password" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="Morocco" />
    </>
  );
}
