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
      <el-form-item label="评级类型" prop="ratingtype">
        <el-select v-model="queryParams.ratingtype" placeholder="请选择评级类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="信用评级日期" prop="confirmdate">
        <el-date-picker clearable size="small"
          v-model="queryParams.confirmdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择信用评级日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="评级结果" prop="finalgrade">
        <el-input
          v-model="queryParams.finalgrade"
          placeholder="请输入评级结果"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="是否模型推翻" prop="isthrowcustscale">
        <el-input
          v-model="queryParams.isthrowcustscale"
          placeholder="请输入是否模型推翻"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否因素调整" prop="isAdjust">
        <el-input
          v-model="queryParams.isAdjust"
          placeholder="请输入是否因素调整"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="因素调整原因" prop="ratingtaskId">
        <el-input
          v-model="queryParams.ratingtaskId"
          placeholder="请输入因素调整原因"
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
          v-hasPermi="['survey:zkrCustNbcreditGrade:add']"
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
          v-hasPermi="['survey:zkrCustNbcreditGrade:edit']"
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
          v-hasPermi="['survey:zkrCustNbcreditGrade:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:zkrCustNbcreditGrade:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="zkrCustNbcreditGradeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="所属机构" align="center" prop="crmOrgId" />
      <el-table-column label="所属机构名称" align="center" prop="crmOrgName" />
      <el-table-column label="核心客户号" align="center" prop="crmEcCustNo" />
      <el-table-column label="客户名称" align="center" prop="crmCustName" />
      <el-table-column label="评级类型" align="center" prop="ratingtype" /> -->
      <el-table-column label="信用评级日期" align="center" prop="confirmdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.confirmdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评级结果" align="center" prop="finalgrade" />
      <el-table-column label="风险提示" align="center" prop="riskTip" />
      <el-table-column label="是否模型推翻" align="center" prop="isthrowcustscale" />
      <el-table-column label="推翻理由" align="center" prop="throwreason" />
      <el-table-column label="是否因素调整" align="center" prop="isAdjust" />
      <!-- <el-table-column label="因素调整原因" align="center" prop="adjustreason" />
      <el-table-column label="因素调整原因" align="center" prop="ratingtaskId" />
      <el-table-column label="数据来源" align="center" prop="ds" />
      <el-table-column label="数据时点" align="center" prop="dd" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:zkrCustNbcreditGrade:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:zkrCustNbcreditGrade:remove']"
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
        <el-form-item label="评级类型" prop="ratingtype">
          <el-select v-model="form.ratingtype" placeholder="请选择评级类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="信用评级日期" prop="confirmdate">
          <el-date-picker clearable size="small"
            v-model="form.confirmdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择信用评级日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评级结果" prop="finalgrade">
          <el-input v-model="form.finalgrade" placeholder="请输入评级结果" />
        </el-form-item>
        <el-form-item label="风险提示" prop="riskTip">
          <el-input v-model="form.riskTip" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否模型推翻" prop="isthrowcustscale">
          <el-input v-model="form.isthrowcustscale" placeholder="请输入是否模型推翻" />
        </el-form-item>
        <el-form-item label="推翻理由" prop="throwreason">
          <el-input v-model="form.throwreason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否因素调整" prop="isAdjust">
          <el-input v-model="form.isAdjust" placeholder="请输入是否因素调整" />
        </el-form-item>
        <el-form-item label="因素调整原因" prop="adjustreason">
          <el-input v-model="form.adjustreason" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="因素调整原因" prop="ratingtaskId">
          <el-input v-model="form.ratingtaskId" placeholder="请输入因素调整原因" />
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
import { listZkrCustNbcreditGrade, getZkrCustNbcreditGrade, delZkrCustNbcreditGrade, addZkrCustNbcreditGrade, updateZkrCustNbcreditGrade, exportZkrCustNbcreditGrade } from "@/api/survey/zkrCustNbcreditGrade";

export default {
  name: "ZkrCustNbcreditGrade",
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
      zkrCustNbcreditGradeList: [],
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
        ratingtype: null,
        confirmdate: null,
        finalgrade: null,
        riskTip: null,
        isthrowcustscale: null,
        throwreason: null,
        isAdjust: null,
        adjustreason: null,
        ratingtaskId: null,
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
      listZkrCustNbcreditGrade(this.queryParams).then(response => {
        this.zkrCustNbcreditGradeList = response.rows;
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
        ratingtype: null,
        confirmdate: null,
        finalgrade: null,
        riskTip: null,
        isthrowcustscale: null,
        throwreason: null,
        isAdjust: null,
        adjustreason: null,
        ratingtaskId: null,
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
      getZkrCustNbcreditGrade(crmOrgId).then(response => {
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
            updateZkrCustNbcreditGrade(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addZkrCustNbcreditGrade(this.form).then(response => {
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
          return delZkrCustNbcreditGrade(crmOrgIds);
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
          return exportZkrCustNbcreditGrade(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
