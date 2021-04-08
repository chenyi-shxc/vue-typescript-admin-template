import axios from '@/util/axios';
import getUrl from '@/util/url';
import getId from '@/util/key';
import ColumnConf from '@/model/module-result/column-conf';
import Condition  from '@/model/module-result/condition';
import { findIndex } from 'lodash';
import { tempModelResult } from '@/util/const';
import ShowCondition from '@/model/module-result/show-condition';
import Vue from 'vue';
import ChartsItem from '@/model/module-result/charts-item';
import EchartsConf from '@/model/module-result/echarts-conf';
import qs from 'qs';
type State  = {
    //当前活动的标示
    activeNum:number
    //是否是修改状态
    isAbleEdite:boolean
    // 结果表内容查询
    resultTables: SRtable[]
    // key 为 resulttable 的enName
    conditionMap : {
        [fieldKey: string]: Condition[]
    } 
    // 布局模版 key 为 resulttable 的enName
    templateTypeMap : {
        [fieldKey: string]: string
    }
    //设置展示图的。 
    columnMap : {
        // key resulttable的 enName
        [fieldKey: string]: {
            // key templateType 的 值作为key
            [fieldKey:string] : ColumnConf[]
        }
    }
    //备份json数据
    bakUp: string 
    
    //设置表格的[表的字段属性] map key 为 result table 的enName
    tableFieldMap:{
        [fieldKey: string]: SetTableField[]
    }

    // 展示表的表格也放这里了。
    stTableFieldMap:{
      [fieldKey: string]: TableField[]
    }

    //设置表格选中的内容
    selectedFieldMap:{
        //该表中不是全部的数据，仅仅为用户选中的数据，key值为result tabel的enName
        [fieldKey: string]: SetTableField[]
    }
    //stTableList 为展示表的map数据 key为 enName
    stTableList: SRtable[]

    queryConf:{
      [fieldKey: string]: ShowCondition[]
    }
    // 查询条件的 或者与 与
    logicValMap:{
      [fieldKey: string]: boolean
    }
    // 图表展示的配置以及对应的值
    showCharts:{
      [fieldKey: string]: {
        type:string,//展示类型
        list: ChartsItem[]//数据值
      }
    }

    showEchartsConf:{
      [fieldKey: string]: ColumnConf[]
    }
    // 底部展示的表格
    showTable:{
      //fieldKey值 为 当前tableEnglishName
      [fieldKey: string]:{
        data:any,//实际数据信息
        accountField:SetTableField[],//字段信息
        totalPage:number,//总页码数量
        currentPage:number//当前页
      }
    },
    isShowConf:{
      [fieldKey:string]:boolean
    } //是否展示设置页面

}

const pageSize = 10;

const state: State = {
  activeNum: 0,
  isAbleEdite: true,
  resultTables: [],
  conditionMap: {},
  templateTypeMap: {},
  columnMap: {},
  bakUp: "",
  tableFieldMap: {},
  selectedFieldMap: {},
  stTableList: [],
  queryConf: {},
  logicValMap: {},
  showCharts: {},
  showEchartsConf: {},
  showTable: {},
  isShowConf:{},
  stTableFieldMap:{}
};

// 根据 englishTableName来获取条件的list
function getConditionByFeId(state: State, tableEnglishName:string, feId:string){
    let conditionList = state.conditionMap[tableEnglishName];
    console.log(conditionList);
    let index = findIndex(conditionList, (item: Condition) => {
        return item.feId === feId;
    });
    if (index == -1) {
        throw new Error('错误找不到feId:' + feId + ',的condition对象');
    }
    return conditionList[index];

}


