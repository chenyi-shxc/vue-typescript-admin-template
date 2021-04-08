<template>
  <el-menu router mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <!-- <el-menu-item index="/home">
          我的工作台
      </el-menu-item> -->
      <!-- <el-menu-item index="/tables">
          账表
      </el-menu-item>
      <el-menu-item index="/module">
          模型
      </el-menu-item> -->
  </el-menu>
</template>

<script lang="ts">
import {Vue, Component,Watch} from 'vue-property-decorator';
@Component({

})
export default class HeadMenu extends Vue{
    // private activeIndex:string = '/home'
}
</script>

<style>

</style>