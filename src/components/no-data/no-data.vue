<template>
  <div class="no-data">
      <span>{{label || '抱歉，暂时没有数据'}}</span>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component({

})
export default class NoData extends Vue{
    @Prop() label!:string;
}
</script>

<style lang="scss">
.no-data{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    span{
        flex: 1;
        font-size: 12px;
        text-align: center;
        color: rgb(192, 196, 204);
    }
}
</style>