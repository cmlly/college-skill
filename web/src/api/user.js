import request from '@/utils/request'

const api = {
  list: '/api/user/userList'
}

export function fetchUserList (data) {
  return request({
    url: api.list,
    method: 'post',
    data
  })
}
