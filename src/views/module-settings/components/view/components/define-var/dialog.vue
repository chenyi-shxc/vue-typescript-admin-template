<template>
  <el-dialog title="定义变量" :visible.sync="isShow">
    <Item 
        :key="item.id" 
        :item="item"
        @changeName="changeName"
        @changeVal="changeVal"
        @changeType="changeType"
        @del="del"
        v-for="item in list">
    </Item>
    <el-row :gutter="20">
        <el-col :offset="20" :span="4">
            <el-button @click="add" type="text">增加</el-button>
        </el-col>
    </el-row>
        
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import Item,{VarItem} from './item.vue';
import {findIndex} from 'lodash';
import getKey from '@/util/key';
@Component({
    components:{
        Item
    }
})
export default class Dialog extends Vue{
    @Prop() isVisable!:boolean;
    @Prop() data!:any;//外部数据
    private list:VarItem[]=[];//内部 copy的外部数据
    @Watch('data')
    onData(newVal:any){
        this.list = [...newVal];
    }

    mounted(){
        this.list = [...this.data];
    }

    get isShow(){
        return this.isVisable;
    }
    set isShow(val:boolean){
        this.$emit('changeDialogVisable',val);
    }

    del(item:VarItem){
        let index = findIndex(this.list,(i)=>{
            return i.id == item.id;
        });
        if(index != -1){
            this.list.splice(index,1);
        }
    }

    add(){
        this.list.push({
            id:getKey(),
            name:'『』',
            type:'',
            val:''
        });
    }

    changeName(item:VarItem,val:string){
        item.name = val;
    }
    changeVal(item:VarItem,val:string){
        item.val = val;
    }
    changeType(item:VarItem,val:string){
        item.type = val;
    }

    cancle(){
        this.isShow = false;
        this.list = [...this.data];
    }

    commit(){
        this.$emit('submit',this.list);
        this.isShow = false;
    }
};

</script>

<style lang="scss">

</style>