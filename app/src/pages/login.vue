<template lang="pug">
div
	nav-bar
	section.section
		.container
			h1.title Log In
			h2.subtitle or Register
			b-field(label='ユーザーネーム')
				b-input(v-model='username')
			b-field(label='パスワード')
				b-input(v-model='password' type='password' password-reveal)
			button.button.is-primary(@click='login') ログイン
			button.button.is-primary(@click='register') 登録
</template>
<script>
import NavBar from '../components/NavBar.vue'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState({})
    },
    mounted () {
    },
    methods: {
        login () {
            const username = this.username
            const password = this.password
            this.$store.dispatch('login', { username, password })
            this.$router.push('index')
        },
        register () {
            const username = this.username
            const password = this.password
            this.$store.dispatch('register', { username, password })
            this.$router.push('index')
        }
    },
    components: {
        'nav-bar': NavBar
    }
}
</script>
<style lang="sass">
</style>
