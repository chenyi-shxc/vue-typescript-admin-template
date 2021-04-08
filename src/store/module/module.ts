import ModuleForFe, { ModuleForServer, Tag, ModuleCallItem, ModuleCall} from '@/model/module/module';
import Vue from 'vue';
import axios from '@/util/axios';
import getUrl from '@/util/url';
import getId from '@/util/key';
import { findIndex } from 'lodash';
import { moduleDefine } from '@/util/const';
import qs from  'qs';
// 运行参数查询
import ModuleParams from "@/model/module/params";
type State = {
    moduleList: ModuleForFe[],//模型列表
    backupData: string,// 备份数据， json类型
    isAbleEdit: boolean//能否编辑
    isShowLoading: boolean//是否显示loading
    isSortable: boolean//是否可移动
    isShowAddModuleDialog: boolean//是否可以展示添加module弹窗
    addPos: number//添加弹窗的位置
    //顶部的参数数据
    paramsData: ModuleParams[],
    //结果表数据
    resultTableData: {
        tableId: string,
        modelId: string,
        tableType: string,
        cnName: string,
        enName: string,
        createDate: string,
        memo: string
    }[],
    //模型运行信息
    runModelState: {
        logId: string,
        modelId: string,
        step: number | string,
        runRange: string,
        runType: string,
        createDate: string,
        runStatus: string,
        globalParam: string,
        localParam: string,
        description: string,
        version: string,
        runRegx: string
    }[],
    // 选项 map
    optionsMap: {
        //fieldKey 用户参数
        [fieldKey: string]: {
            //这里label与value是一样的
            label: string,
            value: string
        }[]
    },
    menuLoading: boolean,
    menu: Array<any>,
    isRunning: boolean // 是否在运行
};

const state: State = {
  moduleList: [],
  backupData: "",
  isAbleEdit: true,//TODO:后边过一边 编辑的功能
  isShowLoading: true,
  isSortable: true,
  isShowAddModuleDialog: false,
  addPos: 0,
  paramsData: [],
  resultTableData: [],
  runModelState: [],
  optionsMap: {},
  menuLoading: false,
  menu: [],
  isRunning:false
};

