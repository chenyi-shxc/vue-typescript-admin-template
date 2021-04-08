<template>
  <el-row>
    <el-col :span="24">
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <span>模型运行信息</span>
            </div>
            <el-table :data="runModelState" border>
                <el-table-column label="步骤" prop="step"/>
                <el-table-column label="创建日期" prop="createDate"/>
                <el-table-column label="版本" prop="version"/>
                <el-table-column label="全局参数" prop="globalParam"/>
                <el-table-column label="局部参数" prop="localParam"/>
                <el-table-column label="描述信息" prop="description"/>
            </el-table>
        </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
@Component({

})
export default class RunInfo extends Vue{
    // @module.Action('initRunModelState') initRunModelState!:any;
    @module.Getter('runModelState') runModelState!:any;
    //@Prop() activeName!:string;

    init(modelID:string){
        // this.initRunModelState({
        //     value:modelID
        // }).then(() => {
            
        // }).catch((err:any) => {
            
        // });;
    }

    mounted(){
        // if(this.modelID){
        //     this.init(this.modelID);
        // }
    }

    get modelID(){
      return this.$route.params.modelID;
    }

    @Watch('modelID')
    onModelID(newVal:string){
        this.init(newVal);
    }   

}
</script>

<style lang="scss">

</style>