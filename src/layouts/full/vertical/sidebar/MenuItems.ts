import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  // {
  //   navlabel: true,
  //   subheader: 'Personal',
  // },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: 'layers-minimalistic-line-duotone',
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Noti',
    icon: 'screencast-2-linear',
    href: '/noti/list',
  },
  {
    id: uniqueId(),
    title: 'Profile',
    icon: 'atom-linear',
    href: '/form-layouts',

  },
  // {
  //   id: uniqueId(),
  //   title: 'Analytical',
  //   icon: 'box-minimalistic-linear',
  //   href: 'https://materialpro-react-main.netlify.app/dashboards/analytical',
  //   chip: "Pro",
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Campaign',
  //   icon: 'buildings-2-linear',
  //   href: 'https://materialpro-react-main.netlify.app/dashboards/campaign',
  //   chip: "Pro",
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Modern',
  //   icon: 'basketball-linear',
  //   href: 'https://materialpro-react-main.netlify.app/dashboards/modern',
  //   chip: "Pro",
  // },
  // {
  //   id: uniqueId(),
  //   title: 'eCommerce',
  //   icon: 'cart-large-2-linear',
  //   href: 'https://materialpro-react-main.netlify.app/dashboards/ecommerce',
  //   chip: "Pro",
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Front pages',
  //   icon: 'home-angle-linear',
  //   href: 'https://materialpro-react-main.netlify.app/frontend-pages/',
  //   chip: "Pro",
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Homepage',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/homepage',
  //       chip: "Pro",
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'About Us',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/about',
  //       chip: "Pro",
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Blog',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/blog',
  //       chip: "Pro",
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Blog Details',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
  //       chip: "Pro",
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Contact',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/contact',
  //       chip: "Pro",
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Portfolio',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/portfolio',
  //       chip: "Pro",
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Pricing',
  //       icon: 'stop-circle-line-duotone',
  //       href: 'https://materialpro-react-main.netlify.app/frontend-pages/pricing',
  //       chip: "Pro",
  //     },
  //   ],
  // },
];

export default Menuitems;
