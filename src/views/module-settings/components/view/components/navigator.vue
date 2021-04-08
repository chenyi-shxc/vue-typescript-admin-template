<template>
  <div ref="container" :style="style">
    <el-card shadow="hover">
        <div slot="header" class="clearfix">模型导航</div>
        <el-row :key="item.elementId" v-for="item in data">
            <el-col :span="4"><p class="h30">{{item.number}}</p></el-col>
            <el-col :span="20"><p class="h30"><el-button @click="goTo(item.elementId)" size="small" type="text">【{{item.label}}】</el-button></p></el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
import {moduleDefine} from '@/util/const';
//矛点定位
@Component({

})
export default class Navgator extends Vue{
    //@Prop() activeName!:string;
    @State(state => state.module.moduleList) moduleList:any;
    private data:{number:string|number,label:string,elementId:string}[] = [];
    private location:{x:number,y:number,width:number} = {x:0,y:0,width:0};
    private style:string='';
    private _scroll!:any;
    // @Prop() moduleList !:any;
    @Watch('moduleList',{deep:true})
    onModuleList(newVal:any,oldVal:any){
        this.initData(newVal);
        // console.log(newVal);
        // console.log('change....');
    }
    mounted(){
        this.initData(this.moduleList);
        // console.log(this.moduleList);
        if(this.$refs.container){
            let pos = (this as any).$refs.container.getBoundingClientRect();
            this.location.x = pos.left;
            this.location.y = pos.top + document.documentElement.scrollTop + document.body.scrollTop;
            this.location.width = pos.width;
        }
        let _self = this;
        this._scroll = function(){
            let top = document.documentElement.scrollTop + document.body.scrollTop + 30;
            if(_self.location.y<top){
                _self.style = `position:fixed;top:80px;width:${_self.location.width}px;z-index:10;`;
                // _self.style = `position:fixed;top:80px;z-index:10;`;
            }else{
                _self.style = ''
                if((this as any).$refs && (this as any).$refs.container){
                    let pos = (this as any).$refs.container.getBoundingClientRect();
                    this.location.x = pos.left;
                    this.location.y = pos.top + document.documentElement.scrollTop + document.body.scrollTop;
                    this.location.width = pos.width;
                }
                
            }
        }
        window.addEventListener('scroll',this._scroll,false);
    }
    initData(list:any){
        let result:{number:string|number,label:string,elementId:string}[] = [];
        list && list.length > 0 && list.forEach((item:any,index:number) => {
            let label = '';
            switch (item.moduleType) {
                case moduleDefine.TABLE_QUERY:
                    label = '帐表查询'
                    break;
                case moduleDefine.TABLE_CREATE:
                    label= "新建帐表";
                    break;
                case moduleDefine.TABLE_DROP:
                    label = "删除帐表";
                    break;
                case moduleDefine.TABLE_APPEND:
                    label = '帐表追加';
                    break;
                case moduleDefine.TABLE_COMPARE:
                    label = '帐表比较';
                    break;
                case moduleDefine.DATA_INSERT:
                    label = '数据插入';
                    break;
                case moduleDefine.DATA_UPDATE:
                    label = '数据修改';
                    break;

                case moduleDefine.DATA_DELETE:
                    label = '数据删除';
                    break;

                case moduleDefine.VARIABLE_DEFINE:
                    label = '变量定义';
                    break;
                case moduleDefine.VARIABLE_ASSIGNMENT:
                    label = '变量赋值';
                    break;
                case moduleDefine.CONDITION_JUDGE:
                    label = '条件判断';
                    break;
                
                case moduleDefine.CYCLE_RUN:
                    label = '循环运行';
                case moduleDefine.CYCLE_BREAK:
                    label = '循环中断';
                    break;
                case moduleDefine.MODULE_CALL:
                    label = '模块调用';
                    break;
            }
            result.push({
                number:index + 1,
                label,
                elementId:item.feId
            });
        });
        this.data = result;
    }
    goTo(elementId:string){
        //location.href = location.href + '#pos-self' + elementId;
        let id = 'pos-' + elementId;
        // 后边自己滚动到位置上去
        let el = document.getElementById(id);
        if(!el){
            return;
        }
        console.log(el);
        window.scroll(0,el.getBoundingClientRect().top + document.documentElement.scrollTop + document.body.scrollTop - 70);
    }
    beforeDestroy(){
        // console.log('unmounted...');
        window.removeEventListener('scroll',this._scroll,false);
    }
}
</script>

<style lang="scss" scope>
.h30{
    height: 32px;
    line-height: 32px;
    font-size: 12px;
}
</style>