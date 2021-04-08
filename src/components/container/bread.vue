<template>
  <div class="bread">
      <i @click="change" :class="name"></i>
      <el-breadcrumb class="in-bread" separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="item of breadList" :key="item.label">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';
const mainMenu = namespace('mainMenu');
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class Bread extends Vue{
    //private name : string = 'el-icon-s-unfold';

    get name(){
        return this.isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    }

    @mainMenu.Getter('isOpen') isOpen!:any;
    @mainMenu.Mutation('changeOpenState') changeOpenState!:any;
    change(){
        this.changeOpenState();
    }

    get breadList(){
        if(this.$route.name== '账表' || this.$route.name=='模型'){
            return [{
                label:'生产要素',
            },{
                label:this.$route.name,
            }];
        }else{
            return [{
                label:'首页',
            }];
        }
    }
}
</script>

<style lang="scss">
.bread{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    // margin-bottom: 20px;
    &>i{
        flex: 0 0 auto;
    }
    .in-bread{
        margin-left: 20px;
        flex: 0 0 auto;
    }
}

</style>