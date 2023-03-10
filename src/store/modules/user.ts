// user store
import api from '@/api'
import url from "@/api/RequestInterface"
import useRouteStore from './route';
import useMenuStore from './menu';

const useUserStore = defineStore(
  "user",
  () => {
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    let userAccount = ref(localStorage.userAccount ?? '');
    let userName= ref(localStorage.userName ?? undefined);
    let permissions = ref(localStorage.permissions ?? '');
    let last_login_time = ref(localStorage.last_login_time ?? "");

    async function login(data: {
      userAccount: string,
      userPassword: string,
    }) {
      const res = await api.post(url.URLPrefix + url.Login, data)
      localStorage.setItem('userAccount', res.data.userAccount)
      localStorage.setItem('userName', res.data.userName)
      localStorage.setItem('permissions', res.data.userRole)
      let time = new Date().getTime().toString()
      localStorage.setItem("last_login_time", time)
      userAccount.value = res.data.userAccount
      permissions.value = res.data.userRole
      last_login_time.value = time.toString();
    }
    // 注册
    async function register(data: {
      userName: string
      userAccount: string
      userPassword: string
      checkPassword: string
      userRole: string
    }) {
      const res = await api.post(url.URLPrefix + url.Register, data)
      localStorage.setItem('userAccount', res.data.userAccount)
      localStorage.setItem('userName', res.data.userName)
      localStorage.setItem('permissions', res.data.userRole)
      localStorage.setItem("last_login_time", new Date().getTime().toString())
      userAccount = res.data.userAccount
      permissions = res.data.userRole
    }
    // 登录状态,true 有效登录，false 无效登录
    async function login_status() {
      let retn = false;
      if (userAccount.value != "" && last_login_time.value != "") {
        if (new Date().getTime() - parseInt(last_login_time.value) < 24 * 60 * 60 * 1000) {
          retn = true
        }
      }
      return retn;
    }
    // 登出
    async function logout() {
      localStorage.removeItem('userAccount')
      localStorage.removeItem('userName')
      localStorage.removeItem('last_login_time')
      userAccount.value = ''
      last_login_time.value = ''
      routeStore.removeRoutes()
      menuStore.generateMenusAtFront()
    }
    // 获取权限
    function getPermissions() {
      return permissions.value
    }
    return {
      userAccount,
      userName,
      permissions,
      last_login_time,
      login,
      register,
      logout,
      login_status,
      getPermissions
    }
  });
export default useUserStore;