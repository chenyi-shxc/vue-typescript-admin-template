
<template>
  <el-card :id="'pos-'+item.feId" shadow="hover">
    <div slot="header" class="clearfix">
      <span>步骤{{_index}}：【账表查询】</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
    </div>
        <el-form  label-position="top" @submit.native.prevent>
          <CollapseContainer :collapse="item.collapse">
            <ModuleSelect :item="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId" :isSingle="false"></ModuleSelect>
            <!-- <ModuleTagItem :module="item" labelName="链接条件：" fieldKey="connCondition" :feId="item.feId"></ModuleTagItem> -->
            <Relationship :item="item" labelName="链接条件：" fieldKey="connCondition" tableFieldKey="resourceTable" :feId="item.feId"></Relationship>
            <FuncField :item="item" fieldKey="funcField" labelName="目标字段或表达式：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
            <LimitRecode :module="item" fieldKey="dataSize" :feId="item.feId"></LimitRecode>
            <FuncField :item="item" fieldKey="condition" labelName="操作条件：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
            <FuncField :item="item" fieldKey="groupField" labelName="分组字段：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></FuncField>
            <Order :item="item" fieldKey="orderField" labelName="排序字段：" :feId="item.feId" tableFieldKey="resourceTable" errorMsg1="请先选择账表！"></Order>
            <ActionType :module="item" :type="templateType"></ActionType>
            <!-- 依据 templateType字段的值，来更新目标账本or变量选择-->
            <!-- <ModuleSelect v-if="item.actionType == 'RESULTTABLE' || item.actionType == 'MIDDLETABLE' || item.actionType == 'SHOWTABLE'" :item="item" labelName="目标账本：" fieldKey="targetTable" :feId="item.feId" :isSingle="true"></ModuleSelect> -->
            <!-- <el-form-item v-if="item.actionType == 'RESULTTABLE' || item.actionType == 'MIDDLETABLE' || item.actionType == 'SHOWTABLE'" label="目标账本：">
              <el-input v-model="targetTable" placeholder="请输入账表名称" :disabled="!isAbleEdit"></el-input>
            </el-form-item> -->
            <ModuleTagItem v-if="item.actionType == 'RESULTTABLE' || item.actionType == 'MIDDLETABLE' || item.actionType == 'SHOWTABLE'" :module="item" labelName="目标账本：" maxLen="1" fieldKey="targetTable" :feId="item.feId"></ModuleTagItem>
            <SelectVar v-else-if="item.actionType == 'SAVEARRAY' || item.actionType == 'SAVECOLLECTION'" labelName="目标变量：" :module="item" fieldKey="targetTable"></SelectVar>
          </CollapseContainer>
          <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
        </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ModuleTagItem from '../module-tag-item.vue';
import LimitRecode from '../limit-recode.vue';
import ActionType from '../action-type.vue';
import {moduleDefine} from '@/util/const';
import FuncField from "../func-field.vue";
import Order from '../order/index.vue';
import ModuleSelect from '../module-select/index.vue';
import Relationship from '../relationship/index.vue';
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import SelectVar from '../select-var.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';
import getId from '@/util/key';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');

// 帐表查询
@Component({
    components:{
        ModuleTagItem,
        LimitRecode,
        ActionType,
        ModuleSelect,
        FuncField,
        Order,
        Relationship,
        TemplateTopBtn,
        EditorTextArea,
        SelectVar,
        CollapseContainer
    }
})
export default class QueryTemplate extends Vue{
    @Prop() item!:any;
    @Prop() index!:number;

    private templateType:string = moduleDefine.TABLE_QUERY;

    // @module.Mutation('updateFieldString') updateFieldString!:any;
    // @module.Getter('isAbleEdit') isAbleEdit!:boolean;

    get _index (){
      return this.index + 1;
    }

    // get targetTable(){
    //   if(this.item && this.item['targetTable'] && this.item['targetTable'][0]){
    //         return this.item['targetTable'][0].title || '';
    //     }else{
    //         return '';
    //     }
    // }

    // set targetTable(val:string){
    //   this.updateFieldString({
    //         moduleFeId:this.item.feId,
    //         fieldKey:'targetTable',
    //         val:[{
    //             id:getId(),
    //             title:val
    //         }]
    //     });
    // }
  
    
}
</script>

<style lang="scss">

</style>
