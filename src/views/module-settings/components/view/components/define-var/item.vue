<template>
  <div class="mb-s">
      <el-row :gutter="20">
          <el-col :span="6">
              <el-input v-model="name" placeholder="请输入变量名称"></el-input>
          </el-col>
          <el-col :span="8">
            <el-select v-model="type" placeholder="请选择类型">
                <el-option :key="item.value" :value="item.value" :label="item.label"  v-for="item in typeOptions"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
              <el-input v-model="value" placeholder="请输入变量初始值"></el-input>
          </el-col>
          <el-col :span="4">
              <el-button @click="del" type="text">删除</el-button>  
          </el-col>
      </el-row>
      
  </div>
</template>

<script lang="ts">

type VarItem = {
    name:string,
    type:string,
    val:any,
    id:string
}
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class Item extends Vue{
    //@Prop() activeName!:string;
    @Prop() item!:VarItem;

    private typeOptions = [
        {
            value:'字符型',
        },{
            value:'整型'
        },{
            value:'集合型'
        },{
            value:'名称型'
        },{
            value:'数组'
        },{
            value:'记录集'
        },{
            value:'EXCEL 表'
        }
    ];

    get name(){
        return this.item.name;
    }
    set name(val){
        this.$emit('changeName',this.item,val);
    }

    get value(){
        return this.item.val;
    }
    set value(val){
        this.$emit('changeVal',this.item,val);
    }

    get type(){
        return this.item.type;
    }

    set type(val:string){
        this.$emit('changeType',this.item,val);
    }

    del(){
        this.$emit('del',this.item);
    }
};
export {VarItem};
</script>

