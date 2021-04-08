<template>
  <el-dialog
      v-loading="tableDialogLoading"
      :visible.sync="tablePropDialogVisible"
      @close="setTablePropDialogVisible({ val: false })"
      destroy-on-close
    >
      <template slot="title" class="dialog-header">
        <i class="el-icon-setting"></i>
        <span style="margin-left: 6px;">账表属性</span>
      </template>
      <el-row type="flex" justify="left">
        <el-card v-loading="tableDialogLoading" style="width: 100%;">
          <span slot="header">账表基本信息</span>
          <el-form
            size="small"
            ref="tablePropForm"
            style="width: 100%;"
            :model="tablePropDialogForm"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="账表中文名">
              <el-input readonly v-model="tablePropDialogForm.chineseName" placeholder="账表中文名"></el-input>
            </el-form-item>
            <el-form-item label="账表英文名">
              <el-input readonly v-model="tablePropDialogForm.englishName" placeholder="账表英文名"></el-input>
            </el-form-item>
            <el-form-item label="账表类型">
              <el-select v-model="tablePropDialogForm.dictProperty" placeholder="账表类型">
                <el-option
                  :label="tablePropDialogForm.dictProperty"
                  :value="tablePropDialogForm.dictProperty"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属系统">
              <el-select v-model="tablePropDialogForm.dictType" placeholder="所属系统">
                <el-option
                  :label="tablePropDialogForm.dictType"
                  :value="tablePropDialogForm.dictType"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账表描述">
              <el-input
                type="textarea"
                v-model="tablePropDialogForm.dictDesc"
                style="width:100%;"
                placeholder="账表描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="账表标签">
              <el-row v-if="tablePropDialogForm.tagData">
                <el-select
                  v-model="tablePropDialogForm.tagData.selected"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="账表标签"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in tablePropDialogForm.tagData.accountTerm"
                    :key="item.termId"
                    :label="item.termName"
                    :value="item.termId"
                  ></el-option>
                </el-select>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
      <el-row type="flex" justify="left" style="margin-top: 20px;">
        <el-card v-loading="tableDialogLoading" style="width: 100%;">
          <span slot="header">账表字段信息</span>
          <el-row v-if="tablePropDialogForm.data">
            <el-table
              border
              size="small"
              highlight-current-row
              :data="tablePropDialogForm.data.accountField"
              style="width: 100%"
            >
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="fieldEnglishName" label="英文字段名称"></el-table-column>
              <el-table-column prop="fieldChineseName" label="中文字段名称"></el-table-column>
              <el-table-column prop="fieldType" label="字段类型"></el-table-column>
              <el-table-column prop="fieldDesc" label="字段备注"></el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-row>
      <template slot="footer" class="dialog-footer">
        <el-button @click="setTablePropDialogVisible({ val: false })">取消</el-button>
        <el-button type="primary" @click="filterDialogVisible = false">保存</el-button>
      </template>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "TablePropDialog"
})
export default class TablePropDialog extends Vue {
  @Prop()tableDialogLoading: any
  @Prop()tablePropDialogForm: any
  @Prop()setTablePropDialogVisible: any
  @Prop()tablePropDialogVisible: any
  
}
</script>