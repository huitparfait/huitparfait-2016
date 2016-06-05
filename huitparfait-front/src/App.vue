<template>
    <div class="main" :class="{ 'isDisconnected': user == null }">
        <title-bar class="titlebar" :class="{ 'isDisconnected': user == null }"></title-bar>
        <router-view></router-view>
        <menu-bar class="menubar" :class="{ 'isDisconnected': user == null }"></menu-bar>
    </div>
</template>

<script type="text/babel">
    import TitleBar from 'components/TitleBar'
    import MenuBar from 'components/MenuBar'

    export default {
        replace: false,
        components: {
            TitleBar,
            MenuBar,
        },
        data() {
            return {
                user: this.$select('user')
            }
        },
    }
</script>

<style scoped>

    .main {
        box-sizing: border-box;
        margin: 0 auto;
        padding: 32px 0 72px 0;
        max-width: 1400px;
        width: 100%;
    }

    .main.isDisconnected {
        padding-bottom: 0;
    }

    @media (min-width: 500px) {
        .main {
            padding: 47px 7px 72px 7px;
        }
    }

    @media (min-width: 850px) {
        .main {
            padding: 67px 7px 0 185px;
        }

        .main.isDisconnected {
            padding: 67px 7px 0 7px;
        }
    }

    .titlebar {
        background-color: #4db788;
        border-bottom: 2px solid #49996f;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        left: 0;
        position: fixed;
        text-align: center;
        top: 0;
        right: 0;
        z-index: 3;
    }

    @media (min-width: 850px) {
        .titlebar {
            height: 50px;
            left: 182px;
            line-height: 80px;
        }

        .titlebar.isDisconnected {
            left: 0;
        }
    }

    .menubar {
        border-top-style: solid;
        border-top-width: 2px;
        bottom: -1px;
        height: 41px;
        left: 0;
        position: fixed;
        width: 100%;
        z-index: 2;
    }

    .menubar.isDisconnected {
        display: none;
    }

    @media (min-height: 550px) {
        .menubar {
            height: 71px;
        }
    }

    @media (min-width: 850px) {
        .menubar {
            border-right-style: solid;
            border-right-width: 2px;
            border-top-style: none;
            border-top-width: 0;
            flex-direction: column;
            height: auto;
            top: 0;
            width: 180px;
        }
    }

</style>
