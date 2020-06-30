import React from 'react';

const Home = React.lazy(()=> import('./views/Home'));
const Estados = React.lazy(()=> import('./views/Estados'));
const Cidades = React.lazy(()=> import('./views/Cidades'));

const routes = [
  { path: '/', exact: true, name: 'Home', component:  Home},
  { path: '/estados/', exact: true, name: 'Estados', component:  Estados},
  { path: '/cidades/:id/', exact: true, name: 'Cidades', component:  Cidades}
];

export default routes;
