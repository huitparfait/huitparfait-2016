<template>

    <div v-if="!$loadingRouteData">

        <link-btn href="/auth/logout">Se déconnecter</link-btn>

        <form @submit.prevent="updateProfile()">
            <card>
                <label class="inputLabel">
                    Prénom et Nom :
                    <input v-model="current.user.name" type="text" class="input nameInput" placeholder="Mes collègues">
                </label>
                <label class="inputLabel">
                    Avatar (HTTPS uniquement) :
                    <input v-model="current.user.avatarUrl" type="text" class="input avatarInput" placeholder="https://placekitten.com/g/100/200">
                </label>
                <label class="inputLabel">
                    Apparaître anonymement dans le classement général :
                    <input v-model="current.user.isAnonymous" type="checkbox" class="checkbox isPublicCheckbox">
                </label>
                <label>
                    {{ current.user.anonymousName }}
                </label>
                <div class="btnBar">
                    <btn>Mettre à jour le profil</btn>
                </div>
            </card>
        </form>
    </div>

</template>

<script type="text/babel">

    import * as WebApi from '../WebApi'
    import Btn from './Btn'
    import LinkBtn from './LinkBtn'
    import Card from './Card'

    export default {
        components: {
            Btn,
            LinkBtn,
            Card,
        },
        data() {
            return {
                current: WebApi.apiState,
            }
        },
        methods: {
            updateProfile() {
                console.log('update profile');
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
        width: 100%;
    }

    .input,
    .checkbox {
        background-color: #f9f9f9;
        border: none;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        font-size: 16px;
        padding: 10px 8px 8px 8px;
        margin-top: 5px;
    }

    .btnBar {
        text-align: right;
        margin-top: 20px;
    }

</style>
