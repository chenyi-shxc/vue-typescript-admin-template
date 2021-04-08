<template>
  <el-col :span="8">
    <el-row style="font-size: 24px;">
      <el-col :span="3">
        <el-tooltip content="账表筛选" placement="top">
          <el-button size="small" icon="el-icon-search" :data="{ type: 'filter' }" circle @click="onBtnClick($event, { type: 'filter' })"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="账表透视" placement="top">
          <el-button size="small" icon="el-icon-view" :data="{ type: 'analyse' }" circle @click="onBtnClick($event, { type: 'analyse' })"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="账表排序" placement="top">
          <el-button size="small" icon="el-icon-sort" :data="{ type: 'sort' }" circle @click="onBtnClick($event, { type: 'sort' })"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="账表数据导出" placement="top">
          <el-button size="small" icon="el-icon-download" :data="{ type: 'download' }" circle @click="onBtnClick($event, { type: 'download' })"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="账表属性" placement="top">
          <el-button size="small" icon="el-icon-setting" :data="{ type: 'property' }" circle @click="onBtnClick($event, { type: 'property' })"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="字典编辑" placement="top">
          <el-button size="small" icon="el-icon-edit-outline" :data="{ type: 'dict' }" circle @click="onBtnClick($event, { type: 'dict' })"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="账表字典导出" placement="top">
          <el-button size="small" icon="el-icon-share" :data="{ type: 'export' }" circle @click="onBtnClick($event, { type: 'export' })"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </el-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "ControlPad"
})
export default class ControlPad extends Vue {
  @Prop()onBtnClick: any
}
</script>