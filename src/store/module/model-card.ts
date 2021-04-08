
import ModuleInfo from '@/model/module-info/info';
// import ModuleForFe, { ModuleForServer, Tag, OrderField } from '@/model/module/module';
import axios from '@/util/axios';
import getUrl from '@/util/url';
import Vue from 'vue';
import getId from '@/util/key';
type State = {
    stModel: any,
    modules: any[],
    tableList: any[],
    params:any[],
    runLogs:any[],
    status:boolean,
    feId:string
}

let state : State = {
    stModel: null,
    modules:[],
    tableList:[],
    params:[],
    runLogs:[],
    status:false,
    feId:''
};

const getters = {
    getStModel(state:State){
        return state.stModel;
    },
    getModules(state:State){
        return state.modules;
    },
    getTableList(state:State){
        return state.tableList;
    },
    getParams(state:State){
        return state.params;
    },
    getRunLogs(state:State){
        return state.runLogs;
    },
    getStatus(state:State){
        return state.status;
    },
    getAll(state:State){
        return state;
    },
    getModelCardFeId(state:State){
        return state.feId;
    }

};

const mutations = {
    initData(state:State,payload:any){
        // Vue.set(state,'stModel',null);
        // Vue.set(state,'modules',[]);
        // Vue.set(state,'tableList',[]);
        // Vue.set(state,'params',[]);
        // Vue.set(state,'runLogs',[]);
        state.feId = getId();
        let { stModel, modules, tableList, params, runLogs, status} = payload.data;
        // stModel
        
        state.stModel = stModel;
        // modules
        state.modules = modules;
        // tableList
        state.tableList = tableList;
        // params
        state.params = params;
        // runLogs
        state.runLogs = runLogs;
        // 运行状态
        state.status = status;
    }
};

const actions = {
    async getData({commit}:any,payload:{modelID:string}){
        let {modelID} = payload;
        let { data } = await axios.get(getUrl('get-model-card'),{
            params:{
                modelID
            }
        });
        console.log('initData submit....');
        commit('initData',{
            data:data.data
        });
    }
};



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};