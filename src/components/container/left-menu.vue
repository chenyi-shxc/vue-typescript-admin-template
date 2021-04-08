<template>
  <div class="side-nav">
    <div :class="['left-menu-hold',isCollapse ? 'menu-close' : '']"></div>
    <el-menu 
        :default-active="activeMenu" class="left-menu"  @select="onSelect"  :collapse="isCollapse">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">审计工作流</span>
            </template>
            <el-menu-item index="1-1">
            审计计划
            </el-menu-item>
            <el-submenu index="1-2">
                <span slot="title">审计项目</span>
                <el-submenu index="1-2-1">
                    <span slot="title">项目启动</span>
                    <el-menu-item index="1-2-1-1">项目立项</el-menu-item>
                    <el-menu-item index="1-2-1-2">实施计划</el-menu-item>
                    <el-menu-item index="1-2-1-3">预备分析</el-menu-item>
                    <el-menu-item index="1-2-1-4">审计方案</el-menu-item>
                    <el-menu-item index="1-2-1-5">进场培训</el-menu-item>
                    <el-menu-item index="1-2-1-6">审计通知书</el-menu-item>
                    <el-menu-item index="1-2-1-7">调阅清单</el-menu-item>
                    <el-menu-item index="1-2-1-8">调查问卷</el-menu-item>
                </el-submenu>
                <el-submenu index="1-2-2">
                    <span slot="title">现场核查</span>
                    <el-menu-item index="1-2-2-1">进场会议</el-menu-item>
                    <el-menu-item index="1-2-2-2">审计承诺</el-menu-item>
                    <el-menu-item index="1-2-2-3">现场访谈</el-menu-item>
                    <el-menu-item index="1-2-2-4">现场审核</el-menu-item>
                    <el-menu-item index="1-2-2-5">事实确认</el-menu-item>
                    <el-menu-item index="1-2-2-6">离场会议</el-menu-item>
                </el-submenu>
                <el-submenu index="1-2-3">
                    <span slot="title">项目总结</span>
                    <el-menu-item index="1-2-3-1">审计报告</el-menu-item>
                    <el-menu-item index="1-2-3-2">问题台账</el-menu-item>
                    <el-menu-item index="1-2-3-3">审计意见书</el-menu-item>
                </el-submenu>
                <el-submenu index="1-2-4">
                    <span slot="title">项目终结</span>
                    <el-menu-item index="1-2-4-1">项目结项</el-menu-item>
                    <el-menu-item index="1-2-4-2">整改管理</el-menu-item>
                    <el-menu-item index="1-2-4-3">项目考核</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-monitor"></i>
                <span slot="title">我的工作台</span>
            </template>
            <el-menu-item index="2-1">
                工作台
            </el-menu-item>
        </el-submenu>
    </el-menu>

    <!-- <el-dialog
        title="选择菜单"
        :visible.sync="dialogVisible"
        width="30%">
        <el-select v-model="selectMenuVal" placeholder="请选择菜单">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog> -->
</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const mainMenu = namespace('mainMenu');
@Component({

})
export default class LeftMenu extends Vue{
    //@Prop() activeName!:string;
//   private isCollapse:boolean = true;
  private dialogVisible:boolean = false;
  private selectMenuVal:string = '';
  @mainMenu.Getter('activeMenu') activeMenu!:any;
  @mainMenu.Getter('isOpen') isOpen!:boolean;

  get isCollapse(){
      return !this.isOpen;
  }

  
  get path() {
    const path = `/${this.$route.path.split('/')[1]}`;
    return path;
  }

    onSelect(){
        
    }

}
</script>

<style lang="scss" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    // min-height: 400px;
}

.side-nav{
  flex: 0 0 auto;
  margin-right:10px;
  min-height: 100%;
  overflow: auto;
}
.left-menu:not(.el-menu--collapse){
    width:200px;
}
.left-menu{
    position: fixed;
    left:0;
    top: 60px;
    bottom: 60px;
    overflow: auto;
}
.left-menu-hold{
    width: 200px;
    transition: width 0.3s;
    &.menu-close{
        width: 64px;
    }
}

</style>