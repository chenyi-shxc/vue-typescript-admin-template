<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属机构" prop="bookBranch">
        <el-input
          v-model="queryParams.bookBranch"
          placeholder="请输入所属机构"
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
      </el-form-item>
      <el-form-item label="所属集团编号" prop="blocNo">
        <el-input
          v-model="queryParams.blocNo"
          placeholder="请输入所属集团编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属集团名称" prop="blocName">
        <el-input
          v-model="queryParams.blocName"
          placeholder="请输入所属集团名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否集团客户" prop="isHostCust">
        <el-input
          v-model="queryParams.isHostCust"
          placeholder="请输入是否集团客户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展现标注日期" prop="showDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.showDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择展现标注日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="展现标注月份" prop="showDateM">
        <el-input
          v-model="queryParams.showDateM"
          placeholder="请输入展现标注月份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="展现标注季度" prop="showDateQ">
        <el-input
          v-model="queryParams.showDateQ"
          placeholder="请输入展现标注季度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属业务环节 " prop="flowType">
        <el-select v-model="queryParams.flowType" placeholder="请选择所属业务环节 " clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户最早展现日期" prop="custMinShowDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.custMinShowDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择客户最早展现日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="客户最早展现日期月份" prop="custMinShowDateM">
        <el-input
          v-model="queryParams.custMinShowDateM"
          placeholder="请输入客户最早展现日期月份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户最早展现日期季度" prop="custMinShowDateQ">
        <el-input
          v-model="queryParams.custMinShowDateQ"
          placeholder="请输入客户最早展现日期季度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户最晚展现日期" prop="custMaxShowDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.custMaxShowDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择客户最晚展现日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="客户最晚展现日期月份" prop="custMaxShowDateM">
        <el-input
          v-model="queryParams.custMaxShowDateM"
          placeholder="请输入客户最晚展现日期月份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户最晚展现日期季度" prop="custMaxShowDateQ">
        <el-input
          v-model="queryParams.custMaxShowDateQ"
          placeholder="请输入客户最晚展现日期季度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="贷款业务状态" prop="loanBizStatus">
        <el-select v-model="queryParams.loanBizStatus" placeholder="请选择贷款业务状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="存款业务状态" prop="depositBizStatus">
        <el-select v-model="queryParams.depositBizStatus" placeholder="请选择存款业务状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="票据业务状态" prop="billBizStatus">
        <el-select v-model="queryParams.billBizStatus" placeholder="请选择票据业务状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="表外受托业务状态" prop="trustBizStatus">
        <el-select v-model="queryParams.trustBizStatus" placeholder="请选择表外受托业务状态" clearable size="small">
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
          v-hasPermi="['datavisual:fullviewCust:add']"
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
          v-hasPermi="['datavisual:fullviewCust:edit']"
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
          v-hasPermi="['datavisual:fullviewCust:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datavisual:fullviewCust:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fullviewCustList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="所属集团编号" align="center" prop="blocNo" />
      <el-table-column label="所属集团名称" align="center" prop="blocName" />
      <el-table-column label="是否集团客户" align="center" prop="isHostCust" />
      <el-table-column label="展现标注日期" align="center" prop="showDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.showDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="展现标注月份" align="center" prop="showDateM" />
      <el-table-column label="展现标注季度" align="center" prop="showDateQ" />
      <el-table-column label="展现信息内容" align="center" prop="showTip" />
      <el-table-column label="所属业务环节 " align="center" prop="flowType" />
      <el-table-column label="客户最早展现日期" align="center" prop="custMinShowDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.custMinShowDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户最早展现日期月份" align="center" prop="custMinShowDateM" />
      <el-table-column label="客户最早展现日期季度" align="center" prop="custMinShowDateQ" />
      <el-table-column label="客户最晚展现日期" align="center" prop="custMaxShowDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.custMaxShowDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户最晚展现日期月份" align="center" prop="custMaxShowDateM" />
      <el-table-column label="客户最晚展现日期季度" align="center" prop="custMaxShowDateQ" />
      <el-table-column label="贷款业务状态" align="center" prop="loanBizStatus" />
      <el-table-column label="存款业务状态" align="center" prop="depositBizStatus" />
      <el-table-column label="票据业务状态" align="center" prop="billBizStatus" />
      <el-table-column label="表外受托业务状态" align="center" prop="trustBizStatus" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['datavisual:fullviewCust:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datavisual:fullviewCust:remove']"
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

    <!-- 添加或修改全景视图-客户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属机构" prop="bookBranch">
          <el-input v-model="form.bookBranch" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="branchName">
          <el-input v-model="form.branchName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="custNo">
          <el-input v-model="form.custNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="custName">
          <el-input v-model="form.custName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="所属集团编号" prop="blocNo">
          <el-input v-model="form.blocNo" placeholder="请输入所属集团编号" />
        </el-form-item>
        <el-form-item label="所属集团名称" prop="blocName">
          <el-input v-model="form.blocName" placeholder="请输入所属集团名称" />
        </el-form-item>
        <el-form-item label="是否集团客户" prop="isHostCust">
          <el-input v-model="form.isHostCust" placeholder="请输入是否集团客户" />
        </el-form-item>
        <el-form-item label="展现标注日期" prop="showDate">
          <el-date-picker clearable size="small"
            v-model="form.showDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择展现标注日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="展现标注月份" prop="showDateM">
          <el-input v-model="form.showDateM" placeholder="请输入展现标注月份" />
        </el-form-item>
        <el-form-item label="展现标注季度" prop="showDateQ">
          <el-input v-model="form.showDateQ" placeholder="请输入展现标注季度" />
        </el-form-item>
        <el-form-item label="展现信息内容" prop="showTip">
          <el-input v-model="form.showTip" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="所属业务环节 " prop="flowType">
          <el-select v-model="form.flowType" placeholder="请选择所属业务环节 ">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户最早展现日期" prop="custMinShowDate">
          <el-date-picker clearable size="small"
            v-model="form.custMinShowDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择客户最早展现日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户最早展现日期月份" prop="custMinShowDateM">
          <el-input v-model="form.custMinShowDateM" placeholder="请输入客户最早展现日期月份" />
        </el-form-item>
        <el-form-item label="客户最早展现日期季度" prop="custMinShowDateQ">
          <el-input v-model="form.custMinShowDateQ" placeholder="请输入客户最早展现日期季度" />
        </el-form-item>
        <el-form-item label="客户最晚展现日期" prop="custMaxShowDate">
          <el-date-picker clearable size="small"
            v-model="form.custMaxShowDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择客户最晚展现日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="客户最晚展现日期月份" prop="custMaxShowDateM">
          <el-input v-model="form.custMaxShowDateM" placeholder="请输入客户最晚展现日期月份" />
        </el-form-item>
        <el-form-item label="客户最晚展现日期季度" prop="custMaxShowDateQ">
          <el-input v-model="form.custMaxShowDateQ" placeholder="请输入客户最晚展现日期季度" />
        </el-form-item>
        <el-form-item label="贷款业务状态">
          <el-radio-group v-model="form.loanBizStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="存款业务状态">
          <el-radio-group v-model="form.depositBizStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="票据业务状态">
          <el-radio-group v-model="form.billBizStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="表外受托业务状态">
          <el-radio-group v-model="form.trustBizStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listFullviewCust, getFullviewCust, delFullviewCust, addFullviewCust, updateFullviewCust, exportFullviewCust } from "@/api/datavisual/fullviewCust";

