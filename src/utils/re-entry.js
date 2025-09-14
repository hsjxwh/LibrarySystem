import { goDest } from './router';
import { ElMessage } from 'element-plus';
export function reEntry(error) {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    ElMessage.error(error.response.data);
    goDest('/');
  } else {
    ElMessage.error('网站出错，请联系管理员');
  }
}
