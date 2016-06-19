<template>

    <card class="rankedPlayer" :class="{ 'connectedPlayer': rankedPlayer.user.id === user.id }">
        <div class="rankingAvatar">
            <div class="ranking">{{ rankedPlayer.rank | rank }}</div>
            <div class="avatar--wrapper">
                <img class="avatar" :src="rankedPlayer.user.avatarUrl">
            </div>
        </div>
        <div class="nameDetails">
            <div class="name">{{ rankedPlayer.user.name }}</div>
            <div class="details">
                <div class="scorePronos">
                    <span class="score"><strong>{{ rankedPlayer.stats.totalScore }}</strong>{{ rankedPlayer.stats.totalScore | frenchPlural 'pt' }}</span>
                    <span class="with">avec</span>
                    <span class="pronos"><strong>{{ rankedPlayer.stats.nbPredictions }}</strong> {{ rankedPlayer.stats.nbPredictions | frenchPlural 'prono' }}</span>
                </div>
                <div class="perfects" :class="{ 'hidden': rankedPlayer.stats.nbPerfects === 0 }">
                    <strong>{{ rankedPlayer.stats.nbPerfects }}</strong> {{ rankedPlayer.stats.nbPerfects | frenchPlural 'huit parfait' }}
                </div>
            </div>
        </div>
    </card>

</template>

<script type="text/babel">

    export default {
        props: ['rankedPlayer'],
        data() {
            return {
                user: this.$select('user'),
            }
        },
    }

</script>

<style scoped>

    .rankedPlayer {
        align-items: center;
        display: flex;
        position: relative;
        overflow: hidden;
    }

    .rankedPlayer.connectedPlayer {
        background-color: #FFD:;
    }

    @media (min-width: 700px) {
        .rankedPlayer {
            padding: 0 15px !important;
        }
    }

    .rankingAvatar {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    @media (min-width: 700px) {
        .rankingAvatar {
            flex-direction: row;
            align-items: center;
        }
    }

    .ranking {
        color: #49996f;
        font-size: 16px;
        font-weight: bold;
        margin-right: 15px;
        margin-bottom: 5px;
    }

    @media (min-width: 700px) {
        .ranking {
            margin-bottom: 0;
            text-align: right;
            width: 80px;
        }
    }

    .avatar--wrapper {
        border-radius: 3px;
        height: 60px;
        margin-right: 15px;
        overflow: hidden;
        width: 60px;
    }

    @media (min-width: 700px) {
        .avatar--wrapper {
            border-radius: 0;
        }
    }

    .avatar {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
    }

    .nameDetails {
        overflow: hidden;
    }

    @media (min-width: 700px) {
        .nameDetails {
            display: flex;
            flex: 1 1 0;
        }
    }

    .name {
        color: #333;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media (min-width: 700px) {
        .name {
            flex: 1 1 0;
            margin-bottom: 0;
            overflow: visible;
            text-overflow: ellipsis;
            white-space: normal;
        }
    }

    .details {
        color: #777;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
    }

    @media (min-width: 700px) {
        .details {
            align-items: center;
            flex-direction: row;
            height: auto;
        }
    }

    @media (min-width: 700px) {
        .scorePronos {
            display: flex;
        }
    }

    .score {
        color: #333;
    }

    @media (min-width: 700px) {
        .score {
            display: block;
            text-align: right;
            width: 70px;
        }
    }

    @media (min-width: 700px) {
        .with {
            display: none;
        }
    }

    @media (min-width: 700px) {
        .pronos {
            display: block;
            text-align: right;
            width: 100px;
        }
    }

    .perfects {
        margin-top: 5px;
    }

    .perfects.hidden {
        display: none;
    }

    @media (min-width: 700px) {
        .perfects {
            margin-top: 0;
            text-align: right;
            width: 130px;
        }

        .perfects.hidden {
            display: block;
            visibility: hidden;
        }
    }

</style>
