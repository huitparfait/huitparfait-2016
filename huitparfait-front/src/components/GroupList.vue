<template>

    <card-title v-if="userGroups != null">
        Vous administrez <strong>{{ userGroups.length }}</strong> groupe(s) :
    </card-title>

    <card-list>
        <group v-for="group in groups" :group="group" mode="delete"></group>
    </card-list>

    <card-title text="Créer un nouveau groupe :"></card-title>

    <form @submit.prevent="createGroup" :class="{ 'createGroup--progress': createGroupInPogress }">
        <card>
            <label class="inputLabel">
                Nom du nouveau groupe :
                <input v-model="newGroup.name" type="text" class="input nameInput"
                        placeholder="Mes collègues">
            </label>
            <label class="inputLabel">
                Image du groupe (HTTPS uniquement) :
                <input v-model="newGroup.avatarUrl" type="text" class="input avatarInput"
                        placeholder="https://placekitten.com/g/100/200">
            </label>
            <div class="btnBar">
                <btn :disabled="createGroupInPogress">Créer le groupe</btn>
            </div>
        </card>
    </form>

</template>

<script type="text/babel">

    import Btn from './Btn'
    import Card from './Card'
    import CardList from './CardList'
    import CardTitle from './CardTitle'
    import Group from './Group'
    import store from '../state/configureStore'
    import { fetchUserGroups, upsertGroup } from '../state/actions/groups'
    import shortid from 'shortid'

    function getNewGroup() {
        return {
            id: shortid.generate(),
            name: null,
            avatarUrl: null,
        }
    }

    export default {
        components: {
            Btn,
            Card,
            CardList,
            CardTitle,
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
                                    params: { groupId: foo.group.id, groupName: foo.group.slug }
                                })
                            }
                        })
                        .catch(() => {
                            this.createGroupInPogress = false
                        })
            }
        }
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

</style>
