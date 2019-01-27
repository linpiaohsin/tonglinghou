<template>
    <div>
        <mt-header title="我的下级代理商" fixed>
            <router-link to="/Comtainer/Agent" slot="left">
                <mt-button icon="back">上一页</mt-button>
            </router-link>
            <mt-button  slot="right" @click="changeID">切换账号</mt-button>
        </mt-header>
        <div style="height:35.4375rem">
            <p class="fg"></p>
            <div class="normal_agency">
                <div class="agentTitle">
                    <a class="mint-cell">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text"></span>
                            </div>
                            <div class="mint-cell-value">
                                <span>代理商ID</span>
                                <span>手机号</span>
                                <span>注册时间</span>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>
                </div>
                <a class="mint-cell" v-for="item of agentData">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-value">
                            <span>{{item.id}}</span>
                            <span>{{item.phone}}</span>
                            <span>{{item.create_time}}</span>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { agent } from '@/api/index.js'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      agentData: {
        create_time: '',
        id: '',
        phone: ''
      }
    }
  },
  methods: {
    changeID () {
      MessageBox.confirm('确认切换账号?').then(res => {
        // 跳转页面到
        this.$router.push('/')
        sessionStorage.removeItem('agentmsg')
        sessionStorage.removeItem('tabar')
      })
    }
  },
  mounted () {
    this.agentData = {}
    if (sessionStorage.getItem('agentmsg') === null) {
      this.$router.push('/')
    } else {
      let id = JSON.parse(sessionStorage.getItem('agentmsg')).id
      agent.getByAgent({id: id, size: 2}).then(res => {
        this.agentData = res.data
      })
    }
  }
}
</script>
<style scoped>
.normal_agency {
    overflow-y: auto;
    background: #fff;
}
.mint-cell {
    background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 3rem;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
.mint-cell:last-child {
    background-image: linear-gradient(0deg,#d9d9d9,#d9d9d9 50%,transparent 0);
    background-size: 100% .0625rem;
    background-repeat: no-repeat;
    background-position: bottom;
}
.mint-cell-left {
    position: absolute;
    height: 100%;
    left: 0;
    transform: translate3d(-100%,0,0);
}
.mint-cell:first-child .mint-cell-wrapper {
    background-origin: border-box;
}
.mint-cell-wrapper {
    background-image: linear-gradient(180deg,#d9d9d9,#d9d9d9 50%,transparent 0);
    background-size: 120% .0625rem;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 1rem;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 .625rem;
    width: 100%;
}
.normal_agency .agentTitle.mint-cell .mint-cell-wrapper .mint-cell-title, .normal_agency .mint-cell .mint-cell-wrapper .mint-cell-title {
    -ms-flex: 0;
    flex: 0;
}
.mint-cell-title {
    -ms-flex: 1;
    flex: 1;
}
.mint-cell-text {
    vertical-align: middle;
}
.normal_agency .mint-cell .mint-cell-value {
    -ms-flex: 1;
    flex: 1;
}

.mint-cell-value {
    color: #888;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}
.normal_agency .mint-cell .mint-cell-value span {
    text-align: left;
    width: 45.333%;
    font-size: .875rem;
    display: block;
}
.mint-cell-right {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    transform: translate3d(100%,0,0);
}
/* 灰线 */
.fg{
    width: 100%;
    height: 50px;
    background-color: #f0f0f0;
}
</style>
