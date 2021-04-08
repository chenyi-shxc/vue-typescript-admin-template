<template>
  <el-row>
      <el-col :span="24">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane :lazy="true" label="模型浏览" name="module1">
                <slot name="module1"></slot>
            </el-tab-pane>
            <el-tab-pane :lazy="true" label="结果展示" name="module2">
                <slot name="module2"></slot>
            </el-tab-pane>
            <el-tab-pane :lazy="true" label="模型信息" name="module3">
                <slot name="module3"></slot>
            </el-tab-pane>
          </el-tabs>
      </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class Tab extends Vue{
    //@Prop() activeName!:string;
    private activeName:string = 'module1'
}
</script>

<style>

</style>