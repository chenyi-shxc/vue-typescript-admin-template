<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="所属机构" prop="orgNo">
        <el-input
          v-model="queryParams.orgNo"
          placeholder="请输入所属机构"
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
      <el-form-item label="核心客户号" prop="custNo">
        <el-input
          v-model="queryParams.custNo"
          placeholder="请输入核心客户号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="客户名称" prop="custName">
        <el-input
          v-model="queryParams.custName"
          placeholder="请输入客户名称"
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
      <el-form-item label="项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入项目名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="机构罚金" prop="pubnishAmt">
        <el-input
          v-model="queryParams.pubnishAmt"
          placeholder="请输入机构罚金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="监管机构" prop="superviseOrg">
        <el-input
          v-model="queryParams.superviseOrg"
          placeholder="请输入监管机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处罚年份" prop="pubnishYear">
        <el-input
          v-model="queryParams.pubnishYear"
          placeholder="请输入处罚年份"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主键" prop="superviseId">
        <el-input
          v-model="queryParams.superviseId"
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
          v-hasPermi="['survey:zkrSuperviseInfo:add']"
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
          v-hasPermi="['survey:zkrSuperviseInfo:edit']"
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
          v-hasPermi="['survey:zkrSuperviseInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrSuperviseInfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrSuperviseInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构" align="center" prop="orgNo" /> -->
      <el-table-column label="机构名称" align="center" prop="orgName" />
      <!-- <el-table-column label="核心客户号" align="center" prop="custNo" /> -->
      <!-- <el-table-column label="客户名称" align="center" prop="custName" /> -->
      <!-- <el-table-column label="项目编号" align="center" prop="projectNo" /> -->
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <!-- <el-table-column label="处罚客户项目名称" align="center" prop="pubnishProject" /> -->
      <el-table-column label="问题情况" align="center" prop="problemDesc" />
      <el-table-column label="机构罚金" align="center" prop="pubnishAmt" />
      <el-table-column label="监管机构" align="center" prop="superviseOrg" />
      <el-table-column label="处罚描述" align="center" prop="pubnishDesc" />
      <el-table-column label="处罚年份" align="center" prop="pubnishYear" />
      <!-- <el-table-column label="主键" align="center" prop="superviseId" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrSuperviseInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrSuperviseInfo:remove']"
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
        <el-form-item label="所属机构" prop="orgNo">
          <el-input v-model="form.orgNo" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="orgName">
          <el-input v-model="form.orgName" placeholder="请输入所属机构名称" />
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
        <el-form-item label="处罚客户项目名称" prop="pubnishProject">
          <el-input v-model="form.pubnishProject" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题情况" prop="problemDesc">
          <el-input v-model="form.problemDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="机构罚金" prop="pubnishAmt">
          <el-input v-model="form.pubnishAmt" placeholder="请输入机构罚金" />
        </el-form-item>
        <el-form-item label="监管机构" prop="superviseOrg">
          <el-input v-model="form.superviseOrg" placeholder="请输入监管机构" />
        </el-form-item>
        <el-form-item label="处罚描述" prop="pubnishDesc">
          <el-input v-model="form.pubnishDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="处罚年份" prop="pubnishYear">
          <el-input v-model="form.pubnishYear" placeholder="请输入处罚年份" />
        </el-form-item>
        <el-form-item label="主键" prop="superviseId">
          <el-input v-model="form.superviseId" placeholder="请输入主键" />
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
import { listZkrSuperviseInfo, getZkrSuperviseInfo, delZkrSuperviseInfo, addZkrSuperviseInfo, updateZkrSuperviseInfo, exportZkrSuperviseInfo } from "@/api/survey/zkrSuperviseInfo";

export default {
  name: "ZkrSuperviseInfo",
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
      zkrSuperviseInfoList: [],
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
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        pubnishProject: null,
        problemDesc: null,
        pubnishAmt: null,
        superviseOrg: null,
        pubnishDesc: null,
        pubnishYear: null,
        superviseId: null,
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
      listZkrSuperviseInfo(this.queryParams).then(response => {
        this.zkrSuperviseInfoList = response.rows;
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
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        pubnishProject: null,
        problemDesc: null,
        pubnishAmt: null,
        superviseOrg: null,
        pubnishDesc: null,
        pubnishYear: null,
        superviseId: null,
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
      getZkrSuperviseInfo(orgNo).then(response => {
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
            updateZkrSuperviseInfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrSuperviseInfo(this.form).then(response => {
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
          return delZkrSuperviseInfo(orgNos);
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
          return exportZkrSuperviseInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
