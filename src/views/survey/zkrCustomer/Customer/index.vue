<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属机构" prop="crmOrgId">
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
      <el-form-item label="组织机构代码" prop="crmOrgCode">
        <el-input
          v-model="queryParams.crmOrgCode"
          placeholder="请输入组织机构代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业规模" prop="crmEnterpriseScope">
        <el-input
          v-model="queryParams.crmEnterpriseScope"
          placeholder="请输入企业规模"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="最新信用等级" prop="crmCreditLevel">
        <el-input
          v-model="queryParams.crmCreditLevel"
          placeholder="请输入最新信用等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户分类" prop="crmCustCategName">
        <el-input
          v-model="queryParams.crmCustCategName"
          placeholder="请输入客户分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="usccNo">
        <el-input
          v-model="queryParams.usccNo"
          placeholder="请输入统一社会信用代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户所属行业" prop="crmIndustryType">
        <el-select v-model="queryParams.crmIndustryType" placeholder="请选择客户所属行业" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户所属行业大类" prop="industryCd">
        <el-input
          v-model="queryParams.industryCd"
          placeholder="请输入客户所属行业大类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册资本" prop="registerCapital">
        <el-input
          v-model="queryParams.registerCapital"
          placeholder="请输入注册资本"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="注册日期" prop="regDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.regDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择注册日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="经营期限" prop="licenceDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.licenceDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择经营期限">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="集团编号" prop="blocNo">
        <el-input
          v-model="queryParams.blocNo"
          placeholder="请输入集团编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="CRM客户号" prop="crmCustNo">
        <el-input
          v-model="queryParams.crmCustNo"
          placeholder="请输入CRM客户号"
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
          v-hasPermi="['survey:zkrCustomer:add']"
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
          v-hasPermi="['survey:zkrCustomer:edit']"
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
          v-hasPermi="['survey:zkrCustomer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrCustomer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrCustomerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="crmOrgId" />
      <el-table-column label="所属机构名称" align="center" width="100" prop="crmOrgName" />
      <el-table-column label="客户名称" align="center" prop="crmCustName" />
      <el-table-column label="客户英文名称" width="100" align="center" prop="crmEnFullName" />
      <el-table-column label="客户简称" align="center" prop="crmCnShortName" />
      <el-table-column label="核心客户号" width="100" align="center" prop="crmEcCustNo" />
      <el-table-column label="组织机构代码" width="100" align="center" prop="crmOrgCode" />
      <el-table-column label="企业规模" align="center" prop="crmEnterpriseScope" />
      <el-table-column label="最新信用等级" width="100" align="center" prop="crmCreditLevel" />
      <el-table-column label="客户分类" align="center" prop="crmCustCategName" />
      <el-table-column label="统一社会信用代码" width="100" align="center" prop="usccNo" />
      <el-table-column label="法人代表" align="center" prop="crmLegalPerson" />
      <el-table-column label="法人代表证件类型" width="200" align="center" prop="crmLegalPsIdName" />
      <el-table-column label="法人代表证件号" width="200" align="center" prop="crmLegalPsIdNo" />
      <el-table-column label="财务负责人姓名" width="200" align="center" prop="financePerson" />
      <el-table-column label="财务负责人证件类型" width="200" align="center" prop="financePsIdName" />
      <el-table-column label="财务负责人证件号" width="200" align="center" prop="financePsIdNo" />
      <el-table-column label="企业出资人经济成分" width="200" align="center" prop="crmEconomicSectorName" />
      <el-table-column label="客户所属行业" width="100" align="center" prop="crmIndustryType" />
      <el-table-column label="客户所属行业名称" width="100" align="center" prop="crmIndustryTypeName" />
      <el-table-column label="客户所属行业大类" width="100" align="center" prop="industryCd" />
      <el-table-column label="客户所属行业大类名称" width="150" align="center" prop="industryCdName" />
      <el-table-column label="注册币种" align="center" prop="rcCurrency" />
      <el-table-column label="注册资本" align="center" prop="registerCapital" />
      <el-table-column label="注册日期" align="center" prop="regDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.regDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册地址" align="center" prop="registerAddress" />
      <el-table-column label="经营期限" align="center" prop="licenceDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.licenceDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主营业务" align="center" prop="mosiBusiness" />
      <el-table-column label="集团编号" align="center" prop="blocNo" />
      <el-table-column label="集团名称" align="center" prop="blocName" />
      <!-- <el-table-column label="客户行内角色名称" align="center" prop="typeName" />
      <el-table-column label="CRM客户号" align="center" prop="crmCustNo" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrCustomer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrCustomer:remove']"
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

    <!-- 添加或修改客户基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属机构" prop="crmOrgId">
          <el-input v-model="form.crmOrgId" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="crmOrgName">
          <el-input v-model="form.crmOrgName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户名称" prop="crmCustName">
          <el-input v-model="form.crmCustName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户英文名称" prop="crmEnFullName">
          <el-input v-model="form.crmEnFullName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户简称" prop="crmCnShortName">
          <el-input v-model="form.crmCnShortName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="crmEcCustNo">
          <el-input v-model="form.crmEcCustNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="组织机构代码" prop="crmOrgCode">
          <el-input v-model="form.crmOrgCode" placeholder="请输入组织机构代码" />
        </el-form-item>
        <el-form-item label="企业规模" prop="crmEnterpriseScope">
          <el-input v-model="form.crmEnterpriseScope" placeholder="请输入企业规模" />
        </el-form-item>
        <el-form-item label="最新信用等级" prop="crmCreditLevel">
          <el-input v-model="form.crmCreditLevel" placeholder="请输入最新信用等级" />
        </el-form-item>
        <el-form-item label="客户分类" prop="crmCustCategName">
          <el-input v-model="form.crmCustCategName" placeholder="请输入客户分类" />
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="usccNo">
          <el-input v-model="form.usccNo" placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="法人代表" prop="crmLegalPerson">
          <el-input v-model="form.crmLegalPerson" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="法人代表证件类型" prop="crmLegalPsIdName">
          <el-input v-model="form.crmLegalPsIdName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="法人代表证件号" prop="crmLegalPsIdNo">
          <el-input v-model="form.crmLegalPsIdNo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="财务负责人姓名" prop="financePerson">
          <el-input v-model="form.financePerson" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="财务负责人证件类型" prop="financePsIdName">
          <el-input v-model="form.financePsIdName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="财务负责人证件号" prop="financePsIdNo">
          <el-input v-model="form.financePsIdNo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="企业出资人经济成分" prop="crmEconomicSectorName">
          <el-input v-model="form.crmEconomicSectorName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户所属行业" prop="crmIndustryType">
          <el-select v-model="form.crmIndustryType" placeholder="请选择客户所属行业">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户所属行业名称" prop="crmIndustryTypeName">
          <el-input v-model="form.crmIndustryTypeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户所属行业大类" prop="industryCd">
          <el-input v-model="form.industryCd" placeholder="请输入客户所属行业大类" />
        </el-form-item>
        <el-form-item label="客户所属行业大类名称" prop="industryCdName">
          <el-input v-model="form.industryCdName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="注册币种" prop="rcCurrency">
          <el-input v-model="form.rcCurrency" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="注册资本" prop="registerCapital">
          <el-input v-model="form.registerCapital" placeholder="请输入注册资本" />
        </el-form-item>
        <el-form-item label="注册日期" prop="regDate">
          <el-date-picker clearable size="small"
            v-model="form.regDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择注册日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="注册地址" prop="registerAddress">
          <el-input v-model="form.registerAddress" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="经营期限" prop="licenceDate">
          <el-date-picker clearable size="small"
            v-model="form.licenceDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择经营期限">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="主营业务" prop="mosiBusiness">
          <el-input v-model="form.mosiBusiness" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="集团编号" prop="blocNo">
          <el-input v-model="form.blocNo" placeholder="请输入集团编号" />
        </el-form-item>
        <el-form-item label="集团名称" prop="blocName">
          <el-input v-model="form.blocName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户行内角色名称" prop="typeName">
          <el-input v-model="form.typeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="CRM客户号" prop="crmCustNo">
          <el-input v-model="form.crmCustNo" placeholder="请输入CRM客户号" />
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
import { listZkrCustomer, getZkrCustomer, delZkrCustomer, addZkrCustomer, updateZkrCustomer, exportZkrCustomer } from "@/api/survey/zkrCustomer";

