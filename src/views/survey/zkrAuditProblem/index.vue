<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属机构" prop="stdCode">
        <el-input
          v-model="queryParams.stdCode"
          placeholder="请输入所属机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属机构名称" prop="stdName">
        <el-input
          v-model="queryParams.stdName"
          placeholder="请输入所属机构名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="核心客户号" prop="crmEcCustNo">
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
      <el-form-item label="项目编号" prop="projectNo">
        <el-input
          v-model="queryParams.projectNo"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目编号" prop="projId">
        <el-input
          v-model="queryParams.projId"
          placeholder="请输入项目编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计项目名称" prop="auditProjName">
        <el-input
          v-model="queryParams.auditProjName"
          placeholder="请输入审计项目名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计年度" prop="projYear">
        <el-input
          v-model="queryParams.projYear"
          placeholder="请输入审计年度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作底稿编号" prop="workrecordId">
        <el-input
          v-model="queryParams.workrecordId"
          placeholder="请输入工作底稿编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计部门名称" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入审计部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="问题来源名称" prop="problemOriginName">
        <el-input
          v-model="queryParams.problemOriginName"
          placeholder="请输入问题来源名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内外审问题" prop="neiOrWai">
        <el-input
          v-model="queryParams.neiOrWai"
          placeholder="请输入内外审问题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="问题性质描述" prop="problemPropertyName">
        <el-input
          v-model="queryParams.problemPropertyName"
          placeholder="请输入问题性质描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涉及业务条线名称" prop="bussiTypeName">
        <el-input
          v-model="queryParams.bussiTypeName"
          placeholder="请输入涉及业务条线名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属行业名称" prop="industryName">
        <el-input
          v-model="queryParams.industryName"
          placeholder="请输入所属行业名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涉及业务产品名称" prop="bussiProductName">
        <el-input
          v-model="queryParams.bussiProductName"
          placeholder="请输入涉及业务产品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属流程名称" prop="problemWorkflowName">
        <el-input
          v-model="queryParams.problemWorkflowName"
          placeholder="请输入所属流程名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涉及金额币种" prop="invAmtBz">
        <el-input
          v-model="queryParams.invAmtBz"
          placeholder="请输入涉及金额币种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涉及金额" prop="invAmt">
        <el-input
          v-model="queryParams.invAmt"
          placeholder="请输入涉及金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涉及资产质量分类号" prop="typeDouble">
        <el-input
          v-model="queryParams.typeDouble"
          placeholder="请输入涉及资产质量分类号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否属于内控缺陷" prop="isDefect">
        <el-input
          v-model="queryParams.isDefect"
          placeholder="请输入是否属于内控缺陷"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否属于重大问题" prop="isImplProblem">
        <el-input
          v-model="queryParams.isImplProblem"
          placeholder="请输入是否属于重大问题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计下达意见书或提示函时间" prop="adviceDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.adviceDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审计下达意见书或提示函时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="未完成整改问题的预计完成整改时间" prop="noRectDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.noRectDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择未完成整改问题的预计完成整改时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="具体整改责任人" prop="rectDept">
        <el-input
          v-model="queryParams.rectDept"
          placeholder="请输入具体整改责任人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="督促整改责任人" prop="rectRespPerson">
        <el-input
          v-model="queryParams.rectRespPerson"
          placeholder="请输入督促整改责任人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计成果转化分类名称" prop="resultTypeName">
        <el-input
          v-model="queryParams.resultTypeName"
          placeholder="请输入审计成果转化分类名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审计成果转化细分名称" prop="resultDetailName">
        <el-input
          v-model="queryParams.resultDetailName"
          placeholder="请输入审计成果转化细分名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="避免或挽回损失的币种" prop="lossAmtBz">
        <el-input
          v-model="queryParams.lossAmtBz"
          placeholder="请输入避免或挽回损失的币种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="避免或挽回损失金额" prop="lossAmt">
        <el-input
          v-model="queryParams.lossAmt"
          placeholder="请输入避免或挽回损失金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="审计报告时间" prop="reportDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.reportDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审计报告时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="业务类型名称" prop="auditTypeName">
        <el-input
          v-model="queryParams.auditTypeName"
          placeholder="请输入业务类型名称"
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
          v-hasPermi="['survey:zkrAuditProblem:add']"
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
          v-hasPermi="['survey:zkrAuditProblem:edit']"
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
          v-hasPermi="['survey:zkrAuditProblem:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrAuditProblem:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrAuditProblemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构" align="center" prop="stdCode" />
      <el-table-column label="所属机构名称" align="center" prop="stdName" />
      <el-table-column label="核心客户号" align="center" prop="crmEcCustNo" />
      <el-table-column label="客户名称" align="center" prop="crmCustName" />
      <el-table-column label="项目编号" align="center" prop="projectNo" />
      <el-table-column label="项目名称" align="center" prop="projectName" />
      <el-table-column label="项目编号" align="center" prop="projId" /> -->
      <el-table-column label="审计项目名称" align="center" prop="auditProjName" />
      <!-- <el-table-column label="审计年度" align="center" prop="projYear" />
      <el-table-column label="工作底稿编号" align="center" prop="workrecordId" />
      <el-table-column label="审计部门名称" align="center" prop="deptName" />
      <el-table-column label="领导批示" align="center" prop="leaderComment" />
      <el-table-column label="问题ID" align="center" prop="problemId" />
      <el-table-column label="问题描述" align="center" prop="problemDesc" />
      <el-table-column label="问题分类名称" align="center" prop="problemTypeName" />
      <el-table-column label="问题来源名称" align="center" prop="problemOriginName" />
      <el-table-column label="内外审问题" align="center" prop="neiOrWai" />
      <el-table-column label="问题性质描述" align="center" prop="problemPropertyName" />
      <el-table-column label="定性依据" align="center" prop="problemBasis" />
      <el-table-column label="审计建议" align="center" prop="auditAdvice" />
      <el-table-column label="问题成因" align="center" prop="problemReason" /> -->
      <el-table-column label="涉及业务条线名称" align="center" prop="bussiTypeName" />
      <el-table-column label="所属行业名称" align="center" prop="industryName" />
      <el-table-column label="涉及业务产品名称" align="center" prop="bussiProductName" />
      <el-table-column label="所属流程名称" align="center" prop="problemWorkflowName" />
      <el-table-column label="涉及项目名称" align="center" prop="invProjName" />
      <el-table-column label="涉及客户名称" align="center" prop="invCustomer" />
      <el-table-column label="涉及金额币种" align="center" prop="invAmtBz" />
      <el-table-column label="涉及金额" align="center" prop="invAmt" />
      <!-- <el-table-column label="涉及资产质量分类号" align="center" prop="typeDouble" />
      <el-table-column label="是否属于内控缺陷" align="center" prop="isDefect" />
      <el-table-column label="是否属于重大问题" align="center" prop="isImplProblem" />
      <el-table-column label="审计下达意见书或提示函时间" align="center" prop="adviceDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.adviceDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="整改状态名称" align="center" prop="rectResulTypeName" />
      <el-table-column label="完成整改依据描述" align="center" prop="rectResulDesc" />
      <el-table-column label="未完成整改原因说明" align="center" prop="noRectReason" />
      <el-table-column label="未完成整改问题的预计完成整改时间" align="center" prop="noRectDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.noRectDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="具体整改责任人" align="center" prop="rectDept" />
      <el-table-column label="督促整改责任人" align="center" prop="rectRespPerson" />
      <el-table-column label="审计成果转化分类名称" align="center" prop="resultTypeName" />
      <el-table-column label="审计成果转化细分名称" align="center" prop="resultDetailName" />
      <el-table-column label="审计成果转化情况" align="center" prop="resultInfo" />
      <el-table-column label="避免或挽回损失的币种" align="center" prop="lossAmtBz" />
      <el-table-column label="避免或挽回损失金额" align="center" prop="lossAmt" />
      <el-table-column label="审计贡献度" align="center" prop="auditContri" />
      <el-table-column label="审计报告时间" align="center" prop="reportDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reportDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题或建议主贡献人" align="center" prop="adviceContri" />
      <el-table-column label="问题或建议辅贡献人" align="center" prop="adviceSecondContri" />
      <el-table-column label="业务类型名称" align="center" prop="auditTypeName" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrAuditProblem:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrAuditProblem:remove']"
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
        <el-form-item label="所属机构" prop="stdCode">
          <el-input v-model="form.stdCode" placeholder="请输入所属机构" />
        </el-form-item>
        <el-form-item label="所属机构名称" prop="stdName">
          <el-input v-model="form.stdName" placeholder="请输入所属机构名称" />
        </el-form-item>
        <el-form-item label="核心客户号" prop="crmEcCustNo">
          <el-input v-model="form.crmEcCustNo" placeholder="请输入核心客户号" />
        </el-form-item>
        <el-form-item label="客户名称" prop="crmCustName">
          <el-input v-model="form.crmCustName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNo">
          <el-input v-model="form.projectNo" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projId">
          <el-input v-model="form.projId" placeholder="请输入项目编号" />
        </el-form-item>
        <el-form-item label="审计项目名称" prop="auditProjName">
          <el-input v-model="form.auditProjName" placeholder="请输入审计项目名称" />
        </el-form-item>
        <el-form-item label="审计年度" prop="projYear">
          <el-input v-model="form.projYear" placeholder="请输入审计年度" />
        </el-form-item>
        <el-form-item label="工作底稿编号" prop="workrecordId">
          <el-input v-model="form.workrecordId" placeholder="请输入工作底稿编号" />
        </el-form-item>
        <el-form-item label="审计部门名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入审计部门名称" />
        </el-form-item>
        <el-form-item label="领导批示" prop="leaderComment">
          <el-input v-model="form.leaderComment" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题ID" prop="problemId">
          <el-input v-model="form.problemId" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题描述" prop="problemDesc">
          <el-input v-model="form.problemDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题分类名称" prop="problemTypeName">
          <el-input v-model="form.problemTypeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题来源名称" prop="problemOriginName">
          <el-input v-model="form.problemOriginName" placeholder="请输入问题来源名称" />
        </el-form-item>
        <el-form-item label="内外审问题" prop="neiOrWai">
          <el-input v-model="form.neiOrWai" placeholder="请输入内外审问题" />
        </el-form-item>
        <el-form-item label="问题性质描述" prop="problemPropertyName">
          <el-input v-model="form.problemPropertyName" placeholder="请输入问题性质描述" />
        </el-form-item>
        <el-form-item label="定性依据" prop="problemBasis">
          <el-input v-model="form.problemBasis" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审计建议" prop="auditAdvice">
          <el-input v-model="form.auditAdvice" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题成因" prop="problemReason">
          <el-input v-model="form.problemReason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="涉及业务条线名称" prop="bussiTypeName">
          <el-input v-model="form.bussiTypeName" placeholder="请输入涉及业务条线名称" />
        </el-form-item>
        <el-form-item label="所属行业名称" prop="industryName">
          <el-input v-model="form.industryName" placeholder="请输入所属行业名称" />
        </el-form-item>
        <el-form-item label="涉及业务产品名称" prop="bussiProductName">
          <el-input v-model="form.bussiProductName" placeholder="请输入涉及业务产品名称" />
        </el-form-item>
        <el-form-item label="所属流程名称" prop="problemWorkflowName">
          <el-input v-model="form.problemWorkflowName" placeholder="请输入所属流程名称" />
        </el-form-item>
        <el-form-item label="涉及项目名称" prop="invProjName">
          <el-input v-model="form.invProjName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="涉及客户名称" prop="invCustomer">
          <el-input v-model="form.invCustomer" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="涉及金额币种" prop="invAmtBz">
          <el-input v-model="form.invAmtBz" placeholder="请输入涉及金额币种" />
        </el-form-item>
        <el-form-item label="涉及金额" prop="invAmt">
          <el-input v-model="form.invAmt" placeholder="请输入涉及金额" />
        </el-form-item>
        <el-form-item label="涉及资产质量分类号" prop="typeDouble">
          <el-input v-model="form.typeDouble" placeholder="请输入涉及资产质量分类号" />
        </el-form-item>
        <el-form-item label="是否属于内控缺陷" prop="isDefect">
          <el-input v-model="form.isDefect" placeholder="请输入是否属于内控缺陷" />
        </el-form-item>
        <el-form-item label="是否属于重大问题" prop="isImplProblem">
          <el-input v-model="form.isImplProblem" placeholder="请输入是否属于重大问题" />
        </el-form-item>
        <el-form-item label="审计下达意见书或提示函时间" prop="adviceDate">
          <el-date-picker clearable size="small"
            v-model="form.adviceDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审计下达意见书或提示函时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="整改状态名称" prop="rectResulTypeName">
          <el-input v-model="form.rectResulTypeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="完成整改依据描述" prop="rectResulDesc">
          <el-input v-model="form.rectResulDesc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="未完成整改原因说明" prop="noRectReason">
          <el-input v-model="form.noRectReason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="未完成整改问题的预计完成整改时间" prop="noRectDate">
          <el-date-picker clearable size="small"
            v-model="form.noRectDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择未完成整改问题的预计完成整改时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="具体整改责任人" prop="rectDept">
          <el-input v-model="form.rectDept" placeholder="请输入具体整改责任人" />
        </el-form-item>
        <el-form-item label="督促整改责任人" prop="rectRespPerson">
          <el-input v-model="form.rectRespPerson" placeholder="请输入督促整改责任人" />
        </el-form-item>
        <el-form-item label="审计成果转化分类名称" prop="resultTypeName">
          <el-input v-model="form.resultTypeName" placeholder="请输入审计成果转化分类名称" />
        </el-form-item>
        <el-form-item label="审计成果转化细分名称" prop="resultDetailName">
          <el-input v-model="form.resultDetailName" placeholder="请输入审计成果转化细分名称" />
        </el-form-item>
        <el-form-item label="审计成果转化情况" prop="resultInfo">
          <el-input v-model="form.resultInfo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="避免或挽回损失的币种" prop="lossAmtBz">
          <el-input v-model="form.lossAmtBz" placeholder="请输入避免或挽回损失的币种" />
        </el-form-item>
        <el-form-item label="避免或挽回损失金额" prop="lossAmt">
          <el-input v-model="form.lossAmt" placeholder="请输入避免或挽回损失金额" />
        </el-form-item>
        <el-form-item label="审计贡献度" prop="auditContri">
          <el-input v-model="form.auditContri" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="审计报告时间" prop="reportDate">
          <el-date-picker clearable size="small"
            v-model="form.reportDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审计报告时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="问题或建议主贡献人" prop="adviceContri">
          <el-input v-model="form.adviceContri" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="问题或建议辅贡献人" prop="adviceSecondContri">
          <el-input v-model="form.adviceSecondContri" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="业务类型名称" prop="auditTypeName">
          <el-input v-model="form.auditTypeName" placeholder="请输入业务类型名称" />
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
import { listZkrAuditProblem, getZkrAuditProblem, delZkrAuditProblem, addZkrAuditProblem, updateZkrAuditProblem, exportZkrAuditProblem } from "@/api/survey/zkrAuditProblem";

