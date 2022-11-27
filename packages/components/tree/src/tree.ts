import { ExtractPropTypes, PropType } from 'vue'

export type Key = number | string

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
}

export interface TreeOption {
  key?: Key
  label?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  [key: string]: unknown
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  defaultExpandedKey: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  keyField: {
    type: String,
    default: 'key'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  childrenField: {
    type: String,
    default: 'children'
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    default: false
  }
}

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node
}

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
