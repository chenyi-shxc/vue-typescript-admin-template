<template>
    <el-form-item :label="labelName">
        <el-select v-model="val">
            <el-option v-for="opt of options" :key="opt.val" :label="opt.label" :value="opt.val"></el-option>
        </el-select>
    </el-form-item>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import getId from '@/util/key';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
// 账表查询底部的目标账本小组件【目标变量】
@Component({

})
export default class SelectVar extends Vue{
    //@Prop() activeName!:string;
    @module.Getter('allVars') allVars!:any;
    @module.Mutation('updateFieldString') updateFieldString!:any;
    @Prop() module!:any;
    @Prop() fieldKey!:string;
    @Prop() labelName!:string;
    private options:{val:string,label:string}[] = [];

    @Watch('allVars')
    onAllVars(newVal:string[]){
        this.changeOptions(newVal);
    }

    changeOptions(list:string[]){
        this.options.splice(0,this.options.length);
        list.forEach((item:string) => {
            this.options.push({
                val:item,
                label:item
            });    
        });
    }

    mounted(){
        if(this.allVars && this.allVars.length){
            this.changeOptions(this.allVars);
        }
    }

    get val(){
        if(this.module && this.module[this.fieldKey] && this.module[this.fieldKey][0]){
            return this.module[this.fieldKey][0].title || '';
        }else{
            return '';
        }
    }

    set val(val:string){
        //更新选中的内容
        this.updateFieldString({
            moduleFeId:this.module.feId,
            fieldKey:this.fieldKey,
            val:[{
                id:getId(),
                title:val
            }]
        });
    }
}
</script>

<style lang="scss">

</style>