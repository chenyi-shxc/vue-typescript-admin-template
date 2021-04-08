<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="所属机构代码" prop="orgNo">
        <el-input
          v-model="queryParams.orgNo"
          placeholder="请输入所属机构代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属机构名称" prop="orgName">
        <el-input
          v-model="queryParams.orgName"
          placeholder="请输入所属机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批量转让年份" prop="transferYear">
        <el-input
          v-model="queryParams.transferYear"
          placeholder="请输入批量转让年份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次" prop="transferBatch">
        <el-input
          v-model="queryParams.transferBatch"
          placeholder="请输入批次"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产类型" prop="assetType">
        <el-select v-model="queryParams.assetType" placeholder="请选择资产类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="资产类型名称" prop="assetTypeName">
        <el-input
          v-model="queryParams.assetTypeName"
          placeholder="请输入资产类型名称"
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
      <el-form-item label="客户名称" prop="custName">
        <el-input
          v-model="queryParams.custName"
          placeholder="请输入客户名称"
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
      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="币种" prop="ccy">
        <el-input
          v-model="queryParams.ccy"
          placeholder="请输入币种"
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
      <el-form-item label="贷款余额" prop="outstanding">
        <el-input
          v-model="queryParams.outstanding"
          placeholder="请输入贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="拖欠本金" prop="principalAmt">
        <el-input
          v-model="queryParams.principalAmt"
          placeholder="请输入拖欠本金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="拖欠利息" prop="interestAmt">
        <el-input
          v-model="queryParams.interestAmt"
          placeholder="请输入拖欠利息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代垫费用" prop="feeAmt">
        <el-input
          v-model="queryParams.feeAmt"
          placeholder="请输入代垫费用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对口分局" prop="auditOrg">
        <el-input
          v-model="queryParams.auditOrg"
          placeholder="请输入对口分局"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主键" prop="transferId">
        <el-input
          v-model="queryParams.transferId"
          placeholder="请输入主键"
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
          v-hasPermi="['survey:zkrProjectTransfer:add']"
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
          v-hasPermi="['survey:zkrProjectTransfer:edit']"
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
          v-hasPermi="['survey:zkrProjectTransfer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrProjectTransfer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectTransferList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构代码" width="255" align="center" prop="orgNo" />
      <el-table-column label="所属机构名称" width="255"  align="center" prop="orgName" />
      <el-table-column label="批量转让年份" width="255"  align="center" prop="transferYear" />
      <el-table-column label="批次" align="center" prop="transferBatch" />
      <el-table-column label="资产类型" align="center" prop="assetType" />
      <el-table-column label="资产类型名称" width="255"  align="center" prop="assetTypeName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="币种" align="center" prop="ccy" />
      <el-table-column label="合同金额" align="center" prop="contractAmt" />
      <el-table-column label="贷款余额" align="center" prop="outstanding" />
      <el-table-column label="拖欠本金" align="center" prop="principalAmt" />
      <el-table-column label="拖欠利息" align="center" prop="interestAmt" />
      <el-table-column label="代垫费用" align="center" prop="feeAmt" />
      <el-table-column label="备注" align="center" prop="mark" />
      <el-table-column label="对口分局" align="center" prop="auditOrg" />
      <!-- <el-table-column label="主键" align="center" prop="transferId" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrProjectTransfer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrProjectTransfer:remove']"
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
        <el-form-item label="所属机构代码" prop="orgNo">
          <el-input v-model="form.orgNo" placeholder="请输入所属机构代码" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="orgName">
          <el-input v-model="form.orgName" placeholder="请输入所属机构名称" />
        </el-form-item>
        <el-form-item label="批量转让年份" prop="transferYear">
          <el-input v-model="form.transferYear" placeholder="请输入批量转让年份" />
        </el-form-item>
        <el-form-item label="批次" prop="transferBatch">
          <el-input v-model="form.transferBatch" placeholder="请输入批次" />
        </el-form-item>
        <el-form-item label="资产类型" prop="assetType">
          <el-select v-model="form.assetType" placeholder="请选择资产类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="资产类型名称" prop="assetTypeName">
          <el-input v-model="form.assetTypeName" placeholder="请输入资产类型名称" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="custNo">
          <el-input v-model="form.custNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="custName">
          <el-input v-model="form.custName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNo">
          <el-input v-model="form.projectNo" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="币种" prop="ccy">
          <el-input v-model="form.ccy" placeholder="请输入币种" />
        </el-form-item>
        <el-form-item label="合同金额" prop="contractAmt">
          <el-input v-model="form.contractAmt" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="贷款余额" prop="outstanding">
          <el-input v-model="form.outstanding" placeholder="请输入贷款余额" />
        </el-form-item>
        <el-form-item label="拖欠本金" prop="principalAmt">
          <el-input v-model="form.principalAmt" placeholder="请输入拖欠本金" />
        </el-form-item>
        <el-form-item label="拖欠利息" prop="interestAmt">
          <el-input v-model="form.interestAmt" placeholder="请输入拖欠利息" />
        </el-form-item>
        <el-form-item label="代垫费用" prop="feeAmt">
          <el-input v-model="form.feeAmt" placeholder="请输入代垫费用" />
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input v-model="form.mark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="对口分局" prop="auditOrg">
          <el-input v-model="form.auditOrg" placeholder="请输入对口分局" />
        </el-form-item>
        <el-form-item label="主键" prop="transferId">
          <el-input v-model="form.transferId" placeholder="请输入主键" />
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
import { listZkrProjectTransfer, getZkrProjectTransfer, delZkrProjectTransfer, addZkrProjectTransfer, updateZkrProjectTransfer, exportZkrProjectTransfer } from "@/api/survey/zkrProjectTransfer";

export default {
  name: "ZkrProjectTransfer",
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
      zkrProjectTransferList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orgNo: null,
        orgName: null,
        transferYear: null,
        transferBatch: null,
        assetType: null,
        assetTypeName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        ccy: null,
        contractAmt: null,
        outstanding: null,
        principalAmt: null,
        interestAmt: null,
        feeAmt: null,
        mark: null,
        auditOrg: null,
        transferId: null,
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
      listZkrProjectTransfer(this.queryParams).then(response => {
        this.zkrProjectTransferList = response.rows;
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
        orgNo: null,
        orgName: null,
        transferYear: null,
        transferBatch: null,
        assetType: null,
        assetTypeName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        ccy: null,
        contractAmt: null,
        outstanding: null,
        principalAmt: null,
        interestAmt: null,
        feeAmt: null,
        mark: null,
        auditOrg: null,
        transferId: null,
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
      this.ids = selection.map(item => item.orgNo)
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
      const orgNo = row.orgNo || this.ids
      getZkrProjectTransfer(orgNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orgNo != null) {
            updateZkrProjectTransfer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectTransfer(this.form).then(response => {
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
      const orgNos = row.orgNo || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + orgNos + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrProjectTransfer(orgNos);
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
          return exportZkrProjectTransfer(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
