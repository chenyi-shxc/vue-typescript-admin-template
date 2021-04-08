<template>
  <el-form-item :label="label">
      <slot></slot>
  </el-form-item>
</template>

<script lang="ts">
import ShowCondition from '@/model/module-result/show-condition';
import {Vue, Component, Prop} from 'vue-property-decorator';
import {operFun} from '@/util/const';
@Component({

})
export default class Label extends Vue{
    @Prop() data!: ShowCondition;
    get label() {
        let opsName = '';
        this.ops.forEach((item)=>{
            if(item.key === this.data.operaFun){
                opsName = item.name;
            }
        });
        let label = this.data.chineseFieldName || this.data.columnCnName + opsName + ':';
        return label;
    }

    private ops = [...operFun];
}
</script>

<style lang="scss">

</style>