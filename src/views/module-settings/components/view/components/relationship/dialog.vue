<template>
  <el-dialog width="70%" title="连接条件" :visible.sync="isShow">
    <el-card shadow="never" class="mb-s">
        <el-form label-position="top" @submit.native.prevent>
            <el-form-item label="表连接顺序">
                <div v-if="selectedResourceTable && selectedResourceTable.length == 1">
                    <SelectModule  @moduleChange="moduleChange" :selectedResourceTable="selectedResourceTable" key="relationship-key1" index="0" :showTxt="false"></SelectModule>
                    <SelectModule  @moduleChange="moduleChange" :selectedResourceTable="selectedResourceTable" key="relationship-key2" index="1" :showTxt="false"></SelectModule>
                </div>
                <SelectModule x v-else @moduleChange="moduleChange" :selectedResourceTable="selectedResourceTable" v-for="(item,index) in selectedResourceTable" :key="index" :index="index" :showTxt="index + 1 != selectedResourceTable.length"></SelectModule>
            </el-form-item>
            <el-form-item label="连接条件">
                <!-- <div class="clearfix">
                    <Select :index="index" @changeSelect="changeSelect" :key="index" v-for="(item,index) in listSelectShowVal" :selectedResourceTable="selectedResourceTable"></Select>
                </div> -->
                <RelationsGroup @delItem="delItem" @addItem="add" :feId="item.feId" :index="index" @changeSelectItem="changeSelect" :key="item.feId" v-for="(item,index) in listSelectShowVal" :data="item" :selectedResourceTable="selectedResourceTable"/>
            </el-form-item>
            <el-form-item>
                <el-button v-if="isAbleClickRelationshipBtn" class="jfr" @click="changeTemplateStr" style=" padding: 3px 0" type="text">输出选中关联关系</el-button>
                <el-button v-else disabled class="jfr" @click="changeTemplateStr" style=" padding: 3px 0" type="text">输出选中关联关系</el-button>
            </el-form-item>
        </el-form>
    </el-card>  
        <el-row :gutter="20" class="mb-s">
            <el-col :span="18">
                <el-card shadow="never" >
                    <div slot="header" class="clearfix">
                        <span>模块文本</span>
                    </div>
                    <TextArea @pos="changePos" @changeVal="changeTextVal" :textAreaVal="textarea"></TextArea>
                </el-card>
            </el-col>
            <el-col :span="6">
                <FuncListView @funClick="funcClick"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header" class="clearfix">
                        <span>运算及操作符</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">输出选中字段</el-button> -->
                    </div>
                    <div>
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
import Select from './select.vue';
import TextArea from '../common/text-area.vue';
import SelectModule from './select-module.vue';
import FuncListView from '../func-list.vue';
import RelationsGroup from './relations-group.vue';
import getId from '@/util/key';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const func = namespace('func');
const module = namespace('module');

@Component({
    components:{
        Select,
        TextArea,
        SelectModule,
        FuncListView,
        RelationsGroup
    }
})
export default class ClassName extends Vue{
    @Prop() isShowDialog!:boolean;
    @Prop() selectedResourceTable!:any;
    @Prop() item!:any;
    @Prop() fieldKey!:any;
    @func.Getter('func') funcData!:any;//函数表达式 数据
    @func.Getter('operation') operaData!:any;//运算符的数据
    @module.Mutation('updateFieldString') updateFieldString!:any;//更改module上的对应字段的 string类型的值
    private isAbleClickRelationshipBtn:boolean=false;
    // 持有的内容textarea的内容
    private textarea:string="";
    // 文本光标选择的区域
    private textAreaPosInfo : {
        selectionStart:number,
        selectionEnd:number
    } = {
        selectionStart:0,
        selectionEnd:0
    };
    // 条件选择的结果
    private listSelectShowVal:{feId:string,list:{feId:string,data:any}[]}[] = [];
    // 表选择的顺序结果
    private listModuleShowVal:any[] = [];

