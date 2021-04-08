<template>
  <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="textarea"
        @blur="textareaBlur"
    >
    </el-input>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class TextArea extends Vue{
    @Prop() textAreaVal!:string;

    get textarea(){
        return this.textAreaVal;
    }

    set textarea(val:string){
        this.$emit('changeVal',val);
    }

    textareaBlur(e:any){
        let textarea = e.srcElement;
        this.$emit('pos',{
            selectionStart:textarea.selectionStart,
            selectionEnd:textarea.selectionEnd
        })
    }
}
</script>

<style lang="scss">

</style>