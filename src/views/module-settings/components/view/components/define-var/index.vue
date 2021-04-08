<template>
  <div>
    <TextArea :val="val" labelName="定义内容：" @openEditor="openEditor"></TextArea>
    <Dialog :data="dialogVal" @changeDialogVisable="changeDialogVisable" :isVisable="isOpen" :val="dialogVal" @submit="submit"></Dialog>
  </div>
</template>

<script lang="ts">
import {VarItem} from './item.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
import {Vue, Component, Prop} from 'vue-property-decorator';
import TextArea from '../text-area.vue';
import Dialog from './dialog.vue';
import getKey from '@/util/key';
@Component({
    components:{
        TextArea,
        Dialog
    }
})
export default class DefineVar extends Vue{
    @Prop() item!:any;
    @Prop() fieldKey!:string;
    @module.Mutation('updateFieldString') updateFieldString !:any;

    private isOpen:boolean=false;//是否打开dialog

    get val(){
        return this.item[this.fieldKey];
    }

    get dialogVal(){
        let resultItemList = this.item[this.fieldKey].split(';\n');
        let result:VarItem[] = [];
        resultItemList.forEach((element:any) => {
            let itemInfo = element.split('/');
            if(itemInfo && itemInfo.length > 1){
                result.push({
                    id:getKey(),
                    name:itemInfo[0],
                    type:itemInfo[1],
                    val:itemInfo[2]
                });
            }
            
        });

        return result;
    }

    changeDialogVisable(val:boolean){
        this.isOpen = val;
    }
    
    openEditor(){
        this.isOpen = true;
    }

    submit(data:VarItem[]){
        //TODO: 更改后端数据
        console.log(data);
        let result = '';
        for(let i = 0 ; i<data.length; i ++){
            let item = data[i];
            result += `${item.name}/${item.type}/${item.val};\n`;
        }
        this.updateFieldString({
            moduleFeId:this.item.feId,
            fieldKey:this.fieldKey,
            val:result
        })
    }
}
</script>

<style lang="scss">

</style>