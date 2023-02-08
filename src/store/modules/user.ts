// user store
import api from '@/api'
import { Notification } from '@/utils/composables/tools';
import { throwError } from 'element-plus/es/utils';

const useUserStore = defineStore(
  "user", {
  state: () => {
    return {
      userAccount: localStorage.userAccount ?? '',
      permissions: localStorage.permissions ?? '',
      last_login_time: ref(localStorage.last_login_time ?? ""),
    };
  },
  getters: {},
  actions: {
    // 登录
    async login(data: {
      userAccount: string,
      userPassword: string,
    }) {
      const res = await api.post('/api/login', data)
      localStorage.setItem('userAccount', res.data.userAccount)
      localStorage.setItem('permissions', res.data.userRole)

      let last_login_time = new Date().getTime().toString()
      localStorage.setItem("last_login_time",last_login_time)
      this.userAccount = res.data.userAccount
      this.permissions = res.data.userRole
      this.last_login_time = last_login_time.toString();
      
    },
    // 注册
    async register(data: {
      userName: string
      userAccount: string
      userPassword: string
      checkPassword: string
      userRole: string
    }) {
      const res = await api.post('/api/register', data)
      localStorage.setItem('userAccount', res.data.userAccount)
      localStorage.setItem('permissions', res.data.userRole)
      localStorage.setItem("last_login_time", new Date().getTime().toString())
      this.userAccount = res.data.userAccount
      this.permissions = res.data.userRole
    },
    // 登录状态,true 有效登录，false 无效登录
    login_status() {
      let retn = false;
      if (this.userAccount != "" && this.last_login_time != "") {
        if (new Date().getTime() - parseInt(this.last_login_time) < 24 * 60 * 60 * 1000) {
          retn = true
        }
      }
      return retn;
    },
    // 登出
    async logout() {
      localStorage.removeItem('userAccount')
      localStorage.removeItem('last_login_time')
      this.userAccount = ''
      this.last_login_time = ''
      // routeStore.removeRoutes()
    },
    // 获取权限
    async getPermissions() {
      // 通过 mock 获取权限
      return this.permissions
    }
  },
});
export default useUserStore;