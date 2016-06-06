<template>
    <div class="card" :class="{ 'card--invisible': invisible, 'card--wide': wide }">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        props: {
            invisible: Boolean,
            wide: Boolean,
        },
    }

</script>

<style scoped>

    .card {
        background-color: #fff;
        box-sizing: border-box;
        border-color: #ddd;
        border-style: solid;
        border-width: 0;
        border-bottom-width: 1px;
        flex: 1 1 300px;
        padding: 10px;
    }

    @media (min-width: 500px) {
        .card {
            border-width: 1px;
            border-bottom-width: 2px;
            border-radius: 5px;
            margin: 0 8px 15px 8px;
            padding: 15px;
        }
    }

    .card--invisible {
        border-bottom-width: 0;
        border-top-width: 0;
        height: 0;
        margin-bottom: 0;
        margin-top: 0;
        padding-bottom: 0;
        padding-top: 0;
    }

    .card--wide {
        flex-basis: 500px;
    }

</style>
