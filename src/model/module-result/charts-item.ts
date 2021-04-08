import EchartsConf from './echarts-conf';
import getId from '@/util/key';
class ChartsItem{
    feId!:string
    num!:number|string
    chartConf!: EchartsConf
    constructor(num: number | string, chartConf: EchartsConf){
        this.num = num;
        this.chartConf = chartConf;
        this.feId = getId();
    }
}


export default ChartsItem;