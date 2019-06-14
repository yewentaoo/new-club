<template>
  <div class="wrapper">
      <header class="header">
         <i class="iconfont icon-back_android" @touchstart='$router.go(-1)'></i>
         <p>{{alength}}条点评</p>
         <i class="iconfont icon-edit-square"></i>
		</header>
   <div class="topcell mint-cell">{{length}}条长评</div>
   <!-- v-if="comment.length==0" -->
   <div class="shafa-tip" v-if="length==0">
      <i class="iconfont icon-shafa1"></i>
      <p>深度长评虚位以待</p>
    </div>
    <ul v-else class="cul">
      <li class="cpinglun"  v-for="pitem in comment.comments" :key='pitem.id'>
      <span><img :src='pitem.avatar' alt=""></span>
       <i class="iconfont icon-appreciate">{{pitem.likes}}</i>
      <h2>{{pitem.author}}</h2>
      <p>{{pitem.content}}</p>
      <em>{{pitem.time|timeFilter}}</em>
    </li>
    </ul>
    
    <div class="btmcell mint-cell" @touchstart='turn(flag)'>
      {{dlength}}条短评
        <i class="iconfont" :class="flag?'icon-packup':'icon-unfold'"></i>
      </div>
    <ul class="cul">
      <li class="cpinglun"  v-for="ditem in dcomment.comments" :key='ditem.id' v-show="flag">
      <span><img :src='ditem.avatar' alt=""></span>
      <h2>{{ditem.author}}</h2>
      <p>{{ditem.content}}</p>
      <em>{{ditem.time|timeFilter}}</em>
    </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  filters: {
    timeFilter(time){
      var date=new Date(time);
      var year=date.getFullYear();
      var month=date.getMonth()+1>10?date.getMonth()+1:'0'+(date.getMonth()+1)
      var day=date.getDate()>10?date.getDate():'0'+date.getDate();
      var hours=date.getHours()>10?date.getHours():'0'+date.getHours();
      var minutes=date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes();
      var seconds=date.getSeconds()>10?date.getSeconds():'0'+date.getSeconds();
      var num=date.getDay();// 0 1 2 3 4 5 6
      return `${month}-${day} ${hours}:${minutes}`;
  }
  },
  data() {
    return {
      alength:0,
      flag:false,
      length:0,
      comment:[],
      dlength:0,
      dcomment:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    turn(flag){
      if(this.flag==true){
        this.flag=false;
      }
      else{
        this.flag=true;
      }
      return this.flag;
    },

  },
  mounted() {
    var id = this.$route.params.id;
    this.$http({
        url: `/api/4/story/${id}/long-comments`,
        
      }).then(d=>{
          this.comment=d.data;
          this.length=d.data.comments.length;        
      })

      this.$http({
        url: `/api/4/story/${id}/short-comments`,
        
      }).then(d=>{
          this.dcomment=d.data;
          this.dlength=d.data.comments.length;
          this.alength=this.length+this.dlength;   
          
      })
  }
};
</script>
<style lang="stylus" scoped>
html,body,.wrapper{
  height 100vh
}
.header{
  height .5rem;
  background: #00A2ED;
}
.btmcell{
  margin-top -0.01rem;
}
.shafa-tip{
  width 100vw;
  height 78%;
   font-size: .14rem;
   color: #B2B2B2;
   display:flex;
   flex-direction: column;
   justify-content:center;
   align-items:center;
   .iconfont{
        font-size: .6rem;
        margin-top: -0.2rem;
        margin-bottom: .1rem;
    }
}
.mint-cell{
  overflow hidden
  border-top .01rem solid #d9d9d9;
  border-bottom .01rem solid #d9d9d9;
  height .5rem;
  line-height .48rem;
  padding-left .1rem;
  font-size 0.25rem;
  min-height 0;
  .iconfont{
    float right 
    margin-right .2rem;
    font-size .3rem;
  }
}

.cpinglun{
  border-bottom .01rem solid #d9d9d9;
  span{
    display inline-block;
    width .5rem;
    height .5rem;
    padding .2rem;
    border-radius 50%
    overflow hidden;
    img{
      margin-top -1rem
    }
}
h2{
  vertical-align middle ;
  display inline-block;
  font bolder .2rem/.2rem "微软雅黑"; 
}
p{
  margin-left .6rem;
  text-indent 2em;
  margin-top -0.25rem;
  padding-bottom .1rem;
  padding-right .25rem;
  font .16rem/.3rem "微软雅黑";
}
em{
  display block
  color #666;
  margin-left .6rem;
  padding-bottom .1rem;
  font-size .16rem;
}
i{
  display inline-block;
  float right;
  margin-right .25rem;
  margin-top .1rem;
}
}
.header{
  i{
    font-size .2rem;
    line-height .5rem;
    color #fff;
    margin 0 .2rem;
  }
  .icon-back_android{
    float left;
  }
  p{
    font-size .2rem;
    line-height .5rem;
    color #fff
    float left;
  }
  .icon-edit-square{
    float right 
  }

}
</style>