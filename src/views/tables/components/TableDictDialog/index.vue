<template>
  <el-dialog
    v-loading="tableDialogLoading"
    :visible.sync="tableDictDialogVisible"
    @close="setTableDictDialogVisible({ val: false })"
    width="70%"
    destroy-on-close
  >
    <template slot="title" class="dialog-header">
      <i class="el-icon-setting"></i>
      <span style="margin-left: 6px;">字典编辑</span>
    </template>
    <el-table
      v-if="tableDictDialogForm.data"
      border
      size="small"
      highlight-current-row
      :data="tableDictDialogForm.data.accountField"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="fieldEnglishName" label="英文字段名称"></el-table-column>
      <el-table-column label="中文字段名称">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.fieldChineseName" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="fieldType" label="字段类型"></el-table-column>
      <el-table-column prop="fieldPrecision" label="字段长度"></el-table-column>
      <el-table-column prop="fieldScale" label="字段精度"></el-table-column>
      <el-table-column label="字段备注">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.fieldDesc" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer" class="dialog-footer">
      <el-button @click="setTableDictDialogVisible({ val: false })">取消</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Message } from 'element-ui';

@Component({
  name: "TableDictDialog"
})
export default class TableDictDialog extends Vue {
  @Prop() tableDialogLoading: any;
  @Prop() tableDictDialogForm: any;
  @Prop() setTableDictDialogVisible: any;
  @Prop() tableDictDialogVisible: any;
  @Prop() tableData: any;
  @Prop() doTableDictSave: any;

  async onSave() {
    this.tableDictDialogForm
    // debugger

    await this.doTableDictSave({
      accEName: this.tableData.englishName,
      fields: this.tableDictDialogForm.data.accountField.map((v: any) => {
        return {
          fieldChineseName: v.fieldChineseName,
          fieldEnglishName: v.fieldEnglishName,
          fieldDesc: v.fieldDesc,
        };
      }),
    });
    Message('保存成功');
  }
}
</script>