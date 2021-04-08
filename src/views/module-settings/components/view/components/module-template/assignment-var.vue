
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【变量赋值】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <FuncField :item="item" fieldKey="fieldOperate" labelName="赋值内容：" :feId="item.feId"  errorMsg1="请先选择账表！"></FuncField>
        </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { moduleDefine } from "@/util/const";
import ModuleTagItem from '../module-tag-item.vue';
import FuncField from "../func-field.vue";
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 变量赋值
@Component({
    components:{
        ModuleTagItem,
        FuncField,
        EditorTextArea,
        TemplateTopBtn,
        CollapseContainer
    }
})
export default class AssignmentVarTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string = moduleDefine.VARIABLE_ASSIGNMENT;
    //private fieldKeyName:string = 'fieldOperate';
    get _index (){
      return this.index + 1;
    }

    
}
</script>

<style lang="scss">

</style>
