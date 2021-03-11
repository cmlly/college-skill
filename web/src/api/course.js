import request from '@/utils/request'

const api = {
  classify: '/api/course/classify',
  create: '/api/course/create',
  list: '/api/course/list',
  detail: '/api/course/detail',
  edit: '/api/course/edit',
  delete: '/api/course/delete'
}

export function fetchCourseClassify (data) {
  return request({
    url: api.classify,
    method: 'post',
    data
  })
}

export function fetchCreateCourse (data) {
  return request({
    url: api.create,
    method: 'post',
    data
  })
}

export function fetchCourseList (data) {
  return request({
    url: api.list,
    method: 'post',
    data
  })
}

export function fetchCourseDetail (data) {
  return request({
    url: api.detail,
    method: 'post',
    data
  })
}

export function fetchEditCourse (data) {
  return request({
    url: api.edit,
    method: 'post',
    data
  })
}

export function fetchDeleteCourse (data) {
  return request({
    url: api.delete,
    method: 'post',
    data
  })
}
