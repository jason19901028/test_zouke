<style lang="scss" scoped>
	.hotel-top {
		border-bottom: 1px solid #ccc;
		padding: 5px 15px;
	}
	
	.hotel-top input {
		height: 28px;
	}
	
	.hotel-btn button {
		margin-right: 10px;
		width: 70px;
	}
	
	.modify {
		background: #ffffff;
		border: 1px solid #46b8da;
		color: #46b8da
	}
	
	.title {
		font-size: 20px;
		font-weight: bold;
	}
	
	.container-fluid label {
		text-align: right;
		margin-top: 2px;
	}
	
	.container-fluid input {
		height: 28px;
	}
	
	.star {
		height: 26px;
	}
	
	.borders {
		border: 1px solid #ccc;
		text-align: center;
		height: 28px;
		line-height: 28px;
		width: 60px;
		margin-right: 10px;
	}
	
	.border-width {
		width: 100px;
	}
	
	textarea {
		text-indent: 2em;
		line-height: 30px;
	}
	
	table th,
	table td {
		text-align: center;
	}
	
	.cricle {
		width: 34px;
		height: 34px;
		border-radius: 100%;
		position: absolute;
		top: -17px;
		right: -17px;
		font-weight: 100;
		border: 1px solid #999;
		line-height: 34px;
		text-align: center;
		z-index: 130;
		background: #FFFFFF;
	}
	
	.guan {
		border: 1px solid #ccc;
		height: 28px;
		line-height: 28px;
		text-decoration: none;
		background: #FFFFFF;
	}
	
	.hotel-state {
		padding-top: 10px;
	}
	
	.picture {
		height: 150px;
		width: 700px;
		list-style: none;
		overflow-x: scroll;
		white-space: nowrap;
		margin-bottom: 0;
	}
	
	.picture li {
		height: 150px;
		width: 150px;
		/*float: left;*/
		display: inline-block;
		white-space: nowrap;
		padding: 4px;
	}
	
	.picture img {
		width: 100%;
		height: 100%;
		display: inline-block;
		padding: 2px;
	}
	
	.foot {
		height: 100px;
	}
</style>
<template>
	<div>
		<div class="container-fluid">
			<div @click="close2()" class="cricle">X</div>
			<div class="row hotel-top">
				<div class="title pull-left col-lg-2">酒店详情</div>
			</div>
			<!--酒店状态-->
			<div class="row hotel-state">
				<div class="form-group col-lg-12">
					<label class="col-lg-1">酒店官网</label>
					<a class="col-lg-4 guan" :href="'https://'+ phdata.url_web">{{phdata.url_web}}</a>
				</div>
				<div class="form-group col-lg-3">
					<label class="col-lg-4">酒店的ID</label>
					<input type="text" class="col-lg-8" disabled v-model="idp">
				</div>
				<div class="form-group col-lg-3">
					<label class="col-lg-4">状态</label>
					<input type="text" class="col-lg-8" disabled placeholder="状态">
				</div>
			</div>
			<div class="row">
				<!--酒店名称-->
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店中文</label>
					<input type="text" disabled class="col-lg-8" v-model="phdata.name">
				</div>
				<div class="form-group col-lg-6">
					<label class="col-lg-2">酒店英文</label>
					<input type="text" disabled class="col-lg-8" v-model="phdata.name_en">
				</div>
				<div class="form-group col-lg-12">
					<label class="col-lg-1">酒店别名</label>
					<input type="text" disabled class="col-lg-6" placeholder="酒店别名">
				</div>
			</div>
			<!--中文地址-->
			<div class="row">
				<div class="form-group col-lg-12">
					<label class="col-lg-1 pull-left">酒店地址</label>
					<select class="star col-lg-2" disabled>
						<option>{{phdata.country_name}}{{phdata.country_name_en}}</option>
					</select>
					<select class="star col-lg-2" disabled>
						<option>{{phdata.city_name}}{{phdata.city_name_en}}</option>
					</select>
					<input type="text" disabled class="col-lg-5" v-model="phdata.address">
				</div>
			</div>

			<!--全部设施-->
			<div class="row ">
				<div class="form-group col-lg-12 ">
					<label class="col-lg-1 ">全部设施</label>
					<span class="col-lg-1 borders ">wifi</span>
					<span class="col-lg-1 borders border-width ">可以停车</span>
					<span class="col-lg-1 borders border-width ">可以停车</span>
				</div>
				<div class="form-group col-lg-12 ">
					<label class="col-lg-1 ">热门设施</label>
					<span class="col-lg-1 borders ">wifi</span>
					<span class="col-lg-1 borders border-width ">可以停车</span>
					<span class="col-lg-1 borders border-width ">可以停车</span>
				</div>
			</div>

			<!--酒店图片-->
			<div class="row ">
				<div class="form-group col-lg-12 ">
					<label class="col-lg-1 ">酒店图片</label>
					<ul class="picture thumbnail ">
						<li v-for="img in spphoto "><img :src="img.url " alt="picture "></li>
					</ul>
				</div>
			</div>

			<!--酒店介绍-->
			<div class="row ">
				<div class="form-group col-lg-12 ">
					<label class="col-lg-1 ">酒店介绍</label>
					<textarea class="col-lg-8 " disabled autofocus rows="3 " cols="30 ">{{phdata.description}}
                </textarea>
				</div>
			</div>
			<div class="row ">
				<div class="form-group col-lg-6 ">
					<label class="col-lg-2 ">酒店电话</label>
					<input type="text " disabled class="col-lg-8 " v-model="phdata.phone ">
				</div>
				<div class="form-group col-lg-6 ">
					<label class="col-lg-2 ">酒店传真</label>
					<input type="text " disabled class="col-lg-8 " v-model="phdata.fax " placeholder="null ">
				</div>
				<div class="form-group col-lg-6 ">
					<label class="col-lg-2 ">酒店邮箱</label>
					<input type="email " disabled class="col-lg-8 " v-model="phdata.email ">
				</div>
			</div>
		</div>
		<div class="row foot "></div>
	</div>

</template>

<script>
	import ajax from '@local/common/ajax';
	export default {
		props: ['updates', 'idp'],
		data() {
			return {
				isTrue: false,
				phdata: {},
				spphoto: []
			}
		},
		created() {
			ajax.post('/api/sp-hotel/detail', {
				id: this.idp
			}).then(json => {
				if(json.code === 0) {
					this.phdata = json.detail;
					// console.log(this.phdata);
					this.spphoto = this.phdata.photos;
				}
			})
		},
		methods: {
			update() {
				this.updates.isTrue.aisTrue = false;
				this.$store.commit('audit');
			},
			close2() {
				this.$emit('close2');
			}
		}
	}
</script>