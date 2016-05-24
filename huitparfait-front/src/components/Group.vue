<template>
    <div class="">

        Group {{ groupName }}

    </div>
</template>

<script>

    export default {
        data() {
            return { groupName: this.$route.params.groupName }
        },
    }

</script>

<style scoped>

</style>
