import Image from 'next/image';
// import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Header from '@/components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import { useSession } from 'next-auth/react';
// const inter = Inter({ subsets: ['latin'] });

export default function Home({ country }) {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <Header country={country} />

      <Footer country={country} />
    </div>
  );
}
// https://api.ipregistry.co/45.221.5.34?key=rz7idv6zukxd8pk0

export async function getServerSideProps() {
  let data = await axios
    .get('https://api.ipregistry.co/45.221.5.34?key=rz7idv6zukxd8pk0')
    .then((result) => {
      return result.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      //country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: 'Morocco',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
      },
    },
  };
}
