<template>
    <div class="page--predictions">

        <div class="day"
             v-for="(gameDate, games) in gamesByDay">

            <card-title class="gameDate">{{gameDate | date}}</card-title>
            <card-list wide class="games">

                <card wide class="game" :class="{ 'game--submissionDisabled': isSubmissionClosed(game) }"
                      v-for="game in games">

                    <div class="game-header">
                        <div class="game-name">Groupe {{game.value.group}}</div>
                        <div class="game-location">{{game.value.stadium}} ({{game.value.city}})</div>
                    </div>

                    <div class="game-teams">
                        <div class="game-teams-section">
                            <img v-if="game.value.countryCodeTeamA" class="flag"
                                 :src="'/static/flags/' + game.value.countryCodeTeamA + '.svg'"/>
                            <img v-if="!game.value.countryCodeTeamA" class="flag unknownTeam"
                                 src="../assets/unknown-team.svg"/>
                            <div class="game-countryName">{{game.value.countryNameTeamA}}</div>
                        </div>
                        <div class="game-teams-section">
                            <span v-if="hasScore(game)" class="game-score">{{game.value.goalsTeamA}} - {{game.value.goalsTeamB}}</span>
                            <span v-if="!hasScore(game)" class="game-time">{{game.value.startsAt | time}}</span>
                        </div>
                        <div class="game-teams-section">
                            <img v-if="game.value.countryCodeTeamB" class="flag"
                                 :src="'/static/flags/' + game.value.countryCodeTeamB + '.svg'"/>
                            <img v-if="!game.value.countryCodeTeamB" class="flag unknownTeam"
                                 src="../assets/unknown-team.svg"/>
                            <div class="game-countryName">{{game.value.countryNameTeamB}}</div>
                        </div>
                    </div>

                    <div class="game-inputs">
                        <div class="game-scoreInput">
                            <input v-model="game.value.predictionScoreTeamA" @change="enablePrediction(game)"
                                   class="game-scoreInputField" type="number" name="goalsTeamA" number
                                   :disabled="isSubmissionClosed(game)"/>
                        </div>
                        <div class="game-scoreInput"><!-- Dummy element to align flex items --></div>
                        <div class="game-scoreInput">
                            <input v-model="game.value.predictionScoreTeamB" @change="enablePrediction(game)"
                                   class="game-scoreInputField" type="number" name="goalsTeamB" number
                                   :disabled="isSubmissionClosed(game)"/>
                        </div>
                    </div>

                    <div class="game-risk">
                        <strong>Risquette : </strong><span class="game-risk-title">{{game.value.riskTitle}}</span>

                        <div class="game-risk-input">
                            <div class="game-risk-answer game-risk-trueOrFalse">
                                <div class="game-risk-answerHeader">Réponse</div>

                                <div class="game-risk-answerChoiceGroup">
                                    <div class="game-risk-answerChoice">
                                        <input v-model="game.value.predictionRiskAnswer" type="radio" :value="true"
                                               @change="enablePrediction(game)" name="riskAnswer{{game.value.gameId}}"
                                               id="yes{{game.value.gameId}}"
                                               :disabled="isSubmissionClosed(game)"/>
                                        <label for="yes{{game.value.gameId}}">VRAI</label>
                                    </div>

                                    <div class="game-risk-answerChoice">
                                        <input v-model="game.value.predictionRiskAnswer" type="radio" :value="false"
                                               @change="enablePrediction(game)" name="riskAnswer{{game.value.gameId}}"
                                               id="no{{game.value.gameId}}"
                                               :disabled="isSubmissionClosed(game)"/>
                                        <label for="no{{game.value.gameId}}">FAUX</label>
                                    </div>

                                    <div class="game-risk-answerChoice noAnswer">
                                        <input v-model="game.value.predictionRiskAnswer" type="radio" :value="null"
                                               @change="enablePrediction(game)" name="riskAnswer{{game.value.gameId}}"
                                               id="dunno{{game.value.gameId}}"
                                               :disabled="isSubmissionClosed(game)"/>
                                        <label for="dunno{{game.value.gameId}}">Je ne sais pas</label>
                                    </div>
                                </div>
                            </div>
                            <div class="game-risk-answer game-risk-riskedPoints">
                                <div class="game-risk-answerHeader">Risquer</div>
                                <div class="game-risk-answerNoRisk" v-show="game.value.predictionRiskAnswer == null">
                                    Vous&nbsp;avez&nbsp;choisi&nbsp;de ne&nbsp;rien&nbsp;risquer
                                </div>
                                <div v-show="game.value.predictionRiskAnswer != null"
                                     class="game-risk-answerChoiceGroup">
                                    <div class="game-risk-answerChoice">
                                        <input v-model="game.value.predictionRiskAmount" type="radio" :value="1"
                                               @change="enablePrediction(game)" name="riskAmount{{game.value.gameId}}"
                                               id="riskAmount1{{game.value.gameId}}"
                                               :disabled="isSubmissionClosed(game)"/>
                                        <label for="riskAmount1{{game.value.gameId}}">1 pt</label>
                                    </div>

                                    <div class="game-risk-answerChoice">
                                        <input v-model="game.value.predictionRiskAmount" type="radio" :value="2"
                                               @change="enablePrediction(game)" name="riskAmount{{game.value.gameId}}"
                                               id="riskAmount2{{game.value.gameId}}"
                                               :disabled="isSubmissionClosed(game)"/>
                                        <label for="riskAmount2{{game.value.gameId}}">2 pts</label>
                                    </div>

                                    <div class="game-risk-answerChoice">
                                        <input v-model="game.value.predictionRiskAmount" type="radio" :value="3"
                                               @change="enablePrediction(game)" name="riskAmount{{game.value.gameId}}"
                                               id="riskAmount3{{game.value.gameId}}"
                                               :disabled="isSubmissionClosed(game)"/>
                                        <label for="riskAmount3{{game.value.gameId}}">3 pts</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="game-submitZone">
                        <btn :inactive="game.state.saved || !predictionIsValid(game)" class="game-submitZone-button"
                             :class="{ saved: game.state.saved, disabled: !predictionIsValid(game) }"
                             @click="savePrediction(game)"
                             :disabled="isSubmissionClosed(game)">Enregistrer
                        </btn>
                        <img class="game-savedTick" src="../assets/tick.svg" alt="Pronostic sauvegardé"/>
                    </div>

                </card>
            </card-list>
        </div>

    </div>
