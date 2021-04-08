<template>
  <el-tree 
    :data="data" 
    show-checkbox 
    node-key="id"
    ref="tree"
    @check="check"
    :default-checked-keys="defaultCheckedKeys"
    :default-expand-all="true"
    :props="defaultProps">
  </el-tree>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import getUrl from "@/util/url";
@Component({

})
export default class TableFieldTree extends Vue{
    //@Prop() activeName!:string;
    private data = [];

    private defaultProps = {
        isLeaf:'isLeaf',
        label:'label',
        children:'children'
    };
    //账表的英文名字
    @Prop() tableEnglishName!:string;
    //账表的中文名字
    @Prop() tableChineseName!:string;
    // 根据该字段来判断当前的弹窗是否是显示中
    @Prop() isShow!:boolean;

    @Prop() selectedKeys!:any;

    get defaultCheckedKeys(){
        if(!this.selectedKeys){
            return [];
        }else{
            return [...this.selectedKeys];
        }
    }

    @Watch('isShow')
    onIsShow(newVal:boolean){
        if(!newVal){
            //清理选中
            if(this.$refs.tree){
                (this as any).$refs.tree.setCheckedKeys([]);
            }
        }
    }

    @Watch('tableEnglishName')
    onTableEnglishName(newVal:any,oldVal:any){
        this.getMenuData();
    }

    mounted(){
        // get table field
        if(!this.tableEnglishName){
            return ;
        }
        this.getMenuData();
    }

    getMenuData(){
        let result:any = [{
            label:this.tableChineseName,
            children:[],
            id:this.tableChineseName,
            isLeaf:false
        }];
        (this as any).axios.get(getUrl('table-fields'),{
            params:{
                tableEnglishName:this.tableEnglishName
            }
        }).then(({data}:any)=>{
            this.data = [];
            let {accountField} = data.data;
            accountField.forEach((element:any) => {
                result[0].children.push({
                    label:element.fieldChineseName,
                    fieldEnglishName:element.fieldEnglishName,
                    isLeaf:true,
                    id:element.fieldId
                });
            });
            this.data = result;
        });
    }

    check(){
        this.$emit('check',this.tableEnglishName,this.tableChineseName,(this as any).$refs.tree.getCheckedNodes())
    }
}
</script>

<style lang="scss">

</style>