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
      </el-form-item> -->
      <el-form-item label="客户名称" prop="crmCustName">
        <el-input
          v-model="queryParams.crmCustName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="股东类型" prop="stkhldType">
        <el-select v-model="queryParams.stkhldType" placeholder="请选择股东类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="出资地位" prop="investStatus">
        <el-select v-model="queryParams.investStatus" placeholder="请选择出资地位" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="出资日期" prop="contributiveDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.contributiveDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择出资日期">
        </el-date-picker>
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
      <el-form-item label="股东是否行内客户" prop="isInbankCust">
        <el-input
          v-model="queryParams.isInbankCust"
          placeholder="请输入股东是否行内客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="股东行内核心客户号" prop="partnerCustNo">
        <el-input
          v-model="queryParams.partnerCustNo"
          placeholder="请输入股东行内核心客户号"
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
          v-hasPermi="['survey:zkrCustPartner:add']"
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
          v-hasPermi="['survey:zkrCustPartner:edit']"
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
          v-hasPermi="['survey:zkrCustPartner:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrCustPartner:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrCustPartnerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构" align="center" prop="crmOrgId" />
      <el-table-column label="所属机构名称" align="center" prop="crmOrgName" />
      <el-table-column label="核心客户号" align="center" prop="crmEcCustNo" />
      <el-table-column label="客户名称" align="center" prop="crmCustName" /> -->
      <el-table-column label="股东名称" align="center" prop="stkhldName" />
      <el-table-column label="股东类型" align="center" prop="stkhldType" />
      <el-table-column label="出资地位" align="center" prop="investStatus" />
      <el-table-column label="出资日期" align="center" prop="contributiveDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.contributiveDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出资币种" align="center" prop="crrc" />
      <el-table-column label="出资金额" align="center" prop="subscribeContributiveAmt" />
      <el-table-column label="出资占比" align="center" prop="contributiveRatio" />
      <!-- <el-table-column label="股东是否行内客户" align="center" prop="isInbankCust" />
      <el-table-column label="股东行内核心客户号" align="center" prop="partnerCustNo" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrCustPartner:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrCustPartner:remove']"
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
        <el-form-item label="股东名称" prop="stkhldName">
          <el-input v-model="form.stkhldName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="股东类型" prop="stkhldType">
          <el-select v-model="form.stkhldType" placeholder="请选择股东类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="出资地位">
          <el-radio-group v-model="form.investStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出资日期" prop="contributiveDate">
          <el-date-picker clearable size="small"
            v-model="form.contributiveDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出资日期">
          </el-date-picker>
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
        <el-form-item label="股东是否行内客户" prop="isInbankCust">
          <el-input v-model="form.isInbankCust" placeholder="请输入股东是否行内客户" />
        </el-form-item>
        <el-form-item label="股东行内核心客户号" prop="partnerCustNo">
          <el-input v-model="form.partnerCustNo" placeholder="请输入股东行内核心客户号" />
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
import { listZkrCustPartner, getZkrCustPartner, delZkrCustPartner, addZkrCustPartner, updateZkrCustPartner, exportZkrCustPartner } from "@/api/survey/zkrCustPartner";

export default {
  name: "ZkrCustPartner",
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
      zkrCustPartnerList: [],
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
        investStatus: null,
        contributiveDate: null,
        crrc: null,
        subscribeContributiveAmt: null,
        contributiveRatio: null,
        isInbankCust: null,
        partnerCustNo: null,
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
      listZkrCustPartner(this.queryParams).then(response => {
        this.zkrCustPartnerList = response.rows;
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
        investStatus: "0",
        contributiveDate: null,
        crrc: null,
        subscribeContributiveAmt: null,
        contributiveRatio: null,
        isInbankCust: null,
        partnerCustNo: null,
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
      getZkrCustPartner(crmOrgId).then(response => {
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
            updateZkrCustPartner(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrCustPartner(this.form).then(response => {
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
          return delZkrCustPartner(crmOrgIds);
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
          return exportZkrCustPartner(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
