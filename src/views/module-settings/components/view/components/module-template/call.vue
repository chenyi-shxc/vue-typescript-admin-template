
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【调用模块】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
      <el-form label-position="top" @submit.native.prevent>
        <CollapseContainer :collapse="item.collapse">
          <ModuleCall :isDisabled="isDisabled" :item="item" labelName="调用模块列表：" fieldKey="moduleList"></ModuleCall>
          <!-- <el-form-item label="传入变量：">
            <el-input 
              type="textarea"
              v-model="textAreaVal"
              :autosize="{ minRows: 3, maxRows: 20}"
              placeholder="请输入内容" 
              :disabled="isDisabled"></el-input>
          </el-form-item> -->
          <FuncField :item="item" fieldKey="variable" labelName="传入变量：" :feId="item.feId"  errorMsg1="请先选择账表！"></FuncField>
        </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {moduleDefine} from '@/util/const';
import ModuleCall from '../module-call/index.vue';
import FuncField from "../func-field.vue";
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const module = namespace('module');
// 调用模块
@Component({
    components:{
        ModuleCall,
        FuncField,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class CallTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean; 

    get isDisabled(){
      return !this.isAbleEdit;
    }

    private templateType:string=moduleDefine.MODULE_CALL;
    private fieldKey:string = 'variable';
    get _index(){
      return this.index + 1;
    }
}
</script>

<style lang="scss">

</style>
