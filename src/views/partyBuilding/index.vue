<template>
<div class="party-container">
    <div id="map_container"></div>
	<div class="bottom-circle"></div>
    <div class="bottom-rectangle"></div>
    <div></div>

    <!-- 4个角标 -->
    <div class="right_top_ranking corner-icon" @click="RanKing"></div>
    <div class="right_bot_rules corner-icon" @click="popuPropUp"></div>
    <div class="left_bot_personal corner-icon" @click="popuOpen"></div>
    <div class="left_top_info corner-icon" @click="popupInfo"></div>
    <!-- /4个角标结束 -->
    <!-- 打卡图标 -->
    <div class="clock-div">
        <img v-if="true" src="../../assets/images/partybuild/unableClock.png">  
        <img v-if="false" src="../../assets/images/partybuild/ableClock.png">  
        <div v-if="true" class="unableClock-notice">当前范围不可打卡</div>
        <div v-if="false" class="ableClock-notice">当前范围可打卡</div>
    </div>
    <!-- /打卡图标结束 -->
    <!-- 右侧弹框 -->
    <mt-popup
    v-model="popuPright"
    popup-transition="popup-fade"
    position="right"
    class="pouUp_R"
    >
        <div class="popuPright_titl">
            <p>闪闪发光的人民群众</p>
        </div>
        <div class="popuPright_List">
            <span>
                    姓名
            </span>
             <span>
                打卡
            </span>
             <span>
                耗时
            </span>
             <span>
                文章
            </span>
        </div>
         <div class="poRight_List">
            <span>
                <img src="../../assets/images/partybuild/first.png">  
            </span>
            <span>
                    丁一
            </span>
             <span>
                6点
            </span>
             <span>
              01:50:32 
            </span>
             <span>
                7篇
            </span>
        </div>
        <div class="poRight_List">
            <span>
                <img src="../../assets/images/partybuild/second.png">  
            </span>
            <span>
                    丁一
            </span>
             <span>
                6点
            </span>
             <span>
              01:50:32 
            </span>
             <span>
                7篇
            </span>
        </div>
        <div class="poRight_List">
            <span>
                <img src="../../assets/images/partybuild/third.png">  
            </span>
            <span>
                    丁一
            </span>
             <span>
                6点
            </span>
             <span>
              01:50:32 
            </span>
             <span>
                7篇
            </span>
        </div>
        <div class="poRight_List">
            <span>
            </span>
            <span>
                    丁一
            </span>
             <span>
                6点
            </span>
             <span>
              01:50:32 
            </span>
             <span>
                7篇
            </span>
        </div>
    </mt-popup>

    <!-- /// -->
    <!-- //下右弹框/ -->
    <div v-transfer-dom id="popuPro">
      <popup v-model="popuProp">
        <div class="rules">
            <div class="rules_ovf">
                <p>
                    规则一：东方明珠广播电视塔（The Oriental Pearl Radio & TV Tower）是上海的标志性文化景观之一。
                </p>
                <p>          
                    规则二：东方明珠广播电视塔（The Oriental Pearl Radio & TV Tower）是上海的标志性文化景观之一，位于浦东新区陆家嘴，塔高约468米。
                </p>
                <p>                
                    规则三：东方明珠广播电视塔（The Oriental Pearl Radio & TV Tower）是上海的标志性文化景观之一。
                </p>
                <p>                
                    规则三：东方明珠广播电视塔（The Oriental Pearl Radio & TV Tower）是上海的标志性文化景观之一。
                </p>
                <p>                
                    规则三：东方明珠广播电视塔（The Oriental Pearl Radio & TV Tower）是上海的标志性文化景观之一。
                </p>
            </div>
           
        </div>
      </popup>
    </div>
    <!-- //下右弹框结束/ -->
    <!--  -->
      <div v-transfer-dom >
      <popup v-model="persOnal" height="80%">
          <div class="personal_bk">
              <div class="persFalse" @click="down">
                  <img src="../../assets/images/partybuild/false.png">
              </div>
              <div class="persName">
                  嘭嘭嘭
              </div>
              <div class="persHead">
                  <img src="../../assets/images/partybuild/portrait.png">  
              </div>
              <div class="persKn_jg">
                    <div class="persKn" v-for="(article,index) in articleList" v-show="index!=party-1">
                        <div class="persKn_x">
                            <cell :title="article.article ">
                                <rater v-model="article.getNum" :max="article.totalNum" active-color="#FE8B12" disabled></rater>
                            </cell>
                        </div>
                        <div class="persKn_j">
                            <p v-for="wordsList in article.wordsList" :class="article.wordsList.isGet ? 'wordsClass':'wordsClis'">
                                {{wordsList.words}}
                            </p>
                        </div>
                    </div>
              </div>

             
          </div>
      </popup>
    </div>

    <!-- / -->
    <!-- 打卡成功弹框 -->
    <div v-transfer-dom>
        <x-dialog v-model="isGetWords" :hide-on-blur="true">
            <div class="getwords-dialog">
                <!-- <img src="../../assets/images/partybuild/getWords.png"> -->
                <div class="getwords-div">
                    <div>恭喜你！东方明珠打卡成功</div>
                    <div>获得金句</div>
                    <div class="golden-words" v-if="false">获得金句</div>
                    <div class="golden-words-long">使命愿景：汇聚资本力量，服务实体经济，服务投资大众，服务发展大局；有效维护市场公开公平公正，有效配置国内国际资源，有效防范市场风险；建设成为安全高效，功能完备，与我国社会主义现代化强国相匹配的世界领先交易所。</div>
                    <div class="golden-article">——《四个意识》</div>
                </div>
            </div>
        </x-dialog>
    </div>
    <!-- 打卡成功弹框结束 -->
    <!-- 未打卡弹框 -->
    <div v-transfer-dom>
        <x-dialog v-model="isShowIntro" :hide-on-blur="true">
            <div class="location-intro">
                <div class="location-name">东方明珠</div>
                <div class="location-dis">离我10公里</div>
                <div>东方明珠广播电视塔是上海的标志性文化景观之一，位于浦东新区陆家嘴，塔高约468米。该建筑于1991年7月兴建，1995年5月投入使用，承担上海6套无线电视发射业务，地区覆盖半径80公里。东方明珠广播电视塔是国家首批AAAAA级旅游景区。</div>
            </div>
        </x-dialog>
    </div>
    <!-- 未打卡弹框结束 -->
    <!-- 推送消息弹框 -->
    <div v-transfer-dom>
        <x-dialog v-model="isInfo" :hide-on-blur="true">
            <div class="location-intro">
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
                <div>丁一在东方明珠打卡成功！</div>
            </div>
        </x-dialog>
    </div>
    <!-- 推送消息弹框结束 -->
