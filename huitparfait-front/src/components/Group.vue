<template>
    <div class="">

        Group {{ groupName }}

        <button @click="deleteGroup()">Supprimer Groupe</button>

    </div>
</template>

<script type="text/babel">
    import * as WebApi from '../WebApi'

    export default {
        data() {
            return { groupName: this.$route.params.groupName }
        },
        methods: {
            deleteGroup() {
                WebApi.deleteGroup(this.$route.params.groupId).then(() => {
                    this.$router.go({ name: 'groupList' })
                })
            },
        },
    }

</script>

<style scoped>

</style>
