
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【帐表比较】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
          <CollapseContainer :collapse="item.collapse">
            <!-- <ModuleTagItem maxLen="1" :module="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId"></ModuleTagItem> -->
            <ModuleSelect :item="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId" :isSingle="true"></ModuleSelect>
            <!-- <ModuleTagItem maxLen="1" :module="item" labelName="参照账本：" fieldKey="targetTable" :feId="item.feId"></ModuleTagItem> -->
            <ModuleSelect :item="item" labelName="参照账本：" fieldKey="targetTable" :feId="item.feId" :isSingle="true"></ModuleSelect>
            <!-- <ModuleTagItem :module="item" labelName="比较关系：" fieldKey="condition" :feId="item.feId"></ModuleTagItem> -->
            <RelationshipCompare :item="item" labelName="比较关系：" fieldKey="condition" :tableFieldKey="['resourceTable','targetTable']" :feId="item.feId"></RelationshipCompare>
            <!-- <ModuleTagItem :module="item" labelName="含有不相同内容的新账本：" fieldKey="differenceTable" :feId="item.feId"></ModuleTagItem> -->
            <!-- <ModuleTagItem :module="item" labelName="含有相同内容的新账本：" fieldKey="intersectionTable" :feId="item.feId"></ModuleTagItem> -->
            <EditorTextArea :item="item" labelName="含有不相同内容的新账本：" fieldKey="differenceTable"></EditorTextArea>
            <EditorTextArea :item="item" labelName="含有相同内容的新账本：" fieldKey="intersectionTable"></EditorTextArea>
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
import RelationshipCompare from '../relationshipCompare/index.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import TemplateTopBtn from '../common/template-top-btn.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 帐表比较
@Component({
    components:{
        ModuleTagItem,
        ModuleSelect,
        RelationshipCompare,
        EditorTextArea,
        TemplateTopBtn,
        CollapseContainer
    }
})
export default class CompareTemplate extends Vue{
    @Prop() item!:string;
    @Prop() index!:number;
    private templateType:string=moduleDefine.TABLE_COMPARE;
    get _index (){
      return this.index + 1;
    }
}
</script>

<style lang="scss">

</style>
