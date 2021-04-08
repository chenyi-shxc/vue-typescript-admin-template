import getUrl from '@/util/url';
import axios from '@/util/axios';
import Vue from 'vue';
type item = {
    id:string,
    label:string,
    tableEnglishName:string,
    isLeaf:boolean,
};

type State = {
    //账表根目录数据
    menuRootData: item[],
}

const state: State = {
    // 根tabels的 文件目录
    menuRootData:[],
};

const getters = {
    menuRootData:(state:State)=>{
        return state.menuRootData;
    }
};

const mutations = {
    initFirstMenu: (state: State, payload: any)=>{
        let {data} = payload.val;
        Vue.set(state,'menuRootData',[]);
        data.firstMenuList.forEach((item:any)=>{
            state.menuRootData.push({
                //id: item.dictId,
                id: item.chineseName,
                label: item.chineseName,
                tableEnglishName: item.englishName,
                isLeaf: false,
            });
        });
    }

};

const actions = {
    // 在模型的配置页面进行 调用初始化 menu.
    //初始化 一级账表菜单 文件夹
    initFirstMenu: async ({ commit }: any, paylaod: any) => {
        let result = await axios.get(getUrl("table-first-menu"), {});
        commit('initFirstMenu',{
            val:result.data
        });
    },
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};