</template>

<script type="text/babel">
    import * as WebApi from '../WebApi'

    import Btn from './Btn'
    import CardList from './CardList'
    import Card from './Card'
    import CardTitle from './CardTitle'

    import _ from 'lodash'
    import moment from 'moment'

    moment.locale('fr')

    export default {
        components: {
            Btn,
            CardList,
            Card,
            CardTitle,
        },
        data() {
            return {
                gamesByDay: undefined
            }
        },
        ready() {
            WebApi.fetchPredictions().then((games) => {
                this.gamesByDay = _(games)
                    .groupBy(game => {
                        return moment(game.startsAt).startOf('day');
                    })
                    .mapValues(gamesForDay => {
                        return _(gamesForDay)
                            .map(gameForDay => {

                                // Initialize amount of risked points to the maximum
                                gameForDay.predictionRiskAmount = gameForDay.predictionRiskAmount || 3;

                                const savedState = gameForDay.predictionScoreTeamA != null
                                return {
                                    value: gameForDay,
                                    state: {
                                        saved: savedState,
                                    }
                                }
                            })
                            .value();

                    })
                    .value();
            })
        },
        methods: {
            hasScore: function (game) {
                return game.value.goalsTeamA != null &&
                    game.value.goalsTeamB != null;
            },
            enablePrediction: function (game) {
                game.state.saved = false
            },
            disablePrediction: function (game) {
                game.state.saved = true
            },
            isSubmissionClosed: function (game) {
                return moment(game.value.startsAt).isBefore(Date.now());
            },
            predictionIsValid: function (game) {
                // Wrong value types in fields
                if (isNaN(game.value.predictionRiskAmount) ||
                    isNaN(game.value.predictionScoreTeamA) ||
                    isNaN(game.value.predictionScoreTeamB)) {
                    return false;
                }

                // No risk amount selected even though an answer to the risk is provided
                if (game.value.predictionRiskAnswer != null &&
                    game.value.predictionRiskAmount <= 0) {
                    return false;
                }

                return true;
            },
            savePrediction: function (game) {
                if (game.state.saved === true || !this.predictionIsValid(game)) {
                    return;
                }

                const prediction = {
                    gameId: game.value.gameId,
                    predictionScoreTeamA: game.value.predictionScoreTeamA,
                    predictionScoreTeamB: game.value.predictionScoreTeamB,
                    predictionRiskAnswer: game.value.predictionRiskAnswer,
                    predictionRiskAmount: game.value.predictionRiskAnswer != null ? game.value.predictionRiskAmount : 0,
                }

                WebApi.savePrediction(prediction)
                    .then(() => {
                        this.disablePrediction(game);
                    })
                    .catch(() => {
                        this.enablePrediction(game);
                    });
            }
        },
        filters: {
            date: function (gameTime) {
                return moment(gameTime).format('dddd Do MMMM')
            },
            time: function (gameTime) {
                return moment(gameTime).format('HH[h]mm')
            }
        }
    }
