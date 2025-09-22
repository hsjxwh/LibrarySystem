<template>
  <el-container style="min-height: 100vh; flex-direction: column">
    <el-header height="60px" style="background-color: #3a0783; padding: 0">
      <div class="top-content">
        <div class="title">借阅服务管理</div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
            <el-icon class="el-icon--right"></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/Manager/OperateBooks">管理馆藏</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/BorrowRecord">借阅服务管理</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/BookStorage">馆藏查询</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/ProcessRecommendRecord">审核读者荐书</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/WaitToProcurement">待采购列表</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Manager/ForceQuit">管理用户登录情况</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="flex: 1">
      <el-aside width="150px">
        <div>
          <el-button class="button2" @click="activeContent = 'open'">开通借阅服务</el-button>
        </div>
        <div>
          <el-button class="button2" @click="activeContent = 'rechange'">用户押金充值</el-button>
        </div>
        <div>
          <el-button class="button2" @click="showRecord">所有借阅记录</el-button>
        </div>
        <div>
          <el-button class="button2" @click="activeContent = 'book'">新增借阅记录</el-button>
        </div>
      </el-aside>
      <el-main>
        <div v-if="activeContent === 'open'" class="form-container">
          <div class="form-item">
            <el-button class="button1" @click="checkIdentity">连接电脑/手机端</el-button>
          </div>
          <div class="form-item">
            <span>用户id:</span>
            <el-input class="form-input" v-model="id" placeholder="请输入用户编号"></el-input>
          </div>
          <div class="form-item">服务类型:</div>
          <div class="form-item">
            <el-button class="button1" @click="serviceStart(100)">100元初始金额</el-button>
            <el-button class="button1" @click="serviceStart(50)">50元初始金额</el-button>
          </div>
          <el-dialog title="开通服务" v-model="startServiceeDialogVisible" width="500px">
            <div>
              <span class="label">读者编号:</span>
              <span>{{ id }}</span>
            </div>
            <div>
              <span class="label">服务类型:</span>
              <span>{{ serviceMode }}</span>
            </div>
          </el-dialog>
        </div>
        <div v-if="activeContent === 'rechange'" class="form-container">
          <div class="form-item">
            <el-button class="button1" @click="checkIdentity">连接电脑/手机端</el-button>
          </div>
          <div class="form-item">
            <span>用户id:</span>
            <el-input class="form-input" v-model="id" placeholder="请输入用户编号"></el-input>
          </div>
          <div class="form-item">
            <span>充值金额:</span>
            <el-input class="form-input" v-model="rechange" placeholder="最少5元" />
          </div>
          <div class="form-item">
            <el-button class="button1" @click="userRechange">充值</el-button>
          </div>
          <el-dialog title="用户充值" v-model="rechangeDialogVisible" width="500px"></el-dialog>
        </div>
        <div v-if="activeContent === 'record'" class="form-container">
          <el-table
            :data="tableData"
            style="min-width: 1500px; width: 100%; margin-left: 20px"
            stripe
          >
            <el-table-column prop="id" label="借阅编号" width="100" class="form-item" />
            <el-table-column prop="userId" label="读者编号" width="100" class="form-item" />
            <el-table-column prop="bookId" label="图书编号" width="100" class="form-item" />
            <el-table-column prop="name" label="书名" width="200" class="form-item" />
            <el-table-column prop="author" label="作者" width="150" class="form-item" />
            <el-table-column prop="time" label="借阅时间" width="200" class="form-item" />
            <el-table-column prop="managerId1" label="借阅管理员id" width="100" class="form-item" />
            <el-table-column
              prop="expectedReturnTime"
              label="预计还书时间"
              width="200"
              class="form-item"
            />
            <el-table-column prop="restitution" label="是否归还" width="50" class="form-item" />
            <el-table-column prop="managerId2" label="还书管理员id" width="100" class="form-item" />
            <el-table-column prop="returnTime" label="还书时间" width="200" class="form-item" />
            <el-table-column prop="deposit" label="扣除押金" width="100" class="form-item" />
            <el-table-column prop="renewTime" label="续借次数" width="100" class="form-item" />
            <el-table-column label="管理" width="200" class="form-item">
              <template #default="scope">
                <el-button type="primary" size="small" @click="renew(scope.row)" class="button1">
                  续借
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="retunrBook(scope.row)"
                  class="button1"
                >
                  还书
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="续借" v-model="renewDialogVisible" width="500px">
            <div>确定续借？</div>
            <div class="form-box">
              <span>记录编号:</span>
              <span>{{ currentRow.id }}</span>
            </div>
            <div class="form-box">
              <span>读者id:</span>
              <span>{{ currentRow.userId }}</span>
            </div>
            <div class="form-box">
              <span>书名:</span>
              <span>{{ currentRow.name }}</span>
            </div>
            <div class="form-box">
              <span>作者:</span>
              <span>{{ currentRow.author }}</span>
            </div>
            <div class="form-box">
              <el-button
                type="primary"
                size="small"
                @click="submitRenew(currentRow)"
                class="button1"
              >
                确定
              </el-button>
              <el-button type="primary" size="small" @click="closeRenew()" class="button1">
                取消
              </el-button>
            </div>
          </el-dialog>
          <el-dialog title="还书" v-model="ReturnDialogVisible" width="500px">
            <div>确定还书？</div>
            <div class="form-box">
              <span>记录编号:</span>
              <span>{{ currentRow.id }}</span>
            </div>
            <div class="form-box">
              <span>读者id:</span>
              <span>{{ currentRow.userId }}</span>
            </div>
            <div class="form-box">
              <span>书名:</span>
              <span>{{ currentRow.name }}</span>
            </div>
            <div class="form-box">
              <span>作者:</span>
              <span>{{ currentRow.author }}</span>
            </div>
            <div class="form-box">
              <el-button
                type="primary"
                size="small"
                @click="submitReturn(currentRow)"
                class="button1"
              >
                确定
              </el-button>
              <el-button type="primary" size="small" @click="closeReturn()" class="button1">
                取消
              </el-button>
            </div>
          </el-dialog>
          <div>
            <el-pagination
              background
              layout="prev, pager, next, total"
              :total="total"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="handleChange"
            />
          </div>
        </div>
        <div v-if="activeContent === 'checkUser'" class="form-container">
          <div class="form-item">
            <el-button class="button1" @click="checkIdentity">连接电脑/手机端</el-button>
          </div>
          <div class="form-item">
            <span class="label">读者编号:</span>
            <el-input class="form-input" v-model="id" placeholder="请输入读者的编号" />
          </div>
          <div class="form-item">
            <span class="label">书名:</span>
            <el-input class="form-input" v-model="name" placeholder="请输入图书的名字" />
          </div>
          <div class="form-item">
            <span class="label">作者名:</span>
            <el-input class="form-input" v-model="author" placeholder="请输入图书的作者名字" />
          </div>
          <div>
            <el-button class="button1" @click="wantSubmitBook">提交</el-button>
          </div>
          <el-dialog title="请检查信息正误" v-model="bookDialogVisible" width="500px">
            <div class="form-box">
              <span>读者id:</span>
              <span>{{ id }}</span>
            </div>
            <div class="form-box">
              <span>书名:</span>
              <span>{{ name }}</span>
            </div>
            <div class="form-box">
              <span>作者:</span>
              <span>{{ author }}</span>
            </div>
            <div class="form-box">
              <el-button type="primary" size="small" @click="submitBook" class="button1">
                确定
              </el-button>
              <el-button type="primary" size="small" @click="closeBook" class="button1">
                取消
              </el-button>
            </div>
          </el-dialog>
        </div>
        <el-dialog title="连接电脑/手机" v-model="socketDialogVisible" width="500px">
          <div class="form-box">
            <el-button type="primary" size="small" @click="phoneConect" class="button1">
              手机端
            </el-button>
          </div>
          <div>
            <el-button type="primary" size="small" @click="computerContect" class="button1">
              电脑端
            </el-button>
          </div>
        </el-dialog>
        <el-dialog title="请用手机网页端扫描此二维码" v-model="qrDialogVisible" width="500px">
          <div class="qrcode-container">
            <qrcode-vue :value="QR" :size="200" level="H"></qrcode-vue>
          </div>
        </el-dialog>
        <div class="scanner-container" v-if="scanDialogVisible">
          <div class="exit-button" @click="stopScanning">
            <el-icon><ArrowLeft /></el-icon>
          </div>
          <video ref="video" autoplay playsinline muted class="video-element"></video>
          <div class="scan-overlay">
            <div class="scan-frame"></div>
            <div class="scan-line"></div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { ref, onUnmounted } from 'vue';
