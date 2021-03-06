import HotelMappingPage from './HotelMapping.Page'
export default [
    {
        path: 'hotel-mapping-proxy',
        name: 'dashboard-hotel-mapping-proxy',
        redirect: {name: 'dashboard-hotel-mapping', params: {provider: 'vt'}},
    },
    {
        path: 'hotel-mapping/:provider',
        component: HotelMappingPage,
        name: 'dashboard-hotel-mapping',
    }
]