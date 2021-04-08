<template>
<div v-if="!!modelID" class="module-page" :style="minHeight">
  <!-- v-if="moduleList && moduleList.length > 0" -->
  <ParamsRow v-if="moduleList.length > 0"/>
  <el-row :gutter="20" class="mb-b">
      <TemplateTopBtn></TemplateTopBtn>
      <!-- 模型选择dialog -->
      <el-col :span="20">
        <el-card shadow="hover" v-if="moduleList.length > 0">
          <div slot="header" class="clearfix">
            <span>模型步骤</span>
            <ModuleHeadBtns></ModuleHeadBtns>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <!-- 这地方的区分模板啊，一共14个类型 -->
          <!-- 内容区域 是一个form表单，可以增加的那种 -->
          <!-- <Module :item="item" :index="index" v-for="(item,index) in moduleList" :key="item.feId"></Module> -->
          <template v-for="(item,index) in moduleList">
            <QueryTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'tableQuery'" :item="item" :index="index"></QueryTemplate>
            <AppendTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'tableAppend'" :item="item" :index="index"></AppendTemplate>
            <CompareTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'tableCompare'" :item="item" :index="index"></CompareTemplate>
            <InsertTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'dataInsert'" :item="item" :index="index"></InsertTemplate>
            <UpdateTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'dataUpdate'" :item="item" :index="index"></UpdateTemplate>
            <DelDataTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'dataDelete'" :item="item" :index="index"></DelDataTemplate>
            <CreateTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'tableCreate'" :item="item" :index="index"></CreateTemplate>
            <DelModuleTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'tableDrop'" :item="item" :index="index"></DelModuleTemplate>
            <DefineVarTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'variableDefine'" :item="item" :index="index"></DefineVarTemplate>
            <AssignmentVarTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'variableAssignment'" :item="item" :index="index"></AssignmentVarTemplate>
            <JudgmentTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'conditionJudge'" :item="item" :index="index"></JudgmentTemplate>
            <IteratorCallTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'cycleRun'" :item="item" :index="index"></IteratorCallTemplate>
            <BreakIteratorTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'cycleBreak'" :item="item" :index="index"></BreakIteratorTemplate>
            <CallTemplate class="mb-b" :key="item.feId" v-if="item.moduleType === 'moduleCall'" :item="item" :index="index"></CallTemplate>
          </template>
        </el-card>  
      </el-col>
      <el-col v-if="moduleList && moduleList.length > 0" :span="4">
        <Navgator></Navgator>
      </el-col>
      <el-col :span="24" v-if="moduleList.length === 0">
        <div class="empty-module" :style="`height:${initHeight}px;`" >
          <div class="no-data-icon">
            <svg t="1588577972989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4683" width="200" height="200"><path d="M576 928c-6 0-11.9-1.7-17.1-5-9.3-5.9-14.9-16.1-14.9-27V554.3c0-12.4 7.1-23.6 18.3-28.9l288-136.1c9.9-4.7 21.5-4 30.8 1.9s14.9 16.1 14.9 27v341.7c0 12.4-7.1 23.6-18.3 28.9l-288 136.1c-4.4 2.1-9 3.1-13.7 3.1z m32-353.5v271l224-105.8v-271L608 574.5zM448 928c-4.7 0-9.3-1-13.7-3.1l-288-136.1c-11.2-5.3-18.3-16.6-18.3-28.9V418.2c0-11 5.6-21.2 14.9-27 9.3-5.9 20.9-6.6 30.8-1.9l288 136.1c11.2 5.3 18.3 16.6 18.3 28.9V896c0 11-5.6 21.2-14.9 27-5.2 3.3-11.1 5-17.1 5zM192 739.7l224 105.8v-271L192 468.7v271zM512 501.1c-4.7 0-9.4-1-13.8-3.1l-352-168.1c-11.2-5.4-18.3-16.7-18.2-29.2 0.1-12.4 7.4-23.7 18.8-28.8l352-159.9c8.4-3.8 18.1-3.8 26.5 0l352 159.9c11.3 5.1 18.6 16.4 18.8 28.8 0.1 12.4-7 23.8-18.2 29.2L525.8 498c-4.4 2-9.1 3.1-13.8 3.1zM235.8 301.7L512 433.6l276.2-131.9L512 176.2 235.8 301.7z" p-id="4684" fill="#c0c4cc"></path></svg>
          </div>
          <div class="txt">
            <span>您还暂没有模型，点击</span><el-button size="medium" @click="addModule" type="text">新建</el-button><span>进行创建模型。</span>
          </div>
        </div>
      </el-col>
  </el-row>
  <Result v-if="moduleList && moduleList.length > 0"></Result>
  <RunInfo v-if="moduleList && moduleList.length > 0"/>
