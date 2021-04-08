
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
        <span>模型{{_index}}：【数据修改】</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <!-- <ModuleTagItem maxLen="1" :module="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId"></ModuleTagItem> -->
          <ModuleSelect :item="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId" :isSingle="true"></ModuleSelect>
          <!-- <ModuleTagItem :module="item" labelName="操作条件：" fieldKey="condition" :feId="item.feId"></ModuleTagItem>
          <ModuleTagItem :module="item" labelName="修改方式：" fieldKey="actionType" :feId="item.feId"></ModuleTagItem> -->
          <FuncField :item="item" fieldKey="condition" labelName="操作条件：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
          <FuncField :item="item" fieldKey="actionType" labelName="修改方式：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
        </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ModuleTagItem from '../module-tag-item.vue';
import {moduleDefine} from '@/util/const';
import ModuleSelect from '../module-select/index.vue';
import FuncField from "../func-field.vue";
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 修改数据
@Component({
    components:{
        ModuleTagItem,
        ModuleSelect,
        FuncField,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class UpdateTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string=moduleDefine.DATA_UPDATE;
    get _index (){
      return this.index + 1;
    }
}
</script>

<style lang="scss">

</style>
