import request from '../utils/request';
import {
  ARTICLE_ADD,
  ARTICLE_EDIT,
  ARTICLE_LIST,
  ARTICLE_DETAILS,
  FEED_BACK,
  ARTICLE_LOGIN,
  ARTICLE_DELETE,
  ARTICLE_ALL_LIST,
  ARTICLE_HOT,
  PROBLEM_LIST,
  DELETE_PROBLEM,
  ANSWER_PROBLEM,
  COVID_PANDEMIC,
  SWITCH_ADD,
  SWITCH_LIST,
  SWITCH_EDIT
} from './url';

// 发表文章
interface AddOrEditArticle {
  textType: string | number;
  title: string;
  contentDesc: string;
  id?: number | string;
}
export function addArticleApi(data: AddOrEditArticle) {
  return request({
    method: 'post',
    url: ARTICLE_ADD,
    data
  });
}
// 编辑文章
export function editArticleApi(data: AddOrEditArticle) {
  return request({
    method: 'post',
    url: ARTICLE_EDIT,
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

// 获取热门文章
interface ArticleHot {
  currentPage?: number;
  pageSize?: number;
}
export function getHotArticleList(params?: ArticleHot) {
  return request({
    method: 'get',
    url: ARTICLE_HOT,
    params
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

// 获取所有问题反馈
export function getAllProblemList() {
  return request({
    method: 'get',
    url: PROBLEM_LIST
  });
}

// 根据id删除问题反馈
interface DeleteProblem {
  id: number;
}
export function deleteProblem(params: DeleteProblem) {
  return request({
    method: 'get',
    url: DELETE_PROBLEM,
    params
  });
}

// 反馈问题答复
interface AnswerProblem {
  id: number;
  problemAnswer: string;
}
export function problemAnswerApi(data: AnswerProblem) {
  return request({
    method: 'post',
    url: ANSWER_PROBLEM,
    data
  });
}

// 获取新冠数据
export function covidPandemicApi() {
  return request({
    method: 'get',
    url: COVID_PANDEMIC
  });
}

// 新增开关
interface SwitchAdd {
  switchCode: string;
  switchDescribe: string;
  switchStatus: string;
}
export function switchAddApi(data: SwitchAdd) {
  return request({
    method: 'post',
    url: SWITCH_ADD,
    data
  });
}

// 获取所有开关
export function switchListApi() {
  return request({
    method: 'get',
    url: SWITCH_LIST
  });
}

// 编辑开关
interface SwitchEdit {
  id: number;
  switchCode?: string;
  switchDescribe?: string;
  switchStatus: string;
}
export function switchEditApi(data: SwitchEdit) {
  return request({
    method: 'post',
    url: SWITCH_EDIT,
    data
  });
}
