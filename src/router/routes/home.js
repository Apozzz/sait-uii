import middleware from '@/router/middleware';

import HomeWrapper from '@/views/home/HomeWrapper';
import HomeIndex from '@/views/home/HomeIndex';

import AuthWrapper from '@/views/auth/AuthWrapper';
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";

import RoomsShow from '@/views/rooms/RoomsShow';


export default [
  {
    path: '/',
    component: HomeWrapper,
    children: [
      {
        path: '',
        name: 'home_index',
        beforeEnter: middleware.guest,
        component: HomeIndex
      },
      {
        path: 'rooms/:id',
        name: 'rooms_show',
        beforeEnter: middleware.guest,
        component: RoomsShow
      },
    ],
  },
  {
    path: '/auth/',
    component: AuthWrapper,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        beforeEnter: middleware.guest,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        beforeEnter: middleware.guest,
      },
    ],
  },
]