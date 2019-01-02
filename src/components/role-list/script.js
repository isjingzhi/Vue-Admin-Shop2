export default {
  created() {
    this.loadRoles();
  },
  data() {
    return {
      tableData: [],
      AddFormVisible: false,
      editFormVisible: false,
      authRoleDialog: false,
      AddUserForm: {
        roleName: '',
        roleDesc: '',
      },
      EditRoleForm: {
        roleName: '',
        roleDesc: '',
      },
      treeData: [],
      treeProps: {
        children: 'children', // 子节点数组名
        label: 'authName' // 节点文本属性名
      },
      treeCheckedKeys: [],
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
    },
    // 5.1 点击授权发送请求渲染数据
    async handelAuthDialog(role) {
      const res = await this.$http.get('rights/tree')
      console.log(res);
      const {
        meta,
        data
      } = res.data
      if (meta.status === 200) {
        this.treeData = data

        // 找到拥有所有权限的 id ,然后赋值给 treeCheckedKeys 让默认节点被选中
        this.treeCheckedKeys = this.getLevel3(role.children)

        // 开启 tree 对话框
        this.authRoleDialog = true

      }

    },
    // 5.2 点击编辑确定授权
    async handelAuthRole() {
      // 运用递归来遍历所有
    },

    // 6. 运用递归来遍历所有返回数据中的 id 并渲染到页面
    getLevel3(rightList) {
      // 用来存储三级id
      const arr = []
      const f = function (rightList) {
        rightList.forEach(function (item) {
          // 如果字段里没有 children 则证明是最后一级节点,然后把id放到数组中
          if (!item.children) {
            arr.push(item.id)
          } else {
            // 如果有 children 则递归遍历
            f(item.children)
          }
        })
      }
      f(rightList)
      return arr
    }
  }
}
