<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-bar-chart
        :chartConfig="lineBarChartConfig"
        v-if="linebarChartFlag"
      />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <data-table :dataTableConfig="dataTableConfig" v-if="dataTableFlag" />
    </el-row>
  </div>
</template>

<script>
import LineBarChart from "./modules/LineBarChart";
import DataTable from "./modules/DataTable";

import { getModelConfigChartLinebar } from "@/api/modeltemplate/modelConfigChartLinebar.js";
import { getModelConfigDataTableVO } from "@/api/modeltemplate/modelConfigDataTable.js";

export default {
  name: "ModelTemplate2",
  props: {
    templateConfig: {
      type: [Object]
    }
  },
  components: {
    LineBarChart,
    DataTable
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 折线柱状图配置
      lineBarChartConfig: {},
      linebarChartFlag: false,
      // 通用表格配置
      dataTableConfig: {},
      dataTableFlag: false
    };
  },
  created() {
    this.getLinebarChartConfig();
    this.getDataTableConfig();
  },
  mounted() {},
  methods: {
    getLinebarChartConfig() {
      getModelConfigChartLinebar(this.templateConfig.linebarChartId)
        .then(result => {
          this.lineBarChartConfig = result.data;
          this.linebarChartFlag = true;
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
