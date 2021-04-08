<template>
  <el-dialog title="选择模板类型" :visible.sync="isShow" width="30%">
    <el-select v-model="value" placeholder="请选择">
        <el-option 
            v-for="item in options" 
            :key="item.value"  
            :label="item.label" 
            :value="item.value">
        </el-option>
    </el-select>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
import {moduleDefine} from '@/util/const';
@Component({

})
export default class AddModuleDialog extends Vue{
    //@Prop() activeName!:string;
    @module.Getter('isShowAddModuleDialog') isShowAddModuleDialog!:boolean;
    @module.Mutation('changeIsShowAddModuleDialog') changeIsShowAddModuleDialog!:any;
    @module.Mutation('addModule') addModule!:any;
    private value:string='';
    private options:any[] = [{
        value:moduleDefine.TABLE_QUERY,
        label:'帐表查询'
    },{
        value:moduleDefine.TABLE_CREATE,
        label:'新建帐表'
    },{
        value:moduleDefine.TABLE_DROP,
        label:'删除帐表'
    },{
        value:moduleDefine.TABLE_APPEND,
        label:'帐表追加'
    },{
        value:moduleDefine.TABLE_COMPARE,
        label:'帐表比较'
    },{
        value:moduleDefine.DATA_INSERT,
        label:'数据插入'
    },{
        value:moduleDefine.DATA_UPDATE,
        label:'数据修改'
    },{
        value:moduleDefine.DATA_DELETE,
        label:'数据删除'
    },{
        value:moduleDefine.VARIABLE_DEFINE,
        label:'变量定义'
    },{
        value:moduleDefine.VARIABLE_ASSIGNMENT,
        label:'变量赋值'
    },{
        value:moduleDefine.CONDITION_JUDGE,
        label:'条件判断'
    },{
        value:moduleDefine.CYCLE_RUN,
        label:'循环运行'
    },{
        value:moduleDefine.CYCLE_BREAK,
        label:'循环中断'
    },{
        value:moduleDefine.MODULE_CALL,
        label:'模块调用'
    }]; 

    get isShow(){
        return this.isShowAddModuleDialog;
    }

    set isShow(val:boolean){
        this.changeIsShowAddModuleDialog({
            value:false
        });
    }

    cancle(){
        this.changeIsShowAddModuleDialog({
            value:false
        });
    }

    commit(){
        // console.log(this.value);
        this.changeIsShowAddModuleDialog({
            value:false
        });
        this.addModule({
            type:this.value
        });
    }
}
</script>

<style lang="scss">

</style>