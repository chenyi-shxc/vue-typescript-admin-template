<template>
  <el-dialog
    v-loading="tableDialogLoading"
    :visible.sync="tableSortDialogVisible"
    @close="setTableSortDialogVisible({ val: false })"
    destroy-on-close
  >
    <template slot="title" class="dialog-header">
      <i class="el-icon-setting"></i>
      <span style="margin-left: 6px;">账表排序</span>
    </template>
    <el-row style="margin-bottom: 10px;" type="flex" justify="center" v-for="(item, index) in dynamicForm" :key="index">
      <el-col span="12">
        <el-select :value="item.value" @change="onItemSelect" size="small" style="width: 100%;" placeholder="请选择字段">
          <el-option v-for="option in tableSortDialogForm.data.accountField" :key="option.fieldId" :label="option.fieldChineseName" :value="{ index, fieldEnglishName: option.fieldEnglishName, value: option.fieldChineseName }"></el-option>
        </el-select>
      </el-col>
      <el-col span="2">
      </el-col>
      <el-col span="2">
        <el-button size="small" :icon="item.sortType == '降序' ? 'el-icon-bottom' : 'el-icon-top'" @click.prevent="changeItemSortType(index)"></el-button>
      </el-col>
      <el-col span="2">
        <el-button size="small"  icon="el-icon-remove-outline" @click.prevent="removeItem(index)"></el-button>
      </el-col>
      <el-col span="2">
        <el-button size="small"  icon="el-icon-circle-plus-outline" @click.prevent="addItem(index)"></el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row style="margin-bottom: 10px;" type="flex" justify="center">
      <el-col span="7" style="justify-content: flex-end; display: flex; align-items: center;">生成账表名称:</el-col>
      <el-col span="1">
      </el-col>
      <el-col span="12">
        <el-input size="small" style="width: 100%;" v-model="tableName" placeholder="请输入账表名称"></el-input>
      </el-col>
    </el-row>
    <template slot="footer" class="dialog-footer">
      <el-button @click="setTableSortDialogVisible({ val: false })">取消</el-button>
      <el-button type="primary" @click="onSave">执行</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Message } from 'element-ui';

@Component({
  name: "TableSortDialog"
})
export default class TableSortDialog extends Vue {
  @Prop() tableDialogLoading: any;
  @Prop() tableSortDialogForm: any;
  @Prop() setTableSortDialogVisible: any;
  @Prop() tableSortDialogVisible: any;
  @Prop() tableData: any;
  @Prop() doTableSort: any;

  dynamicForm:any = [
    {
      value: '',
      sortType: '降序',
    }
  ];

  tableName: string = '';

  async onSave() {

    await this.doTableSort({
      conditions: this.dynamicForm.map((v: any) => {
        return {
          fieldEnglishName: v.fieldEnglishName,
          orderType: v.sortType,
        }
      }),
      resultTableName: this.tableName,
      tableEnglishName: this.tableData.englishName,
      currentPage: 1,
      pageSize: 9999,
    });
    this.setTableSortDialogVisible({ val: false });
    Message('排序成功');
  }

  addItem(index: number) {
    this.dynamicForm.splice(index + 1, 0, { value: '', sortType: '降序' });
  }

  removeItem(index: number) {
    if (this.dynamicForm.length <= 1) {
      (this as any).$alert('不能删除所有条件', '提示', {
        confirmButtonText: '确定',
      });
      return;
    }
    this.dynamicForm.splice(index, 1);
  }

  changeItemSortType(index: number) {
    const oriType = this.dynamicForm[index].sortType;
    if (oriType == '降序') {
      this.dynamicForm[index].sortType = '升序';
    } else {
      this.dynamicForm[index].sortType = '降序';
    }
  }

  onItemSelect(option: any) {
    this.dynamicForm[option.index].value = option.value;
    this.dynamicForm[option.index].fieldEnglishName = option.fieldEnglishName;
  }
}
</script>