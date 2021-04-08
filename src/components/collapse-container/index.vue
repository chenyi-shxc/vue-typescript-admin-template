<template>
  <el-collapse-transition>
      <div class="collapse-container" v-show="!collapse">
            <slot></slot>   
      </div>
  </el-collapse-transition>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class CollapseContainer extends Vue{
    @Prop() collapse!:boolean;
}
</script>

<style lang="scss">
// .collapse-container{
//     padding:20px;
// }
</style>