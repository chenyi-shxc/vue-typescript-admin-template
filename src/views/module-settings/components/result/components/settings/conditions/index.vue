<template>
  <el-card shadow="never" style="margin:20px 0;">
    <div slot="header">
        <span>设置条件</span>
    </div>
    <div>
        <Item v-for="(item,index) in currentCondition" 
          :key="item.feId"
          :data="item"
          :tableEnglishName="tableEnglishName"
          :index="index"
        />
    </div>
  </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import Item from './item.vue'
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
    Item
  }
})
export default class Conditions extends Vue{
    //@Prop() activeName!:string;
    @Prop() tableEnglishName!:string;

    @tableResult.Getter('currentCondition') currentCondition!:any;
    

}
</script>

<style lang="scss">
.condition-header {
  padding: 5px 10px;
  background: #EBEEF5;
}
</style>