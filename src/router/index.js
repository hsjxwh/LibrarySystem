import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Info from '../views/Info.vue';
import BookStorage from '../views/user/BookStorage.vue';
import BorrowRecord from '../views/manager/BorrowRecord.vue';
import { hasPermission } from '../utils/permission';
import { ElMessage } from 'element-plus';
import ReaderBorrowRecord from '@/views/user/ReaderBorrowRecord.vue';
import BookRules from '@/views/user/BookRules.vue';
import OperateBooks from '@/views/manager/OperateBooks.vue';
import UserInfo from '@/views/user/Info.vue';
import Charts from '@/views/user/Charts.vue';
import Recommend from '@/views/user/Recommend.vue';
import RecommendToStore from '@/views/user/RecommendToStore.vue';
import ProcessRecommendRecord from '@/views/manager/ProcessRecommendRecord.vue';
import WaitToProcurement from '@/views/manager/WaitToProcurement.vue';
import ForceQuit from '@/views/manager/ForceQuit.vue';
import TestUser from '@/views/manager/TestUser.vue';
import OrdersCheck from '@/views/manager/OrdersCheck.vue';
import ReaderOrders from '@/views/user/ReaderOrders.vue';
import UserPay from '@/views/manager/UserPay.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/infolast', component: Info },
  { path: '/BookStorage', component: BookStorage },
  { path: '/Manager/BorrowRecord', component: BorrowRecord, meta: { role: 'manager' } },
  { path: '/RecommendBooks', component: Recommend },
  { path: '/ReaderBorrowRecord', component: ReaderBorrowRecord },
  { path: '/BookRules', component: BookRules },
  { path: '/Charts', component: Charts },
  { path: '/Manager/OperateBooks', component: OperateBooks },
  { path: '/Info', component: UserInfo },
  { path: '/RecommendStore', component: RecommendToStore },
  { path: '/Manager/ProcessRecommendRecord', component: ProcessRecommendRecord },
  { path: '/Manager/WaitToProcurement', component: WaitToProcurement },
  { path: '/Manager/ForceQuit', component: ForceQuit },
  { path: '/Manager/TestUser', component: TestUser },
  { path: '/Manager/OrdersCheck', component: OrdersCheck },
  { path: '/Manager/ReaderOrders', component: ReaderOrders },
  { path: '/Manager/UserPay', component: UserPay },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
//防止非管理员用户访问管理员页面
router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/Manager/')) {
    try {
      if (await hasPermission()) {
        next();
        return;
      } else {
        ElMessage.error('您没有权限访问管理员页面');
      }
    } catch (error) {
      ElMessage.error('网站出错，请联系管理员');
    }
    next(false);
  } else next();
});
export default router;
