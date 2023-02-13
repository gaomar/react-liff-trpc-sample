import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath, URL } from 'node:url'

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    define: viteEnv,
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      host: '172.30.1.2', // killercoda用
      proxy: {
        '^/api/*': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            return path.replace('/api', '/')
          }
        }
      }
    }
  })
}
