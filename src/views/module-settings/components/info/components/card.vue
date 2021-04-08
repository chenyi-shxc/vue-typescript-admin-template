<template>
  <el-row v-if="card && formData">
      <el-col :span="24">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>模型卡片</span>
                    <TopBtn :isEdtor="isEditing" @save="save" @edit="edit" @reset="reset"/>
                </div>
                <el-form :disabled="!isEditing" label-position="left" :label-width="'5em'" @submit.prevent.stop>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item  class="form-label-item" label="模型编号">
                                <el-input style="width:194px;" type="text" v-model="formData.modelNo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="form-label-item" label="模型名称">
                                <el-input style="width:194px;" type="text" v-model="formData.modelName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item class="form-label-item" label="模型大类">
                                <el-select v-model="formData.modelCategory" v-if="opts['modelCategory']">
                                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item of opts['modelCategory']">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="form-label-item" label="细分分类">
                                <el-select v-model="formData.partition" v-if="opts['partition']">
                                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item of opts['partition']">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item class="form-label-item" label="模型类型">
                                <el-select v-model="formData.businessType" v-if="opts['businessType']">
                                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item of opts['modelType']">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="form-label-item" label="专题类型">
                                <el-select v-model="formData.themeType" v-if="opts['themeType']">
                                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item of opts['themeType']">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="模型功能">
                                <el-input v-model="formData.modelFunc" type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="模型思路">
                                <el-input v-model="formData.detailIdea" type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="注意事项">
                                <el-input v-model="formData.wholeIdea" type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="审计依据">
                                <el-input v-model="formData.auditBasis" type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>  
      </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import TopBtn from './top-btn.vue';
import ModuleInfo from '@/model/module-info/info';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const moduleInfo = namespace('moduleInfo');
const modelCard = namespace('modelCard');
@Component({
    components:{
        TopBtn
    }
})
export default class Card extends Vue{
    //@Prop() activeName!:string;
    @modelCard.Getter('getStModel') stModelCardData!:any;
    @modelCard.Getter('getModelCardFeId') modelCardFeId!:string;
    @moduleInfo.Action('initCardData') initCardData!:any;
    @moduleInfo.Getter('card') card!:ModuleInfo;
    @moduleInfo.Action('getOpts') getOpts!:any;
    @moduleInfo.Getter('opts') opts!:any;
    @moduleInfo.Action('saveCardInfo') saveCardInfo!:any;

    private formData:ModuleInfo|null = null;
    private isEditing = false;

    @Watch('modelCardFeId')
    onModelCardFeId(){
        this.$nextTick(()=>{
            this.initCardData({
                ...this.stModelCardData
            });
        });
    }

    // @Watch('modelID')
    // onModelID(newVal:string){
    //   this.init(newVal);
    // }

    // init(modelID:string){
    //     this.initCardData({
    //         value:modelID
    //     }).then((result:any) => {
            
    //     }).catch((err:any) => {
            
    //     });
    // }

    get modelID(){
      return this.$route.params.modelID;
    }

    @Watch('card')
    onCard(newVal:ModuleInfo){
        this.formData = ModuleInfo.copy(newVal);
    }


    mounted(){
        if(this.card){
            this.formData = ModuleInfo.copy(this.card);
        }

        if(this.modelID){
            // this.init(this.modelID);
            this.initCardData({
                ...this.stModelCardData
            });
        }
        
        // 初始化选项信息
        Promise.all([
            this.getOpts({
                value:'modelCategory'
            }),
            this.getOpts({
                value:'partition'
            }),
            this.getOpts({
                value:'businessType'
            }),
            this.getOpts({
                value:'themeType'
            })
        ]).then((result) => {
            
        }).catch((err) => {
            
        });
    }

    save(){
        this.saveCardInfo({
            value:{
                ...this.formData,
                modelID:this.modelID
            }
        }).then((result:any) => {
            this.isEditing = false;
        }).catch((err:any) => {
            this.isEditing = false;
        });;
    }
    reset(){
        this.formData = ModuleInfo.copy(this.card);
    }
    edit(){
        this.isEditing = true;
    }
}
</script>

<style lang="scss">
.form-label-item{
    margin-right: 40px!important;
}
</style>