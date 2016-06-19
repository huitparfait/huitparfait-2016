<template>

    <div class="page--groupRanking">

        <card-title v-if="group != null">Classement de <em>{{ group.name }}</em>&nbsp;:</card-title>

        <ranked-player v-for="rankedPlayer in groupRanking" :ranked-player="rankedPlayer"></ranked-player>
    </div>

</template>

<script type="text/babel">
    import RankedPlayer from './RankedPlayer'
    import store from '../state/configureStore'
    import { fetchGroup } from '../state/actions/groups'
    import { fetchGroupRanking } from '../state/actions/ranking'

    export default {
        components: {
            RankedPlayer,
        },
        data() {
            return {
                group: this.$select('group'),
                groupRanking: this.$select('groupRanking'),
            }
        },
        route: {
            data: ({ to: { params: { groupId } } }) => {
                store.dispatch(fetchGroup(groupId))
                store.dispatch(fetchGroupRanking(groupId))
            },
        },
    }

</script>

<style scoped>
</style>
