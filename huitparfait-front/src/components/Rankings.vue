<template>
    <card-title>
        Vos groupe(s) :
    </card-title>

    <card-list>
        <group v-for="group in ranking" :group="group"></group>
    </card-list>
</template>

<script type="text/babel">
    import Group from './Group'
    import store from '../state/configureStore'
    import { fetchRanking } from '../state/actions/ranking'

    export default {
        components: {
            Group,
        },
        data() {
            return {
                ranking: this.$select('ranking'),
            }
        },
        route: {
            data() {
                store.dispatch(fetchRanking())
            },
        },
    }
</script>

<style scoped></style>
