const LController = requireRoot('common/LController');
const ZkHotel = require('../@logic/ZkHotel');

module.exports = class ZkHotelController extends LController {
    async detail(){
        const params = this.request.body;
        const zkHotel = new ZkHotel();
        const detail = await zkHotel.detail(params.id);
        this.renderJSON({code:0, detail});
    }
    async query(page, pageSize, status=0, keyword){
        const zkHotel = new ZkHotel();
        const result = await zkHotel.query(page, pageSize, { status, keyword });

        this.renderJSON(Object.assign({code:0}, result))
    }
    async search(keyword){
        const zkHotel = new ZkHotel();
        const { list } = await zkHotel.query(0, 10, { keyword });

        this.renderJSON({ code:0, list:list.map(h=>({
            id: h._id,
            name: h.name
        }))})
    }
}