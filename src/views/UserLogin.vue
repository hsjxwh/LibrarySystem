<template>
     <div>
        用户名：<input u-model="username"/>
        密码：<input u-model="password" type="password"/>
        <button v-on:click="submit">Login</button>
    </div>
</template>
<script lang="ts">
    import axios from 'axios';
    import {HTTP_URL} from '../main.js';
    export default{
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            submit(){
                axios.post(HTTP_URL+'/checkUserPassword',{
                    username:this.username,
                    password:this.password
                }).then((response=>{
                
                }))
                .catch(error=>{
                    if(error.response&&error.response.status===401){
                        alert("用户名或密码错误");
                        return;
                    }
                    alert("网站错误,请联系管理员1074702558@qq.com");
                });
            }
        }
    }
</script>
<style scoped>
</style>