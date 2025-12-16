const routes = [
  {
    path: '/banca-helper/',
    name: 'Banca Helper',
    component: () => import('../views/calculator/CalculatorForm.vue'),
    meta: {
      pageTitle: 'Início',
    },
  },
]
export default routes
