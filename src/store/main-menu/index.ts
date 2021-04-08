type State = {
    isOpen:boolean
    activeMenu:string
}

const state = {
    isOpen:true,
    activeMenu:''
}

const getters = {
    activeMenu(state:State){
        return state.activeMenu;
    },
    isOpen(state:State){
        return state.isOpen;
    }
};

const mutations = {
    changeOpenState(state:State,payload:any){
        state.isOpen = !state.isOpen;
    }
};



export default {
    namespaced: true,
    state,
    getters,
    mutations
}