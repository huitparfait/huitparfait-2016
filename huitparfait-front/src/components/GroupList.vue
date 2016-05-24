<template>
    <div class="page--groupList">

        <div class="groupList">
            <a class="card group"
                    v-link="{ name: 'group', params: { groupId: 28478249, groupName: 'mes-potes-du-boulot' } }">
                <div class="group-avatar--wrapper">
                    <img class="group-avatar" src="http://placekitten.com/g/200/100" alt="">
                </div>
                <div class="group-infos">
                    <div class="group-name">Mes potes du boulot</div>
                    <div class="group-size"><strong>12</strong> joueurs</div>
                </div>
            </a>

            <a class="card group" v-link="{ name: 'group', params: { groupId: 24984294, groupName: 'la-famille' } }">
                <div class="group-avatar--wrapper">
                    <img class="group-avatar" src="http://placekitten.com/g/300/100" alt="">
                </div>
                <div class="group-infos">
                    <div class="group-name">La famille</div>
                    <div class="group-size"><strong>2</strong> joueurs</div>
                </div>
            </a>

            <a class="card group" v-link="{ name: 'group', params: { groupId: 53985395, groupName: 'le-club-de-foot' } }">
                <div class="group-avatar--wrapper">
                    <img class="group-avatar" src="http://placekitten.com/g/100/200" alt="">
                </div>
                <div class="group-infos">
                    <div class="group-name">Le club de foot que j'aime bcp et qui sont sympas</div>
                    <div class="group-size"><strong>17</strong> joueurs</div>
                </div>
            </a>

            <a class="card group" v-link="{ name: 'group', params: { groupId: 24984294, groupName: 'le-groupe-des-gens-forts-en-foot' } }">
                <div class="group-avatar--wrapper">
                    <img class="group-avatar" src="http://placekitten.com/g/350/100" alt="">
                </div>
                <div class="group-infos">
                    <div class="group-name">Le groupe des gens forts en foot</div>
                    <div class="group-size"><strong>2</strong> joueurs</div>
                </div>
            </a>

            <!-- this is a flexbox hack to allow nice wrapping -->
            <div class="card card--invisible"></div>
            <div class="card card--invisible"></div>
        </div>

        <div class="newGroup">
            <div class="newGroup-label">Créer un nouveau groupe :</div>

            <div class="card card--newGroup">
                <label class="group-nameInput--wrapper">
                    Nom du nouveau groupe :
                    <input v-model="name" type="text" class="group-nameInput" placeholder="Mes collègues">
                </label>
                <label class="group-avatarInput--wrapper">
                    Image du groupe (HTTPS uniquement) :
                    <input v-model="avatarUrl" type="text" class="group-avatarInput" placeholder="https://placekitten.com/g/100/200">
                </label>
                <button class="group-createBtn" @click="createGroup()">Créer</button>
            </div>
        </div>

    </div>
</template>

<script>

    export default {

        methods: {
            createGroup: function () {
                alert('bar')
            }
        }
    }

</script>

<style scoped>

    @media (min-width: 500px) {
        .page--groupList {
            padding: 15px 7px;
        }
    }

    .groupList {
        display: flex;
        flex-wrap: wrap;
    }

    .card {
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 5px;
        flex: 1 1 300px;
        padding: 15px;
    }

    @media (min-width: 500px) {
        .card {
            border: 1px solid #ddd;
            border-bottom-width: 2px;
            margin: 0 8px 15px 8px;
        }
    }

    .card.card--invisible {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        border-bottom-width: 0;
        border-top-width: 0;
    }

    .group {
        align-items: center;
        color: #4db788;
        display: flex;
        overflow: hidden;
        text-decoration: none;
    }

    .group-avatar--wrapper {
        border-radius: 3px;
        height: 70px;
        width: 70px;
        overflow: hidden;
    }

    @media (min-width: 850px) {
        .group-avatar--wrapper {
            height: 90px;
            width: 90px;
        }
    }

    .group-avatar {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
    }

    .group-infos {
        flex: 1 1 0;
        overflow: hidden;
        padding: 0 15px;
    }

    .group-name {
        font-size: 18px;
        font-weight: bold;
    }

    .group-size {
        color: #555;
        margin-top: 5px;
    }

    .card--newGroup {
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
    }

    .newGroup-label {
        color: #777;
        font-size: 20px;
        font-weight: bold;
        margin: 30px 8px 10px 8px;
    }

    .group-nameInput--wrapper,
    .group-avatarInput--wrapper {
        color: #777;
        font-style: italic;
        font-weight: bold;
        margin: 10px;
    }

    .group-nameInput,
    .group-avatarInput {
        background-color: #f9f9f9;
        border: none;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        font-size: 16px;
        padding: 10px 8px 8px 8px;
        margin-top: 5px;
        width: 100%;
    }

    .group-createBtn {
        background-color: #4db788;
        background-color: #4d88b7;
        border: 1px solid #496f99;
        border-bottom-width: 2px;
        border-radius: 3px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        padding: 8px 15px;
        margin: 10px;
        align-self: flex-end;
    }

</style>
