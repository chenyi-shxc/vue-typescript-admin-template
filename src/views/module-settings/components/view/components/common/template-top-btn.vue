<template>
  <div class="btns">
      
      <el-button class="card-head-button" type="text" @click="add" >增加</el-button>
      <el-button class="card-head-button" type="text" @click="delModule({moduleId:moduleId})" >删除</el-button>
      <el-button class="card-head-button" v-show="isShowUpBtn" type="text" @click="changeModulePos({moduleId:moduleId,dir:'up'})" >向上</el-button>
      <el-button class="card-head-button" v-show="isShowDownBtn" type="text" @click="changeModulePos({moduleId:moduleId,dir:'down'})" >向下</el-button>
      <el-switch class="card-head-button last"
        v-model="collapse"
        active-text="折叠"
        inactive-text="展开">
      </el-switch>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
@Component({

})
export default class TemplateTopBtn extends Vue{
    //对应的feId的值
    @Prop() moduleId!:string;
    @Prop() index!:number;
    @Prop() coll!:boolean;
    // @Prop() isShowUpBtn!:boolean;
    // @Prop() isShowDownBtn!:boolean;

    @module.Getter('getModuleList') getModuleList!:any;
    @module.Mutation('changeAddPos') changeAddPos!:any;
    @module.Mutation('changeIsShowAddModuleDialog') changeIsShowAddModuleDialog!:any;
    @module.Mutation('changeModulePos') changeModulePos!:any;
    @module.Mutation('delModule') delModule!:any;
    @module.Mutation('updateFieldString') updateFieldString!:any;
    add(){
        //console.log('.........');
        this.changeAddPos({
            moduleId:this.moduleId
        });
        this.changeIsShowAddModuleDialog({
            value:true
        });
    }

    get isShowUpBtn(){
        // console.log(this.index);
        return this.index !== 1;
    }

    get isShowDownBtn(){
        return this.index !== this.getModuleList.length;
    }


    get collapse(){
        return this.coll;
    }

    set collapse(val:boolean){
        this.updateFieldString({
            moduleFeId:this.moduleId,
            fieldKey:'collapse',
            val
        });
    }
}
</script>


<style lang="scss" scoped>
.btns{
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .card-head-button{
        flex: 0 0 auto;
        &.last{
            margin-left: 10px;
        }
    }
}

</style>