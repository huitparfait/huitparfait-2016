<template>
    <div class="page--predictions">

        <div class="predictions">
            <div class="card prediction"
                 v-for="prediction in predictions">

                <div class="prediction-header">
                    <div class="prediction-gameName">Groupe {{prediction.group}}</div>
                    <div class="prediction-gameLocation">{{prediction.stadium}} ({{prediction.city}})</div>
                </div>

                <div class="prediction-teams">
                    <div class="prediction-teams-section">
                        <img class="flag" :src="'/static/flags/' + prediction.countryCodeTeamA + '.svg'"/>
                        <div class="prediction-countryName">{{prediction.countryNameTeamA}}</div>
                    </div>
                    <div class="prediction-teams-section score">1 - 0</div>
                    <div class="prediction-teams-section time">18h</div>
                    <div class="prediction-teams-section">
                        <img class="flag" :src="'/static/flags/' + prediction.countryCodeTeamB + '.svg'"/>
                        <div class="prediction-countryName">{{prediction.countryNameTeamB}}</div>
                    </div>
                </div>

                <div class="prediction-inputs">
                    <div class="prediction-scoreInput">
                        <input class="prediction-scoreInputField" type="text" name="goalsTeamA"/>
                    </div>
                    <div class="prediction-scoreInput"><!-- Dummy element to align flex items --></div>
                    <div class="prediction-scoreInput">
                        <input class="prediction-scoreInputField" type="text" name="goalsTeamB"/>
                    </div>
                </div>

                <div class="prediction-risk">
                    <strong>Risquette : </strong><span class="prediction-risk-title">{{prediction.riskTitle}}</span>

                    <div class="prediction-risk-input">
                        <div class="prediction-risk-answer prediction-risk-trueOrFalse">
                            <div class="prediction-risk-answerHeader">Réponse</div>
                            <input type="radio" name="answer" id="yes" value="1"/><label for="yes">Vrai</label>
                            <input type="radio" name="answer" id="no" value="-1"/><label for="no">Faux</label>
                            <input type="radio" name="answer" id="dunno" value="0"/><label for="dunno">NSPP</label>
                        </div>
                        <div class="prediction-risk-answer prediction-risk-riskedPoints">
                            <div class="prediction-risk-answerHeader">Miser</div>
                            <input type="radio" name="risk" id="risk1" value="1"/><label for="risk1">1 point</label>
                            <input type="radio" name="risk" id="risk2" value="2"/><label for="risk2">2 points</label>
                            <input type="radio" name="risk" id="risk3" value="3"/><label for="risk3">3 points</label>
                        </div>
                    </div>
                </div>

                <div class="prediction-submitZone">
                    <button class="prediction-submitZone-button">Enregistrer</button>
                </div>

            </div>
        </div>

    </div>
</template>

<script type="text/babel">
  import * as WebApi from '../WebApi'

  export default {
    data() {
      return {
        predictions: undefined
      }
    },
    ready() {
      WebApi.fetchGames().then((games) => {
        this.predictions = games
      })
    },
    methods: {}
  }
</script>

<style scoped>

    .games {
        align-items: stretch;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .prediction {
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

    .prediction-header {
        background: #eee;
        border-bottom: 1px solid #ddd;
        padding: 5px 15px;
    }

    .prediction-gameName {
        font-size: 13px;
        font-weight: bold;
    }

    .prediction-gameLocation {
        font-size: 13px;
        font-style: italic;
    }

    .prediction-time {
        color: #4db788;
        display: none;
        font-weight: bold;
    }

    .prediction-teams {
        border-bottom: 1px dashed #ddd;
        display: flex;
        flex-direction: row;
        padding: 25px 15px 15px 15px;
    }

    .prediction-teams-section {
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

    .prediction-countryName {
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

    .prediction-inputs {
        border-bottom: 1px dashed #ddd;
        display: flex;
        flex-direction: row;
        padding: 15px;
    }

    .prediction-scoreInput {
        flex: 1 1 0;
    }

    .prediction-scoreInputField {
        border: 1px solid #ddd;
        border-bottom-width: 2px;
        display: block;
        font-size: 15px;
        height: 30px;
        margin: auto;
        text-align: center;
        width: 50px;
    }

    .prediction-risk {
        padding: 15px;
    }

    .prediction-risk-title {
        font-style: italic;
    }

    .prediction-risk-input {
        font-size: 13px;
    }

    .prediction-risk-answer {
        line-height: 30px;
        margin-top: 5px;
        text-align: center;
    }

    @media (min-width: 500px) {

        .prediction-risk-input {
            display: flex;
        }

        .prediction-risk-answer {
            flex: 1 1 0;
        }
    }

    .prediction-risk-answerHeader {
        font-weight: bold;
    }

    .prediction-risk-answer input[type="radio"] {
        display: none;
    }

    .prediction-risk-answer label {
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

    .prediction-risk-riskedPoints {
        opacity: 0.3;
    }

    .prediction-risk-answer input[type="radio"]:checked + label {
        background: #4db788;
        border-color: #49996f;
        color: #fff;
    }

    .prediction-submitZone {
        background: #EEE;
        border-top: 1px solid #ddd;
        bottom: 0;
        height: 40px;
        left: 0;
        padding: 10px;
        position: absolute;
        right: 0;
    }

    .prediction-submitZone-button {
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

</style>
