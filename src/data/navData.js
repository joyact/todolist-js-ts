import { Home, Calculator, Clock, Painter, Todolist } from '../pages';

export const navs = [
  { id: '1', path: '/', name: 'Home', component: Home },
  { id: '2', path: '/calculator', name: 'Calculator', component: Calculator },
  { id: '3', path: '/clock', name: 'Clock', component: Clock },
  { id: '4', path: '/painter', name: 'Painter', component: Painter },
  { id: '5', path: '/todolist', name: 'Todolist', component: Todolist },
];
