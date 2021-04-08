import Vue from 'vue'
import Vuex from 'vuex'
// import { IAppState } from './modules/app'
// import { IUserState } from './modules/user'

import app from '@/store/modules/app'
import user from '@/store/modules/user'
import tagsView from '@/store/modules/tagsView'
import permission from '@/store/modules/permission'
import settings from '@/store/modules/settings'
import getters from '@/store/getters'

import module from './module/module';
import moduleMenu from './module/module-menu';
import table from './table/table';
import moduleDialogMenu from './module/dialog-menu';
import moduleInfo from './module-info/module-info';
import func from "./module/func";
import tableResult from './module-result/result';
import modelCard from './module/model-card';
import mainMenu from './main-menu/index';

Vue.use(Vuex)

export interface IRootState {
  // app: IAppState
  // user: IUserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  modules: {
    app,
    user,
    tagsView,
    permission,
    settings,

    module,
    moduleMenu,
    table,
    moduleDialogMenu,
    func,
    moduleInfo,
    tableResult,
    modelCard,
    mainMenu
  }, getters

})
