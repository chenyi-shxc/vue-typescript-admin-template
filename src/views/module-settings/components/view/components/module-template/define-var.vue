
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【定义变量】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
      <CollapseContainer :collapse="item.collapse">
          <!-- <ModuleTagItem :module="item" labelName="定义内容：" fieldKey="fieldDefined" :feId="item.feId"></ModuleTagItem> -->
        <DefineVar :item="item" fieldKey="fieldDefined"></DefineVar>
      </CollapseContainer>
        <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { moduleDefine } from "@/util/const";
import ModuleTagItem from '../module-tag-item.vue';
import DefineVar from '../define-var/index.vue';
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 定义变量
@Component({
    components:{
        ModuleTagItem,
        DefineVar,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class DefineVarTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string = moduleDefine.VARIABLE_DEFINE;
    get _index (){
      return this.index + 1;
    }
}
</script>

<style lang="scss">

</style>
