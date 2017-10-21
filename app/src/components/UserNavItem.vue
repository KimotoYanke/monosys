<template lang="pug">
	span.nav-item
		span.nav-item
			a.button.is-primary(v-if='isLogined') {{ username }}
		span.nav-item
			router-link.button(v-if='!isLogined' to='login') Login
			a.button(v-if='isLogined' @click='logout') Logout
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
            username: state => state.user.username
        }),
        ...mapGetters({
            isLogined: 'user/isLogined'
        })
    },
    mounted () {
    },
    methods: {
        logout () {
            this.$store.dispatch('user/logout')
        }
    },
    components: {
    }
}
</script>
<style lang="sass" scoped>
@import "../stylesheets/index.scss"
</style>
