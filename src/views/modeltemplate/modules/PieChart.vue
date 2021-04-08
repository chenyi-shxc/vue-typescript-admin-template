<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

import { queryChartData } from "@/api/modeltemplate/chartData";

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
      queryChartData(this.chartConfig.columnSource, null)
        .then((result) => {
          this.chart = echarts.init(this.$el, "macarons");
          // 数据
          let data = result;

          let lengend = [];
          var seriesData = [];
          for (let i = 0; i < data.length; i++) {
            let map = data[i];
            lengend.push(map[params.pieName.toUpperCase()]);
            seriesData.push({
              name: map[params.pieName.toUpperCase()],
              value: map[params.pieValue.toUpperCase()],
            });
          }
          let option = {
            tooltip: {
              trigger: "item",
              formatter: seriesData.length > 0 && "{a} <br/>{b} : {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: "right",
              data: lengend,
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: seriesData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          };
          this.chart.setOption(option);
        })
        .catch((err) => {});

      this.chart.setOption;
    },
  },
};
</script>
