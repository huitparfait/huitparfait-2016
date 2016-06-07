<template>
    <a class="link-btn">
        <slot></slot>
    </a>
</template>

<script>

</script>

<style scoped>

    .link-btn {
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
        margin: 0 5px;
        padding: 8px 12px;
    }

</style>
