<template lang="pug">
div
    nav-bar
        .nav-item(slot='right')
            b-field
                b-input(
                    type='search'
                    icon='search'
                    v-model='searchValue')
                p.control
                    button.button.is-primary(@click='search')
                        b-icon(icon='search')
                        span 検索
        .nav-item(slot='right')
            p.control
                a.button.is-primary(@click='registerModal')
                    b-icon(icon='plus')
                    span 登録
    thing-table(
        :data='things')
</template>
<script>
import NavBar from '../components/NavBar.vue'
import ThingTable from '../components/ThingTable.vue'
import ThingForm from '../components/ThingForm.vue'
import { mapState } from 'vuex'

export default {
    data () {
        return {
            ThingForm,
            searchValue: ''
        }
    },
    computed: {
        ...mapState({
            things: state => state.thing.things
        })
    },
    mounted () {
        this.$store.dispatch('thing/fetch', {})
    },
    methods: {
        search () {
            const str = this.searchValue
            const query = {}
            str.replace(/rfid:([^\s]+)/g, (m, p1) => {
                query.rfid = p1
                return ''
            })
            str.replace(/isbn:([^\s]+)/g, (m, p1) => {
                query.isbn = p1
                return ''
            })
            str.replace(/budget:([^\s]+)/g, (m, p1) => {
                query['budget_frame'] = p1
                return ''
            })
            str.replace(/loan:(true|false)/g, (m, p1) => {
                query.loan = { $exists: p1 === 'true' }
                return ''
            })
            str.replace(/tag:([^\s]+)/g, (m, p1) => {
                query.tags = { $all: p1.split(',') }
                return ''
            })
            str.replace(/[^\s]+\:[^\s]+/g, '')
                .replace(/[^\s]+/, m => {
                    if (m !== '') {
                        query.name = { $regex: m }
                    }
                })
            if (query) {
                this.$store.dispatch('thing/fetch', { query })
            }
        },
        registerModal () {
            this.$modal.open({
                component: ThingForm,
                props: {
                    title: '登録'
                }
            })
        }
    },
    components: {
        'nav-bar': NavBar,
        'thing-table': ThingTable,
        'thing-form': ThingForm
    }
}
</script>
<style lang="sass">
</style>
