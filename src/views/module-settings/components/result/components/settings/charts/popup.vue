<template>
  <el-dialog :visible.sync="isVisible" width="70%">
    <span slot="title">
      <i class="el-icon-s-tools" style="margin-right: 4px;"/>
      展示图配置
    </span>
    <el-form :model="form" :rules="rules" ref="chartSettingsForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item key="stEnName" label="展示图表" :label-width="formLabelWidth" prop="stEnName">
            <el-select v-model="form.stEnName" placeholder="请选择活动区域" style="width:200px;">
              <!-- <el-option label="展示表1" value="field1" />
              <el-option label="展示表2" value="field2" /> -->
              <el-option v-for="item of stTableList" :label="item.cnName" :value="item.enName" :key="item.enName"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item key="rtCnName" label="模型结果" :label-width="formLabelWidth">
            <el-input v-model="form.rtCnName" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item key="chartType" label="类型选择" :label-width="formLabelWidth">
            <el-select v-model="form.chartType" placeholder="请选择图表类型" style="width:200px;">
              <el-option
                v-for="item in chartTypes"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item key="theme" label="配色主题" :label-width="formLabelWidth">
            <el-select v-model="form.theme" placeholder="请选择配色主题">
              <el-option
                v-for="item in themes"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item key="chartTitle" label="图表标题" :label-width="formLabelWidth">
            <el-input v-model="form.chartTitle" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="form.chartType === 'bar_line'">
        <el-col :span="12">
          <el-form-item key="primaryYTitle" label="主Y轴显示名称" :label-width="formLabelWidth">
            <el-input v-model="form.primaryYTitle" />
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item key="secondaryYTitle" label="副Y轴显示名称" :label-width="formLabelWidth">
            <el-input v-model="form.secondaryYTitle" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Legend名称" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.legendTitle" /> -->
            <ChartFields key="chartFields-05" @delField="delField" @addField="addField" :fieldList="stFields" :list="form.feLegendTitle" :isMutli="false" filedKey="feLegendTitle"></ChartFields>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 柱状折线图 -->
      <el-row :gutter="20" v-if="form.chartType === 'bar_line'">
        <el-col :span="24">
          <el-form-item key="chartNumType" label="图形数值类型" :label-width="formLabelWidth" prop="chartNumType">
            <el-input v-model="form.chartNumType" placeholder="注意请用英文逗号进行分割"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 柱状折线图、柱状图、折线图 -->
      <el-row :gutter="20" key="input_1" v-if="['bar_line'].indexOf(form.chartType) >= 0">
        <el-col :span="24">
          <el-form-item label="X轴数据列名称" :label-width="formLabelWidth" prop="nameCol">
            <!-- <el-input v-model="form.nameCol" placeholder="名称列" /> -->
            <ChartFields key="chartFields-01" @delField="delField" @addField="addField" :fieldList="stFields" :list="form.feNameCol" :isMutli="false" filedKey="feNameCol"></ChartFields>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 柱状折线图、柱状图、折线图 -->
      <el-row :gutter="20" key="input_2" v-if="['bar_line'].indexOf(form.chartType) >= 0">
        <el-col :span="24">
          <el-form-item label="Y轴数据列名称" :label-width="formLabelWidth" prop="valueCol">
            <!-- <el-input v-model="form.valueCol" placeholder="值列(可以输入,进行分割【英文的,】)"  /> -->
            <ChartFields key="chartFields-02" @delField="delField" @addField="addField" :fieldList="stFields" :list="form.feValueCol" :isMutli="true" filedKey="feValueCol"></ChartFields>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" key="input_2_1" v-if="['bar_line'].indexOf(form.chartType) >= 0">
        <el-col :span="24">
          <el-form-item label="副y轴所属字段" :label-width="formLabelWidth" prop="secondaryYFields">
            <!-- <el-input v-model="form.valueCol" placeholder="值列(可以输入,进行分割【英文的,】)"  /> -->
            <ChartFields key="chartFields-02" @delField="delField" @addField="addField" :fieldList="stFields" :list="form.secondaryYFields" :isMutli="true" filedKey="secondaryYFields"></ChartFields>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 饼环图、雷达图 -->
      <el-row :gutter="20" v-if="['bar', 'line','ring', 'radar'].indexOf(form.chartType) >= 0">
        <el-col :span="24">
          <el-form-item  key="input_3"  label="名称数据列名称" :label-width="formLabelWidth" prop="hotfix_nameCol" >
            <!-- <el-input v-model="form.hotfix_nameCol" /> -->
            <ChartFields key="chartFields-03" @delField="delField" @addField="addField" :fieldList="stFields" :list="form.feNameCol" :isMutli="false" filedKey="feNameCol"></ChartFields>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 饼环图、雷达图 -->
      <el-row :gutter="20" v-if="['bar', 'line','ring', 'radar'].indexOf(form.chartType) >= 0">
        <el-col :span="24">
          <el-form-item key="input_4" label="取值数据列名称" :label-width="formLabelWidth" prop="hotfix_valueCol">
            <!-- <el-input v-model="form.hotfix_valueCol"/> -->
            <ChartFields key="chartFields-04" @delField="delField" @addField="addField" :fieldList="stFields" :list="form.feValueCol" :isMutli="true" filedKey="feValueCol"></ChartFields>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import getId from '@/util/key';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