export default {
  name: "ZkrAuditProblem",
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
      zkrAuditProblemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stdCode: null,
        stdName: null,
        crmEcCustNo: null,
        crmCustName: null,
        projectNo: null,
        projectName: null,
        projId: null,
        auditProjName: null,
        projYear: null,
        workrecordId: null,
        deptName: null,
        leaderComment: null,
        problemId: null,
        problemDesc: null,
        problemTypeName: null,
        problemOriginName: null,
        neiOrWai: null,
        problemPropertyName: null,
        problemBasis: null,
        auditAdvice: null,
        problemReason: null,
        bussiTypeName: null,
        industryName: null,
        bussiProductName: null,
        problemWorkflowName: null,
        invProjName: null,
        invCustomer: null,
        invAmtBz: null,
        invAmt: null,
        typeDouble: null,
        isDefect: null,
        isImplProblem: null,
        adviceDate: null,
        rectResulTypeName: null,
        rectResulDesc: null,
        noRectReason: null,
        noRectDate: null,
        rectDept: null,
        rectRespPerson: null,
        resultTypeName: null,
        resultDetailName: null,
        resultInfo: null,
        lossAmtBz: null,
        lossAmt: null,
        auditContri: null,
        reportDate: null,
        adviceContri: null,
        adviceSecondContri: null,
        auditTypeName: null,
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
      listZkrAuditProblem(this.queryParams).then(response => {
        this.zkrAuditProblemList = response.rows;
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
        stdCode: null,
        stdName: null,
        crmEcCustNo: null,
        crmCustName: null,
        projectNo: null,
        projectName: null,
        projId: null,
        auditProjName: null,
        projYear: null,
        workrecordId: null,
        deptName: null,
        leaderComment: null,
        problemId: null,
        problemDesc: null,
        problemTypeName: null,
        problemOriginName: null,
        neiOrWai: null,
        problemPropertyName: null,
        problemBasis: null,
        auditAdvice: null,
        problemReason: null,
        bussiTypeName: null,
        industryName: null,
        bussiProductName: null,
        problemWorkflowName: null,
        invProjName: null,
        invCustomer: null,
        invAmtBz: null,
        invAmt: null,
        typeDouble: null,
        isDefect: null,
        isImplProblem: null,
        adviceDate: null,
        rectResulTypeName: null,
        rectResulDesc: null,
        noRectReason: null,
        noRectDate: null,
        rectDept: null,
        rectRespPerson: null,
        resultTypeName: null,
        resultDetailName: null,
        resultInfo: null,
        lossAmtBz: null,
        lossAmt: null,
        auditContri: null,
        reportDate: null,
        adviceContri: null,
        adviceSecondContri: null,
        auditTypeName: null,
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
      this.ids = selection.map(item => item.stdCode)
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
      const stdCode = row.stdCode || this.ids
      getZkrAuditProblem(stdCode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.stdCode != null) {
            updateZkrAuditProblem(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrAuditProblem(this.form).then(response => {
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
      const stdCodes = row.stdCode || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + stdCodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delZkrAuditProblem(stdCodes);
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
          return exportZkrAuditProblem(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
