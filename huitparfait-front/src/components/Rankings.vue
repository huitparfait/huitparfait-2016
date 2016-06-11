<template>

    <card>
        <p>Retrouvez bientôt ici le classement général de tous les utilisateurs de <strong>Huit Parfait.</strong></p>
        <p>Les scores et les classements sont mis à jour chaque lendemain de match à <strong>8:08</strong> ;-)</p>
        <p v-if="ranking && ranking.length === 0">
            Vous n'êtes présent dans aucun groupe.
            Demandez à vos amis leur lien d'invitation pour rejoindre un groupe ou créez vous même un groupe pour vos amis, famille, collègues...
        </p>
        <p v-if="ranking && ranking.length === 0" class="btnBar">
            <link-btn v-link="{ name: 'groupList' }">Créer un groupe</link-btn>
        </p>
    </card>

    <card-title v-if="ranking && ranking.length > 0">Classements de vos groupe(s) :</card-title>

    <card-list>
        <group v-for="group in groups" :group="group" :link="'groupRanking'"></group>
    </card-list>
</template>

<script type="text/babel">

    import Group from './Group'
    import store from '../state/configureStore'
    import { fetchUserGroups } from '../state/actions/groups'

    export default {
        components: {
            Group,
        },
        data() {
            return {
                generalGroup: {
                    name: 'Classement général',
                    userCount: '?',
                    id: 'general',
                    slug: 'general'
                },
                groups: this.$select('groups'),
            }
        },
        route: {
            data() {
                store.dispatch(fetchUserGroups())
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
