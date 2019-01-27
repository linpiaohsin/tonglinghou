<template>
  <div>
      <img src="https://agent-image.qcloud.cdn.majiang01.com/agent/20001/chaoshan.jpg" width="100%">
  <div>

  </div>
  <div class="phoneArea">
    <mt-field label="帐号:" placeholder="13502652058" type="number" v-model.number="form.phone"></mt-field>
  </div>
  <div class="pwdArea">
    <mt-field label="密码:" placeholder="SEfmTsTyircTV2U" type="password" v-model="form.phone"></mt-field>

  </div>
  <div class="codeArea">
    <el-row>
       <el-col :span="18">
          <mt-field label="验证码：" placeholder="请输入验证码" type="password" v-model="form.code" id="code_input"></mt-field>
       </el-col>
       <el-col :span="6">
          <!-- <el-button id="my_button" @click="clickCode">验证</el-button> -->
          <div id="v_container" width='100%' height='100%'></div>
       </el-col>
    </el-row>

  </div>

  <div class="tipMsgArea">
    <el-row>
      <el-col :span="12">
          <span style="margin-left:2rem;margin-top:2rem;text-decoration:underline ">短信验证码登录</span>
      </el-col>
      <el-col :span="12">
      <!-- mint，符合设计图，难控制 -->
        <!-- <mt-checklist
          v-model="value"
          :options="['同意 《合作协议》']">
        </mt-checklist> -->
          <el-radio v-model="radio" label="2" ><span @click="clickProtol">同意 《合作协议》</span> </el-radio>
      </el-col>
    </el-row>
  </div>

  <div class="load">
    <mt-button type="primary" size="large" @click="onload()">登录</mt-button>
  </div>
  <div class="lastLineArea" style="margin-top:1rem">
      <el-row>
        <el-col :span="6"> <span style="text-decoration:underline;margin-left:.5rem ">忘记密码？</span></el-col>
        <el-col :span="6" :offset="12"><el-radio v-model="radio" label="2">记住密码</el-radio></el-col>
      </el-row>
  </div>

    <div class="kapcha">

        </div>
                <div class="tip-agreement">
          <div class="agreement pr">
            <div class="mint-popup agree-content mint-popup-left" style="display:none;">
              <h4>
                合作协议内容
                <button class="mint-button close-btn fr mint-button--default mint-button--small">
                  <span class="mint-button-icon"><img src="" height=".875rem" width=".875rem"></span>
                  <label class="mint-button-text"></label>
                </button>
              </h4>
              <p>雀友会推广员合作协议</p>
              <div style="overflow-wrap: break-word; padding: .875rem;">
                <p>《雀友会推广员合作协议》内容</p>
                <p>      欢迎您注册/登录使用《雀友会潮汕麻将》的推广员系统（下称“本系统”）。请您在注册/登录本系统前仔细阅读《雀友会推广员合作协议》（下称“本协议”）的所有内容，特别是有关推广员的义务的条款，以及免除、限制我方责任的条款。本协议是雀友会（下称我方）与雀友会推广员（下称“推广员”或“你方”）所约定的规范双方权利、义务关系的电子合同（买卖合同）。</p>
                <p>     如您对本协议任何内容有异议，请不要注册及登录/使用本系 统。当您点击确认键注册或者登录或使用本系统相关服务，则视为您已仔细阅读本协议所有内容，同意接受本协议的所有规定及我方相关政策的约束，成为推广员，有权从我方批量购买《雀友会潮汕麻将》（下称本游戏）的钻石等产品或服务，并对外转售。</p><p>一、合作内容</p>
                <p> 1、协助我方提升本游戏的钻石销售数量，提升本游戏的玩家用户规模。</p>
                <p>  2、为实现前述目的，你方可通过线下场所或线上渠道（Q群、QQ、贴吧、论坛、空间、微信、微博等）、自身人际关系、非官方网络资源等各种合法方式和渠道，推广本游戏，我方将提供必要的支持和协助。</p>
                <p>  3、为实现前述目的，双方共同将为本游戏做正面宣传，扩大本游戏的知名度和美誉度。</p>
                <p>二、推广员的权利和义务</p>
                <p> 1、推广员成为本游戏的钻石和其他相关服务的批发商，有权从我方以低于市场统一定价的价格、大批量购买本游戏的钻石和其他相关服务，并以市场统一定价对外转售。</p>
                <p>  2、推广员有权参与我方组织的市场推广活动，并从我方获得相应的奖励。   </p>
                <p>3、推广员不享有本游戏在任何区域的独家合作资格。</p>
                <p>  4、推广员不得从我方之外的其他途径购买本游戏的钻石和其他相关服务，不得互相串货，不得私自降价销售，不得扰乱本游戏钻石和相关服务的市场价格体系。</p>
                <p>  5、推广员不得对用户歧视性销售，不得捆绑销售、搭便车销售。</p>
                <p>  6、在合作推广过程中，推广员的任何行为均不得包含有虚假、诱骗、违反国家法律法规的内容，也不得做出有悖于雀友会对外公布的相关公告、协议内容的承诺或行为，不得通过组织、参与违法活动来追求销售业绩。如有发现，你方独自承担一切法律后果，且我方有权向国家有关机关做举报。</p>
                <p>  7、推广员有义务积极维护和宣传我方的品牌、业务和政策，不煽动、不参与任何形式的不利于我方品牌、业务、政策的活动。你方不可假冒和改变我方的商标、标志、商业信息等，不得故意造成与我方产品或服务的混淆，不得以我方公司或员工名义对外从事任何活动。</p>
                <p>  8、推广员须保证在进行本游戏推广之前已经获得线上或者线下场所的许可，并遵守相应的线上线下法律规章制度，否则由此产生的纠纷和可能导致的一切责任由推广员本人承担；推广员同意我方对此免责。</p>
                <p>  9、推广员理解并认可，推广员在注册和使用本系统过程中所提供的个人资料及相关信息是我方判断你方身份的重要依据，你方应根据要求尽可能提供详尽的信息，并确保信息的完整性、合法性和真实性。如推广员提交的资料有任何变动，必须在本系统中及时更新,必要时以电话或邮件形式告知我方管理人员，以保证其资料准确性。如果推广员不能提供准确完整的个人信息、未及时更新相关信息或者提供相关的资料，将导致我方无法准确判断推广员的身份，从而影响到推广收益发放等操作。因此给推广员造成的损失，我方不承担任何责任。</p>
                <p>  10、如因推广员提交的信息资料不真实、不准确、不完整、不合法从而导致我方作出错误判断、遭受直接或间接经济损失的，我方有权立即取消该推广员的资格并追究推广员的法律责任。</p>
                <p>  11、推广员仅能依据本协议约定的内容，从事雀友会的推广活动，不得将本协议约定的权利、义务转让给任何第三方，不得擅自委托第三方从事本游戏的推广行为。</p>
                <p>  12、推广员拥有自主的权利，可单方面随时决定终止与我方的合作、并停止使用本系统相关服务。如我方对本协议内容或相关服务等作出任何变更，而推广员不同意有关变更内容的，推广员应立即终止与我方的合作、并停止使用本系统相关服务。</p>
                <p>  13、推广员必须严格遵守我国相关法律法规，不得利用雀友会游戏平台从事赌博等违法犯罪活动，如发现一经核实，我方有权立即终止合作并移交相关部门处理处理。</p>
                <p>三、雀友会的权利和义务</p>
                <p> 1、雀友会会对推广员提交的注册信息和资料进行及时审核，并有权根据公司业务发展需要，做出通过或不通过的决定。</p>
                <p>  2、雀友会有权了解推广员的推广情况，获得与推广员信息和推广业绩相关的必要的资料、数据和有关证据。</p>
                <p>  3、雀友会会根据推广员的销售业绩和公司政策，将推广员应得的收益及时支付到位。</p>
                <p>  4、雀友会将通过本系统的消息通知、电子邮件等方式，将最新的公司政策（包括但不限于优惠政策、对推广员的销售业绩要求等）下发给推广员。推广员有义务遵守、配合公司的各项政策。</p>
                <p>  5、雀友会有权根据实际需要随时修改本协议，并通过公告、系统消息或邮件等形式公布，修改自公告公布之日、或消息送达推广员邮箱之日起生效。推广员如有异议，可立即停止本协议，并与我方协商结算事宜。</p>
                <p>  6、雀友会有权单方随时变更、中断或终止本系统及相关服务，且不需对玩家或任何第三方负责。除本协议另有约定外，雀友会将以电话、短信、系统消息/页面或者电子邮件方式通知推广员。终止合作通知自发出之时即视为送达。如因推广员资料中登记的联络方式不正确、不完整或者不真实而导致联络失败的，雀友会无需对因此导致的任何损失或损害承担法律责任。</p>
                <p>  7、雀友会有权根据公司业务发展需要，终止本协议涉及的合作。在此情况下，雀友会应通过发布公告等形式通知推广员，协议的终止自公告发布之日起生效。</p>
                <p>  8、雀友会将竭力保证本游戏相关系统和数据的稳定，但因技术问题或第三方原因导致产品宕机、数据丢失等问题，我方不向你方或其他第三方承担赔偿、补偿的法律义务。</p>
                <p>  9、雀友会有权要求推广员配合我方的相关推广工作，以保证推广本游戏的效果和效率。</p>
                <p>  10、尊重个人隐私是雀友会的重要政策。在未经授权的情况下，雀友会不会公开或向第三方透露推广员在申请时提交的个人资料。但如根据法律规定或政府有权部门的有效命令，或在以下三种情况下，雀友会可不经授权而向相关部门或第三方公开或透露推广员的个人信息：</p>
                <p>   (1)在紧急情况下维护推广员个人、第三人或社会大众的财产或人身安全；</p>
                <p>   (2)保持、维护雀友会的知识产权或其它合法权益；</p>
                <p>   (3)根据雀友会游戏服务的相关规则、制度、条款，应当公开或披露的。</p>
                <p>四、推广收益</p>
                <p>    推广员按照雀友会相关规定申领推广收益。推广收益的发放形式目前为钻石的发放。具体兑换规则以公司的通知为准。雀友会将在后台确认推广业绩并在业绩确认后十个工作日内将推广收益发放至推广员账户。</p>
                <p>五、声明</p>
                <p>   雀友会与推广员在此声明：双方不会因根据本协议产生的推广合作，构成任何形式的劳动合同关系或劳务关系。推广员不隶属于雀友会，不受雀友会内部规章制度的约束。雀友会除向推广员支付本协议约定的推广收益外，不承担推广员的任何其他费用，包括但不限于因推广员因推广活动所产生的成本、社会保险、福利和医疗保险费用等。</p>
                <p>      雀友会与推广员共同在此声明：本协议不包含任何可能理解为双方之间设立一种代理关系的内容。推广员无权代表雀友会对外缔结合同。推广员不得以雀友会的名义开展任何与本协议约定推广活动无关的活动，或者从事违法犯罪活动，否则一切后果由推广员自行承担，雀友会并保留追究其法律责任的权利。</p>
                <p>五、违约责任</p>
                <p>    如推广员有违反本协议第二条第4、5、6、7、8、9、10、11款之规定的行为，雀友会有权根据推广员的违约事实和严重程度，对其采取扣发推广收益、停止发放推广收益、扣减推广员所持钻石、作废推广员所持钻石、暂停推广合作资格、停止推广合作资格等措施，并有权向推广员追讨其通过不当行为所获得的利益。</p>
                <p>      推广员对此充分理解并认可。</p>
                <p>六、不可抗力</p>
                <p> 1、一方因不可抗力不能履行本协议的，根据不可抗力的影响，可以部分或者全部免除违约责任。但一方迟延履行后发生不可抗力的，不能免除责任。</p>
                <p>  2、一方因不可抗力不能履行本协议的，应当及时通知对方，以减轻可能给对方造成的损失，并在合理期限内提供证明。未及时通知的，对因迟延通知而造成的扩大损失依然承担赔偿责任。</p>
                <p>  3、一方因不可抗力不能履行合同，但尚未造成对本协议根本违约的，另一方应该在履约时间上给予对方适当的宽限；如果因不可抗力导致不能实现本协议目的的，双方均有权解除本协议。</p>
                <p>七、协议的生效和终止</p>
                <p> 1、协议的生效：本协议自您登录推广系统并点击“我已同意《雀友会推广员合作协议》”时生效。</p>
                <p>  2. 下列情形之一出现时，本协议终止：</p>
                <p>   （1）本协议约定的合作期限届满；</p>
                <p>   （2）本游戏终止运营；</p>
                <p>   （3）在本协议有效期内，推广员被依法追究刑事责任的，雀友会有权单方面终止本协议；</p>
                <p>   （4）其他按照法律规定以及本协议约定的终止情况</p>
                <p>八、其他约定</p>
                <p>    本协议未尽事宜，可由双方另行签订补充协议予以明确。补充协议的内容与本协议的内容有冲突的，优先适用补充协议的规定。</p>
                <p>    推广员与雀友会在合作中产生的争议，应当友好协商解决；协商不成的，任何一方均有权向被告所在地有管辖权的法院提起诉讼。</p>
                <p> </p>
                </div>
            </div>
          </div>
        </div>
  </div>

