<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <div>修改模型配置</div>
      <el-divider></el-divider>
      <div>
        <el-steps :active="active">
          <el-step title="1.选择模型" icon="el-icon-edit"></el-step>
          <el-step title="2.选择模板" icon="el-icon-upload"></el-step>
          <el-step title="3.设置模板展示内容" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
    </el-row>
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <div class="chart-wrapper" v-if="active === 1">
        <div>当前已选择的模型：{{ modelNo + "-" + modelName }}</div>
        <el-divider></el-divider>
        <el-table v-loading="loading" :data="stModerList">
          <el-table-column
            label="模型编号"
            align="center"
            prop="modelNo"
            width="100px"
          />
          <el-table-column
            label="模型名称"
            align="center"
            prop="modelName"
            width="300px"
          />
          <el-table-column label="专题类型" align="center" prop="orgCode" />
          <el-table-column label="模型类型" align="center" prop="label" />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleSelect(scope.row)"
                v-hasPermi="['survey:stModer:edit']"
                >选择</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getModelList"
        />
      </div>
      <div class="chart-wrapper" v-if="active === 2">
        请选择为模型设置的模板
        <el-select v-model="templateId" placeholder="请选择模板">
          <el-option
            v-for="item in templateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="chart-wrapper" v-if="active === 3">
        <div>
          请选择要展示的图表
          <el-select v-model="chartId" placeholder="请选择图表">
            <el-option
              v-for="item in chartOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-divider></el-divider>
          请选择要展示的数据表格
          <el-select v-model="dataTableId" placeholder="请选择数据表格">
            <el-option
              v-for="item in dataTableOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </el-row>
    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <el-button @click="prev" v-if="active === 2 || active === 3"
        >上一步</el-button
      >
      <el-button @click="next" v-if="active === 1 || active === 2"
        >下一步</el-button
      >
      <el-button @click="save" v-if="active === 3">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { addModelConfigResult } from "@/api/modeltemplate/modelConfigResult";
import { listModelConfigTemplate } from "@/api/modeltemplate/modelConfigTemplate";
import { listStModer } from "@/api/survey/stModer";
import { listModelConfigChartBar } from "@/api/modeltemplate/modelConfigChartBar.js";
import { listModelConfigChartLine } from "@/api/modeltemplate/modelConfigChartLine.js";
import { listModelConfigChartLinebar } from "@/api/modeltemplate/modelConfigChartLinebar.js";
import { listModelConfigDataTable } from "@/api/modeltemplate/modelConfigDataTable.js";

export default {
  data() {
    return {
      active: 1,
      templateConfig: {},
      loading: false,

      // 总条数
      total: 0,
      // 模型列表格数据
      stModerList: [],
      // 模型查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        modelNo: null,
        modelName: null
      },
      // 模型设置
      modelNo: "",
      modelName: "",
      // 模板设置
      templateOptions: [],
      templateId: "",
      templateName: "",
      // 图形设置
      chartOptions: [],
      chartId: "",
      // 数据表设置
      dataTableOptions: [],
      dataTableId: "",

      templateConfig: {}
    };
  },
  created() {
    this.getModelList();
    this.queryTemplateOptions();
  },
  methods: {
    /** 查询审计模型列列表 */
    getModelList() {
      this.loading = true;
      listStModer(this.queryParams).then(response => {
        this.stModerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 修改按钮操作 */
    handleSelect(row) {
      this.modelNo = row.modelNo;
      this.modelName = row.modelName;
    },
    prev() {
      --this.active;
      if (this.active < 0) {
        this.active = 0;
      }
    },
    next() {
      if (this.active === 1 && this.modelNo === "") {
        this.msgError("模型不能为空,请修改");
        return;
      }
      if (this.active === 2 && this.templateId === "") {
        this.msgError("模板不能为空,请修改");
        return;
      }
      ++this.active;
      if (this.active > 3) {
        this.active = 3;
      }
      // 根据modelNo请求数据表
      if (this.active === 3) {
        switch (this.templateId) {
          case 1:
            this.getBarChartOptions();
            this.templateConfig = {
              barChartId: this.chartId,
              dataTableId: this.dataTableId
            };
            break;
          case 2:
            this.getLineChartOptions();
            this.templateConfig = {
              lineChartId: this.chartId,
              dataTableId: this.dataTableId
            };
            break;
          case 3:
            this.getLinebarChartOptions();
            this.templateConfig = {
              linebarChartId: this.chartId,
              dataTableId: this.dataTableId
            };
            break;
          default:
            break;
        }
        this.getDataTableOptions();
      }
    },
    getBarChartOptions() {
      listModelConfigChartBar({ modelNo: this.modelNo })
        .then(result => {
          result.rows.map(item => {
            this.chartOptions.push({
              value: item.id,
              label: item.columnTitle
            });
          });
        })
        .catch(err => {});
    },
    getLineChartOptions() {
      listModelConfigChartLine({ modelNo: this.modelNo })
        .then(result => {
          result.rows.map(item => {
            this.chartOptions.push({
              value: item.id,
              label: item.columnTitle
            });
          });
        })
        .catch(err => {});
    },
    getLinebarChartOptions() {
      listModelConfigChartLinebar({ modelNo: this.modelNo })
        .then(result => {
          result.rows.map(item => {
            this.chartOptions.push({
              value: item.id,
              label: item.columnTitle
            });
          });
        })
        .catch(err => {});
    },
    getDataTableOptions() {
      listModelConfigDataTable({ modelNo: this.modelNo })
        .then(result => {
          result.rows.map(item => {
            this.dataTableOptions.push({
              value: item.id,
              label: item.columnTitle
            });
          });
        })
        .catch(err => {});
    },
    save() {
      if (this.chartId === "" || this.dataTableId === "") {
        this.msgError("图表和数据表都不能为空,请重新操作");
        return;
      }
      switch (this.templateId) {
        case 1:
          this.templateConfig = {
            barChartId: this.chartId,
            dataTableId: this.dataTableId
          };
          break;
        case 2:
          this.templateConfig = {
            lineChartId: this.chartId,
            dataTableId: this.dataTableId
          };
          break;
        case 3:
          this.templateConfig = {
            linebarChartId: this.chartId,
            dataTableId: this.dataTableId
          };
          break;
        default:
          break;
      }
      let data = {
        modelNo: this.modelNo,
        modelName: this.modelName,
        templateId: this.templateId,
        templateName: this.templateName,
        templateJson: JSON.stringify(this.templateConfig)
      };
      addModelConfigResult(data);

      this.msgSuccess("设置成功");
    },
    queryTemplateOptions() {
      listModelConfigTemplate()
        .then(result => {
          result.rows.map(item => {
            this.templateOptions.push({
              value: item.id,
              label: item.templateName
            });
          });
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
