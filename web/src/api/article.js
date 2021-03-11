import request from '@/utils/request'

const api = {
  classify: '/api/article/classify',
  create: '/api/article/create',
  list: '/api/article/list',
  detail: '/api/article/detail',
  edit: '/api/article/edit',
  delete: '/api/article/delete'
}

export function fetchArticleClassify (data) {
  return request({
    url: api.classify,
    method: 'post',
    data
  })
}

export function fetchCreateArticle (data) {
  return request({
    url: api.create,
    method: 'post',
    data
  })
}

export function fetchArticleList (data) {
  return request({
    url: api.list,
    method: 'post',
    data
  })
}

export function fetchArticleDetail (data) {
  return request({
    url: api.detail,
    method: 'post',
    data
  })
}

export function fetchEditArticle (data) {
  return request({
    url: api.edit,
    method: 'post',
    data
  })
}

export function fetchDeleteArticle (data) {
  return request({
    url: api.delete,
    method: 'post',
    data
  })
}
