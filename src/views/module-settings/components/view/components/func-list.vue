<template>
  <el-card shadow="never">
        <div slot="header" class="clearfix">
            <span>函数资源</span>
        </div>  
        <div class="funMax">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item :key="item.label" v-for="(item,index) of funcData" :title="item.label" :name="index+1">
                    <el-button :key="func.feId" v-for="func of item.list" @click="funcClick(func)" type="text">{{func.name}}</el-button>
                </el-collapse-item>
            </el-collapse>
        </div>
        
    </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const func = namespace('func');
@Component({

})
export default class FuncListView extends Vue{
    //@Prop() activeName!:string;
    @func.Getter('func') funcData!:any;
    @func.Action('init') init!:any;
    private activeName = 1;

    funcClick(data:any){
        this.$emit('funClick',data);
    }
}
</script>

<style lang="scss">
.funMax{
    max-height: 222px;
}

</style>