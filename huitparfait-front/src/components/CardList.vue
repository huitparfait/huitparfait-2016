<template>
    <div class="cardList">
        <slot></slot>
        <card invisible :wide="wide" v-if="!simple"></card>
        <card invisible :wide="wide" v-if="!simple && !wide"></card>
    </div>
</template>

<script>
    export default {
        props: {
            simple: Boolean,
            wide: Boolean,
        },
    }

</script>

<style scoped>

    .cardList {
        display: flex;
        flex-wrap: wrap;
    }

</style>
