<template>
<div class="relationship-item">
    <el-cascader style="width:380px;" v-model="value1" :options="options" separator="." class="relationship-select-item">

    </el-cascader>
    <el-cascader style="width:380px;" v-model="value2" :options="options" separator="." class="relationship-select-item">

    </el-cascader>
    <el-button @click="del" type="text">删除</el-button>
</div>
  
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import getUrl from '@/util/url';
@Component({

})
export default class Select extends Vue{
    //@Prop() activeName!:string;
    @Prop() selectedResourceTable!:any;//选中的数据表
    @Prop() index!:number//当前select的标号
    @Prop() feId!:string;
    private val1 = [];
    private options:any=[];

    private val2 = [];

    get value2(){
        return this.val2;
    }

    set value2(val){
        this.val2 = val;
        let params:any = {
            tableInfo:null,
            fieldInfo:null
        };
        for(let i = 0; i<this.options.length;i++){
            if(this.options[i].value === val[0]){
                params.tableInfo = {
                    tableEnglishName:this.options[i].value,
                    tableChineseName:this.options[i].label
                };
                this.options[i].children.forEach((item:any)=>{
                    if(item.value === val[1]){
                        params.fieldInfo = {
                            fieldId:item.value,
                            fieldName:item.label
                        };
                    }
                });
                break;
            }
        }

        this.$emit('changeSelect',params,this.feId,2);
    }

    get value1(){
        return this.val1;
    }
    set value1(val){
        this.val1 = val; 
        //TODO: 获取完整的数据
        // console.log(this.selectedResourceTable);
        let params:any = {
            tableInfo:null,
            fieldInfo:null
        };
        for(let i = 0; i<this.options.length;i++){
            if(this.options[i].value === val[0]){
                params.tableInfo = {
                    tableEnglishName:this.options[i].value,
                    tableChineseName:this.options[i].label
                };
                this.options[i].children.forEach((item:any)=>{
                    if(item.value === val[1]){
                        params.fieldInfo = {
                            fieldId:item.value,
                            fieldName:item.label
                        };
                    }
                });
                break;
            }
        }

        this.$emit('changeSelect',params,this.feId,1);
    }
    @Watch('selectedResourceTable')
    onSelectedResourceTable(newVal:any){
        this.initOptions(newVal);
    }

    initOptions(list:any){
        let result = [];
        for(let i = 0; i<list.length; i++){
            // console.log(list);
            let _item = {
                value:list[i].tableEnglishName,
                label:list[i].tableChineseName,
                children:[]
            }
            result.push(_item);
            this.getData(list[i].tableEnglishName,_item);
        }
        this.options = result;
    }

    mounted(){
        console.log(this.selectedResourceTable);
        this.initOptions(this.selectedResourceTable);
    }

    getData(tableEnglishName:string,item:any){
        //console.log(tableEnglishName);
        (this as any).axios.get(getUrl('table-fields'),{
            params:{
                tableEnglishName
            }
        }).then(({data}:any)=>{
            let {accountField} = data.data;
            accountField.forEach((element:any) => {
                item.children.push({
                    value:element.fieldId,
                    label:element.fieldChineseName
                });
            });
        });
    }


    del(){
        this.$emit('delItem',this.feId);
    }

}
</script>

<style lang="scss">
.relationship-select-item{
    margin-right: 20px;
    margin-bottom: 10px;
}
.relationship-item{
    // float: left;
    margin-bottom: 10px;
}
</style>