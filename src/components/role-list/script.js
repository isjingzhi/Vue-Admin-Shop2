export default {
  created() {
    this.loadRoles();
  },
  data() {
    return {
      tableData: [],
      AddFormVisible: false,
      editFormVisible: false,
      AddUserForm: {
        roleName: '',
        roleDesc: '',
      },
      EditRoleForm: {
        roleName: '',
        roleDesc: '',
      },
    }
  },
  methods: {
    // 1. 加载列表
    async loadRoles() {
      const res = await this.$http.get('/roles')
      // console.log(res)
      const {
        data,
        meta
      } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    },
    // 2. 添加角色
    async handleAddRoles() {
      const res = await this.$http.post('/roles', this.AddUserForm)
      const {
        data,
        meta
      } = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })
        // 添加成功清空文本框,重新加载数据,关闭对话框
        this.AddFormVisible = false
        for (let key in this.AddUserForm) {
          this.AddUserForm[key] = ''
        }
        this.loadRoles()
      } else {
        // 添加失败处理
      }
    },
    // 3. 删除角色  注:(`roles/${role.id}`) 等于 ('roles/' + role.id)
    async handleDeleteRoles(role) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`roles/${role.id}`)
        const {
          meta
        } = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新加载数据
          this.loadRoles()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 4.1 编辑用户
    async handelshowEditForm(role) {
      // 点击编辑用户弹出对话框,渲染数据
      this.editFormVisible = true
      const res = await this.$http.get(`roles/${role.id}`)
      this.EditRoleForm = res.data.data
    },
    // 4.2 点击编辑发送请求
    async handelEditRole() {
      this.$confirm('是否编辑该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.put(`roles/${this.EditRoleForm.roleId}`, this.EditRoleForm)
        const {
          meta
        } = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          // 重新加载数据
          this.loadRoles()
          // 关闭对话框
          this.editFormVisible = false
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消编辑'
        })
      })
    }
  }
}
