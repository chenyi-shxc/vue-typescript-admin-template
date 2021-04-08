<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属机构" prop="bookBranch">
        <el-input
          v-model="queryParams.bookBranch"
          placeholder="请输入所属机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核心客户号" prop="custNo">
        <el-input
          v-model="queryParams.custNo"
          placeholder="请输入核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="项目编号" prop="projectNo">
        <el-input
          v-model="queryParams.projectNo"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="风险类型" prop="riskType">
        <el-select v-model="queryParams.riskType" placeholder="请选择风险类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="事件类型" prop="eventType">
        <el-select v-model="queryParams.eventType" placeholder="请选择事件类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="涉及环节" prop="eventLink">
        <el-input
          v-model="queryParams.eventLink"
          placeholder="请输入涉及环节"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大事记类型" prop="eventCatatory">
        <el-input
          v-model="queryParams.eventCatatory"
          placeholder="请输入大事记类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇总环节是否重复展示" prop="isShow">
        <el-input
          v-model="queryParams.isShow"
          placeholder="请输入汇总环节是否重复展示"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇总环节是否重复展示" prop="isRisk">
        <el-input
          v-model="queryParams.isRisk"
          placeholder="请输入汇总环节是否重复展示"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据来源" prop="ds">
        <el-input
          v-model="queryParams.ds"
          placeholder="请输入数据来源"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据时点" prop="dd">
        <el-input
          v-model="queryParams.dd"
          placeholder="请输入数据时点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事件日期" prop="eventDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.eventDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择事件日期">
        </el-date-picker>
      </el-form-item> -->
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
          v-hasPermi="['survey:zkrTotalEvent:add']"
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
          v-hasPermi="['survey:zkrTotalEvent:edit']"
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
          v-hasPermi="['survey:zkrTotalEvent:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrTotalEvent:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrTotalEventList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <!-- <el-table-column label="所属机构名称" align="center" prop="branchName" /> -->
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="风险类型" align="center" prop="riskType" />
      <el-table-column label="事件类型" align="center" prop="eventType" />
      <el-table-column label="涉及环节" align="center" prop="eventLink" />
      <el-table-column label="描述" align="center" prop="eventDesc" />
      <el-table-column label="大事记类型" align="center" prop="eventCatatory" />
      <!-- <el-table-column label="汇总环节是否重复展示" align="center" prop="isShow" />
      <el-table-column label="汇总环节是否重复展示" align="center" prop="isRisk" /> -->
      <!-- <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="事件日期" align="center" prop="eventDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.eventDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrTotalEvent:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrTotalEvent:remove']"
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

    <!-- 添加或修改风险聚焦对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属机构" prop="bookBranch">
          <el-input v-model="form.bookBranch" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="branchName">
          <el-input v-model="form.branchName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="custNo">
          <el-input v-model="form.custNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="custName">
          <el-input v-model="form.custName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNo">
          <el-input v-model="form.projectNo" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="风险类型" prop="riskType">
          <el-select v-model="form.riskType" placeholder="请选择风险类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="事件类型" prop="eventType">
          <el-select v-model="form.eventType" placeholder="请选择事件类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="涉及环节" prop="eventLink">
          <el-input v-model="form.eventLink" placeholder="请输入涉及环节" />
        </el-form-item>
        <el-form-item label="描述" prop="eventDesc">
          <el-input v-model="form.eventDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="大事记类型" prop="eventCatatory">
          <el-input v-model="form.eventCatatory" placeholder="请输入大事记类型" />
        </el-form-item>
        <el-form-item label="汇总环节是否重复展示" prop="isShow">
          <el-input v-model="form.isShow" placeholder="请输入汇总环节是否重复展示" />
        </el-form-item>
        <el-form-item label="汇总环节是否重复展示" prop="isRisk">
          <el-input v-model="form.isRisk" placeholder="请输入汇总环节是否重复展示" />
        </el-form-item>
        <el-form-item label="数据来源" prop="ds">
          <el-input v-model="form.ds" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="数据时点" prop="dd">
          <el-input v-model="form.dd" placeholder="请输入数据时点" />
        </el-form-item>
        <el-form-item label="事件日期" prop="eventDate">
          <el-date-picker clearable size="small"
            v-model="form.eventDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择事件日期">
          </el-date-picker>
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
import { listZkrTotalEvent, getZkrTotalEvent, delZkrTotalEvent, addZkrTotalEvent, updateZkrTotalEvent, exportZkrTotalEvent } from "@/api/survey/zkrTotalEvent";

export default {
  name: "ZkrTotalEvent",
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
      // 风险聚焦表格数据
      zkrTotalEventList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bookBranch: null,
        branchName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        riskType: null,
        eventType: null,
        eventLink: null,
        eventDesc: null,
        eventCatatory: null,
        isShow: null,
        isRisk: null,
        ds: null,
        dd: null,
        eventDate: null
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
    /** 查询风险聚焦列表 */
    getList() {
      this.loading = true;
      listZkrTotalEvent(this.queryParams).then(response => {
        this.zkrTotalEventList = response.rows;
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
        bookBranch: null,
        branchName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        riskType: null,
        eventType: null,
        eventLink: null,
        eventDesc: null,
        eventCatatory: null,
        isShow: null,
        isRisk: null,
        ds: null,
        dd: null,
        eventDate: null
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
      this.ids = selection.map(item => item.bookBranch)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加风险聚焦";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookBranch = row.bookBranch || this.ids
      getZkrTotalEvent(bookBranch).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改风险聚焦";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bookBranch != null) {
            updateZkrTotalEvent(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrTotalEvent(this.form).then(response => {
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
      const bookBranchs = row.bookBranch || this.ids;
      this.$confirm('是否确认删除风险聚焦编号为"' + bookBranchs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrTotalEvent(bookBranchs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有风险聚焦数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZkrTotalEvent(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
