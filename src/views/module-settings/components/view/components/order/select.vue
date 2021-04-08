<template>
  <el-select v-model="value">
      <el-option :value="true" label="降序"></el-option>
      <el-option :value="false" label="升序"></el-option>
  </el-select>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class Select extends Vue{
    @Prop() selectedVal!:boolean;
    @Prop() fieldId!:string;
    get value(){
        return this.selectedVal;
    }
    set value(val:boolean){
        this.$emit(
            'selectChange',
            this.fieldId,
            val
        );
    }
}
</script>

<style lang="scss">

</style>