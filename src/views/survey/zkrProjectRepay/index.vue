<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="所属机构" prop="bookBranch">
        <el-input
          v-model="queryParams.bookBranch"
          placeholder="请输入所属机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="所属机构名称" prop="branchName">
        <el-input
          v-model="queryParams.branchName"
          placeholder="请输入所属机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="核心客户号" prop="custNo">
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
      <el-form-item label="贷款号" prop="loanNo">
        <el-input
          v-model="queryParams.loanNo"
          placeholder="请输入贷款号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本息回收ID" prop="repayId">
        <el-input
          v-model="queryParams.repayId"
          placeholder="请输入本息回收ID"
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
      <el-form-item label="回收号" prop="receiptNo">
        <el-input
          v-model="queryParams.receiptNo"
          placeholder="请输入回收号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="回收时间" prop="receiptDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.receiptDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择回收时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="回收金额" prop="repayAmt">
        <el-input
          v-model="queryParams.repayAmt"
          placeholder="请输入回收金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回收账号" prop="baseAcctNo">
        <el-input
          v-model="queryParams.baseAcctNo"
          placeholder="请输入回收账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="逾期警告" prop="overduwWarn">
        <el-input
          v-model="queryParams.overduwWarn"
          placeholder="请输入逾期警告"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本息通知单单号" prop="invoiceTranNo">
        <el-input
          v-model="queryParams.invoiceTranNo"
          placeholder="请输入本息通知单单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="本息通知单类型" prop="invoiceType">
        <el-select v-model="queryParams.invoiceType" placeholder="请选择本息通知单类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
      <el-form-item label="逾期天数" prop="receiptDays">
        <el-input
          v-model="queryParams.receiptDays"
          placeholder="请输入逾期天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="逾期天数" prop="receiptTypeName">
        <el-input
          v-model="queryParams.receiptTypeName"
          placeholder="请输入逾期天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['survey:zkrProjectRepay:add']"
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
          v-hasPermi="['survey:zkrProjectRepay:edit']"
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
          v-hasPermi="['survey:zkrProjectRepay:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrProjectRepay:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectRepayList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" /> -->
      <el-table-column label="合同号" align="center" prop="contractNo" />
      <el-table-column label="贷款号" align="center" prop="loanNo" />
      <!-- <el-table-column label="本息回收ID" align="center" prop="repayId" />
      <el-table-column label="发放KEY" align="center" prop="ddKey" /> -->
      <el-table-column label="回收号" align="center" prop="receiptNo" />
      <el-table-column label="回收时间" align="center" prop="receiptDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.receiptDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="币种" align="center" prop="ccyDesc" />
      <el-table-column label="回收金额" align="center" prop="repayAmt" />
      <el-table-column label="回收账号" align="center" prop="baseAcctNo" />
      <el-table-column label="逾期警告" align="center" prop="overduwWarn" />
      <el-table-column label="本息通知单单号" width="255" align="center" prop="invoiceTranNo" />
      <el-table-column label="本息通知单类型"  width="255" align="center" prop="invoiceType" />
      <el-table-column label="本息通知单类型名称"  width="255" align="center" prop="invoiceTypeName" />
      <!-- <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="逾期天数" align="center" prop="receiptDays" />
      <el-table-column label="逾期天数" align="center" prop="receiptTypeName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrProjectRepay:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrProjectRepay:remove']"
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
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
        <el-form-item label="贷款号" prop="loanNo">
          <el-input v-model="form.loanNo" placeholder="请输入贷款号" />
        </el-form-item>
        <el-form-item label="本息回收ID" prop="repayId">
          <el-input v-model="form.repayId" placeholder="请输入本息回收ID" />
        </el-form-item>
        <el-form-item label="发放KEY" prop="ddKey">
          <el-input v-model="form.ddKey" placeholder="请输入发放KEY" />
        </el-form-item>
        <el-form-item label="回收号" prop="receiptNo">
          <el-input v-model="form.receiptNo" placeholder="请输入回收号" />
        </el-form-item>
        <el-form-item label="回收时间" prop="receiptDate">
          <el-date-picker clearable size="small"
            v-model="form.receiptDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择回收时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="币种" prop="ccyDesc">
          <el-input v-model="form.ccyDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="回收金额" prop="repayAmt">
          <el-input v-model="form.repayAmt" placeholder="请输入回收金额" />
        </el-form-item>
        <el-form-item label="回收账号" prop="baseAcctNo">
          <el-input v-model="form.baseAcctNo" placeholder="请输入回收账号" />
        </el-form-item>
        <el-form-item label="逾期警告" prop="overduwWarn">
          <el-input v-model="form.overduwWarn" placeholder="请输入逾期警告" />
        </el-form-item>
        <el-form-item label="本息通知单单号" prop="invoiceTranNo">
          <el-input v-model="form.invoiceTranNo" placeholder="请输入本息通知单单号" />
        </el-form-item>
        <el-form-item label="本息通知单类型" prop="invoiceType">
          <el-select v-model="form.invoiceType" placeholder="请选择本息通知单类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="本息通知单类型名称" prop="invoiceTypeName">
          <el-input v-model="form.invoiceTypeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="数据来源" prop="ds">
          <el-input v-model="form.ds" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="数据时点" prop="dd">
          <el-input v-model="form.dd" placeholder="请输入数据时点" />
        </el-form-item>
        <el-form-item label="逾期天数" prop="receiptDays">
          <el-input v-model="form.receiptDays" placeholder="请输入逾期天数" />
        </el-form-item>
        <el-form-item label="逾期天数" prop="receiptTypeName">
          <el-input v-model="form.receiptTypeName" placeholder="请输入逾期天数" />
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
import { listZkrProjectRepay, getZkrProjectRepay, delZkrProjectRepay, addZkrProjectRepay, updateZkrProjectRepay, exportZkrProjectRepay } from "@/api/survey/zkrProjectRepay";

export default {
  name: "ZkrProjectRepay",
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
      // 【请填写功能名称】表格数据
      zkrProjectRepayList: [],
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
        repayId: null,
        ddKey: null,
        receiptNo: null,
        receiptDate: null,
        ccyDesc: null,
        repayAmt: null,
        baseAcctNo: null,
        overduwWarn: null,
        invoiceTranNo: null,
        invoiceType: null,
        invoiceTypeName: null,
        ds: null,
        dd: null,
        receiptDays: null,
        receiptTypeName: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listZkrProjectRepay(this.queryParams).then(response => {
        this.zkrProjectRepayList = response.rows;
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
        repayId: null,
        ddKey: null,
        receiptNo: null,
        receiptDate: null,
        ccyDesc: null,
        repayAmt: null,
        baseAcctNo: null,
        overduwWarn: null,
        invoiceTranNo: null,
        invoiceType: null,
        invoiceTypeName: null,
        ds: null,
        dd: null,
        receiptDays: null,
        receiptTypeName: null
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookBranch = row.bookBranch || this.ids
      getZkrProjectRepay(bookBranch).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bookBranch != null) {
            updateZkrProjectRepay(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectRepay(this.form).then(response => {
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
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + bookBranchs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrProjectRepay(bookBranchs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZkrProjectRepay(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
