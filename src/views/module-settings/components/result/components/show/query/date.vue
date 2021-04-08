<template>
  <el-date-picker
      v-model="val"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ShowCondition from '@/model/module-result/show-condition';
@Component({

})
export default class DateField extends Vue{
    //@Prop() activeName!:string;

    @Prop() data!:ShowCondition;

    get val(){
        return this.data.value;
    }

    set val(val:string){
        this.$emit('changeVal',{
            data:this.data,
            val
        });
    }
}
</script>

<style lang="scss">

</style>