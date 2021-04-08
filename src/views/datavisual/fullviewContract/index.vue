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
      <el-form-item label="所属机构名称" prop="branchName">
        <el-input
          v-model="queryParams.branchName"
          placeholder="请输入所属机构名称"
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
      <el-form-item label="项目编号" prop="projectNo">
        <el-input
          v-model="queryParams.projectNo"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务类型" prop="bussType">
        <el-select v-model="queryParams.bussType" placeholder="请选择业务类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同状态" prop="contractStatus">
        <el-select v-model="queryParams.contractStatus" placeholder="请选择合同状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="展现标注日期" prop="showDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.showDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择展现标注日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="展现标注月份" prop="showDateM">
        <el-input
          v-model="queryParams.showDateM"
          placeholder="请输入展现标注月份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展现标注季度" prop="showDateQ">
        <el-input
          v-model="queryParams.showDateQ"
          placeholder="请输入展现标注季度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展现信息内容" prop="showTip">
        <el-input
          v-model="queryParams.showTip"
          placeholder="请输入展现信息内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属业务环节 " prop="flowType">
        <el-select v-model="queryParams.flowType" placeholder="请选择所属业务环节 " clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序 " prop="orderStr">
        <el-input
          v-model="queryParams.orderStr"
          placeholder="请输入排序 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目最早展现日期" prop="minShowDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.minShowDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择项目最早展现日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目最早展现日期月份" prop="minShowDateM">
        <el-input
          v-model="queryParams.minShowDateM"
          placeholder="请输入项目最早展现日期月份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目最早展现日期季度" prop="minShowDateQ">
        <el-input
          v-model="queryParams.minShowDateQ"
          placeholder="请输入项目最早展现日期季度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目最晚展现日期" prop="maxShowDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.maxShowDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择项目最晚展现日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目最晚展现日期月份" prop="maxShowDateM">
        <el-input
          v-model="queryParams.maxShowDateM"
          placeholder="请输入项目最晚展现日期月份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目最晚展现日期季度" prop="maxShowDateQ">
        <el-input
          v-model="queryParams.maxShowDateQ"
          placeholder="请输入项目最晚展现日期季度"
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
          v-hasPermi="['datavisual:fullviewContract:add']"
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
          v-hasPermi="['datavisual:fullviewContract:edit']"
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
          v-hasPermi="['datavisual:fullviewContract:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datavisual:fullviewContract:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fullviewContractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="合同号" align="center" prop="contractNo" />
      <el-table-column label="业务类型" align="center" prop="bussType" />
      <el-table-column label="合同状态" align="center" prop="contractStatus" />
      <el-table-column label="展现标注日期" align="center" prop="showDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.showDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展现标注月份" align="center" prop="showDateM" />
      <el-table-column label="展现标注季度" align="center" prop="showDateQ" />
      <el-table-column label="展现信息内容" align="center" prop="showTip" />
      <el-table-column label="所属业务环节 " align="center" prop="flowType" />
      <el-table-column label="排序 " align="center" prop="orderStr" />
      <el-table-column label="项目最早展现日期" align="center" prop="minShowDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.minShowDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目最早展现日期月份" align="center" prop="minShowDateM" />
      <el-table-column label="项目最早展现日期季度" align="center" prop="minShowDateQ" />
      <el-table-column label="项目最晚展现日期" align="center" prop="maxShowDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.maxShowDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目最晚展现日期月份" align="center" prop="maxShowDateM" />
      <el-table-column label="项目最晚展现日期季度" align="center" prop="maxShowDateQ" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['datavisual:fullviewContract:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datavisual:fullviewContract:remove']"
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

    <!-- 添加或修改全景视图-合同信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属机构" prop="bookBranch">
          <el-input v-model="form.bookBranch" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="branchName">
          <el-input v-model="form.branchName" placeholder="请输入所属机构名称" />
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
        <el-form-item label="合同号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同号" />
        </el-form-item>
        <el-form-item label="业务类型" prop="bussType">
          <el-select v-model="form.bussType" placeholder="请选择业务类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同状态">
          <el-radio-group v-model="form.contractStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展现标注日期" prop="showDate">
          <el-date-picker clearable size="small"
            v-model="form.showDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择展现标注日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="展现标注月份" prop="showDateM">
          <el-input v-model="form.showDateM" placeholder="请输入展现标注月份" />
        </el-form-item>
        <el-form-item label="展现标注季度" prop="showDateQ">
          <el-input v-model="form.showDateQ" placeholder="请输入展现标注季度" />
        </el-form-item>
        <el-form-item label="展现信息内容" prop="showTip">
          <el-input v-model="form.showTip" placeholder="请输入展现信息内容" />
        </el-form-item>
        <el-form-item label="所属业务环节 " prop="flowType">
          <el-select v-model="form.flowType" placeholder="请选择所属业务环节 ">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序 " prop="orderStr">
          <el-input v-model="form.orderStr" placeholder="请输入排序 " />
        </el-form-item>
        <el-form-item label="项目最早展现日期" prop="minShowDate">
          <el-date-picker clearable size="small"
            v-model="form.minShowDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择项目最早展现日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目最早展现日期月份" prop="minShowDateM">
          <el-input v-model="form.minShowDateM" placeholder="请输入项目最早展现日期月份" />
        </el-form-item>
        <el-form-item label="项目最早展现日期季度" prop="minShowDateQ">
          <el-input v-model="form.minShowDateQ" placeholder="请输入项目最早展现日期季度" />
        </el-form-item>
        <el-form-item label="项目最晚展现日期" prop="maxShowDate">
          <el-date-picker clearable size="small"
            v-model="form.maxShowDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择项目最晚展现日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目最晚展现日期月份" prop="maxShowDateM">
          <el-input v-model="form.maxShowDateM" placeholder="请输入项目最晚展现日期月份" />
        </el-form-item>
        <el-form-item label="项目最晚展现日期季度" prop="maxShowDateQ">
          <el-input v-model="form.maxShowDateQ" placeholder="请输入项目最晚展现日期季度" />
        </el-form-item>
        <el-form-item label="数据来源" prop="ds">
          <el-input v-model="form.ds" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="数据时点" prop="dd">
          <el-input v-model="form.dd" placeholder="请输入数据时点" />
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
import { listFullviewContract, getFullviewContract, delFullviewContract, addFullviewContract, updateFullviewContract, exportFullviewContract } from "@/api/datavisual/fullviewContract";

