<template>
  <el-input type="textarea" autosize v-model="value"></el-input>
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
const tableResult = namespace('tableResult');
@Component({

})
export default class DescInput extends Vue{
    //@Prop() activeName!:string;
    @Prop() data!:any;
    @tableResult.Mutation('updateTableField') updateTableField!:any;

    get value(){
      if(this.data && this.data.row){
        return this.data.row.showName;
      }else{
        return '';
      }
    }
    set value(val:string){  
      this.updateTableField({
        fieldId:this.data.row.fieldId,
        attr:'showName',
        value:val
      });
    }
}
</script>

<style lang="scss">

</style>