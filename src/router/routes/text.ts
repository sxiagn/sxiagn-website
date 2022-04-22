const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/text-edit',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index.vue')
      },
      {
        path: 'text-list',
        name: 'TextList',
        props: (route: { query: { title: any; textType: any } }) => ({
          title: route.query.title,
          textType: route.query.textType
        }),
        component: () => import('@/views/text-list.vue')
      },
      {
        path: 'text-details',
        name: 'TextDetails',
        component: () => import('@/views/text-details.vue'),
        props: (route: { query: { id: any } }) => ({
          id: route.query.id
        })
      },
      {
        path: 'text-edit',
        name: 'TextEdit',
        component: () => import('@/views/text-edit.vue')
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test.vue')
      }
    ]
  }
];

export default routes;
