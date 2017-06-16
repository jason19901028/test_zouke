const LController = requireRoot('common/LController');
const TeamRequirement = require('../@logic/Requirement');
const Order = require('../@logic/Order');

const triggerInsert = Symbol();

// 团房需求
module.exports = class TeamReqController extends LController {
    $meta(){
        return {
            access: {
                'invalid-req': {
                    'offline_order': this.P.OFFLINE_ORDER.DISPATCH
                },
                'dispatch': {
                    'offline_order': this.P.OFFLINE_ORDER.DISPATCH
                },
                'update': { 
                    'offline_order': [
                        this.P.OFFLINE_ORDER.UPDATE_SELF_REQUIREMENT,
                        this.P.OFFLINE_ORDER.UPDATE_ALL_REQUIREMENT
                    ] 
                },
                default: {
                    'offline_order': this.P.OFFLINE_ORDER.PUBLISH
                }
            }
        }
    }
    async [triggerInsert](name){
        const teamRequirement = new TeamRequirement();
        const requirement = teamRequirement.validRequirement(this.request.body);
        
        if(!requirement){
            this.renderJSON({code:1, msg: 'data check valid fail'});
            return;
        }

        const { id: uid, name: uname, role, roleName } = this.userInfo;
        const id = await teamRequirement[name](requirement, { id: uid, name: uname, role, roleName });
        this.renderJSON({ code: 0, orderId: id });
    }
    async publish(){
        await this[triggerInsert]('publish');
    }
    async draft(){
        await this[triggerInsert]('draft');
    }
    async draftPublish(id, requirement){
        const teamRequirement = new TeamRequirement();

        let result = false; 
        if(requirement){
            const transRequirement = teamRequirement.validRequirement(requirement);
            if(!transRequirement){
                this.renderJSON({ code:1, msg: 'data check valid fail' });
                return;
            }
            result = await teamRequirement.draftPublish(id, transRequirement);
        }else{
            result = await teamRequirement.draftPublish(id);
        }
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg: 'can not publish this draft' });
    }

    async update(id, requirement){
        const teamRequirement = new TeamRequirement();
        const transRequirement = teamRequirement.validRequirement(requirement);
        if(!transRequirement){
            this.renderJSON({ code:1, msg: 'data check valid fail' });
            return;
        }

        const { id: uid, name: uname, role, role_name } = this.userInfo;

        const result = await teamRequirement.update(
            id, 
            transRequirement, 
            { id:uid, uname:uname, role, role_name },
            this.userInfo.checkPermission(
                'offline_order', 
                this.P.OFFLINE_ORDER.UPDATE_ALL_REQUIREMENT
            )
        );

        switch(result){
            case -1:
                this.renderJSON({ code: 2, msg: 'can not update' })
                return;
            case -2:
                this.renderJSON({ code: -2, msg: 'access deny' })
                return;
            case true:
                this.renderJSON({ code: 0 });
                return;
            case false:
                this.renderJSON({ code: 3, msg: 'status change' });
                return;
        }
        //todo 
    }

    async dispatch(id, user, dead_line){
        //分配
        const order = new Order();

        const { id: uid, name: uname, role, role_name } = this.userInfo;

        const result = await order.dispatch(id, user, dead_line,  { id:uid, uname:uname, role, role_name });

        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg: 'can not dispatch this order' });
    }

}