<template>
    <div class="mb-b">
        <TopBar :data="runData"/>
        <el-card shadow="hover">
            <div slot="header">
                <span>运行参数</span>
            </div>
            <el-row :gutter="20" class="params-row">
                <el-col :span="20">
                    <el-form @submit.native.prevent>
                        <el-form-item label="运行范围">
                            <Scope @updateRunData="updateRunData" :data="runData.runRange"></Scope>
                        </el-form-item>
                        <el-form-item label="开始时间">
                            <Time @updateRunData="updateRunData" :data="runData"></Time>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="paramsData" border>
                        <div slot="empty">
                            <span>暂无数据</span>
                            <el-button @click="add" type="text">点我</el-button>
                            <span>增加数据！</span>
                        </div>
                        <el-table-column
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column 
                            label="模型参数名称"
                            prop="name"
                        ></el-table-column>
                        <el-table-column
                            label="参数类型"
                            prop="type"
                        ></el-table-column>
                        <el-table-column
                            label="参数值"
                            prop="paramValue"
                        ></el-table-column>
                        <el-table-column
                            label="参数说明"
                            prop="paramDesc"
                        ></el-table-column>
                        <el-table-column
                            label="参数类别"
                            prop="paramType"
                        ></el-table-column>
                        <el-table-column
                            label="操作"
                            width="120">
                            <template slot-scope="scope">
                                <el-button
                                    @click.native.prevent="edit(scope.$index, paramsData)"
                                    type="text"
                                    size="small">
                                    编辑
                                </el-button>
                                <el-button
                                    @click.native.prevent="add"
                                    type="text"
                                    size="small">
                                    增加
                                </el-button>
                                <el-button
                                    @click.native.prevent="del(scope.$index, paramsData)"
                                    type="text"
                                    size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
        <ParamsDialog :isNew="isNew" :data="formData" :isShowDialog="isShowDialog" @close="close" @submit="submit"/>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Scope from './scope.vue';
import Time from './time.vue';
import ParamsDialog from './params-dialog.vue';
import ModuleParams from '@/model/module/params';
import TopBar from './top-bar.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
// TODO: 顶部的参数 配合 参数运行
@Component({
    components:{
        Scope,
        Time,
        ParamsDialog,
        TopBar
    }
})
export default class ParamsRow extends Vue{
    @module.Getter('paramsData') paramsData!:any;
    @module.Mutation('updateParams') updateParams!:any;
    @module.Action('saveParams') saveParams!:any;
    // @module.Mutation('delParams') delParams!:any;
    @module.Action('deleteParams') deleteParams!:any;
    private isShowDialog:boolean = false;

    private formData:any = null;

    private isNew:boolean = false;

    private runData:{
        runRange:string,
        runType:string,
        runRegx:string
    }={
        runRange:'',
        runType:'立即开始',
        runRegx:''
    }

    get modelID(){
      return this.$route.params.modelID;
    }

    updateRunData(key:string,val:string){
        (this.runData as any)[key] = val;
    }



    edit(index:number,paramsData:any){
        this.formData = paramsData[index];
        this.isNew = false;
        this.isShowDialog = true;
    }
    del(index:number, paramsData:any){

        this.deleteParams({
            id:paramsData[index].id,
            modelID:this.modelID,
            data:paramsData[index]
        }).then((result:any) => {
            
        }).catch((err:any) => {
            
        });;
    }

    add(){
        console.log('增加内容');
        this.isNew = true;
        this.formData = ModuleParams.emptyInstance();
        this.isShowDialog = true;
    }

    close(){
        this.isShowDialog = false;
    }
    // data 为数据内容，
    submit(data:ModuleParams,isNew:boolean, feId:string){

        this.saveParams({
            modelID:this.modelID,
            data:data,
            isNew:isNew,
            feId:feId
        }).then((result:any) => {
            this.close();
        }).catch((err:any) => {
            this.close();
        });
    }

    // syncServer(){
    //     //TODO: 保存 需要moduleId的值
    //     this.saveParams({
    //         value:''
    //     }).then((result:any) => {
            
    //     }).catch((err:any) => {
            
    //     });
    // }
}
</script>

<style lang="scss">
.params-row{
    margin-bottom: 20px;
}
</style>