<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px">
     <!-- <el-form-item label="集团编号" prop="blocNo">
        <el-input
          v-model="queryParams.blocNo"
          placeholder="请输入集团编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="集团名称" prop="blocName">
        <el-input
          v-model="queryParams.blocName"
          placeholder="请输入集团名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="集团简称" prop="blocNameShort">
        <el-input
          v-model="queryParams.blocNameShort"
          placeholder="请输入集团简称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团母公司核心客户号" prop="blocHostCustNo">
        <el-input
          v-model="queryParams.blocHostCustNo"
          placeholder="请输入集团母公司核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团母公司名称" prop="blocHostCustName">
        <el-input
          v-model="queryParams.blocHostCustName"
          placeholder="请输入集团母公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团成员数量" prop="blocMemberCount">
        <el-input
          v-model="queryParams.blocMemberCount"
          placeholder="请输入集团成员数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团主管分行" prop="managerOrgname">
        <el-input
          v-model="queryParams.managerOrgname"
          placeholder="请输入集团主管分行"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团行内贷款余额" prop="blocOutstanding">
        <el-input
          v-model="queryParams.blocOutstanding"
          placeholder="请输入集团行内贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团行内贷款余额" prop="crmOrgId">
        <el-input
          v-model="queryParams.crmOrgId"
          placeholder="请输入集团行内贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团行内贷款余额" prop="crmOrgName">
        <el-input
          v-model="queryParams.crmOrgName"
          placeholder="请输入集团行内贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="客户名称" prop="custName">
        <el-input
          v-model="queryParams.custName"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="核心客户号" prop="ecCustNo">
        <el-input
          v-model="queryParams.ecCustNo"
          placeholder="请输入核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <!--<el-form-item label="成员地位" prop="relation">
        <el-input
          v-model="queryParams.relation"
          placeholder="请输入成员地位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关系层级" prop="memberLevel">
        <el-input
          v-model="queryParams.memberLevel"
          placeholder="请输入关系层级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上级公司核心客户号" prop="parEcCustNo">
        <el-input
          v-model="queryParams.parEcCustNo"
          placeholder="请输入上级公司核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上级公司名称" prop="parEcCustName">
        <el-input
          v-model="queryParams.parEcCustName"
          placeholder="请输入上级公司名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上级公司投资控股比例" prop="investPercent">
        <el-input
          v-model="queryParams.investPercent"
          placeholder="请输入上级公司投资控股比例"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户最新信用等级" prop="creditLevel">
        <el-input
          v-model="queryParams.creditLevel"
          placeholder="请输入客户最新信用等级"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户贷款余额" prop="outstanding">
        <el-input
          v-model="queryParams.outstanding"
          placeholder="请输入客户贷款余额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="集团客户认定日期" prop="inputDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.inputDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择集团客户认定日期">
        </el-date-picker>
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
      </el-form-item>-->
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
          v-hasPermi="['survey:zkrBlocInfo:add']"
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
          v-hasPermi="['survey:zkrBlocInfo:edit']"
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
          v-hasPermi="['survey:zkrBlocInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrBlocInfo:export']"
        >导出</el-button>
      </el-col>

      <el-col>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd1"
        >全景视图</el-button
        ></el-col
      >
      <el-dialog
        :title="title1"
        :visible.sync="open1"
        width="80%"
        append-to-body
        @close="close1"
      >
        <div><model-template1 :templateConfig="templateConfig1" /></div>
      </el-dialog>




      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrBlocInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--<el-table-column label="集团编号" align="center" prop="blocNo" />-->
      <el-table-column label="集团名称" align="center" prop="blocName" />
      <el-table-column label="集团简称" align="center" prop="blocNameShort" />
      <el-table-column label="集团母公司核心客户号" align="center" prop="blocHostCustNo" />
      <el-table-column label="集团母公司名称" align="center" prop="blocHostCustName" />
      <el-table-column label="集团性质" align="center" prop="ownershipClassify" />
      <el-table-column label="集团成员数量" align="center" prop="blocMemberCount" />
      <!--<el-table-column label="集团主管分行" align="center" prop="managerOrgname" />
      <el-table-column label="集团协管分行" align="center" prop="assistorgname" />-->
      <el-table-column label="集团资金管理类型" align="center" prop="fundMgrClassify" />
      <el-table-column label="集团客户管理类型" align="center" prop="blocScope" />
      <!--<el-table-column label="集团行内贷款余额" align="center" prop="blocOutstanding" />
      <el-table-column label="集团行内贷款余额" align="center" prop="crmOrgId" />
      <el-table-column label="集团行内贷款余额" align="center" prop="crmOrgName" />-->
      <el-table-column label="核心客户号" align="center" prop="ecCustNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="成员地位" align="center" prop="relation" />
      <el-table-column label="关系层级" align="center" prop="memberLevel" />
