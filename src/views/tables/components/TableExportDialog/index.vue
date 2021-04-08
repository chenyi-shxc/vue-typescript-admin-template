<template>
  <el-dialog
    v-loading="tableDialogLoading"
    :visible.sync="tableExportDialogVisible"
    @close="setTableExportDialogVisible({ val: false })"
    destroy-on-close
    width="30%"
  >
    <template slot="title" class="dialog-header">
      <i class="el-icon-share"></i>
      <span style="margin-left: 6px;">字典字典导出</span>
    </template>
    <el-form
      size="small"
      ref="tableExportForm"
      style="width: 100%;"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="导出文件类型">
        <el-select v-model="fileType" placeholder="请选择导出文件类型">
          <el-option label="Excel表格(.xlsx)" value="xlsx"></el-option>
          <el-option label="CSV文件(.csv)" value="csv"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer" class="dialog-footer">
      <el-button @click="setTableExportDialogVisible({ val: false })">取消</el-button>
      <el-button type="primary" @click="onSave">导出</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Message } from 'element-ui';

@Component({
  name: "TableExportDialog"
})
export default class TableExportDialog extends Vue {
  @Prop() tableDialogLoading: any;
  @Prop() tableExportDialogForm: any;
  @Prop() setTableExportDialogVisible: any;
  @Prop() tableExportDialogVisible: any;
  @Prop() tableData: any;
  @Prop() doTableExport: any;
  
  fileType: string = 'xlsx';

  async onSave() {
    await this.doTableExport({
      filePath: 'G:\\',
      fileType: this.fileType,
      fileName: `${this.tableData.chineseName}-字段导出`,
      accEName: this.tableData.englishName,
    });
    this.setTableExportDialogVisible({ val: false });
    Message('导出成功');
  }
}
</script>