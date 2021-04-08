import axios from '@/util/axios';
import getUrl from '@/util/url';
import qs from 'qs';

const state: any = {
  menuLoading: false,
  menu: [],
  addFolderDialogVisible: false,
  addTableDialogVisible: false,
};

const getters = {
  getMenu: (state: any, getters: any) => {
    return state.menu;
  },
  getMenuLoading: (state: any, getters: any) => {
    return state.menuLoading;
  },
  getAddFolderDialogVisible: (state: any, getters: any) => {
    return state.addFolderDialogVisible;
  },
  getAddTableDialogVisible: (state: any, getters: any) => {
    return state.addTableDialogVisible;
  },
};

const mutations = {
  setMenuLoading: (state: any, payload: any) => {
    state.menuLoading = payload.val;
  },
  setMenu: (state: any, payload: any) => {
    state.menu = payload.menu;
  },
  toggleAddFolderDialog: (state: any, payload: any) => {
    state.addFolderDialogVisible = payload;
  },
  toggleAddTableDialog: (state: any, payload: any) => {
    state.addTableDialogVisible = payload;
  },
};

const actions = {
  fetchFirstMenu: async ({ commit }: any, paylaod: any = {}) => {
    commit('setMenuLoading', { val: true });

    const { data: { code, data } } = await axios.post(getUrl('module-menu'), qs.stringify(paylaod));

    let list = [];
    if (!paylaod.modelName) {
      list = data.modelList.filter((item: any) => Number(item.modelParentId) < 0);
      list = list.map((item: any) => {
        const tmp = { ...item, children: [] };

        data.modelList.forEach((v: any) => {
          if (v.modelParentId === item.modelId) {
            tmp.children.push(v);
          }
        });

        return tmp;
      });
    } else {
      list = data.modelList;
    }

    if (code === 200) {
      commit('setMenu', { menu: list });
    } else {
      // error handle..
    }
    commit('setMenuLoading', { val: false });
  },

  fetchMenu: async ({ commit }: any, paylaod: any = {}) => {
    const menu = [...state.menu];
    commit('setMenuLoading', { val: true });

    // dictType区分，1为目录，大于1均为账表
    const param: any = {};
    if (paylaod.dictType === 1) {
      param.menuEnglishName = paylaod.englishName;
    } else {
      param.tableEnglishName = paylaod.englishName;
    }
    const { data: { code, data } } = await axios.post(getUrl('table-sec-menus'), qs.stringify(param));

    // const { data: { code, data } } = await axios.post('/auditModel/account/data/queryAccount', { tableEnglishName: paylaod.englishName });
    let children = [];
    if (code === 200) {
      children = data.accountList;
    } else {
      // error handle..
    }

    const updateMenu = (arr: any, id: any, children: any) => {
      return arr.map((item: any) => {
        if (item.dictId === id) {
          return { ...item, children };
        }
        if (item.children) {
          return {
            ...item,
            children: updateMenu(item.children, id, children),
          }
        }
        return { ...item };

      });
    }
    const updatedMenu = updateMenu(menu, paylaod.dictId, children);
    commit('setMenu', { menu: updatedMenu });
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