<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <bar-chart :chartConfig="barChartConfig" v-if="barChartFlag" />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <data-table :dataTableConfig="dataTableConfig" v-if="dataTableFlag" />
    </el-row>
  </div>
</template>

<script>
import BarChart from "./modules/BarChart";
import DataTable from "./modules/DataTable";

import { getModelConfigChartBar } from "@/api/modeltemplate/modelConfigChartBar.js";
import { getModelConfigDataTableVO } from "@/api/modeltemplate/modelConfigDataTable.js";

export default {
  name: "ModelTemplate1",
  props: {
    templateConfig: {
      type: [Object]
    }
  },
  components: {
    BarChart,
    DataTable
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 柱状图配置
      barChartConfig: {},
      barChartFlag: false,
      // 通用表格配置
      dataTableConfig: {},
      dataTableFlag: false
    };
  },
  created() {
    this.getBarChartConfig();
    this.getDataTableConfig();
  },
  mounted() {},
  methods: {
    getBarChartConfig() {
      getModelConfigChartBar(this.templateConfig.barChartId)
        .then(result => {
          this.barChartConfig = result.data;
          this.barChartFlag = true;
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
