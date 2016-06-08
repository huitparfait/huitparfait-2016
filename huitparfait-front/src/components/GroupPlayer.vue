<template>

    <card class="user" :class="{ 'isAdminLabel': user.isAdmin, 'isNotActiveLabel': !user.isActive }">
        <div class="details">
            <div class="avatar--wrapper">
                <img class="avatar" src="../assets/unknown-user.svg" v-if="user.avatarUrl" :src="user.avatarUrl">
                <img class="avatar" src="../assets/unknown-user.svg" v-else>
            </div>
            <div class="infos">
                <div class="name">{{user.name}}</div>
                <div class="memberSince"><em>dans le groupe depuis
                    <span :title="fullDateSince">{{ humanSince }}</span></em>
                </div>
            </div>
        </div>
        <div class="btnBar" v-if="!ranking">
            <btn class="btn" :hidden="user.isAdmin || !user.isActive" @click="excludeUser(user)">Exclure</btn>
            <btn class="btn" :hidden="user.isAdmin || user.isActive" @click="includeUser(user)">Réintégrer</btn>
        </div>
    </card>

</template>

<script type="text/babel">
    /* eslint-disable no-unused-vars */
    import * as WebApi from '../WebApi'
    import moment from 'moment'
    import momentFr from 'moment/locale/fr'

    export default {
        props: ['user', 'ranking'],
        data() {
            return {
                humanSince: moment(this.user.memberSince).fromNow(true),
                fullDateSince: moment(this.user.memberSince).format('Do MMMM YYYY, HH:mm:ss'),
            }
        },
        methods: {
            excludeUser(user) {
                user.isActive = false

                WebApi.toggleGroupMembership(this.$route.params.groupId, user.id, user.isActive)
                        .catch(() => {
                            user.isActive = true
                        })
            },
            includeUser(user) {
                user.isActive = true
                WebApi.toggleGroupMembership(this.$route.params.groupId, user.id, user.isActive)
                        .catch(() => {
                            user.isActive = false
                        })
            },
        },
    }

</script>

<style scoped>

    .user {
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        position: relative;
        overflow: hidden;
    }

    .isAdminLabel:after,
    .isNotActiveLabel:after {
        border: 2px dashed #fff;
        color: #fff;
        display: block;
        font-size: 14px;
        font-weight: bold;
        height: 26px;
        left: -70px;
        line-height: 26px;
        position: absolute;
        text-align: center;
        top: 10px;
        transform: rotate(-30deg) translateX(0px) translateY(0);
        width: 200px;
    }

    .isAdminLabel:after {
        background-color: #4db788;
        content: 'ADMIN';
    }

    .isNotActiveLabel:after {
        background-color: #b74d4d;
        content: 'EXCLU';
    }

    .details {
        align-items: center;
        display: flex;
        flex: 1 1 250px;
        text-decoration: none;
    }

    .isNotActiveLabel .details {
        opacity: 0.4;
    }

    .avatar--wrapper {
        align-self: flex-start;
        border-radius: 3px;
        flex-shrink: 0;
        height: 60px;
        margin-right: 15px;
        overflow: hidden;
        width: 60px;
    }

    @media (min-width: 500px) {
        .avatar--wrapper {
            height: 70px;
            width: 70px;
        }
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
        font-size: 18px;
        font-weight: bold;
    }

    .memberSince {
        color: #555;
        font-size: 14px;
    }

    .btnBar {
        align-self: flex-end;
        margin-left: 10px;
        margin-top: 10px;
    }

    .btnBar .btn {
        display: block;
        width: 100%;
    }

</style>
