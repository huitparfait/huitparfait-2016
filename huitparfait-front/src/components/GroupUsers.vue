<template>

    <group :loader="$loadingRouteData" :group="group" mode="edit"></group>

    <!--<form @submit.prevent="createGroup()">-->
    <!--<card>-->
    <!--<label class="inputLabel">-->
    <!--Nom du nouveau groupe :-->
    <!--<input v-model="group.name" type="text" class="input nameInput"-->
    <!--placeholder="Mes collègues">-->
    <!--</label>-->
    <!--<label class="inputLabel">-->
    <!--Image du groupe (HTTPS uniquement) :-->
    <!--<input v-model="group.avatarUrl" type="text" class="input avatarInput"-->
    <!--placeholder="https://placekitten.com/g/100/200">-->
    <!--</label>-->
    <!--<div class="btnBar">-->
    <!--<btn>Mettre à jour le groupe</btn>-->
    <!--</div>-->
    <!--</card>-->
    <!--</form>-->

    <card v-if="!$loadingRouteData">
        Pour rejoindre le groupe, partagez ce lien :
        <a v-link="{ name: 'groupJoin', params: { groupId: group.id, groupName: group.slug } }">join link</a>
    </card>

    <div class="cardLabel">Joueurs du groupe :</div>

    <card-list>
        <group-player v-for="user in users" :user="user"></group-player>
    </card-list>

</template>

<script type="text/babel">

    import * as WebApi from '../WebApi'
    import Btn from './Btn'
    import Card from './Card'
    import CardList from './CardList'
    import Group from './Group'
    import GroupPlayer from './GroupPlayer'

    export default {
        components: {
            Btn,
            Card,
            CardList,
            Group,
            GroupPlayer,
        },
        data() {
            return {
                group: undefined,
                users: undefined,
            }
        },
        route: {
            data: ({ to: { params: { groupId } }, redirect }) => ({
                group: WebApi.fetchGroup(groupId).catch((err) => {
                    redirect({ name: 'groupList' })
                }),
                users: WebApi.fetchGroupMembers(groupId),
            }),
            canActivate({ to: { name, params, query: { join } }, replace, next }) {

                if (join) {

                    return WebApi.joinGroup(params.groupId)
                            .then(() => {
                                replace({ name, params })
                            })
                            .catch(() => next())
                }

                next()
            },
        },
    }

</script>

<style scoped>

    .cardLabel {
        color: #999;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
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
