<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chartConfig="lineChartConfig" v-if="lineChartFlag" />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <data-table :dataTableConfig="dataTableConfig" v-if="dataTableFlag" />
    </el-row>
  </div>
</template>

<script>
import LineChart from "./modules/LineChart";
import DataTable from "./modules/DataTable";

import { getModelConfigChartLine } from "@/api/modeltemplate/modelConfigChartLine.js";
import { getModelConfigDataTableVO } from "@/api/modeltemplate/modelConfigDataTable.js";

export default {
  name: "ModelTemplate2",
  props: {
    templateConfig: {
      type: [Object]
    }
  },
  components: {
    LineChart,
    DataTable
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 折线图配置
      lineChartConfig: {},
      lineChartFlag: false,
      // 通用表格配置
      dataTableConfig: {},
      dataTableFlag: false
    };
  },
  created() {
    this.getLineChartConfig();
    this.getDataTableConfig();
  },
  mounted() {},
  methods: {
    getLineChartConfig() {
      getModelConfigChartLine(this.templateConfig.lineChartId)
        .then(result => {
          this.lineChartConfig = result.data;
          this.lineChartFlag = true;
        })
        .catch(err => {});
    },
    getDataTableConfig() {
      getModelConfigDataTableVO(this.templateConfig.dataTableId)
        .then(result => {
          this.dataTableConfig = result.data;
          this.dataTableFlag = true;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