</div>
</template>

<script>
import markerImg from "../../../static/marker.png";
import markerRedImg from "../../../static/marker_red.png";
import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,XDialog } from 'vux';
import { Rater, Range } from 'vux'
var self =this;
var current_lng=0;
var current_lat=0;
// function OD(a, b, c) {
//     while (a > c) a -= c - b;
//     while (a < b) a += c - b;
//     return a;
// }
// function SD(a, b, c) {
//     b != null && (a = Math.max(a, b));
//     c != null && (a = Math.min(a, c));
//     return a;
// }
// function getDistance(a_lat,a_lng,b_lat,b_lng) {
//     var a = Math.PI * OD(a_lat, -180, 180) / 180;
//     var b = Math.PI * OD(b_lat, -180, 180) / 180;
//     var c = Math.PI * SD(a_lng, -74, 74) / 180;
//     var d = Math.PI * SD(b_lng, -74, 74) / 180;
//     return 6370996.81 * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b-a));
// }
function fD(a, b, c) {
	for (; a > c;)
		a -= c - b;
	for (; a < b;)
		a += c - b;
	return a;
};
function jD(a, b, c) {
	b != null && (a = Math.max(a, b));
	c != null && (a = Math.min(a, c));
	return a;
};
function yk(a) {
	return Math.PI * a / 180
};
function Ce(a, b, c, d) {
	var dO = 6370996.81;
	return dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
};
function getDistance(a, b,c,d) {
	if (!a || !b)
		return 0;
	a = fD(a, -180, 180);
	b = jD(b, -74, 74);
	c = fD(c, -180, 180);
	d = jD(d, -74, 74);
	return Ce(yk(a), yk(c), yk(b), yk(d));
};

