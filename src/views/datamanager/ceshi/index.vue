<template>
  <div id="app">
     <el-table v-loading="loading" :data="stModerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="columnId" />
      <el-table-column label="模型编号" align="center" prop="tableId" />
      <el-table-column label="模型名称" align="center" prop="columnName" />
      <el-table-column label="一级分类" align="center" prop="columnComment" />
      <el-table-column label="二级分类" align="center" prop="columnType" />
      <el-table-column label="三级分类" align="center" prop="javaType" />
      <el-table-column label="专题类型" align="center" prop="javaField" />
      <el-table-column label="模型类型" align="center" prop="isPk" />
      <el-table-column label="疑点数量" align="center" prop="isIncrement" />
      <el-table-column label="预警级别" align="center" prop="isRequired" />
      <el-table-column label="模型评价" align="center" prop="isInsert" />
      <el-table-column label="模型点击数" align="center" prop="isEdit" />
      <el-table-column label="是否验证" align="center" prop="isList" />
      <el-table-column label="验证机构" align="center" prop="isQuery" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
      </el-table-column>
    </el-table>
    <div style="height:40px">
      <h3 style="height:23px;color:rgb(17,17,17);line-height:23px;border-left:8px solid rgb(0,141,255);text-indent:15px;margin:4px 0">图形展示区</h3>
    </div>
    <div>
      <div style="width:45%;main-height:500px;border:1px solid rgba(0,0,0,0.2);border-radius:5px;">
          <div style="position:relative;height:55px;background:#0b4fcc">
            <a style="display:block;font-size:18px;color:#fff;line-height:55px;clear:both">
              总分行资产质量分类认定结果存在差异的贷款信息涉及客户和项目情况</a>
          </div>
          <div id="main" style="width: 600px;height:400px;"></div>        
      </div>
      <div style="width:45%;main-height:500px;border:1px solid rgba(0,0,0,0.2);border-radius:5px;">
          <div style="position:relative;height:55px;background:#0b4fcc">
            <a style="display:block;font-size:18px;color:#fff;line-height:55px;clear:both">
              总分行资产质量分类认定结果存在差异的贷款信息涉及贷款余额情况</a>
          </div>
          <div id="main2" style="width: 600px;height:400px;"></div>          
      </div>
    </div>
    
  </div>
 
</template>
<script>
export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
       let myChart2 = this.$echarts.init(document.getElementById("main2"));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
       myChart2.setOption(option);
      
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>