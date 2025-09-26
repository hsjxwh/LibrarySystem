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
                <router-link to="/Manager/OrdersCheck">管理订单记录</router-link>
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
        <!-- 开通借阅服务 -->
        <div v-if="activeContent === 'open'" class="form-container">
          <div class="form-item">
            <el-button class="button1" @click="checkIdentity">连接电脑/手机端</el-button>
          </div>
          <div class="form-item">
            <span>用户id:</span>
            <el-input
              class="form-input"
              v-model="id"
              placeholder="请扫描用户身份码获取用户账号"
            ></el-input>
          </div>
          <div class="form-item">服务类型:</div>
          <div class="form-item">
            <el-button class="button1" @click="serviceStart(100)">100元初始金额</el-button>
            <el-button class="button1" @click="serviceStart(50)">50元初始金额</el-button>
          </div>
        </div>
        <!-- 用户充值 -->
        <div v-if="activeContent === 'rechange'" class="form-container">
          <div class="form-item">
            <el-button class="button1" @click="checkIdentity">连接电脑/手机端</el-button>
          </div>
          <div class="form-item">
            <span>用户id:</span>
            <el-input
              class="form-input"
              v-model="id"
              placeholder="请扫描用户身份码获取用户账号"
            ></el-input>
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
        <!-- 查看所有借阅记录并操作 -->
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
            <el-table-column prop="deposit" label="订单编号" width="75" class="form-item" />
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
        <!-- 新增借阅记录 -->
        <div v-if="activeContent === 'book'" class="form-container">
          <div class="form-item">
            <el-button class="button1" @click="checkIdentity">连接电脑/手机端</el-button>
          </div>
          <div class="form-item">
            <span>用户id:</span>
            <el-input
              class="form-input"
              v-model="id"
              placeholder="请扫描用户身份码获取用户账号"
            ></el-input>
          </div>
          <div class="form-item">
            <span>书籍id:</span>
            <el-input class="form-input" v-model="bookId" placeholder="请查询馆藏"></el-input>
          </div>
          <div class="form-item">
            <el-button class="button1" @click="wantSubmitBook">提交借阅记录</el-button>
          </div>
        </div>
        <el-dialog title="连接电脑/手机" v-model="socketDialogVisible" width="500px">
          <div class="form-box">
            <el-button
              type="primary"
              style="padding-bottom: 20px"
              size="middle"
              @click="phoneConect"
              class="button1"
            >
              手机端
            </el-button>
            <span>初次时扫描电脑连接码，提示连接成功后即可识别用户身份码\付款码</span>
          </div>
          <div>
            <el-button type="primary" size="small" @click="computerContect" class="button1">
              电脑端
            </el-button>
          </div>
          <div>
            <el-button type="primary" size="small" @click="disconnect" class="button1">
              关闭连接
            </el-button>
            <span>通用，一方关闭即可</span>
          </div>
        </el-dialog>
        <el-dialog title="请用手机网页端扫描此二维码" v-model="qrDialogVisible" width="500px">
          <div class="qrcode-container">
            <qrcode-vue :value="QR" :size="200" level="H"></qrcode-vue>
          </div>
        </el-dialog>
        <el-dialog title="请见确认信息" v-model="bookDialogVisible" width="500px">
          <div class="form-item">用户编号:{{ id }}</div>
          <div class="form-item">书籍编号:{{ bookId }}</div>
          <div class="form-item">
            <el-button class="button1" @click="submitBook">确定</el-button>
            <el-button class="button1" @click="closeBook">取消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="开通服务" v-model="startServiceeDialogVisible" width="500px">
          <div>
            <span class="label">读者编号:</span>
            <span>{{ id }}</span>
          </div>
          <div>
            <span class="label">服务类型:</span>
            <span>{{ serviceMode }}</span>
          </div>
          <div class="form-item">
            <el-button class="button1" @click="startService">确定</el-button>
            <el-button class="button1" @click="closeService">取消</el-button>
          </div>
        </el-dialog>
        <div class="scanner-container" v-if="scanDialogVisible">
          <div class="exit-button" @click="stopScanningOnly">
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
import QrcodeVue from 'qrcode.vue';
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
const bookId = ref('');
const author = ref('');
const refund = ref('');
const bookDialogVisible = ref(false);
const startServiceeDialogVisible = ref(false);
const socketDialogVisible = ref(false);
const rechange = ref('');
const serviceMode = ref('');
const qrDialogVisible = ref(false);
const scanDialogVisible = ref(false);
const pay = ref(false);
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
//定时器
const connectionTimer = ref(null);
//连接时长
const CONNECTION_TIMEOUT = 60 * 60 * 1000;
const serviceType = ref();
const closeMessage = {
  status: 3,
  id: -1,
  message: '正常关闭连接',
};
//绑定事件监听器
function setupWebSocketEvents() {
  connection.value.onopen = function () {
    ElMessage.success('连接服务器成功');
    startConnectionTimer();
  };
  connection.value.onmessage = function (event) {
    const data = JSON.parse(event.data);
    resetConnectionTimer();
    //安全传输
    if (data.status === 1) {
      id.value = data.id;
      ElMessage.info(`读取到次用户编号为${id.value}`);
    }
    //危险关闭
    else if (data.status === 2) {
      ElMessage.warning(data.message);
      connection.value.close();
    }
    //正常关闭
    else if (data.status === 3) {
      ElMessage.info('安全关闭');
      connection.value.close();
    }
    //成功登录，或者说成功开通服务，成功充值
    else if (data.status === 4 || data.status === 5 || data.status === 6) {
      ElMessage.success(data.message);
    } else {
      ElMessage.error('网站出错，联系管理员');
    }
    connection.value.onclose = function (event) {
      ElMessage.info('连接已关闭');
      socketDialogVisible.value = false;
    };
    connection.value.onerror = function (event) {
      ElMessage.error('连接产生错误');
    };
  };
}
//如果时电脑端，则需要点击按钮之后出现一个有二维码的界面，让用户能够成功的扫描
async function computerContect() {
  if (connection.value && connection.value.readyState === WebSocket.OPEN) {
    ElMessage.info('您已成功来连接，不需要再生成连接二维码');
  } else {
    await getQR();
    connectToken.value = QR.value;
    connection.value = new WebSocket(
      `ws://localhost:8080/manager/connect?connectToken=${connectToken.value}&device=pc`
    );
    setupWebSocketEvents();
  }
  qrDialogVisible.value = true;
}
//手机端扫描电脑端提供的二维码，使得假如websocket连接
function phoneConect() {
  scanDialogVisible.value = true;
  startScanning();
}
//请求摄像头权限，比昂获取视频流
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
//扫描身份码
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
        if (!connection.value || connection.value.readyState !== WebSocket.OPEN) {
          connectToken.value = code.data;
          connection.value = new WebSocket(
            `ws://localhost:8080/manager/connect?connectToken=${connectToken.value}&device=phone`
          );
          setupWebSocketEvents();
          stopScanningOnly();
        } else {
          if (pay.value) {
            connection.value.send(
              JSON.stringify({
                status: 5,
                id: -1,
                message: code.data,
                serviceType: serviceType.value,
              })
            );
          } else {
            connection.value.send(
              JSON.stringify({
                status: 1,
                id: code.data,
                message: '扫描到身份码信息',
                serviceType: serviceType.value,
              })
            );
          }
          stopScanningOnly();
          pay.value = false;
          serviceType.value = null;
          serviceMode.value = null;
        }
      }
    } catch (err) {
      ElMessage.info(err);
    }
    if (isScanning.value) {
      animationFrameId.value = requestAnimationFrame(scanning);
    }
  }
}
//仅关闭扫描不关闭连接
function stopScanningOnly() {
  isScanning.value = false;
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  if (stream.value) {
    stream.value.getTracks().forEach((element) => {
      element.stop();
    });
  }
  scanDialogVisible.value = false;
}
function stopScanning() {
  stopScanningOnly();
  if (connection.value && connection.value.readyState === WebSocket.OPEN) {
    connection.send(
      JSON.stringify({
        status: 3,
        id: -1,
        message: '正常关闭连接',
      })
    );
    connection.value.close();
  }
}
function disconnect() {
  if (connection.value) {
    connection.value.close();
  }
  clearConnectionTimer();
}
onUnmounted(() => {
  stopScanning();
  disconnect();
  clearConnectionTimer();
});
function startConnectionTimer() {
  clearConnectionTimer();
  connectionTimer.value = setTimeout(() => {
    ElMessage.warning('连接超时，自动断开');
    if (connection.value && connection.value.readyState === WebSocket.OPEN) {
      connection.value.close();
    }
  }, CONNECTION_TIMEOUT);
}
function resetConnectionTimer() {
  clearConnectionTimer();
  startConnectionTimer();
}
function clearConnectionTimer() {
  if (connectionTimer.value) {
    clearTimeout(connectionTimer.value);
    connectionTimer.value = null;
  }
}
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
  return service
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
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        ElMessage.error(error.response.data);
        return;
      }
      siteError();
    });
}
//获取借阅记录
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
          orderId: item.orderId == -1 ? '-' : item.orderId,
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
//处理时间的展示
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
    .then((response) => {
      ElMessage.info(response.data.info);
      row.expectedReturnTime = dealWithTime(response.data.expireTime);
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
  formData.append('bookId', bookId.value);
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
  if (bookId.value.trim().length <= 0) {
    ElMessage.warning('请输入书籍编号');
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
  if (money == 50) {
    serviceMode.value = '开通50元服务类型';
    serviceType.value = 1;
  } else if (money == 100) {
    serviceMode.value = '开通100元服务类型';
    serviceType.value = 2;
  } else {
    ElMessage.warning('服务类型错误');
    return;
  }
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
//修改用户的目前拥有的服务
function startService() {
  pay.value = true;
  phoneConect();
}
//关闭服务窗口
function closeService() {
  startServiceeDialogVisible.value = false;
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
  width: 300px;
  height: 300px;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3); /* 创建四周的暗色遮罩 */
}

.scan-line {
  position: absolute;
  height: 3px;
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
