<template>
  <el-form-item :label="labelName">
    <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 20}"
        placeholder="请输入内容"
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
export default class EditorTextArea extends Vue{
    @Prop() labelName!:string;//label的名字
    @Prop() item!:any;
    @Prop() fieldKey!:string;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean; 
    @module.Mutation('updateFieldString') updateFieldString!:any;
    get textAreaVal(){
        return this.item[this.fieldKey];
    }

    get isDisabled(){
        return !this.isAbleEdit;
    }

    set textAreaVal(val:string){
        this.updateFieldString({
            moduleFeId:this.item.feId,
            fieldKey:this.fieldKey,
            val
        });
    }
}
</script>

<style lang="scss">

</style>