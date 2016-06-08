<template>

    <group :group="group" mode="edit"></group>

    <card>
        <form @submit.prevent="updateGroup" v-if="group != null && groupEdit != null"
              :class="{ 'updateGroup--progress': updateGroupInPogress }">
            <label class="inputLabel">
                Nom du groupe :
                <input v-model="groupEdit.name" type="text" class="input" placeholder="Mes collègues">
            </label>
            <label class="inputLabel">
                Image du groupe (HTTPS uniquement) :
                <input v-model="groupEdit.avatarUrl" type="text" class="input"
                       placeholder="https://les-super-logos.com/monimage.jpg">
            </label>
            <div class="btnBar">
                <btn :disabled="updateGroupInPogress">Mettre à jour le groupe</btn>
            </div>
        </form>
    </card>

    <card v-if="group != null">
        Lien d'invitation à partager avec vos amis :
        <a v-link="{ name: 'groupJoin', params: { groupId: group.id, groupName: group.slug } }">{{ joinUrl }}</a>
    </card>

    <div class="cardLabel">Joueurs du groupe :</div>

    <card-list>
        <group-player v-for="user in groupUsers" :user="user"></group-player>
    </card-list>

</template>

<script type="text/babel">

    import Group from './Group'
    import GroupPlayer from './GroupPlayer'
    import store from '../state/configureStore'
    import { fetchGroup, fetchGroupUsers, upsertGroup } from '../state/actions/groups'
    import router from '../router'

    export default {
        components: {
            Group,
            GroupPlayer,
        },
        data() {
            return {
                group: this.$select('group'),
                groupUsers: this.$select('groupUsers'),
                groupEdit: null,
            }
        },
        computed: {
            joinUrl() {
                return location.origin + router.stringifyPath({
                            name: 'groupJoin',
                            params: { groupId: this.group.id, groupName: this.group.slug },
                        })
            },
        },
        watch: {
            group(group) {

                if (group == null) {
                    this.groupEdit = null
                    return
                }

                this.groupEdit = {
                    name: group.name,
                    avatarUrl: group.avatarUrl,
                }
            },
        },
        route: {
            data: ({ to: { params: { groupId } } }) => {
                store.dispatch(fetchGroup(groupId))
                store.dispatch(fetchGroupUsers(groupId))
            },
        },
        methods: {
            updateGroup() {

                this.updateGroupInPogress = true

                const updatedGroup = {
                    id: this.group.id,
                    ...this.groupEdit,
                }

                store.dispatch(upsertGroup(updatedGroup))
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

    .updateGroup--progress {
        cursor: not-allowed;
        opacity: 0.5;
    }

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
