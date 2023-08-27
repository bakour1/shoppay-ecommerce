import Link from 'next/link';
import Image from 'next/image'; // Import the Image component from next/image
import styles from './styles.module.scss';

const links = [
  {
    heading: 'SHOPPAY',
    links: [
      {
        name: 'About us',
        link: '',
      },
      {
        name: 'Contact us',
        link: '',
      },
      {
        name: 'Social Responsibility',
        link: '',
      },
      // Remove the empty link object
    ],
  },
  {
    heading: 'HELP & SUPPORT',
    links: [
      {
        name: 'Shipping Info',
        link: '',
      },
      {
        name: 'Returns',
        link: '',
      },
      {
        name: 'How To Order',
        link: '',
      },
      {
        name: 'How To Track',
        link: '',
      },
      {
        name: 'Size Guide',
        link: '',
      },
    ],
  },
  {
    heading: 'Customer service',
    links: [
      {
        name: 'Customer service',
        link: '',
      },
      {
        name: 'Terms and Conditions',
        link: '',
      },
      {
        name: 'Consumers (Transactions)',
        link: '',
      },
      {
        name: 'Take our feedback survey',
        link: '',
      },
    ],
  },
];

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((linkGroup, i) => (
        <ul key={i}>
          {i === 0 ? (
            <li>
              <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </li>
          ) : (
            <b>{linkGroup.heading}</b>
          )}
          {linkGroup.links.map((link, j) => (
            <li key={j}>
              {/* Use the Link component without the <a> tag */}
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
