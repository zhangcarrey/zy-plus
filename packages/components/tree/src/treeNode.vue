<template>
  <div :class="bem.b()">
    <div :class="bem.e('content')">
      <span
        :class="[
          bem.e('expand-icon'),
          bem.is('leaf', node?.isLeaf),
          { expanded: expanded && !node?.isLeaf }
        ]"
      >
        <z-icon size="25" color="orange" @click="toggleHandle">
          <switcher></switcher>
        </z-icon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@zy-plus/utils/create'
import { ref } from 'vue'
import { TreeNode, treeNodeEmits, treeNodeProps } from './tree'
import ZIcon from '@zy-plus/components/icon'
import Switcher from './icon/Switcher'

const bem = createNamespace('tree-node')
defineOptions({
  name: 'z-tree'
})

const props = defineProps(treeNodeProps)
const node = ref(props.node)
const emit = defineEmits(treeNodeEmits)
function toggleHandle() {
  emit('toggle', node.value as TreeNode)
}
</script>

<style lang="scss" scoped></style>
