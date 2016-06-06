<template>

    <card-title v-if="userGroups != null">
        Vous administrez <strong>{{ userGroups.length }}</strong> groupe(s) :
    </card-title>

    <card-list>
        <group v-for="group in userGroups" track-by="id" :group="group" mode="delete"></group>
    </card-list>

    <card-title text="Créer un nouveau groupe :"></card-title>

    <form @submit.prevent="createGroup()">
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
                <btn>Créer le groupe</btn>
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
    import * as WebApi from '../WebApi'
    import store from '../configureStore'
    import { getUserGroups } from '../actions/userGroups-actions'

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
                userGroups: this.$select('userGroups'),
                newGroup: this.$select('newGroup'),
            }
        },
        route: {
            data() {
                store.dispatch(getUserGroups())
            },
        },
        methods: {
            createGroup() {
                WebApi.createGroup(this.newGroup).then((group) => {
                    this.$router.go({ name: 'group', params: { groupId: group.id, groupName: this.newGroup.name } })
                })
            }
        }
    }

</script>

<style scoped>

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
