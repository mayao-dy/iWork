<template>
<div class="party-container">
    <!-- <div v-if="isloading" style="padding-top: 200px;text-align: center;width: 100%;color: #999;">
      <inline-loading></inline-loading>
    </div>
    <div v-if="!isloading"> -->
      <!-- <div v-if="!containerSeen" style="padding-top: 200px;text-align: center;color: #999;width: 100%;">进入失败,请重新进入！</div> -->
      <!-- <div v-if="containerSeen"> -->
          <div id="map_container"></div>
        <div class="bottom-circle"></div>
          <div class="bottom-rectangle"></div>
          <!-- <div class="bottom-white">
              <img src="../../assets/images/partybuild/bottom-white.png">
          </div> -->
          <div class="marquee-div" v-show="eventList_marquee.length!=0">
              <marquee>
                  <marquee-item v-for="(item,index) in eventList_marquee" :key="index" @click.native="getClockEvent(10)" class="align-middle">{{item.userName}}{{item.event}}</marquee-item>
              </marquee>
          </div>

          <!-- 4个角标 -->
          <div class="right_top_ranking corner-icon" @click="getClockRank"></div>
          <div class="right_bot_rules corner-icon" @click="getRules"></div>
          <div class="left_bot_personal corner-icon" @click="getAchievement"></div>
          <div class="left_top_info corner-icon" @click="getClockEvent(10)"></div>
          <!-- /4个角标结束 -->
          <!-- 打卡图标 -->
          <div class="clock-div">
              <img v-if="!isAbleClock" src="../assets/images/partybuild/unableClock.png">  
              <img v-if="isAbleClock" src="../assets/images/partybuild/ableClock.png" @click="postClockPlace">  
              <div v-if="!isAbleClock" class="unableClock-notice">当前范围不可打卡</div>
              <div v-if="isAbleClock" class="ableClock-notice">当前范围可打卡</div>
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
              <div class="persFalse" @click="persdown">
                        <img src="../assets/images/partybuild/false.png">
              </div>
              <div class="poRight_List">
                  <span></span>
                  <span>姓名</span>
                  <span>打卡</span>
                  <!-- <span>耗时</span> -->
                  <span>文章</span>
              </div>
              <div class="poRight_List" :key="index" v-for="(item, index) in rankingList">
                  <span>
                      <img v-if="item.rank==1" src="../assets/images/partybuild/first.png">  
                      <img v-if="item.rank==2" src="../assets/images/partybuild/second.png"> 
                      <img v-if="item.rank==3" src="../assets/images/partybuild/third.png">  
                  </span>
                  <span>{{item.userName}}</span>
                  <span>{{item.clocked}}点</span>
                  <span>{{item.completedArt}}篇</span>
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
            <div v-transfer-dom id="popuProe">
            <popup v-model="persOnal">
                <div class="personal_bk">
                    <div class="persFalse" @click="down">
                        <img src="../assets/images/partybuild/false.png">
                    </div>
                    <div class="persName">
                        {{userName}}
                    </div>
                    <div class="persHead">
                        <img :src="headUrl">  
                    </div>
                    <div class="persKn_jg">
                          <div class="persKn" v-for="(article,index) in articleList" :key="index" v-show="index!=party-1">
                              <div class="perPofix" v-show="article.getNum==article.totalNum"> </div>
                              <!-- <div>{{article.article}}</div> -->
                              <div class="persKn_x">
                                  <cell :title="article.article ">
                                      <rater v-model="article.getNum" :max="article.totalNum" active-color="#FE8B12" disabled></rater>
                                  </cell>
                              </div>
                              <div class="persKn_j">
                                  <p v-for="(wordsList,index) in article.wordsList"  :key="index" :class="wordsList.isGet ? 'wordsClass':'wordsClis'">
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
                      <!-- <img src="../assets/images/partybuild/getWords.png"> -->
                      <div class="getwords-div">
                          <div>恭喜你！{{select_place}}打卡成功</div>
                          <div>获得金句</div>
                          <div class="golden-words" v-if="!select_long">{{select_words}}</div>
                          <div class="golden-words-long" v-if="select_long">使命愿景：汇聚资本力量，服务实体经济，服务投资大众，服务发展大局；有效维护市场公开公平公正，有效配置国内国际资源，有效防范市场风险；建设成为安全高效，功能完备，与我国社会主义现代化强国相匹配的世界领先交易所。</div>
                          <div class="golden-article">——《{{select_article}}》</div>
                      </div>
                  </div>
              </x-dialog>
          </div>
          <!-- 打卡成功弹框结束 -->
          <!-- 未打卡弹框 -->
          <div v-transfer-dom>
              <x-dialog v-model="isShowIntro" :hide-on-blur="true">
                  <div class="location-intro">
                      <div class="location-name">{{select_place}}</div>
                      <div class="location-dis">离我{{distance}}公里</div>
                      <div>{{select_details}}</div>
                  </div>
              </x-dialog>
          </div>
          <!-- 未打卡弹框结束 -->
          <!-- 推送消息弹框 -->
          <div v-transfer-dom>
              <x-dialog v-model="isInfo" :hide-on-blur="true">
                  <div class="location-intro">
                      <div :key="index" v-for="(item, index) in eventList">{{item.eventTime}}<br>{{item.userName}}{{item.event}}！</div>
                  </div>
              </x-dialog>
          </div>
          <!-- 推送消息弹框结束 -->
          <!-- 全部打卡结束 -->
                  <div v-transfer-dom>
              <x-dialog v-model="isShowEnd" :hide-on-blur="true" class="end">
                  <div class="location-end">
                    <p>
                        恭喜你<br>获得本次活动的大满贯
                    </p>
                  </div>
              </x-dialog>
          </div>
          <!-- /全部打卡结束 -->
      <!-- </div> -->
    <!-- </div> -->
