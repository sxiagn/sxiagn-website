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
        props: (route: { query: { id: any } }) => ({
          id: route.query.id
        })
      },
      {
        path: 'article-send',
        name: 'ArticleSend',
        component: () => import('@/views/article-send.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/to-login.vue')
      }
    ]
  }
];

export default routes;
