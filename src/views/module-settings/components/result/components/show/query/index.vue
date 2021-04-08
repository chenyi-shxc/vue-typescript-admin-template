<template>
  <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span style="line-height:32px;">查询条件</span>
        <div style="float:right;">
            <el-button size="small" @click="query">查询</el-button>
        </div>
      </div>
      <el-form label-position="top" @submit.native.prevent>
          <el-row :gutter="20" class="mb-s">
                <el-col :span="12">
                    <el-switch
                        v-model="isOr"
                        active-text="或者"
                        inactive-text="并且">
                    </el-switch>
                </el-col>
            </el-row>
            <el-row v-for="(innerList,index) of list" :key="'row-'+index" :gutter="20">
                <el-col :span="12" v-for="(item,index2) of innerList" :key="'col-'+index2">
                    <Label :data="item" :key="'label-' + index2">
                        <TextField @changeVal="changeVal" v-if="item.columnType=='text'" :data="item"></TextField>
                        <DateField @changeVal="changeVal" v-else :data="item"></DateField>
                    </Label>
                </el-col>
            </el-row>
      </el-form>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import ShowCondition from '@/model/module-result/show-condition';
const tableResult = namespace('tableResult');
import Label from './label.vue';
import DateField from './date.vue';
import TextField from './text.vue';
@Component({
    components:{
        Label,
        DateField,
        TextField
    }
})
export default class QueryForm extends Vue{
    @tableResult.Getter('currentShowCondition') currentShowCondition!:ShowCondition[];
    @tableResult.Mutation('initQueryVal') initQueryVal!:any;
    @tableResult.Getter('activeResultTable') activeResultTable!:any;
    @tableResult.Action('queryResult') queryResult!:any;
    //@Prop() activeName!:string;
    // 是否是并且
    private isOr = false;
    //做了一层隔离，防止影响store的真正数据
    private data :ShowCondition[] = [];
    get list(){
        if(!this.currentShowCondition || this.currentShowCondition.length == 0){
            return [];
        }
        //clone
        this.data = JSON.parse(JSON.stringify(this.currentShowCondition));
        let list:any = [];
        this.data.forEach((item,index)=>{
            if(index%2 == 0 ){
                list.push([]);
            }
            list[list.length-1].push(item);
        });

        return list;
    }

    changeVal(value:{data:ShowCondition,val:string}){
        this.data.forEach((item)=>{
            if(item.feId === value.data.feId){
                item.value = value.val;
            }
        });
    }

    query(){
        // 查询按钮 查询
        this.initQueryVal({
            list:this.data,
            isOr:this.isOr,
            tableEnglishName:this.activeResultTable.enName
        });
        this.queryResult({
            tableEnglishName:this.activeResultTable.enName,
            modelNo:this.$route.params.modelNo,
            currentPage:1
        }).then((result:any) => {
            
        }).catch((err:any) => {
            
        });
    }

}
</script>

<style lang="scss">

</style>