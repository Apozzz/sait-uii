import middleware from '@/router/middleware';

import DashboardWrapper from '@/views/dashboard/DashboardWrapper';
import RoomsIndex from '@/views/dashboard/RoomsIndex';
import RoomsShow from '@/views/dashboard/RoomsShow';
import RoomsCreate from '@/views/dashboard/RoomsCreate';
import RoomsEdit from '@/views/dashboard/RoomsEdit';
import RoomsRent from '@/views/dashboard/RoomsRent';

// Sectors
import SectorsIndex from '@/views/dashboard/SectorsIndex';
import SectorsShow from '@/views/dashboard/SectorsShow';
import SectorsCreate from '@/views/dashboard/SectorsCreate';
import SectorsEdit from '@/views/dashboard/SectorsEdit';

// Markets
import MarketsIndex from '@/views/dashboard/MarketsIndex';
import MarketsShow from '@/views/dashboard/MarketsShow';
import MarketsCreate from '@/views/dashboard/MarketsCreate';
import MarketsEdit from '@/views/dashboard/MarketsEdit';

export default [
    {
        path: '/dashboard',
        component: DashboardWrapper,
        children: [
            {
                path: '',
                name: 'dashboard',
                beforeEnter: middleware.user,
                component: RoomsIndex
            },
            {
                path: 'rooms/create',
                name: 'rooms_create',
                beforeEnter: middleware.admin,
                component: RoomsCreate
            },
            {
                path: 'rooms/rent',
                name: 'dashboard_rooms_rent',
                beforeEnter: middleware.user,
                component: RoomsRent
            },
            {
                path: 'rooms/:id',
                name: 'dashboard_rooms_show',
                beforeEnter: middleware.user,
                component: RoomsShow
            },
            {
                path: 'rooms/:id/edit',
                name: 'dashboard_rooms_edit',
                beforeEnter: middleware.admin,
                component: RoomsEdit
            },
            {
                path: 'sectors',
                name: 'sectors_index',
                beforeEnter: middleware.user,
                component: SectorsIndex
            },
            {
                path: 'sectors/create',
                name: 'sectors_create',
                beforeEnter: middleware.admin,
                component: SectorsCreate
            },
            {
                path: 'sectors/:id',
                name: 'sectors_show',
                beforeEnter: middleware.user,
                component: SectorsShow
            },
            {
                path: 'sectors/:id/edit',
                name: 'sectors_edit',
                beforeEnter: middleware.admin,
                component: SectorsEdit
            },
            {
                path: 'markets',
                name: 'markets_index',
                beforeEnter: middleware.user,
                component: MarketsIndex
            },
            {
                path: 'markets/create',
                name: 'markets_create',
                beforeEnter: middleware.admin,
                component: MarketsCreate
            },
            {
                path: 'markets/:id',
                name: 'markets_show',
                beforeEnter: middleware.user,
                component: MarketsShow
            },
            {
                path: 'markets/:id/edit',
                name: 'markets_edit',
                beforeEnter: middleware.admin,
                component: MarketsEdit
            },
        ]
    },
];