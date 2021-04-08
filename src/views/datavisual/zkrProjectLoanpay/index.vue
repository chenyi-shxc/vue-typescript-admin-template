<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="数据时点" prop="yearPayDate">
        <el-input
          v-model="queryParams.yearPayDate"
          placeholder="请输入数据时点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据时点" prop="payDateQ">
        <el-input
          v-model="queryParams.payDateQ"
          placeholder="请输入数据时点"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="支付编号" prop="payNo">
        <el-input
          v-model="queryParams.payNo"
          placeholder="请输入支付编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="币种" prop="currencyCd">
        <el-input
          v-model="queryParams.currencyCd"
          placeholder="请输入币种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付金额" prop="payAmt">
        <el-input
          v-model="queryParams.payAmt"
          placeholder="请输入支付金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付时间" prop="payDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.payDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择支付时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付类型" prop="payTypeName">
        <el-input
          v-model="queryParams.payTypeName"
          placeholder="请输入支付类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付形式" prop="payFormatName">
        <el-input
          v-model="queryParams.payFormatName"
          placeholder="请输入支付形式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款人核心客户号" prop="payerCustNo">
        <el-input
          v-model="queryParams.payerCustNo"
          placeholder="请输入付款人核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款方账号" prop="payAccountNo">
        <el-input
          v-model="queryParams.payAccountNo"
          placeholder="请输入付款方账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款人核心客户号" prop="receiverCustNo">
        <el-input
          v-model="queryParams.receiverCustNo"
          placeholder="请输入收款人核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款方账号" prop="receiveAccountNo">
        <el-input
          v-model="queryParams.receiveAccountNo"
          placeholder="请输入收款方账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行内/行外支付" prop="inbankType">
        <el-select v-model="queryParams.inbankType" placeholder="请选择行内/行外支付" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="资金支付ID" prop="payId">
        <el-input
          v-model="queryParams.payId"
          placeholder="请输入资金支付ID"
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
          v-hasPermi="['datavisual:zkrProjectLoanpay:add']"
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
          v-hasPermi="['datavisual:zkrProjectLoanpay:edit']"
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
          v-hasPermi="['datavisual:zkrProjectLoanpay:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datavisual:zkrProjectLoanpay:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectLoanpayList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="数据时点" align="center" prop="yearPayDate" />
      <el-table-column label="数据时点" align="center" prop="payDateQ" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="合同编号" align="center" prop="contractNo" />
      <el-table-column label="支付编号" align="center" prop="payNo" />
      <el-table-column label="币种" align="center" prop="currencyCd" />
      <el-table-column label="支付金额" align="center" prop="payAmt" />
      <el-table-column label="支付时间" align="center" prop="payDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付用途" align="center" prop="payPurpose" />
      <el-table-column label="支付类型" align="center" prop="payTypeName" />
      <el-table-column label="支付形式" align="center" prop="payFormatName" />
      <el-table-column label="付款人核心客户号" align="center" prop="payerCustNo" />
      <el-table-column label="付款人名称" align="center" prop="payName" />
      <el-table-column label="付款行" align="center" prop="sendBankName" />
      <el-table-column label="付款方账号" align="center" prop="payAccountNo" />
      <el-table-column label="收款人核心客户号" align="center" prop="receiverCustNo" />
      <el-table-column label="收款人名称" align="center" prop="receiveName" />
      <el-table-column label="收款行" align="center" prop="receiveBankName" />
      <el-table-column label="收款方账号" align="center" prop="receiveAccountNo" />
      <el-table-column label="收款人与付款人关联关系" align="center" prop="relationshipTypeName" />
      <el-table-column label="收款人与付款人关联关系" align="center" prop="relationOutside" />
      <el-table-column label="行内/行外支付" align="center" prop="inbankType" />
      <el-table-column label="资金支付ID" align="center" prop="payId" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['datavisual:zkrProjectLoanpay:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datavisual:zkrProjectLoanpay:remove']"
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

    <!-- 添加或修改项目资金支付信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="数据时点" prop="yearPayDate">
          <el-input v-model="form.yearPayDate" placeholder="请输入数据时点" />
        </el-form-item>
        <el-form-item label="数据时点" prop="payDateQ">
          <el-input v-model="form.payDateQ" placeholder="请输入数据时点" />
        </el-form-item>
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
        <el-form-item label="支付编号" prop="payNo">
          <el-input v-model="form.payNo" placeholder="请输入支付编号" />
        </el-form-item>
        <el-form-item label="币种" prop="currencyCd">
          <el-input v-model="form.currencyCd" placeholder="请输入币种" />
        </el-form-item>
        <el-form-item label="支付金额" prop="payAmt">
          <el-input v-model="form.payAmt" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="支付时间" prop="payDate">
          <el-date-picker clearable size="small"
            v-model="form.payDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付用途" prop="payPurpose">
          <el-input v-model="form.payPurpose" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="支付类型" prop="payTypeName">
          <el-input v-model="form.payTypeName" placeholder="请输入支付类型" />
        </el-form-item>
        <el-form-item label="支付形式" prop="payFormatName">
          <el-input v-model="form.payFormatName" placeholder="请输入支付形式" />
        </el-form-item>
        <el-form-item label="付款人核心客户号" prop="payerCustNo">
          <el-input v-model="form.payerCustNo" placeholder="请输入付款人核心客户号" />
        </el-form-item>
        <el-form-item label="付款人名称" prop="payName">
          <el-input v-model="form.payName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="付款行" prop="sendBankName">
          <el-input v-model="form.sendBankName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="付款方账号" prop="payAccountNo">
          <el-input v-model="form.payAccountNo" placeholder="请输入付款方账号" />
        </el-form-item>
        <el-form-item label="收款人核心客户号" prop="receiverCustNo">
          <el-input v-model="form.receiverCustNo" placeholder="请输入收款人核心客户号" />
        </el-form-item>
        <el-form-item label="收款人名称" prop="receiveName">
          <el-input v-model="form.receiveName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="收款行" prop="receiveBankName">
          <el-input v-model="form.receiveBankName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="收款方账号" prop="receiveAccountNo">
          <el-input v-model="form.receiveAccountNo" placeholder="请输入收款方账号" />
        </el-form-item>
        <el-form-item label="收款人与付款人关联关系" prop="relationshipTypeName">
          <el-input v-model="form.relationshipTypeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="收款人与付款人关联关系" prop="relationOutside">
          <el-input v-model="form.relationOutside" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="行内/行外支付" prop="inbankType">
          <el-select v-model="form.inbankType" placeholder="请选择行内/行外支付">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="资金支付ID" prop="payId">
          <el-input v-model="form.payId" placeholder="请输入资金支付ID" />
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
import { listZkrProjectLoanpay, getZkrProjectLoanpay, delZkrProjectLoanpay, addZkrProjectLoanpay, updateZkrProjectLoanpay, exportZkrProjectLoanpay } from "@/api/datavisual/zkrProjectLoanpay";

