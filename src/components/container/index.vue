<template>
  <el-container>
    <div class="nav-hold"></div>
    <el-header class="menu-header">
      <el-row>
        <el-col :span="7">
          <div class="holder">
            <img style="width:48px;height:48px;" class="logo" src="../../assets/logo64.png" />
            <h2 style="margin-left:98px;">
              智能金融审计平台
            </h2>
          </div>
        </el-col>
        <el-col :offset="9" :span="8">
          <div class="top-user-menu">
            <el-menu 
              class="top-menu"
              background-color="#334154"
              text-color="#fff"
              active-text-color="rgb(64, 158, 255)" 
              :default-active="activeIndex" 
              mode="horizontal" 
              @select="onSelect" 
            >
            <el-submenu index="3">
              <template slot="title">生产要素</template>
              <el-menu-item index="3-1">账表</el-menu-item>
              <el-menu-item index="3-2">模型</el-menu-item>
              <el-menu-item index="3-3">知识</el-menu-item>
              <el-menu-item index="3-4">案例</el-menu-item>
              <el-menu-item index="3-5">组织</el-menu-item>
            </el-submenu>
          </el-menu>

            <el-dropdown class="menu" @command="handleCommand">
              <span class="el-dropdown-link">
                {{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>菜单一</el-dropdown-item>
                <el-dropdown-item>菜单二</el-dropdown-item>
                <el-dropdown-item>菜单三</el-dropdown-item> -->
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-main class="main">
        <div class="outter-container">
          <el-row class="app-contianer" style="width: 100%; display: flex;">
              <!-- 侧边栏导航 -->
              <LeftMenu/>
              <div class="inner-container">
                <Bread class="top-bread"/>
                <el-divider />
                <router-view style="margin-left:0;margin-right:0;"></router-view>
              </div>
          </el-row>
        </div>
      </el-main>
    </el-container>
    
    <el-footer class="b-footer">
      <!-- <el-divider /> -->
      <el-row type="flex" justify="center" style="font-size: 12px; color: #999;height:60px;line-height:60px;">审计筛查系统       版权所有 2019-2021</el-row>
    </el-footer>
    <div class="footer-holder"></div>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HeadMenu from "./head-menu.vue";
import cookie from 'cookie_js';
import {cookieKey} from '@/util/const';
import LeftMenu from './left-menu.vue';
import Bread from './bread.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const mainMenu = namespace('mainMenu');
@Component({
  components: {
    HeadMenu,
    LeftMenu,
    Bread
  }
})
export default class Container extends Vue {

  private maxHeight:number = 480;

  get activeIndex(){
    if(this.$route.name == '账表' ){
      return '3-1';
    }else if(this.$route.name === '模型'){
      return '3-2';
    }
  }

  onSelect(index:string,indexPath:string){
    if(index == '3-1'){
        this.$router.push({
            path:'/tables'
        })
    }else if(index === '3-2'){
      this.$router.push({
        path:'/module'
      })
    }
  }

  // @mainMenu.Getter('activeMenu') activeMenu!:any;

  get path() {
    const path = `/${this.$route.path.split('/')[1]}`;
    return path;
  }

  handleTabChange(tab: any, event: any) {
    this.$router.push({ path: tab.name })
  }

  get userName(){
    let result = cookie.get(cookieKey.login_uid);
    if(result){
      let loginInfo = JSON.parse(result);
      return loginInfo.name;
    }else{
      this.$router.push({
          path:'/login'
      });
    }
  }

  handleCommand(command:string){
    if(command == 'logout'){
      cookie.remove(cookieKey.login_uid);
      this.$router.push({
        path:'/login'
      });
    }
  }

  mounted(){
    this.getMaxHeight();
    window.addEventListener('resize',()=>{
      this.getMaxHeight();
    },false);
  }

  getMaxHeight(){
    let navEl = document.querySelector('.nav-hold');
    let footerEl = document.querySelector('.footer-holder');
    if(navEl && footerEl){

      this.maxHeight = window.innerHeight - Number((getComputedStyle(navEl) as any).height.replace('px','')) - Number((getComputedStyle(footerEl) as any).height.replace('px',''));
    }
  }
  
}
</script>

<style lang="scss">
.el-divider--horizontal {
  margin: 10px 0 !important;
}
</style>

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translate(0, -50%);
  height: 80%;
}
.holder {
  width: 100%;
  height: 60px;
  line-height: 60px;
  position: relative;
  h2{
    color:#fff;
  }
}
.menu-header {
  background: #334154;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right:0;
}
.top-user-menu {
  height: 100%;
  overflow: auto;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .menu {
    display: flex;
    color: #fff;
    line-height: 60px;
  }
  .top-menu{
    display: flex;
    margin-right: 20px;
  }
}

.nav-hold{
  height: 60px;
}
.b-footer{
  background: #334154;
  z-index: 5;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 60px;
}
.footer-holder{
  height: 60px;
}



.inner-container{
  flex:1;
  height: 100%;
  overflow: auto;
}

.outter-container{
  height:100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
}

.main{
  border: 1px solid #F2F6FC;
  padding: 0!important;
}

.top-bread{
  margin-top: 10px;
}




</style>