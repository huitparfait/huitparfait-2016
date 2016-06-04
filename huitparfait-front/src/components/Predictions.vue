<template>
    <div class="page--predictions">

        <div class="games">
            <div class="card game"
                 v-for="game in games">

                <div class="game-header">
                    <div class="game-name">Groupe {{game.value.group}}</div>
                    <div class="game-location">{{game.value.stadium}} ({{game.value.city}})</div>
                </div>

                <div class="game-teams">
                    <div class="game-teams-section">
                        <img v-if="game.value.countryCodeTeamA" class="flag" :src="'/static/flags/' + game.value.countryCodeTeamA + '.svg'"/>
                        <img v-if="!game.value.countryCodeTeamA" class="flag unknownTeam" :src="'/static/flags/euro2016.svg'"/>
                        <div class="game-countryName">{{game.value.countryNameTeamA}}</div>
                    </div>
                    <div class="game-teams-section score">1 - 0</div>
                    <div class="game-teams-section time">18h</div>
                    <div class="game-teams-section">
                        <img v-if="game.value.countryCodeTeamB" class="flag" :src="'/static/flags/' + game.value.countryCodeTeamB + '.svg'"/>
                        <img v-if="!game.value.countryCodeTeamB" class="flag unknownTeam" :src="'/static/flags/euro2016.svg'"/>
                        <div class="game-countryName">{{game.value.countryNameTeamB}}</div>
                    </div>
                </div>

                <div class="game-inputs">
                    <div class="game-scoreInput">
                        <input v-model="game.value.predictionScoreTeamA" @change="enablePrediction(game)" class="game-scoreInputField" type="number" name="goalsTeamA" number />
                    </div>
                    <div class="game-scoreInput"><!-- Dummy element to align flex items --></div>
                    <div class="game-scoreInput">
                        <input v-model="game.value.predictionScoreTeamB" @change="enablePrediction(game)" class="game-scoreInputField" type="number" name="goalsTeamB" number />
                    </div>
                </div>

                <div class="game-risk">
                    <strong>Risquette : </strong><span class="game-risk-title">{{game.value.riskTitle}}</span>

                    <div class="game-risk-input">
                        <div class="game-risk-answer game-risk-trueOrFalse">
                            <div class="game-risk-answerHeader">Réponse</div>
                            <input v-model="game.value.predictionRiskAnswer" type="radio" :value="1" @change="enablePrediction(game)" name="riskAnswer{{game.value.gameId}}" id="yes{{game.value.gameId}}" /><label for="yes{{game.value.gameId}}">Vrai</label>
                            <input v-model="game.value.predictionRiskAnswer" type="radio" :value="-1" @change="enablePrediction(game)" name="riskAnswer{{game.value.gameId}}" id="no{{game.value.gameId}}" /><label for="no{{game.value.gameId}}">Faux</label>
                            <input v-model="game.value.predictionRiskAnswer" type="radio" :value="0" @change="enablePrediction(game)" name="riskAnswer{{game.value.gameId}}" id="dunno{{game.value.gameId}}" /><label for="dunno{{game.value.gameId}}">NSPP</label>
                        </div>
                        <div class="game-risk-answer game-risk-riskedPoints" :class="{ active: game.value.predictionRiskAnswer === 1 || game.value.predictionRiskAnswer === -1 }">
                            <div class="game-risk-answerHeader">Risquer</div>
                            <input v-model="game.value.predictionRiskAmount" type="radio" :value="1" @change="enablePrediction(game)" name="riskAmount{{game.value.gameId}}" id="riskAmount1{{game.value.gameId}}" /><label for="riskAmount1{{game.value.gameId}}">1 point</label>
                            <input v-model="game.value.predictionRiskAmount" type="radio" :value="2" @change="enablePrediction(game)" name="riskAmount{{game.value.gameId}}" id="riskAmount2{{game.value.gameId}}" /><label for="riskAmount2{{game.value.gameId}}">2 points</label>
                            <input v-model="game.value.predictionRiskAmount" type="radio" :value="3" @change="enablePrediction(game)" name="riskAmount{{game.value.gameId}}" id="riskAmount3{{game.value.gameId}}" /><label for="riskAmount3{{game.value.gameId}}">3 points</label>
                        </div>
                    </div>
                </div>

                <div class="game-submitZone">
                    <button class="game-submitZone-button" :class="{ saved: game.state.saved, disabled: !predictionIsValid(game) }" @click="savePrediction(game)">{{ game.state.saved ? 'Enregistré' : 'Enregistrer' }}</button>
                </div>

            </div>
        </div>

    </div>
</template>