import ChartFields from './fields.vue';
import {findIndex} from 'lodash';
const tableResult = namespace('tableResult');
// TODO:后边可能要加 数据源SQL 字段。
@Component({
  components:{
    ChartFields
  }
})
export default class Popup extends Vue{
    // 更改ColumnConf 的 columnJson字段
    // ColumnConf 的 feId, 用来获取当前更改的是那个 ColumnConf
    @Prop({}) feId !: string;
    @Prop({}) showDialog!: boolean;
    @Prop({}) popData!:string;
    // private stTableList;
    @tableResult.Getter('stTableList') stTableList!:any;
    @tableResult.Getter('activeResultTable') activeResultTable!:any;
    @tableResult.State('stTableFieldMap') stTableFieldMap!:{
        [fieldKey: string]: SetTableField[]
    };
    @tableResult.Action('getStTableField') getStTableField!:any;

    private formLabelWidth = '10em';
    private chartTypes:any = [{
          key: 'bar_line',
          name: '柱状折线混合图'
        }, {
          key: 'bar',
          name: '柱状图'
        }, {
          key: 'line',
          name: '折线图'
        }, {
          key: 'ring',
          name: '饼环图'
        }, {
          key: 'radar',
          name: '雷达图'
        }];

    private themes = [{
          key: 'default',
          name: '默认'
        }, {
          key: 'blue',
          name: '蓝色'
        }, {
          key: 'dark',
          name: '黑暗'
        }, {
          key: 'light',
          name: '明亮'
        }, {
          key: 'sunset',
          name: '日暮'
        }, {
          key: 'golden',
          name: '金秋'
        }];

    // 展示表变换
    @Watch('form.stEnName')
    onStEnName(newVal:string){
      this.stTableList.forEach((item:any) => {
        if(item.enName == newVal){
          this.form.stCnName = item.cnName;
          this.form.stId = item.tableId;
        }
      });
      if(!this.stTableFieldMap[newVal] ){
        this.getStTableField({
          tableEnglishName:newVal
        }).then((result:any) => {
          // console.log(this.tableFieldMap[this.form.stEnName]);
        }).catch((err:any) => {
          console.log(err);
        });      
      }
    }

    get stFields(){
      return this.stTableFieldMap[this.form.stEnName];
    }

    @Watch('form.chartType')
    onChartType(newVal:string){
      this.changeRules(newVal);
      if(this.$refs.chartSettingsForm){
        this.$nextTick(()=>{
          (this.$refs.chartSettingsForm as any).resetFields();
        });
      }
    }

    changeRules(chartType: string) {
      if (chartType === 'bar_line') {
        this.rules = {
          stEnName: [{
            validator: (rule: any, val: string, cb: any) => {
              if (val === '') {
                cb(new Error('请选择展示图表'));
              } else {
                cb();
              }
            },
            trigger: 'blur'
          }, ],
          chartNumType: [{
            validator: (rule: any, val: string, cb: any) => {
              if (this.form.chartType === 'bar_line') {
                if (val === '') {
                  cb(new Error('请填写图形数值类型'))
                } else if (val.indexOf('，') != -1) {
                  cb(new Error('请用英文的,进行分割'))
                } else {
                  cb();
                }
              } else {
                console.log('chartNumType');
                cb();
              }
            },
            trigger: 'blur'
          }],
          // valueCol: [{
          //   validator: (rule: any, val: string, cb: any) => {
          //     if (val === '') {
          //       cb(new Error('请输入内容'));
          //     } else {
          //       cb();
          //     }
          //   },
          //   trigger: 'blur'
          // }],
          // nameCol: [{
          //   validator: (rule: any, val: string, cb: any) => {
          //     if (val === '') {
          //       cb(new Error('请输入内容'));
          //     } else {
          //       cb();
          //     }
          //   },
          //   trigger: 'blur'
          // }],
        };
      }else{
          this.rules = {
            stEnName: [{
              validator: (rule: any, val: string, cb: any) => {
                if (val === '') {
                  cb(new Error('请选择展示图表'));
                } else {
                  cb();
                }
              },
              trigger: 'blur'
            }, ],
            // hotfix_valueCol: [{
            //   validator: (rule: any, val: string, cb: any) => {
            //     if (this.form.chartType !== 'bar_line') {
            //       if (val === '') {
            //         cb(new Error('请输入内容'));
            //       } else {
            //         cb();
            //       }
            //     }
            //   },
            //   trigger: 'blur'
            // }],
            // hotfix_nameCol: [{
            //   validator: (rule: any, val: string, cb: any) => {
            //     if (this.form.chartType !== 'bar_line') {
            //       if (val === '') {
            //         cb(new Error('请输入内容'));
            //       } else {
            //         cb();
            //       }
            //     }
            //   },
            //   trigger: 'blur'
            // }]
          };
        }
    }

