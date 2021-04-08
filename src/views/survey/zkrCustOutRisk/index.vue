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
      <el-form-item label="客户名称" prop="crmCustName">
        <el-input
          v-model="queryParams.crmCustName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="外部风险数量汇总" prop="totalNum">
        <el-input
          v-model="queryParams.totalNum"
          placeholder="请输入外部风险数量汇总"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大额客户风险预警数" prop="riskNum">
        <el-input
          v-model="queryParams.riskNum"
          placeholder="请输入大额客户风险预警数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外部关联违约风险数" prop="relabreakNum">
        <el-input
          v-model="queryParams.relabreakNum"
          placeholder="请输入外部关联违约风险数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外部不良贷款率" prop="badloanRate">
        <el-input
          v-model="queryParams.badloanRate"
          placeholder="请输入外部不良贷款率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外部不良贷款率余额" prop="badloanAmt">
        <el-input
          v-model="queryParams.badloanAmt"
          placeholder="请输入外部不良贷款率余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否外部限制类行业贷款客户" prop="isRestrict">
        <el-input
          v-model="queryParams.isRestrict"
          placeholder="请输入是否外部限制类行业贷款客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外部垫款笔数" prop="paidbackNum">
        <el-input
          v-model="queryParams.paidbackNum"
          placeholder="请输入外部垫款笔数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外部欠息笔数" prop="interestNum">
        <el-input
          v-model="queryParams.interestNum"
          placeholder="请输入外部欠息笔数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="外部未结清资产处置笔数" prop="assetsNum">
        <el-input
          v-model="queryParams.assetsNum"
          placeholder="请输入外部未结清资产处置笔数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涉及民事判决数" prop="suitNum">
        <el-input
          v-model="queryParams.suitNum"
          placeholder="请输入涉及民事判决数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="行政处罚数量" prop="punishNum">
        <el-input
          v-model="queryParams.punishNum"
          placeholder="请输入行政处罚数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对外担保数量" prop="guarNum">
        <el-input
          v-model="queryParams.guarNum"
          placeholder="请输入对外担保数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="失信被执行名单客户数量" prop="execpersonNum">
        <el-input
          v-model="queryParams.execpersonNum"
          placeholder="请输入失信被执行名单客户数量"
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
          v-hasPermi="['survey:zkrCustOutRisk:add']"
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
          v-hasPermi="['survey:zkrCustOutRisk:edit']"
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
          v-hasPermi="['survey:zkrCustOutRisk:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrCustOutRisk:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrCustOutRiskList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构"  width="55"align="center" prop="crmOrgId" /> -->
      <el-table-column label="所属机构名称"  width="200" align="center" prop="crmOrgName" />
      <el-table-column label="核心客户号" align="center" prop="crmEcCustNo" />
      <el-table-column label="客户名称" align="center" prop="crmCustName" />
      <el-table-column label="外部风险数量汇总"  width="200" align="center" prop="totalNum" />
      <el-table-column label="大额客户风险预警数"  width="200" align="center" prop="riskNum" />
      <el-table-column label="外部关联违约风险数"  width="200" align="center" prop="relabreakNum" />
      <el-table-column label="外部不良贷款率"  width="200" align="center" prop="badloanRate" />
      <el-table-column label="外部不良贷款率余额"  width="200" align="center" prop="badloanAmt" />
      <el-table-column label="是否外部限制类行业贷款客户"  width="200" align="center" prop="isRestrict" />
      <el-table-column label="外部垫款笔数"  width="200" align="center" prop="paidbackNum" />
      <el-table-column label="外部欠息笔数" align="center" prop="interestNum" />
      <el-table-column label="外部未结清资产处置笔数"  width="200" align="center" prop="assetsNum" />
      <el-table-column label="涉及民事判决数"  width="200" align="center" prop="suitNum" />
      <el-table-column label="行政处罚数量"  width="200" align="center" prop="punishNum" />
      <el-table-column label="对外担保数量"  width="200" align="center" prop="guarNum" />
      <el-table-column label="失信被执行名单客户数量"  width="200" align="center" prop="execpersonNum" />
      <!-- <el-table-column label="风险描述" align="center" prop="risk" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrCustOutRisk:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrCustOutRisk:remove']"
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
        <el-form-item label="外部风险数量汇总" prop="totalNum">
          <el-input v-model="form.totalNum" placeholder="请输入外部风险数量汇总" />
        </el-form-item>
        <el-form-item label="大额客户风险预警数" prop="riskNum">
          <el-input v-model="form.riskNum" placeholder="请输入大额客户风险预警数" />
        </el-form-item>
        <el-form-item label="外部关联违约风险数" prop="relabreakNum">
          <el-input v-model="form.relabreakNum" placeholder="请输入外部关联违约风险数" />
        </el-form-item>
        <el-form-item label="外部不良贷款率" prop="badloanRate">
          <el-input v-model="form.badloanRate" placeholder="请输入外部不良贷款率" />
        </el-form-item>
        <el-form-item label="外部不良贷款率余额" prop="badloanAmt">
          <el-input v-model="form.badloanAmt" placeholder="请输入外部不良贷款率余额" />
        </el-form-item>
        <el-form-item label="是否外部限制类行业贷款客户" prop="isRestrict">
          <el-input v-model="form.isRestrict" placeholder="请输入是否外部限制类行业贷款客户" />
        </el-form-item>
        <el-form-item label="外部垫款笔数" prop="paidbackNum">
          <el-input v-model="form.paidbackNum" placeholder="请输入外部垫款笔数" />
        </el-form-item>
        <el-form-item label="外部欠息笔数" prop="interestNum">
          <el-input v-model="form.interestNum" placeholder="请输入外部欠息笔数" />
        </el-form-item>
        <el-form-item label="外部未结清资产处置笔数" prop="assetsNum">
          <el-input v-model="form.assetsNum" placeholder="请输入外部未结清资产处置笔数" />
        </el-form-item>
        <el-form-item label="涉及民事判决数" prop="suitNum">
          <el-input v-model="form.suitNum" placeholder="请输入涉及民事判决数" />
        </el-form-item>
        <el-form-item label="行政处罚数量" prop="punishNum">
          <el-input v-model="form.punishNum" placeholder="请输入行政处罚数量" />
        </el-form-item>
        <el-form-item label="对外担保数量" prop="guarNum">
          <el-input v-model="form.guarNum" placeholder="请输入对外担保数量" />
        </el-form-item>
        <el-form-item label="失信被执行名单客户数量" prop="execpersonNum">
          <el-input v-model="form.execpersonNum" placeholder="请输入失信被执行名单客户数量" />
        </el-form-item>
        <el-form-item label="风险描述" prop="risk">
          <el-input v-model="form.risk" type="textarea" placeholder="请输入内容" />
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
import { listZkrCustOutRisk, getZkrCustOutRisk, delZkrCustOutRisk, addZkrCustOutRisk, updateZkrCustOutRisk, exportZkrCustOutRisk } from "@/api/survey/zkrCustOutRisk";

export default {
  name: "ZkrCustOutRisk",
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
      zkrCustOutRiskList: [],
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
        totalNum: null,
        riskNum: null,
        relabreakNum: null,
        badloanRate: null,
        badloanAmt: null,
        isRestrict: null,
        paidbackNum: null,
        interestNum: null,
        assetsNum: null,
        suitNum: null,
        punishNum: null,
        guarNum: null,
        execpersonNum: null,
        risk: null,
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
      listZkrCustOutRisk(this.queryParams).then(response => {
        this.zkrCustOutRiskList = response.rows;
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
        totalNum: null,
        riskNum: null,
        relabreakNum: null,
        badloanRate: null,
        badloanAmt: null,
        isRestrict: null,
        paidbackNum: null,
        interestNum: null,
        assetsNum: null,
        suitNum: null,
        punishNum: null,
        guarNum: null,
        execpersonNum: null,
        risk: null,
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
      getZkrCustOutRisk(crmOrgId).then(response => {
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
            updateZkrCustOutRisk(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrCustOutRisk(this.form).then(response => {
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
          return delZkrCustOutRisk(crmOrgIds);
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
          return exportZkrCustOutRisk(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
