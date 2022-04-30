import request from '../utils/request';
import {
  ADD_ARTICLE,
  ARTICLE_LIST,
  ARTICLE_DETAILS,
  FEED_BACK,
  ARTICLE_LOGIN,
  ARTICLE_DELETE,
  ARTICLE_ALL_LIST
} from './url';

// 发表文章
interface Addarticle {
  textType: string | number;
  title: string;
  contentDesc: string;
  // createTime: number;
}
export function AddarticleApi(data: Addarticle) {
  return request({
    method: 'post',
    url: ADD_ARTICLE,
    data
  });
}

// 获取所有文章
export function getAllArticleList() {
  return request({
    method: 'get',
    url: ARTICLE_ALL_LIST
  });
}

// 根据文章类别查询文章列表
interface ArticleList {
  textType: string | number;
}
export function getArticleList(params: ArticleList) {
  return request({
    method: 'get',
    url: ARTICLE_LIST,
    params
  });
}

// 根据id查询某篇文章
interface ArticleDetails {
  id: string | number;
}
export function getArticleDetails(params: ArticleDetails) {
  return request({
    method: 'get',
    url: ARTICLE_DETAILS,
    params
  });
}

// 问题反馈
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

// 登录
interface UserLogin {
  userName: string;
  password: string;
}
export function userLogin(data: UserLogin) {
  return request({
    method: 'post',
    url: ARTICLE_LOGIN,
    data
  });
}

// 删除文章
interface DeleteArticle {
  id: number;
  textType: string;
}
export function deleteArticle(params: DeleteArticle) {
  return request({
    method: 'get',
    url: ARTICLE_DELETE,
    params
  });
}
