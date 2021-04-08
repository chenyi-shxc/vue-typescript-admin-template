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
      
      <el-switch
        style="margin-left:20px;"
        v-if="isShowField"
        v-model="isShowTimeInput"
        active-text="正则"
        inactive-text="日期"
      ></el-switch>
      <el-input v-if="isShowField && isShowTimeInput" placeholder="请输入正则表达式" v-model="time" style="margin-left:20px;width:200px"></el-input>
      <el-date-picker value-format="yyyy-MM-dd HH:hh:mm" v-if="isShowField && !isShowTimeInput" style="margin-left:20px;" v-model="time" type="datetime" placeholder="选择日期时间"></el-date-picker>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
@Component({

})
export default class Time extends Vue{
    @Prop() data!:any;

    private isShowTimeInput = false;

    private options :{value:string,label:string}[] = [{
        value:'立即开始',
        label:'立即开始'
    },{
        value:'预定时间',
        label:'预定时间'
    }];

    @Watch('isShowTimeInput')
    onIsShowTimeInput(){
        this.$emit('updateRunData','runRegx','');
    }

    get value(){
        return this.data.runType;
    }

    set value(val:string){
        this.$emit('updateRunData','runType',val);
    }

    get time(){
        return this.data.runRegx;
    }

    set time(val:any){
        this.$emit('updateRunData','runRegx',val);
    }

    get isShowField(){
        return this.value === '预定时间';
    }
}
</script>

<style lang="scss">

</style>