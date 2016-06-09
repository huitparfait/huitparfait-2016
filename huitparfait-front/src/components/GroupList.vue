<template>

    <card-title v-if="simpleGroups != null && simpleGroups.length > 0">Vous êtes simple membre de {{ simpleGroups.length }} groupe(s)&nbsp;:</card-title>

    <card v-if="simpleGroups != null && simpleGroups.length > 0">
        <p>Cliquez sur un groupe pour retrouver le classement de ses joueurs.</p>
    </card>

    <card-list>
        <group v-for="group in simpleGroups" :group="group" link="groupRanking" track-by="id"></group>
    </card-list>

    <card-title v-if="adminGroups != null && adminGroups.length > 0">Vous administrez {{ adminGroups.length }} groupe(s)&nbsp;:</card-title>

    <card v-if="adminGroups != null && adminGroups.length > 0">
        <p>
            Cliquez sur un groupe pour retrouver le lien d'invitation et la liste des joueurs.
            Vous pourrez également le modifier et gérer les joueurs.
        </p>
    </card>

    <card v-if="groups != null && groups.length === 0">
        <p>Vous n'êtes membre d'aucun groupe.</p>
        <p>Si vos amis ont déjà créé un groupe, demandez leur le lien d'invitation pour rejoindre le groupe et pour
            pronostiquer avec eux !</p>
        <p>
            Si vous êtes le premier de vos amis à s'inscrire sur Huit Parfait, utilisez le formulaire ci-dessous pour
            créer des groupes pour vos amis, famille, collègues...
            Vous obtiendrez ensuite un lien d'invitation à leur partager pour qu'il rejoigne votre groupe.
        </p>
    </card>

    <card-list>
        <group v-for="group in adminGroups" :group="group" mode="delete" track-by="id"></group>
    </card-list>

    <card-title>Créer un nouveau groupe&nbsp;:</card-title>

    <form @submit.prevent="createGroup" :class="{ 'createGroup--progress': createGroupInPogress }">
        <card>
            <label class="inputLabel">
                Nom du nouveau groupe&nbsp;:
                <input v-model="newGroup.name" type="text" class="input" placeholder="Mes collègues">
            </label>
            <label class="inputLabel">
                Image du groupe (HTTPS uniquement)&nbsp;:
                <input v-model="newGroup.avatarUrl" type="text" class="input"
                        placeholder="https://les-super-logos.com/monimage.jpg">
            </label>
            <div class="btnBar">
                <btn :disabled="createGroupInPogress">Créer le groupe</btn>
            </div>
            <pre>{{ $validation | json }}</pre>
        </card>
    </form>

</template>

<script type="text/babel">

    import Group from './Group'
    import store from '../state/configureStore'
    import { fetchUserGroups, upsertGroup } from '../state/actions/groups'
    import shortid from 'shortid'
    import _ from 'lodash'

    function getNewGroup() {
        return {
            id: shortid.generate(),
            name: null,
            avatarUrl: null,
        }
    }

    export default {
        components: {
            Group,
        },
        data() {
            return {
                groups: this.$select('groups'),
                newGroup: getNewGroup(),
                createGroupInPogress: false,
            }
        },
        route: {
            data() {
                store.dispatch(fetchUserGroups())
            },
        },
        computed: {
            simpleGroups() {
                return _.reject(this.groups, (group) => group.isAdmin)
            },
            adminGroups() {
                return _.filter(this.groups, (group) => group.isAdmin)
            },
        },
        methods: {
            createGroup() {

                this.createGroupInPogress = true
                const newGroup = this.newGroup

                store.dispatch(upsertGroup(newGroup))
                        .then((foo) => {
                            this.createGroupInPogress = false
                            if (foo.group != null) {
                                this.newGroup = getNewGroup()
                                this.$router.go({
                                    name: 'group',
                                    params: { groupId: foo.group.id, groupName: foo.group.slug },
                                })
                            }
                        })
                        .catch(() => {
                            this.createGroupInPogress = false
                        })
            },
        },
    }

</script>

<style scoped>

    .createGroup--progress {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .inputLabel {
        color: #777;
        display: block;
        font-style: italic;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .input {
        background-color: #f9f9f9;
        border: none;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        font-size: 16px;
        margin-top: 5px;
        padding: 10px 8px 8px 8px;
        width: 100%;
    }

    .btnBar {
        text-align: right;
        margin-top: 20px;
    }

    p {
        margin-top: 0;
        margin-bottom: 15px;
    }

    p:last-child {
        margin-bottom: 0;
    }

</style>
