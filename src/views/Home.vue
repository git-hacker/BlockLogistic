<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/home/truck">货车列表</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/home/order">订单列表</router-link>
      </el-menu-item>
      <el-menu-item index="3" :style="{float: 'right'}">
        <a @click="loginOut" href="javascript:;" v-show="user.id">退出登录</a>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        activeIndex:'1',
        user:{
          id:''
        }
      }
    },
    beforeCreate(){
      // 当主页刷新时，如果服务端设置的cookie（包含sessionId）
      // 的时效到了的话，便会提示未登录
      this.$http.get('/api')
        .then(res => {
          if (res.data.error) {
            this.$message.error(res.data.error);
            this.user.id = null;
            this.$router.push('/login');
            return false;
          }else{
            let id = localStorage.getItem('id');
            this.activeIndex = this.$route.name === 'truck' ? '1' : '2';
            this.user.id = id;
          }
        })
        .catch(err => {
            this.$message.error(`${err.message}`)
        })
    },
    created() {
      this.getIsSign();
    },
    methods: {
      ...mapActions(['userLoginOut']),
      getIsSign() {
          this.$http.get('/api/issign')
              .then(res => {
                  if (res.data.message === '已签约') {
                      // 已签约调用货车司机列表
                  } else {
                      this.$router.push({ name: 'sign' });
                    // 未签约说明要求用户签约
                  }
                  // if (res.data.is_sign) {
                  //     // 如果已经签约则跳转货车司机列表
                  // } else {
                  //     // 如果没有签约则点击签约
                  // }
              })
      },
      // 登出loginOut
      loginOut(){
        this.userLoginOut();
        this.user.id = null;
        this.$http.get('/api/logout')
          .then(res => {
            if (res.data.message) {
              this.$message.success(res.data.message);
              this.$router.push('/login');
            }
          })
          .catch(err => {
              this.$message.error(`${err.message}`)
          })
      }
    }
  }
</script>