export default {
  name: "FullviewContract",
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
      // 全景视图-合同信息表格数据
      fullviewContractList: [],
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
        contractNo: null,
        bussType: null,
        contractStatus: null,
        showDate: null,
        showDateM: null,
        showDateQ: null,
        showTip: null,
        flowType: null,
        orderStr: null,
        minShowDate: null,
        minShowDateM: null,
        minShowDateQ: null,
        maxShowDate: null,
        maxShowDateM: null,
        maxShowDateQ: null,
        ds: null,
        dd: null
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
    /** 查询全景视图-合同信息列表 */
    getList() {
      this.loading = true;
      listFullviewContract(this.queryParams).then(response => {
        this.fullviewContractList = response.rows;
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
        contractNo: null,
        bussType: null,
        contractStatus: "0",
        showDate: null,
        showDateM: null,
        showDateQ: null,
        showTip: null,
        flowType: null,
        orderStr: null,
        minShowDate: null,
        minShowDateM: null,
        minShowDateQ: null,
        maxShowDate: null,
        maxShowDateM: null,
        maxShowDateQ: null,
        ds: null,
        dd: null
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
      this.title = "添加全景视图-合同信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookBranch = row.bookBranch || this.ids
      getFullviewContract(bookBranch).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改全景视图-合同信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bookBranch != null) {
            updateFullviewContract(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFullviewContract(this.form).then(response => {
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
      this.$confirm('是否确认删除全景视图-合同信息编号为"' + bookBranchs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFullviewContract(bookBranchs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有全景视图-合同信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFullviewContract(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
