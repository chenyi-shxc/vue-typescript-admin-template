import axios from '@/util/axios';
import getUrl from '@/util/tableUrl';
import qs from 'qs';

const state: any = {
  menuLoading: false,
  menu: [],
  userMenu: [],
  tableTabs: [],
  tableLoading: false,
  activeTabData: {},
  tablePropDialogVisible: false,
  tableDialogLoading: false,
  tableDictDialogVisible: false,
  tableExportDialogVisible: false,
  tableDownloadDialogVisible: false,
  tableSortDialogVisible: false,
  tableFilterDialogVisible: false,
  tableAnalyseDialogVisible: false,
  addFolderDialogVisible: false,
  addTableDialogVisible: false,
};

const getters = {
  getMenu: (state: any, getters: any) => {
    return state.menu;
  },
  getUserMenu: (state: any, getters: any) => {
    return state.userMenu;
  },
  getMenuLoading: (state: any, getters: any) => {
    return state.menuLoading;
  },
  getTableTabs: (state: any, getters: any) => {
    return state.tableTabs;
  },
  getTableLoading: (state: any, getters: any) => {
    return state.tableLoading;
  },
  getActiveTabData: (state: any, getters: any) => {
    return state.activeTabData;
  },
  getTablePropDialogVisible: (state: any, getters: any) => {
    return state.tablePropDialogVisible;
  },
  getTableDialogLoading: (state: any, getters: any) => {
    return state.tableDialogLoading;
  },
  getTableDictDialogVisible: (state: any, getters: any) => {
    return state.tableDictDialogVisible;
  },
  getTableExportDialogVisible: (state: any, getters: any) => {
    return state.tableExportDialogVisible;
  },
  getTableDownloadDialogVisible: (state: any, getters: any) => {
    return state.tableDownloadDialogVisible;
  },
  getTableSortDialogVisible: (state: any, getters: any) => {
    return state.tableSortDialogVisible;
  },
  getTableFilterDialogVisible: (state: any, getters: any) => {
    return state.tableFilterDialogVisible;
  },
  getTableAnalyseDialogVisible: (state: any, getters: any) => {
    return state.tableAnalyseDialogVisible;
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
  setUserMenu: (state: any, payload: any) => {
    state.userMenu = payload.userMenu;
  },
  openTableTab: (state: any, payload: any) => {
    state.tableTabs = [...state.tableTabs, { ...payload, data: {} }];
  },
  setTableLoading: (state: any, payload: any) => {
    state.tableLoading = payload.val;
  },
  setActiveTabData: (state: any, payload: any) => {
    let activeTabData = payload;
    state.tableTabs.some((item: any) => {
      if (item.dictId === payload.dictId) {
        activeTabData = { ...payload, ...item };
        return true;
      }
    });
    console.log('activeTabData', activeTabData);
    state.activeTabData = activeTabData;
  },
  setTabTableData: (state: any, payload: any) => {
    const tableTabs = state.tableTabs.map((item: any) => {
      if (item.dictId === payload.data.dictId) {
        return { ...item, ...payload.data };
      }
      return { data: {}, ...item };
    });
    if (state.activeTabData.dictId === payload.data.dictId) {
      state.activeTabData = { ...state.activeTabData, ...payload.data }
    }
    console.log('tableTabs', tableTabs);
    state.tableTabs = tableTabs;
  },
  setTableTabTagData: (state: any, payload: any) => {
    const tableTabs = state.tableTabs.map((item: any) => {
      if (item.dictId === payload.data.dictId) {
        return { ...item, tagData: payload.data.data };
      }
      return item;
    });
    if (state.activeTabData.dictId === payload.data.dictId) {
      state.activeTabData.tagData = {
        ...state.activeTabData.tagData,
        ...payload.data.data,
        selected: payload.data.data.accountTerm.map((v: any) => v.termId),
      }
    }
    console.log('tableTabs', tableTabs);
    state.tableTabs = tableTabs;
  },
  removeTabData: (state: any, payload: any) => {
    const tableTabs = state.tableTabs.filter((item: any) => {
      return item.chineseName !== payload;
    });
    console.log('tableTabs', tableTabs);
    state.tableTabs = tableTabs;
  },
  setTablePropDialogVisible: (state: any, payload: any) => {
    state.tablePropDialogVisible = payload.val;
  },
  setTableDictDialogVisible: (state: any, payload: any) => {
    state.tableDictDialogVisible = payload.val;
  },
  setTableExportDialogVisible: (state: any, payload: any) => {
    state.tableExportDialogVisible = payload.val;
  },
  setTableDownloadDialogVisible: (state: any, payload: any) => {
    state.tableDownloadDialogVisible = payload.val;
  },
  setTableSortDialogVisible: (state: any, payload: any) => {
    state.tableSortDialogVisible = payload.val;
  },
  setTableFilterDialogVisible: (state: any, payload: any) => {
    state.tableFilterDialogVisible = payload.val;
  },
  setTableAnalyseDialogVisible: (state: any, payload: any) => {
    state.tableAnalyseDialogVisible = payload.val;
  },
  setTableDialogLoading: (state: any, payload: any) => {
    state.tableDialogLoading = payload.val;
  },
  toggleAddFolderDialog: (state: any, payload: any) => {
    state.addFolderDialogVisible = payload;
  },
  toggleAddTableDialog: (state: any, payload: any) => {
    state.addTableDialogVisible = payload;
  },
};

const actions = {
  
  doTableDictSave: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.post(getUrl('table-dict-save'), paylaod);
    // debugger

    commit('setTableDialogLoading', { val: false });
  },

  doTableFilter: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.post(getUrl('table-filter'), paylaod);
    // debugger


    commit('setTableDialogLoading', { val: false });
  },

  doTableAnalyse: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.post(getUrl('table-analyse'), paylaod);
    // debugger

    commit('setTableDialogLoading', { val: false });
  },

  doTableSort: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.post(getUrl('table-sort'), paylaod);
    // debugger

    commit('setTableDialogLoading', { val: false });
  },

  doTableExport: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.post(getUrl('table-export'), paylaod);

    commit('setTableDialogLoading', { val: false });
  },

  doTableDownload: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.post(getUrl('table-download'), paylaod);
    // debugger
    commit('setTableDialogLoading', { val: false });
  },

  fetchTableTabData: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableLoading', { val: true });
    // const { data: { code, data } } = await axios.get(getUrl('table-data'), { params: { tableEnglishName: 'ACCOUNT_INT_TYPE' || paylaod.englishName, currentPage: 1, pageSize: 999 } });
    const { data: { code, data } } = await axios.get(getUrl('table-data'), { params: { tableEnglishName: paylaod.englishName, currentPage: 1, pageSize: 999 } });
    
    if (code === 200) {
      commit('setTabTableData', { data: { ...paylaod, data } });
    } else {
      // error handle..
    }
    commit('setTableLoading', { val: false });
  },

  fetchTableTabTagData: async ({ commit }: any, paylaod: any = {}) => {
    commit('setTableDialogLoading', { val: true });
    const { data: { code, data } } = await axios.get(getUrl('table-prop'), { params: { tableEnglishName: paylaod.englishName } });
    // debugger
    
    if (code === 200) {
      console.log('data', data);
      commit('setTableTabTagData', { data: { ...paylaod, data } });
    } else {
      // error handle..
    }
    commit('setTableDialogLoading', { val: false });
  },

  fetchFirstMenu: async ({ commit }: any, paylaod: any = {}) => {
    commit('setMenuLoading', { val: true });
    const { data: { code, data } } = await axios.get(getUrl('table-first-menu'), {});
    
    if (code === 200) {
      const { data: menuData } = await axios.get(getUrl('table-sec-menus'), { params: { menuEnglishName: data.firstMenuList[0].englishName } });
      console.log(menuData);
      const { code: code1, data: data1 } = menuData;
      const menu = data1.accountList.filter((v: any) => v.englishName !== 'User Create Accounts');
      const userMenu = data1.accountList.filter((v: any) => v.englishName == 'User Create Accounts');
      commit('setMenu', { menu });
      commit('setUserMenu', { userMenu });
    } else {
      // error handle..
    }
    commit('setMenuLoading', { val: false });
  },

  searchMenu: async ({ commit }: any, paylaod: any = {}) => {
    commit('setMenuLoading', { val: true });
    const { data: menuData } = await axios.get(getUrl('table-sec-menus'), { params: { tableChineseName: paylaod } });
    const { code: code1, data: data1 } = menuData;
    if (code1 === 200) {
      const menu = data1.accountList.filter((v: any) => v.englishName !== 'User Create Accounts');
      const userMenu = data1.accountList.filter((v: any) => v.englishName == 'User Create Accounts');
      commit('setMenu', { menu });
      commit('setUserMenu', { userMenu });
    }
    commit('setMenuLoading', { val: false });
  },

  saveNewMenu: async ({ commit }: any, paylaod: any = {}) => {
    commit('setMenuLoading', { val: true });
    // table-menu-new
    const { data: { code, data } } = await axios.get(getUrl('table-menu-new'), { params: paylaod });
    commit('setMenuLoading', { val: false });
    if (code !== 200) {
      throw data;
    }
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