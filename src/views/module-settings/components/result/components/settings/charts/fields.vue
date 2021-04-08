<template>
  <div>
      <el-tag
        style="margin-right:20px;"
        :key="tag.feId"
        v-for="tag in list"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag.fieldChineseName}}
        </el-tag>
        <span v-if="(!isMutli && list && list.length === 0) || isMutli">
            <el-autocomplete
                class="inline-input"
                v-if="inputVisible"
                v-model="inputValue"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                ref="saveTagInput"
                ></el-autocomplete>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">增加</el-button>
        </span>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class ChartFields extends Vue{
    //@Prop() activeName!:string;
    //影响的字段
    @Prop() filedKey!:string;
    //是否是多选
    @Prop() isMutli!:boolean;
    @Prop() list!:{
        fieldChineseName:string,
        fieldEnglishName:string
    }[]

    @Prop() fieldList!:TableField[]

    private inputValue="";

    private inputVisible:boolean = false;


    handleClose(item:any){
        this.$emit('delField',{
            fieldKey:this.filedKey,
            data:item
        });
    }

    handleSelect(item:any){
        this.inputVisible = false;
        this.inputValue = '';
        this.$emit('addField',{
            fieldKey:this.filedKey,
            data:item.data
        });
    }

    querySearch(queryString:string,cb:any){
        let result:{value:string,data:TableField}[] = [];
        if(queryString == '' && this.fieldList && this.fieldList.length > 0){
            for(let i= 0; i<this.fieldList.length;i++){
                result.push({
                    value:this.fieldList[i].fieldChineseName,
                    data:this.fieldList[i]
                });
            }
            cb(result);
            return;
        }
        // // debugger;
        if(this.fieldList && this.fieldList.length > 0){
            for(let i= 0; i<this.fieldList.length;i++){
                if(this.fieldList[i].fieldChineseName.indexOf(queryString) != - 1){
                    result.push({
                        value:this.fieldList[i].fieldChineseName,
                        data:this.fieldList[i]
                    });
                }
            }
            cb(result);
        }else{
            cb([]);
        }
    }

    showInput(){
        this.inputVisible = true;
        this.$nextTick(() => {
          (this.$refs.saveTagInput as any).$refs.input.focus();
        });
    }

}
</script>

<style lang="scss">

</style>