<template>
  <div class="user-list-wrap">
    <el-row>
      <!-- 面包屑导航 -->
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="list-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索和添加用户 -->
    <el-row class="list-search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%" class="list_table">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <!-- 
       /*
        注:数据的更改1.(:page-sizes="[1,2,3,4]") ====> (:page-sizes="[10,20,30,40]")
           与此同时更改 2. data 中 "pageSize:10" // 每页请求的数量
       */
       ===========================================================================
       :page-sizes="[1,2,3]" ==> 显示每页几条
       :current-page.sync="currentPage" // element 的分页更改==>解决分页的BUG
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[1,2,3,4]"  
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
      >></el-pagination>
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
import { getToken } from "@/assets/js/auth";
export default {
  async created() {
    // 传参,加载的当前页数
    this.loadUsers(1);
  },
  data() {
    return {
      searchText: "",
      tableData: [], // 总数据
      totalSize: 0, // 总共有多少条
      currentPage:1, // 显示当前页是第几页==> 初始化加载时在第一页
      pageSize:1 // 每页请求的数量 ==>初始化加载时显示每页的条数,设置为10
    };
  },
  methods: {
    // 1.加载列表
    async loadUsers(page) {
      const res = await this.$http.get("/users", {
        params: {
          // 请求参数，对象会被转换为 k=v&k=v 的格式，然后拼接到请求路径 ? 后面发起请求
          pagenum: page, // 加载的当前页数
          pagesize: this.pageSize // 加载的数量
        }
      });
      // console.log(res);
      const { data, meta } = res.data;
      if (meta.status === 200) {
        this.totalSize = data.total;
        this.tableData = data.users;
      }
    },
    // 2. 切换每页条数加载
    handleSizeChange(val) {
      this.pageSize = val  // 请求的每页条数就是val
      this.loadUsers(1) // 发送请求加载第一页
      this.currentPage = 1 // 设置当前页面
      // console.log(`每页 ${val} 条`);
    },
    // 3.点击去第几页
    handleCurrentChange(val) {
      // 点击页数,发送请求
      this.loadUsers(val) // val就是要去的页数
      // console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style>
</style>
