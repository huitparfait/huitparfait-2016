<template>

    <div class="page--groupRanking">

        <card-title v-if="group != null && group.id != 'general'">Classement de <em>{{ group.name }}</em>&nbsp;</card-title>
        <card-title v-else>Classement général</em>&nbsp;</card-title>

        <ranked-player v-for="rankedPlayer in groupRanking.ranking" :ranked-player="rankedPlayer"></ranked-player>

        <div v-if="group" class="pageSelectors">
            <link-btn class="pageSelector"  v-link="{ name: 'groupRanking', params: { groupId:  group.id, groupName: group.name }, query: { page: groupRanking.page - 1 } }">
                Page précédente
            </link-btn>

            <link-btn class="pageSelector" v-link="{ name: 'groupRanking', params: { groupId: group.id, groupName: group.name }, query: { page: groupRanking.page + 1 } }">
                Page suivante
            </link-btn>
        </div>
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

    .pageSelectors {
        text-align: center;
    }

    .pageSelector {
        margin: 15px 1px;
    }

</style>
