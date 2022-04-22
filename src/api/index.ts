import request from '@/utils/request';
import { ADD_TEXT, TEXT_LIST, TEXT_DETAILS } from './url';

// 发表文章
export function addTextApi(data) {
  return request({
    method: 'post',
    url: ADD_TEXT,
    data
  });
}

// 根据文章类别查询文章
export function getTextList(params) {
  return request({
    method: 'get',
    url: TEXT_LIST,
    params
  });
}
// 根据id查询文章
export function getTextDetails(params) {
  return request({
    method: 'get',
    url: TEXT_DETAILS,
    params
  });
}
