<template>
    <button class="btn" :disabled="disabled" :class="{ hidden: hidden, inactive: inactive }" type="submit">
        <slot></slot>
    </button>
</template>

<script>

    export default {
        props: {
            disabled: Boolean,
            hidden: Boolean,
            inactive: Boolean
        },
    }

</script>

<style scoped>

    .btn {
        background-color: #ddd;
        border: none;
        border-radius: 4px;
        box-shadow: 0 2px 0 #49996f;
        color: #555;
        color: #346943;
        cursor: pointer;
        display: inline-block;
        font-size: 15px;
        font-weight: bold;
        padding: 10px 12px;
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
