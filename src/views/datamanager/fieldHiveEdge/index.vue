<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="脚本id" prop="scriptId">
        <el-input
          v-model="queryParams.scriptId"
          placeholder="请输入脚本id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="脚本名称" prop="scriptName">
        <el-input
          v-model="queryParams.scriptName"
          placeholder="请输入脚本名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表-用户id" prop="targetUserId">
        <el-input
          v-model="queryParams.targetUserId"
          placeholder="请输入目标表-用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表-用户名" prop="targetUserName">
        <el-input
          v-model="queryParams.targetUserName"
          placeholder="请输入目标表-用户名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表-表id" prop="targetTableId">
        <el-input
          v-model="queryParams.targetTableId"
          placeholder="请输入目标表-表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表-表名" prop="targetTableName">
        <el-input
          v-model="queryParams.targetTableName"
          placeholder="请输入目标表-表名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表-字段id" prop="targetFieldId">
        <el-input
          v-model="queryParams.targetFieldId"
          placeholder="请输入目标表-字段id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目标表-字段名" prop="targetFieldName">
        <el-input
          v-model="queryParams.targetFieldName"
          placeholder="请输入目标表-字段名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="源表-用户id" prop="sourceUserId">
        <el-input
          v-model="queryParams.sourceUserId"
          placeholder="请输入源表-用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="源表-用户名" prop="sourceUserName">
        <el-input
          v-model="queryParams.sourceUserName"
          placeholder="请输入源表-用户名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="源表-表id" prop="sourceTableId">
        <el-input
          v-model="queryParams.sourceTableId"
          placeholder="请输入源表-表id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="源表-表名" prop="sourceTableName">
        <el-input
          v-model="queryParams.sourceTableName"
          placeholder="请输入源表-表名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="源表-字段id" prop="sourceFieldId">
        <el-input
          v-model="queryParams.sourceFieldId"
          placeholder="请输入源表-字段id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="源表-字段名" prop="sourceFieldName">
        <el-input
          v-model="queryParams.sourceFieldName"
          placeholder="请输入源表-字段名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['datamanager:fieldHiveEdge:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['datamanager:fieldHiveEdge:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['datamanager:fieldHiveEdge:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datamanager:fieldHiveEdge:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fieldHiveEdgeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="脚本id" align="center" prop="scriptId" />
      <el-table-column label="脚本名称" align="center" prop="scriptName" />
      <el-table-column label="目标表-用户id" align="center" prop="targetUserId" />
      <el-table-column label="目标表-用户名" align="center" prop="targetUserName" />
      <el-table-column label="目标表-表id" align="center" prop="targetTableId" />
      <el-table-column label="目标表-表名" align="center" prop="targetTableName" />
      <el-table-column label="目标表-字段id" align="center" prop="targetFieldId" />
      <el-table-column label="目标表-字段名" align="center" prop="targetFieldName" />
      <el-table-column label="源表-用户id" align="center" prop="sourceUserId" />
      <el-table-column label="源表-用户名" align="center" prop="sourceUserName" />
      <el-table-column label="源表-表id" align="center" prop="sourceTableId" />
      <el-table-column label="源表-表名" align="center" prop="sourceTableName" />
      <el-table-column label="源表-字段id" align="center" prop="sourceFieldId" />
      <el-table-column label="源表-字段名" align="center" prop="sourceFieldName" />
      <el-table-column label="边的表达式" align="center" prop="expr" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['datamanager:fieldHiveEdge:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datamanager:fieldHiveEdge:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改数据管理-hive的血缘分析边对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="脚本id" prop="scriptId">
          <el-input v-model="form.scriptId" placeholder="请输入脚本id" />
        </el-form-item>
        <el-form-item label="脚本名称" prop="scriptName">
          <el-input v-model="form.scriptName" placeholder="请输入脚本名称" />
        </el-form-item>
        <el-form-item label="目标表-用户id" prop="targetUserId">
          <el-input v-model="form.targetUserId" placeholder="请输入目标表-用户id" />
        </el-form-item>
        <el-form-item label="目标表-用户名" prop="targetUserName">
          <el-input v-model="form.targetUserName" placeholder="请输入目标表-用户名" />
        </el-form-item>
        <el-form-item label="目标表-表id" prop="targetTableId">
          <el-input v-model="form.targetTableId" placeholder="请输入目标表-表id" />
        </el-form-item>
        <el-form-item label="目标表-表名" prop="targetTableName">
          <el-input v-model="form.targetTableName" placeholder="请输入目标表-表名" />
        </el-form-item>
        <el-form-item label="目标表-字段id" prop="targetFieldId">
          <el-input v-model="form.targetFieldId" placeholder="请输入目标表-字段id" />
        </el-form-item>
        <el-form-item label="目标表-字段名" prop="targetFieldName">
          <el-input v-model="form.targetFieldName" placeholder="请输入目标表-字段名" />
        </el-form-item>
        <el-form-item label="源表-用户id" prop="sourceUserId">
          <el-input v-model="form.sourceUserId" placeholder="请输入源表-用户id" />
        </el-form-item>
        <el-form-item label="源表-用户名" prop="sourceUserName">
          <el-input v-model="form.sourceUserName" placeholder="请输入源表-用户名" />
        </el-form-item>
        <el-form-item label="源表-表id" prop="sourceTableId">
          <el-input v-model="form.sourceTableId" placeholder="请输入源表-表id" />
        </el-form-item>
        <el-form-item label="源表-表名" prop="sourceTableName">
          <el-input v-model="form.sourceTableName" placeholder="请输入源表-表名" />
        </el-form-item>
        <el-form-item label="源表-字段id" prop="sourceFieldId">
          <el-input v-model="form.sourceFieldId" placeholder="请输入源表-字段id" />
        </el-form-item>
        <el-form-item label="源表-字段名" prop="sourceFieldName">
          <el-input v-model="form.sourceFieldName" placeholder="请输入源表-字段名" />
        </el-form-item>
        <el-form-item label="边的表达式" prop="expr">
          <el-input v-model="form.expr" type="textarea" placeholder="请输入内容" />
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
import { listFieldHiveEdge, getFieldHiveEdge, delFieldHiveEdge, addFieldHiveEdge, updateFieldHiveEdge, exportFieldHiveEdge } from "@/api/datamanager/fieldHiveEdge";

export default {
  name: "FieldHiveEdge",
  components: {
  },
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
      // 数据管理-hive的血缘分析边表格数据
      fieldHiveEdgeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        scriptId: null,
        scriptName: null,
        targetUserId: null,
        targetUserName: null,
        targetTableId: null,
        targetTableName: null,
        targetFieldId: null,
        targetFieldName: null,
        sourceUserId: null,
        sourceUserName: null,
        sourceTableId: null,
        sourceTableName: null,
        sourceFieldId: null,
        sourceFieldName: null,
        expr: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询数据管理-hive的血缘分析边列表 */
    getList() {
      this.loading = true;
      listFieldHiveEdge(this.queryParams).then(response => {
        this.fieldHiveEdgeList = response.rows;
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
        scriptId: null,
        scriptName: null,
        targetUserId: null,
        targetUserName: null,
        targetTableId: null,
        targetTableName: null,
        targetFieldId: null,
        targetFieldName: null,
        sourceUserId: null,
        sourceUserName: null,
        sourceTableId: null,
        sourceTableName: null,
        sourceFieldId: null,
        sourceFieldName: null,
        expr: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加数据管理-hive的血缘分析边";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getFieldHiveEdge(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改数据管理-hive的血缘分析边";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateFieldHiveEdge(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFieldHiveEdge(this.form).then(response => {
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
      this.$confirm('是否确认删除数据管理-hive的血缘分析边编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFieldHiveEdge(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有数据管理-hive的血缘分析边数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFieldHiveEdge(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