</template>
<script>
import '@/views/queyouhui/gVerify.js'
import { home } from '@/api/index.js'
export default {
  data () {
    return {
      yanzhengma: '',
      value: '0',
      array: ['同意'],
      code: '',
      codenum: '',
      form: {
        phone: '',
        pwd: ''
      }
    }
  },
  mounted () {
    this.createCode()
    var verifyCode = new GVerify('v_container')
  },
  methods: {
    createCode () {
      this.code = ''
      let codeLength = 4// 验证码的长度
      let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (var i = 0; i < codeLength; i++) { // 循环操作
        var index = Math.floor(Math.random() * 36)// 取得随机数的索引（0~35）
        this.code += random[index]// 根据索引取得随机数加到code上
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.createCode(this.identifyCodes, 4)
    },
    clickCode () {
      document.getElementById('my_button').onclick = function () {
        var res = verifyCode.validate(document.getElementById('code_input').value)
        if (res) {
          alert('验证正确')
        } else {
          alert('验证码错误')
        }
      }
    },
    onload () {
      // this.$router.push('/Comtainer/Topup')
      home.login(this.form).then(res => {
        console.log(res)
        sessionStorage.setItem('agentmsg', JSON.stringify(res.data))
        this.$router.push('/Comtainer/Topup')
      })
    },
    clickProtol () {
      console.log('hhhhhhhhh')

      this.$router.push('protol')
    }
  }

}
</script>
<style scoped>
.mint-field,.changload{
  display: flex;
}
.mint-cell{
  background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
.mint-cell-left{
  position: absolute;
    height: 100%;
    left: 0;
    transform: translate3d(-100%,0,0);
}
.changload >div{
  width: 50%;
}
.changload >div:first-child{
  text-align: center;
}
.mint-cell-wrapper{
    background-image: linear-gradient(180deg,#d9d9d9,#d9d9d9 50%,transparent 0);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
}
.mint-field{
  display: flex;
}
.mint-cell{
  background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
.mint-cell-left{
  position: absolute;
    height: 100%;
    left: 0;
    transform: translate3d(-100%,0,0);
}
.mint-cell-wrapper{
  background-image: linear-gradient(180deg,#d9d9d9,#d9d9d9 50%,transparent 0);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
}
.code{
  position: relative;
}

.codenum{
  position: absolute;
  width: 2rem;
  height: 1rem;
  right:3rem;
  bottom: 1rem
}
.codenum input{
  display: inline-block;
  height:2rem;
  width: 4.5rem;
}
.agree,.msg{
  display: flex;
  height: 3rem
}
.msg a{
  line-height: 3rem
}
.load{
  margin-top: 1rem
}
</style>
