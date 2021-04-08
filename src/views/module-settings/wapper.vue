<template>
<el-main>
    <div style="display: flex; flex-wrap: nowrap;">
        <div style="flex-grow: 0; flex-shrink: 0; max-width: 374.2px; overflow:auto;">
            <ModulesMenu></ModulesMenu>
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
            <ModuleSettings/>
        </div>
    </div>
</el-main>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import ModuleSettings from './index.vue';
import TablesMenu from "@/components/TablesMenu/index.vue";
import ModulesMenu from '@/components/ModulesMenu/index.vue';
@Component({
    components:{
        TablesMenu,
        ModuleSettings,
        ModulesMenu
    }
})
export default class WapperTables extends Vue{

    get path() {
        const path = `/${this.$route.path.split('/')[1]}`;
        return String(path);
    }

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