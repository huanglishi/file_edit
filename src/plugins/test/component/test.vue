<template>
     {{ props.dvalue }}
</template>
<script setup>
const props = defineProps({
  dvalue:String
});
// console.log("组件传参：",props)
</script>
<style lang="less">
.lightblock{
  border: #fed4a4 1px solid;
  background-color: #fff5eb;
  min-height: 150px;
  border-radius: 5px;
  padding: 10px;
}
</style>