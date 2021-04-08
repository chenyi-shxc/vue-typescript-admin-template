<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="GID" prop="gid">
        <el-input
          v-model="queryParams.gid"
          placeholder="请输入GID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="客户名称" prop="crmCustName">
        <el-input
          v-model="queryParams.crmCustName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年份/财报期次" prop="period">
        <el-input
          v-model="queryParams.period"
          placeholder="请输入年份/财报期次"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总资产" prop="totalAssets">
        <el-input
          v-model="queryParams.totalAssets"
          placeholder="请输入总资产"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总负债" prop="lia">
        <el-input
          v-model="queryParams.lia"
          placeholder="请输入总负债"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主营业务收入" prop="proceedsSale">
        <el-input
          v-model="queryParams.proceedsSale"
          placeholder="请输入主营业务收入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经营活动产生的现金流量净额" prop="operActCash">
        <el-input
          v-model="queryParams.operActCash"
          placeholder="请输入经营活动产生的现金流量净额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="投资活动产生的现金流量净额" prop="inveActCash">
        <el-input
          v-model="queryParams.inveActCash"
          placeholder="请输入投资活动产生的现金流量净额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产负债率" prop="assetsLiaRat">
        <el-input
          v-model="queryParams.assetsLiaRat"
          placeholder="请输入资产负债率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流动比率" prop="liquidityRat">
        <el-input
          v-model="queryParams.liquidityRat"
          placeholder="请输入流动比率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="速动比率" prop="quickRatio">
        <el-input
          v-model="queryParams.quickRatio"
          placeholder="请输入速动比率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="利润总额" prop="totalMar">
        <el-input
          v-model="queryParams.totalMar"
          placeholder="请输入利润总额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所有者权益" prop="ownerEquity">
        <el-input
          v-model="queryParams.ownerEquity"
          placeholder="请输入所有者权益"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="净利润" prop="retainedProfits">
        <el-input
          v-model="queryParams.retainedProfits"
          placeholder="请输入净利润"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="净资产利润率ROE(%)" prop="roe">
        <el-input
          v-model="queryParams.roe"
          placeholder="请输入净资产利润率ROE(%)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总资产利润率ROA(%)" prop="roa">
        <el-input
          v-model="queryParams.roa"
          placeholder="请输入总资产利润率ROA(%)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应收账款周转率" prop="turnoverOfAccRe">
        <el-input
          v-model="queryParams.turnoverOfAccRe"
          placeholder="请输入应收账款周转率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="毛利率" prop="grossProfitRate">
        <el-input
          v-model="queryParams.grossProfitRate"
          placeholder="请输入毛利率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="筹资活动产生的现金流量净额" prop="finaActCash">
        <el-input
          v-model="queryParams.finaActCash"
          placeholder="请输入筹资活动产生的现金流量净额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="投资净收益" prop="netInvestIncome">
        <el-input
          v-model="queryParams.netInvestIncome"
          placeholder="请输入投资净收益"
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
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['survey:zkrCustFinance:add']"
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
          v-hasPermi="['survey:zkrCustFinance:edit']"
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
          v-hasPermi="['survey:zkrCustFinance:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrCustFinance:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrCustFinanceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="GID" align="center" prop="gid" /> -->
      <el-table-column label="所属机构" width="100" align="center" prop="crmOrgId" />
      <el-table-column label="所属机构名称" width="100" align="center" prop="crmOrgName" />
      <el-table-column label="核心客户号" width="100" align="center" prop="crmEcCustNo" />
      <el-table-column label="客户名称" width="100" align="center" prop="crmCustName" />
      <el-table-column label="年份/财报期次" width="150" align="center" prop="period" />
      <el-table-column label="总资产" width="100" align="center" prop="totalAssets" />
      <el-table-column label="总负债" width="100" align="center" prop="lia" />
      <el-table-column label="主营业务收入" width="100" align="center" prop="proceedsSale" />
      <!-- <el-table-column label="经营活动产生的现金流量净额" align="center" prop="operActCash" />
      <el-table-column label="投资活动产生的现金流量净额" align="center" prop="inveActCash" /> -->
      <el-table-column label="资产负债率" width="100" align="center" prop="assetsLiaRat" />
      <el-table-column label="流动比率" align="center" prop="liquidityRat" />
      <el-table-column label="速动比率" align="center" prop="quickRatio" />
      <el-table-column label="利润总额" align="center" prop="totalMar" />
      <el-table-column label="所有者权益" width="100" align="center" prop="ownerEquity" />
      <el-table-column label="净利润" align="center" prop="retainedProfits" />
      <el-table-column label="净资产利润率ROE(%)" width="150" align="center" prop="roe" />
      <el-table-column label="总资产利润率ROA(%)" width="150" align="center" prop="roa" />
      <el-table-column label="应收账款周转率" width="150" align="center" prop="turnoverOfAccRe" />
      <el-table-column label="毛利率" align="center" prop="grossProfitRate" />
      <el-table-column label="筹资活动产生的现金流量净额" width="200" align="center" prop="finaActCash" />
      <el-table-column label="投资净收益" align="center" prop="netInvestIncome" />
      <!-- <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrCustFinance:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrCustFinance:remove']"
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
        <el-form-item label="GID" prop="gid">
          <el-input v-model="form.gid" placeholder="请输入GID" />
        </el-form-item>
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
        <el-form-item label="年份/财报期次" prop="period">
          <el-input v-model="form.period" placeholder="请输入年份/财报期次" />
        </el-form-item>
        <el-form-item label="总资产" prop="totalAssets">
          <el-input v-model="form.totalAssets" placeholder="请输入总资产" />
        </el-form-item>
        <el-form-item label="总负债" prop="lia">
          <el-input v-model="form.lia" placeholder="请输入总负债" />
        </el-form-item>
        <el-form-item label="主营业务收入" prop="proceedsSale">
          <el-input v-model="form.proceedsSale" placeholder="请输入主营业务收入" />
        </el-form-item>
        <el-form-item label="经营活动产生的现金流量净额" prop="operActCash">
          <el-input v-model="form.operActCash" placeholder="请输入经营活动产生的现金流量净额" />
        </el-form-item>
        <el-form-item label="投资活动产生的现金流量净额" prop="inveActCash">
          <el-input v-model="form.inveActCash" placeholder="请输入投资活动产生的现金流量净额" />
        </el-form-item>
        <el-form-item label="资产负债率" prop="assetsLiaRat">
          <el-input v-model="form.assetsLiaRat" placeholder="请输入资产负债率" />
        </el-form-item>
        <el-form-item label="流动比率" prop="liquidityRat">
          <el-input v-model="form.liquidityRat" placeholder="请输入流动比率" />
        </el-form-item>
        <el-form-item label="速动比率" prop="quickRatio">
          <el-input v-model="form.quickRatio" placeholder="请输入速动比率" />
        </el-form-item>
        <el-form-item label="利润总额" prop="totalMar">
          <el-input v-model="form.totalMar" placeholder="请输入利润总额" />
        </el-form-item>
        <el-form-item label="所有者权益" prop="ownerEquity">
          <el-input v-model="form.ownerEquity" placeholder="请输入所有者权益" />
        </el-form-item>
        <el-form-item label="净利润" prop="retainedProfits">
          <el-input v-model="form.retainedProfits" placeholder="请输入净利润" />
        </el-form-item>
        <el-form-item label="净资产利润率ROE(%)" prop="roe">
          <el-input v-model="form.roe" placeholder="请输入净资产利润率ROE(%)" />
        </el-form-item>
        <el-form-item label="总资产利润率ROA(%)" prop="roa">
          <el-input v-model="form.roa" placeholder="请输入总资产利润率ROA(%)" />
        </el-form-item>
        <el-form-item label="应收账款周转率" prop="turnoverOfAccRe">
          <el-input v-model="form.turnoverOfAccRe" placeholder="请输入应收账款周转率" />
        </el-form-item>
        <el-form-item label="毛利率" prop="grossProfitRate">
          <el-input v-model="form.grossProfitRate" placeholder="请输入毛利率" />
        </el-form-item>
        <el-form-item label="筹资活动产生的现金流量净额" prop="finaActCash">
          <el-input v-model="form.finaActCash" placeholder="请输入筹资活动产生的现金流量净额" />
        </el-form-item>
        <el-form-item label="投资净收益" prop="netInvestIncome">
          <el-input v-model="form.netInvestIncome" placeholder="请输入投资净收益" />
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
import { listZkrCustFinance, getZkrCustFinance, delZkrCustFinance, addZkrCustFinance, updateZkrCustFinance, exportZkrCustFinance } from "@/api/survey/zkrCustFinance";