</div>
</template>

<script>
import markerImg from "../../static/marker.png";
import markerRedImg from "../../static/marker_red.png";
import { queryURL, _tokenParams, _username } from "../utils/index.js";
import "../utils/GeoUtils.js";
import {
  TransferDom,
  Popup,
  Group,
  Cell,
  XButton,
  XSwitch,
  Toast,
  XAddress,
  ChinaAddressData,
  XDialog,
  InlineLoading,
  Loading 
} from "vux";
import { Rater, Range } from "vux";
import { Marquee, MarqueeItem } from "vux";
import {
  getClockPlaceAll,
  getClockedPlace,
  getClockRank,
  getClockEvent,
  postClockPlace,
  handleLogin
} from "../api/partyBuilding/index";
import { setInterval } from "timers";
var self = this;
var current_lng = 0;
var current_lat = 0;

var CryptoJS = require("crypto-js");

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);

// console.log("--------------------",plaintext);

// const crypto = require('crypto');

// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

// var data = 'test';
// var key = 'yaoma';
// var encrypted = aesEncrypt(data, key);
// var decrypted = aesDecrypt(encrypted, key);

// console.log('Plain text: ' + data);
// console.log('Encrypted text: ' + encrypted);
// console.log('Decrypted text: ' + decrypted);

// function encrypt (message, key) {
//     var keyHex = CryptoJS.enc.Utf8.parse(key);
//      var encrypted = CryptoJS.AES.encrypt(message, keyHex, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return {
//         key: keyHex,
//         value: encrypted.toString()
//     }
// }

// function decrypt (message, key) {
//     var plaintext = CryptoJS.AES.decrypt(message, key, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     })
//     return plaintext.toString(CryptoJS.enc.Utf8)
// }

// var a = encrypt('test', 'yaoma');
// var b = decrypt(a.value, a.key);

// console.log("_______________",a.value)

// 定义加/解密的 key(key都放这里了, 加密还有啥意义!^_^)
const initKey = "yaoma";
// 设置数据块长度
const keySize = 128;

/**
 * 生成密钥字节数组, 原始密钥字符串不足128位, 补填0.
 * @param {string} key - 原始 key 值
 * @return Buffer
 */
const fillKey = key => {
  const filledKey = Buffer.alloc(keySize / 8);
  const keys = Buffer.from(key);
  if (keys.length < filledKey.length) {
    filledKey.map((b, i) => (filledKey[i] = keys[i]));
  }

  return filledKey;
};

/**
 * 定义加密函数
 * @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data);
 * @param {string} key - 加密使用的 key
 */
const aesEncrypt = (data, key) => {
  /**
   * CipherOption, 加密的一些选项:
   *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
   *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
   *   iv: 偏移量, mode === ECB 时, 不需要 iv
   * 返回的是一个加密对象
   */
  const cipher = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    iv: ""
  });
  // 将加密后的数据转换成 Base64
  const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
  // 处理 Android 某些低版的BUG
  const resultCipher = base64Cipher.replace(/\+/g, "-").replace(/\//g, "_");
  // 返回加密后的经过处理的 Base64
  return resultCipher;
};

/**
 * 定义解密函数
 * @param {string} encrypted - 加密的数据;
 * @param {string} key - 加密使用的 key
 */
const aesDecrypt = (encrypted, key) => {
  // 先将 Base64 还原一下, 因为加密的时候做了一些字符的替换
  const restoreBase64 = encrypted.replace(/\-/g, "+").replace(/_/g, "/");
  // 这里 mode, padding, iv 一定要跟加密的时候完全一样
  // 返回的是一个解密后的对象
  const decipher = CryptoJS.AES.decrypt(restoreBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    iv: ""
  });
  // 将解密对象转换成 UTF8 的字符串
  const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
  // 返回解密结果
  return resultDecipher;
};
// 获取填充后的key
const key = CryptoJS.enc.Utf8.parse(fillKey(initKey));