    @Watch('listSelectShowVal',{ immediate: true, deep: true })
    onListSelectShowVal(newVal:any){
        // console.log(newVal);
        // console.log(this.listSelectShowVal);
        for(let i = 0; i<newVal.length ; i++){
            // console.log(newVal[i]);
            if(!newVal[i]){
                this.isAbleClickRelationshipBtn = false;
                return;
            }
            if(!newVal[i][1] || !newVal[i][2]){
                this.isAbleClickRelationshipBtn = false;
                return;
            }
        }

        for(let i = 0; i<this.listModuleShowVal.length; i++){
            if(!this.listModuleShowVal[i] || !this.listModuleShowVal[i].tableEnglishName){
                this.isAbleClickRelationshipBtn = false;
                return;
            }
        }
        this.isAbleClickRelationshipBtn = true;
    }
    // 更改输出按钮状态
    checkAbleClickRelationShipBtn(){
        var mark = false;

        for(let i = 0 ; i < this.listModuleShowVal.length; i++){
            if(!this.listModuleShowVal[i]){
                mark = true;
                break;
            }
        }

        for(let i = 0; i<this.listSelectShowVal.length; i ++){
            if(mark){
                break;
            }
            for(let j = 0; j<this.listSelectShowVal[i].list.length; j++){
                let item = this.listSelectShowVal[i].list[j];
                if(item.data && item.data[1] && item.data[2]){
                    
                }else{
                    mark = true;
                    break;
                }
            }
        }
        if(mark){
            this.isAbleClickRelationshipBtn = false;
        }else{
            this.isAbleClickRelationshipBtn = true;
        }
    }



    @Watch('selectedResourceTable')
    onSelectedResourceTable(){
        // 源帐表的选择发生变化就清空这个 listSelectShowVal的内容
        // this.listSelectShowVal = new Array(this.selectedResourceTable.length -1 > 0 ? this.selectedResourceTable.length - 1 : 0);
        // this.listModuleShowVal = new Array(this.selectedResourceTable.length);

        if(this.selectedResourceTable && this.selectedResourceTable.length == 1){
            //可以自己关联自己
            this.listModuleShowVal = new Array(2);
            this.listSelectShowVal = new Array({
                feId:getId(),
                list:[{feId:getId(),data:{}}]
            });
        }else{
            this.listModuleShowVal = new Array(this.selectedResourceTable.length);
            this.$set(this,'listSelectShowVal',[]);
            for(let i = 0 ; i< this.selectedResourceTable.length -1; i++){
                this.listSelectShowVal.push({
                    feId:getId(),
                    list:[{feId:getId(),data:{}}]
                });
            }
            // this.listSelectShowVal = new Array(this.selectedResourceTable.length -1 > 0 ? this.selectedResourceTable.length - 1 : 0);
        }
        this.checkAbleClickRelationShipBtn();
    }

    mounted(){

        
        if(this.selectedResourceTable && this.selectedResourceTable.length == 1){
            //可以自己关联自己
            this.listModuleShowVal = new Array(2);
            this.listSelectShowVal = new Array({
                feId:getId(),
                list:[{feId:getId(),data:{}}]
            });
        }else{
            this.listModuleShowVal = new Array(this.selectedResourceTable.length);
            this.$set(this,'listSelectShowVal',[]);
            for(let i = 0 ; i< this.selectedResourceTable.length -1; i++){
                this.listSelectShowVal.push({
                    feId:getId(),
                    list:[{feId:getId(),data:{}}]
                });
            }
            // this.listSelectShowVal = new Array(this.selectedResourceTable.length -1 > 0 ? this.selectedResourceTable.length - 1 : 0);
        }
        this.checkAbleClickRelationShipBtn();
    }