const getters = {
  //获取当前活动的 结果表的fields 字段信息
  currentTableFields(state: State) {
    let currentReultTable = state.resultTables[state.activeNum];
    return state.tableFieldMap[currentReultTable.enName] || null;
  },
  //当前活动的 result table
  activeResultTable(state: State) {
    return state.resultTables[state.activeNum];
  },
  resultTables(state: State) {
    return state.resultTables;
  },
  // 当前活动 result table的 条件
  currentCondition(state: State) {
    let activeResultTable = state.resultTables[state.activeNum];
    if (activeResultTable) {
      return state.conditionMap[activeResultTable.enName];
    } else {
      return [];
    }
  },

  currentTableFieldsList(state: State) {
    let activeResultTable = state.resultTables[state.activeNum];
    if (activeResultTable) {
      return state.tableFieldMap[activeResultTable.enName];
    } else {
      return [];
    }
  },

  conditionMap(state: State) {
    return state.conditionMap;
  },
  //当前的模版类型
  currentTemplate(state: State) {
    let currentReultTable = state.resultTables[state.activeNum];
    if (currentReultTable) {
      return state.templateTypeMap[currentReultTable.enName];
    } else {
      //返回兜底数据
      return tempModelResult.NONE;
    }
  },
  currentIsShowConf(state:State){
    let currentReultTable = state.resultTables[state.activeNum];
    if(currentReultTable){
      return state.isShowConf[currentReultTable.enName];
    }else{
      return false;
    }
  },

  currentColumnList(state: State) {
    let currentReultTable = state.resultTables[state.activeNum];
    if (currentReultTable) {
      let enName = currentReultTable.enName;
      return state.columnMap[enName][state.templateTypeMap[enName]];
    } else {
      return [];
    }
  },

  stTableList(state: State) {
    return state.stTableList || [];
  },

  currentSelectSetTableFields(state: State) {
    let currentReultTable = state.resultTables[state.activeNum];
    if(!currentReultTable){
        return [];
    }else{
        return state.selectedFieldMap[currentReultTable.enName] || [];
    }

  },
  //当前的查询对象内容
  currentShowCondition(state:State){
    let currentReultTable = state.resultTables[state.activeNum];
    if (!currentReultTable){
      return [];
    }else{
      return state.queryConf[currentReultTable.enName] || [];
    }
  },
  currentShowCharts(state:State){
    let currentReultTable = state.resultTables[state.activeNum];
    if(!currentReultTable){
      return null;
    }
    console.log("###currentShowCharts", state.showCharts[currentReultTable.enName]);
    return state.showCharts[currentReultTable.enName];
  },
  currentShowTable(state:State){
    let currentReultTable = state.resultTables[state.activeNum];
    if(!currentReultTable){
      return null;
    }
    return state.showTable[currentReultTable.enName];
  }

};

