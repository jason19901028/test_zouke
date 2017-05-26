import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@local/common/ajax';
Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        token:null,
        userInfo:null,
        hash:null,
        logout:null,
        passName:null,
        opreat:{
            zkId:null,
            spId:null,
            sign:null
        },
        listVt:[],
        listMk:[],
        listDl:[],
        listBk:[],
        newList:[],
        idData:{
    		vti:null,
    		mki:null,
    		dli:null
        },

        list:[
                        {   
                            id:1,
                            grade:"L1",
                            sName:"黄冠大酒店",
                            mName:"皇冠假日大酒店",
                            sAddress:"地址1",
                            mAddress:"地址11",
                            sPhone:1234556,
                            mPhone:7878788,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:3,
                            grade:"L3",
                            sName:"黄亚大酒店",
                            mName:"皇亚假日大酒店",
                            sAddress:"地址2",
                            mAddress:"地址22",
                            sPhone:2234556,
                            mPhone:2278788,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:2,
                            grade:"L2",
                            sName:"黄季大酒店",
                            mName:"皇季假日大酒店",
                            sAddress:"地址3",
                            mAddress:"地址33",
                            sPhone:3334556,
                            mPhone:3378788,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:4,
                            grade:"L4",
                            sName:"大酒店",
                            mName:"假日大酒店",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:4434556,
                            mPhone:4478788,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:1,
                            grade:"L1",
                            sName:"大酒店5",
                            mName:"假日大酒店5",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:534556,
                            mPhone:5478788,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:6,
                            grade:"L6",
                            sName:"大酒店6",
                            mName:"假日大酒店6",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:6,
                            mPhone:6,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:7,
                            grade:"L7",
                            sName:"大酒店7",
                            mName:"假日大酒店7",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:734556,
                            mPhone:778788,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:5,
                            grade:"L5",
                            sName:"大酒店8",
                            mName:"假日大酒店8",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:8,
                            mPhone:8,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:3,
                            grade:"L3",
                            sName:"大酒店9",
                            mName:"假日大酒店9",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:9,
                            mPhone:9,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:4,
                            grade:"L4",
                            sName:"大酒店10",
                            mName:"假日大酒店10",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:10,
                            mPhone:10,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:1,
                            grade:"L1",
                            sName:"大酒店11",
                            mName:"假日大酒店11",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:11,
                            mPhone:11,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:3,
                            grade:"L3",
                            sName:"大酒店12",
                            mName:"假日大酒店12",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:12,
                            mPhone:12,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:1,
                            grade:"L1",
                            sName:"大酒店13",
                            mName:"假日大酒店13",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:13,
                            mPhone:13,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:2,
                            grade:"L2",
                            sName:"大酒店14",
                            mName:"假日大酒店14",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:14,
                            mPhone:14,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:4,
                            grade:"L4",
                            sName:"大酒店15",
                            mName:"假日大酒店15",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:15,
                            mPhone:15,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:1,
                            grade:"L1",
                            sName:"大酒店16",
                            mName:"假日大酒店16",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:16,
                            mPhone:16,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:1,
                            grade:"L1",
                            sName:"大酒店17",
                            mName:"假日大酒店17",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:17,
                            mPhone:17,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:2,
                            grade:"L2",
                            sName:"大酒店18",
                            mName:"假日大酒店18",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:18,
                            mPhone:18,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {   
                            id:3,
                            grade:"L3",
                            sName:"大酒店19",
                            mName:"假日大酒店19",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:19,
                            mPhone:19,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:2,
                            grade:"L2",
                            sName:"大酒店20",
                            mName:"假日大酒店20",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:20,
                            mPhone:20,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        },
                        {
                            id:1,
                            grade:"L1",
                            sName:"大酒店21",
                            mName:"假日大酒店21",
                            sAddress:"地址4",
                            mAddress:"地址44",
                            sPhone:21,
                            mPhone:21,
                            link:"www.baidu.com",
                            bLink:"www.zouke.com"
                        }
        ],
        flag:{
            flag:false,  //记录状态进行跳转页面使用
            page:null
        },

        //SAI酒店库数据
        saiisTrue:{
            pisTrue:false,
            ofisTrue:false,
            onisTrue:false
        },
        counts: {
                isTrue:{
                    eisTrue:false,
                    aisTrue:false,
                },
                
                name:"miki名",
                address:"miki地址",
                phone:"miki电话",
                kms:{
                    name:"miki名",
                    address:"miki地址",
                    phone:"miki电话",
                },
                 dls:{
                    name:"dl名",
                    address:"dl地址",
                    phone:"dl电话",
                },
                 vts:{
                    name:"vt名",
                    address:"vt地址",
                    phone:"vt电话",
                },
                 bks:{
                    name:"bk名",
                    address:"bk地址",
                    phone:"bk电话",
                },
            	id:2,
            	sname:"sai",
                level:"五星",
                country:"法国",
                city:"巴黎",
                area:"15区",
                dates:"已上架-待审核",
                handel:"审核"
        }

    },
    // getters:{
    //     getlist:(state)=>{
    //         return state.list;
    //     }
    // },
    actions:{
        actionVt(context){
            return  ajax.post('/api/vt-mapping/query').then(json=>{
                if(json.code===0){
                    context.state.listVt=json.list;
                    console.log(JSON.parse(JSON.stringify(context.state.listVt)))
                }  
            })
        },
        actionMk(context){

        },
        actionDl(context){

        },
        actionBk(context){

        },
        actionOmath(context){
            console.log(context.state.opreat.zkId,context.state.opreat.spId);
            let spId=context.state.opreat.spId;
            let zkId=context.state.opreat.zkId;
            console.log(spId,zkId);
            return ajax.post('/api/vt-mapping/map',{spId:spId,zkId:zkId}).then(json=>{
                console.log(json);
                if(json.code===0){
                    context.dispatch('actionVt');
                }

            })
        },
        actionOput(context){
            let sign=context.state.opreat.sign;
            let spId=context.state.opreat.spId;
            let zkId=context.state.opreat.zkId;
            console.log(sign,spId,zkId);
            return ajax.post('',{sign:sign,spId:spId,zkId:zkId}).then(json=>{
                console.log(json);
            })
        },
        actionOu(context){
            let spId=context.state.opreat.spId;
            console.log(spId);
            return ajax.post('',{spId:spId}).then(json=>{
                if(json.code===0){
                    context.dispatch('actionVt');
                }
            })
        }
    },
    mutations: {
        login(state,json){
            state.token=json.code;
            state.userInfo=json.userInfo;
            window.localStorage.token=json.code;

        },
        login1(state,token){
            state.token=token;
        },
        logout(state,json){
            state.logout=json.code;
        },
        mk(state) {
            state.counts.name=state.counts.kms.name;
            state.counts.address=state.counts.kms.address;
            state.counts.phone=state.counts.kms.phone;
        },
        dl(state){
            state.counts.name=state.counts.dls.name;
            state.counts.address=state.counts.dls.address;
            state.counts.phone=state.counts.dls.phone;
        },
        vt(state) {
            state.counts.name=state.counts.vts.name;
            state.counts.address=state.counts.vts.address;
            state.counts.phone=state.counts.vts.phone;
            /*修改的*/
        },
        bk(state) {
            state.counts.name=state.counts.bks.name;
            state.counts.address=state.counts.bks.address;
            state.counts.phone=state.counts.bks.phone;
        },
        //操作数据匹配，入库，置位无效
        opreatMatch(state,item){
            state.opreat.zkId=item.zkId;
            state.opreat.spId=item.spId;
        },
        opreatPut(state,item){
            state.opreat.sign=item.sign;
            state.opreat.zkId=item.zkId;
            state.opreat.spId=item.spId;
        },
        opreatUnnecessary(state,item){
            state.opreat.spId=item.spId;
        },
        exit(state){
            state.counts.isTrue.eisTrue=true;
        },
        c(state){
            state.counts.isTrue.eisTrue=false;
        },
        audit(state){
            state.counts.isTrue.aisTrue=true;
        },
        getId(state,id){
        		state.idData.vti=id;
        },
        getMk(state,id){
        		state.idData.mki = id;
        },
        getDl(state,id){
        		state.idData.dli = id;
        }
    }
})