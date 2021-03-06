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
        props: (route: { query: { id: number | string } }) => ({
          id: route.query.id
        })
      },
      // 发表文章与编辑文章路由不同，但公用一个vue文件
      {
        path: 'article-add',
        name: 'ArticleAdd',
        component: () => import('@/views/article-addoredit.vue')
      },
      {
        path: 'article-edit',
        name: 'ArticleEdit',
        component: () => import('@/views/article-addoredit.vue'),
        props: (route: { query: { id: number | string } }) => ({
          id: route.query.id
        })
      },
      {
        path: 'article-manage',
        name: 'ArticleManage',
        component: () => import('@/views/article-manage.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/to-login.vue')
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