const mutations = {
  //变更是否显示
  changeIsShowConf(state:State, payload:any){
    console.log(payload);
    let {
      isShowConf,
      tableEnglishName
    } = payload;
    state.isShowConf[tableEnglishName] = isShowConf;
  },
  // 变更顶部的选择
  changeSelectedResultTable(state: State, payload: any) {
    let { tableEnglishName } = payload;
    console.log(tableEnglishName);
    let index = findIndex(state.resultTables, (item: any) => {
      return item.enName === tableEnglishName;
    });
    if (index == -1) {
      throw new Error(
        "检查代码，没有找到这个tableEnglishName:" + tableEnglishName
      );
    }
    state.activeNum = index;
  },
  initResultTabels(state: State, payload: any) {
    let { value } = payload;
    Vue.set(state, 'resultTables',[]);
    value.forEach((item: any) => {
      //初始化结果表数据信息
      state.resultTables.push({ ...item });
      //初始化 配置是否展示信息 默认都是不展示配置界面
      Vue.set(state.isShowConf,item.enName,false);
    });
  },
  //条件相关增加
  addRootConf(state: State, payload: any) {
    let { value, enName } = payload;
    Vue.set(state.conditionMap, enName, []);
    if (!value || value.length == 0) {
      //console.log("new...");
      // 默认初始化就给一个空的
      state.conditionMap[enName].push(Condition.emptyFactory());
      return;
    }
    value.forEach((item: any) => {
      let instance = new Condition(
        item.id,
        item.operaFun,
        item.modelNo,
        item.columnType,
        item.chineseFieldName,
        item.aliasName,
        item.columnName,
        item.columnCnName,
        item.chineseTableName,
        item.englishTableName  
      );
      instance.feId = getId();
      state.conditionMap[enName].push(instance);
    });
  },
  //用户切换模版的操作
  changeTemplateType(state: State, payload: any) {
    let { tableEnglishName, value } = payload;
    Vue.set(state.templateTypeMap, tableEnglishName, value);
    // state.tableFieldMap[tableEnglishName] = value;
    //原来有的用原来的。 没有的 根据类型建立新的
    if (
      state.columnMap[tableEnglishName] &&
      state.columnMap[tableEnglishName][value] &&
      state.columnMap[tableEnglishName][value].length > 0
    ) {
      return;
    }
    if (!state.columnMap[tableEnglishName]) {
      Vue.set(state.columnMap, tableEnglishName, {});
    }

    if (!state.columnMap[tableEnglishName][value]) {
      Vue.set(state.columnMap[tableEnglishName], value, []);
    }

    switch (value) {
      case tempModelResult.NONE:
        break;
      case tempModelResult.ONE:
        state.columnMap[tableEnglishName][value].push(
          ColumnConf.emptyFactory(0, value)
        );
        break;
      case tempModelResult.TWO_H:
      case tempModelResult.TWO_V:
        state.columnMap[tableEnglishName][value].push(
          ColumnConf.emptyFactory(0, value)
        );
        state.columnMap[tableEnglishName][value].push(
          ColumnConf.emptyFactory(1, value)
        );
        break;

      case tempModelResult.THREE_H:
      case tempModelResult.THREE_V:
      case tempModelResult.THREE_ONE_P_T:
      case tempModelResult.THREE_TWO_P_O:
        state.columnMap[tableEnglishName][value].push(
          ColumnConf.emptyFactory(0, value)
        );
        state.columnMap[tableEnglishName][value].push(
          ColumnConf.emptyFactory(1, value)
        );
        state.columnMap[tableEnglishName][value].push(
          ColumnConf.emptyFactory(2, value)
        );
        break;
    }
    console.log(state.columnMap[tableEnglishName]);
  },
  // 初始化RootColumn的初始化
  addRootColumn(state: State, payload: any) {
    let { value, enName } = payload;
    Vue.set(state.columnMap, enName, []);
    if (!value || value.length == 0) {
      Vue.set(state.templateTypeMap, enName, tempModelResult.NONE);
      return;
    }
    // //TODO:测试 多图
    // value[0].templateType = tempModelResult.TWO_V;
    // value = [value[0],value[0],value[0]]
    // console.log('测试更改：',value);
    // // end

    value.forEach((item: any, index: number) => {
      // 一个数组下的template Type都是一样的 代表的是单图 多图 三图 等
      if (index == 0) {
        Vue.set(state.templateTypeMap, enName, item.templateType);
      }

      let columnConf = new ColumnConf();

      columnConf.feId = getId();

      columnConf.cnName = item.cnName;

      columnConf.columnJson = item.columnJson;

      columnConf.columnNum = item.columnNum;

      columnConf.columnTitle = item.columnTitle;

      columnConf.columnType = item.columnType;

      columnConf.enName = item.enName;

      columnConf.linkage = item.linkage;

      columnConf.modelId = item.modelId;

      columnConf.modelNo = item.modelNo;

      columnConf.resultTableId = item.resultTableId;

      columnConf.tbcfId = item.tbcfId;

      columnConf.templateType = item.templateType;

      columnConf.version = item.version;

      console.log("##columnConf", columnConf);

      if(!state.showEchartsConf[enName]){
        Vue.set(state.showEchartsConf, enName, []);
      }
      state.showEchartsConf[enName].push(columnConf.clone());
      // state.columnMap[enName]
      if (!state.columnMap[enName]) {
        Vue.set(state.columnMap, enName, {});
      }
      if (!state.columnMap[enName][state.templateTypeMap[enName]]) {
        Vue.set(state.columnMap[enName], state.templateTypeMap[enName], []);
      }
      state.columnMap[enName][state.templateTypeMap[enName]].push(columnConf);
    });
    console.log('end loop',state.columnMap[enName][state.templateTypeMap[enName]]);
  },

  //初始化st表的结构信息
  addStTableFields(state:State,payload:any){
    let { tableEnglishName, value } = payload;
    if (
      state.stTableFieldMap[tableEnglishName] &&
      state.stTableFieldMap[tableEnglishName].length > 0) {
      return;
    }

    Vue.set(state.stTableFieldMap, tableEnglishName, []);

    value.accountField.forEach((item: TableField) => {
      state.stTableFieldMap[tableEnglishName].push({
        ...item
      });
    });
  },

  addTableFields(state: State, payload: any) {
    let { tableEnglishName, value } = payload;
    if (
      state.tableFieldMap[tableEnglishName] &&
      state.tableFieldMap[tableEnglishName].length > 0){
          return;
    }
    Vue.set(state.tableFieldMap, tableEnglishName, []);

    let selectedTableFields = state.selectedFieldMap[tableEnglishName];
        //需要配合 getModelResultConfig.cas 接口中的tableField 字段进行设置showName字段名字
    value.accountField.forEach((item: TableField) => {
        let showName = '';
        for(let i = 0; i<selectedTableFields.length; i++){
            if(selectedTableFields[i].fieldId === item.fieldId){
                showName = selectedTableFields[i].showName;
                break;
            }
        }
        state.tableFieldMap[tableEnglishName].push({
          ...item,
          showName
        });
    });
  },
  updateConditionItem(state: State, payload: any) {
    let { tableEnglishName, feId, key, val } = payload;
    let condition: any = getConditionByFeId(state, tableEnglishName, feId);
    condition[key] = val;
  },

  changeConditionPos(state: State, payload: any) {
    let {
      tableEnglishName,
      feId, // condition的feid
      dir // up  or down
    } = payload;

    let conditionList = state.conditionMap[tableEnglishName];

    let index = findIndex(conditionList, (item: Condition) => {
      return item.feId === feId;
    });
    if (index == -1) {
      throw new Error("错误找不到feId:" + feId + ",的condition对象");
    }
    //条件区分
    if (index == 0 && dir == "up") {
      return;
    } else if (index + 1 === conditionList.length && dir == "down") {
      return;
    }

    //移动
    if (dir == "up") {
      let [item] = conditionList.splice(index - 1, 1);
      conditionList.splice(index, 0, item);
    } else if (dir == "down") {
      let [item] = conditionList.splice(index, 1);
      conditionList.splice(index + 1, 0, item);
    }
  },
  //增减更新条件内容
  updateConditionByAddOrDel(state: State, payload: any) {
    let {
      tableEnglishName,
      feId, // condition的feid
      operation // add  or del
    } = payload;

    let conditionList = state.conditionMap[tableEnglishName];

    let index = findIndex(conditionList, (item: Condition) => {
      return item.feId === feId;
    });
    if (index == -1) {
      throw new Error("错误找不到feId:" + feId + ",的condition对象");
    }

    if (operation == "add") {
      conditionList.splice(index + 1, 0, Condition.emptyFactory());
    } else if (operation == "del") {
      conditionList.splice(index, 1);
      if (conditionList.length == 0) {
        conditionList.push(Condition.emptyFactory());
      }
    }
  },
  //展示表的内容。。。。
  appendSTList(state: State, payload: any) {
    let { value } = payload;
    // console.log(value);
    Vue.set(state, 'stTableList', []);
    value.forEach((item: any) => {
      state.stTableList.push({ ...item });
    });
  },
  //更新field中的 属性
  updateTableField(state: State, payload: any) {
    let { fieldId, attr, value } = payload;
    let currentRT = state.resultTables[state.activeNum];
    let list = state.tableFieldMap[currentRT.enName];
    let index = findIndex(list, item => {
      return item.fieldId === fieldId;
    });

    if (index === -1) {
      throw new Error("没有找到fieldId:" + fieldId + "的table field对象");
    }
    // console.log(`${attr}:${value}`);
    (list[index] as any)[attr] = value;
  },
  // 查询条件的初始化
  initQueryConf(state:State,payload:any){
    let {
      enName,
      value
    } = payload;
    if(!state.queryConf[enName]){
      Vue.set(state.queryConf,enName,[]);
    }
    value.forEach((item:any)=>{
      let _item = new ShowCondition(
        item.id,
        item.operaFun,
        item.modelNo,
        item.columnType,
        item.chineseFieldName,
        item.aliasName,
        item.columnName,
        item.columnCnName,
        item.chineseTableName,
        item.englishTableName,
        ''
      );
      state.queryConf[enName].push(_item);
    });
  },
  // 更新 ColumnConf的值
  updateColumnConf(
    state: State,
    payload: {
      val: PopSettingChart
      tableEnglishName: string
      feId: string
    }
  ) {
    let {
      tableEnglishName, // 当前的tableEnglishName
      feId, // 要更改的前端对象的 id
      val // 更改的值
    } = payload;
    let templateType = state.templateTypeMap[tableEnglishName];

    let list = state.columnMap[tableEnglishName][templateType];

    let index = findIndex(list, item => {
      return item.feId === feId;
    });

    if (index == -1) {
      throw new Error("出错了，没有找到feid：" + feId + "的columnConf对象！");
    }
    let item = list[index];
    // 更新 ColumnConf对象。
    item.columnTitle = val.chartTitle;
    item.columnJson = JSON.stringify(val);
    item.columnType = val.chartType;
    item.resultTableId = val.rtEnName;
    
    item.tbcfId = val.rtEnName;
    item.cnName = val.stCnName;
    item.enName = val.stEnName;

  },
  //初始化 selected table fields,更新初始化查询配置信息
  addSelectedTableRowsInfo(state:State,payload:any){
    let {
        value,
        enName,
        count
    } = payload;
    // state.selectedFieldMap
    Vue.set(state.selectedFieldMap,enName,[]);
    // 将初始化的查询结果保存到 showTable上
    Vue.set(state.showTable, enName, {
      data: [],
      accountField: [],
      count: count,
      currentPage: 1
    });
    value.forEach((item: SetTableField) => {
        state.selectedFieldMap[enName].push({...item});
        // 将初始化的查询结果保存到 showTable上
        state.showTable[enName].accountField.push({...item});
    });
  },
  // 更换选中的fields内容 设置表格中的
  changeSelectedTableFields(state:State,payload:any){
    let {
        value,
        tableEnglishName
    } = payload;
    Vue.set(state.selectedFieldMap, tableEnglishName, []);
    value.forEach((selectedItem:any) => {
      for(let i = 0; i<state.tableFieldMap[tableEnglishName].length;i ++){
        if(state.tableFieldMap[tableEnglishName][i].fieldEnglishName === selectedItem.fieldEnglishName){
            state.selectedFieldMap[tableEnglishName].push({
              ...state.tableFieldMap[tableEnglishName][i]
            });
          break;
        }
      }
    });
  },
  initQueryVal(state:State,payload:any){
    let {
      list,
      isOr,
      tableEnglishName
    } = payload;
    Vue.set(state.logicValMap,tableEnglishName,isOr);
    list.forEach((item:ShowCondition) => {
      for(let i = 0; i<state.queryConf[tableEnglishName].length;i++){
        let queryConfItem = state.queryConf[tableEnglishName][i];
        if(queryConfItem.feId === item.feId){
          queryConfItem.value = item.value;
          break;
        }
      }
    });
  },
  // 查询底部表格的数据
  renderShowTable(state:State,payload:any){
    let { tableEnglishName, data: serverData, count, currentPage } = payload;
    //删除之前的数据
    Vue.set(state.showTable[tableEnglishName],'data',[]);
    state.showTable[tableEnglishName].totalPage = Math.ceil(count / pageSize);
    state.showTable[tableEnglishName].currentPage = currentPage;

    serverData.forEach((item:any)=>{
      state.showTable[tableEnglishName].data.push({
        ...item
      });
    });
  },
  //同步查询内容
  syncQueryConf(state:State,payload:any){
    let {tableEnglishName} = payload;
    // 重新清理 用新的 
    // 更改查询配置相关内容。
    Vue.set(state.queryConf,tableEnglishName,[]);
    state.conditionMap[tableEnglishName].forEach((item: Condition) => {
      let instance = ShowCondition.getNewShowCon(item);
      state.queryConf[tableEnglishName].push(instance);
    });
    //更改 echarts的配置 等待请求接口后 ， 更新这个具体的内容
    Vue.set(state.showCharts, tableEnglishName, {
      type: tempModelResult.NONE,
      list:[]
    });

    //table内容 重置
    Vue.set(state.showTable, tableEnglishName, {
      data: [],
      accountField: []
    });

  },
  initShowCharts(state: State, payload: any) {
    // TODO: 根据下面的数据进行展示配置charts, 有lengd 走字段的，没有lenged走 字段的属性的中文名
    //{"feId":"self_id_52","tbcfId":"table1","modelId":"","resultTableId":"table1","modelNo":"","cnName":"中文结果表1","enName":"table1","columnNum":0,"columnTitle":"标题","templateType":"two_horizontal","columnType":"bar_line","columnJson":"{\"stEnName\":\"table1\",\"stCnName\":\"中文结果表1\",\"stId\":\"id\",\"rtCnName\":\"中文结果表1\",\"rtEnName\":\"table1\",\"rtId\":\"id\",\"chartType\":\"bar_line\",\"theme\":\"default\",\"chartTitle\":\"标题\",\"primaryYTitle\":\"主y\",\"secondaryYTitle\":\"副y\",\"legendTitle\":\"CODE\",\"feLegendTitle\":[{\"feId\":\"self_id_63\",\"fieldChineseName\":\"编号\",\"fieldEnglishName\":\"CODE\"}],\"chartNumType\":\"bar,line\",\"nameCol\":\"TESTNAME\",\"feNameCol\":[{\"feId\":\"self_id_64\",\"fieldChineseName\":\"名称\",\"fieldEnglishName\":\"TESTNAME\"}],\"valueCol\":\"TESTTYPE,TESTB\",\"feValueCol\":[{\"feId\":\"self_id_65\",\"fieldChineseName\":\"类型\",\"fieldEnglishName\":\"TESTTYPE\"},{\"feId\":\"self_id_66\",\"fieldChineseName\":\"类型2\",\"fieldEnglishName\":\"TESTB\"}],\"hotfix_nameCol\":\"\",\"hotfix_valueCol\":\"\"}","linkage":"","version":""}
    let {
      tableEnglishName,
      data
    } = payload;
    let confs = state.showEchartsConf[tableEnglishName];

    let type = tempModelResult.NONE;
    if (confs && confs.length > 0) {
      type = confs[0].templateType;
    }
    Vue.set(
      state.showCharts,
      tableEnglishName, {
        type: type,
        list: []
      }
    );
    // data对象为columns 是一个对象。对象的key值 为ColumnConf.columnNum的值
    let keys = Object.keys(data);
    keys.forEach(key => {
      // 当前chart的数据源
      let item = data[key];
      // 当前chart的配置信息
      let conf: ColumnConf = ( < any > (
        confs
      ))[key];
      let confJson: FePopSettingChart = JSON.parse(
        conf.columnJson
      );
      

      let legendList:{
        data:string[]
      } = {
        data: []
      };

      if(confJson.legendTitle){
        // 排查重复的legendMap
        let legendMap :{[fieldKey:string]:number} = {};
        // 有nameCol列的值，从运算结果的数据中获取
        item.forEach((itemData:any) => {
          if (!legendMap[itemData[confJson.legendTitle]]){
            legendList.data.push(itemData[confJson.legendTitle]);
            //标记 使用过了
            legendMap[itemData[confJson.legendTitle]] = 1;
          }
        });
      }else{
        // 没有nameCol的列的值， 从配置的col字段的中文名字获取
        // 顺序为当前的 字段的顺序不要获取错了
        confJson.feValueCol.forEach((fieldItem)=>{
          legendList.data.push(fieldItem.fieldChineseName);
        });
      }

      // let valColList = confJson.feValueCol.map(function(item){
      //   return item.fieldEnglishName;
      // });

      // x轴数据配置
      let xAxis: {
        type: string;
        data: any;
      } [] = [{
        type: "category",
        data: []
      }];

      // x轴的数据初始化
      item.forEach((itemData:any)=>{
        // console.log(confJson.feNameCol[0]);
        xAxis[0].data.push(itemData[confJson.feNameCol[0].fieldEnglishName]);
      });
      
      //数据配置
      let series: {
        name: string;
        type: string;
        data: any;
        yAxisIndex ? : number;
      } [] = [];
      // 没有添加图例的字段。
      // 循环valueCol的字段属性。 y轴的数据列字段
      if(!confJson.legendTitle){
        confJson.feValueCol.forEach((filedInfo, index) => {
          //每个字段有他自己的serie
          let serie: {
            name: string;
            type: string;
            data: any;
            yAxisIndex?: number;
          } = {
            name: filedInfo.fieldChineseName,
            type: '',
            data: [],
            yAxisIndex: 0
          };
          let yAxisIndex = 0;
          if (confJson.secondaryYFields && confJson.secondaryYFields.length > 0) {
            // 有valueCol 指定 所属y轴的信息
            for (let i = 0; i < confJson.secondaryYFields.length; i++) {
              if (confJson.secondaryYFields[i].fieldEnglishName === filedInfo.fieldEnglishName) {
                //命中， 所属 y轴
                yAxisIndex = 1;
                break;
              }
            }
          }
          serie.yAxisIndex = yAxisIndex;
          let serieType = '';
          if (confJson.chartType === "bar_line") {
            let chartNumTypeLIst = confJson.chartNumType.split(',');
            //兜底 要是匹配不上用line 
            serieType = chartNumTypeLIst[index] ? chartNumTypeLIst[index] : 'line';
          } else {
            serieType = confJson.chartType;
          }
          serie.type = serieType;

          //循环填充数据
          item.forEach((itemData: any) => {
            serie.data.push(itemData[filedInfo.fieldEnglishName]);
          });
          series.push(serie);
        });
      }else{
        // 图例是跨越整个x轴的数据
        // 图例的 采用的字段名称
        let mapSeries:any = {};//暂存的map值
        legendList.data.forEach((legendStr)=>{
            //挨个处理字段, y轴的英文字段名字
            // 数据循环内容
            item.forEach((itemData: any) => {
              //循环 y轴的选择的字段
              confJson.feValueCol.forEach((confFieldInfo,index)=>{
                if(!mapSeries[legendStr + confFieldInfo.fieldEnglishName]){
                  let yAxisIndex = 0;
                  for (let i = 0; i < confJson.secondaryYFields.length; i++) {
                    if (confJson.secondaryYFields[i].fieldEnglishName === confFieldInfo.fieldEnglishName) {
                      //命中， 所属 y轴
                      yAxisIndex = 1;
                      break;
                    }
                  }

                  let serieType = '';
                  if (confJson.chartType === "bar_line") {
                    let chartNumTypeList = confJson.chartNumType.split(',');
                    //兜底 要是匹配不上用line 
                    serieType = chartNumTypeList[index] ? chartNumTypeList[index] : 'line';
                  } else {
                    serieType = confJson.chartType;
                  }

                  //创建seriers
                  mapSeries[legendStr + confFieldInfo.fieldEnglishName] = {
                    name: legendStr,
                    type: serieType,
                    data: [],
                    yAxisIndex: yAxisIndex
                  };
                }
                let serie = mapSeries[legendStr + confFieldInfo.fieldEnglishName];
                // 当前的数据对象 的 图例的值是否与 循环的图例的值 匹配，匹配才能进行 添加内容
                if (itemData[confJson.feLegendTitle[0].fieldEnglishName] == legendStr) {
                  serie.data.push(itemData[confFieldInfo.fieldEnglishName]);
                }else{
                  serie.data.push(0);
                }
              });
          });
          //最终入站操作
        });
        Object.keys(mapSeries).forEach((name)=>{
          series.push(mapSeries[name]);
        });
      }
      


      // y轴名字初始化
      let yAxis:any = [];
      if (
        confJson.chartType !== "bar_line"
      ) {
        yAxis.push({
          type: "value"
        });
      } else {
        // 双轴数据
        yAxis.push({
          type: "value",
          name: confJson.primaryYTitle || ""
        });
        yAxis.push({
          type: "value",
          name: confJson.secondaryYTitle ||
            ""
        });
      }

      let chart = new EchartsConf(
        conf.columnTitle,
        legendList,
        confJson.chartType,
        xAxis,
        yAxis,
        series,
        confJson.theme
      );
      let chartItem = new ChartsItem(
        key,
        chart
      );
      console.log(
        "图表的信息：",
        chartItem
      );
      Vue.set(
        state.showCharts[
          tableEnglishName
        ].list,
        key,
        chartItem
      );
    });
  }
};


