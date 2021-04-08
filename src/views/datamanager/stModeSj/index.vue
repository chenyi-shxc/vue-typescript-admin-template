<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="分行名称" prop="industryName">
        <el-input
          v-model="queryParams.industryName"
          placeholder="请输入分行名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="客户名称" prop="custName">
        <el-input
          v-model="queryParams.custName"
          placeholder="请输入分行名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="客户编号" prop="custNameCold">
        <el-input
          v-model="queryParams.custNameCold"
          placeholder="请输入分行名称"
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

      <el-col :span="12" class="card-box">
        <el-card>
     
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="commandstats" style="height: 420px" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="usedmemory"  style="height: 420px" />
          </div>
        </el-card>
      </el-col>


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['datamanager:stModeSj:add']"
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
          v-hasPermi="['datamanager:stModeSj:edit']"
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
          v-hasPermi="['datamanager:stModeSj:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['datamanager:stModeSj:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stModeSjList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="分行名称" align="center" prop="industryName" />
      <el-table-column label="客户名称" align="center" prop="custName" />
      <el-table-column label="客户编号" align="center" prop="custNameCold" />
      <el-table-column label="客户所属行业" align="center" prop="crmIndustryType" />
      <el-table-column label="客户所属行业名称" align="center" prop="crmIndustryTypeName" />
      <el-table-column label="最新信用等级" align="center" prop="crmCreditLevel" />
      <el-table-column label="企业规模名称" align="center" prop="qygmmc" />
      <el-table-column label="企业出资人经济成分名称" align="center" prop="czrFlMc" />
      <el-table-column label="项目名称" align="center" prop="xmMcxmMc" />
      <el-table-column label="项目所属行业名称" align="center" prop="xmszhMc" />
      <el-table-column label="合同号" align="center" prop="hth" />
      <el-table-column label="合同币种" align="center" prop="htbz" />
      <el-table-column label="合同签订日期" align="center" prop="htQdrq" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.htQdrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同金额" align="center" prop="htJey" />
      <el-table-column label="合同金额" align="center" prop="htJer" />
      <el-table-column label="贷款号" align="center" prop="dkh" />
      <el-table-column label="最新资产质量分类" align="center" prop="zcfl" />
      <el-table-column label="贷款余额" align="center" prop="dkye" />
      <el-table-column label="累计已发放金额" align="center" prop="ljye" />
      <el-table-column label="首笔发放金额" align="center" prop="sfye" />
      <el-table-column label="核心贷款用途描述" align="center" prop="hxms" />
      <el-table-column label="贷款起始日期" align="center" prop="dkQsrq" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dkQsrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="贷款到期日期" align="center" prop="dkZzrq" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.dkZzrq, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新分类时点" align="center" prop="fld" />
      <el-table-column label="分行上报资产质量分类" align="center" prop="hsbZlfl" />
      <el-table-column label="总行认定资产质量分类" align="center" prop="zhsbZlfl" />
      <el-table-column label="模型编号" align="center" prop="tableId" />
      <el-table-column label="模型名称" align="center" prop="columnName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['datamanager:stModeSj:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['datamanager:stModeSj:remove']"
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

    <!-- 添加或修改设计模型统计对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分行名称" prop="industryName">
          <el-input v-model="form.industryName" placeholder="请输入分行名称" />
        </el-form-item>
        <el-form-item label="客户名称" prop="custName">
          <el-input v-model="form.custName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户编号" prop="custNameCold">
          <el-input v-model="form.custNameCold" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="客户所属行业" prop="crmIndustryType">
          <el-input v-model="form.crmIndustryType" type="textarea" placeholder="请输入内容" />
        </el-form-item>
       
        <el-form-item label="客户所属行业名称" prop="crmIndustryTypeName">
          <el-input v-model="form.crmIndustryTypeName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="最新信用等级" prop="crmCreditLevel">
          <el-input v-model="form.crmCreditLevel" placeholder="请输入最新信用等级" />
        </el-form-item>
        <el-form-item label="企业规模名称" prop="qygmmc">
          <el-input v-model="form.qygmmc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="企业出资人经济成分名称" prop="czrFlMc">
          <el-input v-model="form.czrFlMc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="项目名称" prop="xmMcxmMc">
          <el-input v-model="form.xmMcxmMc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="项目所属行业名称" prop="xmszhMc">
          <el-input v-model="form.xmszhMc" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="合同号" prop="hth">
          <el-input v-model="form.hth" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="合同币种" prop="htbz">
          <el-input v-model="form.htbz" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="合同签订日期" prop="htQdrq">
          <el-date-picker clearable size="small"
            v-model="form.htQdrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择合同签订日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同金额" prop="htJey">
          <el-input v-model="form.htJey" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="合同金额" prop="htJer">
          <el-input v-model="form.htJer" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="贷款号" prop="dkh">
          <el-input v-model="form.dkh" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="最新资产质量分类" prop="zcfl">
          <el-input v-model="form.zcfl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="贷款余额" prop="dkye">
          <el-input v-model="form.dkye" placeholder="请输入贷款余额" />
        </el-form-item>
        <el-form-item label="累计已发放金额" prop="ljye">
          <el-input v-model="form.ljye" placeholder="请输入累计已发放金额" />
        </el-form-item>
        <el-form-item label="首笔发放金额" prop="sfye">
          <el-input v-model="form.sfye" placeholder="请输入首笔发放金额" />
        </el-form-item>
        <el-form-item label="核心贷款用途描述" prop="hxms">
          <el-input v-model="form.hxms" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="贷款起始日期" prop="dkQsrq">
          <el-date-picker clearable size="small"
            v-model="form.dkQsrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择贷款起始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="贷款到期日期" prop="dkZzrq">
          <el-date-picker clearable size="small"
            v-model="form.dkZzrq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择贷款到期日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最新分类时点" prop="fld">
          <el-input v-model="form.fld" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="分行上报资产质量分类" prop="hsbZlfl">
          <el-input v-model="form.hsbZlfl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="总行认定资产质量分类" prop="zhsbZlfl">
          <el-input v-model="form.zhsbZlfl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="模型编号" prop="tableId">
          <el-input v-model="form.tableId" placeholder="请输入模型编号" />
        </el-form-item>
        <el-form-item label="模型名称" prop="columnName">
          <el-input v-model="form.columnName" placeholder="请输入模型名称" />
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
import { listStModeSj, getStModeSj, delStModeSj, addStModeSj, updateStModeSj, exportStModeSj } from "@/api/datamanager/stModeSj";
import echarts from "echarts";
export default {
  name: "StModeSj",
  components: {
  },
  data() {
    return {
       // 加载层信息
      loading: [],
      // 统计命令信息
      commandstats: null,
      // 使用内存
      usedmemory: null,
      // cache信息
      cache: [],
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
      // 设计模型统计表格数据
      stModeSjList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        industryName: null,
        custName: null,
        crmIndustryType: null,
        crmIndustryTypeName: null,
        crmCreditLevel: null,
        qygmmc: null,
        czrFlMc: null,
        xmMcxmMc: null,
        xmszhMc: null,
        hth: null,
        htbz: null,
        htQdrq: null,
        htJey: null,
        htJer: null,
        dkh: null,
        zcfl: null,
        dkye: null,
        ljye: null,
        sfye: null,
        hxms: null,
        dkQsrq: null,
        dkZzrq: null,
        fld: null,
        hsbZlfl: null,
        zhsbZlfl: null,
        tableId: null,
        columnName: null
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
    // this.openLoading();
  },
  methods: {
    /** 查询设计模型统计列表 */
    getList() {
      this.loading = true;
      listStModeSj(this.queryParams).then(response => {
        this.stModeSjList = response.rows;
        var data =  response.rows;
        var d = "";
        var f = "";
        var y = "";
        var nameContainer = {}; // 针对键name进行归类的容器
        data.forEach(item => {
          nameContainer[item.industryName] = nameContainer[item.industryName] || [];
          nameContainer[item.industryName].push(item);
        });
        var fruitName = Object.keys(nameContainer);
        var fruitName1 = Object.values(nameContainer);
        for(var i =0;i<fruitName1.length;i++){
          f=f+","+fruitName1[i].length;
          var ye=0.0000;
          for(var j=0 ;j<fruitName1[i].length;j++){
            ye=ye+fruitName1[i][j].dkye;
          }
          y=y+","+ye;
        }
        console.log(y);
        d = fruitName;
        f=f.substr(1);
        f = f.split(",");
        y=y.substr(1);
        y = y.split(",");
        console.log(d);
        this.total = response.total;
        this.loading = false;
     
        this.commandstats = echarts.init(this.$refs.commandstats, "macarons");
        this.commandstats.setOption({
          title:{
                    text:' 总分行资产质量分类认定结果存在差异的贷款信息涉及客户和项目情况'
                },
                tooltip:{
                   trigger: "item",
                   formatter: "1",
                },
                legend:{
                    data:['用户来源']
                },
                xAxis:{
                    data:d
                },
                yAxis:{
 
                },
                series:[{
                    name:'访问量',
                    type:'line', //设置图表主题
                    roseType: "radius",
                    radius: [15, 95],
                    center: ["50%", "38%"],
                    data:f,
                    animationEasing: "cubicInOut",
                    animationDuration: 1000,
                }]
        });
        this.usedmemory = echarts.init(this.$refs.usedmemory, "macarons");
        var dat = ["Android","IOS","PC","Ohter"];
        var da  = [500,200,360,100];
        this.usedmemory.setOption({
          title:{
                    text:'总分行资产质量分类认定结果存在差异的贷款信息涉及贷款余额情况'
                },
                tooltip:{},
                legend:{
                    data:['用户来源']
                },
                xAxis:{
                    data:d
                },
                yAxis:{
 
                },
                series:[{
                    name:'访问量',
                    type:'bar', //设置图表主题
                    data:y
                }]
        });
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
        id: null,
        industryName: null,
        custName: null,
        crmIndustryType: null,
        crmIndustryTypeName: null,
        crmCreditLevel: null,
        qygmmc: null,
        czrFlMc: null,
        xmMcxmMc: null,
        xmszhMc: null,
        hth: null,
        htbz: null,
        htQdrq: null,
        htJey: null,
        htJer: null,
        dkh: null,
        zcfl: null,
        dkye: null,
        ljye: null,
        sfye: null,
        hxms: null,
        dkQsrq: null,
        dkZzrq: null,
        fld: null,
        hsbZlfl: null,
        zhsbZlfl: null,
        tableId: null,
        columnName: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设计模型统计";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStModeSj(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改设计模型统计";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStModeSj(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStModeSj(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除设计模型统计编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStModeSj(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有设计模型统计数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportStModeSj(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
