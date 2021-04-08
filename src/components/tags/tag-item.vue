<template>
  <div class="common-tags">
      <el-tag v-if="!_isEditor">{{_title}}</el-tag>
      <!-- <el-tag :disable-transitions="true" @close="closeTag" @click="changeInputVisible" v-if="_isEditor && !inputVisible"  closable>{{title}}</el-tag> -->
      <el-tag :disable-transitions="true" @close="closeTag" v-if="_isEditor && !inputVisible"  closable>{{title}}</el-tag>
      <el-input ref="input" size="small" class="input" v-if="_isEditor && inputVisible" v-model="_title" @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"></el-input>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
@Component({

})
export default class CommonEditTag extends Vue{
    @Prop({}) isEditor!:boolean; // 是否可编辑
    @Prop({required:true}) title!:string; // title标签
    @Prop({required:true}) id!:string;// 该东西的 id
    
    
    private inputVisible:boolean = false; // 编辑是否可见
    private inputValue:string = '';

    //通过计算属性 将 外来的值传递给 内部的值
    get _isEditor(){
        let result = !!this.isEditor
        return result;
    }

    changeInputVisible(){
        this.inputVisible = true;
        this.$nextTick(()=>{
            (this.$refs.input as any)!.$refs.input.focus()
        });
    }
    mounted(){
        if(this.title == ''){
            this.changeInputVisible();
        }
    }
    get _title(){
        return this.title;
    }

    set _title(val:string){
        this.$emit('titleChange',val,this.id);
    }


    closeTag(){
        this.$emit('closeTag',this.id);
    }

    handleInputConfirm(){
        this.inputVisible = false;
        this.$emit('tagConfirm');
    }
}
</script>

<style lang="scss">
.common-tags{
    display: inline-block;
    .input {
        width: 120px;
    }
    margin-right: 20px;
}
</style>