</script>

<style scoped>

    .gameDate {
        text-transform: capitalize;
    }

    .card.game {
        background-color: #fff;
        border-bottom: 2px solid #ddd;
        box-sizing: border-box;
        margin-bottom: 15px;
        overflow: hidden;
        padding: 0;
        padding-bottom: 60px;
        position: relative;
    }

    @media (min-width: 500px) {
        .game {
            border: 1px solid #ddd;
            border-bottom-width: 2px;
            border-radius: 5px;
            margin: 0 8px 15px 8px;
        }
    }

    .game-header {
        background: #eee;
        border-bottom: 1px solid #ddd;
        padding: 5px 15px;
    }

    .game-name {
        font-size: 15px;
        font-weight: bold;
    }

    .game-location {
        font-size: 15px;
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

    .game-countryName {
        color: #333;
        font-weight: bold;
    }

    .game-time,
    .game-score {
        display: inline-block;
        font-weight: bold;
        margin-top: 25px;
        padding: 5px 15px;
    }

    .game-time {
        color: #555;
        font-size: 18px;
    }

    .game-score {
        color: #49996f;
        font-size: 20px;
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

    .game--submissionDisabled .game-scoreInputField {
        background: #DDD;
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
        padding: 10px;
        text-align: center;
    }

    .game--submissionDisabled .game-risk-answer {
        opacity: 0.5;
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
        margin-bottom: 10px;
    }

    .game-risk-answerNoRisk {
        padding: 0 15px;
    }

    .game-risk-answerChoiceGroup {
        display: flex;
    }

    .game-risk-answerChoice {
        flex: 1 1 0;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        margin: 0;
        padding: 0;
    }

    .game-risk-answerChoice.noAnswer {
        flex: 2 1 0;
    }

    .game-risk-answer input[type="radio"] {
        display: none;
    }

    .game-risk-answer label {
        background: #eee;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-bottom-width: 2px;
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;
        user-select: none;
        width: 100%;
        display: inline-block;
    }

    .game-risk-answer input[type="radio"]:checked + label {
        background: #AAA;
        border-color: #999;
        color: #fff;
    }

    .game-submitZone {
        border-top: 1px dashed #ddd;
        bottom: 0;
        height: 35px;
        left: 0;
        padding: 10px;
        position: absolute;
        right: 0;
    }

    @media (min-width: 500px) {
        .game-submitZone {
            background: #EEE;
            border-top-style: solid;
        }
    }

    .btn.game-submitZone-button {
        background: #4db788;
        border-color: #49996f;
        color: #fff;
        display: block;
        margin: auto;
    }

    .game--submissionDisabled .game-submitZone-button {
        display: none;
    }

    .game-savedTick {
        height: 20px;
        width: 20px;
        position: absolute;
        right: 0;
        bottom: 0;
    }


</style>
