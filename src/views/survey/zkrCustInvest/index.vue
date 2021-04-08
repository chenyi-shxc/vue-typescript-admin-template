<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="所属机构" prop="crmOrgId">
        <el-input
          v-model="queryParams.crmOrgId"
          placeholder="请输入所属机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核心客户号" prop="crmEcCustNo">
        <el-input
          v-model="queryParams.crmEcCustNo"
          placeholder="请输入核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="crmCustName">
        <el-input
          v-model="queryParams.crmCustName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出资单位描述" prop="stkhldType">
        <el-select v-model="queryParams.stkhldType" placeholder="请选择出资单位描述" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="投资人名称" prop="investorName">
        <el-input
          v-model="queryParams.investorName"
          placeholder="请输入投资人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业状态" prop="corpStatus">
        <el-select v-model="queryParams.corpStatus" placeholder="请选择企业状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="出资金额" prop="subscribeContributiveAmt">
        <el-input
          v-model="queryParams.subscribeContributiveAmt"
          placeholder="请输入出资金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出资占比" prop="contributiveRatio">
        <el-input
          v-model="queryParams.contributiveRatio"
          placeholder="请输入出资占比"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被投资人是否行内客户" prop="isInbankCust">
        <el-input
          v-model="queryParams.isInbankCust"
          placeholder="请输入被投资人是否行内客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被投资人行内核心客户号" prop="investCustNo">
        <el-input
          v-model="queryParams.investCustNo"
          placeholder="请输入被投资人行内核心客户号"
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
          v-hasPermi="['survey:zkrCustInvest:add']"
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
          v-hasPermi="['survey:zkrCustInvest:edit']"
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
          v-hasPermi="['survey:zkrCustInvest:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrCustInvest:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrCustInvestList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构" align="center" prop="crmOrgId" />
      <el-table-column label="所属机构名称" align="center" prop="crmOrgName" />
      <el-table-column label="核心客户号" align="center" prop="crmEcCustNo" />
      <el-table-column label="客户名称" align="center" prop="crmCustName" /> -->
      <el-table-column label="被投资客户名称" align="center" prop="stkhldName" />
      <!-- <el-table-column label="出资单位描述" align="center" prop="stkhldType" /> -->
      <el-table-column label="投资人名称" align="center" prop="investorName" />
      <el-table-column label="企业状态" align="center" prop="corpStatus" />
      <el-table-column label="出资币种" align="center" prop="crrc" />
      <el-table-column label="出资金额" align="center" prop="subscribeContributiveAmt" />
      <el-table-column label="出资占比" align="center" prop="contributiveRatio" />
      <!-- <el-table-column label="被投资人是否行内客户" align="center" prop="isInbankCust" />
      <el-table-column label="被投资人行内核心客户号" align="center" prop="investCustNo" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrCustInvest:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrCustInvest:remove']"
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
        <el-form-item label="所属机构" prop="crmOrgId">
          <el-input v-model="form.crmOrgId" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="crmOrgName">
          <el-input v-model="form.crmOrgName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="crmEcCustNo">
          <el-input v-model="form.crmEcCustNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="crmCustName">
          <el-input v-model="form.crmCustName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="被投资客户名称" prop="stkhldName">
          <el-input v-model="form.stkhldName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="出资单位描述" prop="stkhldType">
          <el-select v-model="form.stkhldType" placeholder="请选择出资单位描述">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="投资人名称" prop="investorName">
          <el-input v-model="form.investorName" placeholder="请输入投资人名称" />
        </el-form-item>
        <el-form-item label="企业状态">
          <el-radio-group v-model="form.corpStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出资币种" prop="crrc">
          <el-input v-model="form.crrc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="出资金额" prop="subscribeContributiveAmt">
          <el-input v-model="form.subscribeContributiveAmt" placeholder="请输入出资金额" />
        </el-form-item>
        <el-form-item label="出资占比" prop="contributiveRatio">
          <el-input v-model="form.contributiveRatio" placeholder="请输入出资占比" />
        </el-form-item>
        <el-form-item label="被投资人是否行内客户" prop="isInbankCust">
          <el-input v-model="form.isInbankCust" placeholder="请输入被投资人是否行内客户" />
        </el-form-item>
        <el-form-item label="被投资人行内核心客户号" prop="investCustNo">
          <el-input v-model="form.investCustNo" placeholder="请输入被投资人行内核心客户号" />
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
import { listZkrCustInvest, getZkrCustInvest, delZkrCustInvest, addZkrCustInvest, updateZkrCustInvest, exportZkrCustInvest } from "@/api/survey/zkrCustInvest";

export default {
  name: "ZkrCustInvest",
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
      zkrCustInvestList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        crmOrgId: null,
        crmOrgName: null,
        crmEcCustNo: null,
        crmCustName: null,
        stkhldName: null,
        stkhldType: null,
        investorName: null,
        corpStatus: null,
        crrc: null,
        subscribeContributiveAmt: null,
        contributiveRatio: null,
        isInbankCust: null,
        investCustNo: null,
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
      listZkrCustInvest(this.queryParams).then(response => {
        this.zkrCustInvestList = response.rows;
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
        crmOrgId: null,
        crmOrgName: null,
        crmEcCustNo: null,
        crmCustName: null,
        stkhldName: null,
        stkhldType: null,
        investorName: null,
        corpStatus: "0",
        crrc: null,
        subscribeContributiveAmt: null,
        contributiveRatio: null,
        isInbankCust: null,
        investCustNo: null,
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
      this.ids = selection.map(item => item.crmOrgId)
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
      const crmOrgId = row.crmOrgId || this.ids
      getZkrCustInvest(crmOrgId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.crmOrgId != null) {
            updateZkrCustInvest(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrCustInvest(this.form).then(response => {
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
      const crmOrgIds = row.crmOrgId || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + crmOrgIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrCustInvest(crmOrgIds);
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
          return exportZkrCustInvest(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
