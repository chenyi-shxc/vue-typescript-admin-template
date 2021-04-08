<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="原表id" prop="sourceTableId">
        <el-input
          v-model="queryParams.sourceTableId"
          placeholder="请输入原表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原表名称" prop="sourceTableName">
        <el-input
          v-model="queryParams.sourceTableName"
          placeholder="请输入原表名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表id" prop="targetTableId">
        <el-input
          v-model="queryParams.targetTableId"
          placeholder="请输入目标表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表名称" prop="targetTableName">
        <el-input
          v-model="queryParams.targetTableName"
          placeholder="请输入目标表名称"
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
          v-hasPermi="['datamanager:tableLineage:add']"
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
          v-hasPermi="['datamanager:tableLineage:edit']"
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
          v-hasPermi="['datamanager:tableLineage:remove']"
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
          v-hasPermi="['datamanager:tableLineage:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-s-data"
          size="mini"
          @click="handleShowChart"
          v-hasPermi="['datamanager:tableLineage:export']"
          >血缘图表展示</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableLineageList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="原表id" align="center" prop="sourceTableId" />
      <el-table-column label="原表名称" align="center" prop="sourceTableName" />
      <el-table-column label="目标表id" align="center" prop="targetTableId" />
      <el-table-column
        label="目标表名称"
        align="center"
        prop="targetTableName"
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
            v-hasPermi="['datamanager:tableLineage:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datamanager:tableLineage:remove']"
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

    <!-- 血缘图表 -->
    <el-dialog
      :title="title"
      :visible.sync="chartShow"
      width="60%"
      append-to-body
    >
      <el-form
        :model="chartQueryParams"
        ref="chartQueryForm"
        :inline="true"
        v-show="showSearch"
        label-width="100px"
      >
        <el-form-item label="原表名称" prop="sourceTableName">
          <el-input
            v-model="chartQueryParams.sourceTableName"
            placeholder="请输入原表名称"
            clearable
            size="small"
        /></el-form-item>
        <el-form-item label="目标表名称" prop="targetTableName">
          <el-input
            v-model="chartQueryParams.targetTableName"
            placeholder="请输入目标表名称"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="chartHandleQuery"
            >搜索</el-button>
        </el-form-item>
      </el-form>
      <el-card class="box-card">
        <div slot="header"><span>血缘图表展示</span></div>
        <div class="el-table el-table--enable-row-hover el-table--medium">
          <div ref="chart" style="height: 520px" />
        </div>
      </el-card>
    </el-dialog>

    <!-- 添加或修改数据管理-数据血缘对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="原表id" prop="sourceTableId">
          <el-input v-model="form.sourceTableId" placeholder="请输入原表id" />
        </el-form-item>
        <el-form-item label="原表名称" prop="sourceTableName">
          <el-input
            v-model="form.sourceTableName"
            placeholder="请输入原表名称"
          />
        </el-form-item>
        <el-form-item label="目标表id" prop="targetTableId">
          <el-input v-model="form.targetTableId" placeholder="请输入目标表id" />
        </el-form-item>
        <el-form-item label="目标表名称" prop="targetTableName">
          <el-input
            v-model="form.targetTableName"
            placeholder="请输入目标表名称"
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
  listTableLineage,
  getTableLineage,
  delTableLineage,
  addTableLineage,
  updateTableLineage,
  exportTableLineage,
  tableLineageChart,
} from "@/api/datamanager/tableLineage";

import echarts from "echarts";

export default {
  name: "TableLineage",
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
      // 数据管理-数据血缘表格数据
      tableLineageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sourceTableId: null,
        sourceTableName: null,
        targetTableId: null,
        targetTableName: null,
      },
      chartQueryParams: {
        sourceTableName: null,
        targetTableName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 是否显示弹出表
      chartShow: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询数据管理-数据血缘列表 */
    getList() {
      this.loading = true;
      listTableLineage(this.queryParams).then((response) => {
        this.tableLineageList = response.rows;
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
        sourceTableId: null,
        sourceTableName: null,
        targetTableId: null,
        targetTableName: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 图形搜索按钮操作 */
    chartHandleQuery() {
      this.queryChart();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 图形重置按钮操作 */
    chartResetQuery() {
      this.resetForm("chartQueryForm");
      this.chartHandleQuery();
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
      this.title = "添加数据管理-数据血缘";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getTableLineage(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改数据管理-数据血缘";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateTableLineage(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTableLineage(this.form).then((response) => {
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
        '是否确认删除数据管理-数据血缘编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delTableLineage(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有数据管理-数据血缘数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportTableLineage(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        });
    },
    handleShowChart() {
      this.chartShow = true;
      this.title = "添加数据管理-数据血缘";
      this.queryChart();
    },
    queryChart() {
      tableLineageChart(this.chartQueryParams).then((response) => {
        this.chart = echarts.init(this.$refs.chart, "chart");
        this.chart.setOption({
          title: {
            // text: "Graph 简单示例",
          },
          tooltip: {},
          legend: [
            {
              // selectedMode: 'single',
              data: response.categories.map(function (a) {
                return a.name;
              }),
            },
          ],
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "none",
              symbolSize: 20,
              roam: true,
              label: {
                show: true,
                position: "right",
                distance: 6
              },
              edgeSymbol: ["circle", "arrow"],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                fontSize: 20,
              },
              categories: response.categories,
              data: response.data,
              links: response.links,
              lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0,
              },
            },
          ],
        });
      });
    },
  },
};
</script>
<style scoped>
.box-card {
  width: 100%;
  height: 600px;
}
</style>