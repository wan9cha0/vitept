import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import components from 'unplugin-vue-components/vite'
// import autoImport from 'unplugin-auto-import/vite'
// import { VarletUIResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // components({
    //   resolvers: [VarletUIResolver()]
    // }),
    // autoImport({
    //   resolvers: [VarletUIResolver({ autoImport: true })]
    // })
  ],
  base: '/vitept/',
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})
