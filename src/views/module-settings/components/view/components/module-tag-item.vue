<template>
    <el-form-item :label="labelName">
        <!-- tags操作区域 -->
        <TagList v-model="fieldList" 
            :list="fieldList" 
            :isAbleEdit="isAbleEdit"
            :isSortable="isSortable"
            :maxLen="maxLen"
            :btnType="btnType"
            @callModuleSelectDialog="callModuleSelectDialog"
            @changeList="changeList"
            @titleChange="titleChange" 
            @tagConfirm="tagConfirm"
            @addTag="addTag"
            @closeTag="closeTag"></TagList>
    </el-form-item>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TagList from '@/components/tags/index.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
//模型类 的form条理
@Component({
    components:{
        TagList
    }
})
export default class ModuleTagItem extends Vue{
    @Prop() labelName!:string;//label的名字
    @Prop() fieldKey!:string;//字段名字
    @Prop() feId!:string;//模块的id 的根据模块的id与模块filed字段名字进行更改数据
    @Prop() module!:any;
    @Prop() maxLen!:number;
    @Prop() btnType!:string;
    get fieldList(){
        console.log(this.module[this.fieldKey]);
        return this.module[this.fieldKey];
    }

    @module.Getter('isAbleEdit') isAbleEdit!:boolean;
    
    @module.Getter('isSortable') isSortable!:boolean;

    @module.Mutation('titleChange') _titleChange:any;

    @module.Mutation('delTag') _delTag:any;

    @module.Mutation('tagConfirm') _tagConfirm:any;

    @module.Mutation('changeList') _changeList:any;

    @module.Mutation('addTag') _addTag:any;

    titleChange(val:string,id:string){
        this._titleChange({
            moduleFeId:this.feId,
            tagId:id,
            title:val,
            fieldKey:this.fieldKey
        });
    }
    closeTag(id:string){
        this._delTag({
            moduleFeId:this.feId,
            tagId:id,
            fieldKey:this.fieldKey
        })
    }
    changeList(list:{id:string,title:string}[]){
        this._changeList({
            moduleFeId:this.feId,
            fieldKey:this.fieldKey,
            list    
        });
    }

    tagConfirm(){
        this._tagConfirm({
            moduleFeId:this.feId,
            fieldKey:this.fieldKey,
        });
    }

    addTag(){
        this._addTag({
            moduleFeId:this.feId,
            fieldKey:this.fieldKey,
        });
    }   
    callModuleSelectDialog(){
        this.$emit('callModuleSelectDialog');
    }
}
</script>

<style lang="scss">

</style>
