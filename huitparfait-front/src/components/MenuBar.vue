<template>

    <div class="menubar">
        <a class="menuitem" v-link="{ name: 'rankings', activeClass: 'menuitem--active' }">
            <img class="menuitem-icon" src="../assets/rankings.svg" alt="">
            <span class="menuitem-label">Classements</span>
        </a>
        <a class="menuitem" v-link="{ name: 'predictions', activeClass: 'menuitem--active' }">
            <img class="menuitem-icon" src="../assets/predictions.svg" alt="">
            <span class="menuitem-label">Pronostics</span>
        </a>
        <a class="menuitem" v-link="{ name: 'groupList', activeClass: 'menuitem--active' }">
            <img class="menuitem-icon" src="../assets/groups.svg" alt="">
            <span class="menuitem-label">Groupes</span>
        </a>
        <a class="menuitem" v-link="{ name: 'faq', activeClass: 'menuitem--active' }">
            <img class="menuitem-icon" src="../assets/faq.svg" alt="">
            <span class="menuitem-label">FAQ</span>
        </a>
        <a class="menuitem" v-link="{ name: 'profile', activeClass: 'menuitem--active' }">
            <img class="menuitem-icon" src="../assets/profile.svg" alt="">
            <span class="menuitem-label">Profil</span>
        </a>
    </div>

</template>

<style scoped>

    .menubar {
        background: #4db788;
        border-color: #49996f;
        color: #fff;
        display: flex;
    }

    .menuitem {
        align-items: center;
        color: #fff;
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        text-decoration: none;
        height: 100%;
    }

    .menuitem:hover {
        background-color: #4baf81;
    }

    .menuitem.menuitem--active {
        background-color: #49996f;
    }

    .menuitem-icon {
        height: 36px;
        margin: 5px 0;
        width: 36px;
        display: none;
    }

    @media (min-height: 550px) {
        .menuitem-icon {
            display: block;
        }
    }

    @media (min-width: 850px) {
        .menuitem-icon {
            height: 60px;
            width: 60px;
        }
    }

    .menuitem-label {
        font-size: 10px;
        font-size: 3vw;
        font-weight: bold;
        height: 24px;
        line-height: 24px;
        margin-bottom: 1px;
        width: 100%;
    }

    @media (min-width: 500px) {
        .menuitem-label {
            font-size: 15px;
        }
    }

    @media (min-width: 850px) {
        .menuitem-label {
            font-size: 16px;
            height: 30px;
            line-height: 30px;
        }
    }

</style>