export default {
  name: "ZkrCustomer",
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
      // 客户基本信息表格数据
      zkrCustomerList: [],
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
        crmCustName: null,
        crmEnFullName: null,
        crmCnShortName: null,
        crmEcCustNo: null,
        crmOrgCode: null,
        crmEnterpriseScope: null,
        crmCreditLevel: null,
        crmCustCategName: null,
        usccNo: null,
        crmLegalPerson: null,
        crmLegalPsIdName: null,
        crmLegalPsIdNo: null,
        financePerson: null,
        financePsIdName: null,
        financePsIdNo: null,
        crmEconomicSectorName: null,
        crmIndustryType: null,
        crmIndustryTypeName: null,
        industryCd: null,
        industryCdName: null,
        rcCurrency: null,
        registerCapital: null,
        regDate: null,
        registerAddress: null,
        licenceDate: null,
        mosiBusiness: null,
        blocNo: null,
        blocName: null,
        typeName: null,
        crmCustNo: null,
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
    /** 查询客户基本信息列表 */
    getList() {
      this.loading = true;
      listZkrCustomer(this.queryParams).then(response => {
        this.zkrCustomerList = response.rows;
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
        crmCustName: null,
        crmEnFullName: null,
        crmCnShortName: null,
        crmEcCustNo: null,
        crmOrgCode: null,
        crmEnterpriseScope: null,
        crmCreditLevel: null,
        crmCustCategName: null,
        usccNo: null,
        crmLegalPerson: null,
        crmLegalPsIdName: null,
        crmLegalPsIdNo: null,
        financePerson: null,
        financePsIdName: null,
        financePsIdNo: null,
        crmEconomicSectorName: null,
        crmIndustryType: null,
        crmIndustryTypeName: null,
        industryCd: null,
        industryCdName: null,
        rcCurrency: null,
        registerCapital: null,
        regDate: null,
        registerAddress: null,
        licenceDate: null,
        mosiBusiness: null,
        blocNo: null,
        blocName: null,
        typeName: null,
        crmCustNo: null,
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
      this.title = "添加客户基本信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const crmOrgId = row.crmOrgId || this.ids
      getZkrCustomer(crmOrgId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改客户基本信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.crmOrgId != null) {
            updateZkrCustomer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrCustomer(this.form).then(response => {
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
      this.$confirm('是否确认删除客户基本信息编号为"' + crmOrgIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrCustomer(crmOrgIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有客户基本信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZkrCustomer(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
