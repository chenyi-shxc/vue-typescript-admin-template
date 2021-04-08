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
      <el-form-item label="所属机构名称" prop="branchName">
        <el-input
          v-model="queryParams.branchName"
          placeholder="请输入所属机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户编号" prop="custNo">
        <el-input
          v-model="queryParams.custNo"
          placeholder="请输入客户编号"
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
      <el-form-item label="流程实例ID" prop="processid">
        <el-input
          v-model="queryParams.processid"
          placeholder="请输入流程实例ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发起部门/机构" prop="createorg">
        <el-input
          v-model="queryParams.createorg"
          placeholder="请输入发起部门/机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构名称" prop="createorgname">
        <el-input
          v-model="queryParams.createorgname"
          placeholder="请输入机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发起部门名称" prop="deptname">
        <el-input
          v-model="queryParams.deptname"
          placeholder="请输入发起部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流程发起时间" prop="createtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.createtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择流程发起时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="流程结束时间" prop="finishtime">
        <el-date-picker clearable size="small"
          v-model="queryParams.finishtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择流程结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="审批机构代码" prop="orgcd">
        <el-input
          v-model="queryParams.orgcd"
          placeholder="请输入审批机构代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批机构名称" prop="orgname">
        <el-input
          v-model="queryParams.orgname"
          placeholder="请输入审批机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批人" prop="owner">
        <el-input
          v-model="queryParams.owner"
          placeholder="请输入审批人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批时间" prop="presenttime">
        <el-date-picker clearable size="small"
          v-model="queryParams.presenttime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审批时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="业务环节 " prop="flowType">
        <el-select v-model="queryParams.flowType" placeholder="请选择业务环节 " clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务日期 " prop="reportDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.reportDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择业务日期 ">
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
          v-hasPermi="['survey:zkrProjectPlanFlow:add']"
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
          v-hasPermi="['survey:zkrProjectPlanFlow:edit']"
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
          v-hasPermi="['survey:zkrProjectPlanFlow:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrProjectPlanFlow:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectPlanFlowList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="所属机构" align="center" prop="bookBranch" />
      <el-table-column label="所属机构名称" align="center" prop="branchName" />
      <el-table-column label="客户编号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="流程实例ID" align="center" prop="processid" />
      <el-table-column label="流程名称" align="center" prop="templatename" />
      <el-table-column label="发起部门/机构" align="center" prop="createorg" />
      <el-table-column label="机构名称" align="center" prop="createorgname" />
      <el-table-column label="发起部门名称" align="center" prop="deptname" />
      <el-table-column label="发起人" align="center" prop="creater" />
      <el-table-column label="流程发起时间" align="center" prop="createtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流程结束时间" align="center" prop="finishtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.finishtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批流程名称" align="center" prop="workitemname" />
      <el-table-column label="审批机构代码" align="center" prop="orgcd" />
      <el-table-column label="审批机构名称" align="center" prop="orgname" />
      <el-table-column label="审批人" align="center" prop="owner" />
      <el-table-column label="审批人名称" align="center" prop="ownername" />
      <el-table-column label="审批人角色" align="center" prop="rolename" />
      <el-table-column label="审批结论" align="center" prop="conclusion" />
      <el-table-column label="审批时间" align="center" prop="presenttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.presenttime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批意见" align="center" prop="opinion" />
      <el-table-column label="业务环节 " align="center" prop="flowType" />
      <el-table-column label="评审计划业务ID " align="center" prop="planBizId" />
      <el-table-column label="业务日期 " align="center" prop="reportDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reportDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrProjectPlanFlow:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrProjectPlanFlow:remove']"
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
        <el-form-item label="客户编号" prop="custNo">
          <el-input v-model="form.custNo" placeholder="请输入客户编号" />
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
        <el-form-item label="流程实例ID" prop="processid">
          <el-input v-model="form.processid" placeholder="请输入流程实例ID" />
        </el-form-item>
        <el-form-item label="流程名称" prop="templatename">
          <el-input v-model="form.templatename" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发起部门/机构" prop="createorg">
          <el-input v-model="form.createorg" placeholder="请输入发起部门/机构" />
        </el-form-item>
        <el-form-item label="机构名称" prop="createorgname">
          <el-input v-model="form.createorgname" placeholder="请输入机构名称" />
        </el-form-item>
        <el-form-item label="发起部门名称" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入发起部门名称" />
        </el-form-item>
        <el-form-item label="发起人" prop="creater">
          <el-input v-model="form.creater" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="流程结束时间" prop="finishtime">
          <el-date-picker clearable size="small"
            v-model="form.finishtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择流程结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批流程名称" prop="workitemname">
          <el-input v-model="form.workitemname" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审批机构代码" prop="orgcd">
          <el-input v-model="form.orgcd" placeholder="请输入审批机构代码" />
        </el-form-item>
        <el-form-item label="审批机构名称" prop="orgname">
          <el-input v-model="form.orgname" placeholder="请输入审批机构名称" />
        </el-form-item>
        <el-form-item label="审批人" prop="owner">
          <el-input v-model="form.owner" placeholder="请输入审批人" />
        </el-form-item>
        <el-form-item label="审批人名称" prop="ownername">
          <el-input v-model="form.ownername" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审批人角色" prop="rolename">
          <el-input v-model="form.rolename" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审批结论" prop="conclusion">
          <el-input v-model="form.conclusion" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审批时间" prop="presenttime">
          <el-date-picker clearable size="small"
            v-model="form.presenttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审批时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批意见" prop="opinion">
          <el-input v-model="form.opinion" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="业务环节 " prop="flowType">
          <el-select v-model="form.flowType" placeholder="请选择业务环节 ">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="评审计划业务ID " prop="planBizId">
          <el-input v-model="form.planBizId" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="业务日期 " prop="reportDate">
          <el-date-picker clearable size="small"
            v-model="form.reportDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择业务日期 ">
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
import { listZkrProjectPlanFlow, getZkrProjectPlanFlow, delZkrProjectPlanFlow, addZkrProjectPlanFlow, updateZkrProjectPlanFlow, exportZkrProjectPlanFlow } from "@/api/survey/zkrProjectPlanFlow";

export default {
  name: "ZkrProjectPlanFlow",
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
      zkrProjectPlanFlowList: [],
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
        processid: null,
        templatename: null,
        createorg: null,
        createorgname: null,
        deptname: null,
        creater: null,
        createtime: null,
        finishtime: null,
        workitemname: null,
        orgcd: null,
        orgname: null,
        owner: null,
        ownername: null,
        rolename: null,
        conclusion: null,
        presenttime: null,
        opinion: null,
        flowType: null,
        planBizId: null,
        reportDate: null,
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
      listZkrProjectPlanFlow(this.queryParams).then(response => {
        this.zkrProjectPlanFlowList = response.rows;
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
        processid: null,
        templatename: null,
        createorg: null,
        createorgname: null,
        deptname: null,
        creater: null,
        createtime: null,
        finishtime: null,
        workitemname: null,
        orgcd: null,
        orgname: null,
        owner: null,
        ownername: null,
        rolename: null,
        conclusion: null,
        presenttime: null,
        opinion: null,
        flowType: null,
        planBizId: null,
        reportDate: null,
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
      getZkrProjectPlanFlow(bookBranch).then(response => {
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
            updateZkrProjectPlanFlow(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectPlanFlow(this.form).then(response => {
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
          return delZkrProjectPlanFlow(bookBranchs);
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
          return exportZkrProjectPlanFlow(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