import { handleCurrentChange, updateTableData } from '@/utils/paperCut';
import service from '@/utils/global';
import { ElMessage } from 'element-plus';
import { siteError } from '@/utils/error';
import jsQR from 'jsqr';
import { ArrowLeft } from '@element-plus/icons-vue';
import { goDest } from '@/utils/router';
const renewDialogVisible = ref(false);
const ReturnDialogVisible = ref(false);
const rechangeDialogVisible = ref(false);
const currentPage = ref(1);
const currentRow = ref(null);
const tableData = ref([]);
const pageSize = ref(20);
const total = ref(0);
const allData = ref([]);
const activeContent = ref('open');
const name = ref('');
const id = ref('');
const author = ref('');
const refund = ref('');
const bookDialogVisible = ref(false);
const startServiceeDialogVisible = ref(false);
const socketDialogVisible = ref(false);
const rechange = ref('');
const serviceMode = ref('');
const qrDialogVisible = ref(false);
const scanDialogVisible = ref(false);
let connection = ref(null);
const QR = ref();
const error = ref(null);
const connectToken = ref('');
//视频元素引用
const video = ref(null);
//媒体流对象
const stream = ref(null);
const scanResult = ref(null);
//扫描状态
const isScanning = ref(false);
//动画帧id
const animationFrameId = ref(null);
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
connection.onopen = function () {
  ElMessage.success('连接服务器成功');
};
connection.onmessage = function (event) {
  const data = JSON.parse(event.data);
  if (data.status === 1) {
    id.value = data.id;
    ElMessage.info(`读取到次用户编号为${id.value}`);
  } else if (data.status === 2) {
    ElMessage.warning(data.message);
    connection.close();
  } else if (data.status === 3) {
    ElMessage.info('安全关闭');
    connection.close();
  } else if (data.status === 4) {
    ElMessage.success(data.message);
  } else {
    ElMessage.error('网站出错，联系管理员');
  }
};
connection.onclose = function (event) {
  ElMessage.info('连接已关闭');
};
connection.onerror = function (event) {};
//如果时电脑端，则需要点击按钮之后出现一个有二维码的界面，让用户能够成功的扫描
function computerContect() {
  getQR();
  qrDialogVisible.value = true;
  connectToken.value = QR.value;
  connection.value = new WebSocket(
    `wss://whswlibrarysystem.top/manager/connect?connectToken=${connectToken.value}&device=pc`
  );
}
//手机端扫描电脑端提供的二维码，使得假如websocket连接
function phoneConect() {
  scanDialogVisible.value = true;
  startScanning();
}
const startScanning = async () => {
  error.value = null;
  scanResult.value = null;
  const element = document.documentElement;
  try {
    //获取用户摄像头权限
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    //设置播放的数据源
    video.value.srcObject = stream.value;
    await new Promise((resolve) => {
      video.value.onloadedmetadata = () => {
        resolve();
      };
    });
    await video.value.play();
    isScanning.value = true;
    scanning();
  } catch (err) {
    err.value = '无法访问摄像头';
  }
};
function scanning() {
  if (!isScanning.value) return;
  if (video.value.readyState === video.value.HAVE_ENOUGH_DATA) {
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        connectToken.value = code.data;
        connection = new WebSocket(
          `wss://whswlibrarysystem.top/manager/connect?connectToken={${connectToken.value}}&device=phone`
        );
        stopScanning();
      }
    } catch (err) {
      ElMessage.info(err);
    }
    if (isScanning.value) {
      animationFrameId = requestAnimationFrame(scanning);
    }
  }
}
function stopScanning() {
  isScanning.value = false;
  cancelAnimationFrame(animationFrameId);
  if (stream.value) {
    stream.value.getTracks().forEach((element) => {
      element.stop();
    });
  }
  if (video.value) {
    video.value.srcObject = null;
  }
  scanDialogVisible.value = false;
}
onUnmounted(() => {
  stopScanning();
  if (connection) {
    connection.value.close();
  }
});
function handleChange(page) {
  handleCurrentChange(allData, tableData, page, currentPage, pageSize);
}
function showRecord() {
  activeContent.value = 'record';
  getRecord();
}
function checkIdentity() {
  socketDialogVisible.value = true;
}
//获得手机端需要扫描的二维码
function getQR() {
  service
    .get('/manager/generateQrToken', {
      params: {
        device: 'pc',
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      QR.value = response.data;
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function getRecord() {
  service
    .get('/manager/getAllBookRecord', {
      params: {
        id: id.value.trim().length <= 0 ? -1 : parseInt(id.value),
        name: name.value.trim().length <= 0 ? '' : name.value,
        author: author.value.trim().length <= 0 ? '' : author.value,
      },
      paramsSerializer: {
        indexes: null,
      },
    })
    .then((response) => {
      const dataWithRank = response.data.map((item, index) => {
        return {
          time: dealWithTime(item.time),
          bookId: item.bookId,
          userId: item.userId,
          expectedReturnTime: dealWithTime(item.expectedReturnTime),
          returnTime: item.returnTime ? dealWithTime(item.returnTime) : '-',
          managerId1: item.managerId1,
          managerId2:
            item.managerId2 !== null && item.managerId2 !== undefined ? item.managerId2 : '-',
          id: item.id,
          restitution: item.restitution === true ? '是' : '否',
          deposit: item.deposit !== null && item.deposit !== undefined ? item.deposit : '-',
          name: item.name,
          author: item.author,
          renewTime: item.renewTime,
        };
      });
      allData.value = dataWithRank;
      total.value = dataWithRank.length;
      updateTableData(allData, tableData, currentPage, pageSize);
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
function dealWithTime(time) {
  const dateObj = new Date(time);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
//打开续借窗口
function renew(row) {
  if (row.restitution === '是') {
    ElMessage.error('该书已归还，请重新借阅');
    return;
  }
  renewDialogVisible.value = true;
}
//续借
function submitRenew(row) {
  const formData = new URLSearchParams();
  formData.append('id', row.id);
  formData.append('userId', row.userId);
  formData.append('bookId', row.bookId);
  formData.append('name', row.name);
  formData.append('author', row.author);
  formData.append('expectedReturnTime', row.expectedReturnTime);
  service
    .post('/manager/renewBook', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .response((response) => {
      ElMessage.info(response.data.info);
      row.expectedReturnTime == dealWithTime(response.data.expireTime);
      closeRenew();
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//关闭续借窗口
function closeRenew(row) {
  renewDialogVisible.value = false;
}
//打开还书窗口
function retunrBook(row) {
  if (row.restitution === '是') {
    ElMessage.error('该书已归还，请重新借阅');
    return;
  }
  ReturnDialogVisible.value = true;
}
//还书
function submitReturn(row) {
  const formData = new URLSearchParams();
  formData.append('id', row.id);
  formData.append('userId', row.userId);
  formData.append('bookId', row.bookId);
  formData.append('name', row.name);
  formData.append('author', row.author);
  formData.append('expectedReturnTime', row.expectedReturnTime);
  service
    .post('/manager/returnBook', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      ElMessage.info(response.data);
      closeReturn();
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//关闭还书窗口
function closeReturn() {
  ReturnDialogVisible.value = false;
}
//借书
function submitBook() {
  const formData = new URLSearchParams();
  formData.append('id', id.value);
  formData.append('name', name.value);
  formData.append('author', author.value);
  service
    .post('/manager/addBookRecord', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      ElMessage.info(response.data);
      id.value = '';
      name.value = '';
      author.value = '';
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//打开借书界面
function wantSubmitBook() {
  if (id.value.trim().length <= 0) {
    ElMessage.warning('请输入读者编号');
    return;
  }
  if (name.value.trim().length <= 0) {
    ElMessage.warning('请输入书籍名称');
    return;
  }
  if (author.value.trim().length <= 0) {
    ElMessage.warning('请输入书籍作者');
    return;
  }
  bookDialogVisible.value = true;
}
//关闭借书界面
function closeBook() {
  bookDialogVisible.value = false;
}
//显示服务窗口
function serviceStart(money) {
  if (id.value.trim().length <= 0) {
    ElMessage.warning('请输入读者编号');
    return;
  }
  serviceMode.value = money + '元';
  startServiceeDialogVisible.value = true;
}
//显示充值窗口
function userRechange() {
  if (id.value.trim().length <= 0) {
    ElMessage.warning('请输入读者编号');
    return;
  }
  if (rechange.value.trim().length <= 0) {
    ElMessage.warning('请输入充值金额');
    return;
  } else {
    if (parseFloat(rechange.value) < 5) {
      ElMessage.warning('充值金额不能小于5元');
      return;
    }
  }
  rechangeDialogVisible.value = true;
}
</script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
@import url(../../assets/css/addBooKForm.css);
::v-deep .el-aside {
  background-color: #e8e0ed;
  border-right: 1px solid #935aba;
}
:deep(.el-pagination .el-pager li.is-active.number) {
  background-color: #935aba !important;
  color: #ffffff !important;
  border-radius: 4px;
}

:deep(.el-pagination .el-pager li:not(.is-active):hover) {
  color: #9705f8 !important;
  background-color: #f0e6ff !important;
}
.scanner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.exit-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10000;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.exit-button .el-icon {
  color: white;
  font-size: 24px;
}
/* 扫描框样式 */
.scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* 允许点击穿透到下层元素 */
}

.scan-frame {
  width: 70%;
  height: 200px;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3); /* 创建四周的暗色遮罩 */
}

.scan-line {
  position: absolute;
  height: 2px;
  width: 70%;
  background-color: #3a0783; /* 紫色扫描线 */
  animation: scan 2s infinite linear; /* 持续动画效果 */
}

@keyframes scan {
  0% {
    top: 50%; /* 从中间开始 */
  }
  50% {
    top: calc(50% + 200px); /* 向下移动200px */
  }
  100% {
    top: 50%; /* 回到中间 */
  }
}
</style>
