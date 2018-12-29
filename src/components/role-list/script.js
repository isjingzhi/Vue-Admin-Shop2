export default {
  created() {
    this.loadRoles();
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
     // 1. 加载列表
    async loadRoles () {
      const res = await this.$http.get('/roles')
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
     }
   }
}