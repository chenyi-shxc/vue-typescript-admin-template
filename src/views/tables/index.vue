<template>
  <el-row
    v-loading="tableLoading"
    type="flex"
    align="top"
    justify="center"
    style="min-height: 100%;"
  >
    <el-col
      class="no-data-container"
      v-if="!tableTabs || tableTabs.length === 0"
      :style="'height:' + initHeight + 'px;'"
    >
      <div class="no-data-icon">
        <svg t="1588577972989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4683" width="200" height="200"><path d="M576 928c-6 0-11.9-1.7-17.1-5-9.3-5.9-14.9-16.1-14.9-27V554.3c0-12.4 7.1-23.6 18.3-28.9l288-136.1c9.9-4.7 21.5-4 30.8 1.9s14.9 16.1 14.9 27v341.7c0 12.4-7.1 23.6-18.3 28.9l-288 136.1c-4.4 2.1-9 3.1-13.7 3.1z m32-353.5v271l224-105.8v-271L608 574.5zM448 928c-4.7 0-9.3-1-13.7-3.1l-288-136.1c-11.2-5.3-18.3-16.6-18.3-28.9V418.2c0-11 5.6-21.2 14.9-27 9.3-5.9 20.9-6.6 30.8-1.9l288 136.1c11.2 5.3 18.3 16.6 18.3 28.9V896c0 11-5.6 21.2-14.9 27-5.2 3.3-11.1 5-17.1 5zM192 739.7l224 105.8v-271L192 468.7v271zM512 501.1c-4.7 0-9.4-1-13.8-3.1l-352-168.1c-11.2-5.4-18.3-16.7-18.2-29.2 0.1-12.4 7.4-23.7 18.8-28.8l352-159.9c8.4-3.8 18.1-3.8 26.5 0l352 159.9c11.3 5.1 18.6 16.4 18.8 28.8 0.1 12.4-7 23.8-18.2 29.2L525.8 498c-4.4 2-9.1 3.1-13.8 3.1zM235.8 301.7L512 433.6l276.2-131.9L512 176.2 235.8 301.7z" p-id="4684" fill="#c0c4cc"></path></svg>
      </div>
      <div class="no-data-text">
        暂无内容,请选择账表
      </div>
    </el-col>
    <el-tabs
      v-else
      type="card"
      style="width: 100%;"
      :value="activeTabData.chineseName"
      @tab-click="onTabClick"
      @tab-remove="onTabClose"
      editable
    >
      <el-tab-pane
        v-for="item in tableTabs"
        :key="item.chineseName"
        :data="item"
        :name="item.chineseName"
      >
        <template slot="label">
          <i class="el-icon-files"></i>
          <span style="margin-left: 6px;">{{item.chineseName}}</span>
        </template>
        <el-row type="flex" align="center">
          <ControlPad :onBtnClick="onControlBtnClick"></ControlPad>
        </el-row>
        <el-divider />
        <el-table
          border
          size="small"
          highlight-current-row
          :data="item.data.accountData"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            v-for="(val) in item.data.accountField"
            :key="val.fieldEnglishName"
            :prop="val.fieldEnglishName"
            :label="val.fieldChineseName"
            width="auto"
          ></el-table-column>
        </el-table>
        <el-divider />
        <!-- <el-row type="flex" justify="end">
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="item.data.accountDataCount"
          ></el-pagination>
        </el-row> -->
      </el-tab-pane>
    </el-tabs>

    <TableFilterDialog
      :tableDialogLoading="tableDialogLoading"
      :tableFilterDialogForm="tableFilterDialogForm"
      :setTableFilterDialogVisible="setTableFilterDialogVisible"
      :tableFilterDialogVisible="tableFilterDialogVisible"
      :tableData="activeTabData"
      :doTableFilter="doTableFilter"
    ></TableFilterDialog>
    <TableAnalyseDialog
      :tableDialogLoading="tableDialogLoading"
      :tableAnalyseDialogForm="tableAnalyseDialogForm"
      :setTableAnalyseDialogVisible="setTableAnalyseDialogVisible"
      :tableAnalyseDialogVisible="tableAnalyseDialogVisible"
      :tableData="activeTabData"
      :doTableAnalyse="doTableAnalyse"
    ></TableAnalyseDialog>
    <TableSortDialog
      :tableDialogLoading="tableDialogLoading"
      :tableSortDialogForm="tableSortDialogForm"
      :setTableSortDialogVisible="setTableSortDialogVisible"
      :tableSortDialogVisible="tableSortDialogVisible"
      :tableData="activeTabData"
      :doTableSort="doTableSort"
    ></TableSortDialog>
    <TablePropDialog
      :tableDialogLoading="tableDialogLoading"
      :tablePropDialogForm="tablePropDialogForm"
      :setTablePropDialogVisible="setTablePropDialogVisible"
      :tablePropDialogVisible="tablePropDialogVisible"
    ></TablePropDialog>
    <TableDictDialog
      :tableDialogLoading="tableDialogLoading"
      :tableDictDialogForm="tableDictDialogForm"
      :setTableDictDialogVisible="setTableDictDialogVisible"
      :tableDictDialogVisible="tableDictDialogVisible"
      :tableData="activeTabData"
      :doTableDictSave="doTableDictSave"
    ></TableDictDialog>
    <TableExportDialog
      :tableDialogLoading="tableDialogLoading"
      :tableExportDialogForm="tableExportDialogForm"
      :tableExportDialogVisible="tableExportDialogVisible"
      :setTableExportDialogVisible="setTableExportDialogVisible"
      :tableData="activeTabData"
      :doTableExport="doTableExport"
    ></TableExportDialog>
    <TableDownloadDialog
      :tableDialogLoading="tableDialogLoading"
      :tableDownloadDialogVisible="tableDownloadDialogVisible"
      :setTableDownloadDialogVisible="setTableDownloadDialogVisible"
      :tableData="activeTabData"
      :doTableDownload="doTableDownload"
    ></TableDownloadDialog>
  </el-row>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import ControlPad from "./components/ControlPad/index.vue";
