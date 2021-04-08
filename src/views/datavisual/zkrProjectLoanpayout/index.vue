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
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款号" prop="loanNo">
        <el-input
          v-model="queryParams.loanNo"
          placeholder="请输入贷款号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款发放ID" prop="payoutId">
        <el-input
          v-model="queryParams.payoutId"
          placeholder="请输入贷款发放ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发放金额" prop="ddAmt">
        <el-input
          v-model="queryParams.ddAmt"
          placeholder="请输入发放金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发放KEY" prop="ddKey">
        <el-input
          v-model="queryParams.ddKey"
          placeholder="请输入发放KEY"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发放日期" prop="payoutDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.payoutDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发放日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发放执行利率" prop="executeRate">
        <el-input
          v-model="queryParams.executeRate"
          placeholder="请输入发放执行利率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发放币种" prop="currencyName">
        <el-input
          v-model="queryParams.currencyName"
          placeholder="请输入发放币种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发放账号" prop="baseAcctNo">
        <el-input
          v-model="queryParams.baseAcctNo"
          placeholder="请输入发放账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发放账户类型" prop="acctType">
        <el-select v-model="queryParams.acctType" placeholder="请选择发放账户类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="贷款余额" prop="outstanding">
        <el-input
          v-model="queryParams.outstanding"
          placeholder="请输入贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款状态" prop="statusName">
        <el-input
          v-model="queryParams.statusName"
          placeholder="请输入贷款状态"
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
          v-hasPermi="['datavisual:zkrProjectLoanpayout:add']"
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
          v-hasPermi="['datavisual:zkrProjectLoanpayout:edit']"
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
          v-hasPermi="['datavisual:zkrProjectLoanpayout:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datavisual:zkrProjectLoanpayout:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectLoanpayoutList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="合同编号" align="center" prop="contractNo" />
      <el-table-column label="贷款号" align="center" prop="loanNo" />
      <el-table-column label="贷款发放ID" align="center" prop="payoutId" />
      <el-table-column label="发放金额" align="center" prop="ddAmt" />
      <el-table-column label="发放KEY" align="center" prop="ddKey" />
      <el-table-column label="发放日期" align="center" prop="payoutDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payoutDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放执行利率" align="center" prop="executeRate" />
      <el-table-column label="发放币种" align="center" prop="currencyName" />
      <el-table-column label="发放账号" align="center" prop="baseAcctNo" />
      <el-table-column label="发放账户类型" align="center" prop="acctType" />
      <el-table-column label="贷款余额" align="center" prop="outstanding" />
      <el-table-column label="贷款状态" align="center" prop="statusName" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['datavisual:zkrProjectLoanpayout:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datavisual:zkrProjectLoanpayout:remove']"
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

    <!-- 添加或修改项目贷款发放信息对话框 -->
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
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="form.contractNo" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="贷款号" prop="loanNo">
          <el-input v-model="form.loanNo" placeholder="请输入贷款号" />
        </el-form-item>
        <el-form-item label="贷款发放ID" prop="payoutId">
          <el-input v-model="form.payoutId" placeholder="请输入贷款发放ID" />
        </el-form-item>
        <el-form-item label="发放金额" prop="ddAmt">
          <el-input v-model="form.ddAmt" placeholder="请输入发放金额" />
        </el-form-item>
        <el-form-item label="发放KEY" prop="ddKey">
          <el-input v-model="form.ddKey" placeholder="请输入发放KEY" />
        </el-form-item>
        <el-form-item label="发放日期" prop="payoutDate">
          <el-date-picker clearable size="small"
            v-model="form.payoutDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择发放日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发放执行利率" prop="executeRate">
          <el-input v-model="form.executeRate" placeholder="请输入发放执行利率" />
        </el-form-item>
        <el-form-item label="发放币种" prop="currencyName">
          <el-input v-model="form.currencyName" placeholder="请输入发放币种" />
        </el-form-item>
        <el-form-item label="发放账号" prop="baseAcctNo">
          <el-input v-model="form.baseAcctNo" placeholder="请输入发放账号" />
        </el-form-item>
        <el-form-item label="发放账户类型" prop="acctType">
          <el-select v-model="form.acctType" placeholder="请选择发放账户类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="贷款余额" prop="outstanding">
          <el-input v-model="form.outstanding" placeholder="请输入贷款余额" />
        </el-form-item>
        <el-form-item label="贷款状态" prop="statusName">
          <el-input v-model="form.statusName" placeholder="请输入贷款状态" />
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
import { listZkrProjectLoanpayout, getZkrProjectLoanpayout, delZkrProjectLoanpayout, addZkrProjectLoanpayout, updateZkrProjectLoanpayout, exportZkrProjectLoanpayout } from "@/api/datavisual/zkrProjectLoanpayout";

export default {
  name: "ZkrProjectLoanpayout",
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
      // 项目贷款发放信息表格数据
      zkrProjectLoanpayoutList: [],
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
        loanNo: null,
        payoutId: null,
        ddAmt: null,
        ddKey: null,
        payoutDate: null,
        executeRate: null,
        currencyName: null,
        baseAcctNo: null,
        acctType: null,
        outstanding: null,
        statusName: null,
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
    /** 查询项目贷款发放信息列表 */
    getList() {
      this.loading = true;
      listZkrProjectLoanpayout(this.queryParams).then(response => {
        this.zkrProjectLoanpayoutList = response.rows;
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
        loanNo: null,
        payoutId: null,
        ddAmt: null,
        ddKey: null,
        payoutDate: null,
        executeRate: null,
        currencyName: null,
        baseAcctNo: null,
        acctType: null,
        outstanding: null,
        statusName: null,
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
      this.title = "添加项目贷款发放信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookBranch = row.bookBranch || this.ids
      getZkrProjectLoanpayout(bookBranch).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改项目贷款发放信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bookBranch != null) {
            updateZkrProjectLoanpayout(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectLoanpayout(this.form).then(response => {
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
      this.$confirm('是否确认删除项目贷款发放信息编号为"' + bookBranchs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrProjectLoanpayout(bookBranchs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有项目贷款发放信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZkrProjectLoanpayout(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
