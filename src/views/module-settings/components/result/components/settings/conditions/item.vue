<template>
  <el-row :gutter="10" align="middle" type="flex" style="margin-bottom:10px;">
    <el-col :span="4">
      <el-select v-model="field" filterable size="small" placeholder="请选择" style="width:100%;">
          <el-option
              v-for="item in currentTableFieldsList"
              :key="item.fieldId"
              :label="item.fieldChineseName"
              :value="item.fieldId"
          />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-select v-model="op" size="small" placeholder="请选择" style="width:100%;">
          <el-option
              v-for="item in ops"
              :key="item.key"
              :label="item.name"
              :value="item.key"
          />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-select v-model="type" size="small" placeholder="请选择" style="width:100%;">
          <el-option
              v-for="item in types"
              :key="item.key"
              :label="item.name"
              :value="item.key"
          />
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-input v-model="value" size="small" placeholder="请输入显示名称" style="width:100%;" />
    </el-col>
    <el-col :span="3">
      <el-input v-model="alias" size="small" placeholder="请输入别名" style="width:100%;" />
    </el-col>
    <el-col :span="4">
      <el-row :gutter="6">
        <el-button type="primary" @click="move('up')" icon="el-icon-top" circle size="small"></el-button>
        <el-button type="primary" @click="move('down')" icon="el-icon-bottom" circle size="small"></el-button>
        <el-button type="primary" @click="add" icon="el-icon-plus" circle size="small"></el-button>
        <el-button type="primary" @click="del" icon="el-icon-minus" circle size="small"></el-button>
      </el-row>
    </el-col>
  </el-row>
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
const tableResult = namespace('tableResult');
import Condition from '@/model/module-result/condition';
import {operFun} from '@/util/const';
// 字段获取 是从结果表的字段中获取
@Component({

})
export default class Item extends Vue{
  // field的选择options内容
  @tableResult.Getter('tableFieldMap') tableFieldMap !:any;
  @tableResult.Getter('currentTableFieldsList') currentTableFieldsList!:any;
  @tableResult.Mutation('updateConditionItem') updateConditionItem!:any;
  @tableResult.Mutation('updateConditionByAddOrDel') updateConditionByAddOrDel!:any;
  @tableResult.Mutation('changeConditionPos') changeConditionPos!:any;


  @Prop() index!:number;//下标

  @Prop() data!:Condition;//当前整个条件的选中数据

  @Prop() tableEnglishName!:string;//当前对应的table的key值


  private ops = [...operFun];
  private types = [{
    key: 'text',
    name: '文本'
  }, {
    key: 'date',
    name: '日期'
  }]

  get field(){
    return this.data.columnCnName;
  }

  set field(val:string){
    // console.log(val);
    // console.log('commit to update field');
    // this.updateConditionItem({
    //   tableEnglishName:this.tableEnglishName,
    //   key:'tableFieldId',
    //   val,
    //   feId:this.data.feId
    // });

    // currentTableFieldsList
    for(let i = 0; i<this.currentTableFieldsList.length; i ++){
      if(this.currentTableFieldsList[i].fieldId === val){
        console.log(this.currentTableFieldsList[i].fieldChineseName);
        this.updateConditionItem({
          tableEnglishName:this.tableEnglishName,
          key:'columnCnName',
          val:this.currentTableFieldsList[i].fieldChineseName,
          feId:this.data.feId
        });
        this.updateConditionItem({
          tableEnglishName:this.tableEnglishName,
          key:'columnName',
          val:this.currentTableFieldsList[i].fieldEnglishName,
          feId:this.data.feId
        });
        break;
      }
    }
  }

  get type(){
    return this.data.columnType;
  }
  set type(val:string){
    this.updateConditionItem({
      tableEnglishName:this.tableEnglishName,
      key:'columnType',
      val,
      feId:this.data.feId
    });
  }


  get op(){
    return this.data.operaFun;
  }

  set op(val:string){
    this.updateConditionItem({
      tableEnglishName:this.tableEnglishName,
      key:'operaFun',
      val,
      feId:this.data.feId
    });
  }

  get value(){
    return this.data.chineseFieldName;
  }

  set value(val:string){
    this.updateConditionItem({
      tableEnglishName:this.tableEnglishName,
      key:'chineseFieldName',
      val,
      feId:this.data.feId
    });
  }

  get alias(){
    return this.data.aliasName;
  }

  set alias(val:string){
    this.updateConditionItem({
      tableEnglishName:this.tableEnglishName,
      key:'aliasName',
      val,
      feId:this.data.feId
    });
  }

  add(){
    this.updateConditionByAddOrDel({
      tableEnglishName:this.tableEnglishName,
      feId:this.data.feId,
      operation:'add'
    });
  }

  del(){
    this.updateConditionByAddOrDel({
      tableEnglishName:this.tableEnglishName,
      feId:this.data.feId,
      operation:'del'
    });
  }


  move(dir:string){
    this.changeConditionPos({
      tableEnglishName:this.tableEnglishName,
      feId:this.data.feId,
      dir
    });
  }
}
</script>

<style lang="scss">

</style>