<template>
    <el-card :id="'pos-'+item.feId" shadow="hover">
        <div slot="header" class="clearfix">
            <span>步骤{{_index}}：【账表追加】</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            <TemplateTopBtn :index="_index" :moduleId="item.feId" :coll="item.collapse"></TemplateTopBtn>
        </div>
            <el-form label-position="top" @submit.native.prevent>
                <CollapseContainer :collapse="item.collapse">
                    <!-- <ModuleTagItem :module="item" labelName="目标账本：" maxLen="1" fieldKey="targetTable" :feId="item.feId"></ModuleTagItem> -->
                    <ModuleSelect :item="item" labelName="目标账本：" fieldKey="targetTable" :feId="item.feId" :isSingle="true"></ModuleSelect>
                    <!-- <ModuleTagItem :module="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId"></ModuleTagItem> -->
                    <ModuleSelect :item="item" labelName="源账本：" fieldKey="resourceTable" :feId="item.feId" :isSingle="false"></ModuleSelect>
                </CollapseContainer>
                <EditorTextArea :item="item" labelName="备注：" fieldKey="desc"></EditorTextArea>
            </el-form>
    </el-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {moduleDefine} from '@/util/const';
import ModuleSelect from '../module-select/index.vue';
import TemplateTopBtn from '../common/template-top-btn.vue';
import EditorTextArea from '../common/editor-text-area.vue';
import CollapseContainer from '@/components/collapse-container/index.vue';

// 帐表追加
@Component({
    components:{
        ModuleSelect,
        TemplateTopBtn,
        EditorTextArea,
        CollapseContainer
    }
})
export default class AppendTemplate extends Vue{
    private templateType:string = moduleDefine.TABLE_APPEND;
    @Prop() item!:string;
    @Prop() index!:number;
    get _index (){
      return this.index + 1;
    }
}
</script>

<style lang="scss">

</style>
