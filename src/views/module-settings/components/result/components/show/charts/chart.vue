<template>
  <div ref="el">

  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ChartsItem from '@/model/module-result/charts-item';
// import echarts from 'echarts';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/radar';
import echarts from '@/util/echarts';
@Component({

})
export default class Chart extends Vue{
    @Prop() data!:ChartsItem;
    mounted(){
        //console.log(echarts);
        let el:any = this.$refs.el;
        console.log('###',this.data);
        let echartInstance:any = echarts.init(el,this.data.chartConf.theme);
        // console.log(JSON.stringify(this.data.chartConf.getConf()));
        echartInstance.setOption(this.data.chartConf.getConf());
    }
}
</script>

<style lang="scss">

</style>