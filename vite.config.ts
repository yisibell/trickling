import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svg4VuePlugin } from 'vite-plugin-svg4vue'

const isBuildLib = () => {
  return process.env.BUILD_TYPE === 'lib'
}

const outDir = isBuildLib() ? 'lib' : 'dist'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/trickling/',
  plugins: [vue(), svg4VuePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: isBuildLib()
    ? {
        outDir,
        target: 'es2015',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/lib/main.ts'),
          name: 'Trickling',
          // the proper extensions will be added
          fileName: 'trickling',
          formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
          external: ['fourdom'],
        },
        copyPublicDir: false,
        cssTarget: ['chrome35'],
      }
    : { outDir },
})
