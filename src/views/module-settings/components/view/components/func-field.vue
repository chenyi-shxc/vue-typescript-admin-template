<template>
  <div>
      <FuncFieldDialog 
        :item="item"
        :fieldKey="fieldKey"
        :defineVarList="allVars"
        @close="dialogClose"
        :selectedTabels="selectedResourceTable"
        :isVisible="isShowDialog">
      </FuncFieldDialog>
      <TextArea @openEditor="openEditor" :val="this.item[this.fieldKey]" :labelName="labelName"></TextArea>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import FuncFieldDialog from "./func-field-dialog.vue";
import TextArea from './text-area.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const module = namespace('module');
// 将文本框与目标条件表达式的dialog进行绑定
@Component({
    components:{
        FuncFieldDialog,
        TextArea
    }
})
export default class FuncField extends Vue{
    @Prop() item!:any;
    @Prop() fieldKey!:string
    // 数据来源依据那个字段
    @Prop() tableFieldKey!:string
    // 显示标题的名字
    @Prop() labelName!:string
    // 当没有 源表数据的情况下， 提示的文案
    @Prop() errorMsg1!:string

    @module.Getter('getAllTables') allTables!:any;
    @module.Getter('allVars') allVars!:string[];
    // 是否显示 dialog
    private isShowDialog:boolean = false;



    get selectedResourceTable(){
      let result:any[] = [];
      if(!this.tableFieldKey){
        this.allTables.forEach((element:any) => {
          result.push({
            tableEnglishName:element.args.tableEnglishName,
            tableChineseName:element.title
          });
        });
      }else{
        this.item[this.tableFieldKey].forEach((element:any) => {
          result.push({
            tableEnglishName:element.args.tableEnglishName,
            tableChineseName:element.title
          });
        });
      }
      
      return result;
    }


    checkedResourceTable():boolean{
      if(!this.errorMsg1){
        return true;
      }
      if(this.selectedResourceTable.length === 0){
        (this as any).$message(this.errorMsg1);
        return false;
      }else{
        return true;
      }
    }

    openEditor(){
        if(this.checkedResourceTable()){
            this.isShowDialog = true;
        }
    }

    dialogClose(){
        this.isShowDialog = false;
    }
}
</script>

<style lang="scss">

</style>