export default {
  name: "FullviewCust",
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
      // 全景视图-客户信息表格数据
      fullviewCustList: [],
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
        blocNo: null,
        blocName: null,
        isHostCust: null,
        showDate: null,
        showDateM: null,
        showDateQ: null,
        showTip: null,
        flowType: null,
        custMinShowDate: null,
        custMinShowDateM: null,
        custMinShowDateQ: null,
        custMaxShowDate: null,
        custMaxShowDateM: null,
        custMaxShowDateQ: null,
        loanBizStatus: null,
        depositBizStatus: null,
        billBizStatus: null,
        trustBizStatus: null,
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
    /** 查询全景视图-客户信息列表 */
    getList() {
      this.loading = true;
      listFullviewCust(this.queryParams).then(response => {
        this.fullviewCustList = response.rows;
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
        blocNo: null,
        blocName: null,
        isHostCust: null,
        showDate: null,
        showDateM: null,
        showDateQ: null,
        showTip: null,
        flowType: null,
        custMinShowDate: null,
        custMinShowDateM: null,
        custMinShowDateQ: null,
        custMaxShowDate: null,
        custMaxShowDateM: null,
        custMaxShowDateQ: null,
        loanBizStatus: "0",
        depositBizStatus: "0",
        billBizStatus: "0",
        trustBizStatus: "0",
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
      this.title = "添加全景视图-客户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookBranch = row.bookBranch || this.ids
      getFullviewCust(bookBranch).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改全景视图-客户信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bookBranch != null) {
            updateFullviewCust(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFullviewCust(this.form).then(response => {
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
      this.$confirm('是否确认删除全景视图-客户信息编号为"' + bookBranchs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFullviewCust(bookBranchs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有全景视图-客户信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportFullviewCust(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
