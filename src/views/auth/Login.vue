<template>
    <div>
        <v-container class="page-login" fill-height>
            <v-row>
                <v-col >
                    <v-card class="pa-1 page-login__card elevation-3 rounded-lg" tile >
                        <v-card-title class="titleMessage pt-10">
                            <h1 class="primary--text tile tM-text">
                                法智达物联网云
                            </h1>
                        </v-card-title>
                        <v-card-text class="pb-1">
                            <v-form
                                ref="form"
                                class="pa-4 pb-1"
                                lazy-validation
                                v-model="formValid">
                                <v-text-field
                                    class="pt-2"
                                    append-icon="person"
                                    autocomplete="off"
                                    name="login"
                                    label="用户名"
                                    placeholder="Username"
                                    type="text"
                                    required
                                    :rules="formRule.username"
                                    v-model="formModel.username"/>

                                <v-text-field
                                    class="pt-4"
                                    append-icon="lock"
                                    autocomplete="off"
                                    name="password"
                                    label="密码"
                                    placeholder="Password"
                                    type="password"
                                    :rules="formRule.password"
                                    required
                                    v-model="formModel.password"/>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="pb-5 pt-0">
                            <v-spacer />
                            <v-btn 
                            large  
                            depressed
                            color="primary"
                            @click="handleLogin" 
                            :loading="loading" 
                            class="login">
                                登陆
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <appFooter></appFooter>
    </div>
    
</template>

<script>
 import { mapMutations } from 'vuex';
 import appFooter from "@/components/footer/footer.vue"
 export default {
     name: 'PageLogin',
     components:{
         appFooter,
     },
     data() {
         return {
             loading: false,
             formValid: false,
             userRole: 0,
             formModel: {
                username: '',
                password: ''
             },
             formRule: {
                // 检验输入值是否为空，为空则
                username: [(v) => !!v || 'Username is required'],
                password: [(v) => !!v || 'Password is required']
             }
         }
     },
     computed: {
        prefix() {
            return ''
        }
     },
     methods: {
        ...mapMutations(['changeLogin']),

        handleLogin() {
            var _this = this;
            this.loading = true
            this.$store
            .dispatch('login', {
                name: this.formModel.username,
                pass_word: this.formModel.password
            })
            .then(() => {
                _this.loading = false
                window._VMA.$emit('SHOW_SNACKBAR', { // 触发当App上的事件。附加参数都会传给监听器回调。
                    text: 'Authentication Successful', 
                    color: 'success',
                })             
            })
            .catch(() => {
                this.loading = false
                window._VMA.$emit('SHOW_SNACKBAR', {
                    text: 'Authentication Failed', 
                    color: 'error'
                })
                 _this.$router.push('/cms')
            })
        },

        // logins() {
        //     if (!this.$refs.form.validate()) {
        //         return;
        //     }

        //     var _this = this;
        //     //vue-resources：Vue的http插件
        //     this.$http.post("/api/auth", {
        //             name: this.formModel.username,
        //             pass_word: this.formModel.password
        //         })
        //         .then(function (response) {
        //         //  console.log(response);
        //             // 如果res为0则表示登陆成功,其他为失败
        //             // if (response.data.res === 0) {
        //                 _this.$store.commit('LOG_IN', response.data)
        //                 _this.loading = true
        //                 _this.$router.push('/list')

        //             // }
        //             // TODO 验证失败,界面如何提示用户
        //         })
        //         // .catch(function (error) {
        //         //     console.log(error)
        //         // })
        // }
     }
 }
</script>

<style lang="sass" scoped>
    .page-login
        max-width: 500px
        margin: 0 auto
        font-size: 20px
        margin-top: 85px
        
    .titleMessage
        display: flex
        justify-content: center
        
    .tM-text
        font-size: 31px
        font-weight: 550
        letter-spacing: 3px

    

    .login
        border-radius: 20px
</style>
