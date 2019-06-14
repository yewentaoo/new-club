<template>
	<div id="index" class="index"
    @touchstart="start($event)"
    @touchmove="movea($event)">
		<header class="header">
			<i class="iconfont icon-menu"></i>
				<span class="text">{{name}}</span>
                <i class="iconfont icon-more_android_light"></i>
				<i class="iconfont icon-bell-fill"></i>
	
		</header>

		<mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner" :key='item.id'>
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
        </mt-swipe-item>
        </mt-swipe>

<div class="day" v-for="(item,index) in news" :key="index">
      <span class="time">{{item.title}}</span>
      <div
        class="card" 
        v-for="(litItem,zindex) in item.data"
        :key="zindex"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end(litItem.id)"
        
      >
        <p>{{litItem.title}}</p>
        <div class="img">
          <img :src="litItem.images" alt>
        </div>
      </div>
    </div>

    <div class="mask" :class="flag?'show':'hide'">
        <div class="msktop">
            <span></span>
            <p>请登录</p>
            <div class="mskicon">
            <i class="iconfont icon-favor_fill_light" @click="toshouchang()">我的收藏</i>
            <i class="iconfont icon-download">离线下载</i>
            </div>
        </div>
        <div class="maskbody">

        </div>
    </div>

	</div>
    
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
Date.prototype.getWeek = function() {
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var day = this.getDay();
  return arr[day];
};
function getDate(num) {
  var date = new Date().getTime();
  //1 params=20190610 title=06月09日 星期日
  var newDate = new Date(date - (num - 1) * 24 * 60 * 60 * 1000);

  var year1 = newDate.getFullYear();
  var month1 =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  var day1 =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  var params = year1 + "" + month1 + "" + day1;
  // title
  var newDate2 = new Date(date - num * 24 * 60 * 60 * 1000);
  var month2 =
    newDate2.getMonth() + 1 < 10
      ? "0" + (newDate2.getMonth() + 1)
      : newDate2.getMonth() + 1;
  var day2 =
    newDate2.getDate() < 10 ? "0" + newDate2.getDate() : newDate2.getDate();
  var week = newDate2.getWeek();
  var title = month2 + "月" + day2 + "日" + " " + week;
  return {
    params: params,
    title: title
  };
}
var num = 0;
export default {
  components: {
  },
  props: [],
  data () {
    return {
        name:'首页',
        banner:[],
        rewen:[],
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 0,
        title:"首页",
        news:[],
        isload: true,
        flag:false,
    };
  },
  watch: {},
  computed: {},
  methods: {
       toxqmove(e) {
      this.endX = e.touches[0].clientX;
      console.log(this.endx);
      
    },
      getNewData() {
      if (this.isload) {
        this.isload = false;
        num++;
        this.$http({
          url: API.date + getDate(num).params
        }).then(d => {
          this.isload = true;    
          this.news.push({
            title: getDate(num).title,
            data: d.data.stories
          });

          console.log(d);
        });
      }
    },
      toList(id){
          this.$router.push('/xiangqing/'+id)
      },
      toshouchang(){
         this.$router.push('/shouchang')
      },
      start(e) {
     this.startY = e.touches[0].clientY;
     this.endY = 0;
     this.startX = e.touches[0].clientX;
     this.endX=0;
      console.log(this.startX);
    },
    move(e) {
      this.endY = e.touches[0].clientY;
      this.endX = e.touches[0].clientX;
      console.log(this.endX);
    },
    end(id){
        if(this.endY==0){
           this.$router.push('/xiangqing/'+id)
        }
    },
    movea(e) {
      this.endY = e.touches[0].clientY;
      this.endX = e.touches[0].clientX;
      if(this.endX>this.startX+100){
          this.flag=true;  
           
      }
      else if(this.startX-40>this.endX){
          this.flag=false;
      }
    }

  },
  mounted () {
      var that=this;
      var id = this.$route.params.id;
      this.$http({
        url: API.rewen,
        params: {
          id
        }
      }).then(d=>{
          this.banner=d.data.top_stories;
           this.news.push({
                 title: "今日新闻",
                 data: d.data.stories
          });
           this.getNewData();        
      }),
      window.onscroll = function() {
      var wh =
        document.documentElement.clientHeight || documet.body.clientHeight; //窗口的高度
      var st = document.documentElement.scrollTop || document.body.scrollTop; //上卷的距离

      var dh =
        document.documentElement.offsetHeight || document.body.offsetHeight; //文档的高度

      if (wh + st + 30 >= dh) {
        // console.log("到底了");
        that.getNewData();
      }
       if (st < 180) {
        that.name = "首页";
      } else {
        var times = document.querySelectorAll(".time"); 
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + st < st + wh) {
            that.name = times[i].innerHTML;
         
          }
        }
      } 
    };
  }
};
</script>
<style lang="stylus" scoped>
  .index{
		background: #F3F3F3;
        overflow hidden

		&.home-hidden{
			height: 100vh;
			overflow: hidden;
		}
    }
    .iconfont{
    	font-size: .2rem;
    }
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
         .icon-bell-fill,.icon-more_android_light{
             float right 
         }
	}

    .mint-swipe{
        height 3rem
    }
    h2{
        font-size .14rem
        line-height .4rem
    }

    .mint-swipe-item{
        position relative
        p{
            position absolute
            bottom .1rem
            left .1rem
            color #fff
            font-size .2rem
        }
    }

.mint-swipe-item is-active{
    img{
        width 100%;
    }
}
.card{
    height 1.2rem;
    background #fff;
    margin .1rem;
    overflow hidden
    padding .1rem
    p{
        float left;
        font-size .2rem;
        width 77%
    }
    .img{
        float right 
        margin-top -0.29rem;
    }
    img{
        height 1rem;
        width 1rem;
        
    }
}
.time {
    display: block;
    padding-left: .2rem;
    padding-top: .2rem;
    font-size: .22rem;
    line-height: .5rem;
    color: #877E7E;
  }
  .mask{
      overflow hidden
      background rgba(0,0,0,0.5)
      height 100vh
      position fixed
      top 0rem
      z-index 333
      transition:width 0.3s
     .msktop{
         width 6rem
         color #fff
         overflow hidden
         background #00A2ED
         span{
             display inline-block
             width .7rem
             height .7rem
             background red
             border-radius 50%
             margin-bottom -0.1rem
             margin-left .15rem
         }
         p{
             margin-top .2rem
             font-size .2rem
             display inline-block
         }
         i{
             display inline-block
             font-size .2rem
             width 2.8rem
             text-align center
         }
        
     }
     .maskbody{
         width 6rem
         height 100vh
         background #fff
     }
  }
.show{
    width 100vw
}
.hide{
    width 0
}
</style>