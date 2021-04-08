<template>
  <div>
    <div>{{ chartConfig.columnTitle }}</div>
    <el-divider></el-divider>
    <div
      id="lineChart"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
require("echarts/theme/macarons"); // echarts theme
import echarts from "echarts";
import resize from "./mixins/resize";

import { queryDataList } from "@/api/modeltemplate/chartData";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "line",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    // 图形配置
    chartConfig: {
      type: [Object],
    },
  },

  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      queryDataList({ sql: this.chartConfig.columnSource }, null)
        .then((result) => {
          // 数据
          let data = result.data;

          this.chart = echarts.init(
            document.getElementById("lineChart"),
            "macarons"
          );
          let legend = [];
          let xdata = [];
          let series = [];
          legend = this.chartConfig.legendName;
          let legendArray = legend.split(",");
          let yColumnArray = this.chartConfig.yAxisName.split(",");
          for (let i = 0; i < legendArray.length; i++) {
            let dataArray = [];
            for (let j = 0; j < data.length; j++) {
              let map = data[j];
              dataArray.push(map[yColumnArray[i]]);
            }
            series.push({
              name: legendArray[i],
              type: "line",
              data: dataArray,
              animationDuration,
            });
          }
          for (let i = 0; i < data.length; i++) {
            let map = data[i];
            xdata.push(map[this.chartConfig.xAxisName]);
          }
          let option = {
            tooltip: {
              trigger: "axis",
            },
            toolbox: {
              show: true,
              orient: "vertical",
              feature: {
                mark: {
                  show: true,
                },
                dataView: {
                  show: true,
                  readOnly: false,
                },
                magicType: {
                  show: true,
                  type: ["line", "bar"],
                },
                restore: {
                  show: true,
                },
                saveAsImage: {
                  show: true,
                },
              },
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            legend: {
              data: legendArray,
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: xdata,
              },
            ],
            yAxis: [
              {
                type: "value",
                splitLine: {
                  show: false,
                },
              },
            ],
            dataZoom: [
              {
                type: "inside",
                xAxisIndex: 0,
                minSpan: 5,
                start: 0,
                end: 50,
              },
              {
                type: "slider",
                show: true,
                xAxisIndex: 0,
                minSpan: 5,
                height: 15,
                handleSize: "150%",
              },
            ],
            series: series,
          };
          this.chart.setOption(option);
        })
        .catch((err) => {});
    },
  },
};
</script>
