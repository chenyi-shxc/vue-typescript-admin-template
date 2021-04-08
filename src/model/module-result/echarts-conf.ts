class EchartsConf {
  title: string = "";
  legend: any[] = [];
  theme: string = "";
  xAxis: any[] = [];
  yAxis: any[] = [];
  type: string = "";
  series: any[] = [];
  constructor(
    title: string,
    legend: any,
    type: string,
    xAxis: any[],
    yAxis: any[],
    series: any,
    theme: string
  ) {
    this.title = title;
    this.legend = legend;
    this.theme = theme;
    this.type = type;
    this.xAxis = xAxis; //默认x轴都为 category
    this.yAxis = yAxis; //默认y轴都为 value类型
    this.series = series; //数据内容列
  }
  getConf() {
    return {
      // title: {
      //   text: this.title
      // },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          start: 0,
          end: 100
        }
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: this.legend,
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      series: this.series
    };
  }
}


export default EchartsConf;