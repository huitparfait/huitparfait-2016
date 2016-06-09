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

    @supports (flex-wrap: wrap) {
        .cardList {
            display: flex;
            flex-wrap: wrap;
        }
    }

</style>
