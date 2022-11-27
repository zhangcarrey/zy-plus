<template>
  <div :class="bem.b()">
    <z-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :style="{ paddingLeft: `${node.level * 16}px` }"
      @toggle="toggleExpand"
    ></z-tree-node>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@zy-plus/utils/create'
import { ref, watch, computed } from 'vue'
import { TreeOption, treeProps, TreeNode, Key } from './tree'
import ZTreeNode from './treeNode.vue'
defineOptions({
  name: 'z-tree'
})

const bem = createNamespace('tree')

const props = defineProps(treeProps)

function createTreeOptions(
  keyField: string,
  labelField: string,
  childrenField: string
) {
  return {
    getKey(node: TreeOption) {
      return node[keyField] as string
    },
    getLabel(node: TreeOption) {
      return node[labelField] as string
    },
    getChildren(node: TreeOption) {
      return node[childrenField] as string
    }
  }
}

const treeOptions = createTreeOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)

function createTree(data: TreeOption[], parentNode: TreeNode | null = null) {
  console.log(data)
  function traversal(
    data: TreeOption[],
    parentNode: TreeNode | null
  ): TreeNode[] {
    return data.map(node => {
      const children = node.children || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        level: parentNode ? parentNode.level + 1 : 0,
        isLeaf: node.isLeaf ?? children.length === 0,
        rawNode: node
      }
      if (children.length) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data, parentNode)
  return result
}

const tree = ref<TreeNode[]>([])

watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
    console.log('data', data)
    console.log('tree.value', tree.value)
  },
  { immediate: true }
)

const expandedKeysSet = ref(new Set(props.defaultExpandedKey))

const flattenTree = computed(() => {
  const flattenNodes: TreeNode[] = []
  const nodes = tree.value || []
  const stack: TreeNode[] = []

  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }

  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeysSet.value.has(node.key)) {
      const children = node.children
      if (children) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i])
        }
      }
    }
  }

  return flattenNodes
})
console.log(flattenTree.value)

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}

function collapse(key: Key) {
  expandedKeysSet.value.delete(key)
}

function expand(key: Key) {
  expandedKeysSet.value.add(key)
}

function toggleExpand(node: TreeNode) {
  if (expandedKeysSet.value.has(node.key)) {
    collapse(node.key)
  } else {
    expand(node.key)
  }
}
</script>

<style lang="scss" scoped></style>
