<template>
 <div>
    
 </div>

</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import SvgIcon from '../iconfont/SvgIcon.vue'
  export default defineComponent({
    name: 'moduleSetting',
    components: { 
    SvgIcon,
    },
    props:{
        pluginData:{
            type:Object,
        }
    },
    emits: ['success', 'pointershow','insert'],
    setup(_, { emit }) {
        const activeName = ref<string[]>([])
        return { 
            activeName,
        };
    },
  });
</script>
<style lang="scss" scoped>
@import "./style/moduleSetting.scss";
</style>