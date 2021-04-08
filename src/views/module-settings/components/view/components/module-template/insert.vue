
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
        <span>步骤{{_index}}：【插入数据】</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
          <CollapseContainer :collapse="item.collapse">
          <!-- <ModuleTagItem maxLen="1" :module="item" labelName="目标账本："  fieldKey="targetTable" :feId="item.feId"></ModuleTagItem> -->
          <ModuleSelect :item="item" labelName="目标账本：" fieldKey="targetTable" :feId="item.feId" :isSingle="true"></ModuleSelect>
          <!-- <ModuleTagItem :module="item" labelName="目标字段或表达式：" fieldKey="funcField" :feId="item.feId"></ModuleTagItem> -->
          <FuncField :item="item" fieldKey="funcField" labelName="目标字段或表达式：" :feId="item.feId" tableFieldKey="targetTable" errorMsg1="请先选择账表！"></FuncField>
          <ActionType :module="item" :type="templateType"></ActionType>
          <div v-if="!isShowFieldToVal">
            <!-- <ModuleTagItem maxLen="1" :module="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId"></ModuleTagItem> -->
            <ModuleSelect :item="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId" :isSingle="true"></ModuleSelect>
            <!-- <ModuleTagItem :module="item" labelName="源字段或表达式：" fieldKey="resourceField" :feId="item.feId"></ModuleTagItem> -->
            <FuncField :item="item" fieldKey="resourceField" labelName="源字段或表达式：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
            <!-- <ModuleTagItem :module="item" labelName="操作条件：" fieldKey="condition" :feId="item.feId"></ModuleTagItem> -->
            <FuncField :item="item" fieldKey="condition" labelName="操作条件：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
          </div>
          <!-- <ModuleTagItem v-else :module="item" labelName="字段对应值：" fieldKey="fieldData" :feId="item.feId"></ModuleTagItem> -->
          <el-form-item v-else label="字段对应值：">
              <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 20}" v-model="fieldDataVal" placeholder="请输入字段对应值" :disabled="!isAbleEdit"></el-input>
          </el-form-item>
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
import CollapseContainer from '@/components/collapse-container/index.vue';

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
// 插入数据
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
export default class InsertTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    @module.Mutation('updateFieldString') updateFieldString!:any;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean;
    private templateType:string=moduleDefine.DATA_INSERT;
    private fieldDataKey:string = 'fieldData';
    get _index (){
      return this.index + 1;
    }

    get fieldDataVal(){
      return this.item[this.fieldDataKey];
    }

    set fieldDataVal(val:string){
      this.updateFieldString({
        moduleFeId:this.item.feId,
        fieldKey:this.fieldDataKey,
        val
      });
    }

    get isShowFieldToVal(){
        if(this.item.actionType === '[手工输入]'){
            return true;
        }else{
            return false;
        }
    }
}
</script>

<style lang="scss">

</style>
