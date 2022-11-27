import { withInstall } from '@zy-plus/utils/with-install'
import _Tree from './src/tree.vue'

const Tree = withInstall(_Tree)

export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree
  }
}
