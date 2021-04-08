<template>
  <div v-if="modelID">
    <tabs>
      <template v-slot:module1><ModuleView/></template>
      <template v-slot:module2><ModuleResult/></template>
      <template v-slot:module3><ModuleInfo/></template>
    </tabs>
  </div>
  <el-row
    v-else    
    type="flex"
    align="top"
    justify="center"
    style="min-height: 100%;"
  >
    <el-col
      class="no-data-container"
      :style="'height:' + initHeight + 'px;'"
    >
      <div class="no-data-icon">
        <svg t="1588577972989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4683" width="200" height="200"><path d="M576 928c-6 0-11.9-1.7-17.1-5-9.3-5.9-14.9-16.1-14.9-27V554.3c0-12.4 7.1-23.6 18.3-28.9l288-136.1c9.9-4.7 21.5-4 30.8 1.9s14.9 16.1 14.9 27v341.7c0 12.4-7.1 23.6-18.3 28.9l-288 136.1c-4.4 2.1-9 3.1-13.7 3.1z m32-353.5v271l224-105.8v-271L608 574.5zM448 928c-4.7 0-9.3-1-13.7-3.1l-288-136.1c-11.2-5.3-18.3-16.6-18.3-28.9V418.2c0-11 5.6-21.2 14.9-27 9.3-5.9 20.9-6.6 30.8-1.9l288 136.1c11.2 5.3 18.3 16.6 18.3 28.9V896c0 11-5.6 21.2-14.9 27-5.2 3.3-11.1 5-17.1 5zM192 739.7l224 105.8v-271L192 468.7v271zM512 501.1c-4.7 0-9.4-1-13.8-3.1l-352-168.1c-11.2-5.4-18.3-16.7-18.2-29.2 0.1-12.4 7.4-23.7 18.8-28.8l352-159.9c8.4-3.8 18.1-3.8 26.5 0l352 159.9c11.3 5.1 18.6 16.4 18.8 28.8 0.1 12.4-7 23.8-18.2 29.2L525.8 498c-4.4 2-9.1 3.1-13.8 3.1zM235.8 301.7L512 433.6l276.2-131.9L512 176.2 235.8 301.7z" p-id="4684" fill="#c0c4cc"></path></svg>
      </div>
      <div class="no-data-text">
        暂无内容,请选择模型
      </div>
    </el-col>
  </el-row>
</template>

<script lang='ts'>
import {Vue, Component,Watch} from 'vue-property-decorator';
import Tabs from './components/tab.vue';
import ModuleView from './components/view/index.vue';
import ModuleResult from './components/result/index.vue';
import ModuleInfo from './components/info/index.vue';

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const modelCard = namespace('modelCard');

@Component({
  components:{
    Tabs,
    ModuleView,
    ModuleResult,
    ModuleInfo
  }
})
export default class ModuleSettings extends Vue{

  @modelCard.Action('getData') getData:any;

  @Watch('modelID')
  onModelID(newVal:string){
    this.getModelCardData(newVal);
  }

  getModelCardData(modelID:string){
    this.getData({
      modelID
    }).then((result:any) => {
    }).catch((err:any) => {
    });
  }

  mounted(){
    if(this.modelID){
      this.getModelCardData(this.modelID);
    }
  }

  private activeName:string = 'module1'

  get modelID(){
    return this.$route.params.modelID;
  }

  get initHeight(){
   return window.innerHeight - 120 - 60 - 100;
  }
  
}
</script>

<style>
.no-data-icon{
  flex: 0 0 auto;

}
.no-data-text{
  flex: 0 0 auto;
  margin-top: 10px;
  font-size:12px; text-align: center; color: #C0C4CC;
}
.no-data-container{
  display: flex; 
  flex-direction: column;
  align-content:center; 
  align-items: center; 
  justify-content: center; 
}
</style>