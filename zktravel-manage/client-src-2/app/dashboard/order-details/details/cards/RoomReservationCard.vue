<style lang="scss" scoped>
    .orderId{
        padding:10px 0;
    }
    .suppliers{

    }
</style>
<template>
    <div>
        <el-card class="order-card">
            <div slot="header" class="clearfix">
                <el-row type="flex">
                    <!--<el-col :span="1"></el-col>-->
                    <el-col :span="3">
                        <h4>订单信息</h4>
                    </el-col>
                    <el-col :span="21"  class="orderId">
                        <span>订单号:</span>
                        <span>{{orderId}}</span>
                    </el-col>
                </el-row>
            </div>
            <template>
                <el-tabs v-model="cityTabs" :active-name="cityTabs" @tab-click="changeTab">
                    <template v-for="(item,index) in orders">
                        <el-tab-pane :label="item.city.name" :name="item.city.name+index">
                            <el-row type="flex">
                                <el-col :span="8">
                                    <strong>入住/离店:</strong>
                                    <span>{{item.check_in}}-{{item.check_out}}</span>
                                    <span>{{dateRange(item.check_out,item.check_in)}}晚</span>
                                </el-col>
                                <el-col :span="16">
                                    <strong>指定的酒店:</strong>
                                    <span>{{item.hotel&&item.hotel.name}}</span>
                                </el-col>
                            </el-row>
                            <div v-for="(v,index) in item.hotels">
                                <el-row type="flex">
                                    <el-col :span="8">
                                        <strong>酒店:</strong>
                                        <span>{{v.hotel.name}}</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <strong>评分</strong>
                                        <span></span>
                                    </el-col>
                                </el-row>
                                <div>
                                    <el-card v-for="(item,index) in v.suppliers" :key="item">
                                        <el-row type="flex">
                                            <el-col :span="4">
                                                <strong>采购渠道{{index+1}}:</strong>
                                                <span>{{item.supplier_name}}</span>
                                            </el-col>
                                            <el-col :span="1"></el-col>
                                            <el-col :span="8">
                                                <strong>入住编号:</strong>
                                                <span>{{item.at_number}}</span>
                                            </el-col>
                                        </el-row>
                                        <template v-for="(item,index) in item.rooms">
                                            <el-row type="flex">
                                                <el-col :span="2"><strong>房型{{index+1}}:</strong></el-col>
                                                <el-col :span="3">
                                                    <span>{{item.type}}</span>
                                                </el-col>
                                                <el-col :span="1"></el-col>
                                                <el-col :span="8">
                                                    <strong>描述:</strong>
                                                    <span>{{item.roomDescription}}</span>
                                                </el-col>
                                            </el-row>
                                            <el-row v-for="(v,index) in item.peoples" :key="v.name" type="flex">
                                                <el-col :span="6">
                                                    <strong>入住人{{index+1}}</strong>
                                                    <span>{{v.name}}</span>
                                                    <span>{{v.family_name}}</span>
                                                </el-col>
                                            </el-row>
                                        </template>
                                    </el-card>
                                </div>
                            </div>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </template>
        </el-card>
        <el-card class="suppliers">
            <div slot="header" class="clearfix">
                <h4>供应商条款:</h4>
            </div>
            <template>
                <el-tabs v-model="supplierTabs" type="card" :active-name="supplierTabs" @tab-click="supplierTab">
                    <template v-for="(item,index) in suppliers">
                        <el-tab-pane :label="item.supplier_name" :name="item.supplier_name+index">
                            <el-row type="flex">
                                <el-col :span="2"><strong>总成本价:</strong></el-col>
                                <el-col>
                                    <span>{{item.total_cost}}</span>
                                    <span>{{orderDatas&&genCurrency(orderDatas.requirement.currency).sign}}</span>
                                </el-col>
                            </el-row>
                            <el-row type="flex">
                                <!--<el-col :span="2"><strong>取消政策:</strong></el-col>-->
                                <!--<el-col :span="8">-->
                                    <!--<span>{{item.cancel_policy.cancel.free_cancel_date.substr(0,10)}}</span>-->
                                    <!--<span>{{item.cancel_policy.cancel.free_cancel_date?'前可免费取消':'不可取消'}}</span>-->
                                <!--</el-col>-->
                                <!--<el-col :span="2"></el-col>-->
                                <el-col :span="2"><strong>付款政策:</strong></el-col>
                                <el-col :span="8">
                                    <template v-for="(v,index) in item.pay_policy">
                                        <el-row type="flex">
                                            <el-col>
                                                <span>{{v.pay_date.substr(0,10)}}</span>
                                                <span>前续支付</span>
                                                <span>{{v.number}}</span>
                                                <span>{{orderDatas&&genCurrency(orderDatas.requirement.currency).sign}}</span>
                                            </el-col>
                                        </el-row>
                                    </template>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </template>


        </el-card>
        <el-row type="flex">
            <h4>分房名单</h4>
        </el-row>
        <el-row type="flex">
            <el-input
                    type="textarea"
                    :rows="5"
                    v-model="orderDatas.allot_list.content"
                    :disabled="true">

            </el-input>
        </el-row>
    </div>
</template>
<script>
    import ajax from '@local/common/ajax';
    export default{
        props:["orderDatas"],
        data(){
            return {
                orderData:null,
                cityTabs:null,
                supplierTabs:null,
                orders:[],
                suppliers:[]
            }
        },
        computed:{
            orderId(){
                return this.$route.params.orderid;
            }
        },
        methods:{
            genCurrency(type){
                switch(type){
                    case 'EUR':
                        return { type, name:'欧元', sign:'€' };
                    case 'GBP':
                        return { type, name:'英镑', sign:'￡' };
                    case 'CNY':
                        return { type, name:"人民币", sign:'￥'};
                    default:
                        return {};
                }
            },
            loadOrder(id){
                ajax.post("/api/team/order/detail",{id:id}, {lock: false}).then(json=>{
                    this.orderData = json.detail.order_detail;
                    console.log("json",json);
                    console.log("---------",this.orderData);
                    this.orders=this.orderData.orders;
                    console.log("orders====",this.orders);
                    this.suppliers=this.orderData.suppliers;
                    this.cityTabs=this.orderData.orders[0].city.name+'0';
                    console.log("160===",this.cityTabs);
                    this.supplierTabs=this.orderData.suppliers[0].supplier_name+"0";
                    console.log("orderdata=",this.orderData);
                })
            },
            dateRange(a,b){
                return new Date(a).getDate()-new Date(b).getDate();
            },
            changeTab(){

            },
            supplierTab(){

            }
        },
        mounted(){
            this.dateRange();
            this.loadOrder(this.$route.params.orderid);
            console.log("orderDatas===",this.orderDatas);
        }
    }
</script>