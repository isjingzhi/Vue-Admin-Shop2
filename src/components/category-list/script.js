export default {
  created() {
    this.loadCategories(1)
  },
  data() {
    return {
      loading: null,
      totalSize: 0, // 总共有多少条
      currentPage: 1, // 显示当前页是第几页==> 初始化加载时在第一页
      pageSize: 10, // 每页请求的数量 ==>初始化加载时显示每页的条数,设置为10
      tableData: [], // 总数据

    }
  },
  methods: {
    // 1. 切换每页条数加载
    handleSizeChange(val) {
      this.pageSize = val // 请求的每页条数就是val
      this.loadCategories(1) // 发送请求加载第一页
      this.currentPage = 1 // 设置当前页面
      // console.log(`每页 ${val} 条`);
    },

    // 2.点击去第几页
    handleCurrentChange(val) {
      // 点击页数,发送请求
      this.loadCategories(val) // val就是要去的页数
      // console.log(`当前页: ${val}`);
    },
    // 3. 加载数据
    async loadCategories (page) {
      // this.loading = true
      const res = await this.$http.get('/categories', {
          params: {
            type: 3,
            pagenum: page,
            pagesize: this.pageSize
        }
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.tableData = data.result
        this.totalSize = data.total
        // 取消loading
        this.loading = false
      }
    }
  }
}
