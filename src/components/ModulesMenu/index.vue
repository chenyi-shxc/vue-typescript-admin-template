<template>
  <el-row>
    <el-row>
      <!-- <el-row>
        <el-col :span="23">
          <el-input placeholder="模糊匹配模型名称或编号" size="mini">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-divider /> -->
      <!-- <el-col :span="24"> -->
        <el-menu ref="menu" mode="vertical" v-loading="menuLoading" @select="onMenuSelect" @open="onMenuOpen" :collapse="menuCollapse" >
          <el-row style="display: flex; justify-content: flex-end; padding: 2px 4px 8px;">
            <i @click="toggleMenuCollapse" :class="toggleIconName"></i>
          </el-row>
          <el-input v-if="!menuCollapse" v-model="searchName" placeholder="模糊匹配模型名称或编号" size="mini">
            <template slot="append">
              <el-button @click="onSearchReset" icon="el-icon-refresh-right"></el-button>
              <el-button @click="onSearch" icon="el-icon-search"></el-button>
            </template>
          </el-input>
          <el-divider />
          <el-submenu :index="1">
            <template slot="title">
              <el-row style="display: flex; align-items: center;">
                <i class="el-icon-folder"></i>
                <span style="font-size:12px; ">公共库模型</span>
                <span style="margin-left: auto; margin-right: 20px;">
                  <i class="el-icon-folder-add" style="font-size: 12px; width: 18px;" @click="showAddMenuDialog({ englishName: 'All Account Tables' })"></i>
                  <i class="el-icon-plus" style="font-size: 12px; width: 18px;" @click="toggleAddTableDialog(true)"></i>
                </span>
              </el-row>
            </template>
            <MenuItem v-for="item in menu" :key="item.modelId" :menu="item"></MenuItem>
          </el-submenu>
          <el-submenu :index="2">
            <template slot="title">
              <el-row style="display: flex; align-items: center;">
                <i class="el-icon-folder"></i>
                <span style="font-size:12px; ">用户个人模型</span>
                <span style="margin-left: auto; margin-right: 20px;">
                  <i class="el-icon-folder-add" style="font-size: 12px; width: 18px;" @click="showAddMenuDialog({ englishName: 'User Create Accounts' })"></i>
                  <i class="el-icon-plus" style="font-size: 12px; width: 18px;" @click="toggleAddTableDialog(true)"></i>
                </span>
              </el-row>
            </template>
          </el-submenu>
        </el-menu>
      <!-- </el-col> -->
    </el-row>

    <el-dialog width="40%" title="新增目录" :visible.sync="addFolderDialogVisible">
      <el-form size="mini" label-width="80px">
        <el-form-item label="目录名称">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleAddFolderDialog(false)">取 消</el-button>
        <el-button type="primary" @click="toggleAddFolderDialog(false)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="40%" title="新增账表" :visible.sync="addTableDialogVisible">
      <el-form size="mini" label-width="80px">
        <el-form-item label="账表名称">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toggleAddTableDialog(false)">取 消</el-button>
        <el-button type="primary" @click="toggleAddTableDialog(false)">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import MenuItem from "./menu-item.vue";

const moduleMenu = namespace("moduleMenu");

@Component({
  name: "ModulesMenu",
  components: {
    MenuItem
  }
})
export default class ModulesMenu extends Vue {

  $refs: any = {
    menu: HTMLFormElement
  }

  searchName: string = '';
  menuCollapse: boolean = false;
  toggleIconName: string = 'el-icon-s-fold';

  async onSearch() {
    await this.fetchFirstMenu({
      modelType: 'model',
      modelName: this.searchName,
    });
  }

  async onSearchReset() {
    this.searchName = '';
    await this.fetchFirstMenu();
  }

  toggleMenuCollapse(){
    this.menuCollapse = !this.menuCollapse;
    this.toggleIconName = this.menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
  }

  @moduleMenu.Getter("getMenu") menu: any;
  @moduleMenu.Getter("getMenuLoading") menuLoading: any;
  @moduleMenu.Getter("getTableTabs") tableTabs: any;
  @moduleMenu.Getter("getAddFolderDialogVisible") addFolderDialogVisible: any;
  @moduleMenu.Getter("getAddTableDialogVisible") addTableDialogVisible: any;

  @moduleMenu.Action("fetchMenu") fetchMenu: any;
  @moduleMenu.Action("fetchFirstMenu") fetchFirstMenu: any;
  @moduleMenu.Action("fetchTableTabData") fetchTableTabData: any;
  @moduleMenu.Action("searchMenu") searchMenu: any;

  @moduleMenu.Mutation("openTableTab") openTableTab: any;
  @moduleMenu.Mutation("setActiveTabData") setActiveTabData: any;
  @moduleMenu.Mutation("toggleAddFolderDialog") toggleAddFolderDialog: any;
  @moduleMenu.Mutation("toggleAddTableDialog") toggleAddTableDialog: any;

  // async onMenuOpen(payload: any) {
  //   const item = JSON.parse(payload);
  //   if (item.modelParentId !== '-1' || item.children) {
  //     return;
  //   }
  //   await this.fetchMenu(item);
  //   this.$refs.menu.open(payload);
  // }

  async onMenuSelect(payload: any) {
    const item = JSON.parse(payload);
    this.$router.push({ path: `/module/${item.modelId}/${item.modelNo}` })

    // if (!this.tableTabs.some((v: any) => v.dictId === item.dictId)) {
    //   await this.openTableTab(item);
    //   await this.fetchTableTabData(item);
    // }
    // await this.setActiveTabData(item);
  }

  async mounted() {
    await this.fetchFirstMenu();
  }
}
</script>

<style lang="scss">
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}
.el-submenu__title {
  padding: 0 10px;
}
</style>

<style lang="scss" scoped>
</style>