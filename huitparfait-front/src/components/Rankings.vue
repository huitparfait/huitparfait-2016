<template>

    <card>
        <p>Retrouvez bientôt ici les classements de vos groupes ainsi que le classement général de tous les utilisateurs de
            <strong>Huit Parfait.</strong></p>
        <p>Les scores et les classements sont mis à jour le lendemain de match à <strong>8:08</strong> ;-)</p>
        <p v-if="ranking.length === 0">
            Vous n'êtes présent dans aucun groupe.
            Demandez à vos amis leur lien d'invitation pour rejoindre un groupe ou créez vous même un groupe pour vos amis, famille, collègues...
        </p>
        <p v-if="ranking.length === 0" class="btnBar">
            <link-btn v-link="{ name: 'groupList' }">Créer un groupe</link-btn>
        </p>
    </card>

    <card-title v-if="ranking.length > 0">Classements de vos groupe(s) :</card-title>

    <card-list>
        <group v-for="group in ranking" :group="group" :link="'groupRanking'"></group>
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

<style scoped>

    .btnBar {
        text-align: right;
    }

    p {
        margin-top: 0;
        margin-bottom: 15px;
    }

    p:last-child {
        margin-bottom: 0;
    }

</style>
