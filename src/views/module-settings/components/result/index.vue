<template>
  <div>
    <el-card class="mb-b" :body-style="{ padding: '10px' }" shadow="never">
      <el-row type="flex" justify="space-between">
        <el-col :span="18">
          当前模型共有{{results.length}}个结果表。当前展示为
          <el-select
            v-model="result_id"
            filterable
            size="small"
            placeholder="可搜索选择"
            style="min-width: 200px;margin-left: 10px;"
          >
            <el-option
              v-for="item in results"
              :key="item.enName"
              :label="item.cnName"
              :value="item.enName"
            />
          </el-select>
        </el-col>
        <el-col :span="6" style="text-align:right;margin-right:10px">
          <el-button size="small" @click="modify">修改</el-button>
        </el-col>
      </el-row>
    </el-card>
    <Show v-show="!currentIsShowConf"/>
    <div v-show="currentIsShowConf">
      <SettingsConditions  :tableEnglishName="result_id"/>
      <SettingsCharts :tableEnglishName="result_id"/>
      <SetTable :tableEnglishName="result_id"/>
      <el-row>
        <el-col :span="24">
          <div style="text-align:center;">
            <el-button @click="submit" type="primary" size="small">保存</el-button>
            <el-button @click="cancel" size="small">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import SettingsConditions from "./components/settings/conditions/index.vue";
import SettingsCharts from "./components/settings/charts/index.vue";
import SetTable from './components/settings/table/set-table.vue';
import Show from './components/show/index.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const tableResult = namespace('tableResult');
@Component({
  components: {
    SettingsConditions,
    SettingsCharts,
    SetTable,
    Show
  }
})
export default class ModuleResult extends Vue {

  @tableResult.Getter('activeResultTable') activeResultTable !:any;
  @tableResult.Getter('conditionMap') conditionMap!:any;
  @tableResult.Getter('currentTableFields') currentTableFields!:any;
  @tableResult.Getter('currentIsShowConf') currentIsShowConf!:boolean


  @tableResult.Action('init') init !:any;
  @tableResult.Action('getTableField') getTableField!:any;
  @tableResult.Action('getConf') getConf!:any;
  @tableResult.Action('getStTable') getStTable!:any;
  
  @tableResult.Mutation('changeSelectedResultTable') changeSelectedResultTable!:any;
  @tableResult.Mutation('changeIsShowConf') changeIsShowConf !:any;
  @tableResult.Getter('resultTables') results!:any;

  @tableResult.Action('submitConf') submitConf!:any;

  @tableResult.Action('queryResult') queryResult!:any;
  //结果表id englishTableName
  get result_id(){
    if(this.activeResultTable){
      return this.activeResultTable.enName;
    } else {
      return '';
    }
  }

  set result_id(val:string){
    this.changeSelectedResultTable({
      tableEnglishName:val
    });
  }

  @Watch('modelID')
  onModelID(newVal:string){
    this._initData(newVal);
  }

  get modelID(){
    return this.$route.params.modelID;
  }

  get modelNo(){
    return this.$route.params.modelNo;
  }

  _initData(modelID:string){
    Promise.all([
      this.init({value:modelID}),//写的moduleId的值，结果表的内容
      this.getStTable({value:modelID})//获取的展示表内容
    ]).then((result) => {
      
    }).catch((err) => {
      console.log(err.stack);
    });
  }



  // 顶部的 表选择切换了
  @Watch('result_id')
  onResultTable(englishTableName:string){
    // console.log(newVal);
    
    
    if(!this.conditionMap[englishTableName]){
      console.log('change... result table....');
      this.getConf({
        value:englishTableName
      }).then((result:any) => {
        // 获取该 table下的 所有 select文本框的内容。
        this.getResultTableField(englishTableName);    
        //query 内容
        return this.queryResult({
            tableEnglishName:this.activeResultTable.enName,
            modelNo:this.$route.params.modelNo,
            currentPage:1
        });
      }).then((result:any) => {
        console.log('##########result#############');
        console.log(result);
        if(result && result.code != 200){
          (this as any).$message({
            type:'error',
            message:result.msg || '未知错误'
          });
        }
      }).catch((err:any) => {
        
      });
    }
    
  }

  getResultTableField(englishTableName:string){
    //检测当前 englishTableName下是否有table field list，有 就不在进行请求了
    // console.log('go.....');
    console.log('当前的currentTableFields:',this.currentTableFields);
    if(this.currentTableFields){
      return;
    }

    this.getTableField({tableEnglishName:englishTableName}).then((result:any) => {
      
    }).catch((err:any) => {
      
    });
  }




  mounted(){
    if(this.modelID){
      this._initData(this.modelID);
    }

    
  }
  modify() {
    //console.log("点击修改");
    this.changeIsShowConf({
      tableEnglishName: this.result_id,
      isShowConf:true
    });
  }

  cancel(){
    this.changeIsShowConf({
      tableEnglishName: this.result_id,
      isShowConf:false
    });
  }

  submit(){
    this.submitConf({
      modelNo:this.$route.params.modelNo,
      modelID:this.$route.params.modelID
    }).then((result:any) => {
      this.changeIsShowConf({
        tableEnglishName: this.result_id,
        isShowConf:false
      });

      return this.queryResult({
            tableEnglishName:this.activeResultTable.enName,
            modelNo:this.$route.params.modelNo,
            currentPage:1
      });
    }).then((result:any)=>{
      console.log(result);
    }).catch((err:any) => {
      console.log(err.stack);
      if(err.message){
        (this as any).$message.error(err.message);
      }
    });
  }
}
</script>

<style lang="scss">
</style>