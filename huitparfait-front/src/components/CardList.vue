<template>
    <div class="cardList">
        <slot></slot>
        <card invisible v-if="!simple"></card>
        <card invisible v-if="!simple"></card>
    </div>
</template>

<script>

    import Card from './Card'

    export default {
        components: {
            Card,
        },
        props: {
            simple: Boolean,
        }
    }

</script>

<style scoped>

    .cardList {
        display: flex;
        flex-wrap: wrap;
    }

</style>
