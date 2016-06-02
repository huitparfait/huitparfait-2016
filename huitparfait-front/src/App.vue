<template>
    <div class="main">
        <title-bar class="titlebar"></title-bar>
        <router-view></router-view>
        <menu-bar class="menubar"></menu-bar>
    </div>
</template>

<script>
    import TitleBar from 'components/TitleBar'
    import MenuBar from 'components/MenuBar'

    export default {
        replace: false,
        components: {
            TitleBar,
            MenuBar,
        },
    }
</script>

<style scoped>

    .main {
        box-sizing: border-box;
        margin: 30px auto 70px auto;
        max-width: 1400px;
        width: 100%;
    }

    @media (min-width: 850px) {
        .main {
            margin: 0 auto;
            padding-left: 180px;
        }
    }

    .titlebar {
        background-color: #4db788;
        border-bottom: 2px solid #49996f;
        font-weight: bold;
        color: #fff;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        left: 0;
        position: fixed;
        text-align: center;
        top: 0;
        width: 100%;
        z-index: 3;
    }

    @media (min-width: 850px) {
        .titlebar {
            height: 80px;
            line-height: 80px;
            width: 180px;
        }
    }

    .menubar {
        background: #4db788;
        border-top: 2px solid #49996f;
        bottom: -1px;
        height: 41px;
        left: 0;
        position: fixed;
        width: 100%;
        z-index: 2;
    }

    @media (min-height: 550px) {
        .menubar {
            height: 71px;
        }
    }

    @media (min-width: 850px) {
        .menubar {
            border-top: none;
            flex-direction: column;
            height: auto;
            top: 80px;
            width: 180px;
        }
    }

</style>
