import { Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(com: T) {
  ;(com as SFCWithInstall<T>).install = function (app) {
    const { name } = com as unknown as { name: string }
    app.component(name, com)
  }
  return com as SFCWithInstall<T>
}