<script type="text/babel">
    import * as WebApi from '../WebApi'
    import _ from 'lodash'

    export default {
        data() {
            return {
                games: undefined
            }
        },
        ready() {
            WebApi.fetchPredictions().then((games) => {
                this.games = _.map(games, gameValue => {
                    const savedState = gameValue.predictionScoreTeamA != null
                    return {
                        value: gameValue,
                        state: {
                            saved: savedState,
                        }
                    }
                });
            })
        },
        methods: {
            enablePrediction: function(game) {
                game.state.saved = false
            },
            disablePrediction: function(game) {
                game.state.saved = true
            },
            predictionIsValid: function(game) {
                return !isNaN(game.value.predictionRiskAnswer) &&
                    !isNaN(game.value.predictionRiskAmount) &&
                    !isNaN(game.value.predictionScoreTeamA) &&
                    !isNaN(game.value.predictionScoreTeamB)
            },
            savePrediction: function(game) {

                if (game.state.saved === true) {
                    return;
                }

                if (isNaN(game.value.predictionRiskAnswer) ||
                    isNaN(game.value.predictionRiskAmount) ||
                    isNaN(game.value.predictionScoreTeamA) ||
                    isNaN(game.value.predictionScoreTeamB)) {

                    return;
                }


                WebApi.savePrediction(game.value)
                .then(() => {
                    this.disablePrediction(game);
                })
                .catch(() => {
                    this.enablePrediction(game);
                });
            }
        }
    }
</script>

<style scoped>

    .games {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .game {
        flex: 1 1 500px;
    }

    .card {
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        margin-top: 20px;
        max-width: 500px;
        padding-bottom: 50px;
        position: relative;
    }

    @media (min-width: 500px) {
        .card {
            border: 1px solid #ddd;
            border-bottom-width: 2px;
            margin: 0 8px 15px 8px;
        }
    }

    .game-header {
        background: #eee;
        border-bottom: 1px solid #ddd;
        padding: 5px 15px;
    }

    .game-name {
        font-size: 13px;
        font-weight: bold;
    }

    .game-location {
        font-size: 13px;
        font-style: italic;
    }

    .game-time {
        color: #4db788;
        display: none;
        font-weight: bold;
    }

    .game-teams {
        border-bottom: 1px dashed #ddd;
        display: flex;
        flex-direction: row;
        padding: 25px 15px 15px 15px;
    }

    .game-teams-section {
        flex: 1 1 0;
        text-align: center;
    }

    .flag {
        border: 1px solid #DDD;
        border-bottom-width: 2px;
        border-radius: 5px;
        height: 80px;
        width: 80px;
    }

    .flag.unknownTeam {
        filter: grayscale(100%);
        opacity: 0.4;
        border: 0;
    }

    .game-countryName {
        color: #333;
        font-weight: bold;
    }

    .time,
    .score {
        color: #49996f;
        font-weight: bold;
        margin-top: 30px;
        font-size: 18px;
    }

    .score {
        display: none;
    }

    .game-inputs {
        border-bottom: 1px dashed #ddd;
        display: flex;
        flex-direction: row;
        padding: 15px;
    }

    .game-scoreInput {
        flex: 1 1 0;
    }

    .game-scoreInputField {
        border: 1px solid #ddd;
        border-bottom-width: 2px;
        display: block;
        font-size: 15px;
        height: 30px;
        margin: auto;
        text-align: center;
        width: 50px;
    }

    .game-scoreInputField::-webkit-inner-spin-button,
    .game-scoreInputField::-webkit-outer-spin-button {
        display: none;
    }

    .game-risk {
        padding: 15px;
    }

    .game-risk-title {
        font-style: italic;
    }

    .game-risk-input {
        font-size: 13px;
    }

    .game-risk-answer {
        line-height: 30px;
        margin-top: 5px;
        text-align: center;
    }

    @media (min-width: 500px) {

        .game-risk-input {
            display: flex;
        }

        .game-risk-answer {
            flex: 1 1 0;
        }
    }

    .game-risk-answerHeader {
        font-weight: bold;
    }

    .game-risk-answer input[type="radio"] {
        display: none;
    }

    .game-risk-answer label {
        background: #eee;
        border: 1px solid #ddd;
        border-bottom-width: 2px;
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        font-size: 13px;
        font-weight: bold;
        height: 25px;
        line-height: 25px;
        margin: 0 5px;
        min-width: 40px;
        overflow: hidden;
        padding: 5px;
        position: relative;
        text-align: center;
    }

    .game-risk-riskedPoints {
        opacity: 0.3;
    }

    .game-risk-riskedPoints.active {
        opacity: 1;
    }

    .game-risk-answer input[type="radio"]:checked + label {
        background: #4db788;
        border-color: #49996f;
        color: #fff;
    }

    .game-submitZone {
        background: #EEE;
        border-top: 1px solid #ddd;
        bottom: 0;
        height: 40px;
        left: 0;
        padding: 10px;
        position: absolute;
        right: 0;
    }

    .game-submitZone-button {
        background: #4db788;
        border: 1px solid #49996f;
        border-bottom-width: 2px;
        border-radius: 3px;
        color: #fff;
        display: block;
        font-weight: bold;
        margin: auto;
        padding: 10px;
    }

    .game-submitZone-button.disabled {
        background: #aaa;
        border-color: #999;
        opacity: 0.5;
    }

    .game-submitZone-button.saved {
        opacity: 0.5;
    }

</style>
