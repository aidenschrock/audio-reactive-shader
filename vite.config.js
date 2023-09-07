import glsl from 'vite-plugin-glsl'
import path from 'path';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins:
        [
            glsl()
        ],
    resolve: {
        alias: {
            'shader-park-core': path.resolve(__dirname, 'node_modules/shader-park-core/dist/shader-park-core.esm.js')
        }
    }
}