let {
  glob: {
    React
  },
  atoms: {
    FontAwesomeIcon,
    Box,
    Flex,
    Logo
  },
  fn: {
    Layout,
    Buttons,
    Input
  },
  app: {
    logo: {
      icon: AppIcon,
      title: AppTitle
    }
  },
  minifyComponent: {
    UniConsole
  }
} = amotify;


import { OrderEntry } from './Order/page';
import { PaymentComplete } from './complete';


export const OrderRouter = () => {
  return (
    <Layout.PageRouter
      pages={ [
        {
          path: '/order/entry',
          content: <OrderEntry />
        },{
          path: '/order/complete-payment',
          content: <PaymentComplete />
        }
      ] }
    />
  );
}