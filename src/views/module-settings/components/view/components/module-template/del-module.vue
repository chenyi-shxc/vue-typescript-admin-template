
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【删除账本】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <!-- <ModuleTagItem :module="item" labelName="要删除的账本：" fieldKey="resourceTable" :feId="item.feId"></ModuleTagItem> -->
          <ModuleSelect :item="item" labelName="要删除的账本：" fieldKey="targetTable" :feId="item.feId" :isSingle="false"></ModuleSelect>
          <ActionType :module="item" :type="templateType"></ActionType>
        </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { moduleDefine } from "@/util/const";
import ModuleTagItem from '../module-tag-item.vue';
import ActionType from '../action-type.vue';
import ModuleSelect from '../module-select/index.vue';
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 删除帐表
@Component({
    components:{
        ModuleTagItem,
        ActionType,
        ModuleSelect,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class DelModuleTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string = moduleDefine.TABLE_DROP;
    get _index (){
      return this.index + 1;
    }
}
</script>

<style lang="scss">

</style>
