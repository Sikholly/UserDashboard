import Vue from 'vue';
import VueRouter from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserDashboard from '../components/UserDashboard.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: UserLogin
		},
		{
			path: '/dashboard',
			component: UserDashboard,
			meta: { requiresAuth: true } // 添加需要登录才能访问的元信息
		}
	]
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
	// 检查路由是否需要登录权限
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 判断用户是否已登录，这里可以根据你的实际逻辑来判断
		const isLoggedIn = checkUserLoginStatus();
		if (!isLoggedIn) {
			// 如果用户未登录，重定向到登录页面
			next('/');
		} else {
			// 如果用户已登录，允许访问目标路由
			next();
		}
	} else {
		// 如果目标路由不需要登录权限，直接允许访问
		next();
	}
});

// 这是一个简单的示例，根据实际情况来检查用户的登录状态

function checkUserLoginStatus() {
	// 假设用户已登录，我们从 localStorage 中获取 token
	const token = localStorage.getItem('token');

	// 如果 token 存在且有效，我们认为用户已登录(没有判断是否有效不会用)
	if (token) {
		return true;
	} else {
		return false;
	}
}


export default router;
