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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async created () {
    const {token} = JSON.parse(window.localStorage.getItem('admin-token'))
    const res = await axios.get('http://localhost:8888/api/private/v1/users', {
      headers: {
        Authorization: token // 配置请求头携带身份令牌
      },
      params: { // 请求参数，对象会被转换为 k=v&k=v 的格式，然后拼接到请求路径 ? 后面发起请求
        pagenum: 1,
        pagesize: 5
      }
    })
    console.log(res);
    this.tableData = res.data.data.users
  },
  data() {
    return {
      searchText: '',
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
</style>