import TablePropDialog from "./components/TablePropDialog/index.vue";
import TableDictDialog from "./components/TableDictDialog/index.vue";
import TableExportDialog from "./components/TableExportDialog/index.vue";
import TableDownloadDialog from "./components/TableDownloadDialog/index.vue";
import TableSortDialog from "./components/TableSortDialog/index.vue";
import TableFilterDialog from "./components/TableFilterDialog/index.vue";
import TableAnalyseDialog from "./components/TableAnalyseDialog/index.vue";

const table = namespace("table");

@Component({
  name: "Tables",
  components: {
    ControlPad,
    TablePropDialog,
    TableDictDialog,
    TableExportDialog,
    TableDownloadDialog,
    TableSortDialog,
    TableFilterDialog,
    TableAnalyseDialog,
  }
})
export default class Tables extends Vue {
  @table.Getter("getTableTabs") tableTabs: any;
  @table.Getter("getTableLoading") tableLoading: any;
  @table.Getter("getActiveTabData") activeTabData: any;
  @table.Getter("getTablePropDialogVisible") tablePropDialogVisible: any;
  @table.Getter("getTableDialogLoading") tableDialogLoading: any;
  @table.Getter("getTableDictDialogVisible") tableDictDialogVisible: any;
  @table.Getter("getTableExportDialogVisible") tableExportDialogVisible: any;
  @table.Getter("getTableSortDialogVisible") tableSortDialogVisible: any;
  @table.Getter("getTableFilterDialogVisible") tableFilterDialogVisible: any;
  @table.Getter("getTableDownloadDialogVisible") tableDownloadDialogVisible: any;
  @table.Getter("getTableAnalyseDialogVisible") tableAnalyseDialogVisible: any;

