import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path, { resolve } from 'path'
// @ts-ignore
import uniReadPages from './src/router/utils/uniReadPages'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // https://cn.vitejs.dev/guide/api-javascript.html#loadenv
  const env = loadEnv(mode, process.cwd(), ['NODE_ENV', 'VITE_'])

  return {
    base: env.NODE_ENV === 'development' ? '/' : './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      uni(),
      uniReadPages({
        pagesJsonDir: path.resolve(__dirname, './src/pages.json'),
        includes: ['path', 'aliasPath', 'meta']
      })
    ],
    envPrefix: ['VITE_', 'NODE_ENV'],
    // 内联 postcss 注册 tailwindcss
    server: {
      open: true,
      host: true,
      proxy: {
        [env.VITE_PROXY_KEY]: {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          // secure: env.NODE_ENV === 'development' ? false : true,
          rewrite: path => {
            return path.replace(env.VITE_PROXY_KEY, '')
          }
        }
      }
    }
  }
})
