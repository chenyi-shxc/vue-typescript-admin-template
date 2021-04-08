<template>
  <div>
    <div>{{ dataTableConfig.columnTitle }}</div>
    <el-divider></el-divider>
    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['datamanager:field:add']"
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
          v-hasPermi="['datamanager:field:edit']"
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
          v-hasPermi="['datamanager:field:remove']"
          >删除</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datamanager:field:export']"
          >导出</el-button
        >
      </el-col>
      <!-- <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      >
      </right-toolbar> -->
    </el-row>
    <el-row :gutter="10" class="mb8">
      <el-table
        v-loading="loading"
        :data="rows"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="字段名" align="center" prop="fieldName" />
      <el-table-column label="字段类型" align="center" prop="fieldType" />
      <el-table-column label="字段描述" align="center" prop="fieldDesc" />
      <el-table-column label="所属表id" align="center" prop="tableId" />
      <el-table-column label="所属表名" align="center" prop="tableName" />
      <el-table-column label="排序号" align="center" prop="orderNum" />
      <el-table-column label="备注" align="center" prop="remark" /> -->
        <el-table-column
          v-for="(item, index) in tableHeads"
          :key="index"
          :label="item.label"
          :property="item.property"
          align="center"
        >
        </el-table-column>

        <!-- <el-table-column
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
              v-hasPermi="['datamanager:field:edit']"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['datamanager:field:remove']"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-row>
  </div>
</template>

<script>
// import { listField, exportField } from "@/api/modeltemplate/tableData";
import {
  queryTableDataPage,
  exportDataList,
} from "@/api/modeltemplate/chartData";

export default {
  name: "DataTable",
  components: {},
  props: [
    // 表数据
    "dataTableConfig",
  ],

  data() {
    return {
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
      // 数据管理-字段表格数据
      fieldList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fieldName: null,
        fieldType: null,
        fieldDesc: null,
        tableId: null,
        tableName: null,
        orderNum: null,
        tableHead: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      loading: false,
      // 表头
      tableHeads: {},
    };
  },
  mounted() {
    this.tableHeads = this.dataTableConfig.tableHeads;
    this.getList();
  },
  methods: {
    /** 查询数据管理-字段列表 */
    getList() {
      this.loading = true;

      // listField(this.dataTableConfig.url, this.queryParams)
      queryTableDataPage(
        {
          sql: this.dataTableConfig.columnSource,
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
        },
        null
      )
        .then((result) => {
          this.rows = result.rows;
          this.total = result.total;
          this.loading = false;
        })
        .catch((err) => {});
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
        fieldName: null,
        fieldType: null,
        fieldDesc: null,
        tableId: null,
        tableName: null,
        orderNum: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加数据管理-字段";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getField(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改数据管理-字段";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateField(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addField(this.form).then((response) => {
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
        '是否确认删除数据管理-字段编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delField(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      let config = this.dataTableConfig;

      this.$confirm("是否确认导出所有数据管理-字段数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportDataList(
            { sql: config.columnSource, exportTitle: config.columnTitle },
            queryParams
          );
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
  },
};
</script>

<style>
</style>