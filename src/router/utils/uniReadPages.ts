import type { UserConfig } from 'vite'

Object.defineProperty(exports, '__esModule', { value: true })

const fs = require('fs')

// @ts-ignore
const uniReadPages = ({ pagesJsonDir, includes }) => {
  return {
    name: 'uniReadPages',
    config(config: UserConfig) {
      return {
        define: {
          ROUTES: '111',
          ROUTES_MAP: '222',
          TABBAR: '333330iiii0888'
        }
      }
    }
  }
}

exports.default = uniReadPages
