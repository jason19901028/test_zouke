const dbclient = requireRoot('dbclient');

module.exports = class ZkHotel {
    async detail(id){
        const zkCollection = await dbclient.collections.get('zk_hotels');

        const detail = await zkCollection.findOne({_id: id});

        if(detail){
            delete detail._id;
            if(detail.alias){
                detail.alias = detail.alias.join('|');
            }
        }
        return detail;
    }
    async query(page, pageSize, { status = 0, keyword, city } = {}, requireCount = true ){

        const findCondition = {
            status
        };
        if(keyword){
            const reg = new RegExp(keyword, 'i');
            findCondition.$or = [
                { name: reg },
                { name_en: reg }
            ];
        }
        if(city){
            findCondition.city_ids = city;
        }

        const zkCollection = await dbclient.collections.get('zk_hotels');
        
        const count = requireCount ? (await zkCollection.find(findCondition).count()): -1;

        const skipNum = page * pageSize;
        const list = await zkCollection.find(findCondition,
            {
                name: 1,
                name_en: 1,
                star: 1,
                star_desc:1,
                address: 1,
                city:1,
                city_name: 1,
                city_name_en:1,
                country_name: 1,
                country_name_en: 1,
                phone: 1,
                email: 1,
                description: 1,
                url: 1,
                alias: 1,
                score:1
            }
        ).skip(skipNum).limit(pageSize).toArray()

        return { list, count };
    }
}