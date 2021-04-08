<template>
  <el-form-item label="限制记录数">
      <el-input v-model="inputVal" placeholder="请输入数字内容" :disabled="!isAbleEdit"></el-input>
  </el-form-item>
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

@Component({

})
export default class LimitRecode extends Vue{
    @Prop() module!:any;
    @Prop() fieldKey!:string;//字段名字
    @module.Mutation('updateDataSize') updateDataSize:any;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean;
    get inputVal(){
      return this.module[this.fieldKey];
    }
    set inputVal(val:string){
      //仅仅数字能够写入成功
      if(/^\d+$/.test(val) || val === ''){
        this.updateDataSize({
            moduleFeId:this.module.feId,
            fieldKey:this.fieldKey,
            val
        });
      }
    }
}
</script>

<style lang="scss">

</style>
