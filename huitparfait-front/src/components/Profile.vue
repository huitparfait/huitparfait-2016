<template>

    <card-title>Vous êtes connecté en tant que :</card-title>

    <user :user="user"></user>

    <card-title>Mise à jour du profil :</card-title>

    <form @submit.prevent="updateProfile" v-if="user != null && profile != null"
          :class="{ 'updateProfile--progress': updateProfileInPogress }">
        <card>
            <label class="inputLabel">
                Prénom et Nom :
                <input v-model="profile.name" type="text" class="input nameInput" placeholder="Mes collègues">
            </label>
            <label class="inputLabel">
                Avatar (HTTPS uniquement) :
                <input v-model="profile.avatarUrl" type="text" class="input avatarInput"
                       placeholder="https://les-super-logos.com/monimage.jpg">
            </label>
            <label class="inputLabel">
                Apparaître anonymement dans le classement général :
                <input v-model="profile.isAnonymous" type="checkbox" class="checkbox isPublicCheckbox">
            </label>
            <div>
                Si vous choisissez cette option, votre nom et votre avatar n'apparaîtront pas dans le classement
                général.
                Vous apparaîtrez en tant que <strong>{{ user.anonymousName }}</strong>.
            </div>
            <div class="btnBar">
                <btn :disabled="createGroupInPogress">Mettre à jour le profil</btn>
            </div>
        </card>
    </form>

</template>

<script type="text/babel">

    import User from './User'
    import store from '../state/configureStore'
    import { fetchCurrentUser, updateProfile } from '../state/actions/user'

    export default {
        components: {
            User,
        },
        data() {
            return {
                user: this.$select('user'),
                profile: null,
            }
        },
        route: {
            data() {
                store.dispatch(fetchCurrentUser())
            },
        },
        watch: {
            user(user) {

                if (user == null) {
                    this.profile = null
                    return
                }

                this.profile = {
                    name: user.name,
                    avatarUrl: user.avatarUrl,
                    isAnonymous: user.isAnonymous,
                }
            },
        },
        methods: {
            updateProfile() {

                this.updateGroupInPogress = true

                store.dispatch(updateProfile(this.profile))
                        .then(() => {
                            this.updateGroupInPogress = false
                        })
                        .catch(() => {
                            this.updateGroupInPogress = false
                        })
            },
        },
    }

</script>

<style scoped>

    .updateProfileInPogress {
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
