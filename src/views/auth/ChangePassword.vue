<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <v-card class="pa-3 page-login__card" tile>
          <v-card-title>
            <!-- <img src="/static/m.png" alt="Vue Material Admin" width="55" /> -->
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              class="my-10"
              lazy-validation
              v-model="formValid"
            >
              <v-text-field
                append-icon="lock"
                autocomplete="off"
                name="password"
                label="原密码"
                placeholder="Password"
                type="password"
                :rules="formRule.password"
                required
                v-model="formModel.password"
              />
              <v-text-field
                  append-icon="lock"
                  autocomplete="off"
                  name="password"
                  label="新密码"
                  placeholder="Password"
                  type="password"
                  :rules="formRule.password"
                  required
                  v-model="formModel.passwdNew"
                />
              <v-text-field
                append-icon="lock"
                autocomplete="off"
                name="password"
                label="新密码"
                placeholder="Password"
                type="password"
                :rules="formRule.password"
                required
                v-model="formModel.passwdNew2"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn large tile color="primary" @click="changepassword" :loading="loading">
              修改密码
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 export default {

   name: 'PageChangePwd',
   data() {
     return {
       loading: false,
       formValid: false,
       formModel: {
         username: '',
         password: '',
         passwdNew: '',
         passwdNew2: ''
       },
       formRule: {
         username: [(v) => !!v || 'Username is required'],
         password: [(v) => !!v || 'Password is required'],
         passwdNew: [(v) => !!v || 'Password is required'],
         passwdNew2: [(v) => !!v || 'Password is required']
       }
     }
   },
   computed: {
     prefix() {
       return ''
     }
   },
   methods: {
     changepassword() {
       if (!this.$refs.form.validate()) {
           // TODO 验证用户输入,并提示错误信息
           return;
       }

       // 验证登陆
       this.$store.commit('LOG_OUT')
       this.loading = true
       this.$router.push('/list')
     }
   }
 }
</script>

<style lang="sass" scoped>
 .page-login
   max-width: 600px
   margin: 0 auto
</style>
