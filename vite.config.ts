import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import UnoCSS from 'unocss/vite'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // https://cn.vitejs.dev/guide/api-javascript.html#loadenv
  const env = loadEnv(mode, process.cwd(), ['NODE_ENV', 'VITE_'])

  return {
    base: env.NODE_ENV === 'development' ? '/' : './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~@': path.resolve(__dirname, 'src/static')
      }
    },
    plugins: [uni(), UnoCSS()],
    envPrefix: ['VITE_', 'NODE_ENV'],
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
