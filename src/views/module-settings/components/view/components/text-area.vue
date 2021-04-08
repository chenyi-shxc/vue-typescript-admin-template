<template>
  <el-form-item :label="labelName">
    <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 20}"
        placeholder="请输入内容"
        @focus="onFocus"
        :disabled="isDisabled"
        v-model="textAreaVal">
    </el-input>
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
} from 'vuex-class';
const module = namespace('module');
@Component({

})
export default class TextArea extends Vue{
    @Prop() labelName!:string;//label的名字
    @Prop() val!:string;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean; 
    get isDisabled(){
      return !this.isAbleEdit;
    }
    
    get textAreaVal(){
        return this.val;
    }

    set textAreaVal(val:string){}


    onFocus(){
        if(this.isAbleEdit == true){
            //TODO: 调用弹窗进行编辑
            // console.log('open dialog');
            this.$emit('openEditor')
        }
    }
}
</script>

<style lang="scss">

</style>