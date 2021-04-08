<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="模型编号" prop="modelNo">
        <el-input
          v-model="queryParams.modelNo"
          placeholder="请输入模型编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模型名称" prop="modelName">
        <el-input
          v-model="queryParams.modelName"
          placeholder="请输入模型名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="模板id" prop="modelTemplateId">
        <el-input
          v-model="queryParams.modelTemplateId"
          placeholder="请输入模板id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="模板名称" prop="modelTemplateName">
        <el-input
          v-model="queryParams.modelTemplateName"
          placeholder="请输入模板名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模型结果表id" prop="modelResultId">
        <el-input
          v-model="queryParams.modelResultId"
          placeholder="请输入模型结果表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="模型结果表中文名" prop="modelResultNameZh">
        <el-input
          v-model="queryParams.modelResultNameZh"
          placeholder="请输入模型结果表中文名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模型结果表英文名" prop="modelResultNameEn">
        <el-input
          v-model="queryParams.modelResultNameEn"
          placeholder="请输入模型结果表英文名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="列标题名称" prop="columnTitle">
        <el-input
          v-model="queryParams.columnTitle"
          placeholder="请输入列标题名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['modeltemplate:modelConfigDataTable:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['modeltemplate:modelConfigDataTable:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['modeltemplate:modelConfigDataTable:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['modeltemplate:modelConfigDataTable:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="modelConfigDataTableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" width="55" prop="id" />
      <el-table-column
        label="模型编号"
        align="center"
        width="80"
        prop="modelNo"
      />
      <el-table-column
        label="模型名称"
        align="center"
        width="160"
        prop="modelName"
      />
      <!-- <el-table-column label="模板id" align="center" prop="modelTemplateId" />
      <el-table-column label="模板名称" align="center" prop="modelTemplateName" />
      <el-table-column label="模型结果表id" align="center" prop="modelResultId" />
      <el-table-column label="模型结果表中文名" align="center" prop="modelResultNameZh" />
      <el-table-column label="模型结果表英文名" align="center" prop="modelResultNameEn" /> -->
      <el-table-column label="表格标题名称" align="center" prop="columnTitle" />
      <el-table-column
        label="表格数据源SQL"
        align="center"
        prop="columnSource"
      />
      <el-table-column
        label="表格表头中文名(用,分隔)"
        align="center"
        prop="columnHeadLabels"
      />
      <el-table-column
        label="表格表头字段名(用,分隔)"
        align="center"
        prop="columnHeadProperties"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['modeltemplate:modelConfigDataTable:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['modeltemplate:modelConfigDataTable:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改模板配置-列配置-通用数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="模型编号" prop="modelNo">
          <el-select
            v-model="form.modelNo"
            placeholder="请选择模型"
            filterable
            @change="setModelName"
          >
            <el-option
              v-for="item in stModerList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模型名称" prop="modelName">
          <el-input v-model="form.modelName" readonly />
        </el-form-item>
        <!-- <el-form-item label="模板id" prop="modelTemplateId">
          <el-input v-model="form.modelTemplateId" placeholder="请输入模板id" />
        </el-form-item>
        <el-form-item label="模板名称" prop="modelTemplateName">
          <el-input v-model="form.modelTemplateName" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="模型结果表id" prop="modelResultId">
          <el-input v-model="form.modelResultId" placeholder="请输入模型结果表id" />
        </el-form-item>
        <el-form-item label="模型结果表中文名" prop="modelResultNameZh">
          <el-input v-model="form.modelResultNameZh" placeholder="请输入模型结果表中文名" />
        </el-form-item>
        <el-form-item label="模型结果表英文名" prop="modelResultNameEn">
          <el-input v-model="form.modelResultNameEn" placeholder="请输入模型结果表英文名" />
        </el-form-item> -->
        <el-form-item label="表格标题名称" prop="columnTitle">
          <el-input v-model="form.columnTitle" placeholder="请输入列标题名称" />
        </el-form-item>
        <el-form-item label="表格数据源SQL" prop="columnSource">
          <el-input
            v-model="form.columnSource"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="表格表头中文名(用,分隔)" prop="columnHeadLabels">
          <el-input
            v-model="form.columnHeadLabels"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          label="表格表头字段名(用,分隔)"
          prop="columnHeadProperties"
        >
          <el-input
            v-model="form.columnHeadProperties"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listModelConfigDataTable,
  getModelConfigDataTable,
  delModelConfigDataTable,
  addModelConfigDataTable,
  updateModelConfigDataTable,
  exportModelConfigDataTable
} from "@/api/modeltemplate/modelConfigDataTable";

import { listStModer } from "@/api/survey/stModer";

export default {
  name: "ModelConfigDataTable",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 模板配置-列配置-通用数据表格数据
      modelConfigDataTableList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        modelNo: null,
        modelName: null,
        modelTemplateId: null,
        modelTemplateName: null,
        modelResultId: null,
        modelResultNameZh: null,
        modelResultNameEn: null,
        columnTitle: null,
        columnSource: null,
        columnHeadLabels: null,
        columnHeadProperties: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 模型列表格数据
      stModerList: [],
      modelId: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询模板配置-列配置-通用数据列表 */
    getList() {
      this.loading = true;
      listModelConfigDataTable(this.queryParams).then(response => {
        this.modelConfigDataTableList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        modelNo: null,
        modelName: null,
        modelTemplateId: null,
        modelTemplateName: null,
        modelResultId: null,
        modelResultNameZh: null,
        modelResultNameEn: null,
        columnTitle: null,
        columnSource: null,
        columnHeadLabels: null,
        columnHeadProperties: null
      };
      this.stModerList = [];
      this.modelId = "";
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.queryModelOptions();
      this.open = true;
      this.title = "添加模板配置-列配置-通用数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.queryModelOptions();
      const id = row.id || this.ids;
      getModelConfigDataTable(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改模板配置-列配置-通用数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateModelConfigDataTable(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addModelConfigDataTable(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除模板配置-列配置-通用数据编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delModelConfigDataTable(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有模板配置-列配置-通用数据数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportModelConfigDataTable(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },
    /** 查询模型列表 */
    queryModelOptions() {
      listStModer()
        .then(result => {
          result.rows.map(item => {
            this.stModerList.push({
              value: item.modelNo,
              label: item.modelNo + "-" + item.modelName,
              modelNo: item.modelNo,
              modelName: item.modelName
            });
          });
        })
        .catch(err => {});
    },
    /** 模型编号下拉联动模型名称 */
    setModelName(modelNo) {
      this.stModerList.forEach(item => {
        if (item.modelNo === modelNo) {
          this.form.modelName = item.modelName;
        }
      });
    }
  }
};
</script>
