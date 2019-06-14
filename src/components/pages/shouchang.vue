<template>
  <div class="wrapper">
      <header class="header">
		<i class="iconfont icon-menu" @click='$router.go(-1)'></i>
		<span class="text">2条收藏</span>
		</header>
        <ul class="list">
            <li v-for="item in arr" @touchstart='toList(item.id)'>
                <p>{{item.title}}</p>
                <span><img :src="item.images" alt=""></span>
            </li>
        </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
var arr=JSON.parse(localStorage.getItem('arr'))
console.log(arr);

export default {
  components: {},
  props: [],
  data() {
    return {
      arr:[],
    };
  },
  watch: {},
  computed: {},
  methods: {
      toList(id){
          this.$router.push('/xiangqing/'+id)
      }
  },
  mounted() {
      this.arr=arr;
      console.log(this.arr);
      
  }
};
</script>
<style lang="stylus" scoped>
.header{
        z-index 3
        width 6.4rem
        position fixed;
        top 0
        color #fff;
        line-height .5rem;
	     height .5rem;
         background: #00A2ED;
         i{
             margin 0 .1rem
         }
         .icon-menu{
             float left
         }
         span{
             float left
             font-size .2rem;
             margin-left .1rem
         }
	}
    .list{
        margin 0 auto;
        width 90%;
        margin-top 0.8rem;
        li{
            height 1.8rem
            margin 0.1rem auto
            padding 0 .2rem
            border 1px solid #d9d9d9
            p{
                margin-top .2rem
                float left
                width 3.8rem;
                font-size 0.3rem
            }
            span{
                margin-top .2rem
                display block;
                float right;
                width 1.4rem;
                height 1.4rem;
                background red;
                img{
                    display block
                }
            }
        }
    }
</style>