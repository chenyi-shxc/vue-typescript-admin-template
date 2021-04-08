<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
        <span>模型卡片</span>
        <TopBtn :isEdtor="isEditing" @save="save" @edit="edit" @reset="reset"/>
    </div>
    <div style="line-height:32px;">
        <span v-if="data.length == 0">暂时还没有数据</span>
        <el-tag
            :key="tag"
            v-for="tag in data"
            :closable="isEditing"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputVisible && isEditing"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-show="isEditing" v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
  </el-card>
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
const moduleInfo = namespace('moduleInfo');
import ModuleInfo from '@/model/module-info/info';
import TopBtn from './top-btn.vue';
@Component({
  components:{
    TopBtn
  }
})
export default class CardTag extends Vue{
    //@Prop() activeName!:string;
    private isEditing = false;
    private data:string[] = [];
    private inputValue="";
    private inputVisible=false;
    @moduleInfo.Getter('card') card!:ModuleInfo;
    @moduleInfo.Mutation('updateCardTag') updateCardTag!:any;
    @moduleInfo.Action('saveCardTag') saveCardTag!:any;
    @Watch("card.label")
    onCardLabel(newVal:string){
        if(newVal == ''){
          this.data = [];
        }else{
          this.data = newVal.split(',');
        }
    }

    mounted(){
        if(this.card){
            if(this.card.label == ''){
              this.data = [];
            }else{
              this.data = this.card.label.split(',');
            }
        }
    }
    get modelID(){
      return this.$route.params.modelID;
    }

    save(){
      this.updateCardTag({
        value:this.data
      });
      this.$nextTick(()=>{
        console.log('save....');
        this.saveCardTag({
          value:this.data,
          modelID:this.modelID
        }).then((result:any) => {
          this.isEditing = false;
          this.inputVisible = false;
        }).catch((err:any) => {
          this.isEditing = false;
          this.inputVisible = false;
        });
      });
    }
    edit(){
      this.isEditing = true;
      this.inputVisible = false;
    }
    reset(){
      // 内容还原
      if(this.card){
          if(this.card.label == ''){
            this.data = [];
          }else{
            this.data = this.card.label.split(',');
          }
      }
    }

    showInput(){
      this.inputValue = '';
      this.inputVisible = true;
        this.$nextTick(() => {
          (this.$refs.saveTagInput as any).$refs.input.focus();
        });
    }

    handleInputConfirm(){
       let inputValue = this.inputValue;
        if (inputValue) {
          this.data.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
    }

    handleClose(tag:string){
      this.data.splice(this.data.indexOf(tag), 1);
    }
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>