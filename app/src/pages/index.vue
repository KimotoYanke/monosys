<template lang="pug">
div
	nav-bar
		router-link.nav-item(to='thing' slot='left') Thing
		user-nav-item(slot='right')
	section.hero.is-sky.is-small
		.hero-body.is-sky-and-earth
			.container
				.title Monosys
				.subtitle NITTC Procon
</template>
<script>
import NavBar from '../components/NavBar.vue'
import UserNavItem from '../components/UserNavItem.vue'
import { mapState } from 'vuex'

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
        })
    },
    mounted () {
    },
    methods: {
    },
    components: {
        'nav-bar': NavBar,
        'user-nav-item': UserNavItem
    }
}
</script>
<style lang="sass" scoped>
@import "../stylesheets/index.scss"
</style>
