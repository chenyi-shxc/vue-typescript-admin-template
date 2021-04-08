<template>
  <div class="jfr btns">
      <el-button v-if="!isAbleEdit" @click="toEdit" class="card-head-button" type="text">编辑</el-button>
      <el-button v-if="isAbleEdit" @click="reduction" class="card-head-button" type="text">还原</el-button>
      <el-button v-if="isAbleEdit" @click="save" class="card-head-button" type="text">保存</el-button>
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
} from 'vuex-class';
const module = namespace('module');

@Component({

})
export default class ModuleHeadBtns extends Vue{
    //@Prop() activeName!:string;
    @module.Getter('isAbleEdit') isAbleEdit!:boolean;
    @module.Mutation('changeEdit') changeEdit!:any;
    @module.Mutation('reset') reset!:any;
    @module.Action('save') _save!:any;
    @module.Getter('getModuleList') getModuleList!:any;
    @module.Mutation('collapseAll') collapseAll!:any;
    @module.Getter('collaspeAllState') collaspeAllState!:boolean
    get modelID(){
      return this.$route.params.modelID;
    }

    get modelNo(){
      return this.$route.params.modelNo;
    }

    toEdit(){
      this.changeEdit({
        value:true
      });
    }

    reduction(){
      (this as any).$confirm('确定还原吗？你将丢失，现有操作！','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
          this.reset();
          (this as any).$message({
            type: 'success',
            message: '还原成功!'
          });
      }).catch(()=>{
        (this as any).$message({
          type: 'info',
          message: '已取消还原操作'
        }); 
      });
    }

    save(){
      (this as any).$confirm('确定保存吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(()=>{
        return this._save({value:this.getModuleList,modelID:this.modelID, modelNo:this.modelNo});
      }).then((val:boolean)=>{
        if(val){
          (this as any).$message({
            type: 'info',
            message: '保存成功'
          }); 
        }else{
          (this as any).$message({
            type: 'error',
            message: '保存失败'
          }); 
        }
      }).catch(()=>{
        (this as any).$message({
            type: 'error',
            message: '保存失败'
         }); 
      });
    }

    get collapse(){
      return this.collaspeAllState;
    }
    set collapse(val:boolean){
      this.collapseAll({
        val
      });
    }
}
</script>

<style lang="scss">
.btns{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .last{
    margin-left: 10px;
  }
}
</style>