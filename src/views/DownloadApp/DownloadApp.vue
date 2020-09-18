<template>
  <div class="main">
    <img class="download_1" src="./image/download_1.png" alt="">
    <img class="download_2" src="./image/download_2.png" alt="">
    <img class="download_3" src="./image/download_3.png" alt="">
    <img class="download_4" src="./image/download_4.png" alt="">
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
  .main{
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    background: url(./image/bg.png);
    background-size: 100% 100%;
    .download_1{
      position: absolute;
      width: 4.26667rem;
      bottom: 0;
      left: 0;
      border: 0;
    }
    .download_2{
      position: absolute;
      width: 3.2rem;
      right: 0;
      top: 0;
    }
    .download_3{
      position: relative;
      height: 1.28rem;
      width: 5.33333rem;
      margin-top: -2.13333rem;
    }
    .download_4{
      margin-top: .8rem;
      position: relative;
      width: 7.2rem;
      height: 1.33333rem;
    }
  }
</style>