<style lang="scss" scoped>
	.complain{
        .msgH{
            position:relative;
            strong{
                font-size:20px;
                font-family:Microsoft YaHei;
            }
            .el-button{
                position:absolute;
                right:0;
            }
        }
        .msgMain{
            margin-top:20px;
        }
        .fixed{
            position:fixed;
            top:0;
            left:0;
        }
        .msgList{
            height:50px;
            .el_col{
                border-top:1px solid #ccc;
            }
            .avatar{
                display:inline-block;
                width:50px;
                height:50px;
                border:1px solid #999;
                border-radius:50%;
                background-color: #999;
                position:relative;
                top:10px;
            }
            span{
                padding-left:15px;
                display:inline-block;
                font-size:16px;
            }
            .line{
                margin-top:5px;
            }
        }
        .el-pagination{
            background-color: #fff;
            text-align:right;

        }
    }
</style>
<template>
<div class="complain">
	<div>
        <el-row type="flex" class="msgH">
            <el-col :span="2">
                <strong>投诉:</strong>
            </el-col>
           	<el-col :span="20">

            </el-col>
            <el-col :span="2" v-if="this.userInfo.id==2">
                    <el-button type="primary" @click="btn()">添加投诉记录</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="msgMain">
            <el-col :span="24">
                <el-input
                        type="textarea"
                        :rows="8"
                        v-model="msg">
                </el-input>
            </el-col>
        </el-row>
    </div>
     <el-row type="flex" id="row">
            <el-col :span="24">
                <p></p>
            </el-col>
        </el-row>
        <el-row type="flex" style="margin-top: 20px;">
            <el-col :span="24">
                <div v-for="item of currentList" :key="item" class="msgList">
                    <span>{{item.date}}</span>
                    <span>{{item.user.name}}</span>
                    <span>{{item.content}}</span>
                    <el-row type="flex" class="el_col"> 
                        <el-col :span="1"></el-col>
                        <el-col :span="22"><p class="line"></p></el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-pagination layout="total, prev, pager, next, jumper" @current-change="changePage" :total="total"
                       :page-size="pageSize">

        </el-pagination>
</div>        
</template>

<script>
    import ajax from '@local/common/ajax';
    export default{
        props:['orderData'],
        data(){
            return {
                msg:'',
                newMsg:'',
                list:[],
                currentList:[],
                total:null,
                pageNum:1,
                pageSize:10,
                complain_content:{
                    content:'',
                    user:{
                        id:'',
                        name:'',
                        role:'',
                        roleName:''
                    }
                }
            }
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            },
            userInfo(){
                return this.$store.getters.userInfo;
            }
        },
        methods:{
            loading(id){
                let arr=[];
                ajax.post("/api/team/order/detail",{id:id},{lock:false}).then(json=>{
                    console.log(json);
                    this.complain_content=json.detail.complain_content;
                    this.pageNum=1;
                    this.list=this.complain_content?this.complain_content:this.complain_content=[];
                    this.list=this.list.reverse();
                    for(let v of this.list){
                        if(typeof(v.user)=='undefined'||!v.user){
                            v.user='';
                        }
                    }
                    for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                        if(this.list[num]){
                            arr.push(this.list[num]);
                        }
                    }
                    this.currentList=Object.assign({},arr);
                    this.total=this.list.length;
                })
            },
            btn(){
                this.newMsg=this.msg;
                if(this.newMsg.length===0){
                    this.$message({
                        message:"请输入内容！",
                        type:'error'
                    })
                }else {
                    this.msg='';
                    ajax.post("/api/team/complaints/commit",{id:this.orderId,content:this.newMsg},{lock:false}).then(json=>{
                        this.loading(this.orderId);
                    })
                }
            },
            changePage(page){
                let arr=[];
                this.pageNum=page;
                for(let num=(this.pageNum-1)*this.pageSize;num<this.pageNum*this.pageSize;num++){
                    if(this.list[num]){
                        arr.push(this.list[num]);
                    }
                }
                this.currentList=arr;
            }
        },
        mounted(){
            this.loading(this.$route.params.orderid);
        },
        updated(){

        }
    }
</script>