const getters = {
    isRunning(state:State){
        return state.isRunning;
    },
    optionsMap: (state: State) => {
        return state.optionsMap;
    },
    runModelState: (state: State) => {
        return state.runModelState;
    },
    paramsData: (state: State) => {
        return state.paramsData;
    },
    isShowAddModuleDialog: (state: State) => {
        return state.isShowAddModuleDialog;
    },
    getModuleList: (state: State, getters: any) => {
        return state.moduleList;
    },
    isAbleEdit: (state: State) => {
        return state.isAbleEdit;
    },
    isSortable: (state: State) => {
        return state.isSortable;
    },
    resultTableData: (state: State) => {
        return state.resultTableData;
    },
    //获取整个 结构的 所有表， 去重复后的
    getAllTables: (state: State) => {
        let result: Tag[] = [];
        let map: {
            [key: string]: boolean
        } = {};//当前

        function pushHandler(tableItem: Tag) {
            if (map[tableItem.id]) {
                return;
            } else {
                map[tableItem.id] = true;
                result.push(tableItem);
            }
        }

        state.moduleList.forEach((item) => {
            // 其他的都 没有表
            //去除重复
            switch (item.moduleType) {
                case moduleDefine.TABLE_QUERY:
                    //resourceTable
                    //targetTable
                    if(!item.actionType){
                        item.resourceTable.concat(item.targetTable).forEach(pushHandler);
                    }else{
                        item.resourceTable.forEach(pushHandler);
                    }
                    break;
                case moduleDefine.TABLE_CREATE:
                    //resourceTable
                    //targetTable
                    item.resourceTable.concat(item.targetTable).forEach(pushHandler);
                    break;
                case moduleDefine.TABLE_DROP:
                    //targetTable
                    item.targetTable.forEach(pushHandler);
                    break;
                case moduleDefine.TABLE_COMPARE:
                    //resourceTable
                    //targetTable
                    item.resourceTable.concat(item.targetTable).forEach(pushHandler);
                    break;
                case moduleDefine.DATA_INSERT:
                    if (item.actionType == '[复制格式]') {
                        //targetTable
                        //resourceTable 可能有根据 操作类型
                        item.resourceTable.concat(item.targetTable).forEach(pushHandler);
                    } else {
                        //targetTable
                        item.targetTable.forEach(pushHandler);
                    }
                    break;
                case moduleDefine.DATA_UPDATE:
                    //resourceTable 
                    item.resourceTable.forEach(pushHandler);
                    break;
                case moduleDefine.DATA_DELETE:
                    //resourceTable
                    item.resourceTable.forEach(pushHandler);
                    break;
            }

        });
        return result;
    },
    allVars: (state: State):string[] => {
        //获取所有的定义变量 给func-field用

        let { moduleList } = state;
        //['『A 变量』','『B 变量』']
        let result: string[] = [];
        // 去重复判断
        let map: { [key: string]: boolean } = {};
        moduleList.forEach((item) => {
            if (item.moduleType === moduleDefine.VARIABLE_DEFINE) {
                // 是定义变量类型的，将定义变量的内容拿出来，给选择窗口用
                item.fieldDefined.replace(/\n/g, '').split(';').forEach(item => {
                    if (item != '') {
                        try {
                            let fieldName = item.split('/')[0];
                            //去重复操作
                            if (!map[fieldName]) {
                                map[fieldName] = true;
                                result.push(fieldName);
                            }
                        } catch (e) {
                            console.log('变量定义的类型可能发生了错误');
                            console.log(e.stack);
                        }
                    }
                });
            }
        });
        return result;
    },

    getMenu: (state: State, getters: any) => {
        return state.menu;
    },
    getMenuLoading: (state: State, getters: any) => {
        return state.menuLoading;
    },

    collaspeAllState:(state:State)=>{
        let collapse = true;
        // state.moduleList
        for(let i = 0; i < state.moduleList.length; i++){
            if(collapse != state.moduleList[i].collapse){
                return false;
            }
        }
        return true;
    }

};

function getTagList(val: any): Tag[] {

    // let list = val.split(';');
    let result: Tag[] = [];
    val.forEach((item: any) => {
        result.push({
            id: getId(),
            title: item.title,
            args: item.args
        })
    });
    return result;
};

function getModuleByFeId(feId: string, state: State): ModuleForFe {
    let index = findIndex(state.moduleList, (item: ModuleForFe) => {
        return item.feId == feId;
    });
    if (index == -1) {
        throw new Error(`没有找到${feId},应该是那个流程出错了`)
    }
    return state.moduleList[index];
}