// 更改templateType 。 造成的影响更改
// 配置echarts的弹窗中的第一个展示图表， 为展示图表
//http://localhost:8080/auditModel/model/show/queryModelResultTable.cas
// 参数：modelID:模型ID，tableType: 结果表类型(展示表ST或结果表RT)
// 里面的字段也是拿的展示图表的字段。


const actions = {
  //展示表的获取
  async getStTable({ commit }: any, payload: any) {
    let { data } = await axios.get(getUrl("query-model-result-table"), {
      params: {
        modelID: payload.value,
        tableType: "ST"
      }
    });
    console.log(data);

    if (data.data && data.code == 200) {
      commit("appendSTList", {
        value: data.data
      });
    }
  },
  async init({ commit }: any, payload: any) {
    console.log("async.....");
    try {
      //中间表
      let tablesInfo = await axios.get(getUrl("query-model-result-table"), {
        params: {
          modelID: payload.value,
          tableType: "RT"
        }
      });
      if (tablesInfo.data && tablesInfo.data.code == 200) {
        commit("initResultTabels", {
          value: tablesInfo.data.data
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(tablesInfo);
  },
  //获取conf info
  async getConf({ commit }: any, payload: any) {
    // value 为 table的 enName
    let { value } = payload;
    let conf = await axios.get(getUrl("get-model-result-conf"), {
      params: {
        tableName: value
      }
    });
    if (conf.data.code == 200) {
      commit("addRootConf", {
        value: conf.data.data.condition,
        enName: value
      });
      commit("addRootColumn", {
        value: conf.data.data.columnList,
        enName: value
      });
      commit("addSelectedTableRowsInfo", {
        value: conf.data.data.tableField,
        count: conf.data.data.count,
        enName: value
      });
      commit('initQueryConf',{
        value: conf.data.data.condition,
        enName: value
      })
    }
  },
  // 获取结果表的字段信息
  async getTableField({ commit }: any, payload: any) {
    let { tableEnglishName } = payload;
    
    let { data } = await axios.get(getUrl("table-fields"), {
      params: {
        tableEnglishName
      }
    });
    commit("addTableFields", {
      tableEnglishName,
      value: data.data
    });
  },
  //初始化 展示表的 表字段结构
  async getStTableField({ commit }: any, payload: any){
    let { tableEnglishName } = payload;
    let { data } = await axios.get(getUrl("table-fields"), {
      params: {
        tableEnglishName
      }
    });
    commit("addStTableFields", {
      tableEnglishName,
      value: data.data
    });
  },
  // 保存按钮
  async submitConf({ commit, state }: { commit: any, state: State }, payload: { modelNo: string, modelID:string}){
    // throw new Error('错误！！');
    // 当前选中的 result table
    let activeRT = state.resultTables[state.activeNum];
    // server端上行的数据
    let serverData:any = {
      modelNo: payload.modelNo,
      tableName: activeRT.enName,
      condition: [],
      columns: [],
      tableField:[]
    };
    // 设置条件检测
    state.conditionMap[activeRT.enName].forEach((item,index)=>{
        // 有且仅有一条
        if (index == 0 && state.conditionMap[activeRT.enName].length - 1 == index) {
            if (
              item.operaFun === "" &&
              item.columnType === "" &&
              item.chineseFieldName === "" &&
              item.aliasName === "" &&
              item.columnName === ""
            ) {
              return;
            } else if (
              item.operaFun === "" ||
              item.columnType === "" ||
              item.columnName === ""
            ) {
              throw new Error("请检查设置条件，尚未填写完毕！");
            } else {
              item.chineseTableName = activeRT.cnName;
              item.englishTableName = activeRT.enName;
              item.modelNo = payload.modelNo;
              serverData.condition.push(item);
            }
        }else if (state.conditionMap[activeRT.enName].length - 1 == index){
          //最后一条
            if (
              item.operaFun === "" &&
              item.columnType === "" &&
              item.chineseFieldName === "" &&
              item.aliasName === "" &&
              item.columnName === ""
            ) {
              return;
            } else if (
              item.operaFun === "" ||
              item.columnType === "" ||
              item.columnName === ""
            ) {
              throw new Error("请检查设置条件，尚未填写完毕！");
            } else {
              item.chineseTableName = activeRT.cnName;
              item.englishTableName = activeRT.enName;
              item.modelNo = payload.modelNo;
              serverData.condition.push(item);
            }
        }else{
          // 其他情况
            if (
              item.operaFun === "" ||
              item.columnType === "" ||
              item.columnName === ""
            ) {
              throw new Error("请检查设置条件，尚未填写完毕！");
            } else {
              item.chineseTableName = activeRT.cnName;
              item.englishTableName = activeRT.enName;
              item.modelNo = payload.modelNo;
              serverData.condition.push(item);
            }
        }
    });
    // echarts图表设置检查
    if (
      state.columnMap[activeRT.enName] &&
      state.columnMap[activeRT.enName][state.templateTypeMap[activeRT.enName]]
    ) {
        state.columnMap[activeRT.enName][state.templateTypeMap[activeRT.enName]].forEach(item =>{
            if(item.columnJson == ''){
              throw new Error('请完成展示图的设置工作！');
            }
            let echartsConf: PopSettingChart = JSON.parse(item.columnJson);
            if (
              echartsConf.chartType === "" ||
              echartsConf.valueCol === "" ||
              echartsConf.nameCol === ""
            ) {
              throw new Error("请检查图表设置选项，有尚未配置的！");
            } else {
              item.modelNo = payload.modelNo;
              item.modelId = payload.modelID;
              serverData.columns.push(item);
            }
        });
    }

    //设置表格提交
    if (state.selectedFieldMap[activeRT.enName]){
      state.tableFieldMap[activeRT.enName].forEach(({ showName,fieldEnglishName }) => {
        for(let i = 0; i<state.selectedFieldMap[activeRT.enName].length; i++){
          if(fieldEnglishName === state.selectedFieldMap[activeRT.enName][i]['fieldEnglishName']){
            serverData.tableField.push({
              ...state.selectedFieldMap[activeRT.enName][i],
              showName
            });
            break;
          }
        }
      });
    }
    console.log('提交的conf内容', serverData);
    try {
      let result = await axios.post(
        getUrl("add-result-conf"),
        qs.stringify({
          // ...serverData
          tableName: serverData.tableName,
          condition: JSON.stringify(serverData.condition),
          columns: JSON.stringify(serverData.columns),
          tableField: JSON.stringify(serverData.tableField),
          modelNo: serverData.modelNo
        })
      );
    } catch (error) {
      console.log(error);
    }
    
    // console.log(result);
    //if result ok  sync query
    commit("syncQueryConf", {
      tableEnglishName: activeRT.enName
    });
    
  },
  // 查询表 结果
  async queryResult({commit,state}:{
    commit:any
    state:State
  },payload:any){
    //console.log(state.queryConf);
    let { tableEnglishName, modelNo } = payload;
    let currentPage = 1;
    let condition = state.queryConf[tableEnglishName];
    let queryCondition: ShowCondition[] = [];
    // 过滤

    for(let i = 0;i<condition.length;i++){
      if(condition[i].value === ''){
        continue;
      }
      console.log(condition[i].value);
      queryCondition.push(condition[i]);
    }


    let logicVal = state.logicValMap[tableEnglishName] ? 'or' : 'and';

    let { data } = await axios.post(
      getUrl("show-model-result"),
      qs.stringify({
        tableName: tableEnglishName,
        modelNo: modelNo,
        condition: JSON.stringify(queryCondition),
        pageSize,
        currentPage,
        logicVal
      })
    );

    if(data.code == 200){
      console.log('=================show data =====================');
      console.log(data);

      commit('initShowCharts', {
        tableEnglishName: tableEnglishName,
        data: data.data.columns || []
      });
      //TODO: test

      // commit("initShowCharts", {
      //   tableEnglishName: tableEnglishName,
      //   data:
      //     {
      //       0: data.data.columns[0],
      //       1: data.data.columns[0],
      //       2: data.data.columns[0],
      //     } || [],
      // });

      commit("renderShowTable", {
        tableEnglishName: tableEnglishName,
        count: data.data.count,
        data: data.data.tableData,
        currentPage: currentPage
      });
    }else{

      commit('initShowCharts', {
        tableEnglishName: tableEnglishName,
        data: []
      });

      commit("renderShowTable", {
        tableEnglishName: tableEnglishName,
        count: 0,
        data: [],
        currentPage: 1
      });

      return {
        code : data.code,
        msg: data.msg
      };
    }
    
  },
  // 翻看下一篇内容
  async nextPage({commit,state}:{
    commit:any
    state:State
  },payload:any){
    let { tableEnglishName, currentPage, modelNo } = payload;
    let condition = state.queryConf[tableEnglishName];
    let logicVal = state.logicValMap[tableEnglishName] ? "or" : "and";
    //增加参数 tablename 英文 以及modelNo
    let { data } = await axios.post(
      getUrl("show-model-result"),
      qs.stringify({
        tableName:tableEnglishName,
        modelNo:modelNo,
        condition: JSON.stringify(condition),
        pageSize,
        currentPage,
        logicVal
      })
    );

    // if (data.code != 200) {
    //   throw new Error(data.msg);
    // }
    if(data.code != 200){
      commit("renderShowTable", {
        tableEnglishName: tableEnglishName,
        count: 0,
        data: [],
        currentPage: 1
      });
    }else{
      commit("renderShowTable", {
        tableEnglishName: tableEnglishName,
        count: data.data.count,
        data: data.data.tableData,
        currentPage: currentPage
      });
    }

    return {
      msg:data.msg,
      code:data.code
    }
    
  }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}