// 定义需要加密的数据
const data = "test";
// 调用加密函数
const encrypted = aesEncrypt(data, key);
// 调用解密函数
const decrypted = aesDecrypt(encrypted, key);
// 控制台输出查看结果
console.log("加密结果: ", encrypted);
console.log("解密结果: ", decrypted);
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
    XDialog,
    Marquee,
    MarqueeItem,
    InlineLoading,
    Loading 
  },
  data() {
    return {
      isloading: false,
      containerSeen: true,
      userId: "yaoma@sse.com.cn",
      userName: "",
      headUrl: "",
      map: new BMap.Map("map_container"),
      refreshLocation: "",
      refreshInfo: "",
      isInfo: false,
      isShowIntro: false,
      isGetWords: false,
      current_point: {},
      current_lng: 0,
      current_lat: 0,
      isShowEnd: false,
      popuPright: false,
      popuProp: false,
      data41: 4,
      persOnal: false,
      party: 8,
      distance: 0,
      select_place: "",
      select_details: "",
      select_words: "",
      select_article: "",
      select_long: false, //是否长句
      isAbleClock: false, //是否可打卡
      pointList: [], //打卡点数组
      eventList: [], //事件数组
      eventList_marquee: [], //滚动事件数组
      lasted_place: "", //最近的点
      rankingList: [],
      locationInfo: [
        {
          place: "上海东方体育中心",
          isClock: false, //是否打过卡
          longitude: 121.48398131132126, //经度
          latitude: 31.161853061389003, //纬度
          point: new BMap.Point(121.48398131132126, 31.161853061389003),
          artNo: 1, //文章id
          artField: 101, //句子id
          details:
            "上海东方体育中心，别名“海上皇冠”，原名上海水上竞技中心，位于上海浦东新区，以水上项目为主的综合性体育场馆。共包括一座1.5万人的主体育馆，5千人的游泳馆和5千人的室外跳水池，总投资约20亿元人民币，于2010年底竣工，该场馆将主要为2011年上海世界游泳锦标赛服务。" //详情
        },
        {
          place: "佘德耀美术馆",
          isClock: false, //是否打过卡
          longitude: 121.4683386683464, //经度
          latitude: 31.176691319055777, //纬度
          point: new BMap.Point(121.4683386683464, 31.176691319055777),
          artNo: 1, //文章id
          artField: 102, //句子id
          details:
            "余德耀美术馆坐落于“西岸文化走廊”，东临滨江的龙腾大道，北依丰谷路，由原龙华机场的大机库改建而成。总面积9000多平米的建筑中，老机库改建的主展厅就占了3000多平米，其特有的 巨大空间与张扬的结构感，与余先生以装置为主的藏品相得益彰。" //详情
        },
        {
          place: "光启龙华港湾",
          isClock: false, //是否打过卡
          longitude: 121.46826356649399, //经度
          latitude: 31.183048399723397, //纬度
          point: new BMap.Point(121.46826356649399, 31.183048399723397),
          artNo: 1, //文章id
          artField: 103, //句子id
          details:
            " 为了配合世博会在浦西这边新建的“滨江大道” ，夜晚的光启龙华港湾一定要看看，远可遥望浦东灯火，近可叹彩虹桥之风采。被称为“龙之脊”的龙华港桥两侧种植了许多桃花，春天可以来这里看桃花" //详情
        },
        {
          place: "龙美术馆西岸馆",
          isClock: false, //是否打过卡
          longitude: 121.4713642001152, //经度
          latitude: 31.19030023696027, //纬度
          point: new BMap.Point(121.4713642001152, 31.19030023696027),
          artNo: 1, //文章id
          artField: 104, //句子id
          details:
            " 4月中旬前到龙美术馆，额外附送免费樱花景观哟，位于西岸核心位置的龙美术馆西岸馆，是不可错过的标志性建筑，龙美散发着刚柔并济，蕴旧预新的博大之美。西岸馆常规展出一些现当代的艺术品，同期还会推出特别展览；展馆设计非常有现代感，工业感，馆内空间大，常常有大型艺术品展出。" //详情
        },
        {
          place: "上海绿地万豪酒店",
          isClock: false, //是否打过卡
          longitude: 121.47933572530746, //经度
          latitude: 31.197957629582632, //纬度
          point: new BMap.Point(121.47933572530746, 31.197957629582632),
          artNo: 2, //文章id
          artField: 201, //句子id
          details:
            "上海绿地万豪酒店坐落于黄浦江边，为卢湾区新建的CBD中心地段，结合滨江公园、大型商场及办公大楼，是商务和休闲的理想场所。酒店邻近浦西世博园区及打浦路隧道，交通便利且闹中取静,可欣赏美丽的黄浦江日景和夜晚的浦东灯火，上海的独特景色在此尽收眼底。" //详情
        },
        {
          place: "上海世博园",
          isClock: false, //是否打过卡
          longitude: 121.49081021547318, //经度
          latitude: 31.192333083330062, //纬度
          point: new BMap.Point(121.49081021547318, 31.192333083330062),
          artNo: 2, //文章id
          artField: 202, //句子id
          details:
            "  2010年上海世博会场地位于南浦大桥和卢浦大桥之间，沿着上海城区黄浦江两岸进行布局，随着2010年上海世博会的落幕，世博园保留了标志性的“一轴四馆”，  漫步世博园，可以看到奔流不息的黄浦江以及江对面的绿地广场。还可以拍到中华艺术宫，南浦大桥和卢浦大桥。" //详情
        },
        {
          place: "梅赛德斯奔驰文化中心",
          isClock: false, //是否打过卡
          longitude: 121.49985462427139, //经度
          latitude: 31.194376068584482, //纬度
          point: new BMap.Point(121.49985462427139, 31.194376068584482),
          artNo: 2, //文章id
          artField: 203, //句子id
          details:
            "滨江而筑的梅赛德斯-奔驰文化中心以其穿梭腾飞的姿态傲立于2010年上海世博会园区的核心区域，毗邻世博轴与中国馆。整座建筑以其轻盈灵动，宛若飞碟般的独特造型横空出世，犹如一枚“艺海贝壳”，美艳耀世。中心拥有一个18,000座的主场馆，以及音乐俱乐部、电影院、溜冰场、餐厅、零售区域。" //详情
        },
        {
          place: "上海企业联合馆",
          isClock: false, //是否打过卡
          longitude: 121.49473160505295, //经度
          latitude: 31.201389642032375, //纬度
          point: new BMap.Point(121.49473160505295, 31.201389642032375),
          artNo: 2, //文章id
          artField: 204, //句子id
          details:
            "上海企业联合馆（Shanghai Corporate Pavilion）昵称“魔方”，是由上海市国资委下属的近40家大中型国有企业联合出资建造，一个具有智能技术、梦幻意境和互动体验的生态环保建筑。其建筑风格、设计理念、环保应用、布展方式、娱乐体验和市民的参与都将魔幻地展现上海的未来。" //详情
        },
        {
          place: "上海儿童艺术剧场",
          isClock: false, //是否打过卡
          longitude: 121.50056809186935, //经度
          latitude: 31.202281863880465, //纬度
          point: new BMap.Point(121.50056809186935, 31.202281863880465),
          artNo: 3, //文章id
          artField: 301, //句子id
          details:
            "上海儿童艺术剧场是全国最大的儿童剧场，原为上海世博会上汽集团-通用汽车馆，改建后于2013年6月1日正式启用。剧场位于西藏南路苗江路口黄浦江畔，占地面积10528平方米，建筑面积15668平方米。剧场致力于营造理念先进、特色鲜明的儿童性、公益性、标志性、国际性视觉艺术体验中心。" //详情
        },
        {
          place: "云餐厅（世博店）",
          isClock: false, //是否打过卡
          longitude: 121.50545507669449, //经度
          latitude: 31.20650724405308, //纬度
          point: new BMap.Point(121.50545507669449, 31.20650724405308),
          artNo: 3, //文章id
          artField: 302, //句子id
          details:
            "以玻璃房为主装修基调的云餐厅，位于原世博城市未来馆，这幢历经风雨的建筑原是老上海的发电厂，见证了上海半个多世纪的历史变迁。偶尔的某个周末，还能听到用餐的老人向晚辈讲诉自己的记忆。立于云餐厅面向浦江的露台之上，这里曾是俯瞰世博全景的绝佳去处。" //详情
        },
        {
          place: "上海世博洲际酒店",
          isClock: false, //是否打过卡
          longitude: 121.51175826787949, //经度
          latitude: 31.20505484882878, //纬度
          point: new BMap.Point(121.51175826787949, 31.20505484882878),
          artNo: 1, //文章id
          artField: 1, //句子id
          details:
            "上海世博洲际酒店坐落于黄浦江畔，毗邻南浦大桥，值得一提的是，伫立于花园之中的9栋独立的上世纪30年代的历史别墅建筑，其前身是中国酒精厂，后改建成为上海溶剂厂。它们似乎在诉说着昔日上海的繁华与传奇，徜徉其中，仿佛穿越了时空感受着上海的过去与现在。" //详情
        },
        {
          place: "老码头",
          isClock: false, //是否打过卡
          longitude: 121.51378601789474, //经度
          latitude: 31.222828313598065, //纬度
          point: new BMap.Point(121.51378601789474, 31.222828313598065),
          artNo: 1, //文章id
          artField: 1, //句子id
          details:
            " “老码头”是原来的十六铺，有着最上海的传奇。这里的临江弄堂、老式石库门群落流传着上海滩大亨们的故事。闲坐屋顶的欧式露台，看黄浦江江水滔滔，楼下曾是黄金荣、杜月笙的仓库。如今，老码头将更好地融合上海这座城市的艺术、文化 、商业与风尚，呈现给世人别具一格的海派风情。" //详情
        },
        {
          place: "上海外滩英迪格酒店",
          isClock: false, //是否打过卡
          longitude: 121.50660842657089, //经度
          latitude: 31.23185445564647, //纬度
          point: new BMap.Point(121.50660842657089, 31.23185445564647),
          artNo: 1, //文章id
          artField: 1, //句子id
          details:
            " 英迪格酒店，位于外滩南端的十六铺码头，坐拥浦江两岸传统与现代幷蓄的秀丽风光，兼收并蓄，完美融合了真实现代的设计特点与传统的中国元素，在创造灵动有趣的环境同时，又巧妙地将与众不同的现代本土化家居装饰带入设计之中。" //详情
        }
      ],
      articleList: [
        {
          articleID: 1,
          article: "四个意识",
          totalNum: 4,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "政治意识",
              isGet: false
            },
            {
              wordsID: 2,
              words: "大局意识",
              isGet: false
            },
            {
              wordsID: 3,
              words: "核心意识",
              isGet: false
            },
            {
              wordsID: 4,
              words: "看齐意识",
              isGet: false
            }
          ]
        },
        {
          articleID: 2,
          article: "四个自信",
          totalNum: 4,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "道路自信",
              isGet: false
            },
            {
              wordsID: 2,
              words: "理论自信",
              isGet: false
            },
            {
              wordsID: 3,
              words: "制度自信",
              isGet: false
            },
            {
              wordsID: 4,
              words: "文化自信",
              isGet: false
            }
          ]
        },
        {
          articleID: 3,
          article: "'五位一体'总体布局",
          totalNum: 5,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "经济建设",
              isGet: false
            },
            {
              wordsID: 2,
              words: "政治建设",
              isGet: false
            },
            {
              wordsID: 3,
              words: "文化建设",
              isGet: false
            },
            {
              wordsID: 4,
              words: "社会建设",
              isGet: false
            },
            {
              wordsID: 5,
              words: "生态文明建设",
              isGet: false
            }
          ]
        },
        {
          articleID: 4,
          article: "'四个全面'战略布局",
          totalNum: 4,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "全面建成小康",
              isGet: false
            },
            {
              wordsID: 2,
              words: "全面深化改革",
              isGet: false
            },
            {
              wordsID: 3,
              words: "全面依法治国",
              isGet: false
            },
            {
              wordsID: 4,
              words: "全面从严治党",
              isGet: false
            }
          ]
        },
        {
          articleID: 5,
          article: "四个伟大",
          totalNum: 4,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "进行伟大斗争",
              isGet: false
            },
            {
              wordsID: 2,
              words: "建设伟大工程",
              isGet: false
            },
            {
              wordsID: 3,
              words: "推进伟大事业",
              isGet: false
            },
            {
              wordsID: 4,
              words: "实现伟大梦想",
              isGet: false
            }
          ]
        },
        {
          articleID: 6,
          article: "党的六大纪律",
          totalNum: 6,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "政治纪律",
              isGet: false
            },
            {
              wordsID: 2,
              words: "组织纪律",
              isGet: false
            },
            {
              wordsID: 3,
              words: "廉洁纪律",
              isGet: false
            },
            {
              wordsID: 4,
              words: "群众纪律",
              isGet: false
            },
            {
              wordsID: 5,
              words: "工作纪律",
              isGet: false
            },
            {
              wordsID: 6,
              words: "生活纪律",
              isGet: false
            }
          ]
        },
        {
          articleID: 7,
          article: "上交所文化价值体系",
          totalNum: 3,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words: "价值口号：至诚至公 全球融通 建世界领先交易所",
              isGet: false
            },
            {
              wordsID: 2,
              words:
                "使命愿景：汇聚资本力量，服务实体经济，服务投资大众，服务发展大局；有效维护市场公开公平公正，有效配置国内国际资源，有效防范市场风险；建设成为安全高效，功能完备，与我国社会主义现代化强国相匹配的世界领先交易所。",
              isGet: false
            },
            {
              wordsID: 3,
              words: "核心价值观：高效、透明、稳健  服务、进取、奉献",
              isGet: false
            }
          ]
        },
        {
          articleID: 8,
          article: "入党誓词",
          totalNum: 1,
          getNum: 0,
          wordsList: [
            {
              wordsID: 1,
              words:
                "我志愿加入中国共产党，拥护党的纲领，遵守党的章程，履行党员义务，执行党的决定，严守党的纪律，保守党的秘密，对党忠诚，积极工作，为共产主义奋斗终身，随时准备为党和人民牺牲一切，永不叛党。",
              isGet: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    initMap() {
      let that = this;
      // 百度地图定位功能
      var map = new BMap.Map("map_container");
      var point = new BMap.Point(121.509213, 31.21252);
      map.centerAndZoom(point, 12);
      window.map = map; //将map变量存储在全局
      map.setZoom(13);
      map.enableScrollWheelZoom(); //启用地图滚轮放大缩小

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            //map.panTo(r.point);

            //alert('您的位置：'+r.point.lng+','+r.point.lat);
            that.current_point = r.point;

            console.log("r.point", that.current_point);
            that.current_lng = r.point.lng;
            that.current_lat = r.point.lat;
            // that.current_point = new BMap.Point(
            //   121.51175826787949,
            //   31.20505484882878
            // );
            // console.log("that.current_point", that.current_point);
            // that.current_lng = that.current_point.lng;
            // that.current_lat = that.current_point.lat;
            that.setCheckPosition(map);
          } else {
            alert("failed" + this.getStatus());
          }
          // 隐藏
          that.$vux.loading.hide()
        },
        { enableHighAccuracy: true }
      );
      
      //this.getCurrentPositionB(map);
      this.refreshLocation = setInterval(() => {
        this.getCurrentPositionB(map);
      }, 30000);
    },
    getCurrentPositionB(map) {
      let that = this;
      // // 百度地图定位功能
      // var map = new BMap.Map("map_container");
      // var point = new BMap.Point(121.509213, 31.21252);
      // map.centerAndZoom(point, 12);
      // window.map = map; //将map变量存储在全局
      // map.setZoom(13);
      // map.enableScrollWheelZoom(); //启用地图滚轮放大缩小

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            // map.panTo(r.point);

            //alert('您的位置：'+r.point.lng+','+r.point.lat);
            that.current_point = r.point;

            console.log("r.point", that.current_point);
            that.current_lng = r.point.lng;
            that.current_lat = r.point.lat;
            // that.current_point = new BMap.Point(
            //   121.51175826787949,
            //   31.20505484882878
            // );
            // console.log("that.current_point", that.current_point);
            // that.current_lng = that.current_point.lng;
            // that.current_lat = that.current_point.lat;
            //that.setCheckPosition(map);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
      //console.log("map1", map);
      
      //this.setCheckPosition(map);
    },
    setCheckPosition(map) {
      //onsole.log("map2", map);

      let that = this;
      // var point1 = new BMap.Point(121.506377, 31.245105);
      // var point2 = new BMap.Point(121.509213, 31.21252);
      // var point1 = new BMap.Point(121.48398131132126, 31.161853061389003);//上海东方体育中心
      // var point2 = new BMap.Point(121.4683386683464, 31.176691319055777);//佘德耀美术馆
      // var point3 = new BMap.Point(121.46826356649399, 31.183048399723397);//光启龙华港湾
      // var point4 = new BMap.Point(121.4713642001152, 31.19030023696027);//龙美术馆西岸馆
      // var point5 = new BMap.Point(121.47933572530746, 31.197957629582632);//上海绿地万豪酒店
      // var point6 = new BMap.Point(121.49081021547318, 31.192333083330062);//上海世博园
      // var point7 = new BMap.Point(121.49985462427139, 31.194376068584482);//梅赛德斯奔驰文化中心
      // var point8 = new BMap.Point(121.49473160505295, 31.201389642032375);//上海企业联合馆
      // var point9 = new BMap.Point(121.50056809186935, 31.202281863880465);//上海儿童艺术剧场
      // var point10 = new BMap.Point(121.50545507669449, 31.20650724405308);//云餐厅（世博店）
      // var point11 = new BMap.Point(121.51175826787949, 31.20505484882878);//上海世博洲际酒店
      // var point12 = new BMap.Point(121.51378601789474, 31.222828313598065);//老码头
      // var point13 = new BMap.Point(121.50660842657089, 31.23185445564647);//上海外滩英迪格酒店

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

      let mark = 0; //用于表示是否有点可打卡
      // 创建标注对象并添加到地图
      for (let i = 0; i < this.locationInfo.length; i++) {
        if (this.locationInfo[i].isClock == false) {
          //未打卡
          this.pointList[i] = new BMap.Marker(this.locationInfo[i].point, {
            icon: myIcon
          });
          //添加打卡点点击事件
          this.pointList[i].addEventListener("click", function() {
            that.select_place = that.locationInfo[i].place;
            that.select_details = that.locationInfo[i].details;
            that.computeDistance(that.locationInfo[i].point, map);
          });
        } else {
          //已打卡
          this.pointList[i] = new BMap.Marker(this.locationInfo[i].point, {
            icon: myRedIcon
          });
          //添加打卡点点击事件
          this.pointList[i].addEventListener("click", function() {
            that.select_place = that.locationInfo[i].place;
            that.select_words = that.locationInfo[i].artNo;
            that.select_article = that.locationInfo[i].artField;
            that.showAchievement(that.locationInfo[i].point, map);
          });
        }
        map.addOverlay(this.pointList[i]);
        //判断点是否在打卡范围
        var circle = new BMap.Circle(this.current_point, 200, {
          fillColor: "",
          strokeWeight: 0,
          fillOpacity: 0,
          strokeOpacity: 0
        });
        if (BMapLib.GeoUtils.isPointInCircle(this.pointList[i].point, circle)) {
          mark++;
          console.log("近的点", this.locationInfo[i].place);
          this.lasted_place = this.locationInfo[i].place;
          console.log("在圆形区域内");
        } else {
          console.log("不在圆形区域内");
        }
      }
      if (mark > 0) {
        this.isAbleClock = true;
      } else {
        this.isAbleClock = false;
      }
      //console.log("this.pointList", this.pointList);
      // if(this.locationInfo[0].isClock==false){
      //     var marker1 = new BMap.Marker(this.locationInfo[0].point, { icon: myIcon });
      // }else{
      //     var marker1 = new BMap.Marker(this.locationInfo[0].point, { icon: myRedIcon });
      // }
      // map.addOverlay(marker1);
      // var marker2 = new BMap.Marker(point2, { icon: myRedIcon });
      // map.addOverlay(marker2);

      // var marker3 = new BMap.Marker(point3, { icon: myIcon });
      // map.addOverlay(marker3);

      // var marker4 = new BMap.Marker(point4, { icon: myIcon });
      // map.addOverlay(marker4);
      // var marker5 = new BMap.Marker(point5, { icon: myIcon });
      // map.addOverlay(marker5);
      // var marker6 = new BMap.Marker(point6, { icon: myIcon });
      // map.addOverlay(marker6);
      // var marker7 = new BMap.Marker(point7, { icon: myIcon });
      // map.addOverlay(marker7);
      // var marker8 = new BMap.Marker(point8, { icon: myIcon });
      // map.addOverlay(marker8);
      // var marker9 = new BMap.Marker(point9, { icon: myIcon });
      // map.addOverlay(marker9);

      // var marker10 = new BMap.Marker(point10, { icon: myIcon });
      // map.addOverlay(marker10);
      // var marker11 = new BMap.Marker(point11, { icon: myIcon });
      // map.addOverlay(marker11);
      // var marker12 = new BMap.Marker(point12, { icon: myIcon });
      // map.addOverlay(marker12);
      // var marker13 = new BMap.Marker(point13, { icon: myIcon });
      // map.addOverlay(marker13);

      //console.log("this.current_lng2",current_lng)
      // marker1.addEventListener("click",this.computeDistance );
      // marker2.addEventListener("click",this.showAchievement );
      // marker3.addEventListener("click",this.computeDistance );
      // marker4.addEventListener("click",this.showAchievement );
      // marker5.addEventListener("click",this.computeDistance );
      // marker6.addEventListener("click",this.showAchievement );
      // marker7.addEventListener("click",this.computeDistance );
      // marker8.addEventListener("click",this.showAchievement );
      // marker9.addEventListener("click",this.computeDistance );
      // marker10.addEventListener("click",this.showAchievement );
      // marker11.addEventListener("click",this.computeDistance );
      // marker12.addEventListener("click",this.showAchievement );
      // marker13.addEventListener("click",this.showAchievement );
    },
    computeDistance(point, map) {
      //this.distance =(getDistance(current_lng,current_lat,des_lng,des_lat)/1000).toFixed(2);
      this.distance = (
        map.getDistance(this.current_point, point) / 1000
      ).toFixed(2);
      //console.log("dis", this.distance);
      this.isShowIntro = true;
    },
    showAchievement() {
      this.isGetWords = true;
    },
    //右上角点击事件
    getClockRank() {
      this.popuPright = true;
      getClockRank()
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.rankingList = data.resultData;
        });
    },
    getRules() {
      this.popuProp = true;
    },
    down() {
      this.persOnal = false;
    },
    getAchievement() {
      this.persOnal = true;
      getClockedPlace(this.userId)
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (this.isShowEnd != true) {
            let clockedList = data.resultData.clockInfos;
            this.articleList.forEach(x => {
              x.getNum = 0;
            });
            clockedList.forEach(x => {
              this.articleList[x.artNo - 1].wordsList[
                x.artContentNo - 1
              ].isGet = true;
              this.articleList[x.artNo - 1].getNum++;
            });
          } else {
            //若大满贯则点亮所有句子
            this.articleList.forEach(x => {
              x.getNum = x.totalNum;
              x.wordsList.forEach(y => {
                y.isGet = true;
              });
            });
            this.party = 9;
          }
        });
    },
    getClockEvent(top) {
      this.isInfo = true;
      getClockEvent(top)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.eventList = data.resultData;
        });
    },
    getClockEventMarquee() {
      getClockEvent(5)
        .then(res => {
          return res.data;
        })
        .then(data => {
          this.eventList_marquee = data.resultData.splice(0, 3);
        });
    },
    persdown() {
      this.popuPright = false;
    },
    getClockedPlace() {
      getClockedPlace(this.userId)
        .then(res => {
          return res.data;
        })
        .then(data => {
          let clockedList = data.resultData.clockInfos;
          clockedList.forEach(x => {
            this.locationInfo.map(y => {
              if (x.place == y.place) {
                y.isClock = true;
                y.artField = this.articleList[x.artNo - 1].article;
                y.artNo = this.articleList[x.artNo - 1].wordsList[
                  x.artContentNo - 1
                ].words;
              }
            });
          });
          //console.log("this.locationInfo", this.locationInfo);
        });
    },
    postClockPlace() {
      this.isAbleClock = false;
      let userId = this.userId;
      let place = this.lasted_place;
      let longitude = this.current_lng.toFixed(6);
      let latitude = this.current_lat.toFixed(6);
      postClockPlace(userId, place, longitude, latitude)
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.errCode == 0) {
            this.select_place = data.resultData.place;
            this.select_words = this.articleList[
              data.resultData.artNo - 1
            ].wordsList[data.resultData.artContentNo - 1].words;
            this.select_article = this.articleList[
              data.resultData.artNo - 1
            ].article;
            if (data.resultData.isAllAct == 0) {
              this.showAchievement();
              this.getCurrentPositionB();
              this.getClockedPlace();
            } else {
              this.isShowEnd = true;
            }
          } else {
            this.$vux.alert.show({
              content: data.errMsg,
              title: "打卡失败！"
            });
          }
          this.isAbleClock = true;
        });
    },
    handleLogin() {
      const code = queryURL("code");
      //alert("islogining");
      if (code) {
        handleLogin(code)
          .then(res => {
            return res.data;
          })
          .then(data => {
            //alert(data.errCode);
            if (data.errCode == 0) {
              sessionStorage.setItem("code", code);
              sessionStorage.setItem("userId", data.resultData.userId || "");
              sessionStorage.setItem("userName", data.resultData.name || "");
              sessionStorage.setItem("headUrl", data.resultData.headUrl || "");

              this.userId=data.resultData.userId;
              this.userName=data.resultData.name;
              this.headUrl=data.resultData.headUrl;

              this.containerSeen = true;

              // this.getCurrentPositionB();
              // this.refreshLocation = setInterval(() => {
              //   this.getCurrentPositionB();
              // }, 30000);
              // this.getClockedPlace();
              // this.refreshInfo = setInterval(() => {
              //   this.getClockEventMarquee();
              // }, 20000);
              this.initMap();
              this.getClockedPlace();
              this.refreshInfo = setInterval(() => {
                this.getClockEventMarquee();
              }, 20000);
            } else {
              this.containerSeen = false;
              //alert(this.containerSeen);
              this.$vux.alert.show({
              content: data.errMsg,
              title: "登录失败！"
            });
            }
            this.isloading = false;
          });
      }
    }
  },
  mounted() {
    document.title = "党建活动";
    // 显示
    this.$vux.loading.show({
      text: '加载中'
    })
    let code = sessionStorage.getItem("code") || "";
    if (code) {
      this.isloading = false;
      this.containerSeen = true;
      // this.getCurrentPositionB();
      // this.refreshLocation = setInterval(() => {
      //   this.getCurrentPositionB();
      // }, 30000);
      // this.getClockedPlace();
      // this.refreshInfo = setInterval(() => {
      //   this.getClockEventMarquee();
      // }, 20000);
      this.initMap();
      this.getClockedPlace();
      this.refreshInfo=setInterval(()=>{
          this.getClockEventMarquee();
      },30000)
    } else {
      let code = queryURL("code");
      //alert(code);
      if (code != null && code.toString().length > 1) {
       this.handleLogin();
      } else {
        this.isloading = false;
        this.containerSeen = false;
      }
    }
    // this.initMap();
    // this.getClockedPlace();
    // this.refreshInfo=setInterval(()=>{
    //     this.getClockEventMarquee();
    // },20000)
    // getClockPlaceAll()
    //     .then(res => {
    //       return res.data
    //     })
    //     .then(data => {
    //       console.log("data1",data)
    //     })
  },
  destroyed() {
    window.clearInterval(this.refreshLocation);
    window.clearInterval(this.refreshInfo);
  }
};
</script>
<style lang="less">
@import "~vux/src/styles/close.less";
.bottom-white {
  position: fixed;
  bottom: -50px;
}
.marquee-div {
  position: fixed;
  top: 60px;
  left: 50%;
  z-index: 10;
  font-size: 14px;
  margin-left: -130px;
  .vux-marquee {
    height: 19px;
    width: 260px;
    background: black;
    color: white;
    opacity: 0.7;
    border-radius: 10px;
    text-align: center;
    height: 20px;
  }
}
.clock-div {
  position: fixed;
  bottom: 5px;
  left: 50%;
  margin-left: -80px;
}
.unableClock-notice {
  text-align: center;
  color: #666;
}
.ableClock-notice {
  text-align: center;
  color: orange;
}
.getwords-dialog {
  background: url(../assets/images/partybuild/getWords.png) no-repeat;
  background-size: 100%;
  color: white;
  // height: 340px;
  width: 300px;
}
.getwords-div {
  padding-top: 160px;
}
.golden-words-long {
  color: #f8ec4c;
  font-size: 16px;
  // font-weight: 700;
  width: 260px;
  margin: 0 auto;
  text-align: left;
}
.golden-words {
  color: #f8ec4c;
  font-size: 22px;
  font-weight: 700;
  width: 200px;
  margin: 0 auto;
}
.golden-article {
  padding: 10px;
}
.location-intro {
  padding: 20px;
  text-align: left;
  background: #202020;
  color: white;
  overflow-y: scroll;
  height: 310px;
}
.location-name {
  font-size: 24px;
}
.location-dis {
  font-size: 20px;
  margin: 10px 0;
}
.popup0 {
  padding-bottom: 15px;
  height: 200px;
}
.popup1 {
  width: 100%;
  height: 100%;
}
.popup2 {
  padding-bottom: 15px;
  height: 400px;
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
  bottom: -30px;
  height: 180px;
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
.right_top_ranking {
  top: 12px;
  right: 8%;
  background: url(../assets/images/partybuild/ranking.png) no-repeat;
}
.right_bot_rules {
  bottom: 12px;
  right: 8%;
  background: url(../assets/images/partybuild/rules.png) no-repeat;
}
.left_bot_personal {
  bottom: 12px;
  left: 8%;
  background: url(../assets/images/partybuild/personal.png) no-repeat;
}
.left_top_info {
  top: 12px;
  left: 8%;
  background: url(../assets/images/partybuild/info.png) no-repeat;
}
.corner-icon {
  width: 13%;
  height: 8%;
  position: fixed;
  background-size: 100%;
  min-width: 42px;
  min-height: 42px;
  max-width: 42px;
  max-height: 42px;
  z-index: 1;
}
// 右框

.party-container .mint-popup-right {
  height: 100%;
  width: 60%;
  background: rgba(0, 0, 0, 0.6);
}
.v-modal {
  // background: #fff;
}
.popuPright_titl {
  font-size: 20px;
  color: #ffffff;
  width: 100%;
  line-height: 87px;
  margin-top: 20px;
}
.popuPright_titl p {
  float: left;
  margin-left: 15%;
}
.popuPright_titl span {
  float: left;
  width: 40px;
  height: 40px;
  background: url(../assets/images/partybuild/ranking.png) no-repeat;
  background-size: 40px;
  margin-top: 24px;
  margin-left: 14px;
}
.popuPright_List {
  width: 70%;
  float: right;
  overflow: hidden;
}
.popuPright_List span {
  float: left;
  line-height: 40px;
  text-align: left;
  color: #fff;
  font-size: 14px;
}
.popuPright_List span:nth-child(odd) {
  width: 15%;
}
.popuPright_List span:nth-child(even) {
  width: 15%;
}
.poRight_List {
  width: 100%;
  float: right;
  overflow: hidden;
}

.poRight_List span {
  float: left;
  line-height: 40px;
  height: 40px;
  text-align: left;
  color: #fff;
  font-size: 14px;
}
.poRight_List span:nth-child(odd) {
  width: 20%;
}
.poRight_List span:nth-child(even) {
  width: 20%;
}
.poRight_List span:nth-child(1) {
  width: 30%;
}
.poRight_List img {
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
  background: none;
}

.rules {
  width: 100%;
  margin: 0 auto;
  background: url(../assets/images/partybuild/rules_bk.png) no-repeat;
  background-size: 100%;
  padding-top: 50%;
  padding-bottom: 5%;
  margin-top: 20%;
}
.rules_ovf {
  height: 240px;
  overflow-y: auto;
}
.rules p {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  text-indent: 2em;
}
// 左下
#popuProe .vux-popup-dialog {
  overflow: hidden;
}
.personal_bk {
  width: 100%;
  margin: 0 auto;
  background: #fff url(../assets/images/partybuild/personal_bk.png) no-repeat;
  background-size: 100% 200px;
  position: relative;
}
.persFalse {
  position: absolute;
  right: 15px;
  top: 10px;
  width: 35px;
  height: 35px;
}
.persFalse img {
  display: block;
  width: 100%;
}
.persName {
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
}
.persHead {
  width: 110px;
  height: 110px;
  margin: 0 auto;
}
.persHead img {
  display: block;
  width: 100%;
  width: 110px;
  height: 110px;
  border-radius: 50%;
}
.persKn {
  width: 90%;
  margin: 0 auto;
  border: 1px dashed #d09292;
  margin-top: 15px;
  position: relative;
}
.weui-cell .vux-cell-primary {
  -webkit-box-flex: inherit;
  -webkit-flex: inherit;
  flex: inherit;
  display: block;
  /* width: 150px; */
  overflow: hidden;
  float: left;
  // margin-right: 10px;
}
.persKn_jg {
  height: 360px;
  overflow-y: auto;
  padding-bottom: 20px;
}
.persKn_j {
  padding-bottom: 12px;
}
.persKn_j p {
  padding-left: 40px;
  line-height: 25px;
  margin-top: 5px;
  padding-right: 8px;
}
.perPofix {
  position: absolute;
  right: 42px;
  top: 69px;
  width: 82px;
  height: 82px;
  background: url(/static/img/successful.7b0f9e5.png) no-repeat;
  background-size: 100%;
}
.vux-label {
  font-size: 18px;
}
.wordsClass {
  color: #000;
}
.wordsClis {
  color: #ccc;
}
//  结束
.location-end {
  background: url(../assets/images/partybuild/end.png) no-repeat;
  background-size: 100%;
  width: 100%;
  height: 350px;
  overflow: hidden;
}
.location-end p {
  margin-top: 130px;
  font-size: 22px;
  color: #fff;
}
.end .weui-dialog {
  background: none;
}
</style>