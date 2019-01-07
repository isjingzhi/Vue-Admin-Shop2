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
      pageSize: 5, // 每页请求的数量 ==>初始化加载时显示每页的条数,设置为10
      mg_state: true,
      // 4.添加用户表单
      AddUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户表单
      EditUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      AddFormVisible: false, // 添加用户表单
      editFormVisible: false,
      addUserFormRules: { // 添加用户添加规则
        username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 18,
            message: '长度在 3 到 18 个字符',
            trigger: 'blur'
          }
        ],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入电话',
          trigger: 'blur'
        }]
      },

      EditUserFormRules: { // 编辑用户添加规则
        username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 18,
            message: '长度在 3 到 18 个字符',
            trigger: 'blur'
          }
        ],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入电话',
          trigger: 'blur'
        }]
      },
    };
  },
  methods: {
    // 1.加载列表
    async loadUsers(page) {
      const res = await this.$http.get("/users", {
        params: {
          // 请求参数，对象会被转换为 k=v&k=v 的格式，然后拼接到请求路径 ? 后面发起请求
          pagenum: page, // 加载的当前页数
          pagesize: this.pageSize,// 加载的数量
          query: this.searchText // 根据搜索文本框的内容来搜索
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
    },
    // 4. 修改用户状态
    async changeState(user) {
      const {
        id: userId,
        mg_state: state
      } = user
      
      // 拿到用户ID,和 switch 开关选中的状态 state,发起请求
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'} 成功`
        })
      }
    },

    // 5. 点击创建用户
    async handleAddUser() {
      const res = await this.$http.post('/users', this.AddUserForm)
      const {
        meta
      } = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '用户添加成功'
        })
      } else {
        this.$message({
          type: 'success',
          message: '用户添加失败'
        })
      }
      // 1. 添加成功,关闭对话框
      this.AddFormVisible = false
      // 2. 清空对话框
      for (let key in this.AddUserForm) {
        this.AddUserForm[key] = ''
      }
      // 3. 重新加载页面
      this.loadUsers(this.currentPage)
    },

    // 6. 删除用户
    async handelDeleteUser(user) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${user.id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除成功重新加载数据跳转当前页面
          this.loadUsers(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 7.1 编辑用户
    async handelshowEditForm(user) {
      // 弹出编辑对话框
      this.editFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      if (res.data.meta.status === 200) {
        this.EditUserForm = res.data.data
      }
    },
    // 7.2 点击按钮编辑发送请求
    async handelEditUser () {
      // 点击按钮弹窗是否确认编辑
    
      this.$confirm('是否编辑该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
      const {id:userId} = this.EditUserForm
        const res = await this.$http.put(`users/${userId}`, this.EditUserForm)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          });
          // 关闭对话框
          this.editFormVisible = false
          // 重新加载数据
          this.loadUsers(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消编辑'
        });
        // 关闭对话框
        this.editFormVisible = false
      });
    },
    // 8. 查询用户
    async handleSearch () {
      this.loadUsers(1)
      // 查询之后清空文本框
      this.searchText=''
    }
  }
};
// 