<template>
  <div class="login-wrap">
    <!--
    el-form 会生成 form 标签
    我们自己增加的 class 会和它生成的结果 class 合并到一起
    -->
    <el-form
      class="login-from"
      label-position="top"
      ref="form"
      :model="userForm"
      label-width="80px"
    >
      <h2 class="heading">用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login()">立即登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入axios
import axios from "axios";
export default {
  data() {
    return {
      userForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      // 1.获取表单数据,进行表单验证
      const res = await axios.post("http://localhost:8888/api/private/v1/login",this.userForm);
      const data = res.data
      console.log(data);
      if (data.meta.status === 200) {
        // 登陆成功，将服务器签发给用户的 Token 身份令牌记录到 localStorage 中
        // 其它需要使用 Token 的都去本地存储获取
        window.localStorage.setItem('admin-token', JSON.stringify(data.data))
        this.$router.push({
          name: 'home'
        })
        this.$message({
          type:'success',
          message:'登录成功'
        })
      }
    }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>
