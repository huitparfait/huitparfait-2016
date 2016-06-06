<template>

    <card class="group">
        <div class="details" v-if="loader">
            <div class="avatar--wrapper">
                <img class="avatar" src="../assets/unknown-group.svg">
            </div>
            <div class="infos">
                <div class="name"><span class="unreadable">Groupe ??</span></div>
                <div class="size"><span class="unreadable"><strong>?</strong> joueurs</span></div>
            </div>
        </div>
        <a class="details" v-if="!loader"
                v-link="{ name: 'group', params: { groupId: group.id, groupName: group.slug } }">
            <div class="avatar--wrapper">
                <img class="avatar" :src="group.avatarUrl">
            </div>
            <div class="infos">
                <div class="name">{{group.name}}</div>
                <div class="size"><strong>{{group.userCount}}</strong> joueurs</div>
            </div>
        </a>
        <div class="btnBar">
            <btn v-if="mode === 'delete'" @click="deleteGroup">Supprimer</btn>
            <btn v-if="mode === 'edit'" @click="editGroup">Editer</btn>
        </div>
    </card>

</template>

<script type="text/babel">

    import * as WebApi from '../WebApi'
    import Btn from './Btn'
    import Card from './Card'
    import CardList from './CardList'

    export default {
        components: {
            Btn,
            Card,
            CardList,
        },
        props: ['group', 'mode', 'loader'],
        methods: {
            deleteGroup() {
                WebApi.deleteGroup(this.group.id)
            },
            editGroup() {
                WebApi.editGroup(this.group.id)
            },
        },
    }

</script>

<style scoped>

    .group {
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .details {
        align-items: center;
        display: flex;
        flex: 1 1 250px;
        text-decoration: none;
    }

    .avatar--wrapper {
        border-radius: 3px;
        flex-shrink: 0;
        height: 70px;
        margin-right: 15px;
        overflow: hidden;
        width: 70px;
    }

    .avatar {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
    }

    .infos {
        flex: 1 1 auto;
    }

    .name {
        color: #333;
        font-weight: bold;
    }

    .size {
        color: #555;
    }

    .btnBar {
        align-self: flex-end;
        margin-left: 10px;
        margin-top: 10px;
    }

    .unreadable {
        background-color: #eee;
        color: #eee;
    }

</style>
