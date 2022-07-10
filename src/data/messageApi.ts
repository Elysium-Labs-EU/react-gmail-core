import { AxiosResponse } from 'axios'
import { errorHandling, fetchToken, instance } from './api'

const messageApi = () => ({
  getMessageDetail: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/message/${messageId}`
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },

  getAttachment: async ({
    messageId,
    attachmentId,
  }: {
    messageId: string
    attachmentId: string
  }) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/message/attachment/${messageId}/${attachmentId}`,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  sendMessage: async (data: any) => {
    try {
      const res: AxiosResponse<any> = await instance.post(
        `/api/send-message`,
        data,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateMessage: async (props: any) => {
    console.log(props)
    const { messageId, request } = props
    try {
      const res: AxiosResponse<any> = await instance.patch(
        `/api/message/${messageId}`,
        request,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  thrashMessage: async ({ messageId }: { messageId: string }) => {
    const data = {}
    try {
      const res: AxiosResponse<any> = await instance.post(
        `/api/message/thrash/${messageId}`,
        data,
        {
          headers: {
            Authorization: fetchToken(),
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  // unThrashMessage: (messageId) => {
  //   console.log('trashed')
  //   return axios
  //     .post(`/api/message/thrash/${messageId}`)
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err))
  // },
  deleteMessage: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.delete(`/api/message/`, {
        data: { id: messageId },
        headers: {
          Authorization: fetchToken(),
        },
      })
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default messageApi
