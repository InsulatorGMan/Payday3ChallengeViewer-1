import { AuthModel } from '@renderer/Model/auth.model'
import { AUTH_INFOS, NEBULA_ADDR } from '../globals'
import { getUserInfos } from '../User/User'

export const getStatItems = async (): Promise<false | { data: any }> => {
  const authInfosStr = localStorage.getItem(AUTH_INFOS)
  if (!authInfosStr) return false
  const authInfos = JSON.parse(authInfosStr) as AuthModel

  const userInfos = await getUserInfos()
  if (!userInfos) return false

  const apiCall = await fetch(
    NEBULA_ADDR +
      '/social/v1/public/namespaces/pd3/users/' +
      userInfos.userId +
      '/statitems?limit=100000&offset=0',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authInfos.accessToken
      }
    }
  )
  if (apiCall.status !== 200) return false

  const statItems = await apiCall.json()

  return statItems
}
