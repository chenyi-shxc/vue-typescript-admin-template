<template>
  <div v-if="currentShowCharts && currentShowCharts.type !== templateType.NONE" >
      
      <div v-if="currentShowCharts.type === templateType.ONE">
          <!-- 单图 -->
            <el-row class="mb-b" :key="templateType.ONE + '_0'">
                <el-col :span="24">
                    <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chartHeight"></Chart>
                    </el-card>
                </el-col>
            </el-row>
      </div>
      <div v-if="currentShowCharts.type === templateType.TWO_H">
          <!-- 两图 横向排列 -->
          <el-row class="mb-b" :key="templateType.TWO_H + '_0'">
              <el-col :span="24">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chartHeight"></Chart>
                  </el-card>
              </el-col>
          </el-row>
          <el-row class="mb-b" :key="templateType.TWO_H + '_1'">
              <el-col :span="24">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[1].feId" :data="currentShowCharts.list[1]" class="chartHeight" ></Chart>
                  </el-card>
              </el-col>
          </el-row>
      </div>

      <div v-if="currentShowCharts.type === templateType.TWO_V">
          <!-- 两包 纵向 -->
          <el-row class="mb-b" :gutter="20" :key="templateType.TWO_V + '_0'">
              <el-col :span="12">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chartHeight" :ref="templateType.TWO_V + '_0'"></Chart>
                  </el-card>
              </el-col>
              <el-col :span="12">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[1].feId" :data="currentShowCharts.list[1]" class="chartHeight" :ref="templateType.TWO_V + '_1'"></Chart>
                  </el-card>
              </el-col>
          </el-row>
      </div>


    <div v-if="currentShowCharts.type === templateType.THREE_H">
          <!-- 三列 横向 -->
          <el-row class="mb-b" :gutter="20" :key="templateType.THREE_H + '_0'">
              <el-col :span="24">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chartHeight" ></Chart>
                  </el-card>
              </el-col>
          </el-row>
          <el-row class="mb-b" :gutter="20" :key="templateType.THREE_H + '_1'">
              <el-col :span="24">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                            <Chart :key="'chart-key-' + currentShowCharts.list[1].feId" :data="currentShowCharts.list[1]" class="chartHeight"></Chart>
                  </el-card>
              </el-col>
          </el-row>
          <el-row class="mb-b" :gutter="20" :key="templateType.THREE_H + '_2'">
              <el-col :span="24">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[2] && currentShowCharts.list[0].chartConf && currentShowCharts.list[2].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[2].feId" :data="currentShowCharts.list[2]" class="chartHeight" ></Chart>
                  </el-card>
              </el-col>
          </el-row>
      </div>

    <div v-if="currentShowCharts.type === templateType.THREE_V">
          <!-- 三列 纵向 -->
          <el-row class="mb-b" :gutter="20" :key="templateType.THREE_V + '_0'">
              <el-col :span="8">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chartHeight" ></Chart>
                  </el-card>  
              </el-col>
            <el-col :span="8">
                <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[1].feId" :data="currentShowCharts.list[1]" class="chartHeight" ></Chart>
                </el-card>
              </el-col>
              <el-col :span="8">
                  <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[2] && currentShowCharts.list[2].chartConf && currentShowCharts.list[2].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[2].feId" :data="currentShowCharts.list[2]" class="chartHeight" ></Chart>
                  </el-card>
              </el-col>
          </el-row>
      </div>  

    <div v-if="currentShowCharts.type === templateType.THREE_TWO_P_O">
        <!-- 左 2 右 1 -->
        <el-row :gutter="20"  class="mb-b" :key="templateType.THREE_TWO_P_O + '_0'">
            <el-col :span="12">
                <el-card class="mb-b" shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chart-two"></Chart>
                </el-card>
                <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[1].feId" :data="currentShowCharts.list[1]" class="chart-two">
                        
                        </Chart>      
                </el-card>              
            </el-col>
            <el-col :span="12">
                <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[2] && currentShowCharts.list[2].chartConf && currentShowCharts.list[2].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[2].feId" :data="currentShowCharts.list[2]" class="chart-single">

                        </Chart>
                </el-card>
            </el-col>
        </el-row>
    </div>


    <div v-if="currentShowCharts.type === templateType.THREE_ONE_P_T">
        <!-- 左 1 右 2 -->
        <el-row :gutter="20" class="mb-b" :key="templateType.THREE_ONE_P_T + '_0'">
            <el-col :span="12">
                <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[0] && currentShowCharts.list[0].chartConf && currentShowCharts.list[0].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[0].feId" :data="currentShowCharts.list[0]" class="chart-single">

                        </Chart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="mb-b" shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[1].feId" :data="currentShowCharts.list[1]" class="chart-two ">

                        </Chart>
                </el-card>
                <el-card shadow="never">
                        <div slot="header" class="clearfix">
                            <span>{{currentShowCharts.list[1] && currentShowCharts.list[1].chartConf && currentShowCharts.list[1].chartConf.title || "展示图表"}}</span>
                        </div>
                        <Chart :key="'chart-key-' + currentShowCharts.list[2].feId" :data="currentShowCharts.list[2]" class="chart-two">
                        
                        </Chart>    
                </el-card>                
            </el-col>
        </el-row>
    </div>

  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Chart from './chart.vue';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const tableResult = namespace('tableResult');
import ChartsItem from '@/model/module-result/charts-item';
import {tempModelResult} from '@/util/const';
@Component({
    components:{
        Chart
    }
})
export default class ChartsView extends Vue{
    //@Prop() activeName!:string;
    @tableResult.Getter('currentShowCharts') currentShowCharts!:{
        type:string,//展示类型
        list: ChartsItem[]
    }|null;

    private templateType = tempModelResult

}
</script>

<style lang="scss">
.chartHeight{
    height: 300px;
}
.chart-single{
    height: 500px;
}
.chart-two{
    height: 190px;
}
</style>