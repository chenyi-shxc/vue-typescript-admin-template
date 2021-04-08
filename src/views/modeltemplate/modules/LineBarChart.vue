<template>
  <div>
    <div>{{ chartConfig.columnTitle }}</div>
    <el-divider></el-divider>
    <div
      id="linebarChart"
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
            document.getElementById("linebarChart"),
            "macarons"
          );

          // 数据
          let data = result.data;
          let xdata = [];
          let ydata = [];
          let series = [];
          let barMax = 0;
          let lineMax = 0;
          let legendArray = this.chartConfig.lineBarLegend.split(",");
          let lineBar = this.chartConfig.lineBar.split(",");
          let columns = this.chartConfig.yAxisColumn.split(",");
          let lbAxisData = this.chartConfig.lbAxisData.split(",");
          for (let i = 0; i < data.length; i++) {
            let map = data[i];
            xdata.push(map[this.chartConfig.xAxisColumn]);
          }
          for (let i = 0; i < columns.length; i++) {
            let map = data[i];
            let dataArray = [];
            let yAxisIndex = 0;
            for (let j = 0; j < data.length; j++) {
              let map = data[j];
              dataArray.push(map[columns[i]]);
              if (lineBar[i] == "bar") {
                if (map[columns[i]] > barMax) {
                  barMax = map[columns[i]];
                  yAxisIndex = 0;
                }
              } else {
                if (map[columns[i]] > lineMax) {
                  lineMax = map[columns[i]];
                  yAxisIndex = 1;
                }
              }
            }
            series.push({
              name: legendArray[i],
              type: lineBar[i],
              yAxisIndex: yAxisIndex,
              data: dataArray,
              animationDuration,
            });
          }
          // 添加多柱状图需要
          for (let i = 0; i < lbAxisData.length; i++) {
            let maxValue = 0;
            if (i == 0) {
              maxValue = barMax;
            } else {
              maxValue = lineMax;
            }
            ydata.push({
              name: lbAxisData[i],
              max: (maxValue * 1.2).toFixed(2),
              min: 0,
              type: "value",
              bottom: "10px",
              axisLabel: {
                formatter: function (a) {
                  a = +a;
                  return isFinite(a) ? echarts.format.addCommas(+a) : "";
                },
              },
              splitLine: {
                show: false,
              },
            });
          }
          let option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
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
              //          bottom:'bottom'
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
            yAxis: ydata,
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
              {
                type: "inside",
                start: 0,
                end: 100,
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
