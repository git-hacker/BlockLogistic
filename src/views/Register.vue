<template>
  <div class="box-card">
    <div class="type-select">
      <el-radio v-model="userType" label="1">货主</el-radio>
      <el-radio v-model="userType" label="2">司机</el-radio>
    </div>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form
         label-position="left"
         label-width="80px"
         :model="formRegister"
         :rules="rules"
         ref="formRegister">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="name">
            <el-input v-model="formRegister.id"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formRegister.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formRegister.checkPassword"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addUser">立即注册</el-button>
              <el-button>取消</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  export default {
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('用户名不能为空!'))
        }else{
          cb(); // 将判断传递给后面
        }
      }
      let checkId = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('身份证号不能为空!'));
        } else {
          cb();
        }
      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('密码不能为空!'))
         }else{
          cb();
         }
      }
      let checkPasswordAgain = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('再次输入密码不能为空!'))
         }else if(value !== this.formRegister.password){
          return cb(new Error('两次输入密码不一致!'));
         }else{
          cb();
         }
      }

      return{
        formRegister:{
          name: '',
          id: '',
          password: '',
          checkPassword: '',
        },
        rules:{
          name:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          id: [
            {validator:checkId,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ],
          checkPassword:[
            {validator:checkPasswordAgain,trigger: 'blur'}
          ],
        },
        userType: '1',
      }
    },
    methods:{
      // 用户注册
      addUser(){
        let user = this.formRegister;
        let formData = {
          name: user.name,
          id: user.id,
          password: user.password,
          userType: parseInt(this.userType)
        };
        // 表单验证
        this.$refs['formRegister'].validate((valid)=>{
          if(valid){
            this.$http.post('/api/register',formData)
            .then(res => {
              if (res.data.error) {
                this.$message.error(res.data.error);
                return false;
              }else{
                this.$router.push('/login')
              }
            })
            .catch(err => {
                this.$message.error(`${err.message}`)
            })
          }else{
            this.$message.error('表单验证失败!')
            return false;
          }
        })
      }
    }
  }
</script>
<style>
  .box-card {
    padding: 50px 0;
  }
  .type-select {
    margin-bottom: 20px;
  }
</style>
