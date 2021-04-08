<template>
  <el-dialog title="账表选择" :visible.sync="isVisible">
    <div>
      <el-row class="mb-s">
        <el-col :span="24">
          <!-- <el-input placeholder="输入关键字进行过滤" v-model="searchTxt"></el-input> -->
          <span>查询账表：</span><el-autocomplete placeholder="请输入账表名字" v-model="searchTxt" :fetch-suggestions="querySearch" @select="handleSelect" :trigger-on-focus="false"></el-autocomplete>
        </el-col>
      </el-row>
      <el-row class="module-select-dialog-container">
        <el-col :span="24">
          <el-tree
            :data="data"
            :props="props"
            :default-expanded-keys="expanedList"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            lazy
            :load="loadNode"
            @check="check"
            @check-change="checkChange"
            >
          </el-tree>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
import {findIndex} from 'lodash';
import getUrl from '@/util/url';
import qs from 'qs';
const moduleDialogMenu = namespace('moduleDialogMenu');
interface selectItem  {
  id:string
  label:string
  isLeaf:boolean// 是否是子节点 true是子节点false为 目录
}

//选中的 需要提供账表名称以及id值
@Component({

})
export default class ModuleSelectDialog extends Vue{
    @Prop() dialogFormVisible!:boolean;
    @Prop() selected!:any;
    @Prop() isSingle!:boolean;
    private searchTxt:string='';
    //展开的key
    private expanedList:string[] = []
    private searchData:{
      label: string, 
      tableEnglishName: string
    }[]|null = null;

    private currentSelectedKeys:string='';


    private data:any = [];

    private props:any = {
      isLeaf:'isLeaf',
      label:'label',
      children:'children'
    };

    @moduleDialogMenu.Getter('menuRootData') menuRootData!:any;
    
    @Watch('selected') 
    onSelectedChanged(newVal:any,oldVal:any){
      if(newVal && this.$refs.tree){
        (this.$refs.tree as any).setCheckedKeys([...newVal]);
      }

      if(this.isSingle && newVal && newVal.length > 0 ){
        this.currentSelectedKeys = newVal[0];
      }


    }

    querySearch(queryString:string, cb:Function){
      (this as any).axios.post(getUrl('table-sec-menus'),qs.stringify({
        tableChineseName:queryString
      })).then(({data}:any) => {
        console.log(data);
        let result = [];
        for(let i = 0; i<data.data.accountList.length; i ++){
          result.push({
            value:data.data.accountList[i].chineseName,
            data:data.data.accountList[i]
          });
        }
        cb(result);
      }).catch((err:any) => {
        console.log(err.stack);
      });
    }

    handleSelect({data}:{value:string,data:any}){
      // // debugger;
      let inputVal = data.englishName;
      //模糊查询选中的数据
      // this.searchData = {
      //   label:data.chineseName,
      //   tableEnglishName:data.englishName
      // };
      if(this.isSingle){
        // Vue.set(this,'searchData',[]);
        this.searchData = [{
          label:data.chineseName,
          tableEnglishName:data.englishName
        }];
      }else{
        //排重复工作
        if(this.searchData){
          let isInSearchData = false;
          for(let i = 0; i<this.searchData.length;i++){
            if(this.searchData[i].tableEnglishName == data.englishName){
              isInSearchData = true;
            }
          }
          if(!isInSearchData){
            this.searchData.push({
              label:data.chineseName,
              tableEnglishName:data.englishName
            });
          }
        }else{
          this.searchData = [{
            label:data.chineseName,
            tableEnglishName:data.englishName
          }];
        }
      }

      let selectedList = (this.$refs.tree as any).getCheckedNodes();

      if(this.isSingle){
        (this.$refs.tree as any).setCheckedKeys([inputVal]);
      }else{
        let tmpList:string[] = [];
        for(let i = 0; i<selectedList.length; i++){
          tmpList.push(selectedList[i].tableEnglishName);
        }
        //排重复 
        for(let i = 0; i< this.searchData.length; i++){
          let isAppend = true;
          for(let j = 0; j<selectedList.length; j++){
            if(this.searchData[i].tableEnglishName === selectedList[j]){
              isAppend = false;
              continue;
            }
          }
          if(isAppend){
            tmpList.push(this.searchData[i].tableEnglishName);
          }
        }
        console.log(tmpList);
        
        // // debugger;
        //TODO: tmpList 需要更改为string[]
        (this.$refs.tree as any).setCheckedKeys(tmpList);
      }
      
      
    }


