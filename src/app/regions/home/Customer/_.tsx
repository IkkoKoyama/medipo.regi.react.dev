import { CustomerList } from './List/page';
import { CustomeCreate } from './Create/page';
import { CustomeObj } from './Obj/page';


const {
  atoms: {
    Flex,
  },
  fn: {
    Layout,
    Input,
    Buttons,
    Modal
  }
} = amotify;

export const CustomerRouter = () => (
  <Layout.PageRouter
    pages={ [
      {
        path: '/customer/list',
        content: <CustomerList />
      },{
        path: '/customer/create',
        content: <CustomeCreate />
      },{
        path: '/customer/obj',
        content: <CustomeObj />
      },
    ] }
  />
);