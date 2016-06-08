<template>

    <card class="user" v-if="user != null">
        <div class="details">
            <div class="avatar--wrapper">
                <img class="avatar" src="../assets/unknown-user.svg" v-if="user.avatarUrl" :src="user.avatarUrl">
                <img class="avatar" src="../assets/unknown-user.svg" v-else>
            </div>
            <div class="infos">
                <div class="name">{{ user.name }}</div>
                <div class="anonymousName">{{ user.anonymousName }}</div>
            </div>
        </div>
        <div class="btnBar">
            <link-btn href="/auth/logout">Se déconnecter</link-btn>
        </div>
    </card>

</template>

<script type="text/babel">

    export default {
        props: ['user'],
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

    .details {
        align-items: center;
        display: flex;
        flex: 1 1 250px;
        text-decoration: none;
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

    .anonymousName {
        font-style: italic;
    }

    .btnBar {
        align-self: flex-end;
        margin-left: 10px;
        margin-top: 10px;
    }

</style>
