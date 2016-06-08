<template>
    <div class="titleBar" :class="{ 'isLoading': loaders > 0 }">
        <div class="icon">
            <img src="../assets/huitparfait-logo.svg">
        </div>
        <div class="title"><span class="huit">Huit</span> Parfait</div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                loaders: this.$select('loaders'),
            }
        },
    }

</script>

<style scoped>

    .titleBar {
        align-items: center;
        background-color: #4db788;
        border-bottom: 2px solid #49996f;
        color: #fff;
        display: flex;
        font-weight: bold;
        justify-content: center;
    }

    @keyframes move {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 50px 50px;
        }
    }

    .isLoading {
        animation: move 2s linear infinite;
        background-image: linear-gradient(
                -45deg,
                rgba(255, 255, 255, .1) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, .1) 50%,
                rgba(255, 255, 255, .1) 75%,
                transparent 75%,
                transparent
        );
        background-size: 50px 50px;
    }

    .icon {
        border: 3px solid #fff;
        border-radius: 5px;
        display: none;
        height: 30px;
        overflow: hidden;
        margin-right: 10px;
        width: 30px;
    }

    @media (min-width: 850px) {
        .icon {
            display: block;
        }
    }

    @media (min-width: 850px) {
        .huit {
            display: none;
        }
    }

    img {
        display: block;
        height: 100%;
        width: 100%;
    }

</style>
