<template>
<el-row class="mb-b">
    <el-col :span="24">
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <span>模型结果表</span>
            </div>
            <!-- 结果表 -->
            <el-table :data="resultTableData" border>
                <el-table-column prop="cnName" label="结果表名称"/>
                <el-table-column prop="memo" label="结果表描述说明"/>
            </el-table>
        </el-card>
    </el-col>
</el-row>
  
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
@Component({

})
export default class Result extends Vue{
    //@Prop() activeName!:string;
    @module.Getter('resultTableData') resultTableData!:any;
}
</script>

<style lang="scss">

</style>