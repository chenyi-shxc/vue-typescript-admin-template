<template>
  <el-dialog width="70%" title="排序字段选择" :visible.sync="isShow">
      <el-row :gutter="20">
        <el-col :span="12">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>字段资源</span>
                    <!-- <el-button @click="submitFields" style="float: right; padding: 3px 0" type="text">输出选中字段</el-button> -->
                </div>
                <div class="order-pop-container">
                    <TableFieldTree 
                    :isShow="isShow"
                    :key="item.tableEnglishName" 
                    :selectedKeys="selectedKeys"
                    v-for="item in selectedTabels" 
                    @check="check"
                    :tableChineseName="item.tableChineseName"
                    :tableEnglishName="item.tableEnglishName"></TableFieldTree>
                </div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card shadow="never">
                <div slot="header" class="clearfix">
                    <span>排序字段</span>
                </div>
                <div class="order-pop-container">
                    <!-- <div v-if="!data || data.length === 0" class="empty-msg">
                        <span class="">请选择排序字段</span>
                    </div> -->
                    <NoData v-if="!data || data.length === 0" label="请选择排序字段"/>
                    <el-form v-if="data.length > 0" label-position="top" label-width="80px" @submit.native.prevent>
                        <el-form-item :key="index" v-for="(item,index) in this.data" :label="`[${item.tableChineseName}.${item.fieldChineseName}]`">
                            <Select :selectedVal="item.isDesc" :fieldId="item.fieldId" @selectChange="selectChange"></Select>
                        </el-form-item>
                    </el-form>
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
type tableInfo = {
    tableChineseName:string,
    tableEnglishName:string
}
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {find,findIndex, filter} from 'lodash';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';

const module = namespace('module');
import Select from './select.vue';
import {OrderField,OrderFieldItem} from '@/model/module/module';
import TableFieldTree from "../common/table-field-tree.vue";
import NoData from '@/components/no-data/no-data.vue';
@Component({
    components:{
        TableFieldTree,
        Select,
        NoData
    }
})
export default class Dialog extends Vue{
    @Prop() isVisible?:boolean;// 展示与否开关
    @Prop() item!:any;// 当前更改的module对象
    @Prop() orderInfo!:OrderField;// orderField字段对应的值
    @Prop() selectedTabels!:tableInfo[];//选中的table数据 主要是 英文表名与中文表名
    //TODO: 将tableChineseName tableEnglishName 以及 table的field字段都存储 下来，方便进行 后续操作
    // 数据暂存 选项内容。
    private data:OrderFieldItem[] = [];
    private selectedKeys:string[]=[];//选中的选项
    @module.Mutation('updateOrderField') updateOrderField!:any;
    @Watch('orderInfo') 
    onOrderInfo(newVal:any,oldVal:any){
        // order field字段发生改变了，需要进行重新 修改data 对象
        this.initData();
    }
    initData(){
        let result : OrderFieldItem[] = [];
        let _selectedKeys:string[] = [];
        // 将 item 中的数据 塞进去
        //console.log(this.orderInfo);
        this.orderInfo.list.forEach((item)=>{
            result.push({
                ...item
            });
            _selectedKeys.push(item.fieldId);
        });
        this.selectedKeys = _selectedKeys;
        this.data = result;
    }

    mounted(){
        this.initData();
    }


    get isShow(){
        return this.isVisible;
    }

    

    set isShow(val){
        this.$emit('close');
    }


    check(tableEnglishName:string,tableChineseName:string,checkedNodes:any){

        //TOOD: 确定是增加还是删除

        // let toAppendList:OrderFieldItem[] = [];
        let toDelList:string[] = [];
        // 根据tableEnglishName来找

        // 查找到 当前表名下的字段集合
        // console.log(tableEnglishName);
        // console.log(this.data);
        let findResult = filter(this.data,{tableEnglishName:tableEnglishName});
        // 删除Mark
        let isDel = findResult.length > checkedNodes.length;
        // console.log(findResult);
        // 循环
        // for(let i = 0; i<checkedNodes.length; i++){
        //     let item = checkedNodes[i];       
        //     if(!item.isLeaf){
        //         continue;
        //     }
        //     if(findResult.length == 0){
        //         this.data.push({
        //             fieldId:item.id,
        //             tableEnglishName,
        //             tableChineseName,
        //             isDesc:false,
        //             fieldChineseName:item.label,
        //             fieldEnglishName:item.fieldEnglishName
        //         });
        //     }
        // }

        if(isDel){
            //删除操作
            for(let i = 0; i<findResult.length; i ++){
                //找到 fieldId， 之后删除
                let item = find(checkedNodes,{id:findResult[i].fieldId});
                if(!item){
                    //需要进行删除操作
                    toDelList.push(findResult[i].fieldId);
                }
            }
            for(let i = 0; i<toDelList.length; i ++){
                let index = findIndex(this.data,{fieldId:toDelList[i]});
                this.data.splice(index,1);
            }
        }else{
            //新增操作， 找到要进行新增的元素 然后追加到尾部就完事了
            for(let i = 0; i < checkedNodes.length; i++){
                let item = checkedNodes[i];
                if(findIndex(this.data,{fieldId:item.id}) == -1){
                    // 没找到，自然是新增的
                    this.data.push({
                        fieldId:item.id,
                        tableEnglishName,
                        tableChineseName,
                        isDesc:false,
                        fieldChineseName:item.label,
                        fieldEnglishName:item.fieldEnglishName
                    });
                }
            }
        }
    }

    selectChange(fieldId:string,val:boolean){
        find(this.data,{fieldId:fieldId})!.isDesc = val;
    }

    confirm(){
        // 提交内容 更改orderField字段内容
        this.updateOrderField({
            moduleFeId:this.item.feId,
            fieldKey: 'orderField',
            val:[...this.data]
        });
        this.isShow = false;
    }
}
</script>

<style lang="scss">
.order-pop-container{
    height: 360px;
    overflow: auto;
}
</style>