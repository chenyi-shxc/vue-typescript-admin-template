<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="人员OA号" prop="personOa">
        <el-input
          v-model="queryParams.personOa"
          placeholder="请输入人员OA号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员姓名" prop="personName">
        <el-input
          v-model="queryParams.personName"
          placeholder="请输入人员姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员所属部门代码" prop="personOrgcode">
        <el-input
          v-model="queryParams.personOrgcode"
          placeholder="请输入人员所属部门代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员所属部门名称" prop="personOrgname">
        <el-input
          v-model="queryParams.personOrgname"
          placeholder="请输入人员所属部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员所属机构代码" prop="personTopOrgcode">
        <el-input
          v-model="queryParams.personTopOrgcode"
          placeholder="请输入人员所属机构代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员所属机构名称" prop="personTopOrgname">
        <el-input
          v-model="queryParams.personTopOrgname"
          placeholder="请输入人员所属机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="人员性别" prop="personSex">
        <el-select v-model="queryParams.personSex" placeholder="请选择人员性别" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目对应机构号" prop="bookBranch">
        <el-input
          v-model="queryParams.bookBranch"
          placeholder="请输入项目对应机构号"
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
      <el-form-item label="项目编号" prop="projectNo">
        <el-input
          v-model="queryParams.projectNo"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资产质量分类" prop="headIdentifiedClass">
        <el-input
          v-model="queryParams.headIdentifiedClass"
          placeholder="请输入资产质量分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否不良贷款项目" prop="isBadloan">
        <el-input
          v-model="queryParams.isBadloan"
          placeholder="请输入是否不良贷款项目"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="对应业务日期" prop="bizDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.bizDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择对应业务日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="业务环节 " prop="flowType">
        <el-select v-model="queryParams.flowType" placeholder="请选择业务环节 " clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
      <el-form-item label="审批部门" prop="orgcd">
        <el-input
          v-model="queryParams.orgcd"
          placeholder="请输入审批部门"
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
      <el-form-item label="标准专业职务名称" prop="postMajorName">
        <el-input
          v-model="queryParams.postMajorName"
          placeholder="请输入标准专业职务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准管理职务名称" prop="postManageName">
        <el-input
          v-model="queryParams.postManageName"
          placeholder="请输入标准管理职务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准管理职务名称" prop="hasOutstanding">
        <el-input
          v-model="queryParams.hasOutstanding"
          placeholder="请输入标准管理职务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准管理职务名称" prop="isSurvey">
        <el-input
          v-model="queryParams.isSurvey"
          placeholder="请输入标准管理职务名称"
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
          v-hasPermi="['survey:zkrProjectFlowPerson:add']"
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
          v-hasPermi="['survey:zkrProjectFlowPerson:edit']"
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
          v-hasPermi="['survey:zkrProjectFlowPerson:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrProjectFlowPerson:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrProjectFlowPersonList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="人员OA号" align="center" prop="personOa" />
      <el-table-column label="人员姓名" align="center" prop="personName" />
      <el-table-column label="人员所属部门代码" align="center" prop="personOrgcode" />
      <el-table-column label="人员所属部门名称" align="center" prop="personOrgname" />
      <el-table-column label="人员所属机构代码" align="center" prop="personTopOrgcode" />
      <el-table-column label="人员所属机构名称" align="center" prop="personTopOrgname" />
      <el-table-column label="人员性别" align="center" prop="personSex" />
      <el-table-column label="项目对应机构号" align="center" prop="bookBranch" />
      <el-table-column label="项目对应机构名称" align="center" prop="branchName" />
      <el-table-column label="核心客户号" align="center" prop="custNo" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="资产质量分类" align="center" prop="headIdentifiedClass" />
      <el-table-column label="是否不良贷款项目" align="center" prop="isBadloan" />
      <el-table-column label="对应业务ID" align="center" prop="bizId" />
      <el-table-column label="对应业务日期" align="center" prop="bizDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.bizDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务环节 " align="center" prop="flowType" />
      <el-table-column label="流程实例ID" align="center" prop="processid" />
      <el-table-column label="流程名称" align="center" prop="templatename" />
      <el-table-column label="发起人" align="center" prop="creater" />
      <el-table-column label="发起部门/机构" align="center" prop="createorg" />
      <el-table-column label="机构名称" align="center" prop="createorgname" />
      <el-table-column label="发起部门名称" align="center" prop="deptname" />
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
      <el-table-column label="审批节点名称" align="center" prop="workitemname" />
      <el-table-column label="审批部门" align="center" prop="orgcd" />
      <el-table-column label="审批机构" align="center" prop="orgname" />
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
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" />
      <el-table-column label="标准专业职务名称" align="center" prop="postMajorName" />
      <el-table-column label="标准管理职务名称" align="center" prop="postManageName" />
      <el-table-column label="标准管理职务名称" align="center" prop="hasOutstanding" />
      <el-table-column label="标准管理职务名称" align="center" prop="isSurvey" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrProjectFlowPerson:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrProjectFlowPerson:remove']"
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
        <el-form-item label="人员OA号" prop="personOa">
          <el-input v-model="form.personOa" placeholder="请输入人员OA号" />
        </el-form-item>
        <el-form-item label="人员姓名" prop="personName">
          <el-input v-model="form.personName" placeholder="请输入人员姓名" />
        </el-form-item>
        <el-form-item label="人员所属部门代码" prop="personOrgcode">
          <el-input v-model="form.personOrgcode" placeholder="请输入人员所属部门代码" />
        </el-form-item>
        <el-form-item label="人员所属部门名称" prop="personOrgname">
          <el-input v-model="form.personOrgname" placeholder="请输入人员所属部门名称" />
        </el-form-item>
        <el-form-item label="人员所属机构代码" prop="personTopOrgcode">
          <el-input v-model="form.personTopOrgcode" placeholder="请输入人员所属机构代码" />
        </el-form-item>
        <el-form-item label="人员所属机构名称" prop="personTopOrgname">
          <el-input v-model="form.personTopOrgname" placeholder="请输入人员所属机构名称" />
        </el-form-item>
        <el-form-item label="人员性别" prop="personSex">
          <el-select v-model="form.personSex" placeholder="请选择人员性别">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目对应机构号" prop="bookBranch">
          <el-input v-model="form.bookBranch" placeholder="请输入项目对应机构号" />
        </el-form-item>
        <el-form-item label="项目对应机构名称" prop="branchName">
          <el-input v-model="form.branchName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="custNo">
          <el-input v-model="form.custNo" placeholder="请输入核心客户号" />
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
        <el-form-item label="资产质量分类" prop="headIdentifiedClass">
          <el-input v-model="form.headIdentifiedClass" placeholder="请输入资产质量分类" />
        </el-form-item>
        <el-form-item label="是否不良贷款项目" prop="isBadloan">
          <el-input v-model="form.isBadloan" placeholder="请输入是否不良贷款项目" />
        </el-form-item>
        <el-form-item label="对应业务ID" prop="bizId">
          <el-input v-model="form.bizId" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="对应业务日期" prop="bizDate">
          <el-date-picker clearable size="small"
            v-model="form.bizDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择对应业务日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="业务环节 " prop="flowType">
          <el-select v-model="form.flowType" placeholder="请选择业务环节 ">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="流程实例ID" prop="processid">
          <el-input v-model="form.processid" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="流程名称" prop="templatename">
          <el-input v-model="form.templatename" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发起人" prop="creater">
          <el-input v-model="form.creater" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发起部门/机构" prop="createorg">
          <el-input v-model="form.createorg" placeholder="请输入发起部门/机构" />
        </el-form-item>
        <el-form-item label="机构名称" prop="createorgname">
          <el-input v-model="form.createorgname" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发起部门名称" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入发起部门名称" />
        </el-form-item>
        <el-form-item label="流程结束时间" prop="finishtime">
          <el-date-picker clearable size="small"
            v-model="form.finishtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择流程结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审批节点名称" prop="workitemname">
          <el-input v-model="form.workitemname" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审批部门" prop="orgcd">
          <el-input v-model="form.orgcd" placeholder="请输入审批部门" />
        </el-form-item>
        <el-form-item label="审批机构" prop="orgname">
          <el-input v-model="form.orgname" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审批人" prop="owner">
          <el-input v-model="form.owner" type="textarea" placeholder="请输入内容" />
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
        <el-form-item label="数据来源" prop="ds">
          <el-input v-model="form.ds" placeholder="请输入数据来源" />
        </el-form-item>
        <el-form-item label="数据时点" prop="dd">
          <el-input v-model="form.dd" placeholder="请输入数据时点" />
        </el-form-item>
        <el-form-item label="标准专业职务名称" prop="postMajorName">
          <el-input v-model="form.postMajorName" placeholder="请输入标准专业职务名称" />
        </el-form-item>
        <el-form-item label="标准管理职务名称" prop="postManageName">
          <el-input v-model="form.postManageName" placeholder="请输入标准管理职务名称" />
        </el-form-item>
        <el-form-item label="标准管理职务名称" prop="hasOutstanding">
          <el-input v-model="form.hasOutstanding" placeholder="请输入标准管理职务名称" />
        </el-form-item>
        <el-form-item label="标准管理职务名称" prop="isSurvey">
          <el-input v-model="form.isSurvey" placeholder="请输入标准管理职务名称" />
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
import { listZkrProjectFlowPerson, getZkrProjectFlowPerson, delZkrProjectFlowPerson, addZkrProjectFlowPerson, updateZkrProjectFlowPerson, exportZkrProjectFlowPerson } from "@/api/survey/zkrProjectFlowPerson";

