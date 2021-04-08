<template>
  <el-submenu v-if="menu.modelType === 'dir'" :index="JSON.stringify(menu)">
    <template slot="title">
      <i class="el-icon-folder"></i>
      <span style="font-size: 12px;">{{menu.modelName}}</span>
    </template>
    <MenuItem v-for="item in menu.children" :key="item.modelId" :menu="item"></MenuItem>
  </el-submenu>
  <el-menu-item v-else :index="JSON.stringify(menu)">
    <i class="el-icon-document"></i>
    <span slot="title" style="font-size: 12px;">{{menu.modelName}}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "MenuItem"
})
export default class MenuItem extends Vue {
  @Prop({ default: {} })menu: any
}
</script>