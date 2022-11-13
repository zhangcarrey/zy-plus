<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import { createNamespace } from '@zy-plus/utils/create'
import { iconProps } from './icon'

// 需要安装插件 pnpm install unplugin-vue-define-options -D -w (因为是安装在工作根目录 所以无所谓在哪个目录下执行)
// vite.config.js 下配置
defineOptions({
  name: 'z-icon'
})
const bem = createNamespace('icon')

const props = defineProps(iconProps)
const style = computed<CSSProperties>(() => {
  if (!props.color && !props.size) {
    return {}
  }
  return {
    ...(props.color ? { color: props.color } : {}),
    ...(props.size ? { 'font-size': `${props.size}px` } : {})
  }
})
</script>

<style lang="scss" scoped></style>
