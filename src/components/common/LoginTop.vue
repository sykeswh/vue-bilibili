<template>
  <header class="LoginTop">
    <slot name="left"></slot>
    <div>{{title}}</div>
    <slot name="right" class="right"></slot>
  </header>
</template>

<script>
export default {
  props:{
    title:String
  }
}
</script>

<style lang="less">
  .LoginTop{
    height: 12.5vw;
    padding: 0 3.333vw;
    background-color:white;
    display: flex;
    div{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4.444vw;
      &.right{
        justify-content:flex-end;
      }
    }
  }
</style>