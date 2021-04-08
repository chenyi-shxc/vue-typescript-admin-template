<template>
  <el-form-item label="操作选项：">
    
    <el-select v-model="actionType" placeholder="请选择">
        <el-option 
            v-for="item in options[type]"
            :key="item.key"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import getKey from '@/util/key';
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
export default class ActionType extends Vue{
    //@Prop() activeName!:string;

    //@module.Getter('actionType') _actionType!:any;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean; 
    @module.Mutation('setActionType') _setActionType!:any;
    @module.Mutation('updateFieldString') updateFieldString!:any;
    // TOOD: 如果要是根据不同的模板来显示不同的options的话，可以采用字典套用数组的组合方式来稿。
    @Prop() type !:string;//根据类型 来展示options内容
    @Prop() module !:any;
    private options = {
        'dataInsert':[
            {
                label:'[手工输入]',
                value:'HANDENTER',
                key:getKey()
            },{
                label:'[复制数据]',
                value:'COPYDATA',
                key:getKey()
            }
        ],
        'tableCreate':[
            {
                label:'[复制格式]',
                value:'COPYFORMAT',
                key:getKey()
            },{
                label:'[手工建表]',
                value:'CUSTOMTABLE',
                key:getKey()
            }
        ],
        'tableQuery':[
            {
                label:'[存为结果表]',
                value:'RESULTTABLE',
                key:getKey()
            },
            {
                label:'[存为中间表]',
                value:'MIDDLETABLE',
                key:getKey()
            },
            {
                label:'[存为展示表]',
                value:'SHOWTABLE',
                key:getKey()
            },
            {
                label:'[存为单值变量]',
                value:'SAVEARRAY',//表格查询操作选项-存为数组
                key:getKey()
            },
            {
                label:'[存为集合]',
                value:'SAVECOLLECTION',
                key:getKey()
            }
        ],
        'tableDrop':[
            {
                label:'[帐表不存在时报错]',
                value:'EXISTS',
                key:getKey()
            },
            {
                label:'[帐表不存在时不报错]',
                value:'NOT_EXISTS',
                key:getKey()
            }
        ],
        'cycleBreak':[
            {
                label:'[跳出循环]',
                value:'BREAK',
                key:getKey()
            },
            {
                label:'[跳出本次循环]',
                value:'CONTINUE',
                key:getKey()
            },
            {
                label:'[退出模块]',
                value:'GOTO',
                key:getKey()
            }
        ]
    };

    mounted(){
        console.log('选项。。。。。。。。');
        console.log(this.options);
    }
    get actionType(){
        console.log(this.module);
        return this.module.actionType;
    }

    set actionType(val){

        if(this.type == 'tableQuery'){
            this.updateFieldString({
                moduleFeId:this.module.feId,
                fieldKey:'targetTable',
                val:[]
            });
        }        
        this._setActionType({
            moduleFeId:this.module.feId,
            val
        })
    }
    
}
</script>

<style lang="scss">

</style>
