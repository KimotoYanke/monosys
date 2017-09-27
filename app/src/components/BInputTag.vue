<template lang="pug">
.input-tag
	.tag-list(v-if='!focused && !!text' @click='focus')
		span.tag(v-for='tag in tags') {{tag}}
	b-input(v-if='focused || !text' @blur='blur' v-model='text')
</template>
<script>
export default {
    props: ['tags'],
    data () {
        return {
            text: '',
            focused: false
        }
    },
    methods: {
        blur () {
            this.focused = false
            const tags = this.text.split(/\s+/g)
            this.tags = tags
            this.$emit('update:tags', tags)
        },
        focus () {
            this.focused = true
            this.text = this.tags.join(' ')
        }
    },
    computed: {
    },
    mounted () {
    }
}
</script>
<style lang="sass">
</style>
