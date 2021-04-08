<template>
    <el-dialog title="编辑模型参数" :visible.sync="dialogFormVisible">
        <el-form  :label-width="'7em'" label-position="top" :model="formData" @submit.native.prevent>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="模型参数名称">
                        <el-input size="medium" style="width:194px" v-model="formData.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="参数类型">
                        <el-select v-model="formData.type" placeholder="请选择">
                            <el-option
                                v-for="item in typeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="参数值">
                        <!-- 或者根据上面的选项变更为日期选择 -->
                        <el-input style="width:194px" v-model="formData.paramValue" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="参数类别">
                        <el-select v-model="formData.paramType" placeholder="请选择">
                            <el-option
                                v-for="item in type2Options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="参数说明">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.paramDesc" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import ModuleParams from '@/model/module/params'
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
export default class ParamsDialog extends Vue{

    @module.Action('queryDictionry') queryDictionry!:any;
    @module.Getter('optionsMap') optionsMap!:any;

    // options的 参数名字
    private field1:string = 'param_type';
    private field2:string = 'param_cata';

    private formData:ModuleParams = ModuleParams.emptyInstance()
    @Prop() data!:ModuleParams
    @Prop() isShowDialog!:boolean
    @Prop() isNew!:boolean;

    get typeOptions(){
        if(this.optionsMap && this.optionsMap[this.field1]){
            return this.optionsMap[this.field1];
        }else{
            return []
        }
    }

    get type2Options(){
        if(this.optionsMap && this.optionsMap[this.field2]){
            return this.optionsMap[this.field2];
        }else{
            return []
        }
    }

    @Watch('isShowDialog')
    onIsShowDialog(newVal:boolean){
        // 展示的时候将formData数据进行替换
        if(!newVal){
            this.formData = ModuleParams.emptyInstance();
            return;
        }
        this.formData = ModuleParams.emptyInstance();
        this.formData.id = this.data.id;
        this.formData.modelId = this.data.modelId;
        this.formData.name = this.data.name;
        this.formData.code = this.data.code;
        this.formData.type = this.data.type;
        this.formData.paramType = this.data.paramType;
        this.formData.paramValue = this.data.paramValue;
        this.formData.paramNum = this.data.paramNum;
        this.formData.paramDesc = this.data.paramDesc;
    }

    get dialogFormVisible(){
        return this.isShowDialog;
    }

    set dialogFormVisible(val:boolean){
        this.$emit('close');
    }

    submit(){
        // 提交到vuex 进行处理
        this.$emit('submit',this.formData,this.isNew, !this.isNew?this.data.feId : '');
    }

    mounted(){
        this.queryDictionry({
            value:"param_type",
        }).then((result:any) => {
            
        }).catch((err:any) => {
            console.log(err.stack);
        });
        this.queryDictionry({
            value:"param_cata",
        }).then((result:any) => {
            
        }).catch((err:any) => {
            console.log(err.stack);
        });
    }

}
</script>

<style lang="scss">

</style>