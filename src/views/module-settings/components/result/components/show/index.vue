<template>
  <div>
    <el-row class="mb-b">
        <el-col :span="24">
            <QueryForm/>
        </el-col>
    </el-row>
    <ChartsView/>
    <TableView/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import QueryForm from './query/index.vue';
import ChartsView from './charts/index.vue';
import TableView from './tabel/index.vue';
@Component({
    components:{
        QueryForm,
        ChartsView,
        TableView
    }
})
export default class Show extends Vue{
    //@Prop() activeName!:string;
}
</script>

<style lang="scss">

</style>