  @table.Mutation("setActiveTabData") setActiveTabData: any;
  @table.Mutation("removeTabData") removeTabData: any;
  @table.Mutation("setTablePropDialogVisible") setTablePropDialogVisible: any;
  @table.Mutation("setTableDictDialogVisible") setTableDictDialogVisible: any;
  @table.Mutation("setTableSortDialogVisible") setTableSortDialogVisible: any;
  @table.Mutation("setTableFilterDialogVisible") setTableFilterDialogVisible: any;
  @table.Mutation("setTableExportDialogVisible") setTableExportDialogVisible: any;
  @table.Mutation("setTableDownloadDialogVisible") setTableDownloadDialogVisible: any;
  @table.Mutation("setTableAnalyseDialogVisible") setTableAnalyseDialogVisible: any;

  @table.Action("fetchTableTabTagData") fetchTableTabTagData: any;

  @table.Action("doTableFilter") doTableFilter: any;
  @table.Action("doTableExport") doTableExport: any;
  @table.Action("doTableDownload") doTableDownload: any;
  @table.Action("doTableAnalyse") doTableAnalyse: any;
  @table.Action("doTableSort") doTableSort: any;
  @table.Action("doTableDictSave") doTableDictSave: any;

  onTabClick(el: any) {
    this.setActiveTabData(el.$attrs.data);
  }

  onTabClose(chineseName: any) {
    console.log(chineseName);
    this.removeTabData(chineseName);
  }

  tablePropDialogForm: any = {};
  tableDictDialogForm: any = {};
  tableExportDialogForm: any = {};
  tableSortDialogForm: any = {};
  tableFilterDialogForm: any = {};
  tableAnalyseDialogForm: any = {};

  async onControlBtnClick(e: any, param: any) {
    switch (param.type) {
      case "filter":
        // await this.fetchTableTabTagData(this.activeTabData);
        await this.setTableFilterDialogVisible({ val: true });
        this.tableFilterDialogForm = { ...this.activeTabData };
        console.log("this.tableFilterDialogForm", this.tableFilterDialogForm);
        break;
      case "analyse":
        // await this.fetchTableTabTagData(this.activeTabData);
        await this.setTableAnalyseDialogVisible({ val: true });
        this.tableAnalyseDialogForm = { ...this.activeTabData };
        console.log("this.tableAnalyseDialogForm", this.tableAnalyseDialogForm);
        break;
      case "property":
        await this.fetchTableTabTagData(this.activeTabData);
        await this.setTablePropDialogVisible({ val: true });
        this.tablePropDialogForm = { ...this.activeTabData };
        console.log("this.tablePropDialogForm", this.tablePropDialogForm);
        break;
      case "sort":
        // await this.fetchTableTabTagData(this.activeTabData);
        await this.setTableSortDialogVisible({ val: true });
        this.tableSortDialogForm = { ...this.activeTabData };
        console.log("this.tableSortDialogForm", this.tableSortDialogForm);
        break;
      case "dict":
        await this.setTableDictDialogVisible({ val: true });
        this.tableDictDialogForm = { ...this.activeTabData };
        console.log("this.tableDictDialogForm", this.tableDictDialogForm);
        break;
      case "export":
        await this.setTableExportDialogVisible({ val: true });
        this.tableExportDialogForm = { ...this.activeTabData };
        console.log("this.tableExportDialogForm", this.tableExportDialogForm);
        break;
      case "download":
        await this.setTableDownloadDialogVisible({ val: true });
        break;
    }
  }

  get initHeight(){
   return window.innerHeight - 120 - 60 - 100;
  }

  filterDialogVisible = true;

  toggleFilterDialog() {
    this.filterDialogVisible = !this.filterDialogVisible;
  }
}
</script>

<style>

.no-data-icon{
  flex: 0 0 auto;

}
.no-data-text{
  flex: 0 0 auto;
  margin-top: 10px;
  font-size:12px; text-align: center; color: #C0C4CC;
}
.no-data-container{
  display: flex; 
  flex-direction: column;
  align-content:center; 
  align-items: center; 
  justify-content: center; 
}
</style>