export default {
 
   directives: {
    TransferDom
  },
   components: {
    Popup,
    Group,
    Cell,
    XSwitch,
    Toast,
    XAddress,
    XButton,
     Rater,
    Range,
    XDialog
  },
  data() {
    return {
        isInfo:false,
        isShowIntro:false,
        isGetWords:false,
        current_lng:0,
        current_lat:0,
        popuPright:false,
        popuProp:false,
        data41:4,
        persOnal:false,
        party:8,
        articleList:[{
    articleID: 1,
    article: "四个意识",
    totalNum: 4,
    getNum: 1,
    wordsList: [{
            wordsID: 101,
            words: "政治意识",
            isGet: false
        },
        {
            wordsID: 102,
            words: "大局意识",
            isGet: false
        },
         {
            wordsID: 103,
            words: "核心意识",
            isGet: false
        },
         {
            wordsID: 104,
            words: "看齐意识",
            isGet: false
        }
    ]
},
{
    articleID: 2,
    article: "四个自信",
    totalNum: 4,
    getNum: 2,
    wordsList: [{
            wordsID: 201,
            words: "道路自信",
            isGet: false
        },
        {
            wordsID: 202,
            words: "理论自信",
            isGet: false
        },
         {
            wordsID: 203,
            words: "制度自信",
            isGet: false
        },
         {
            wordsID: 204,
            words: "文化自信",
            isGet: false
        }
    ]
},
{
    articleID: 3,
    article: "'五位一体'总体布局",
    totalNum:5,
    getNum: 3,
    wordsList: [{
            wordsID: 301,
            words: "经济建设",
            isGet: false
        },
        {
            wordsID: 302,
            words: "政治建设",
            isGet: false
        },
         {
            wordsID: 303,
            words: "文化建设",
            isGet: false
        },
         {
            wordsID: 304,
            words: "社会建设",
            isGet: false
        },
         {
            wordsID: 305,
            words: "生态文明建设",
            isGet: false
        }
    ]
},{
    articleID: 4,
    article: "'四个全面'战略布局",
    totalNum:4,
    getNum: 0,
    wordsList: [{
            wordsID: 401,
            words: "全面建成小康",
            isGet: false
        },
        {
            wordsID: 402,
            words: "全面深化改革",
            isGet: false
        },
         {
            wordsID: 403,
            words: "全面依法治国",
            isGet: false
        },
         {
            wordsID: 404,
            words: "全面从严治党",
            isGet: false
        }
    ]
},
{
    articleID: 5,
    article: "四个伟大",
    totalNum:4,
    getNum: 0,
    wordsList: [{
            wordsID: 501,
            words: "进行伟大斗争",
            isGet: false
        },
        {
            wordsID: 502,
            words: "建设伟大工程",
            isGet: false
        },
         {
            wordsID: 503,
            words: "推进伟大事业",
            isGet: false
        },
         {
            wordsID: 504,
            words: "实现伟大梦想",
            isGet: false
        }
    ]
},
{
    articleID: 6,
    article: "党的六大纪律",
    totalNum:6,
    getNum: 0,
    wordsList: [{
            wordsID: 601,
            words: "政治纪律",
            isGet: false
        },
        {
            wordsID: 602,
            words: "组织纪律",
            isGet: false
        },
         {
            wordsID: 603,
            words: "廉洁纪律",
            isGet: false
        },
         {
            wordsID: 604,
            words: "群众纪律",
            isGet: false
        },
         {
            wordsID: 605,
            words: "工作纪律",
            isGet: false
        },
         {
            wordsID: 606,
            words: "生活纪律",
            isGet: false
        }
    ]
},
{
    articleID: 7,
    article: "上交所文化价值体系",
    totalNum:3,
    getNum: 0,
    wordsList: [{
            wordsID: 701,
            words: "价值口号：至诚至公 全球融通 建世界领先交易所",
            isGet: false
        },
        {
            wordsID: 702,
            words: "使命愿景：汇聚资本力量，服务实体经济，服务投资大众，服务发展大局；有效维护市场公开公平公正，有效配置国内国际资源，有效防范市场风险；建设成为安全高效，功能完备，与我国社会主义现代化强国相匹配的世界领先交易所。",
            isGet: false
        },
         {
            wordsID: 703,
            words: "核心价值观：高效、透明、稳健  服务、进取、奉献",
            isGet: false
        }
         
    ]
},
{
    articleID: 8,
    article: "入党誓词",
    totalNum:1,
    getNum: 0,
    wordsList: [{
            wordsID: 801,
            words: "我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。",
            isGet: false
        },
         
    ]
},
]
    };
  },
  methods: {
      getCurrentPositionB(){
        // 百度地图定位功能
        var map = new BMap.Map("map_container");
        var point = new BMap.Point(121.509213,31.21252);
        map.centerAndZoom(point,12);
        window.map = map;//将map变量存储在全局

        map.enableScrollWheelZoom();//启用地图滚轮放大缩小

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                //alert('您的位置：'+r.point.lng+','+r.point.lat);
                current_lng=r.point.lng;
                current_lat=r.point.lat;
                console.log("this.current_lng11",current_lng)
            }
            else {
                alert('failed'+this.getStatus());
            }        
        },{enableHighAccuracy: true})

        this.setCheckPosition();
      },
      setCheckPosition(){
        var point1 = new BMap.Point(121.506377, 31.245105);
        var point2 = new BMap.Point(121.509213, 31.21252);
        var myIcon = new BMap.Icon(markerImg, new BMap.Size(40, 40), {
        // 指定定位位置。
        // 当标注显示在地图上时，其所指向的地理位置距离图标左上
        // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
        // 图标中央下端的尖角位置。
        anchor: new BMap.Size(10, 25),
        // 设置图片偏移。
        // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
        // 需要指定大图的偏移位置，此做法与css sprites技术类似。
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
        });
        var myRedIcon = new BMap.Icon(markerRedImg, new BMap.Size(40, 40), {
        anchor: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
        });
        // 创建标注对象并添加到地图
        var marker1 = new BMap.Marker(point1, { icon: myIcon });
        map.addOverlay(marker1);
        var marker2 = new BMap.Marker(point2, { icon: myRedIcon });
        map.addOverlay(marker2);
        console.log("this.current_lng2",current_lng)
        // marker1.addEventListener("click", function(e) {
        //     console.log("e",e)
        //     console.log("this.current_lng",current_lng)
        //     let dis =(getDistance(current_lng,current_lat,121.506377,31.245105)/1000).toFixed(2);
        //     console.log(dis)
        //     e.isGetWords=true
        //     self.isGetWords=e.isGetWords
        //     console.log(e.isGetWords)
        //     self.computeDistance()
        // });
        marker1.addEventListener("click",this.computeDistance );
        marker2.addEventListener("click",this.showAchievement );
        
      },
      computeDistance(){
          console.log("test")
            console.log("this.current_lng",current_lng)
            let dis =(getDistance(current_lng,current_lat,121.506377,31.245105)/1000).toFixed(2);
            console.log(dis)
            this.isShowIntro=true
      },
      showAchievement(){
          this.isGetWords=true
      },
    OD(a, b, c) {
        while (a > c) a -= c - b;
        while (a < b) a += c - b;
        return a;
    },
    SD(a, b, c) {
        b != null && (a = Math.max(a, b));
        c != null && (a = Math.min(a, c));
        return a;
    },
    getDistance(a_lat,a_lng,b_lat,b_lng) {
        var a = Math.PI * OD(a_lat, -180, 180) / 180;
        var b = Math.PI * OD(b_lat, -180, 180) / 180;
        var c = Math.PI * SD(a_lng, -74, 74) / 180;
        var d = Math.PI * SD(b_lng, -74, 74) / 180;
        return 6370996.81 * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b-a));
    },
    //右上角点击事件
    RanKing(){
        this.popuPright =true;
    },
    popuPropUp(){
        this.popuProp =true;
    },
    down(){
        this.persOnal =false;
    },
    popuOpen(){
        this.persOnal =true;
    },
    popupInfo(){
        this.isInfo= true;
    }
  },
  mounted() {
    
    this.getCurrentPositionB();
    
   

    
    // var geolocationControl = new BMap.GeolocationControl();
    // geolocationControl.location();
    // var myLocation = geolocationControl.getAddressComponent();
    // console.log("myLocation",myLocation)

 //定位成功事件
    // var myKeys='';
    // var lng='';         //精度
    // var lat='';         //纬度
    // // 百度地图API功能
    // var map = new BMap.Map("map_container");
    // var point = new BMap.Point(108.95,34.27);
    // map.centerAndZoom(point,12);
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r){console.log(r.point)
    //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //         var mk = new BMap.Marker(r.point);
    //         map.addOverlay(mk);//标出所在地
    //         map.panTo(r.point);//地图中心移动
    //         //alert('您的位置：'+r.point.lng+','+r.point.lat);
    //         lng=r.point.lng;
    //         lat=r.point.lat;
    //         var point = new BMap.Point(r.point.lng,r.point.lat);    //用所定位的经纬度查找所在地省市街道等信息
    //         var gc = new BMap.Geocoder();
    //         gc.getLocation(point, function(rs){
    //            var addComp = rs.addressComponents;
    //            console.log(rs.address);//地址信息
    //            //myKeys = [rs.address];     当有其他信息时，可以定义成数组
    //             myKeys = rs.address;
    //            //alert(myKeys);         //弹出所在地址
    //            var local = new BMap.LocalSearch(map, {
    //                renderOptions:{map:map,panel:"r-result"},
    //                pageCapacity:3
    //             });
    //             local.searchInBounds(myKeys, map.getBounds());
    //         });
    //     }else {
    //         alert('failed'+this.getStatus());
    //     }        
    // },{enableHighAccuracy: true})


  }





};
</script>
<style lang="less">
@import '~vux/src/styles/close.less';
.clock-div{
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin-left: -80px;
}
.unableClock-notice{
    text-align: center;
    color: #666;
}
.ableClock-notice{
    text-align: center;
    color: orange;
}
.getwords-dialog{
    background: url(../../assets/images/partybuild/getWords.png) no-repeat;
    background-size: 100%;
    color: white;
    // height: 340px;
    width: 300px;
}
.getwords-div{
    padding-top:160px; 
}
.golden-words-long{
    color: #F8EC4C;
    font-size: 16px;
    // font-weight: 700;
    width: 260px;
    margin: 0 auto;
    text-align: left;
}
.golden-words{
    color: #F8EC4C;
    font-size: 22px;
    font-weight: 700;
    width: 200px;
    margin: 0 auto;
}
.golden-article{
    padding: 10px;
}
.location-intro{
    padding: 20px;
    text-align: left;
    background: #202020;
    color: white;
}
.location-name{
    font-size: 24px;
}
.location-dis{
    font-size: 20px;
    margin: 10px 0;
}
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
.popup2 {
  padding-bottom:15px;
  height:400px;
}
.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
}