    // submit的时候将 该内容映射到store上
    private form:FePopSettingChart =  {
      stEnName: '',// 展示表的英文名字
      stCnName: '',// 展示表的中文名
      stId:'',//展示表的id
      rtCnName:'',//结果表的中文名字
      rtEnName:'',//结果表的英文名字
      rtId:'',//结果表的id
      chartType: 'bar_line',
      theme: 'default',
      chartTitle: '',
      primaryYTitle: '',
      secondaryYTitle: '',
      legendTitle: '',
      feLegendTitle:[],
      chartNumType: '', // TODO：图形数值类型，我也不知道这是什么混蛋玩意儿
      nameCol: '', // 名称数据列名称
      feNameCol:[],
      secondaryYFields:[],
      valueCol: '', // 取值数据列名称
      feValueCol:[],
      hotfix_nameCol:'',// fixbug form验证的问题 名称数据列名称
      hotfix_valueCol:''// fixbug form验证的问题 取值数据列名称
    }

    rules:any = {};

    get resultTable(){
      return this.activeResultTable;
    }
  

    

    @Watch('isVisible')
    onIsVisible(newVal:boolean){
      if(newVal && this.popData !== ''){
        // 更换form中的数据
        let data = JSON.parse(this.popData);
        if(!data.feNameCol || !data.feLegendTitle || !data.feValueCol){
          data.feNameCol=[];
          data.feLegendTitle = [];
          data.feValueCol = [];
          data.secondaryYFields = [];
        }
        this.form = {
          ...data
        };
        // if(data.chartType !== 'bar_line'){
        //   this.form = {
        //     ...data,
        //     hotfix_valueCol:data.valueCol,
        //     hotfix_nameCol:data.nameCol,
        //     nameCol:'',
        //     valueCol:''
        //   };
        // }else{
        //   // bar & line 混合
        //   this.form = {
        //     ...data,
        //     hotfix_valueCol:'',
        //     hotfix_nameCol:''
        //   };
        // }
        
      }
    }

    get isVisible() {
      return this.showDialog
    }
    set isVisible(val: boolean) {
      this.$emit('changeVisible', val)
    }

    @Watch('activeResultTable')
    onActiveResultTable(newVal:any){
      this.form.rtCnName = newVal.cnName;
      this.form.rtEnName = newVal.enName;
      this.form.rtId = newVal.tableId;
    }

    mounted(){
      this.form.rtCnName = this.resultTable.cnName;
      this.form.rtEnName = this.resultTable.enName;
      this.form.rtId = this.resultTable.tableId;
      this.changeRules(this.form.chartType);
    }

    cancel() {
      // 取消 选中数据
      console.log('popup-cancel')
      this.isVisible = false;
    }

    commit() {
      // 确认关闭
      (this.$refs['chartSettingsForm'] as ElForm).validate((valid) => {
        if (valid) {
          let data:any= {
            ...this.form
          };
          data.legendTitle = this.form.feLegendTitle.map((item)=>{
            return item.fieldEnglishName;
          }).join(',');

          data.nameCol = this.form.feNameCol.map((item)=>{
            return item.fieldEnglishName;
          }).join(',')

          data.valueCol = this.form.feValueCol.map((item)=>{
            return item.fieldEnglishName;
          }).join(',');
          this.$emit('onSubmit', data);
          this.isVisible = false;
        } else {
          return false;
        }
      });
      
    }

    addField(val:{fieldKey:string,data:TableField}){
      (this as any).form[val.fieldKey].push({
        feId:getId(),
        fieldChineseName: val.data.fieldChineseName,
        fieldEnglishName: val.data.fieldEnglishName
      });
    }

    delField(val:{fieldKey:string,data:any}){
      let index = findIndex((this.form as any)[val.fieldKey],(item:any)=>{
        return item.feId == val.data.feId;
      });
      if(index != -1){
        (this.form as any)[val.fieldKey].splice(index,1);
      }
    }

}
</script>

<style lang="scss">

</style>