<template>
  <div>
      <Dialog :item="item" :fieldKey="fieldKey" :isShowDialog="isShowDialog" @closeDialog="closeDialog" :selectedResourceTable="selectedResourceTable"></Dialog>
      <TextArea @openEditor="openEditor" :labelName="labelName" :val="val"></TextArea>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TextArea from '../text-area.vue';
import Dialog from "./dialog.vue";
import {isArray} from 'lodash';
@Component({
    components:{
        TextArea,
        Dialog
    }
})
export default class RelationshipCompare extends Vue{
    @Prop() labelName!:string;
    @Prop() item!:any;
    @Prop() fieldKey!:string;
    @Prop() feId!:any;
    // 依据那个字段进行获取关联内容 【这里指的是源账表的字段，可能，在query模版中是的】
    @Prop() tableFieldKey!:string|string[];

    private isShowDialog:boolean = false;
    get val(){
        return this.item[this.fieldKey];
    }

    openEditor(){
        this.isShowDialog = true;
    }
    closeDialog(){
        this.isShowDialog = false;
    }

    get selectedResourceTable(){
      let result:any[] = [];

      if(isArray(this.tableFieldKey)){
        this.tableFieldKey.forEach((fieldKey)=>{
          this.item[fieldKey].forEach((element:any) => {
            result.push({
              tableEnglishName:element.args.tableEnglishName,
              tableChineseName:element.title
            });
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
}
</script>

<style lang="scss">

</style>