<template>
	<div>
		<Stocktable :mk="counts" :list="list" :pages="pages" @prev="mkprev" @next="mknext"></Stocktable>
		<!-- <button @click="increments">+</button> -->
	</div>
</template>

<style lang="scss" scoped>

</style>


<script>
	import Stock_table from './Stock-table';
	// import ajax from '@local/common/ajax';
	export default{
		data(){
			return{
				pageNum:1,
				pageSize:10,
				items:[],
				listData:[]
			}
		},
		components:{
			Stocktable:Stock_table
		},
		computed:{
			pages(){
				return{	
					pageNum: this.pageNum,
					pageSize:this.pageSize,
					total:Math.ceil((this.$store.state.list).length/this.pageSize),
					pages:Math.ceil((this.$store.state.list).length/this.pageSize)/this.pageNum
				}

			},
			counts(){
				return this.$store.state.counts;
			},
			list(){
				//分页
				this.items=this.$store.state.list;
				this.listData = this.items.sort(function(a, b) {
					if(a.level> b.level) {
						return 1;
					}
					if(a.level < b.level) {
						return -1;
					}
					return 0;
				});
				return this.listData.slice((this.pageNum - 1) * this.pageSize, this.pageSize * this.pageNum);
			}
		},
		methods:{
			mkprev(){
				if(this.$store.state.counts.isTrue.dlisTrue){
					if(this.$store.state.flag.flag){
					this.pageNum=this.$store.state.flag.page;
					return false;
					}
					this.pageNum--;
				}
			},
			mknext(){
					if(this.$store.state.flag.flag){
						this.pageNum=this.$store.state.flag.page;
						return false;
					}
					this.pageNum++;

			}
		}
	}

</script>