export default {
  name: "ZkrProjectFlowPerson",
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
      zkrProjectFlowPersonList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        personOa: null,
        personName: null,
        personOrgcode: null,
        personOrgname: null,
        personTopOrgcode: null,
        personTopOrgname: null,
        personSex: null,
        bookBranch: null,
        branchName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        headIdentifiedClass: null,
        isBadloan: null,
        bizId: null,
        bizDate: null,
        flowType: null,
        processid: null,
        templatename: null,
        creater: null,
        createorg: null,
        createorgname: null,
        deptname: null,
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
        ds: null,
        dd: null,
        postMajorName: null,
        postManageName: null,
        hasOutstanding: null,
        isSurvey: null
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
      listZkrProjectFlowPerson(this.queryParams).then(response => {
        this.zkrProjectFlowPersonList = response.rows;
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
        personOa: null,
        personName: null,
        personOrgcode: null,
        personOrgname: null,
        personTopOrgcode: null,
        personTopOrgname: null,
        personSex: null,
        bookBranch: null,
        branchName: null,
        custNo: null,
        custName: null,
        projectNo: null,
        projectName: null,
        headIdentifiedClass: null,
        isBadloan: null,
        bizId: null,
        bizDate: null,
        flowType: null,
        processid: null,
        templatename: null,
        creater: null,
        createorg: null,
        createorgname: null,
        deptname: null,
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
        ds: null,
        dd: null,
        postMajorName: null,
        postManageName: null,
        hasOutstanding: null,
        isSurvey: null
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
      this.ids = selection.map(item => item.personOa)
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
      const personOa = row.personOa || this.ids
      getZkrProjectFlowPerson(personOa).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.personOa != null) {
            updateZkrProjectFlowPerson(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrProjectFlowPerson(this.form).then(response => {
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
      const personOas = row.personOa || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + personOas + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrProjectFlowPerson(personOas);
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
          return exportZkrProjectFlowPerson(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