</div>
</template>

<script lang="ts">
import '@/scss/module.scss';
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import QueryTemplate from './components/module-template/query.vue';
import AppendTemplate from './components/module-template/append.vue';
import CompareTemplate from './components/module-template/compare.vue';
import InsertTemplate from './components/module-template/insert.vue';
import UpdateTemplate from './components/module-template/update.vue';
import DelDataTemplate from './components/module-template/del-data.vue';
import CreateTemplate from './components/module-template/create.vue';
import DelModuleTemplate from './components/module-template/del-module.vue';
import DefineVarTemplate from './components/module-template/define-var.vue';
import AssignmentVarTemplate from './components/module-template/assignment-var.vue';
import JudgmentTemplate from './components/module-template/judgment.vue';
import IteratorCallTemplate from './components/module-template/iterator-call.vue';
import BreakIteratorTemplate from './components/module-template/break-iterator.vue';
import CallTemplate from './components/module-template/call.vue';
import TemplateTopBtn from './components/common/add-module-dialog.vue';
import ModuleHeadBtns from './components/module-head-btns/index.vue';
import Navgator from './components/navigator.vue';
import ParamsRow from './components/params-row/index.vue';
import Result from './components/result/index.vue';
import RunInfo from './components/run-info/index.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
const moduleDialogMenu = namespace('moduleDialogMenu');
const func = namespace('func');
const modelCard = namespace('modelCard');
@Component({
  components:{
    QueryTemplate,
    AppendTemplate,
    CompareTemplate,
    InsertTemplate,
    UpdateTemplate,
    DelDataTemplate,
    CreateTemplate,
    DelModuleTemplate,
    DefineVarTemplate,
    AssignmentVarTemplate,
    JudgmentTemplate,
    IteratorCallTemplate,
    BreakIteratorTemplate,
    CallTemplate,
    TemplateTopBtn,
    ModuleHeadBtns,
    Navgator,
    ParamsRow,
    Result,
    RunInfo
  }
})
export default class ModuleView extends Vue{
    
    @State(state => state.module.moduleList) moduleList:any;
    @module.Action('initModuleData') _initModuleData:any;

    @module.Mutation('changeIsShowAddModuleDialog') changeIsShowAddModuleDialog!:any;
    @module.Mutation('changeAddPos') changeAddPos!:any;
    @moduleDialogMenu.Action('initFirstMenu') _initFirstMenu:any;
    @func.Action('init') _initFunc:any;
    @modelCard.Getter('getAll') modelCardData!:any;
    @modelCard.Getter('getModelCardFeId') getModelCardFeId!:any;
    mounted(){
      //mock 假数据 通过路由参数 获取后端的数据
      //console.log('路由传递的数据：',this.$route.params);
      // if(this.modelID){
      //   this.init(this.modelID);
      // }
      this._initFirstMenu();
      this._initFunc();

      if(this.modelID && this.modelCardData){
        this._initModuleData({
          ...this.modelCardData
        });
      }
    }

    get minHeight(){
      return `min-height:${window.innerHeight}px;`;
    }

    @Watch('getModelCardFeId')
    onModelCardData(newVal:any){
      this.$nextTick(()=>{
        this._initModuleData({
          ...this.modelCardData
        });
      })
      // this._initModuleData({
      //   ...this.
      // });
    }

    // init(modelID:string){
    //   this.getModuleData(modelID);
    //   console.log('first data');
    //   console.log(this.moduleList);
    // }

    // @Watch('modelID')
    // onModelID(newVal:string){
    //   this.init(newVal);
    // }



    get modelID(){
      return this.$route.params.modelID;
    }

    // getModuleData(modelID:string){
    //   // this._initModuleData({
    //   //   val: {
    //   //     modelID:modelID
    //   //   }
    //   // }).then((result:any) => {
        
    //   // }).catch((err:any) => {
        
    //   // });
    // }

    get initHeight(){
      return window.innerHeight - 120 - 60 - 100;
    }
    
    addModule(){
      this.changeAddPos({
        moduleId:-1
      });
      this.changeIsShowAddModuleDialog({
        value:true
      });
    }
}
</script>

<style>
.empty-module{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-data-icon{
  flex: 0 0 auto;
  margin-bottom: 10px;
}
.empty-module>.txt{
  font-size:14px;
  text-align: center; 
  color: #C0C4CC;
}
</style>