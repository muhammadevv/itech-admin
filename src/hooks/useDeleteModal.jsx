import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { useDeleteRequest } from './request'
const { confirm } = Modal

function useDeleteModal() {
  const deleteRequest = useDeleteRequest()
  return async (deleteUrl, reload) => (
    confirm({
      title: 'Are you sure delete this Item?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      canclText: 'No',
      async onOk() {
        await deleteRequest.request({ url: deleteUrl })
        reload()
        console.log('ok');
      },
      onCancel() {
      }
    })
  )
}

export default useDeleteModal