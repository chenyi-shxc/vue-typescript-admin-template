<template>
  <el-card shadow="never" class="mb-b">
    <div slot="header">
        <span>设置表格</span>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%"  
        ref="settingTable" 
        @selection-change="handleSelectionChange" 
    >
        <el-table-column
            type="index"
            width="50"/>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="fieldEnglishName"
            label="英文字段名称"
        />
        <el-table-column
            prop="fieldChineseName"
            label="中文字段名称"
        />
        <el-table-column
            prop="fieldType"
            label="字段类型"
        />
        <!-- <el-table-column
            prop="fieldType"
            label="字段长度"
        /> -->
        <el-table-column
            prop="fieldPrecision"
            label="字段精度"
        />
        <el-table-column
            label="显示名称"
        >
            <template slot-scope="scope">
                <DescInput :data="scope"/>
            </template>
        </el-table-column>
        <el-table-column
            label="字段备注"
            prop="fieldDesc"
        >
            <!-- <template slot-scope="scope">
                <DescInput :data="scope"/>
            </template> -->
        </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import DescInput from './desc-input.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import { ElForm } from 'element-ui/types/form';
const tableResult = namespace('tableResult');
@Component({
    components:{
        DescInput
    }
})
export default class SetTable extends Vue{
    //@Prop() activeName!:string;
    @tableResult.Getter('currentTableFieldsList') currentTableFieldsList!:SetTableField[];
    @tableResult.Mutation('changeSelectedTableFields') changeSelectedTableFields!:any;
    @tableResult.Getter('activeResultTable') activeResultTable!:SRtable;
    @tableResult.Getter('currentSelectSetTableFields') currentSelectSetTableFields!:SetTableField[];


    @Watch('currentTableFieldsList')
    onCurrentTableFieldsList(newVal:SetTableField[]){
        if(this.$refs.settingTable && this.currentSelectSetTableFields && this.currentSelectSetTableFields.length > 0){
            this.currentSelectSetTableFields.forEach((item)=>{
                newVal.forEach((fieldInfo)=>{
                    if(fieldInfo.fieldEnglishName == item.fieldEnglishName){
                        //console.log(item.fieldEnglishName);
                        this.$nextTick(()=>{
                            (this.$refs.settingTable as any).toggleRowSelection(fieldInfo,true);
                        });
                    }
                });
            });
        }else{
            (this.$refs.settingTable as any).clearSelection();
        }
    }

    get tableData(){
        return this.currentTableFieldsList || [];
    };

    mounted(){
        // if(this.$refs.settingTable && this.currentSelectSetTableFields && this.currentSelectSetTableFields.length > 0){
        //     (this.$refs.settingTable as any).toggleRowSelection(this.currentSelectSetTableFields,true);
        // }else{
        //     (this.$refs.settingTable as any).clearSelection();
        // }
    }

    handleSelectionChange(val:any){
        // console.log(val);
        this.changeSelectedTableFields({
            value:val,
            tableEnglishName: this.activeResultTable.enName
        });
    }
}
</script>

<style lang="scss">

</style>