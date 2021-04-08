<template>
  <div>
      <el-select v-model="value" placeholder="请选择">
           <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
      </el-select>
      <el-input v-show="isShowField" type="text" style="width:70px;margin-left:20px;" v-model="from"></el-input>
      <span v-show="isShowField" style="display:inline-block;margin-left:20px;">至</span>
      <el-input v-show="isShowField" type="text" style="width:70px;margin-left:20px;"  v-model="to"></el-input>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
@Component({

})
export default class Scope extends Vue{
    @Prop() data!:string;
    private options :{value:string,label:string}[] = [{
        value:'范围运行',
        label:'范围运行'
    },{
        value:'完整运行',
        label:'完整运行'
    }];

    // private isShowField :boolean = false;

    // private value : string = '完整运行';

    get value(){
        return this.data === '' ? '完整运行':'范围运行';
    }

    set value(val:string){
        if(val === '完整运行'){
            this.$emit('updateRunData','runRange','');
        }else{
            this.$emit('updateRunData','runRange','0,0');
        }
    }

    get from(){
        return this.data.split(',')[0];
    }

    set from(val:string){
        if(/^\d+$/.test(val)|| val === ''){
            this.$emit('updateRunData','runRange',`${val},${this.data.split(',')[1]}`);
        }else{
            (this as any).$message({
                message: '范围类型只能输入数字！',
                type: 'error'
            });
        }
    }


    get to(){
        return this.data.split(',')[1];
    }

    set to(val:string){
        if(/^\d+$/.test(val) || val === ''){
            this.$emit('updateRunData','runRange',`${this.data.split(',')[0]},${val}`);
        }else{
            (this as any).$message({
                message: '范围类型只能输入数字！',
                type: 'error'
            });
        }
    }


    // private from:number=0;

    // private to:number=0;

    get isShowField(){
        return this.value !== '完整运行';
    }

    mounted(){
        
    }

}   
</script>

<style lang="scss">

</style>