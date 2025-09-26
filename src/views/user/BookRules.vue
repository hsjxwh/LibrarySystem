<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="top-bar" style="height: 60px; background-color: #3a0783">
          <div class="top-content">
            <div class="title">书馆借阅须知</div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <Expand style="width: 2em; height: 1.5em; margin-top: 8px; color: #fff" />
                <el-icon class="el-icon--right"></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/BookStorage">馆藏查询</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/RecommendBooks">个性化图书推荐</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/ReaderBorrowRecord">个人借阅记录</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/ReaderOrders">个人订单记录</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/BookRules">书馆借阅规则</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/Charts">书本借阅排行</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/RecommendStore">推荐书籍入馆</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/Info">个人信息</router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="card-container">
    <el-container>
      <el-main>
        <el-card style="max-width: 1200px" class="bord-card">
          <el-header class="form-title">借阅须知</el-header>
          <p class="normal-p">
            图书馆提供借阅服务，但只能进行线下借阅，读者需要去服务台办理借阅服务，有以下两种形式:
          </p>
          <p class="normal-p">(1)100元的开通金额，单人同时能借20本书</p>
          <p class="normal-p">(2)50元的开通金额，单人同时能借10本书</p>
          <p class="normal-p">
            开通过，读者可通过携带想借阅的书籍到服务台，通过右上角导航至个人信息页，出示二维码给管理员即可实现借阅。开通过后也可以改变服务类型，去服务台办理即可。
            <strong>升档需要充值50元，降档需要满足余额大于等于50元的条件。</strong>
          </p>
          <p class="normal-p">
            <strong>
              一次借阅时长30天，一次借阅记录最多续借两次，读者可以去图书馆的服务台进行续借。请小心保存借阅书籍，如遇破损，根据实际情况进行扣除押金，当押金余额小于20的时候，无法进借阅服务。此时读者需要在图书馆服务台进行充值，押金余额仅需要高于20即可，最小的充值金额是5元。
            </strong>
          </p>
          <p class="normal-p">
            <strong>
              逾期未还扣除用户信用分，初始分值是100，当低于60的时候无法再进行借阅服务。
            </strong>
          </p>
          <p class="normal-p">
            <strong>如想取消服务，去服务台办理即可，书馆会退还剩余的押金。</strong>
          </p>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script setup></script>
<style scoped>
@import url(../../assets/css/top.css);
@import url(../../assets/css/dropdown.css);
@import url(../../assets/css/card.css);
@import url(../../assets/css/middleCard.css);
.form-title {
  background-color: #3a0783;
  color: white;
}
</style>
