<template>

    <card>
        Retrouvez bientôt ici le classement du groupe <strong>{{ group.name }}</strong>.
    </card>

    <card-title>Joueurs du groupe&nbsp;:</card-title>

    <card-list>
        <group-player v-for="user in groupRanking" :user="user" :ranking="true"></group-player>
    </card-list>

</template>

<script type="text/babel">
    import GroupPlayer from './GroupPlayer'
    import store from '../state/configureStore'
    import { fetchGroup } from '../state/actions/groups'
    import { fetchGroupRanking } from '../state/actions/ranking'

    export default {
        components: {
            GroupPlayer,
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
