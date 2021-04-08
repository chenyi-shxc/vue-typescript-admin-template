<template>
  <div>
    <Card class="mb-b"/>
    <CardTag class="mb-b"/>
    <History/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Card from './components/card.vue';
import History from './components/history.vue';
import CardTag from './components/tag.vue';
@Component({
  components:{
    Card,
    History,
    CardTag
  }
})
export default class ModuleInfo extends Vue{
    
}
</script>

<style>

</style>