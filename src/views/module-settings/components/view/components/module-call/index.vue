<template>
    <div>
        <!-- <TextArea :labelName="labelName" :val="val" @openEditor="openEditor" ></TextArea> -->
        <el-form-item :label="labelName">
            <el-tag
                style="margin-right:20px;"
                v-for="tag in val"
                :key="tag.feId"
                closable
                @close="handleClose(tag)"
                :type="tag.type">
                {{tag.val}}
            </el-tag>
            <el-button class="button-new-tag" size="small" @click="openEditor">选择调用模型</el-button>
        </el-form-item>
        <Dialog :selected="selected" :dialogFormVisible="isOpen" @changeDialogVisable="changeDialogVisable" @submit="submit"></Dialog>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TextArea from '../text-area.vue';
import Dialog from './dialog.vue';
import {ModuleCall as TypeModuleCall,ModuleCallItem} from '@/model/module/module';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');

@Component({
    components:{
        TextArea,
        Dialog,
    }
})
export default class ModuleCall extends Vue{
    @Prop() item!:any;
    @Prop() fieldKey!:string;
    @Prop() labelName!:string;
    @Prop() isDisabled!:boolean;
    @module.Mutation('updateCallModuleListFieldFull') updateCallModuleListFieldFull!: any;
    @module.Mutation('delCallModuleItem') delCallModuleItem!:any;
    private isOpen:boolean = false;
    get val(){
        return this.item[this.fieldKey];
    }

    callModuleSelectDialog(){
        this.openEditor();
    }

    get selected(){
        let reuslt:string[] = [];
        this.item[this.fieldKey].forEach((item:TypeModuleCall)=>{
            reuslt.push(item.list[0].modelId);
        });
        return reuslt;
    }

    handleClose(item:TypeModuleCall){
        // console.log(item);
        this.delCallModuleItem({
            moduleFeId : this.item.feId, 
            delItemFeId: item.feId
        })
    }

    openEditor(){
        // console.log(this.isDisabled);
        // 可以编辑状态 打开 dialog弹窗
        if(!this.isDisabled){
            this.isOpen = true;
        }
    }
    changeDialogVisable(val:boolean){
        this.isOpen = val;
    }
    //最终的数据提交
    submit(listAll:ModuleCallItem[][]){
        //全量更新
        this.updateCallModuleListFieldFull({
            moduleFeId:this.item.feId,
            val:listAll
        });
    }
}
</script>

<style lang="scss">

</style>