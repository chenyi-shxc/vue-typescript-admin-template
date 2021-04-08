<template>
  <el-dialog
    v-loading="tableDialogLoading"
    :visible.sync="tableDownloadDialogVisible"
    @close="setTableDownloadDialogVisible({ val: false })"
    destroy-on-close
  >
    <template slot="title" class="dialog-header">
      <i class="el-icon-download"></i>
      <span style="margin-left: 6px;">账表数据导出</span>
    </template>
    <el-row type="flex" justify="left" gutter="8">
      <el-col :span="12">
        <el-card v-loading="tableDialogLoading" style="width: 100%;">
          <span slot="header">字段选择</span>
          <el-checkbox-group v-model="selectedFields">
            <el-row v-for="option in tableData.data.accountField" :key="option.fieldChineseName"  >
              <el-checkbox :label="option.fieldChineseName" :name="option.fieldEnglishName"></el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-loading="tableDialogLoading" style="width: 100%;">
          <span slot="header">导出配置</span>
          <el-form size="small" label-width="120px">
            <el-form-item label="表头使用">
              <el-select size="small" v-model="headType" placeholder="请选择表头类型">
                <el-option label="中文字段名" value="CN"></el-option>
                <el-option label="英文字段名" value="EN"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="导出文件类型">
              <el-select size="small" v-model="fileType" placeholder="请选择导出文件类型">
                <el-option label="Excel表格(.xlsx)" value="xlsx"></el-option>
                <el-option label="CSV文件(.csv)" value="csv"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <template slot="footer" class="dialog-footer">
      <el-button @click="setTableDownloadDialogVisible({ val: false })">取消</el-button>
      <el-button type="primary" @click="onSave">执行</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Message } from 'element-ui';

@Component({
  name: "TableDownloadDialog"
})
export default class TableDownloadDialog extends Vue {
  @Prop() tableDialogLoading: any;
  @Prop() setTableDownloadDialogVisible: any;
  @Prop() tableDownloadDialogVisible: any;
  @Prop() tableData: any;
  @Prop() doTableDownload: any;
  

  selectedFields: any = [];
  headType: string = '';
  fileType: string = '';

  async onSave() {

    await this.doTableDownload({
      headType: this.headType,
      fileType: this.fileType,
      filePath: 'G:\\',
      fileName: `${this.tableData.chineseName}-数据导出`,
      accEName: this.tableData.englishName,
      selectedFields: this.selectedFields.map((item: any) => {
        const field = this.tableData.data.accountField.find((v: any) => v.fieldChineseName == item);
        return {
          fieldEnglishName: field.fieldEnglishName,
          fieldChineseName: field.fieldChineseName,
        }
      }),
    });
    this.setTableDownloadDialogVisible({ val: false });
    Message('导出成功');
  }

}
</script>