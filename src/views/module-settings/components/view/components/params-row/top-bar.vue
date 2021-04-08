<template>
    <ul class="clearfix">
        <li v-if="!isRunning" @click="run" class="jfl" title="运行">
            <el-tooltip class="item" effect="dark" content="模型运行" placement="top">
                <svg t="1584175088011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6370" width="36" height="36"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m-64 141.312a42.666667 42.666667 0 0 1 22.741333 6.570667l176.533334 111.232a42.666667 42.666667 0 0 1 0.32 71.978667l-176.533334 113.429333A42.666667 42.666667 0 0 1 405.333333 621.973333v-224.64a42.666667 42.666667 0 0 1 42.666667-42.666666z m21.333333 81.322667v146.922667l115.456-74.176L469.333333 435.968z" p-id="6371"></path></svg>
            </el-tooltip>
        </li>
        <li v-if="isRunning" @click="stop" class="jfl" title="停止">
            <el-tooltip class="item" effect="dark" content="模型停止" placement="top">
                <svg t="1584175130245" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6493" width="36" height="36"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m0 64c-164.949333 0-298.666667 133.717333-298.666667 298.666667s133.717333 298.666667 298.666667 298.666667 298.666667-133.717333 298.666667-298.666667-133.717333-298.666667-298.666667-298.666667z m64 170.666667a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64h-128a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h128z m0 64h-128v128h128v-128z" p-id="6494"></path></svg>
            </el-tooltip>
        </li>
        <li @click="down" class="jfl">
            <el-tooltip class="item" effect="dark" content="模型下载" placement="top">
                <svg t="1584174942947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6247" width="36" height="36"><path d="M704 341.333333h64a64 64 0 0 1 64 64v362.666667a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V405.333333a64 64 0 0 1 64-64h64v64h-64v362.666667h512V405.333333h-64v-64z m-154.794667-212.266666l0.042667 347.456 74.005333-74.026667 45.226667 45.248-150.826667 150.848-150.848-150.826667 45.248-45.269333 73.173334 73.173333V129.066667h64z" p-id="6248"></path></svg>
            </el-tooltip>
        </li>
    </ul>
</template>

<script lang="ts">
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
const module = namespace('module');
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class TopBar extends Vue{
    @Prop() data!:any;
    @module.Action('runModel') runModel!:any;
    @module.Action('stopModel') stopModel!:any;
    @module.Getter('isRunning') isRunning!:boolean;
    get modelID(){
      return this.$route.params.modelID;
    }

    run(){
        this.runModel({
            value:{
                ...this.data,
                modelID:this.modelID
            }
        }).then((result:any) => {
            (this as any).$message({
                message: '模型开始运行！',
                type: 'success'
            });
        }).catch((err:any) => {
            
        });
    }

    stop(){

        this.stopModel({
            value:{
                modelID:this.modelID
            }
        }).then((result:any) => {
            (this as any).$message({
                message: '模型停止运行！',
                type: 'warning'
            });
        }).catch((err:any) => {
            
        });
    }

    down(){

    }

}
</script>

<style lang="scss">

</style>