// ---------------------
.party-container {
  height: 100%;
}
#map_container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
.bottom-circle {
  position: fixed;
  bottom: -20px;
  height: 200px;
  width: 100%;
  background: white;
  border-radius: 50%;
}
.bottom-rectangle {
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  background: white;
}
// 3个角标
.right_top_ranking{
    top: 12px;
    right: 8%;
    background: url(../../assets/images/partybuild/ranking.png) no-repeat;
}
.right_bot_rules{
    bottom: 12px;
    right: 8%;
    background: url(../../assets/images/partybuild/rules.png) no-repeat;
}
.left_bot_personal{
    bottom: 12px;
    left: 8%;
    background: url(../../assets/images/partybuild/personal.png) no-repeat;
}
.left_top_info{
    top: 12px;
    left: 8%;
    background: url(../../assets/images/partybuild/info.png) no-repeat;
}
.corner-icon{
    width: 13%;
    height:  8%;
    position: fixed;
    background-size: 100%;
    min-width: 42px;
    min-height: 42px;
    max-width: 42px;
    max-height:42px;
    z-index: 1;
}
// 右框
.mint-popup-right{
    height: 100%;
    width: 85%;
    background:rgba(0,0,0,0.6);
}
.v-modal{
    background: #fff;
}
.popuPright_titl{
    font-size: 20px;
    color: #FFFFFF;
    width: 100%;
   
    line-height:87px;
   
}
.popuPright_titl p{
    float: left;
    margin-left: 25%;
}
.popuPright_titl span{
     float: left;
    width: 40px;
    height: 40px;
     background: url(../../assets/images/partybuild/ranking.png) no-repeat ;
    background-size: 40px;
    margin-top: 24px;
    margin-left: 14px
}
.popuPright_List{
    width: 80%;
    float: right;
    overflow: hidden;
}
.popuPright_List span{
    float: left;
    line-height: 40px;
    text-align: left;
    color: #fff;
    font-size: 14px
}
.popuPright_List span:nth-child(odd){
    width: 30%;
}
.popuPright_List span:nth-child(even){
    width: 20%;
}
.poRight_List{
    width: 100%;
    float: right;
    overflow: hidden;
}

