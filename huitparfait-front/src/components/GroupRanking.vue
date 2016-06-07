<template>

    <div class="cardLabel">Joueurs du groupe :</div>

    <card-list>
        <group-player v-for="user in groupRanking" :user="user"></group-player>
    </card-list>

</template>

<script type="text/babel">
    import GroupPlayer from './GroupPlayer'
    import store from '../state/configureStore'
    import { fetchGroupRanking } from '../state/actions/ranking'

    export default {
        components: {
            GroupPlayer,
        },
        data() {
            return {
                groupRanking: this.$select('groupRanking'),
            }
        },
        route: {
            data: ({ to: { params: { groupId } } }) => {
                store.dispatch(fetchGroupRanking(groupId))
            },
        }
    }

</script>

<style scoped>

    .cardLabel {
        color: #999;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
    }

</style>
