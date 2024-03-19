import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: '_entrypoint',
      redirect: { name: 'entrypoint' },
    },
    {
      path: '/',
      name: 'entrypoint',
      components: {
        // You can have things like scope, left, right here
        content: () => import('../components/LayoutContent.vue'),
      },
      redirect: { name: 'people-directory' },
      children: [
        {
          path: 'people-directory',
          name: 'people-directory',
          component: () => import('../views/PeopleTable.vue'),
        },
      ],
    },
  ],
});

export default router;