<!--      <el-table-column label="上级公司核心客户号" align="center" prop="parEcCustNo" />
      <el-table-column label="上级公司名称" align="center" prop="parEcCustName" />
      <el-table-column label="上级公司投资控股比例" align="center" prop="investPercent" />-->
      <el-table-column label="客户最新信用等级" align="center" prop="creditLevel" />
      <el-table-column label="客户行内角色" align="center" prop="custRole" />
      <el-table-column label="客户贷款余额" align="center" prop="outstanding" />
      <el-table-column label="集团客户认定日期" align="center" prop="inputDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inputDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
     <!-- <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrBlocInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrBlocInfo:remove']"
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

    <!-- 添加或修改集团客户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="集团编号" prop="blocNo">
          <el-input v-model="form.blocNo" placeholder="请输入集团编号" />
        </el-form-item>
        <el-form-item label="集团名称" prop="blocName">
          <el-input v-model="form.blocName" placeholder="请输入集团名称" />
        </el-form-item>
        <el-form-item label="集团简称" prop="blocNameShort">
          <el-input v-model="form.blocNameShort" placeholder="请输入集团简称" />
        </el-form-item>
        <el-form-item label="集团母公司核心客户号" prop="blocHostCustNo">
          <el-input v-model="form.blocHostCustNo" placeholder="请输入集团母公司核心客户号" />
        </el-form-item>
        <el-form-item label="集团母公司名称" prop="blocHostCustName">
          <el-input v-model="form.blocHostCustName" placeholder="请输入集团母公司名称" />
        </el-form-item>
        <el-form-item label="集团性质" prop="ownershipClassify">
          <el-input v-model="form.ownershipClassify" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="集团成员数量" prop="blocMemberCount">
          <el-input v-model="form.blocMemberCount" placeholder="请输入集团成员数量" />
        </el-form-item>
        <el-form-item label="集团主管分行" prop="managerOrgname">
          <el-input v-model="form.managerOrgname" placeholder="请输入集团主管分行" />
        </el-form-item>
        <el-form-item label="集团协管分行" prop="assistorgname">
          <el-input v-model="form.assistorgname" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="集团资金管理类型" prop="fundMgrClassify">
          <el-input v-model="form.fundMgrClassify" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="集团客户管理类型" prop="blocScope">
          <el-input v-model="form.blocScope" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="集团行内贷款余额" prop="blocOutstanding">
          <el-input v-model="form.blocOutstanding" placeholder="请输入集团行内贷款余额" />
        </el-form-item>
        <el-form-item label="集团行内贷款余额" prop="crmOrgId">
          <el-input v-model="form.crmOrgId" placeholder="请输入集团行内贷款余额" />
        </el-form-item>
        <el-form-item label="集团行内贷款余额" prop="crmOrgName">
          <el-input v-model="form.crmOrgName" placeholder="请输入集团行内贷款余额" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="ecCustNo">
          <el-input v-model="form.ecCustNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="custName">
          <el-input v-model="form.custName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="成员地位" prop="relation">
          <el-input v-model="form.relation" placeholder="请输入成员地位" />
        </el-form-item>
        <el-form-item label="关系层级" prop="memberLevel">
          <el-input v-model="form.memberLevel" placeholder="请输入关系层级" />
        </el-form-item>
        <el-form-item label="上级公司核心客户号" prop="parEcCustNo">
          <el-input v-model="form.parEcCustNo" placeholder="请输入上级公司核心客户号" />
        </el-form-item>
        <el-form-item label="上级公司名称" prop="parEcCustName">
          <el-input v-model="form.parEcCustName" placeholder="请输入上级公司名称" />
        </el-form-item>
        <el-form-item label="上级公司投资控股比例" prop="investPercent">
          <el-input v-model="form.investPercent" placeholder="请输入上级公司投资控股比例" />
        </el-form-item>
        <el-form-item label="客户最新信用等级" prop="creditLevel">
          <el-input v-model="form.creditLevel" placeholder="请输入客户最新信用等级" />
        </el-form-item>
        <el-form-item label="客户行内角色" prop="custRole">
          <el-input v-model="form.custRole" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户贷款余额" prop="outstanding">
          <el-input v-model="form.outstanding" placeholder="请输入客户贷款余额" />
        </el-form-item>
        <el-form-item label="集团客户认定日期" prop="inputDate">
          <el-date-picker clearable size="small"
            v-model="form.inputDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择集团客户认定日期">
          </el-date-picker>
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
import { listZkrBlocInfo, getZkrBlocInfo, delZkrBlocInfo, addZkrBlocInfo, updateZkrBlocInfo, exportZkrBlocInfo,listZkrBlocInfo233,listZkrBlocInfo244} from "@/api/survey/zkrBlocInfo";
import ModelTemplate1 from "../../maps/AllView";
export default {
  name: "ZkrBlocInfo",
  components: {
    ModelTemplate1
  },
  data() {
    return {
      title1: "全景视图",
      open1: false,
      templateConfig1: { barChartId: 1, dataTableId: 1 },
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
      // 集团客户表格数据
      zkrBlocInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      quepar:{
        sql:'select * from st_mp_model_base_info',
        columnType:'bar',
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        blocNo: null,
        blocName: null,
        blocNameShort: null,
        blocHostCustNo: null,
        blocHostCustName: null,
        ownershipClassify: null,
        blocMemberCount: null,
        managerOrgname: null,
        assistorgname: null,
        fundMgrClassify: null,
        blocScope: null,
        blocOutstanding: null,
        crmOrgId: null,
        crmOrgName: null,
        ecCustNo: null,
        custName: null,
        relation: null,
        memberLevel: null,
        parEcCustNo: null,
        parEcCustName: null,
        investPercent: null,
        creditLevel: null,
        custRole: null,
        outstanding: null,
        inputDate: null,
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
    handleAdd1() {
      this.open1 = true;
      this.title1 = "全景视图";
    },
    close1() {
      console.log("点击了关闭按钮======");
    },
    test(){
      listZkrBlocInfo233(this.queryParams).then((response)=>{
        console.log(response);
      });
    },
    test1(){
      listZkrBlocInfo244(this.quepar).then((response)=>{
        console.log(response);
      });
    },
    /** 查询集团客户列表 */
    getList() {
      this.loading = true;
      listZkrBlocInfo(this.queryParams).then(response => {
        this.zkrBlocInfoList = response.rows;
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
        blocNo: null,
        blocName: null,
        blocNameShort: null,
        blocHostCustNo: null,
        blocHostCustName: null,
        ownershipClassify: null,
        blocMemberCount: null,
        managerOrgname: null,
        assistorgname: null,
        fundMgrClassify: null,
        blocScope: null,
        blocOutstanding: null,
        crmOrgId: null,
        crmOrgName: null,
        ecCustNo: null,
        custName: null,
        relation: null,
        memberLevel: null,
        parEcCustNo: null,
        parEcCustName: null,
        investPercent: null,
        creditLevel: null,
        custRole: null,
        outstanding: null,
        inputDate: null,
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
      this.ids = selection.map(item => item.blocNo)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加集团客户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const blocNo = row.blocNo || this.ids
      getZkrBlocInfo(blocNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改集团客户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.blocNo != null) {
            updateZkrBlocInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrBlocInfo(this.form).then(response => {
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
      const blocNos = row.blocNo || this.ids;
      this.$confirm('是否确认删除集团客户编号为"' + blocNos + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrBlocInfo(blocNos);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有集团客户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportZkrBlocInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
