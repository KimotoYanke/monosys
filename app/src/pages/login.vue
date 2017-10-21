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
import { mapState, mapGetters } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState({}),
        ...mapGetters({
            isLogined: 'user/isLogined'
        })
    },
    mounted () {
    },
    methods: {
        login () {
            const username = this.username
            const password = this.password
            return this.$store.dispatch('user/login', { username, password }).then(() => {
                if (this.isLogined) {
                    this.$router.push('index')
                } else {
                    this.$toast.open('Login Failed')
                }
            })
        },
        register () {
            const username = this.username
            const password = this.password
            return this.$store.dispatch('user/register', { username, password }).then(() => {
                this.$toast.open('Please login with your username and password')
            })
        }
    },
    components: {
        'nav-bar': NavBar
    }
}
</script>
<style lang="sass">
</style>
