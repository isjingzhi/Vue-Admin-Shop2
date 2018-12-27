<template>
  <el-container class="container">
    <!-- header -->
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple-dark">logo放置区域</div></el-col>
        <!-- 
          注意:
          @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击 -->
        <el-col :offset="16" :span="4"><div class="grid-content bg-purple log_out"><a href="#" @click.prevent="logout()">退出</a></div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside">Aside</el-aside>
      <!-- 内容区域 -->
      <el-main class="main">index页面,欢迎访问!!!</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout (){
       this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 1. 确定退出后,删除本地存储
          window.localStorage.removeItem('admin-token')
          // 2. 跳转登录页面
          this.$router.push({
            name:'login'
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(
          // 错误处理
        );
    }
  }
};
</script>

<style>
.container{
  height: 100%;
}
.header {
  background-color: #B3C0D1;
  line-height: 60px;
}
.aside {
  background-color: #fff;
}
.main {
  background-color: #E9EEF3;
}
</style>
