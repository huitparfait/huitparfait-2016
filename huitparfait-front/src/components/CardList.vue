<template>
    <div class="cardList">
        <slot></slot>
        <card invisible :wide="wide" v-if="!simple"></card>
        <card invisible :wide="wide" v-if="!simple && !wide"></card>
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
            wide: Boolean,
        }
    }

</script>

<style scoped>

    .cardList {
        display: flex;
        flex-wrap: wrap;
    }

</style>
