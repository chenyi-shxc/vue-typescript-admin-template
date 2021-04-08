<template>
  <div>
      <Dialog 
        :orderInfo="this.item[this.fieldKey]"
        :isVisible="isShowDialog"
        :item="item"
        :selectedTabels="selectedResourceTable"
        @close="dialogClose"
      ></Dialog>
      <TextArea @openEditor="openEditor" :val="this.item[this.fieldKey].val"  :labelName="labelName"></TextArea>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TextArea from '../text-area.vue';
import Dialog from './dialog.vue';
@Component({
    components:{
        TextArea,
        Dialog
    }
})
export default class OrderField extends Vue{
    @Prop() item!:any;
    @Prop() fieldKey!:string
    // 数据来源依据那个字段
    @Prop() tableFieldKey!:string
    // 显示标题的名字
    @Prop() labelName!:string
    // 当没有 源表数据的情况下， 提示的文案
    @Prop() errorMsg1!:string

    // 是否显示 dialog
    private isShowDialog:boolean = false;
    

    get selectedResourceTable(){
      let result:any[] = [];
      this.item[this.tableFieldKey].forEach((element:any) => {
        result.push({
          tableEnglishName:element.args.tableEnglishName,
          tableChineseName:element.title
        });
      });

      return result;
    }

    checkedResourceTable():boolean{
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