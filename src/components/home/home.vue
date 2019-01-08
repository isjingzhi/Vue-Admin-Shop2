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
          class="el-menu-vertical-demo aside-menu"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="false"
          :router="true"
        >
          <el-submenu v-for="item1 in menuList" :index="item1.path" :key="item1.id">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="item2 in item1.children"
                :key="item2.id"
                :index="item2.path"
              >{{item2.authName}}</el-menu-item>
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
import { removeUserInfo } from "@/assets/js/auth";
export default {
  created() {
    this.loadMenus()
  },
  data() {
    return {
      menuList: []
    }
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
          removeUserInfo();
          // 2. 跳转登录页面
          this.$router.push({
            name: "login"
          })
          this.$message({
            type: "success",
            message: "退出成功!"
          })
        })
        .catch(() => {
          // 点击取消的处理
        })
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 3. 发送请求获取菜单树
    async loadMenus() {
      const res = await this.$http.get("/menus")
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.menuList = data
      }
    }
  }
}
</script>

<style>
.el-menu-item-group__title {
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
