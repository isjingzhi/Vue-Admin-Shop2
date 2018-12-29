export default {
  created () {
    this.loadRights()
   },
  data() {
    return {
      tableData: [],
      loading: true, // 默认 loading 状态
    }
  },
  methods: {
    // 加载用户列表
    async loadRights () {
      const res = await this.$http.get('/rights/list')
      console.log(res)
      const {meta,data} = res.data
      if (meta.status === 200) {
        // 请求成功渲染页面,清除loading
        this.tableData = data
        this.loading = false
      }
    },
    // 可自定义index
    // indexMethod(index) {
    //   return index * 2
    // }
  }
}