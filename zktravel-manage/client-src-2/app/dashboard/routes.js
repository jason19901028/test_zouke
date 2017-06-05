import DashBoardPage from './DashBoard.Page';
import hotelMappingRoute from './hotelMapping/routes';
import zkhotelRoute from './zkhotel/routes';
import systemOrder from './system-order/routes';
import groupOrder from  './group-order/routes';
import publishRequire from './publish-require/routes';
import myPublish from  './my-publish/routes';
export default [
    {
        path: 'dashboard', component: DashBoardPage, name: 'dashboard',redirect: { name: 'dashboard-hotel-mapping' },
        children:[
            ...hotelMappingRoute,
            ...zkhotelRoute,
            ...systemOrder,
            ...groupOrder,
            ...publishRequire,
            ...myPublish
        ]
    }
]