export default {
  name: "ZkrProjectLoanpay",
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
      // 项目资金支付信息表格数据
      zkrProjectLoanpayList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        yearPayDate: null,
        payDateQ: null,
        bookBranch: null,
        branchName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        contractNo: null,
        payNo: null,
        currencyCd: null,
        payAmt: null,
        payDate: null,
        payPurpose: null,
        payTypeName: null,
        payFormatName: null,
        payerCustNo: null,
        payName: null,
        sendBankName: null,
        payAccountNo: null,
        receiverCustNo: null,
        receiveName: null,
        receiveBankName: null,
        receiveAccountNo: null,
        relationshipTypeName: null,
        relationOutside: null,
        inbankType: null,
        payId: null,
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
    /** 查询项目资金支付信息列表 */
    getList() {
      this.loading = true;
      listZkrProjectLoanpay(this.queryParams).then(response => {
        this.zkrProjectLoanpayList = response.rows;
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
        yearPayDate: null,
        payDateQ: null,
        bookBranch: null,
        branchName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        contractNo: null,
        payNo: null,
        currencyCd: null,
        payAmt: null,
        payDate: null,
        payPurpose: null,
        payTypeName: null,
        payFormatName: null,
        payerCustNo: null,
        payName: null,
        sendBankName: null,
        payAccountNo: null,
        receiverCustNo: null,
        receiveName: null,
        receiveBankName: null,
        receiveAccountNo: null,
        relationshipTypeName: null,
        relationOutside: null,
        inbankType: null,
        payId: null,
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
      this.ids = selection.map(item => item.yearPayDate)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加项目资金支付信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const yearPayDate = row.yearPayDate || this.ids
      getZkrProjectLoanpay(yearPayDate).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改项目资金支付信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.yearPayDate != null) {
            updateZkrProjectLoanpay(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectLoanpay(this.form).then(response => {
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
      const yearPayDates = row.yearPayDate || this.ids;
      this.$confirm('是否确认删除项目资金支付信息编号为"' + yearPayDates + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrProjectLoanpay(yearPayDates);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有项目资金支付信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZkrProjectLoanpay(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
