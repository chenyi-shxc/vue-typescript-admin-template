
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
        <span>步骤{{_index}}：【循环运行】</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
        <el-form label-position="top" @submit.native.prevent>
            <CollapseContainer :collapse="item.collapse">
            <!-- <el-form-item label="循环条件：">
                <el-input v-model="cycleCondition" placeholder="请输入循环条件" :disabled="!isAbleEdit"></el-input>
            </el-form-item> -->
            <FuncField :item="item" fieldKey="cycleCondition" labelName="循环条件：" :feId="item.feId" errorMsg1="请先选择账表！"></FuncField>
            <!-- <el-form-item label="循环步长：">
                <el-input v-model="cycleStepLength" placeholder="请输入循环步长" :disabled="!isAbleEdit"></el-input>
            </el-form-item> -->
            <FuncField :item="item" fieldKey="cycleStepLength" labelName="循环步长：" :feId="item.feId" errorMsg1="请先选择账表！"></FuncField>
            <el-form-item label="循环执行范围：">
                <el-input v-model="cycleRange" placeholder="请输入循环执行范围" :disabled="!isAbleEdit"></el-input>
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
import {moduleDefine} from '@/util/const';
import FuncField from "../func-field.vue";
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
// 循环运行
@Component({
    components:{
        FuncField,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class IteratorCallTemplate extends Vue{
    //@Prop() activeName!:string;
    @module.Mutation('updateFieldString') updateFieldString!:any;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean;
    @Prop() item!:any;
    @Prop() index!:number;
    private templateType:string=moduleDefine.CYCLE_RUN;

    get _index(){
        return this.index + 1;
    }

    get cycleRange(){
        return this.item.cycleRange;
    }

    set cycleRange(val){
        this.updateFieldString({
            moduleFeId:this.item.feId,
            fieldKey:'cycleRange',
            val
        });
    }
}
</script>

<style lang="scss">

</style>
