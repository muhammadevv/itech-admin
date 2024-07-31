import { Button, Card, Col, Row, Skeleton, Table, Typography } from 'antd'
import { EyeOutlined, } from '@ant-design/icons';
import { useLoad } from '../../hooks/request'
import { bannerList, brandsList, categoriesList, ordersList, productsList, usersList } from '../../constants/urls'

function Dashboard() {
  const { response: products, loading: productLoading, } = useLoad({ url: productsList })
  const { response: banner, loading: bannerLoading, } = useLoad({ url: bannerList })
  const { response: categories, loading: categoriesLoading, } = useLoad({ url: categoriesList })
  const { response: brands, loading: brandsLoading, } = useLoad({ url: brandsList })
  const { response: orders, loading: ordersLoading, } = useLoad({ url: ordersList })
  const { response: users, loading: usersLoading, } = useLoad({ url: usersList })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'User name',
      dataIndex: 'fullname',
    },
    {
      title: 'User address',
      dataIndex: 'address',
    },
    {
      title: 'Product title',
      dataIndex: 'product',
      render: (product) => <span>{product?.title}</span>
    },
    {
      title: 'Product prices',
      dataIndex: 'product',
      render: (products) => <span>{products?.price} UZS</span>
    },
    // {
    //   title: 'Actions',
    //   render: (item) => (
    //     <Button icon={<EyeOutlined />} onClick={() => handleView(item)} />
    //   )
    // },
  ]

  const content = [
    {
      id: 1,
      title: 'Total products',
      loading: productLoading,
      value: products?.length
    },
    {
      id: 2,
      title: 'Total categories',
      loading: categoriesLoading,
      value: categories?.length
    },
    {
      id: 3,
      title: 'Total brands',
      loading: brandsLoading,
      value: brands?.length
    },
    {
      id: 4,
      title: 'Total banner',
      loading: bannerLoading,
      value: banner?.length
    },
    {
      id: 5,
      title: 'Total orders',
      loading: ordersLoading,
      value: orders?.length
    },
    {
      id: 6,
      title: 'Total prices',
      loading: ordersLoading,
      value: orders?.reduce((a, b) => a + b?.product?.price, 0)?.toLocaleString() + ' UZS'
    },
    {
      id: 7,
      title: 'Total users',
      loading: usersLoading,
      value: users?.length
    },
  ]
  return (
    <div>
      <Typography.Title>Dashboard</Typography.Title>
      <Row gutter={[12, 12]} style={{}}>
        {content.map(({ id, title, loading, value }) => (
          <Col span={6} key={id}>
            <Card>
              <Typography.Title level={3}>{title}</Typography.Title>
              <Skeleton active paragraph={false} loading={loading}>
                <Typography.Paragraph style={{ fontSize: 18 }}>{value}</Typography.Paragraph>
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
      <Card title="Latest orders" style={{ marginTop: 24 }}>
        <Table pagination={false} dataSource={orders?.slice(0, 8)} columns={columns} loading={ordersLoading} rowKey='id' ></Table>
      </Card>

    </div>
  )
}

export default Dashboard