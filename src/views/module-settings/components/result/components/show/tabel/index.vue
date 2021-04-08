<template>
  <el-card v-if="currentShowTable && currentShowTable.data.length>0" shadow="never">
      <div slot="header">
          <span>表单结果</span>
      </div>
      <el-table class="mb-b" :data="currentShowTable.data">
          <el-table-column
            v-for="item of currentShowTable.accountField"
            :key="item.fieldEnglishName"
            :prop="item.fieldEnglishName"
            :label="item.showName || item.fieldChineseName"
          />
      </el-table>
      <el-pagination 
        v-if="currentShowTable.totalPage>1"
        style="text-align:center;"
        @current-change="changePage"
        layout="prev, pager, next"
        :current-page="currentShowTable.currentPage"
        :page-count="currentShowTable.totalPage">
      </el-pagination>
  </el-card>
</template>

<script lang="ts">
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const tableResult = namespace('tableResult');
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class TableView extends Vue{
    //@Prop() activeName!:string;
    @tableResult.Getter('activeResultTable') activeResultTable!:any;
    @tableResult.Getter('currentShowTable') currentShowTable!:any;
    @tableResult.Action('nextPage') nextPage!:any;
    changePage(page:number){
        // console.log(page);
        this.nextPage({
            currentPage:page,
            modelNo:this.$route.params.modelNo,
            tableEnglishName:this.activeResultTable.enName
        }).then((result:any) => {
            
        }).catch((err:any) => {
            
        });
    }
}
</script>

<style lang="scss">

</style>