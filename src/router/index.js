import { createRouter,createWebHistory} from "vue-router";
import Home from '../views/Home.vue'
import Info from '../views/Info.vue'
import BookStorage from '../views/user/BookStorage.vue'
import BorrowRecord from "../views/manager/BorrowRecord.vue";
import Rider from "../views/rider/Rider.vue";
import {hasPermission} from "../utils/permission"
import { ElMessage } from "element-plus";
import Recommend from "@/views/user/Recommend.vue";
import ReaderBorrowRecord from "@/views/user/ReaderBorrowRecord.vue"
const routes=[
    {path:"/info",component:Info},
    {path:"/",component:Home},
    {path:"/BookStorage",component:BookStorage},
    {path:"/Rider",component:Rider},
    {path:"/Manager/BorrowRecord",component:BorrowRecord,meta:{role:'manager'}},
    {path:"/RecommendBooks",component:Recommend},
    {path:"/ReaderBorrowRecord",component:ReaderBorrowRecord},
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
//防止非管理员用户访问管理员页面
router.beforeEach(async(to,from,next)=>{
    if(to.path.startsWith('/Manager/')){
        try{
            if(await hasPermission()){
                next();
                return;
            }
            else{
                ElMessage.error('您没有权限访问管理员页面');
            }
        }catch(error){
            ElMessage.error('网站出错，请联系管理员1074702558@qq.com');
        }
        next(false);
    }
    else
        next();
})
export default router