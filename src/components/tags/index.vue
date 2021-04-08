<template>
  <div class="tags-container">
      <draggable v-model="_list" :sort="isSortable">
          <CommonEditTag 
            :isEditor="_isAbleEdit" 
            :title="item.title" 
            :id="item.id" 
            v-for="item in _list" 
            @titleChange="titleChange"
            @closeTag="closeTag"
            @tagConfirm="tagConfirm"
            :key="item.id"></CommonEditTag>
            <!-- <div slot="footer" v-if="isAdbleEdit && btnType == 'module-select'" class="common-tags">
                <el-button size="small"  @click="callModuleSelectDialog">选择账本</el-button>
            </div> -->
            <div slot="footer" v-if="isAbleEdit" class="common-tags">
                <el-button v-if="btnType == 'module-select'" size="small"  @click="callModuleSelectDialog">选择账本</el-button>
                <el-button v-else-if="btnType == 'modelCall-select'" size="small"  @click="callModuleSelectDialog">选择模型</el-button>
                <el-button v-else-if="!isAppendTag && _maxLen>_list.length" size="small"  @click="addTag">Add</el-button>
            </div>
      </draggable>
      
  </div>
</template>

<script lang="ts">
type Item = {
    id:string
    title:string
};
import {Vue, Component, Prop} from 'vue-property-decorator';
import CommonEditTag from "./tag-item.vue";
import getId from '@/util/key';
import draggable from 'vuedraggable';
@Component({
    components:{
        CommonEditTag,
        draggable
    }
})
export default class TagList extends Vue{
    @Prop({}) list!:Item[];
    @Prop({}) isAbleEdit!:boolean;
    @Prop({}) isSortable!:boolean;
    @Prop({}) maxLen!:number;
    @Prop({}) btnType!:string; // button的类型，module-select 账表选择， 
    private isAppendTag:boolean=false;
    titleChange(){
        this.$emit.apply(this,['titleChange',...arguments]);
    }
    closeTag(){
        this.$emit.apply(this,['closeTag',...arguments]);
    }

    get _maxLen(){
        if(this.maxLen){
            return this.maxLen;
        }else{
            return Infinity;
        }
    }

    mounted(){
        //console.log(this.list.length);
    }
    get _list(){
        return this.list;
    }

    set _list(val){
        this.$emit('changeList',val);
    }

    get _isSortable(){
        return !!this.isSortable;
    }

    get _isAbleEdit(){
        return !!this.isAbleEdit;
    }

    tagConfirm(){
        this.$emit('tagConfirm');
        this.$nextTick(()=>{
            this.isAppendTag = false;
        });
    }

    addTag(){
        this.isAppendTag = true;
        this.$emit('addTag');
    }

    callModuleSelectDialog(){
        this.$emit('callModuleSelectDialog');
    }
}
</script>

<style lang="scss">
.tags-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    line-height: 40px;
}
</style>