const mutations = {
    changeEdit(state: State, paylaod: { value: boolean }) {
        state.isAbleEdit = paylaod.value;
    },
    changeIsShowAddModuleDialog(state: State, payload: any) {
        state.isShowAddModuleDialog = payload.value;
    },
    changeAddPos(state: State, payload: { moduleId: string | number }) {
        // -1 为没state.moduleList 的长度为0的情况下
        if (payload.moduleId == -1) {
            state.addPos = 0;
        } else {
            let index = findIndex(state.moduleList, (item) => {
                return item.feId == payload.moduleId;
            });
            state.addPos = index + 1;
        }

    },
    titleChange: (state: State, payload: any) => {
        // 文案发生更改的时候 进行变化
        let {
            moduleFeId,
            tagId,
            title,
            fieldKey
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        let tagIndex = findIndex((module as any)[fieldKey], (item: Tag) => {
            return item.id == tagId;
        });

        if (tagIndex == -1) {
            throw new Error(`没有找到tag:${tagId},应该是那个流程出错了`)
        }
        (module as any)[fieldKey][tagIndex].title = title;
    },
    reset(state: State, payload: any) {
        state.moduleList = JSON.parse(state.backupData);
    },
    delTag: (state: State, payload: any) => {
        // 删除了一个标签的时候的变化
        let {
            moduleFeId,
            tagId,
            fieldKey
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        let delIndex = findIndex((module as any)[fieldKey], (item: Tag) => {
            return item.id == tagId;
        });
        if (delIndex == -1) {
            throw new Error(`没有找到tag:${tagId},应该是那个流程出错了`)
        }
        (module as any)[fieldKey].splice(delIndex, 1);
    },
    tagConfirm: (state: State, payload: any) => {
        // 判断一下内容，如果是空白字符串将其删除
        let {
            moduleFeId,
            fieldKey
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        while (true) {
            let tagList = (module as any)[fieldKey];
            if (!tagList || tagList.length == 0) {
                break;
            }
            let index = findIndex(tagList, (item: Tag) => {
                return item.title === '';
            });
            if (index === -1) {
                break;
            }
            tagList.splice(index, 1);

        }

    },
    // 更新限制记录数 仅能够输入数字以及 ''空白字符串
    updateDataSize: (state: State, payload: any) => {
        let {
            moduleFeId,
            fieldKey,
            val
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        if (val === '') {

            (module as any)[fieldKey] = val;
        } else {
            (module as any)[fieldKey] = val - 0;
        }
    },
    //更改操作选项的值
    setActionType: (state: State, payload: any) => {
        let { moduleFeId, val, } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        module.actionType = val;
    },
    changeList: (state: State, payload: any) => {
        // 更改顺序的时候
        let {
            moduleFeId,
            fieldKey,
            list
        } = payload;
        //TODO: 遍历list 修改顺序
        let module = getModuleByFeId(moduleFeId, state);
        (module as any)[fieldKey] = <Tag[]>[];
        list.forEach((item: Tag) => {
            (module as any)[fieldKey].push(item);
        });
    },
    //初始化数据信息
    initModuleData: (state: State, payload: any) => {
        let { val } = payload;
        let list: ModuleForFe[] = [];

        val.forEach((item: ModuleForServer) => {
            let feJSON = JSON.parse(item.feData);
            let feModule = new ModuleForFe();
            feModule.stepID = item.stepID;
            feModule.moduleType = item.moduleType;
            feModule.sequence = item.sequence;
            feModule.moduleNo = item.moduleNo;
            feModule.resourceTable = getTagList(feJSON.resourceTable);

            feModule.connCondition = item.connCondition;
            feModule.cycleStepLength = item.cycleStepLength;
            feModule.cycleRange = item.cycleRange;
            feModule.funcField = item.funcField;//getTagList(item.funcField);
            feModule.dataSize = feModule.dataSize;
            feModule.condition = item.condition;
            feModule.groupField = item.groupField;
            feModule.orderField = feJSON.orderField;
            // 数据插入模板
            feModule.actionType = feJSON.actionType;
            feModule.targetTable = getTagList(feJSON.targetTable);
            // intersectionTable以下没有添加
            feModule.intersectionTable = item.intersectionTable;
            //模块这里需要更改
            feModule.moduleList = [];
            if (feJSON.moduleList && feJSON.moduleList.length > 0){
                feJSON.moduleList.forEach((modelCallInfo: ModuleCall) => {
                    feModule.moduleList.push({
                        ...modelCallInfo,
                        feId: getId()
                    });
                });
            }
            feModule.moduleNo = item.moduleNo;
            feModule.moduleType = item.moduleType;
            feModule.orderField = feJSON.orderField;
            feModule.resourceField = feJSON.resourceField;
            feModule.sequence = feJSON.sequence;
            feModule.stepID = item.stepID;
            feModule.trueRange = item.trueRange;
            feModule.falseRange = item.falseRange;
            feModule.variable = item.variable;
            feModule.desc = item.desc;

            list.push(feModule);
        });
        state.backupData = JSON.stringify(list);
        state.moduleList = list;
    },
    // 更新调用模块的信息 全覆盖方式更新
    updateCallModuleListFieldFull(state: State, payload: { moduleFeId: string, val: ModuleCallItem[][]}) {
        let {
            moduleFeId,
            val
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        let result: ModuleCall[] = [];
        val.forEach((item,index)=>{
            let moduleCall: ModuleCall = {
                feId:getId(),
                val:'',
                list:[...item]
            };
            item.forEach((item,index)=>{
                if(index == 0){
                    moduleCall.val = item.modelName;
                }else{
                    moduleCall.val = item.modelName + '/' + moduleCall.val;
                }
            });
            result.push(moduleCall);
        });
        module.moduleList = result;
    },
    //删除选中的调用模块
    delCallModuleItem(state:State,payload:{moduleFeId:string,delItemFeId:string}){
        let { moduleFeId, delItemFeId} = payload;
        let module = getModuleByFeId(moduleFeId, state);
        let index = findIndex(module.moduleList,(item)=>{
            return item.feId == delItemFeId;
        });
        if(index != -1){
            module.moduleList.splice(index,1);
        }
    },

    updateOrderField(state: State, payload: any) {
        //console.log(payload);
        let {
            moduleFeId,
            fieldKey,
            val
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);

        let showText = '';
        for (let i = 0; i < val.length; i++) {
            let item = val[i];
            let mark = '';
            if (item.isDesc) {
                mark = '↓';
            } else {
                mark = '↑';
            }
            showText += `[${item.tableChineseName}.${item.fieldChineseName}]${mark},\n`;
        }
        showText = showText.replace(/,$/, '');

        (module as any)[fieldKey] = {
            val: showText,
            list: [...val]
        };
        console.log(showText);
    },
    changeModuleLoading: (state: State, payload: any) => {
        state.isShowLoading = !!payload.val;
    },
    // 更新文本字段内容，查询到具体的module之后，在更新他的 string类型的字段
    updateFieldString: (state: State, payload: any) => {
        let {
            moduleFeId,
            fieldKey,
            val
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);
        (module as any)[fieldKey] = val;
    },
    //添加tag
    addTag: (state: State, payload: any) => {
        let {
            moduleFeId,
            fieldKey,
        } = payload;

        let module = getModuleByFeId(moduleFeId, state);
        //过滤 有空白的 不尽兴添加元素
        let pushMarker = true;
        (module as any)[fieldKey].forEach((item: Tag) => {
            if (item.title === '') {
                pushMarker = false;
            };
        });
        //console.log(pushMarker);
        if (pushMarker) {
            (module as any)[fieldKey].push({
                id: getId(),
                title: ''
            });
        }
    },
    // 根据给定的位置，进行插入文案操作
    insertValatPoint(state: State, payload: any) {
        let {
            moduleFeId,
            fieldKey,
            val // 数据对象
        } = payload;
        let module = getModuleByFeId(moduleFeId, state);

        let resourceTxt: string = (module as any)[fieldKey];
        let {
            selectionStart,
            selectionEnd,
            txt
        } = val;
        //后续数据操作
        let listRes = resourceTxt.split('');
        listRes.splice(selectionStart, selectionEnd - selectionStart, txt);
        (module as any)[fieldKey] = listRes.join('');
    },

    collapseAll(state:State, payload:any){
        state.moduleList.forEach((item)=>{
            item.collapse = payload.val;
        });
    },
    // 账表选择框 选择之后结果进行更新 调用下面的方法更新 视图
    updateTagByList: (state: State, payload: any) => {
        let {
            moduleFeId,
            fieldKey,
            val,// 数组
        } = payload;
        // console.log(moduleFeId);
        //获取到module
        let module = getModuleByFeId(moduleFeId, state);
        Vue.set(module,fieldKey,[]);
        
        val.forEach((item: any) => {
            if (item.isLeaf) {
                (<any>module)[fieldKey].push({
                    id: getId(),
                    title: item.label,
                    args: {
                        // 英文表名字
                        tableEnglishName: item.tableEnglishName //为了方便扩展
                    }
                });
            }
        });

        if (payload.queryInfo) {
            // 有模糊查询的内容
            // 入库排重复
            let tmp = [...(<any>module)[fieldKey]];
            for (let i = 0; i < payload.queryInfo.length;i++){
                let isAppend = true;
                for (let j = 0; j < tmp.length;j++){
                    if (payload.queryInfo[i].tableEnglishName === tmp[j].args.tableEnglishName){
                        // 丢弃不要重复的数据
                        isAppend = false;
                        break;
                    }
                }
                if (isAppend){
                    (<any>module)[fieldKey].push({
                        id: getId(),
                        title: payload.queryInfo[i].label,
                        args: {
                            // 英文表名字
                            tableEnglishName: payload.queryInfo[i].tableEnglishName //为了方便扩展
                        }
                    });
                }
                
            }
        }   
    },
    // likeSearchTable(state: State, payload: { label: string, tableEnglishName: string, fieldKey: string, moduleFeId:string}){
    //     //模糊查询的表格加入操作
        
    // },
    // 模型块在移动的时候
    changeModulePos(state: State, payload: { moduleId: string, dir: string }) {
        let {
            moduleId,
            dir
        } = payload;
        if (dir == 'up') {
            //向上移动
            let module = getModuleByFeId(moduleId, state);
            let index = findIndex(state.moduleList, (item) => {
                return item.feId == moduleId;
            });
            state.moduleList.splice(index, 1);
            state.moduleList.splice(index - 1, 0, module);
        } else if (dir == 'down') {
            //向下移动
            let module = getModuleByFeId(moduleId, state);
            let index = findIndex(state.moduleList, (item) => {
                return item.feId == moduleId;
            });
            state.moduleList.splice(index, 1);
            state.moduleList.splice(index + 1, 0, module);
        }
    },
    delModule(state: State, payload: { moduleId: string }) {
        let { moduleId } = payload;
        //删除module
        let index = findIndex(state.moduleList, (item) => {
            return item.feId == moduleId;
        });
        state.moduleList.splice(index, 1);
    },
    addModule(state: State, payload: { type: string }) {
        //在xx的后方增加module
        let newModule = new ModuleForFe();
        newModule.moduleType = payload.type;
        if (state.moduleList.length == state.addPos) {
            state.moduleList.push(newModule);
        } else {
            state.moduleList.splice(state.addPos, 0, newModule);
        }
    },
    //初始化 params data
    initParamsData(state: State, payload: { val: any[] }) {
        // console.log(payload.value);
        let { val } = payload;
        // console.log(val);
        if (!(val && val.length > 0)) {
            return;
        }
        Vue.set(state,'paramsData',[]);
        val.forEach((item) => {
            state.paramsData.push(
                new ModuleParams(
                    item.id,
                    item.modelId,
                    item.name,
                    item.code,
                    item.type,
                    item.paramType,
                    item.paramValue,
                    item.paramDesc
                )
            );
        });
    },
    initResultData(state: State, payload: { value: any[] }) {
        if(payload.value){
            Vue.set(state,'resultTableData',[...payload.value])
        }else{
            Vue.set(state,'resultTableData', []);
        }
    },
    initRunModelState(state: State, payload: { value: any[] }) {
        console.log('###!',payload.value);
        // state.runModelState = payload.value;
        if(payload.value && payload.value.length > 0){
            Vue.set(state,'runModelState',[...payload.value]);
        }else{
            Vue.set(state,'runModelState',[]);
        }
    },
    //初始化选择options内容
    initDictionryOpts(state: State, payload: { data: any[], key: string }) {
        Vue.set(state.optionsMap, payload.key, []);
        payload.data.forEach((item) => {
            state.optionsMap[payload.key].push({
                label: item.name,
                value: item.name
            })
        });
    },
    //更改运行状态
    changeRunningState(state:State,payload:{val:boolean}){
        state.isRunning = payload.val;
    },
    updateParams(state: State, payload: { data: ModuleParams, isNew: boolean, feId: string }) {
        let {
            data,
            isNew,
            feId
        } = payload;
        if (isNew) {
            state.paramsData.push(data);
        } else {
            let index = findIndex(state.paramsData, (item) => {
                return item.feId == feId;
            });
            if (index === -1) {
                throw new Error(`数据有问题啊， 没有找到feId为:${feId}的值`);
            }
            let item = state.paramsData[index];

            item.code = data.code;
            item.id = data.id;
            item.modelId = data.modelId;
            item.name = data.name;
            item.paramDesc = data.paramDesc;
            item.paramNum = data.paramNum;
            item.paramType = data.paramType;
            item.paramValue = data.paramValue;
            item.type = data.type;
        }
    },
    delParams(state: State, payload: { data: ModuleParams }) {
        let index = findIndex(state.paramsData, (item) => {
            return item.feId === payload.data.feId;
        });
        if (index == -1) {
            throw new Error(`错误没有找到feId为：${payload.data.feId}`);
        }
        state.paramsData.splice(index, 1);
    },

    setMenuLoading: (state: any, payload: any) => {
        state.menuLoading = payload.val;
    },

    setMenu: (state: any, payload: any) => {
        state.menu = payload.menu;
    },

};

const actions = {
    // initRunModelState: async ({ commit }: any, payload: any) => {
        // let result = await axios.get(getUrl('get-model-state'), {
        //     params: {
        //         modelID: payload.value
        //     }
        // });
        // commit('initRunModelState', {
        //     value: result.data.data.logList
        // });
    // },
    // initResultData: async ({ commit }: any, payload: any) => {
        // let result = await axios.get(getUrl("query-model-result-table"), {
        //   params: {
        //     tableType: "rt",
        //     modelID: payload.value
        //   }
        // });
        // commit('initResultData', {
        //     value: result.data.data
        // });
    // },
    initModuleData: async ({ commit }: any, payload: any) => {

        commit('changeModuleLoading', {
            val: true
        });
        // let { data } = await axios.get(getUrl("get-model-card"), {
        //     params: {
        //         ...payload.val
        //     }
        // });
        // console.log(data);
        let data = payload;

        commit('initResultData',{
            value: data.tableList
        })

        //参数是从payload中获取的
        commit('changeModuleLoading', {
            val: false
        });
        commit("initParamsData", {
            val: data.params
        });
        // 同时初始化一个数据。常规的
        commit("initModuleData", {
            val: data.modules
        });
        commit("initRunModelState",{
            value: data.runLogs
        });
        commit("changeRunningState", {
            val: data.status
        });
    },
    async save({ commit }: any, payload: { value: ModuleForFe[], modelID: string, modelNo: string }) {

        let { value, modelID, modelNo } = payload;
        let data: ModuleForServer[] = [];

        value.forEach((item, index) => {
            let m = new ModuleForServer();
            m.actionType = item.actionType;
            m.condition = item.condition;
            m.connCondition = item.connCondition;
            m.cycleCondition = item.cycleCondition;
            m.cycleRange = item.cycleRange;
            m.dataSize = item.dataSize;
            m.desc = item.desc;
            m.differenceTable = item.differenceTable;
            m.falseRange = item.falseRange;
            m.feData = JSON.stringify(item);
            m.fieldData = item.fieldData;
            m.fieldDefined = item.fieldDefined;
            m.fieldOperate = item.fieldOperate;
            m.funcField = item.funcField;
            m.groupField = item.groupField;
            m.intersectionTable = item.intersectionTable;
            // 模型调用
            if(item.moduleList && item.moduleList.length > 0){
                m.moduleList = '';
                m.moduleIds = '';
                m.moduleNos = '';
                item.moduleList.forEach((modelCallInfo: ModuleCall,index) => {
                    if(index == 0){
                        m.moduleList += modelCallInfo.val;
                        m.moduleIds += modelCallInfo.list[0].modelId;
                        m.moduleNos += modelCallInfo.list[0].modelNo;
                    }else{
                        m.moduleList += (',' + modelCallInfo.val);
                        m.moduleIds += (',' + modelCallInfo.list[0].modelId);
                        m.moduleNos += (',' + modelCallInfo.list[0].modelNo);
                    }
                });
            }
            m.moduleNo = modelNo;
            m.moduleType = item.moduleType;
            if (item.orderField && item.orderField.val) {
                m.orderField = item.orderField.val;
            } else {
                m.orderField = '';
            }

            m.resourceField = item.resourceField;
            //m.resourceTable = item.resourceTable;
            let resourceTableResult = '';
            item.resourceTable.forEach((resourceTable, index) => {
                if (index + 1 != item.resourceTable.length) {
                    resourceTableResult += `[${resourceTable.title}],`
                } else {
                    resourceTableResult += `[${resourceTable.title}]`
                }
            });
            m.resourceTable = resourceTableResult;
            // TOOD: sequence 这个与moduleNo 的区别？
            m.sequence = item.sequence;

            m.stepID = item.stepID;

            // m.targetTable = item.targetTable;

            let targetTableResult = '';

            item.targetTable.forEach((targetTable, index) => {
                if (index + 1 != item.targetTable.length) {
                    targetTableResult += `[${targetTable.title}],`
                } else {
                    targetTableResult += `[${targetTable.title}]`
                }
            });

            m.targetTable = targetTableResult;

            m.trueRange = item.trueRange;

            m.variable = item.variable;

            data.push(m);
        });
        console.log(data);
        try {
            let result = await axios.post(getUrl('save-model-content'), qs.stringify({
                modelID,
                modules: JSON.stringify(data)
            }));
            return true;
        } catch (error) {
            return false;
        }

    },
    // async initParamsData({ commit }: any, payload: { value: string }){
    //     // value 为当前的模型id
    //     console.log(payload.value);
    //     let result = await axios.get(getUrl('get-model-param'),{
    //         data:{
    //             modelID:payload.value
    //         }
    //     });
    //     // console.log(result);
    //     let data = result.data.data;
    //     commit('initParamsData',{
    //         value:data
    //     })
    // }   
    async queryDictionry({ commit }: any, payload: { value: string }) {
        let { data } = await axios.get(getUrl('get-model-params-opts'), {
            params: {
                type: payload.value.toUpperCase(),
                parentId:0
            }
        });
        console.log(data);

        commit('initDictionryOpts', {
            data: data.data,
            key: payload.value
        });
    },
    // 保存模型参数
    async saveParams({ commit, state }: any, payload: any) {

        let {
            modelID,//模型id
            data: paramsData,//参数 数据
            isNew,//是否是新建
            feId,// 当前的feId
        } = payload;
        let {data} = await axios.post(getUrl('save-model-params'),qs.stringify({
            ...paramsData,
            modelID: modelID,
        }));

        if (isNew) {
            paramsData.id = data.id;
        }

        commit('updateParams', {
            data: paramsData,
            isNew,
            feId
        });

    },

    async deleteParams({ commit }: any, payload: { id: string, modelID: string, data: any }) {
        let { id, modelID, data } = payload;
        await axios.post(getUrl('del-model-params'), qs.stringify({
            id,
            modelID
        }));
        commit('delParams', {
            data
        });
    },


    async runModel({ commit, state }: any, payload: { value: any }) {
        await axios.post(getUrl('run-model'), qs.stringify({
            ...payload.value
        }));
        commit("changeRunningState",{
            val:true
        });
    },

    async stopModel({ commit, state }: any, payload: { value: any }) {
        await axios.post(getUrl('stop-model'), qs.stringify({
            ...payload.value
        }));
        commit("changeRunningState", {
          val: false
        });
    },

    async downloadModel({ commit, state }: any, payload: { value: string }) {

    },


    async fetchFirstMenu({ commit }: any, paylaod: any = {}) {
        commit('setMenuLoading', { val: true });
        const { data: { code, data } } = await axios.get(getUrl('module-menu'), {});
        if (code === 200) {
            console.log('data.modelList', data.modelList);
            commit('setMenu', { menu: data.modelList });
        } else {
            // error handle..
        }
        commit('setMenuLoading', { val: false });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};