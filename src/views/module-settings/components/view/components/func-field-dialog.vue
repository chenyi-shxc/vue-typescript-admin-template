<template>
  <el-dialog width="70%" title="目标字段或表达式" :visible.sync="isShow">
    <el-row :gutter="20" class="func-field-container">
        <el-col :span="6">
            <el-card shadow="never" class="mb-s">
                <div slot="header" class="clearfix">
                    <span>字段资源</span>
                </div>
                <div v-if="selectedTabels && selectedTabels.length > 0" :style=" defineVarList && defineVarList.length > 0 ? 'height:180px;overflow:auto;' : 'height:256.5px;overflow:auto;'">
                    <TableFieldTree 
                        :isShow="isShow"
                        :key="item.tableEnglishName" 
                        v-for="item in selectedTabels" 
                        @check="check"
                        :tableChineseName="item.tableChineseName"
                        :tableEnglishName="item.tableEnglishName">
                    </TableFieldTree>
                </div>
                <div v-else class="no-data">
                    <span>暂无内容</span>
                </div>
                
            </el-card>
            <div>
                <div class="mb-s">
                    <el-checkbox v-model="isDouhao">逗号</el-checkbox>
                    <el-checkbox v-model="isAs">作为</el-checkbox>
                    <el-checkbox v-model="isN">换行</el-checkbox>
                </div>
                <div class="clearfix mb-b">
                    <el-button @click="submitFields" style="float: right; padding: 3px 0" type="text">输出选中字段</el-button>
                </div>
            </div>
            <el-card shadow="never">
                <div slot="header">
                    <span>变量资源</span>
                </div>
                <div v-if="defineVarList && defineVarList.length > 0" style="height:150px;overflow:auto;">
                    <el-button type="text" v-for="item in defineVarList" :key="item" @click="clickVar(item)">{{item}}</el-button>
                </div>
                <div v-else class="no-data">
                    <span>暂无内容</span>
                </div>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>模块文本</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">输出选中字段</el-button> -->
                        </div>
                        <TextArea @pos="changePos" @changeVal="changeTextVal" :textAreaVal="textarea"></TextArea>
                    </el-card>
                </el-col>
                <el-col  :span="8">
                    <FuncListView @funClick="funcClick"/>
                </el-col>
            </el-row>
            <div class="mb-b"></div>
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>运算及操作符</span>
                </div>
                <div class="opera-container">
                    <el-button type="text" v-for="item in operaData" :key="item.feId" @click="operaClick(item)">{{item.name}}</el-button>
                </div>
            </el-card>
        </el-col>   
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button  @click="isShow = false">取 消</el-button>
        <el-button @click="confirm" type="primary" >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import TableFieldTree from "./common/table-field-tree.vue";
import TextArea from './common/text-area.vue';
import FuncListView from './func-list.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
const func = namespace('func');
type tableInfo = {
    tableChineseName:string,
    tableEnglishName:string
}
@Component({
    components:{
        TableFieldTree,
        TextArea,
        FuncListView
    }
})
export default class FuncFieldDialog extends Vue{
    @Prop() isVisible?:boolean;// 展示与否开关
    @Prop() item!:any;// 当前更改的module对象
    @Prop() fieldKey!:string;//对应的更改字段
    @Prop() selectedTabels!:tableInfo[];//选中的table数据 主要是 英文表名与中文表名
    @Prop() defineVarList!:string[];
    @func.Getter('func') funcData!:any;//函数表达式 数据
    @func.Getter('operation') operaData!:any;//运算符的数据
    @module.Mutation('updateFieldString') updateFieldString!:any;//更改module上的对应字段的 string类型的值
    //@module.Mutation('insertValatPoint') insertValatPoint!:any;// 根据给定的位置，进行插入数据文本操作
    //是否添加逗号
    private isDouhao:boolean = false;
    //是否添加作为
    private isAs:boolean = false;
    //是否换行
    private isN:boolean = false;
    // 持有的内容textarea的内容
    private textarea:string="";
    // 数据暂存 选项内容。
    private checkedMap:any = {};
    private textAreaPosInfo : {
        selectionStart:number,
        selectionEnd:number
    } = {
        selectionStart:0,
        selectionEnd:0
    };
    // 点击选择的情况下，展示的内容
    check(tableEnglishName:string,tableChineseName:string,checkedNodes:any){
        
        this.checkedMap[tableEnglishName] = {
            tableEnglishName:tableEnglishName,
            tableChineseName:tableChineseName,
            checkedNodes:checkedNodes
        }

    }
    changePos(posInfo:any){
        this.textAreaPosInfo.selectionStart = posInfo.selectionStart;
        this.textAreaPosInfo.selectionEnd = posInfo.selectionEnd;
        //console.log(posInfo);
    }

