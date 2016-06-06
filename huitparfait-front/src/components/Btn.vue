<template>
    <button class="btn" :class="{ hidden: hidden, inactive: inactive }" type="submit">
        <slot></slot>
    </button>
</template>

<script>

    export default {
        props: {
            hidden: Boolean,
            inactive: Boolean
        },
    }

</script>

<style scoped>

    .btn {
        /*background-color: #4d88b7;*/
        /*background-color: #4db788;*/
        background-color: #ddd;
        /*border: 1px solid #496f99;*/
        /*border: 1px solid #49996f;*/
        border: 1px solid #aaa;
        border-bottom-width: 2px;
        border-radius: 4px;
        /*color: #fff;*/
        color: #555;
        color: #346943;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        /*margin: 10px;*/
        padding: 8px 12px;
    }

    .hidden {
        border-bottom-width: 0;
        border-top-width: 0;
        height: 0;
        margin-bottom: 0;
        margin-top: 0;
        overflow: hidden;
        padding-bottom: 0;
        padding-top: 0;
    }

    .inactive {
        opacity: 0.5;
    }

</style>
