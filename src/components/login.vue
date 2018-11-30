<template>
  <div class="login">
    <div class="title">
      {{login.title}}
    </div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <el-form-item  prop="phone" class="xiala">
        <el-col :span="6">
        <el-select v-model="value" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-col>
        <el-col :span="18">
        <el-input v-model="loginForm.phone" placeholder="手机号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="validatenumber">
        <el-input v-model="loginForm.validatenumber" placeholder="验证码">
          <el-button type="text" slot="suffix"  @click="getValidate" :disabled="flag">{{valuetime}}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码（不少于6位）"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="loginin" :loading="loading">{{login.title}}</el-button>
  </div>
</template>

<script>
import {validatPhone} from '@/utilss/validate'
export default {
  name: 'login',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validatPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
        this.phoneflag = 0
      } else {
        callback()
        this.phoneflag = 1
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于6位'))
        this.passflag = 0
      } else {
        callback()
        this.passflag = 1
      }
    }
    return {
      loading: false,
      value: '+86',
      flag: false,
      phoneflag: 0,
      passflag: 0,
      loginForm: {
        phone: '',
        validatenumber: '',
        password: ''
      },
      login: {
        title: '登录'
      },
      valuetime: '点击获取验证码',
      loginRules: {
        phone: [{required: true, trigger: 'blur', validator: validatePhone}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      countdown: 60,
      options: [{
        value: '1',
        label: '+86'
      }, {
        value: '2',
        label: '+886'
      }, {
        value: '3',
        label: '+852'
      }, {
        value: '4',
        label: '+853'
      }
      ]
    }
  },
  methods: {
    settime () {
      var _this = this
      if (this.countdown === 0) {
        this.valuetime = '点击获取验证码'
        this.countdown = 60
        _this.flag = false
      } else {
        this.countdown--
        this.valuetime = '重发验证码(' + this.countdown + 's)'
        _this.flag = true
        setTimeout(function () {
          _this.settime()
        }, 1000)
      }
    },
    getValidate () {
      var _this = this
      if (this.phoneflag === 1) {
        this.settime()
        _this.getRequest('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/captcha').then(resp => {
          if (resp && resp.code === 200) {
            _this.loginForm.validatenumber = resp.data.captcha
          }
        })
      } else {
        _this.$message({
          type: 'info',
          message: '请输入手机号'
        })
      }
    },
    loginin () {
      var _this = this
      this.loading = true
      if (this.passflag === 1) {
        _this.postRequest('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/submit', {
          phone: this.loginForm.phone,
          captcha: this.loginForm.validatenumber
        }).then(resp => {
          if (resp && resp.code === 200) {
            this.loading = false
            _this.$message({
              type: 'success',
              message: '登陆成功'
            })
          }
        })
      } else {
        setTimeout(function () {
          _this.loading = false
          _this.$message({
            type: 'warning',
            message: '登陆失败'
          })
        }, 2000)
      }
    }
  }
}
</script>
<style  rel="stylesheet/css">
  .login .el-form .el-form-item  .el-input__inner{
    border: none;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-input__suffix{
    font-size: 12px;
    color: rgba(64, 158, 255, 0.87);
  }
  .el-input__suffix:hover{
    cursor: pointer;
  }
</style>
<style scoped>
  .title{
    font-size: large;
    margin-top: 30px;
    margin-bottom: 30px;
    color: #409eff;
  }
</style>
