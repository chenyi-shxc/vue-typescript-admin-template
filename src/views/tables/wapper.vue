<template>
<el-main>
    <div style="display: flex; flex-wrap: nowrap;">
        <div style="flex: 0 0 auto; -webkit-box-flex: 0; max-width: 374.2px; overflow: auto;">
            <TablesMenu></TablesMenu>
            <!-- <el-tabs :value="path" @tab-click="handleTabChange">
                <el-tab-pane label="账表" name="/tables" >
                    <TablesMenu></TablesMenu>
                </el-tab-pane>
                <el-tab-pane label="模型" name="/module">
                    <ModulesMenu></ModulesMenu>
                </el-tab-pane>
            </el-tabs> -->
        </div>
        <div style="flex: 1; -webkit-box-flex: 1; overflow: auto; margin-left: 8px;">
            <TablesView/>
        </div>
    </div>
</el-main>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import TablesView from './index.vue';
import TablesMenu from "@/components/TablesMenu/index.vue";
// import ModulesMenu from '@/components/ModulesMenu/index.vue';
@Component({
    components:{
        TablesView,
        TablesMenu,
        // ModulesMenu
    }
})
export default class WapperTables extends Vue{
    /** 拆分路由参数 */
    get path() {
        const path = `/${this.$route.path.split('/')[1]}`;
        return path;
    }
    /** 处理页签切换 */
    handleTabChange(tab: any, event: any) {
        this.$router.push({ path: tab.name })
    }
}
</script>

<style lang="scss">
.el-main {
    padding: 4px;
}
</style>