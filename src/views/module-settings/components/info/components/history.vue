<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
        <span>模型修订记录</span>
    </div>
    <el-table class="mb-s" :data="history">
        <el-table-column
            prop="version"
            label="修订版本号"
        />
        <el-table-column
            prop="createDate"
            label="修订日期"
        />
        <el-table-column
            prop="createUser"
            label="修订人"
        />
        <el-table-column
            label="更新内容"
        >
            <template slot-scope="scope">
                <div class="content-area">
                    {{history[scope.$index].content || '无数据'}}
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        v-if="historyPageInfo.totalPage>1"
        style="text-align:center;"
        layout="prev, pager, next"
        :current-page="historyPageInfo.currentPage"
        :page-count="historyPageInfo.totalPage"
        @current-change="changePage"
    ></el-pagination>
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
} from 'vuex-class'
const moduleInfo = namespace('moduleInfo');
@Component({

})
export default class History extends Vue{
    @moduleInfo.Action('getHistoryList') getHistoryList!:any;
    @moduleInfo.Getter('history') history!:any;
    @moduleInfo.Getter('historyPageInfo') historyPageInfo!:any;
    
    @Watch('modelID')
    onModelID(newVal:string){
      this.init(newVal);
    }

    changePage(page:number){
        this.getHistoryList({
            modelID:this.modelNo,
            currentPage:page
        }).then((result:any) => {
            
        }).catch((err:any) => {
            
        });
    }

    init(modelNo:string){
        this.getHistoryList({
            modelID:modelNo,
            currentPage:1
        }).then((result:any) => {
            
        }).catch((err:any) => {
            
        });
    }


    get modelNo(){
      return this.$route.params.modelNo;
    }

    mounted(){
        if(this.modelNo){
            this.init(this.modelNo);
        }
    }
}
</script>

<style lang="scss">
.content-area{
    max-height: 200px;
    overflow: auto;
}
</style>