.poRight_List span{
    float: left;
    line-height: 40px;
    height: 40px;
    text-align: left;
    color: #fff;
    font-size: 14px
}
.poRight_List span:nth-child(odd){
    width: 15%;
}
.poRight_List span:nth-child(even){
    width: 25%;
}
.poRight_List span:nth-child(1){
    width: 20%;
}
.poRight_List img{
    padding-left: 20px;
    padding-top: 6px;
}
// 下右框
#popuPro .vux-popup-dialog {
  width: 80%;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  margin: 0 auto;
  background:none
}
.rules{
    width: 100%;
    margin: 0 auto;
    background: url(../../assets/images/partybuild/rules_bk.png) no-repeat ;
    background-size: 100%;
    padding-top: 50%;
    padding-bottom: 5%;
    margin-top: 20%;
   
}
.rules_ovf{
    height: 240px;
    overflow-y: auto
}
.rules p{
     width: 90%;
    margin: 0 auto;
    font-size: 14px;
    text-indent: 2em;
}
// 左下
.personal_bk{
     width: 100%;
    margin: 0 auto;
    background:#fff url(../../assets/images/partybuild/personal_bk.png) no-repeat ;
    background-size: 100% 200px;
    position: relative;
}
.persFalse{
    position: absolute;
    right: 15px;
    top: 10px;
    width: 35px;
    height: 35px;
}
.persFalse img{
    display: block;
    width: 100%;
}
.persName{
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
}
.persHead{
    width: 120px;
    height: 120px;
    margin: 0 auto;
}
.persHead img{
    display: block;
    width: 100%;
}
.persKn{
    width: 90%;
    margin: 0 auto;
    border:1px dashed #D09292;
    margin-top: 15px
}
.weui-cell .vux-cell-primary{
     -webkit-box-flex: inherit; 
     -webkit-flex: inherit; 
     flex: inherit; 
     display:block;
    /* width: 150px; */
    overflow: hidden;
    float: left;
    margin-right: 10px
}
.persKn_jg{
    height:400px;
    overflow-y:auto;
    padding-bottom: 10px
}
.persKn_j{
    padding-bottom: 12px
}
.persKn_j p{
    padding-left: 40px;
    line-height: 25px;
    margin-top: 5px;
    padding-right: 8px
}
.vux-label{
    font-size: 18px;
}
 .wordsClass{
     color: #000;
 }
 .wordsClis{
     color: #ccc
 }
</style>