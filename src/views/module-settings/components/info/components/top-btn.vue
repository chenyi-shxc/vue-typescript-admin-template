<template>
  <div style="float:right;" v-if="isEdtor">
      <el-button @click="save" style="float: right; padding: 3px 0" type="text">保存</el-button>
      <el-button @click="reset" style="float: right; padding: 3px 0" type="text">还原</el-button>
  </div>
  <div style="float:right;" v-else>
      <el-button @click="edit" style="float: right; padding: 3px 0" type="text">编辑</el-button>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class TopBtn extends Vue{
    @Prop() isEdtor:boolean = false;
    
    save(){
        this.$emit('save')
    }
    reset(){
        this.$emit('reset')
    }
    edit(){
        this.$emit('edit')
    }

}
</script>

<style lang="scss">

</style>