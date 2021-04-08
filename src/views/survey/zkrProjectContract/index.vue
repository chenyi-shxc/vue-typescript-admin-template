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
      </el-form-item> -->
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
      <!-- <el-form-item label="合同类型" prop="bizTypeName">
        <el-input
          v-model="queryParams.bizTypeName"
          placeholder="请输入合同类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同币种" prop="currencyCd">
        <el-input
          v-model="queryParams.currencyCd"
          placeholder="请输入合同币种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同金额" prop="contractAmt">
        <el-input
          v-model="queryParams.contractAmt"
          placeholder="请输入合同金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合同金额" prop="contractAmtRmb">
        <el-input
          v-model="queryParams.contractAmtRmb"
          placeholder="请输入合同金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="合同签订日期" prop="signDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.signDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择合同签订日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="合同结束日期" prop="endDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择合同结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同期限" prop="loanTerm">
        <el-input
          v-model="queryParams.loanTerm"
          placeholder="请输入合同期限"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="贷款余额" prop="changeOutstanding">
        <el-input
          v-model="queryParams.changeOutstanding"
          placeholder="请输入贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="担保方式" prop="guarantyName">
        <el-input
          v-model="queryParams.guarantyName"
          placeholder="请输入担保方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="首笔发放日期" prop="firstTranDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.firstTranDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择首笔发放日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最新资产质量分类" prop="headIdentifiedClass">
        <el-input
          v-model="queryParams.headIdentifiedClass"
          placeholder="请输入最新资产质量分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="业务类型" prop="bussType">
        <el-select v-model="queryParams.bussType" placeholder="请选择业务类型" clearable size="small">
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
          v-hasPermi="['survey:zkrProjectContract:add']"
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
          v-hasPermi="['survey:zkrProjectContract:edit']"
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
          v-hasPermi="['survey:zkrProjectContract:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrProjectContract:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectContractList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <!-- <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" /> -->
      <el-table-column label="合同号" align="center" prop="contractNo" />
      <el-table-column label="合同类型" align="center" prop="bizTypeName" />
      <el-table-column label="合同币种" align="center" prop="currencyCd" />
      <el-table-column label="合同金额" align="center" prop="contractAmt" />
      <el-table-column label="合同金额" align="center" prop="contractAmtRmb" />
      <el-table-column label="合同签订日期" align="center" prop="signDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.signDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束日期" align="center" prop="endDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同期限" align="center" prop="loanTerm" />
      <el-table-column label="贷款余额" align="center" prop="outstanding" />
      <el-table-column label="贷款余额" align="center" prop="changeOutstanding" />
      <!-- <el-table-column label="担保方式" align="center" prop="guarantyName" />
      <el-table-column label="首笔发放日期" align="center" prop="firstTranDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.firstTranDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新资产质量分类" align="center" prop="headIdentifiedClass" />
      <el-table-column label="业务类型" align="center" prop="bussType" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrProjectContract:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrProjectContract:remove']"
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
        <el-form-item label="合同类型" prop="bizTypeName">
          <el-input v-model="form.bizTypeName" placeholder="请输入合同类型" />
        </el-form-item>
        <el-form-item label="合同币种" prop="currencyCd">
          <el-input v-model="form.currencyCd" placeholder="请输入合同币种" />
        </el-form-item>
        <el-form-item label="合同金额" prop="contractAmt">
          <el-input v-model="form.contractAmt" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="合同金额" prop="contractAmtRmb">
          <el-input v-model="form.contractAmtRmb" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="合同签订日期" prop="signDate">
          <el-date-picker clearable size="small"
            v-model="form.signDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合同签订日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同结束日期" prop="endDate">
          <el-date-picker clearable size="small"
            v-model="form.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合同结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同期限" prop="loanTerm">
          <el-input v-model="form.loanTerm" placeholder="请输入合同期限" />
        </el-form-item>
        <el-form-item label="贷款余额" prop="outstanding">
          <el-input v-model="form.outstanding" placeholder="请输入贷款余额" />
        </el-form-item>
        <el-form-item label="贷款余额" prop="changeOutstanding">
          <el-input v-model="form.changeOutstanding" placeholder="请输入贷款余额" />
        </el-form-item>
        <el-form-item label="担保方式" prop="guarantyName">
          <el-input v-model="form.guarantyName" placeholder="请输入担保方式" />
        </el-form-item>
        <el-form-item label="首笔发放日期" prop="firstTranDate">
          <el-date-picker clearable size="small"
            v-model="form.firstTranDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择首笔发放日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最新资产质量分类" prop="headIdentifiedClass">
          <el-input v-model="form.headIdentifiedClass" placeholder="请输入最新资产质量分类" />
        </el-form-item>
        <el-form-item label="业务类型" prop="bussType">
          <el-select v-model="form.bussType" placeholder="请选择业务类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
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
import { listZkrProjectContract, getZkrProjectContract, delZkrProjectContract, addZkrProjectContract, updateZkrProjectContract, exportZkrProjectContract } from "@/api/survey/zkrProjectContract";

export default {
  name: "ZkrProjectContract",
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
      zkrProjectContractList: [],
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
        bizTypeName: null,
        currencyCd: null,
        contractAmt: null,
        contractAmtRmb: null,
        signDate: null,
        endDate: null,
        loanTerm: null,
        outstanding: null,
        changeOutstanding: null,
        guarantyName: null,
        firstTranDate: null,
        headIdentifiedClass: null,
        bussType: null,
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listZkrProjectContract(this.queryParams).then(response => {
        this.zkrProjectContractList = response.rows;
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
        bizTypeName: null,
        currencyCd: null,
        contractAmt: null,
        contractAmtRmb: null,
        signDate: null,
        endDate: null,
        loanTerm: null,
        outstanding: null,
        changeOutstanding: null,
        guarantyName: null,
        firstTranDate: null,
        headIdentifiedClass: null,
        bussType: null,
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookBranch = row.bookBranch || this.ids
      getZkrProjectContract(bookBranch).then(response => {
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
            updateZkrProjectContract(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectContract(this.form).then(response => {
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
          return delZkrProjectContract(bookBranchs);
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
          return exportZkrProjectContract(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
