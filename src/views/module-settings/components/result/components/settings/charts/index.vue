<template>
  <el-card shadow="never" style="margin:20px 0;">
    <div slot="header">
        <span>设置展示图</span>
    </div>
    <el-row type="flex" align="middle" justify="center">
      <div>
        <label for="layout_type">布局模板选择</label>
        <el-select v-model="layout_type" change="" id="layout_type" name="layout_type" size="small" placeholder="请选择" style="margin-left: 10px;min-width: 200px;">
          <el-option
            v-for="item in layout_types"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row v-if="layout_type === 'one' && currentColumnList.length > 0">
      <el-col :span="24" style="margin:20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
    </el-row>
    <el-row v-else-if="layout_type === 'two_horizontal'  && currentColumnList.length > 0" :gutter="20">
      <el-col :span="12" style="margin:20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
      <el-col :span="12" style="margin:20px 0;">
        <Item :key="currentColumnList[1].feId" :data="currentColumnList[1]"/>
      </el-col>
    </el-row>
    <el-row v-if="layout_type === 'two_vertical' && currentColumnList.length > 0" :gutter="20">
      <el-col :span="24" style="margin: 20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
      <el-col :span="24" style="margin-bottom: 20px;">
        <Item :key="currentColumnList[1].feId" :data="currentColumnList[1]"/>
      </el-col>
    </el-row>
    <el-row v-else-if="layout_type === 'three_horizontal' && currentColumnList.length > 0" :gutter="20">
      <el-col :span="8" style="margin:20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
      <el-col :span="8" style="margin:20px 0;">
        <Item :key="currentColumnList[1].feId" :data="currentColumnList[1]"/>
      </el-col>
      <el-col :span="8" style="margin:20px 0;">
        <Item :key="currentColumnList[2].feId" :data="currentColumnList[2]"/>
      </el-col>
    </el-row>
    <el-row v-if="layout_type === 'three_vertical' && currentColumnList.length > 0" :gutter="20">
      <el-col :span="24" style="margin: 20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
      <el-col :span="24">
        <Item :key="currentColumnList[1].feId" :data="currentColumnList[1]"/>
      </el-col>
      <el-col :span="24" style="margin: 20px 0">
        <Item :key="currentColumnList[2].feId" :data="currentColumnList[2]"/>
      </el-col>
    </el-row>
    <el-row v-else-if="layout_type === 'three_two_plus_one' && currentColumnList.length > 0" :gutter="20">
      <el-col :span="12" style="margin:20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
      <el-col :span="12" style="margin:20px 0;">
        <Item :key="currentColumnList[1].feId" :data="currentColumnList[1]"/>
      </el-col>
      <el-col :span="24" style="margin-bottom: 20px;">
        <Item :key="currentColumnList[2].feId" :data="currentColumnList[2]"/>
      </el-col>
    </el-row>
    <el-row v-if="layout_type === 'three_one_plus_two' && currentColumnList.length > 0" :gutter="20" type="flex" style="align-items:stretch;">
      <el-col :span="12" style="margin:20px 0;">
        <Item :key="currentColumnList[0].feId" :data="currentColumnList[0]"/>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="24" style="margin:20px 0;">
            <Item :key="currentColumnList[1].feId" :data="currentColumnList[1]"/>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px;">
            <Item :key="currentColumnList[2].feId" :data="currentColumnList[2]"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Item from './item.vue';
import {tempModelResult} from '@/util/const';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const tableResult = namespace('tableResult');


// 配置echarts的  字段选择都是 展示表的
@Component({
  components: {
    Item,
  }
})
export default class ChartsMain extends Vue{
    //@Prop() activeName!:string;
    @tableResult.Getter('currentTemplate') currentTemplate!:string;
    @tableResult.Mutation('changeTemplateType') changeTemplateType!:any;
    @Prop() tableEnglishName!:string;
    @tableResult.Getter('currentColumnList') currentColumnList!:any;

    get layout_type(){
      return this.currentTemplate;
    }

    set layout_type(value:string){
      this.changeTemplateType({
        tableEnglishName:this.tableEnglishName,
        value
      });
    }


    data() {
      return {
        layout_types: [{
          key: tempModelResult.NONE,
          name: '无图'
        }, {
          key: tempModelResult.ONE,
          name: '单一图'
        }, {
          key: tempModelResult.TWO_H,
          name: '两图横向'
        }, {
          key: tempModelResult.TWO_V,
          name: '两图纵向'
        }, {
          key: tempModelResult.THREE_H,
          name: '三图横向'
        }, {
          key: tempModelResult.THREE_V,
          name: '三图纵向'
        }, {
          key: tempModelResult.THREE_TWO_P_O,
          name: '三图2+1'
        }, {
          key: tempModelResult.THREE_ONE_P_T,
          name: '三图1+2'
        }],
      }
    }
}
</script>

<style lang="scss">

</style>