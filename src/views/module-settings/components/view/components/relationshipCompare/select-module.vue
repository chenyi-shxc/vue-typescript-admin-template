<template>
<div style="margin:10px 0;display:inline-block;">
    <el-select v-model="value">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span style="margin:0 10px;" v-if="index == 0">比较</span>
</div>
  
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
@Component({

})
export default class SelectModule extends Vue{
    @Prop() selectedResourceTable!:any;
    @Prop() index!:number;
    // @Prop() showTxt!:boolean;
    private val:string='';
    get value(){
        return this.val;
    }
    set value(val:any){
        this.val = val;
        //console.log(val);
        if(this.val){
            this.$emit('moduleChange',val.split('#-#-#'),this.index);
        }
    }
    private options:any = [];

    @Watch('selectedResourceTable')
    onSelectedResourceTable(newVal:any){
        this.initOptions(newVal);
        this.value = '';
    }

    initOptions(list:any){
        let result: any[] = [];
        list.forEach((item:any) => {
            result.push({
                value:`${item.tableChineseName}#-#-#${item.tableEnglishName}`,
                label:item.tableChineseName
            });
        });
        this.options = result;
    }
    mounted(){
        this.initOptions(this.selectedResourceTable);
    }
}
</script>

<style lang="scss">

</style>