<template>
  <el-submenu v-if="menu.dictType === 1" :index="JSON.stringify(menu)">
    <template slot="title">
      <el-row style="display: flex; align-items: center;">
        <i class="el-icon-folder"></i>
        <span style="font-size:12px; ">{{menu.chineseName}}</span>
        <span style="margin-left: auto; margin-right: 20px;">
          <i class="el-icon-folder-add" v-if="menu.dictId === '835B8602717C11EA8B3C000C29437A5D'" style="font-size: 12px; width: 18px;" @click="showAddMenuDialog({ englishName: 'All Account Tables' })"></i>
          <i class="el-icon-plus" v-if="menu.dictId === '835B8602717C11EA8B3C000C29437A5D'" style="font-size: 12px; width: 18px;" @click="toggleAddTableDialog(true)"></i>
        </span>
      </el-row>
    </template>

    <!-- <template slot="title">
      <i class="el-icon-folder"></i>
      <span style="font-size: 12px;">{{menu.chineseName}}</span>
      <i style="margin-left: 70px; font-size: 12px;" v-if="menu.dictId === '835B8602717C11EA8B3C000C29437A5D'" class="el-icon-folder-add" @click="toggleAddFolderDialog(true)"></i>
      <i style="font-size: 12px;" v-if="menu.dictId === '835B8602717C11EA8B3C000C29437A5D'" class="el-icon-plus" @click="toggleAddTableDialog(true)"></i>
    </template> -->
    <MenuItem :toggleAddFolderDialog="toggleAddFolderDialog" :toggleAddTableDialog="toggleAddTableDialog" v-for="item in menu.children" :key="item.dictId" :menu="item"></MenuItem>
  </el-submenu>
  <el-menu-item v-else :index="JSON.stringify(menu)">
    <i class="el-icon-document"></i>
    <span slot="title" style="font-size: 12px;">{{menu.chineseName}}</span>
  </el-menu-item>
  
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "MenuItem"
})
export default class MenuItem extends Vue {
  @Prop({ default: {} })menu: any
  @Prop() toggleAddFolderDialog: any;
  @Prop() toggleAddTableDialog: any;
  
}
</script>