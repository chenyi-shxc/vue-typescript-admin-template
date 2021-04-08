<template>
  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <bar-chart :chartConfig="barChartConfig" v-if="barChartFlag" />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chartConfig="lineChartConfig" v-if="lineChartFlag" />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-bar-chart
        :chartConfig="lineBarChartConfig"
        v-if="linebarChartFlag"
      />
    </el-row>

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <data-table :dataTableConfig="dataTableConfig" v-if="dataTableFlag" />
    </el-row>
    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col> -->
    <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col> -->
    <!-- </el-row> -->
  </div>
</template>

<script>
// import PanelGroup from './dashboard/PanelGroup'
// import LineChart from "./modules/LineChart";
// import RaddarChart from "./dashboard/RaddarChart";
// import PieChart from "./dashboard/PieChart";
import BarChart from "./modules/BarChart";
import LineChart from "./modules/LineChart";
import PieChart from "./modules/PieChart";
import LineBarChart from "./modules/LineBarChart";
import DataTable from "./modules/DataTable";

import { getModelConfigChartBar } from "@/api/modeltemplate/modelConfigChartBar.js";
import { getModelConfigChartLine } from "@/api/modeltemplate/modelConfigChartLine.js";
import { getModelConfigChartLinebar } from "@/api/modeltemplate/modelConfigChartLinebar.js";
import { getModelConfigDataTableVO } from "@/api/modeltemplate/modelConfigDataTable.js";

export default {
  name: "ModelTemplate2",
  components: {
    BarChart,
    LineChart,
    LineBarChart,
    DataTable,
    // RaddarChart,
    // PieChart,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 柱状图配置
      barChartConfig: {},
      barChartFlag: false,
      // 折线图配置
      lineChartConfig: {},
      lineChartFlag: false,
      // 折线柱状图配置
      lineBarChartConfig: {},
      linebarChartFlag: false,
      // 通用表格配置
      dataTableConfig: {},
      dataTableFlag: false,
    };
  },
  created() {
    this.getBarChartConfig();
    this.getLineChartConfig();
    this.getLinebarChartConfig();
    this.getDataTableConfig();
  },
  mounted() {},
  methods: {
    getBarChartConfig() {
      getModelConfigChartBar("1")
        .then((result) => {
          this.barChartConfig = result.data;
          this.barChartFlag = true;
        })
        .catch((err) => {});
    },
    getLineChartConfig() {
      getModelConfigChartLine("1")
        .then((result) => {
          this.lineChartConfig = result.data;
          this.lineChartFlag = true;
        })
        .catch((err) => {});
    },
    getLinebarChartConfig() {
      getModelConfigChartLinebar("1")
        .then((result) => {
          this.lineBarChartConfig = result.data;
          this.linebarChartFlag = true;
        })
        .catch((err) => {});
    },
    getDataTableConfig() {
      getModelConfigDataTableVO("1")
        .then((result) => {
          this.dataTableConfig = result.data;
          this.dataTableFlag = true;
        })
        .catch((err) => {});
    },
  },
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
