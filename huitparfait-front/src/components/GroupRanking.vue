<template>

    <div class="page--groupRanking">

        <card-title v-if="group != null">Classement de <em>{{ group.name }}</em>&nbsp;:</card-title>

        <ranked-player v-for="rankedPlayer in groupRanking.ranking" :ranked-player="rankedPlayer"></ranked-player>
    </div>

    <div v-if="group">
        <link-btn  v-link="{ name: 'groupRanking', params: { groupId:  group.id, groupName: group.name }, query: { page: groupRanking.page - 1 } }">
            Page précédente
        </link-btn>

        <link-btn v-link="{ name: 'groupRanking', params: { groupId: group.id, groupName: group.name }, query: { page: groupRanking.page + 1 } }">
            Page suivante
        </link-btn>
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
            data: ({ to: { params: { groupId }, query: { page = 1 } } }) => {
                store.dispatch(fetchGroup(groupId))
                store.dispatch(fetchGroupRanking(groupId, parseInt(page)))
            },
        },
    }

</script>

<style scoped>
</style>
