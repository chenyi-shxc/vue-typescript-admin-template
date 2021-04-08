<template>
  <el-card shadow="never" class="mb-s">
        <div slot="header" style="line-height:20px;" class="clearfix">
            <span>条件{{index + 1}}</span>
            <el-button @click="add" style="float:right;padding:0;" type="text">增加</el-button>
        </div>
        <div>
            <NoData v-if="(data.list && data.list.length == 0) || !data.list"/>
            <Select @delItem="del"  v-else v-for="(item,index) of data.list" :key="item.feId" :feId="item.feId" :index="index" :selectedResourceTable="selectedResourceTable" @changeSelect="changeSelect"/>
        </div>
    </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Select from './select.vue';
import NoData from '@/components/no-data/no-data.vue';
@Component({
    components:{
        Select,
        NoData
    }
})
export default class RelationsGroup extends Vue{
    //@Prop() activeName!:string;
    @Prop() index!:number
    @Prop() selectedResourceTable!:any;//选中的数据表
    @Prop() feId!:string
    @Prop() data!:{feId:string,list:{feId:string,data:any}[]}


    mounted(){
        console.log(this.data);
    }

    changeSelect(info:any,feId:string,fieldKey:string){
        console.log('##', arguments);
        this.$emit('changeSelectItem',{
            mainFeId:this.feId,
            info,
            feId,
            fieldKey
        })
    }

    add(){
        console.log('add.....');
        this.$emit('addItem',this.feId);
    }

    del(feId:string){
        // 数组id 数组中要删除的对象的id
        console.log(feId);
        this.$emit('delItem',this.feId,feId);
    }
}
</script>

<style lang="scss">

</style>