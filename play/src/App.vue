<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@zy-plus/components/icon/index'
import { Alarm } from '@vicons/ionicons5'
import { TreeOption } from '@zy-plus/components/tree/src/tree'
console.log(Icon)

// function createData(level = 4, parentKey = ''): TreeOption[] {
//   if (!level) return []
//   const arr = new Array(6 - level).fill(0)
//   return arr.map((_, idx: number) => {
//     const key = parentKey + level + idx
//     return {
//       label: createLabel(level),
//       key,
//       children: createData(level - 1, key)
//     }
//   })
// }
// function createLabel(level: number): string {
//   if (level === 4) return '道生一'
//   if (level === 3) return '一生二'
//   if (level === 2) return '二生三'
//   if (level === 1) return '三生万物'
//   return ''
// }

function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}
function nextLabel(currentLabel?: string|number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}

function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}

const data = ref<TreeOption[]>(createData())
</script>

<template>
  <z-icon :color="'red'" size="40"><Alarm></Alarm></z-icon>
  <z-icon :color="'yellow'" size="40"><Alarm></Alarm></z-icon>
  <z-tree :data="data" :on-load="handleLoad"></z-tree>
</template>

<style scoped></style>
