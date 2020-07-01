import React from 'react';

const Home = React.lazy(()=> import('./views/Home'));
const Estados = React.lazy(()=> import('./views/Estados'));
const Distribuidoras = React.lazy(()=> import('./views/Distribuidoras'));
const DistInfo = React.lazy(()=> import('./views/DistInfo'));

const routes = [
  { path: '/', exact: true, name: 'Home', component:  Home},
  { path: '/estados/:id/', exact: true, name: 'Estados', component:  Estados},
  { path: '/distribuidoras/:id/', exact: true, name: 'Cidades', component:  Distribuidoras},
  { path: '/distInfo/:id/', exact: true, name: 'Info Distribuidoras', component:  DistInfo}
];

export default routes;
