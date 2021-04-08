<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="模型编号" prop="modelNo">
        <el-input
          v-model="queryParams.modelNo"
          placeholder="请输入模型编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="模型名称" prop="modelName">
        <el-input
          v-model="queryParams.modelName"
          placeholder="请输入模型名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="二级分类" prop="creator">
        <el-input
          v-model="queryParams.creator"
          placeholder="请输入二级分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="专题类型" prop="orgCode">
        <el-input
          v-model="queryParams.orgCode"
          placeholder="请输入专题类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="疑点数量" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择疑点数量" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="验证机构" prop="prodCatSecondLevel">
        <el-input
          v-model="queryParams.prodCatSecondLevel"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="prodCatThirdLevel">
        <el-input
          v-model="queryParams.prodCatThirdLevel"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="specSubject">
        <el-input
          v-model="queryParams.specSubject"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="modelFunc">
        <el-input
          v-model="queryParams.modelFunc"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="adtBasis">
        <el-input
          v-model="queryParams.adtBasis"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="wholeIdea">
        <el-input
          v-model="queryParams.wholeIdea"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="detailIdea">
        <el-input
          v-model="queryParams.detailIdea"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验证机构" prop="modelPriority">
        <el-input
          v-model="queryParams.modelPriority"
          placeholder="请输入验证机构"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['survey:stModer:add']"
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
          v-hasPermi="['survey:stModer:edit']"
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
          v-hasPermi="['survey:stModer:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['survey:stModer:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="stModerList"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="ID" align="center" prop="mpModelBaseInfoId" /> -->
      <el-table-column label="模型编号" align="center" prop="modelNo" />
      <el-table-column label="模型名称" align="center" prop="modelName" />
      <!-- <el-table-column label="一级分类" align="center" prop="contributor" />
      <el-table-column label="二级分类" align="center" prop="creator" /> -->
      <el-table-column label="专题类型" align="center" prop="orgCode" />
      <el-table-column label="模型类型" align="center" prop="label" />
      <el-table-column label="疑点数量" align="center" prop="status" />
      <!-- <el-table-column label="预警级别" align="center" prop="modelRiskTypeId" />
      <el-table-column
        label="模型评价"
        align="center"
        prop="busiCatFirstLevel"
      />
      <el-table-column
        label="模型点击数"
        align="center"
        prop="busiCatSecondLevel"
      /> -->
      <el-table-column label="模型评价" align="center" prop="busiCatFirstLevel">
        <template slot-scope="scope">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </template>
      </el-table-column>

      <!-- <el-table-column label="是否验证" align="center" prop="busiCatThirdLevel" /> -->
      <!-- <el-table-column label="验证机构" align="center" prop="prodCatFirstLevel" />
      <el-table-column label="验证机构" align="center" prop="prodCatSecondLevel" />
      <el-table-column label="验证机构" align="center" prop="prodCatThirdLevel" />
      <el-table-column label="验证机构" align="center" prop="specSubject" />
      <el-table-column label="验证机构" align="center" prop="modelFunc" />
      <el-table-column label="验证机构" align="center" prop="adtBasis" />
      <el-table-column label="验证机构" align="center" prop="wholeIdea" />
      <el-table-column label="验证机构" align="center" prop="detailIdea" />
      <el-table-column label="验证机构" align="center" prop="modelPriority" /> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-s-data"
            @click="viewModelResult(scope.row)"
            >查看结果</el-button
          >
        </template>
        <!-- <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['survey:stModer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['survey:stModer:remove']"
          >删除</el-button>
        </template> -->
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改审计模型列对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="模型编号" prop="modelNo">
          <el-input v-model="form.modelNo" placeholder="请输入模型编号" />
        </el-form-item>
        <el-form-item label="模型名称" prop="modelName">
          <el-input v-model="form.modelName" placeholder="请输入模型名称" />
        </el-form-item>
        <el-form-item label="一级分类" prop="contributor">
          <el-input
            v-model="form.contributor"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="二级分类" prop="creator">
          <el-input v-model="form.creator" placeholder="请输入二级分类" />
        </el-form-item>
        <el-form-item label="专题类型" prop="orgCode">
          <el-input v-model="form.orgCode" placeholder="请输入专题类型" />
        </el-form-item>
        <el-form-item label="模型类型" prop="label">
          <el-input
            v-model="form.label"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="疑点数量">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预警级别" prop="modelRiskTypeId">
          <el-input
            v-model="form.modelRiskTypeId"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="模型评价" prop="busiCatFirstLevel">
          <el-input
            v-model="form.busiCatFirstLevel"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="模型点击数" prop="busiCatSecondLevel">
          <el-input
            v-model="form.busiCatSecondLevel"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="是否验证" prop="busiCatThirdLevel">
          <el-input
            v-model="form.busiCatThirdLevel"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="验证机构" prop="prodCatFirstLevel">
          <el-input
            v-model="form.prodCatFirstLevel"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="验证机构" prop="prodCatSecondLevel">
          <el-input
            v-model="form.prodCatSecondLevel"
            placeholder="请输入验证机构"
          />
        </el-form-item>
        <el-form-item label="验证机构" prop="prodCatThirdLevel">
          <el-input
            v-model="form.prodCatThirdLevel"
            placeholder="请输入验证机构"
          />
        </el-form-item>
        <el-form-item label="验证机构" prop="specSubject">
          <el-input v-model="form.specSubject" placeholder="请输入验证机构" />
        </el-form-item>
        <el-form-item label="验证机构" prop="modelFunc">
          <el-input v-model="form.modelFunc" placeholder="请输入验证机构" />
        </el-form-item>
        <el-form-item label="验证机构" prop="adtBasis">
          <el-input v-model="form.adtBasis" placeholder="请输入验证机构" />
        </el-form-item>
        <el-form-item label="验证机构" prop="wholeIdea">
          <el-input v-model="form.wholeIdea" placeholder="请输入验证机构" />
        </el-form-item>
        <el-form-item label="验证机构" prop="detailIdea">
          <el-input v-model="form.detailIdea" placeholder="请输入验证机构" />
        </el-form-item>
        <el-form-item label="验证机构" prop="modelPriority">
          <el-input v-model="form.modelPriority" placeholder="请输入验证机构" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog> -->

    <!-- 模型结果展示对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <keep-alive>
        <component
          v-bind:is="currentTemplate"
          :templateConfig="templateConfig"
        ></component>
      </keep-alive>
    </el-dialog>
  </div>
</template>

<script>
import {
  listStModer,
  getStModer,
  delStModer,
  addStModer,
  updateStModer,
  exportStModer
} from "@/api/survey/stModer";

import { listModelConfigResult } from "@/api/modeltemplate/modelConfigResult";

import ModelTemplate1 from "../../modeltemplate/ModelTemplate1";
import ModelTemplate2 from "../../modeltemplate/ModelTemplate2";
import ModelTemplate3 from "../../modeltemplate/ModelTemplate3";

export default {
  name: "StModer",
  components: {
    ModelTemplate1,
    ModelTemplate2,
    ModelTemplate3
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
      // 审计模型列表格数据
      stModerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        modelNo: null,
        modelName: null,
        contributor: null,
        creator: null,
        createTime: null,
        orgCode: null,
        label: null,
        status: null,
        modelRiskTypeId: null,
        busiCatFirstLevel: null,
        busiCatSecondLevel: null,
        busiCatThirdLevel: null,
        prodCatFirstLevel: null,
        prodCatSecondLevel: null,
        prodCatThirdLevel: null,
        specSubject: null,
        modelFunc: null,
        adtBasis: null,
        wholeIdea: null,
        detailIdea: null,
        modelPriority: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      // 模型评价
      value: 3.7,
      // 模板配置
      templateData: {},
      // 弹出层标题
      title: "模型结果查看",
      // 是否显示弹出层
      open1: false,
      // 模板数组
      templateArr: [ModelTemplate1, ModelTemplate2, ModelTemplate3],
      // 当前选择的模板id
      templateId: 0
    };
  },
  created() {
    this.getList();
  },
  computed: {
    currentTemplate() {
      return this.templateArr[parseInt(this.templateId) - 1];
    }
  },
  methods: {
    /** 查询审计模型列列表 */
    getList() {
      this.loading = true;
      listStModer(this.queryParams).then(response => {
        this.stModerList = response.rows;
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
        mpModelBaseInfoId: null,
        modelNo: null,
        modelName: null,
        contributor: null,
        creator: null,
        createTime: null,
        orgCode: null,
        label: null,
        status: "0",
        modelRiskTypeId: null,
        busiCatFirstLevel: null,
        busiCatSecondLevel: null,
        busiCatThirdLevel: null,
        prodCatFirstLevel: null,
        prodCatSecondLevel: null,
        prodCatThirdLevel: null,
        specSubject: null,
        modelFunc: null,
        adtBasis: null,
        wholeIdea: null,
        detailIdea: null,
        modelPriority: null
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
      this.ids = selection.map(item => item.mpModelBaseInfoId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加审计模型列";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const mpModelBaseInfoId = row.mpModelBaseInfoId || this.ids;
      getStModer(mpModelBaseInfoId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改审计模型列";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.mpModelBaseInfoId != null) {
            updateStModer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStModer(this.form).then(response => {
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
      const mpModelBaseInfoIds = row.mpModelBaseInfoId || this.ids;
      this.$confirm(
        '是否确认删除审计模型列编号为"' + mpModelBaseInfoIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delStModer(mpModelBaseInfoIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有审计模型列数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportStModer(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        });
    },
    /** 查看模型结果 */
    viewModelResult(row) {
      console.log(row);
      listModelConfigResult({
        modelNo: row.modelNo
      })
        .then(result => {
          if (result.total === 0) {
            this.msgError("未配置模板,请先给模型配置模板");
            return;
          }
          let templateData = result.rows[0];
          this.templateId = templateData.templateId;
          this.templateConfig = JSON.parse(templateData.templateJson);
          this.open = true;
          this.title = "模型结果展示";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
