<template>
  <el-dialog
    v-loading="tableDialogLoading"
    :visible.sync="tableAnalyseDialogVisible"
    @close="setTableAnalyseDialogVisible({ val: false })"
    destroy-on-close
  >
    <template slot="title" class="dialog-header">
      <i class="el-icon-setting"></i>
      <span style="margin-left: 6px;">账表透视</span>
    </template>

    <el-card >
      <span slot="header">分组字段</span>
      
      <el-row style="margin-bottom: 10px;" type="flex" justify="center" v-for="(item, index) in dynamicGroupForm" :key="index">
        <el-col span="12">
          <el-select :value="item.value" @change="onGroupItemSelect" size="small" style="width: 100%;" filterable="" placeholder="请选择字段">
            <el-option v-for="option in tableAnalyseDialogForm.data.accountField" :key="option.fieldId" :label="option.fieldChineseName" :value="{ index, fieldEnglishName: option.fieldEnglishName, value: option.fieldChineseName }"></el-option>
          </el-select>
        </el-col>
        <el-col span="2">
        </el-col>
        <el-col span="2">
          <el-button size="small" icon="el-icon-bottom" @click.prevent="moveDownGroupItem(index)"></el-button>
        </el-col>
        <el-col span="2">
          <el-button size="small"  icon="el-icon-remove-outline" @click.prevent="removeGroupItem(index)"></el-button>
        </el-col>
        <el-col span="2">
          <el-button size="small"  icon="el-icon-circle-plus-outline" @click.prevent="addGroupItem(index)"></el-button>
        </el-col>
      </el-row>

    </el-card>

    <el-divider></el-divider>

    <el-card >
      <span slot="header">计算字段</span>

      <el-row v-for="(item, index) in dynamicForm" :key="index">
        <el-row v-if="item.type === 'condition'" style="margin-bottom: 15px;" gutter="10" type="flex" justify="center" >

          <el-col span="3">
            <el-select :value="item.join" @change="onJoinSelect" size="small" style="width: 100%;" placeholder="请选择条件">
              <el-option v-for="option in joinTypeArr" :key="option" :label="option" :value="{ index, value: option }"></el-option>
            </el-select>
          </el-col>

          <el-col span="6">
            <el-select :value="item.key" @change="onLeftSelect" size="small" style="width: 100%;" placeholder="请选择字段" filterable="">
              <el-option v-for="option in tableAnalyseDialogForm.data.accountField" :key="option.fieldId" :label="option.fieldChineseName" :value="{ index, fieldEnglishName: option.fieldEnglishName, value: option.fieldChineseName }"></el-option>
            </el-select>
          </el-col>
          
          <el-col span="8">
            <el-input size="small" style="width: 100%;" :value="item.value" @input="onRightInput($event, index)" placeholder="请输入值">
              <template slot="prepend">作为</template>
            </el-input>
          </el-col>
          <el-col span="2">
            <el-button size="small" icon="el-icon-bottom" @click.prevent="moveDownItem(index)"></el-button>
          </el-col>
          <el-col span="2">
            <el-button size="small"  icon="el-icon-remove-outline" @click.prevent="removeItem(index)"></el-button>
          </el-col>
          <el-col span="2">
            <el-button size="small"  icon="el-icon-circle-plus-outline" @click.prevent="addItem(index)"></el-button>
          </el-col>
        </el-row>
        <!-- <el-row v-else style="margin-bottom: 20px;" gutter="10" type="flex" justify="left">
          <el-col span="1"></el-col>
          <el-col span="12">
            <el-radio-group :value="item.value" @input="onJoinSelect($event, index)">
              <el-radio v-for="link in linkTypeArr" :key="link" :label="link" :name="link"></el-radio>
            </el-radio-group>
          </el-col>
        </el-row> -->
      </el-row>
    </el-card>
    
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
      <el-button @click="setTableAnalyseDialogVisible({ val: false })">取消</el-button>
      <el-button type="primary" @click="onSave">执行</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Message } from 'element-ui';

@Component({
  name: "TableAnalyseDialog"
})
export default class TableAnalyseDialog extends Vue {
  @Prop() tableDialogLoading: any;
  @Prop() tableAnalyseDialogForm: any;
  @Prop() setTableAnalyseDialogVisible: any;
  @Prop() tableAnalyseDialogVisible: any;
  @Prop() tableData: any;
  @Prop() doTableAnalyse: any;

  dynamicGroupForm:any = [
    {
      value: '',
    }
  ];

  dynamicForm:any = [
    {
      type: 'condition',
      key: '',
      value: '',
      join: '',
    },
  ];

  joinTypeArr: any = [
    '求和',
    '计数',
    '去重计数',
    '平均数',
    '最大值',
    '最小值',
  ];
  
  linkTypeArr: any = [
    '并且',
    '或者'
  ];

  tableName: string = '';

  async onSave() {
    this.dynamicGroupForm;
    this.dynamicForm;
    await this.doTableAnalyse({
      groupFields: this.dynamicGroupForm.map((v: any) => v.fieldEnglishName),
      statFields: this.dynamicForm.map((v: any) => {
        const item = {
          statFunc: v.join,
          fieldEnglishName: v.fieldEnglishName,
          fieldCustomName: v.value,
          isDistinct: 0,
        }
        return item;
      }),
      resultTableName: this.tableName,
      tableEnglishName: this.tableData.englishName,
      currentPage: 1,
      pageSize: 9999,
    });
    // debugger
    this.setTableAnalyseDialogVisible({ val: false });
    Message('已完成');
  }

  onRightInput(value: string, index: number) {
    this.dynamicForm[index].value = value;
  }

  onLeftSelect(option: any) {
    this.dynamicForm[option.index].key = option.value;
    this.dynamicForm[option.index].fieldEnglishName = option.fieldEnglishName;
  }

  onJoinSelect(option: any) {
    this.dynamicForm[option.index].join = option.value;
  }

  addItem(index: number) {
    this.dynamicForm.splice(index + 1, 0, {
      type: 'condition',
      key: '',
      value: '',
      join: '',
    });
  }

  removeItem(index: number) {
    if (this.dynamicForm.length < 2) {
      (this as any).$alert('不能删除所有条件', '提示', {
        confirmButtonText: '确定',
      });
      return;
    }
    this.dynamicForm.splice(index, 1);
  }

  moveDownItem(index: number) {
    if(index !== this.dynamicForm.length - 1){
      this.dynamicForm[index] = this.dynamicForm.splice(index + 1, 1, this.dynamicForm[index])[0];
    } else {
      this.dynamicForm.unshift(this.dynamicForm.splice(index, 1)[0]);
    }
  }


  addGroupItem(index: number) {
    this.dynamicGroupForm.splice(index + 1, 0, { value: '' });
  }

  removeGroupItem(index: number) {
    if (this.dynamicGroupForm.length <= 1) {
      (this as any).$alert('不能删除所有条件', '提示', {
        confirmButtonText: '确定',
      });
      return;
    }
    this.dynamicGroupForm.splice(index, 1);
  }

  moveDownGroupItem(index: number) {
    if(index !== this.dynamicGroupForm.length - 1){
      this.dynamicGroupForm[index] = this.dynamicGroupForm.splice(index + 1, 1, this.dynamicGroupForm[index])[0];
    } else {
      this.dynamicGroupForm.unshift(this.dynamicGroupForm.splice(index, 1)[0]);
    }
  }

  onGroupItemSelect(option: any) {
    this.dynamicGroupForm[option.index].value = option.value;
    this.dynamicGroupForm[option.index].fieldEnglishName = option.fieldEnglishName;
  }

}
</script>