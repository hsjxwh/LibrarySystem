<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">管理用户登录情况</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
                <el-icon class="el-icon--right"></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/Manager/OperateBooks">增加馆藏</router-link>
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup></script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/buttons.css);
@import url(../../assets/css/paper-cut.css);
.form-box {
  margin-top: 10px;
  color: #080709;
}

/* 使用深度选择器来影响对话框头部 */
:deep(.custom-dialog) .el-dialog__header {
  text-align: center;
  background: linear-gradient(45deg, #e0dce2, #3f0963);
  border-radius: 4px 4px 0 0;
  padding: 15px 20px;
}

:deep(.custom-dialog) .el-dialog__title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

:deep(.custom-dialog) .el-dialog__headerbtn {
  top: 15px;
}

:deep(.custom-dialog) .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

/* 表单样式 */
.form-box {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-box > span:first-child {
  flex: 0 0 100px;
  text-align: left;
  padding-right: 15px;
  color: #000000;
  font-weight: 500;
}

.form-box .el-input,
.form-box .el-textarea {
  flex: 1;
}

.form-box .el-textarea .el-textarea__inner {
  min-height: 80px;
  resize: vertical;
}
</style>
