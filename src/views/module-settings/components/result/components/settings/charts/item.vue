<template>
  <div style="height:100%;">
    <el-card style="cursor:pointer;height:100%;" @click.native="cardClick" :body-style="{ padding: '0px', height: '100%' }">
      <el-row type="flex" align="middle" justify="center" style="height:100%;padding:10px;">
        <i class="el-icon-s-tools" style="font-size: 50px;" />
      </el-row>
    </el-card>
    <!-- 展示图设置 -->
    <ChartSettings :feId="data.feId" :popData="data.columnJson"  @changeVisible="changeVisible" :showDialog="showDialog" @onSubmit="dialogSubmit" />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ChartSettings from './popup.vue';
import ColumnConf from '@/model/module-result/column-conf';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const tableResult = namespace('tableResult');
@Component({
  components: {
    ChartSettings
  }
})
export default class Item extends Vue{
    //@Prop() activeName!:string;
    private showDialog: boolean = false
    @Prop() data!:ColumnConf;

    @tableResult.Getter('activeResultTable') activeResultTable!:any;

    @tableResult.Mutation('updateColumnConf') updateColumnConf!:any;

    cardClick() {
      console.log('click.....');
      this.showDialog = true
    }

    changeVisible(val:boolean){
      this.showDialog = false;
    }

    dialogSubmit(formData: PopSettingChart) {
      console.log('确认提交', formData)

      this.updateColumnConf({
        val:formData,
        tableEnglishName:this.activeResultTable.enName,
        feId:this.data.feId
      });

    }

    mounted(){
      //TODO:获取用户
      console.log(this.data);
    }
}
</script>

<style lang="scss">

</style>