<template>
  <div class="editRole">
    <div class="titleTop">
      用户管理-角色管理-添加
    </div>
    <div class="main">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :inline="true"
      >
        <el-row>
          <el-form-item label="角色名称" required="">
            <el-input
              v-model="form.roleName"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="管理员" required="">
            <el-select v-model="form.isAdmin" placeholder="请选择">
              <el-option
                label="是"
                value="1">
              </el-option>
              <el-option
                label="否"
                value="0">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item>
          <!-- <template v-for="item in form.roleArr">
            <el-checkbox v-model="item.checked">{{item.text}}</el-checkbox>

          </template> -->
          <el-tree :data="this.form.roleArr" ref="tree"  @node-click="handleNodeClick" show-checkbox :props="defaultProps"></el-tree>
        </el-form-item>
        <el-form-item>

        </el-form-item>
      </el-form>

    </div>
    <button
      class="btn"
      @click="onSubmit"
    >保存</button>
    <button
     class="btn"
     @click="returnBefore"
    >返回</button>
  
  </div>
</template>

<script>
import {sysUser} from '@/api/index.js'
export default {
  data () {
    return {
      imageUrl: '',
      form: {
        roleName: '',
        roleArr: [],
        isAdmin: '',
        sysMenuIds: []
      },
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    onSubmit () {
      /* for (let i = 0; i < this.form.roleArr.length; i++) {
          if (this.form.roleArr[i].checked) {
            this.form.sysMenuIds.push(this.form.roleArr[i]['id'])
          }
        } */
      this.form.sysMenuIds = []
      this.$refs.tree.getHalfCheckedNodes().forEach(item => { // 获取班选中的node
        this.form.sysMenuIds.push(item.id)
      })
      this.$refs.tree.getCheckedNodes().forEach(item => {
        this.form.sysMenuIds.push(item.id)
      })
      console.log(this.form.sysMenuIds)
      sysUser.addRole(this.form).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.$router.push('/Home/user/role')
        }else {
          this.$message.error(res.msg)
        }
      })
    },
    initData () {
      sysUser.sysMenu().then(res => {
        this.form.roleArr = res.data.children
      })
    },
    handleNodeClick () {

    },
    returnBefore(){
      this.$router.go('-1')
    }
  }
}
</script>

<style lang="scss" scoped>
  .editRole {
  .main {
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
  }
  .btn {
    margin-left: 50px;
    margin-top: 50px;
  }
  }
</style>
