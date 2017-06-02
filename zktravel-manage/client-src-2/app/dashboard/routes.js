import DashBoardPage from './DashBoard.Page';
import hotelMappingRoute from './hotelMapping/routes';
import zkhotelRoute from './zkhotel/routes';

export default [
    {
        path: 'dashboard', component: DashBoardPage, name: 'dashboard',redirect: { name: 'dashboard-hotel-mapping' },
        children:[
            ...hotelMappingRoute,
            ...zkhotelRoute
        ]
    }
]