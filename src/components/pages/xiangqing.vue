<template>
  <div class="wrapper">
      <header class="xqheader">
          <div class="fltleft">
              <i class="iconfont icon-back_android" @click='$router.go(-1)'></i>
          </div>
          <div class="fltgirht">
              <i class="iconfont icon-share_fill"></i>
              <i class="iconfont" @touchstart='save()' :class="flag?'icon-favor_fill_light':'icon-favor_light'"></i>
              <i class="iconfont icon-comment_light" @click="toComment()">{{alength}}</i>
              <i class="iconfont icon-appreciate_light">{{zhan}}</i>
          </div>
		</header>

        <div class="detail-content">
            <div class="img-wrap">
                <h1 class="title">{{xqt.title}}</h1>
                <span class="img-source">{{xqt.image_source}}</span>
                <img :src="xqt.image" alt="">
                <div class="img-mask"></div>
            </div>
            <div class="detail-body" v-html="xqt.body"></div>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      xqt:[],
      images:'',
      title:'',
      flag:null,
      alength:0,
      zhan:0
    };
  },
  watch: {},
  computed: {},
  methods: {
    toComment(){
        let id = this.$route.params.id;
           console.log(id);
           this.$router.push({ path: `/comment/${id}` });
    },
    save(){
        var arr=localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[];
        if(arr.some(item=>item.id==this.$route.params.id)){
            this.flag=false;
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==this.$route.params.id){
                    arr.splice(i,1);
                    break;
                }
            }
        }else{
            this.flag=true;
            arr.push({
            title:this.title,
            images:this.images,
            id:this.$route.params.id
        })
        }
        
        localStorage.setItem('arr',JSON.stringify(arr));
    }
  },
  mounted () {
      var that=this;
      var id = this.$route.params.id;
      
       var arr=localStorage.getItem('arr')?JSON.parse(localStorage.getItem('arr')):[];
    if(arr.some(item=>item.id==this.$route.params.id)){
        this.flag=true;
    }else{
        this.flag=false;
    }
      this.$http({
        url: `/api/4/news/${id}`,
        params: {
          id
        }
      }).then(d=>{
          this.xqt=d.data;
          this.title=d.data.title;
           this.images=d.data.images[0]       
      })

      this.$http({
        url: `/api/4/story-extra/${id}`,
      }).then(d=>{
          this.alength=d.data.comments;
          this.zhan=d.data.popularity;
          console.log(d);
                 
      })
  }
};
</script>

<style lang="stylus">
.xqheader{
    overflow hidden
  height .5rem;
  background: #00A2ED;
  i{
    font-size .2rem;
    line-height .5rem;
    color #fff;
    margin 0 .1rem;
  }

  .fltleft{
      margin-top -0.72rem
      float left
  }
  .fltgirht{
      margin-top -0.72rem
      float right 
  }

}
.detail-content{
    .img-wrap{
        width 6.4rem
        height 3rem;
        position: relative;
        overflow: hidden;
        border-bottom: .04rem solid #f6f6f6;
        .title{
            font-size .2rem;
            position: absolute;
            bottom: .28rem;
            left: 0;
            color #fff
            padding: 0 .1rem;
            line-height: .26rem;
            z-index: 2;
        }
        .img-source{
            position: absolute;
            bottom: .08rem;
           right: 0;
            padding: 0 .1rem;
            font-size: .12rem;
            color: hsla(0,0%,94%,.9);
            z-index: 2;
        }
        .img-mask{
            position: absolute;
             top: 0;
            left: 0;
            width: 100%;
             height: 100%;
             background: linear-gradient(0deg,rgba(0,0,0,.7),transparent);
             z-index: 1;
        }
    }
    .detail-body{

            .main-wrap{
                overflow: hidden;
                background-color: #fff;
                
                .headline{
                    border-bottom: .04rem solid #f6f6f6;

                    .meta{
                        padding: 0 .2rem;
                        a{
                            color: #00A2ED;
                        }
                    }

                    .headline-title {
                        line-height: 1.2em;
                        color: #000;
                        font-size: .22rem;
                        margin: .2rem 0 .1rem;
                        padding: 0 .2rem!important;
                        font-weight: 700;
                        &.onlyheading{
                            margin: .2rem 0;
                        }
                    }

                    .headline-background-link {
                        line-height: 2em;
                        position: relative;
                        padding: .2rem .45rem .2rem .2rem !important;
                        display: block;
                        text-decoration: none;

                        .heading{
                            font-size: .15rem !important;
                            margin-bottom: .08rem;
                            line-height: 1em;
                            color: #999;
                        }
                        .heading-content{
                            color: #444;
                            text-decoration: none;
                            font-size: .17rem !important;
                            line-height: 1.2em;
                        }
                    }
                }
                .question {
                    padding: 0 .2rem!important;
                    overflow: hidden;

                    .meta{
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-size: .16rem;
                        color: #b8b8b8;

                        .avatar{
                            width: .2rem;
                            height: .2rem;
                            border-radius: .02rem;
                            margin-right: .05rem;
                        }

                        span{
                            vertical-align: middle;
                        }
                        .author{
                            color: #444;
                        }
                        .bio{ color: #999; }
                    }
                    .content{
                        line-height: 1.6em;
                        margin: .1rem 0 .2rem;
                        font-size: .17rem;
                        color: #444;

                        p{
                            display: block;
                            -webkit-margin-before: 1em;
                            -webkit-margin-after: 1em;
                            -webkit-margin-start: 0rem;
                            -webkit-margin-end: 0rem;
                        }
                    }

                    .view-more{
                        text-align: right;
                        margin-bottom: .25rem;

                        a{
                            color: #698ebf;
                            font-size: .14rem;
                            text-decoration: none;
                        }
                    }
                }
                .question + .question {
                    border-top: .05rem solid #f6f6f6;
                }

                .question-title{
                    font-size: .19rem;
                    line-height: 1.4em;
                    color: #222;
                    font-weight: bold;
                    margin: .2rem 0;
                }
            }
        }
}

</style>
