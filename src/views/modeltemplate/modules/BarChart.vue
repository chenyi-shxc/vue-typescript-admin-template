<template>
  <div>
    <div>{{ chartConfig.columnTitle }}</div>
    <el-divider></el-divider>
    <div
      id="barChart"
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

// 动画时间
const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
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

  // },
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
          this.chart = echarts.init(
            document.getElementById("barChart"),
            "macarons"
          );
          // 数据
          let data = result.data;
          let xdata = [];
          let series = [];
          let legendArray = this.chartConfig.barLegendName.split(",");
          let columns = this.chartConfig.barValue.split(",");
          for (let i = 0; i < data.length; i++) {
            let map = data[i];
            xdata.push(map[this.chartConfig.barName]);
          }
          for (let i = 0; i < columns.length; i++) {
            // let map = data[i];
            let dataArray = [];
            for (let j = 0; j < data.length; j++) {
              let map = data[j];
              dataArray.push(map[columns[i]]);
            }
            series.push({
              name: legendArray[i],
              type: "bar",
              data: dataArray,
              animationDuration,
            });
          }
          let option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                label: {
                  show: true,
                },
              },
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
            calculable: true,
            legend: {
              data: legendArray,
              itemGap: 5,
            },
            grid: {
              top: "12%",
              left: "1%",
              right: "10%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "category",
                data: xdata,
              },
            ],
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  formatter: function (a) {
                    a = +a;
                    return isFinite(a) ? echarts.format.addCommas(+a) : "";
                  },
                },
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
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
