<template>
    <div>
        <ModuleSelectDialog :isSingle="isSingle" :selected="moduleSelected" @changeVisible="changeVisible" @onVal="onDialogFormVal" :dialogFormVisible="isShowMSD"></ModuleSelectDialog>
        <ModuleTagItem :feId="item.feId" :module="item" :labelName="labelName" :fieldKey="fieldKey" btnType="modelCall-select" @callModuleSelectDialog="callModuleSelectDialog"></ModuleTagItem>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ModuleTagItem from '../module-tag-item.vue';
import ModuleSelectDialog from './module-select-dialog.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
@Component({
    components:{
        ModuleTagItem,
        ModuleSelectDialog
    }
})  
export default class ModuleSelect extends Vue{
    @Prop() isSingle!:boolean;//是否是单选
    @Prop() labelName!:string;
    @Prop() item!:any;
    @Prop() fieldKey!:string;
    @Prop() feId!:string;
    // 模型选择 展示弹窗。
    private isShowMSD:boolean = false;
    @module.Mutation('updateTagByList') updateTagByList!:any;

    get moduleSelected(){
      let result:string[] = [];
      this.item[this.fieldKey].forEach((tag:any)=>{
        result.push(tag.args.tableEnglishName);
      })
      return result;
    }
    changeVisible(val:boolean){
      this.isShowMSD = val;
    }
    callModuleSelectDialog(){
      //console.log('call.....');
      this.isShowMSD = true;
    }
    /**
     * selectedVal tree控件的选择内容
     * searchData 模糊查询的结果
     */
    onDialogFormVal(selectedVal:any,searchData:{
      label: string, 
      tableEnglishName: string
    }[]|null){

      this.updateTagByList({
        moduleFeId:this.item.feId,
        fieldKey:this.fieldKey,
        val:selectedVal,
        queryInfo:searchData
      });
    }
}
</script>

<style lang="scss">

</style>