
<template>
  <el-card :id="'pos-'+item.feId"  shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【条件判断】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <!-- <ModuleTagItem :module="item" labelName="条件内容：" fieldKey="condition" maxLen="1" :feId="item.feId"></ModuleTagItem> -->
          <FuncField :item="item" fieldKey="condition" labelName="条件内容：" :feId="item.feId"></FuncField>
          <el-form-item label="成立时运行范围：">
              <el-input v-model="trueRange" placeholder="请输入成立时运行范围" :disabled="!isAbleEdit"></el-input>
          </el-form-item>
          <el-form-item label="不成立时运行范围：">
              <el-input v-model="falseRange" placeholder="请输不成立时运行范围" :disabled="!isAbleEdit"></el-input>
          </el-form-item>
        </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
import ModuleTagItem from '../module-tag-item.vue';
import {moduleDefine} from '@/util/const';
import FuncField from "../func-field.vue";
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 条件判断
@Component({
  components:{
    ModuleTagItem,
    FuncField,
    TemplateTopBtn,
    EditorTextArea,
    CollapseContainer
  }
})
export default class JudgmentTemplate extends Vue{
    @module.Mutation('updateFieldString') updateFieldString!:any;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean;
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string=moduleDefine.CONDITION_JUDGE;

    get _index (){
      return this.index + 1;
    }

    get trueRange(){
      return this.item.trueRange;
    }

    set trueRange(val:string){
      this.updateFieldString({
        moduleFeId:this.item.feId,
        fieldKey:'trueRange',
        val
      });
    }

    get falseRange(){
      return this.item.falseRange;
    }

    set falseRange(val:string){
      this.updateFieldString({
        moduleFeId:this.item.feId,
        fieldKey:'falseRange',
        val
      });
    }
}
</script>

<style lang="scss">

</style>
