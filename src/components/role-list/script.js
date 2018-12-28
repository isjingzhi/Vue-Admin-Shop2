import http from "@/assets/js/http";
import {
  getToken
} from "@/assets/js/auth";
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
      currentPage: 1, // 显示当前页是第几页==> 初始化加载时在第一页
      pageSize: 1,// 每页请求的数量 ==>初始化加载时显示每页的条数,设置为10
      mg_state: true,
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
      console.log(res);
      const {
        data,
        meta
      } = res.data;
      if (meta.status === 200) {
        this.totalSize = data.total;
        this.tableData = data.users;
      }
    },
    // 2. 切换每页条数加载
    handleSizeChange(val) {
      this.pageSize = val // 请求的每页条数就是val
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