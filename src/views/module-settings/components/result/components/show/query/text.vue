<template>
  <el-input style="width:220px;" size="small" v-model="val"></el-input>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ShowCondition from '@/model/module-result/show-condition';
@Component({

})
export default class TextField extends Vue{
    //@Prop() activeName!:string;
    @Prop() data!:ShowCondition;

    get val(){
        return this.data.value;
    }

    set val(val:string){
        this.$emit('changeVal',{
            data:this.data,
            val
        });
    }


}
</script>

<style lang="scss">

</style>