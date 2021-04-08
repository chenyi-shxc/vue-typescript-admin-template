<template>
  <el-dialog title="调用模块列表选择" :visible.sync="isShow">
      <div class="mb-b">
          <span>请输入模块名称：</span>
          <el-autocomplete 
            v-model="searchTxt"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
      </div>
    <div style="max-height:370px;overflow:auto;">
        <el-tree 
            :data="data"
            :props="props"
            node-key="modelId"
            show-checkbox
            ref="tree"
            highlight-current
            @check-change="checkChange"
            lazy
            :default-checked-keys="selected"
            :load="loadNode">
        </el-tree>
    </div>
    
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import getUrl from '@/util/url';
import {findIndex} from 'lodash';
@Component({

})
export default class Dialog extends Vue{
    @Prop() dialogFormVisible!:boolean;
    @Prop() selected!:any;
    private searchTxt:string = '';
    private searchList:any[] = [];
    private data:any = [];
    private props:any = {
      isLeaf:'isLeaf',
      label:'modelName',
      children:'children'
    };
    get isShow(){

        if(!this.dialogFormVisible && this.$refs.tree){
            this.searchList = [];
            this.searchTxt = '';
            (this.$refs.tree as any).setCheckedKeys(this.selected);
        }

        return this.dialogFormVisible;
    }
    //接口参数的名字
    querySearchAsync(queryString:string, cb:(args:any)=>void){
        (this as any).axios.get(getUrl('module-menu'),{
            params:{
                modelName:this.searchTxt
            }
        }).then(({data}:any)=>{
            console.log(data);
            if(data.data && data.data.modelList && data.data.modelList.length > 0){
                let result = [];
                for(let i = 0; i< data.data.modelList.length; i++){
                    let item = data.data.modelList[i];
                    let isLeaf;
                    if(item.modelType == 'dir'){
                        isLeaf = false;
                    }else {
                        isLeaf = true;
                    }
                    result.push({
                        modelId:item.modelId,
                        modelNo:item.modelNo,
                        modelParentId:item.modelParentId,
                        modelName:item.modelName,
                        modelType:item.modelType,
                        value:item.modelName,
                        isLeaf
                    });
                }
                cb(result);
            }else{
                cb([]);
            }
        });
    }

    handleSelect(item:any){
        // console.log(item);
        let nodes = (this.$refs.tree as any).getCheckedNodes(true,false);
        // console.log(nodes);
        let index = findIndex(nodes,(_item:any)=>{
            return _item.modelId === item.modelId;
        });
        if(index == -1){
            let result = nodes.map((_item:any)=>{
                return _item.modelId;
            });
            result.push(item.modelId);
            (this.$refs.tree as any).setCheckedKeys(result);
            // 没有命中再加入到这里
            let index2 = findIndex(this.searchList,(_item:any)=>{
                return _item.modelId === item.modelId
            });
            if(index2 == -1){
                this.searchList.push(item);
            }
        }
        
    }


    set isShow(val:boolean){
        this.$emit('changeDialogVisable',val);
    }

    loadNode(node:any,resolve:any){
        let params;
        if(node.level === 0){
            params = {
                modelParentId:-1
            };
        }else{
            params = {
                modelParentId:node.data.modelId
            };
            console.log(params);
        }
        (this as any).axios.get(getUrl('module-menu'),{
            params:params
        }).then(({data}:any)=>{
            // console.log(data);
            if(data.data && data.data.modelList && data.data.modelList.length > 0){
                let result = [];
                for(let i = 0; i< data.data.modelList.length; i++){
                    let item = data.data.modelList[i];
                    let isLeaf;
                    if(item.modelType == 'dir'){
                        isLeaf = false;
                    }else {
                        isLeaf = true;
                    }
                    result.push({
                        modelId:item.modelId,
                        modelNo:item.modelNo,
                        modelParentId:item.modelParentId,
                        modelName:item.modelName,
                        modelType:item.modelType,
                        isLeaf
                    });
                }
                resolve(result);
            }else{
                resolve([]);
            }
        });
    }

    cancle(){
        this.isShow = false;
        
    }

    commit(){
        //TODO:排除重复
        let checkedNodes = (this.$refs.tree as any).getCheckedNodes(false,true);
        checkedNodes = checkedNodes.reverse();
        let finalResult = [];
        for(let i = 0; i<checkedNodes.length; i++){
            let result = [];
            let item = checkedNodes[i];//当前选中的对象
            if(!item.isLeaf){
                continue;
            }
            // result.push(item);
            result.push({
                modelId:item.modelId,
                modelNo:item.modelNo,
                modelParentId:item.modelParentId,
                modelName:item.modelName,
                modelType:item.modelType,
            });
            while(item){
                let isBreak = true;
                for(let j = 0; j < checkedNodes.length; j ++){
                    if(item.modelParentId == checkedNodes[j].modelId){
                        result.push({
                            modelId:checkedNodes[j].modelId,
                            modelNo:item.modelNo,
                            modelParentId:checkedNodes[j].modelParentId,
                            modelName:checkedNodes[j].modelName,
                            modelType:checkedNodes[j].modelType,
                        });
                        item = checkedNodes[j];
                        isBreak = false; 
                        // 找到了 继续下次查找。 没有找到，代表找到头了， 应该整体退出循环了
                        break;
                    }
                }

                if(isBreak){
                    break;
                }
            }
            finalResult.push(result);
        }

        console.log('模型选择dialog的提交内容:',finalResult);
        // console.log(this.searchList); 
        for(let i = 0; i<this.searchList.length ; i ++){
            finalResult.push([
                {
                    modelId: this.searchList[i].modelId,
                    modelNo: this.searchList[i].modelNo,
                    modelParentId: this.searchList[i].modelParentId,
                    modelName: this.searchList[i].modelName,
                    modelType: this.searchList[i].modelType
                }
            ]);
        }   
        this.$emit('submit',finalResult);
        this.isShow = false;
    }

    checkChange(node:any,isSelected:boolean,isSelectedChildTree:boolean){
        // console.log(node);
        // console.log(isSelected,';',isSelectedChildTree);
        if(node.isLeaf && isSelected){
            // 子节点 选中
        }else if(node.isLeaf && !isSelected){
            // 子节点 取消选中 searchList 中是否也有同样的数据 有就删除掉他
            let index = findIndex(this.searchList,(item)=>{
                return item.modelID === node.modelID;
            });
            if(index != -1){
                //删除选中的操作
                this.searchList.splice(index,1);
            }

        }
    }

}

</script>

<style lang="scss">

</style>