import { Link } from "react-router-dom";
import { HomeOutlined, ProductOutlined, MenuOutlined, AppstoreOutlined, BorderOutlined } from '@ant-design/icons';
export const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to={'/'} >Dashboard</Link>,
  },
  {
    key: '/products',
    icon: <ProductOutlined />,
    label: <Link to={'/products'} >Products</Link>,
  },
  {
    key: '/categories',
    icon: <MenuOutlined />,
    label: <Link to={'/categories'} >Categories</Link>,
  },
  {
    key: '/brands',
    icon: <AppstoreOutlined />,
    label: <Link to={'/brands'} >Brands</Link>,
  },
  {
    key: '/banner',
    icon: <BorderOutlined />,
    label: <Link to={'/banner'}>Banner</Link>
  },
  {
    key: '/orders',
    icon: <BorderOutlined />,
    label: <Link to={'/orders'}>Orders</Link>
  }
]