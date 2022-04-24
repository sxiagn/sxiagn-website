import request from '../utils/request';
import { ADD_TEXT, TEXT_LIST, TEXT_DETAILS, FEED_BACK } from './url';

// 发表文章
interface AddText {
  textType: string | number;
  title: string;
  contentDesc: string;
  // createTime: number;
}
export function addTextApi(data: AddText) {
  return request({
    method: 'post',
    url: ADD_TEXT,
    data
  });
}

// 根据文章类别查询文章
interface TextList {
  textType: string | number;
}
export function getTextList(params: TextList) {
  return request({
    method: 'get',
    url: TEXT_LIST,
    params
  });
}
// 根据id查询文章
interface TextDetails {
  id: string | number;
}
export function getTextDetails(params: TextDetails) {
  return request({
    method: 'get',
    url: TEXT_DETAILS,
    params
  });
}
// 根据id查询文章
interface FeedBack {
  problemDesc: string;
  createTime: number;
  isFinish: boolean;
}
export function problemFeedBack(data: FeedBack) {
  return request({
    method: 'post',
    url: FEED_BACK,
    data
  });
}