export default {
  name: "ZkrCustFinance",
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
      zkrCustFinanceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        gid: null,
        crmOrgId: null,
        crmOrgName: null,
        crmEcCustNo: null,
        crmCustName: null,
        period: null,
        totalAssets: null,
        lia: null,
        proceedsSale: null,
        operActCash: null,
        inveActCash: null,
        assetsLiaRat: null,
        liquidityRat: null,
        quickRatio: null,
        totalMar: null,
        ownerEquity: null,
        retainedProfits: null,
        roe: null,
        roa: null,
        turnoverOfAccRe: null,
        grossProfitRate: null,
        finaActCash: null,
        netInvestIncome: null,
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
      listZkrCustFinance(this.queryParams).then(response => {
        this.zkrCustFinanceList = response.rows;
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
        gid: null,
        crmOrgId: null,
        crmOrgName: null,
        crmEcCustNo: null,
        crmCustName: null,
        period: null,
        totalAssets: null,
        lia: null,
        proceedsSale: null,
        operActCash: null,
        inveActCash: null,
        assetsLiaRat: null,
        liquidityRat: null,
        quickRatio: null,
        totalMar: null,
        ownerEquity: null,
        retainedProfits: null,
        roe: null,
        roa: null,
        turnoverOfAccRe: null,
        grossProfitRate: null,
        finaActCash: null,
        netInvestIncome: null,
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
      this.ids = selection.map(item => item.gid)
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
      const gid = row.gid || this.ids
      getZkrCustFinance(gid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.gid != null) {
            updateZkrCustFinance(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrCustFinance(this.form).then(response => {
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
      const gids = row.gid || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + gids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrCustFinance(gids);
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
          return exportZkrCustFinance(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
