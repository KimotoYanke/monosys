<template lang="pug">
.modal-card
    .scanner(ref='scanner')
</template>
<script>
import Quagga from 'quagga'
import checkIsbn from '../check-isbn'
export default {
    props: {
        callback: {
            type: Function,
            required: true
        },
        lastResult: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        }
    },
    computed: {
    },
    mounted () {
        Quagga.init({
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: this.$refs.scanner
            },
            decoder: {
                readers: ['ean_reader']
            }
        }, err => {
            if (err) {
                this.$toast.open({
                    message: err.name,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
                return
            }
            Quagga.start()
        })
        Quagga.onDetected(this.onDetected)
        /*
        Quagga.onProcessed((result) => {
            const drawingCtx = Quagga.canvas.ctx.overlay
            const drawingCanvas = Quagga.canvas.dom.overlay

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')))
                    result.boxes.filter((box) => {
                        return box !== result.box
                    }).forEach((box) => {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 })
                    })
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 })
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 })
                }
            }
        })
         */
    },
    beforeDestroy () {
        Quagga.stop()
    },
    methods: {
        onDetected (result) {
            const code = result.codeResult.code

            if (this.lastResult !== code) {
                Promise.resolve().then(() => this.$toast.open({
                    message: code,
                    position: 'is-bottom',
                    duration: 100
                }))
                this.lastResult = code
                if (/97[89].{10}/.test(String(code))) {
                    if (checkIsbn(code)) {
                        this.callback(code)
                        this.$emit('close')
                    }
                }
            }
        }
    },
    components: {
    }
}
</script>
<style lang="scss">
.scanner{
    position:relative;
}
</style>