    //提交字段选项内容
    submitFields(){
        
        let text = '';
        this.selectedTabels.forEach((item)=>{
            let data = this.checkedMap[item.tableEnglishName];
            if(data){
                data.checkedNodes.forEach((_item:any)=>{
                    if(this.isN && this.isDouhao && !this.isAs){
                        text+=`[${item.tableChineseName}.${_item.label}],\n`
                    }else if(this.isN && this.isDouhao && this.isAs){
                        text+=`[${item.tableChineseName}.${_item.label}][作为]「」,\n`
                    }else if(this.isN && !this.isDouhao && !this.isAs){
                        text+=`[${item.tableChineseName}.${_item.label}]\n`
                    }else if(!this.isN && !this.isDouhao && !this.isAs){
                        text+=`[${item.tableChineseName}.${_item.label}]`;
                    }else if(!this.isN && this.isDouhao && this.isAs){
                        text += `[${item.tableChineseName}.${_item.label}][作为]「」,`
                    }else if(!this.isN && !this.isDouhao && this.isAs){
                        text += `[${item.tableChineseName}.${_item.label}][作为]「」`
                    }else if(!this.isN && this.isDouhao && !this.isAs){
                        text += `[${item.tableChineseName}.${_item.label}],`
                    }else if(this.isN && !this.isDouhao && this.isAs){
                        text += `[${item.tableChineseName}.${_item.label}][作为]「」\n`
                    }
                });
            }
        });
        if(text!=''){
            this.insertVal({
                selectionStart:this.textAreaPosInfo.selectionStart,
                selectionEnd:this.textAreaPosInfo.selectionEnd,
                txt:text
            })
        }

    }
    
    
    
    insertVal(val:any){
        let {
            selectionStart,
            selectionEnd,
            txt
        } = val;
        //后续数据操作
        let listRes = this.textarea.split('');
        listRes.splice(selectionStart, selectionEnd - selectionStart, txt);
        this.textarea = listRes.join('');
    }

    get isShow(){
        if(this.isVisible){
            this.textarea =  {...this.item}[this.fieldKey];
        }
        return this.isVisible;
    }

    set isShow(val){
        //TODO: 关闭的时候 返回之前的数据
        this.$emit('close');
        this.isDouhao = false;
        this.isAs = false;
        this.isN = false;
    }

    confirm(){
        this.updateFieldString({
            moduleFeId:this.item.feId,
            fieldKey:this.fieldKey,
            val:this.textarea
        });
        this.isShow = false;
    }

    changeTextVal(val:string){
        // this.updateFieldString({
        //     moduleFeId:this.item.feId,
        //     fieldKey:this.fieldKey,
        //     val
        // });
        this.textarea = val;
    }

    operaClick(item:any){
        // console.log(item);
        this.submitOpt(item.textFieldShow);
    }

    funcClick(item:any){
        // console.log(item);
        this.submitOpt(item.textFieldShow);
    }

    clickVar(varName:string){
        this.submitOpt(varName);
    }
    //提交内容
    submitOpt(txt:string){
        this.insertVal({
            selectionStart:this.textAreaPosInfo.selectionStart,
            selectionEnd:this.textAreaPosInfo.selectionEnd,
            txt
        });
    }
}
</script>

<style lang="scss">
.func-field-container{
    max-height: 550px;
    width: 100%;
    overflow: scroll;
}

.opera-container{
    height: 110px;
    overflow: auto;
}
.no-data{
    line-height: 14px;
    span{
        font-size:12px; text-align: center; color: #C0C4CC;
    }
}
</style>