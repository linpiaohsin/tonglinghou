<template>
  <div class="editRole">
    <div class="titleTop">
      用户管理-角色管理-编辑
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
          <el-tree :data="this.form.roleArr" ref="tree"  @node-click="handleNodeClick" show-checkbox :props="defaultProps" node-key="id"></el-tree>
        </el-form-item>
      </el-form>
    </div>
    <button
      class="btn"
      @click="onSubmit"
    >保存</button>
    <button
      class="btn"
      @click="goback()"
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
        id: '',
        roleName: '',
        roleArr: [],
        isAdmin: '',
        sysMenuIds: []
      },
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      keys: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    onSubmit () {
      // for (let i = 0; i < this.form.roleArr.length; i++) {
      //   if (this.form.roleArr[i].checked) {
      //     this.form.sysMenuIds.push(this.form.roleArr[i]['id'])
      //   }
      // }
      this.form.sysMenuIds = []
      this.$refs.tree.getHalfCheckedNodes().forEach(item => { // 获取班选中的node
        this.form.sysMenuIds.push(item.id)
      })
      this.$refs.tree.getCheckedNodes().forEach(item => {
        this.form.sysMenuIds.push(item.id)
      })

      sysUser.updRole(this.form).then(res => {
        this.$message.success(res.msg)
        this.$router.push('/Home/user/role')
      })
    },
    initData () {
      this.form = this.$route.query
      this.form.isAdmin = String(this.$route.query.isAdmin)
      sysUser.getTree({sysRoleId: this.$route.query.id}).then(res => {
        this.$set(this.form, 'roleArr', res.data.children)
        res.data.children.forEach(itemParent => {
          itemParent.children.forEach(items => {
            items.children.forEach(item => {
              if (item.checked) { this.keys.push(item.id) }
            })
          })
        })
        this.$refs.tree.setCheckedKeys(this.keys)
      })
    },
    handleNodeClick () {

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
