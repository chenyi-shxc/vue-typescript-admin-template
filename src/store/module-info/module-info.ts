
//模型信息
import axios from '@/util/axios';
import getUrl from '@/util/url';
// import getId from '@/util/key';
import ModuleInfo from '@/model/module-info/info';
import HistoryItem from '@/model/module-info/history';
import qs from 'qs';
import Vue from 'vue';
interface State {
    card: ModuleInfo
    tags: string[]
    history: HistoryItem[]
    historyPageInfo: {
        currentPage:number // 当前页码
        totalPage:number // 总
    }
    opts: {
        [fieldKey: string]: {
            label:string,
            value:string
        }[]
    }
}
const pageSize = 10;
const state: State = {
    card: new ModuleInfo,
    tags: [],
    history: [],
    historyPageInfo:{
        currentPage:1,
        totalPage:0
    },
    opts:{}
}

const getters = {
    historyPageInfo(state:State){
        return state.historyPageInfo;
    },
    card(state: State){
        return state.card;
    },
    tags(state:State){
        return state.tags;
    },
    history(state:State){
        return state.history;
    },
    opts(state:State){
        return state.opts;
    }
}

const mutations = {
    initCardData(state: State, payload:any){
        // console.log(payload);
        let {value} = payload;
        let card = new ModuleInfo();
        card.ascription = value.ascription;
        card.auditBasis = value.auditBasis;
        card.businessType = value.businessType;
        card.content = value.content;
        card.createDate = value.createDate;
        card.createName = value.createName;
        card.creator = value.creator;
        card.currentPage = value.currentPage;
        card.detailIdea = value.detailIdea;
        card.label = value.label;
        card.modelFunc = value.modelFunc;
        card.modelId = value.modelId;
        card.modelLevel = value.modelLevel;
        card.modelName = value.modelName;
        card.modelNo = value.modelNo;
        card.modelParentId = value.modelParentId;
        card.modelType = value.modelType;
        card.orgCode = value.orgCode;
        card.pageSize = value.pageSize;
        card.parameter = value.parameter;
        card.pdName = value.pdName;
        card.resultDict = value.resultDict;
        card.status = value.status;
        card.termIdList = value.termIdList;
        card.version = value.version;
        card.wholeIdea = value.wholeIdea;
        card.themeType = value.themeType;
        card.modelCategory = value.modelCategory;
        card.partition = value.partition;
        // 初始化 内容
        state.card = card;
    },

    initHistory(state:State,payload:any){
        let { historyList, count, currentPage } = payload;
        let result: HistoryItem[] = [];
        for(let val of historyList){
            result.push(new HistoryItem(val.modelId, val.createUser, val.createDate, val.version, val.content));
        }
        state.historyPageInfo.totalPage = Math.ceil(count / pageSize);
        state.historyPageInfo.currentPage = currentPage;
        state.history = result;
    },
    //初始化 选项内容
    initOpts(state:State,payload:any){
        let {data, key} = payload;
        Vue.set(state.opts,key,[]);
        data.forEach((item:any) => {
            state.opts[key].push({
                label: item.name,
                value: item.name
            });
        });
    },
    //更新card
    updateCardInfo(state:State,payload:{value:any}){
        state.card = payload.value;
    },
    //更新card label
    updateCardTag(state:State,payload:{value:string[]}){
        state.card.label = payload.value.join(',');
    }

}

const actions = {
    async initCardData({ commit }: any, payload: any){
        // let modelID = payload.value;
        // console.log('modelID值为：%%%%',modelID);
        // let {data} = await axios.get(getUrl('get-model-card'), {
        //     params: {
        //         modelID: modelID
        //     }
        // });
        // console.log(data);
        
        // console.log('xxx');
        // commit('initCardData',{
        //     value: data.data.stModel
        // });
        commit('initCardData', {
            value: payload
        });
    },
    async getHistoryList({ commit }: any, payload: {modelID:string,currentPage:number|string}){
        // let modelID = payload.value;
        let {
            modelID,
            currentPage
        } = payload;
        let {data} = await axios.get(getUrl("get-content-history"), {
          params: {
            modelID: modelID,
            pageSize,
            currentPage: currentPage
          }
        });
        if(data.data && data.data.list && data.data.list.length > 0){
            commit("initHistory", {
              historyList: data.data.list,
              count: data.data.count,//data.data.count,
              currentPage
            });
        }
        
    },
    async getOpts({commit}:any,payload:any){
        let value = payload.value;//获取参数名字
        let { data } = await axios.get(getUrl('get-model-params-opts'),{
            //params: value.toUpperCase()
            params: {
                type: value.toUpperCase(),
                parentId: 0
            }
        });
        commit('initOpts', {
            data: data.data,
            key: payload.value
        });
    },
    //保存card信息
    async saveCardInfo({commit}:any,payload:any){
        let {value} = payload;
        let { data } = await axios.post(getUrl('update-model-card'),qs.stringify({
            ...value
        }));
        
        commit('updateCardInfo',{
            value:payload.value
        });
    },

    async saveCardTag({ commit }: any, payload: {value:string[],modelID:string}){
        let {value,modelID} = payload;
        let { data } = await axios.post(getUrl('update-model-info-tag'),qs.stringify({
            modelID:modelID,
            label:value.join(',')
        }));
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}