<template>
  <el-dialog
    v-loading="tableDialogLoading"
    :visible.sync="tableFilterDialogVisible"
    @close="setTableFilterDialogVisible({ val: false })"
    destroy-on-close
  >
    <template slot="title" class="dialog-header">
      <i class="el-icon-setting"></i>
      <span style="margin-left: 6px;">账表筛选</span>
    </template>
    <el-row v-for="(item, index) in dynamicForm" :key="index">
      <el-row v-if="item.type === 'condition'" style="margin-bottom: 15px;" gutter="10" type="flex" justify="center" >
        <el-col span="6">
          <el-select :value="item.key" @change="onLeftSelect" size="small" style="width: 100%;" filterable="" placeholder="请选择字段">
            <el-option v-for="option in tableFilterDialogForm.data.accountField" :key="option.fieldEnglishName" :label="option.fieldChineseName" :value="{ index, name: option.fieldEnglishName, value: option.fieldChineseName }"></el-option>
          </el-select>
        </el-col>
        <el-col span="5">
          <el-select :value="item.join" @change="onConditionJoinSelect" size="small" style="width: 100%;" placeholder="请选择条件">
            <el-option v-for="option in joinTypeArr" :key="option" :label="option" :value="{ index, value: option }"></el-option>
          </el-select>
        </el-col>
        <el-col span="6">
          <el-input size="small" style="width: 100%;" :value="item.value" @input="onRightInput($event, index)" placeholder="请输入值"></el-input>
        </el-col>
        <el-col span="2">
        </el-col>
        <!-- <el-col span="2">
          <el-button size="small" icon="el-icon-bottom" @click.prevent="moveDownItem(index)"></el-button>
        </el-col> -->
        <el-col span="2">
          <el-button size="small"  icon="el-icon-remove-outline" @click.prevent="removeItem(index)"></el-button>
        </el-col>
        <el-col span="2">
          <el-button size="small"  icon="el-icon-circle-plus-outline" @click.prevent="addItem(index)"></el-button>
        </el-col>
      </el-row>
      <el-row v-else style="margin-bottom: 20px;" gutter="10" type="flex" justify="left">
        <el-col span="1"></el-col>
        <el-col span="12">
          <el-radio-group :value="item.value" @input="onJoinSelect($event, index)">
            <el-radio v-for="link in linkTypeArr" :key="link" :label="link" :name="link"></el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-row>
    
    <el-divider></el-divider>
    <el-row style="margin-bottom: 10px;" type="flex" justify="center">
      <el-col span="7" style="justify-content: flex-end; display: flex; align-items: center;">生成账表名称:</el-col>
      <el-col span="1">
      </el-col>
      <el-col span="12">
        <el-input size="small" style="width: 100%;" v-model="tableName" placeholder="请输入账表名称"></el-input>
      </el-col>
    </el-row>
    <template slot="footer" class="dialog-footer">
      <el-button @click="setTableFilterDialogVisible({ val: false })">取消</el-button>
      <el-button type="primary" @click="onSave">执行</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "TableFilterDialog"
})
export default class TableSortDialog extends Vue {
  @Prop() tableDialogLoading: any;
  @Prop() tableFilterDialogForm: any;
  @Prop() setTableFilterDialogVisible: any;
  @Prop() tableFilterDialogVisible: any;
  @Prop() tableData: any;
  @Prop() doTableFilter: any;

  dynamicForm:any = [
    {
      type: 'condition',
      key: '',
      value: '',
      join: '',
    },
    {
      type: 'link',
      value: '',
    }
  ];

  joinTypeArr: any = [
    '大于',
    '大于等于',
    '等于',
    '小于等于',
    '小于',
    '不等于',
    '相似于',
    '存在于',
    '不存在于'
  ];
  
  linkTypeArr: any = [
    '并且',
    '或者'
  ];

  tableName: string = '';

  onRightInput(value: string, index: number) {
    this.dynamicForm[index].value = value;
  }

  onLeftSelect(option: any) {
    this.dynamicForm[option.index].key = option.value;
    this.dynamicForm[option.index].name = option.name;
  }

  onJoinSelect(value: string, index: number) {
    this.dynamicForm[index].value = value;
  }

  onConditionJoinSelect({value, index}: any) {
    this.dynamicForm[index].join = value;
  }

  async onSave() {
    const conditions: any = [];
    this.dynamicForm.forEach((item: any) => {
      if (item.name) {
        conditions.push({
          fieldEnglishName: item.name,
          compareOp: item.join,
          value: item.value,
        });
      }
    });

    console.log(this.tableData);
    // debugger
    
    const data = {
      conditions,
      tableEnglishName: this.tableData.englishName,
      resultTableName: this.tableName,
      linkwords: this.dynamicForm.filter((v: any) => v.type == 'link').map((v: any) => v.value),
      currentPage: 1,
      pageSize: 9999,
      isDistinct: 0,
    }

    await this.doTableFilter(data);
    // debugger
  }

  addItem(index: number) {
    if (this.dynamicForm[index].type === 'condition' && this.dynamicForm[index + 1] && this.dynamicForm[index + 1].type === 'link') {
      this.dynamicForm.splice(index + 2, 0, {
        type: 'condition',
        key: '',
        value: '',
        join: '',
      });
    } else {
      this.dynamicForm.splice(index + 1, 0, {
      type: 'link',
      value: '',
    }, {
        type: 'condition',
        key: '',
        value: '',
        join: '',
      });
    }
  }

  removeItem(index: number) {
    if (this.dynamicForm.length <= 2) {
      (this as any).$alert('不能删除所有条件', '提示', {
        confirmButtonText: '确定',
      });
      return;
    }
    this.dynamicForm.splice(index, 2);
  }

  moveDownItem(index: number) {
    if(index !== this.dynamicForm.length - 1){
      this.dynamicForm[index] = this.dynamicForm.splice(index + 1, 1, this.dynamicForm[index])[0];
    } else {
      this.dynamicForm.unshift(this.dynamicForm.splice(index, 1)[0]);
    }
  }
}
</script>