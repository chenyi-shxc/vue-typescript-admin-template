//元算符 ， 函数的数据资源
import axios from '@/util/axios';
import getUrl from '@/util/url';
import getId from '@/util/key';
import {findIndex} from 'lodash';
type Item = {
    feId: string,
    name: string,
    sign: string,
    type: string,
    orderNum: number,
    textFieldShow: string //选中后 在textarea中的显示值
}

type ShowFunc = {
    label:string,
    funcType:string,
    list:Item[]
}

type State = {
    func: ShowFunc[],
    operation: Item[]
}

const state: State = {
    // 根tabels的 文件目录
    func: [],
    operation: []
};


const getters = {
    func(state:State){
        return state.func;
    },
    operation(state:State){
        return state.operation;
    }
};

function getTextAreaShowVal(sign:string,val:string):string{
    let array = sign.split('');
    array.splice(1,0,val);
    return array.join('');
}


function getFuncLabel(val:string){
    let _val = val.toLocaleLowerCase();
    switch (_val) {
        case 'v':
            return '字符函数'
        case 'i':
            return '数字函数'
        case 'd':
            return '日期函数'
        case 'p':
            return '转换函数'
        case 'o':
            return '其他单行函数'
        case 'c':
            return '聚合函数'
        default:
            return '其他';
    }
}


const mutations = {
    init(state: State, payload: any){
        state.func = [];
        state.operation = [];
        let func: ShowFunc[] = [];
        let operation: Item[] = [];
        let {val} = payload;
        val.forEach((element:any) => {
            if (element.type.toLowerCase() == 'function'){
                let index = findIndex(func,(funcItem)=>{
                    return funcItem.funcType == element.funcType
                });
                
                if(index == -1){
                    // 没有找到
                    func.push({
                        label: getFuncLabel(element.funcType),
                        funcType: element.funcType,
                        list: [{
                            feId:getId(),
                            name: element.name,
                            sign: element.sign,
                            type: element.type.toUpperCase(),
                            orderNum: element.orderNum,
                            textFieldShow: getTextAreaShowVal(element.sign,element.name)
                        }]
                    });
                }else{
                    func[index].list.push({
                        feId: getId(),
                        name: element.name,
                        sign: element.sign,
                        type: element.type.toUpperCase(),
                        orderNum: element.orderNum,
                        textFieldShow: getTextAreaShowVal(element.sign, element.name)
                    });
                }
            } else {
                operation.push({
                    feId: getId(),
                    name: element.code,
                    sign: element.sign,
                    type: element.type.toUpperCase(),
                    orderNum: element.orderNum,
                    textFieldShow: getTextAreaShowVal(element.sign, element.name)
                });
            }
        });

        for(var i = 0;i<func.length; i++){
            func[i].list = func[i].list.sort((a:Item,b:Item)=>{
                return a.orderNum - b.orderNum;
            });
        }

        operation = operation.sort((a: Item, b: Item) => {
            return a.orderNum - b.orderNum;
        });

        state.func = func;
        state.operation = operation;
    }
};

const actions = {
    init: async ({ commit }: any, paylaod: any)=>{

        let result = await axios.get(getUrl('schema'),{});
        commit('init',{
            val:result.data.data
        });
    }   
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}