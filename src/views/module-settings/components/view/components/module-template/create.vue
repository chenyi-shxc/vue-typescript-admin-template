<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【新建帐表】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <!-- <ModuleTagItem :module="item" labelName="源账本：" maxLen="1" fieldKey="resourceTable" :feId="item.feId"></ModuleTagItem> -->
          <ModuleSelect :item="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId" :isSingle="false"></ModuleSelect>
          <ActionType :module="item" :type="templateType"></ActionType>
          <!-- <ModuleTagItem v-if="isShowFuncField" :module="item" labelName="手工建表字段定义：" fieldKey="funcField" :feId="item.feId"></ModuleTagItem> -->
          <!-- <FuncField v-if="isShowFuncField" :item="item" fieldKey="funcField" labelName="手工建表字段定义：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField> -->
          <EditorTextArea v-if="isShowFuncField" :item="item" labelName="手工建表字段定义：" fieldKey="funcField"></EditorTextArea>
          <ModuleTagItem v-else :module="item" labelName="目标账本：" maxLen="1" fieldKey="targetTable" :feId="item.feId"></ModuleTagItem>
        </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ModuleTagItem from '../module-tag-item.vue';
import ActionType from '../action-type.vue';
import {moduleDefine} from '@/util/const';
import ModuleSelect from '../module-select/index.vue';
import FuncField from "../func-field.vue";
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 新建帐表
@Component({
    components:{
        ModuleTagItem,
        ActionType,
        ModuleSelect,
        FuncField,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class CreateTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string=moduleDefine.TABLE_CREATE;
    get _index (){
      return this.index + 1;
    }

     get isShowFuncField(){
        //手工建表，是否显示字段
        if(this.item.actionType == 'CUSTOMTABLE'){
            return true;
        }else{
            return false;
        }
    }
}
</script>

<style lang="scss">

</style>