    get isVisible(){

      if(this.dialogFormVisible && this.selected){
        this.searchTxt = '';
        this.searchData = null;
        this.expanedList = [];
        this.$nextTick(()=>{
          (this.$refs.tree as any).setCheckedKeys(this.selected);
        });
      }

      return this.dialogFormVisible;
    }

    set isVisible(val:boolean){
      this.$emit('changeVisible',val);
    }



    commit(){
      console.log((this.$refs.tree as any).getCheckedNodes());
      this.isVisible = false;
      this.$emit('onVal',(this.$refs.tree as any).getCheckedNodes(),this.searchData);
    }

    cancle(){
      // 取消 选中数据
      (this.$refs.tree as any).setCheckedKeys([]);
      this.isVisible = false;
    }


    loadNode(node:any,resolve:any){
      console.log('loading...... nodes.........');
      if(node.level === 0){
        let result:any = [];
        if(this.isSingle){
          this.menuRootData.forEach((item:any) => {
            result.push({
              ...item,
              disabled:true
            });
          });
          resolve(result);
        }else{
          resolve(this.menuRootData);
        }
        return;
      }
      (this as any).axios.get(getUrl('table-sec-menus'),{
        params:{
          menuEnglishName:node.data.tableEnglishName
        }
      } as any).then(({data}:any)=>{
        let result:any[] = [];
        data.data.accountList.forEach((item:any)=>{
          if(item.dictType > 1){
            result.push({
              // id:item.dictId,
              id:item.englishName,
              label:item.chineseName,
              tableEnglishName:item.englishName,
              isLeaf:true
            });
          }else{
            // 1的为文件夹
            if(this.isSingle){
              result.push({
                // id:item.dictId,
                id:item.englishName,
                label:item.chineseName,
                tableEnglishName:item.englishName,
                isLeaf:false,
                disabled:true
              });
            }else{
              result.push({
                // id:item.dictId,
                id:item.englishName,
                label:item.chineseName,
                tableEnglishName:item.englishName,
                isLeaf:false,
              });
            }
          }
        });
        resolve(result);
      });
    }

    check(node:any,opt:any){
      console.log(node);
      console.log(opt);
      let id = node.id;//当前选中的id
      //清除重复的内容。
      if(this.searchData && this.searchData.length > 0){
        let index = findIndex(this.searchData,(item)=>{
          return item.tableEnglishName === node.id;
        });
        if(index != -1){
          let result = this.searchData.splice(index,1);
          if(result[0].label === this.searchTxt){
            this.searchTxt = '';
          }
        }
      }


      if(!this.isSingle && !node.isLeaf){
        // 多选选中的 目录 展开为了拿到叶子结点的数据。
        this.expanedList = [node.id];
      }

      

      if(!this.isSingle){
        //上面的代码为非单选，下方的均为单选操作
        return ;
      }
      //直接清空
      this.searchData = null;
      this.searchTxt = '';

      // 单选
      // 当没有选项的时候 并且，不是选中的文件夹
      if(opt.checkedKeys.length == 0 && node.isLeaf){
        this.currentSelectedKeys = node.id;
        return;
      }
      //选中的文件夹 进行处理
      if(!node.isLeaf){
        (this.$refs.tree as any).setCheckedKeys([this.currentSelectedKeys]);
      }

      if(node.isLeaf && opt.checkedKeys.length > 0){
        (this.$refs.tree as any).setCheckedKeys([]);
        //大于1个 代表多选了， 将上次的内容取消选择
        (this.$refs.tree as any).setCheckedKeys([node.id]);
        this.currentSelectedKeys = node.id;
      }

      if(node.isLeaf && opt.checkedKeys.length == 0){
        //取消了选择
        this.currentSelectedKeys = '';
      }

    }
    checkChange(node:any,isSelected:boolean){
      if(node.isLeaf && !isSelected && this.searchData && this.searchData.length > 0){
        // 取消选择
        // console.log(node);
        let index = findIndex(this.searchData,(item:any)=>{
          return item.tableEnglishName == node.tableEnglishName
        });
        if(index != -1){
          this.searchData.splice(index,1);
        }
      }
    }
}
</script>

<style lang="scss">
.module-select-dialog-container{
  max-height: 370px;
  overflow-y: auto;
}
</style>
