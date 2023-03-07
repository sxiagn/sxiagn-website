import { PERMISSION_ROUTES } from '../../utils/const';

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index.vue')
      },
      {
        path: 'article-list',
        name: 'ArticleList',
        props: (route: { query: { title: any; textType: any } }) => ({
          title: route.query.title,
          textType: route.query.textType
        }),
        component: () => import('@/views/article-list.vue')
      },
      {
        path: 'article-details',
        name: 'ArticleDetails',
        component: () => import('@/views/article-details.vue'),
        props: (route: { query: { id: string; textType: string } }) => ({
          id: route.query.id,
          textType: route.query.textType
        })
      },
      {
        path: PERMISSION_ROUTES.ArticlePreview,
        name: 'ArticlePreview',
        component: () => import('@/views/article-preview.vue')
      },
      // 发表文章与编辑文章路由不同，但共用一个vue文件
      {
        path: PERMISSION_ROUTES.ArticleAdd,
        name: 'ArticleAdd',
        component: () => import('@/views/article-addoredit.vue')
      },
      {
        path: PERMISSION_ROUTES.ArticleEdit,
        name: 'ArticleEdit',
        component: () => import('@/views/article-addoredit.vue'),
        props: (route: { query: { id: number | string } }) => ({
          id: route.query.id
        })
      },
      {
        path: PERMISSION_ROUTES.ArticleManage,
        name: 'ArticleManage',
        component: () => import('@/views/article-manage.vue')
      },
      {
        path: PERMISSION_ROUTES.ProblemManage,
        name: 'ProblemManage',
        component: () => import('@/views/problem-manage.vue')
      },
      {
        path: PERMISSION_ROUTES.SwitchManage,
        name: 'SwitchManage',
        component: () => import('@/views/switch-manage.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/to-login.vue')
      },
      {
        path: 'to-test',
        name: 'ToTest',
        component: () => import('@/views/to-test.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/not-found.vue')
      }
    ]
  }
];

export default routes;