    moduleChange(selectModuleVal:string[],index:number){
        let [tableChineseName,tableEnglishName] = selectModuleVal;
        this.listModuleShowVal[index] = {
            tableChineseName,
            tableEnglishName
        }
        this.$set(this.listModuleShowVal,index,{
            tableChineseName,
            tableEnglishName
        });

        this.$nextTick(()=>{
            this.checkAbleClickRelationShipBtn();
        });
    }

    changeSelect({mainFeId,info,feId,fieldKey}:any){
        let index = this.listSelectShowVal.findIndex((item)=>{
            return item.feId == mainFeId
        });

        let item = this.listSelectShowVal[index];

        let itemIndex = item.list.findIndex((item)=>{
            return item.feId == feId;
        });

        item.list[itemIndex].data[fieldKey] = info;

        console.log(item);
        this.checkAbleClickRelationShipBtn();
    }

    get isShow(){
        return this.isShowDialog;
    }

    @Watch('isShowDialog')
    onIsShowDialog(newVal:boolean,oldVal:boolean){
        if(newVal){
            this.textarea =  {...this.item}[this.fieldKey];
        }
    }

    add(feId:string){
        console.log(feId);
        let index = this.listSelectShowVal.findIndex((item)=>{
            return item.feId == feId;
        });
        console.log(index);
        this.listSelectShowVal[index].list.push({
            feId:getId(),
            data:{}
        });

        this.checkAbleClickRelationShipBtn();
    }

    delItem(mainFeId:string,feId:string){
        let index = this.listSelectShowVal.findIndex((item)=>{
            return item.feId == mainFeId;
        });

        let delItemIndex = this.listSelectShowVal[index].list.findIndex((item)=>{
            return item.feId == feId;
        });

        this.listSelectShowVal[index].list.splice(delItemIndex,1);
        this.$nextTick(()=>{
            this.checkAbleClickRelationShipBtn();
        })
    }


    set isShow(val){
        this.$emit('closeDialog');
    }

    changeTemplateStr(){
        // 输出选中的字段，到textarea上。
        // console.log(this.listSelectShowVal);
        // console.log(this.listModuleShowVal);
        let result = '';
        for(let i = 0 ; i < this.listModuleShowVal.length ; i ++){
            let moduleInfo = this.listModuleShowVal[i];
            if(i == 0){
                continue;
            }
            if(i == 1){
                result += `[${this.listModuleShowVal[0].tableChineseName}][关联][${moduleInfo.tableChineseName}][基于]${this.getRelationText(this.listSelectShowVal[i-1])}`;
            }else{
                result += `[关联][${moduleInfo.tableChineseName}][基于]${this.getRelationText(this.listSelectShowVal[i-1])}`;
            }
        }
        // console.log(result);
        //插入到头部
        this.insertVal({
            selectionStart:0,
            selectionEnd:0,
            txt:result
        });
    }

    getRelationText(item:any){
        let relationsTxt = '';
        for(let z = 0; z <item.list.length; z ++){
            relationsTxt += `[${item.list[z].data[1].tableInfo.tableChineseName}.${item.list[z].data[1].fieldInfo.fieldName}][等于][${item.list[z].data[2].tableInfo.tableChineseName}.${item.list[z].data[2].fieldInfo.fieldName}]`;
            if(z < item.list.length - 1){
                relationsTxt += '[并且]'
            }
        }
        return relationsTxt;
    }

    changePos(posInfo:any){
        this.textAreaPosInfo.selectionStart = posInfo.selectionStart;
        this.textAreaPosInfo.selectionEnd = posInfo.selectionEnd;
        //console.log(posInfo);
    }

    changeTextVal(val:string){
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
    //提交内容
    submitOpt(txt:string){
        this.insertVal({
            selectionStart:this.textAreaPosInfo.selectionStart,
            selectionEnd:this.textAreaPosInfo.selectionEnd,
            txt
        });
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

    confirm(){
        this.updateFieldString({
            moduleFeId:this.item.feId,
            fieldKey:this.fieldKey,
            val:this.textarea
        });
        this.isShow = false;
    }
}
</script>

<style lang="scss">

</style>