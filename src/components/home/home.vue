<template>
  <el-container class="container">
    <!-- header -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark">logo放置区域</div>
        </el-col>
        <!-- 
          注意:
        @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击-->
        <el-col :offset="16" :span="4">
          <div class="grid-content bg-purple log_out">
            <a href="#" @click.prevent="logout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside">
        <!-- 默认打开第几个 -->
        <el-menu
          :default-openeds="['2']"
          class="el-menu-vertical-demo aside-menu"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="false"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 分组 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 分组 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">分类参数</el-menu-item>
              <el-menu-item index="3-3">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 分组 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 分组5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">数据列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {removeUserInfo} from '@/assets/js/auth'
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 1. 确定退出后,删除本地存储
          removeUserInfo()
          // 2. 跳转登录页面
          this.$router.push({
            name: "login"
          });
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          // 点击取消的处理
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-item-group__title{
  display: none;
}
.container {
  height: 100%;
}
.container,
.aside .aside-menu {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  line-height: 60px;
}
.aside {
  background-color: #fff;
}
.main {
  background-color: #e9eef3;
}
</style>
