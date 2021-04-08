
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【循环中断】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <ActionType :module="item" :type="templateType"></ActionType>
        </CollapseContainer>
        <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {moduleDefine} from '@/util/const';
import ActionType from '../action-type.vue';
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 循环中断
@Component({
    components:{
        ActionType,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class BreakIteratorTemplate extends Vue{

    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string=moduleDefine.CYCLE_BREAK;
    get _index(){
      return this.index + 1;
    }

}
</script>

<style lang="scss">

</style>
