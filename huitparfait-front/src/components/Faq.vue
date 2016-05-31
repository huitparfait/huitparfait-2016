<template>
    <div class="page--faq">

        <div class="cardGroup">
            <div class="card card--welcome">
                <h2 class="card-title">Bienvenue !</h2>
                <p>Envie de pronostiquer des matchs entre amis ?</p>
                <p><strong>
                    Huit parfait</strong> remplace la bonne vieille feuille Excel partagée par un site accessible sur
                    ordinateur, tablette et téléphone pour le plaisir de tous.
                </p>
                <ol>
                    <li>Créez un ou plusieurs groupes</li>
                    <li>Invitez des amis</li>
                    <li>Pronostiquez les matchs</li>
                    <li>Surveillez le classement...</li>
                    <li>... et amusez vous bien ;-)</li>
                </ol>
            </div>
            <div class="card card--login">
                <h2 class="card-title">Connexion</h2>
                <p>
                    Pour vous éviter de créer un n-ième mot de passe, la connexion se fait avec un site externe.
                </p>
                <p class="card--login-allBtn">
                    <a class="loginBtn" href="/auth/facebook">avec Facebook</a>
                    <a class="loginBtn" href="/auth/google">avec Google</a>
                    <a class="loginBtn" href="/auth/yahoo">avec Yahoo</a>
                </p>
            </div>
        </div>

        <div class="cardGroup cardGroup--large">
            <div class="card card--small">
                <h2 class="card-title">Atteindre le Huit Parfait !</h2>

                <p>Le but du jeu est bien entendu d'avoir le plus gros ... score !</p>
                <p>
                    Pour chaque match, vous pouvez gagner jusqu'à 8 points : le fameux <strong>Huit Pafait</strong> !
                    Si vous êtes très mauvais, vous pouvez aussi perdre jusqu'à 3 points, ce qui n'est pas cool.
                </p>
                <p>Vous n'avez que 3 choses à pronostiquer :</p>
                <ol>
                    <li>Le nombre de buts de l'équipe A</li>
                    <li>Le nombre de buts de l'équipe B</li>
                    <li>Est-ce que la "risquette" va se réaliser ?</li>
                </ol>
            </div>
            <div class="card card--big">
                <h2 class="card-title">Comment gagner des points ?</h2>
                <p>
                    Pour gagner des points il faut être bon ... ou avoir beaucoup de chance.
                    Voici le détails :
                </p>
                <table class="table">
                    <tr>
                        <td>Issue du match trouvée (vainqueur ou match nul)</td>
                        <td class="scorePoints">3 pts</td>
                    </tr>
                    <tr>
                        <td>Nombre de buts de l'équipe A trouvé (hors <abbr title="Tirs Aux Buts">T.A.B.</abbr>)
                        </td>
                        <td class="scorePoints">1 pt</td>
                    </tr>
                    <tr>
                        <td>Nombre de buts de l'équipe B trouvé (hors <abbr title="Tirs Aux Buts">T.A.B.</abbr>)
                        </td>
                        <td class="scorePoints">1 pt</td>
                    </tr>
                    <tr>
                        <td>Risquette gagnée</td>
                        <td class="scorePoints">+1 à +3 pts</td>
                    </tr>
                    <tr>
                        <td>Risquette non jouée (poule mouillée)</td>
                        <td class="scorePoints">0 pt</td>
                    </tr>
                    <tr>
                        <td>Risquette perdue</td>
                        <td class="scorePoints">−1 à −3 pts</td>
                    </tr>
                    <tr class="totalPoints">
                        <td>TOTAL</td>
                        <td class="scorePoints">−3 à +8 pts</td>
                    </tr>
                </table>
                <p>
                    Si vous avez le nombre de buts exact pour les deux équipes et que vous gagnez la risquette maximum,
                    vous obtenez un <strong>Huit Parfait !</strong>
                </p>
            </div>
        </div>

        <div class="cardGroup">
            <div class="card">
                <h2 class="card-title">Mais au fait, c'est quoi une risquette ?</h2>
                <p>
                    Une risquette vous permet de "risquer" des points sur un fait de match prédéfini.
                </p>
                <p>
                    Par exemple, pour le match "France - Roumanie", on vous propose une affirmation telle que <strong>Les prolongations sont jouées</strong>.
                    À vous de pronostiquer si cette risquette sera VRAIE ou FAUSSE. Vous pouvez risquer de 1 à 3 points.
                    Si à la fin du match vous aviez raison, vous gagnez les points risqués, dans le cas contraire vous perdez les points (et votre honneur).
                </p>
                <p>
                    Si vous ne vous sentez pas l'âme d'un aventurier vous pouvez choisir de ne rien risquer.
                </p>
            </div>
        </div>
        <div class="cardGroup">
            <div class="card">
                <h2 class="card-title">Règles</h2>
                <p>
                    Vous devez soumettre votre pronostic au moins une minute avant le match.
                    Vous changer d'avis autant de fois que vous voulez avant.
                    C'est le dernier pronostic qui est enregistré.
                </p>
                <p>
                    L'éventuelle séance de tirs au but n'est pas comptée pour comparer le score à votre pronostic.
                    Par exemple, le match "France&nbsp;-&nbsp;Suisse" se termine avec
                    <strong>1&nbsp;-&nbsp;1</strong> à la fin des prolongations et la Suisse gagne la séance de tirs au but
                    <strong>3&nbsp;-&nbsp;2</strong>.
                </p>
                <ul>
                    <li>
                        Si vous pronostiquez <strong>0&nbsp;-&nbsp;0</strong>, <strong>1&nbsp;-&nbsp;1</strong>,
                        <strong>2&nbsp;-&nbsp;2</strong>... vous avez les 3 points pour <em>"issue du match trouvé"</em>.
                    </li>
                    <li>
                        Si vous pronostiquez
                        <strong>2&nbsp;-&nbsp;1</strong> pour la Suisse, même si celle-ci a gagnée le match aux tirs au but, vous n'avez pas les 3 points pour
                        <em>"issue du match trouvé"</em>.
                    </li>
                </ul>
            </div>
        </div>
        <div class="cardGroup">
            <div class="card">
                <h2 class="card-title">À propos du site</h2>
                <p>
                    Si vous avez la moindre remarque ou question sur le site, les règles etc... n'hésitez pas à contacter l'équipe.
                    Nous avons réalisé ce site sur notre temps libre pour nous amuser et si possible pour vous permettre de vous amuser aussi.
                    Il contient probablement quelques bugs, si c'est le cas, soyez indulgent et signalez les ;-)
                </p>
                <p>
                    Huit Parfait est un site de pronostics de foot entre amis.
                    Il ne s'agit en aucun cas d'un site de paris ou de jeux d'argent.
                </p>
                <p>
                    Si le site ne fonctionne pas bien sur votre navigateur, il faut peut-être le mettre à jour...
                </p>
                <p>
                    <a target="_self" href="mailto:huitparfait@gmail.com">huitparfait@gmail.com</a>
                    <a target="_self" href="https://twitter.com/huitparfait">@huitparfait</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>

    @media (min-width: 500px) {
        .page--faq {
            padding: 15px;
        }
    }

    @media (min-width: 850px) {
        .cardGroup {
            display: flex;
        }
    }

    .cardGroup.cardGroup--large {
        display: block;
    }

    @media (min-width: 1200px) {
        .cardGroup.cardGroup--large {
            display: flex;
        }
    }

    .card {
        background-color: #fff;
        flex: 1 1 50%;
        overflow: hidden;
        padding: 1px 20px 5px 20px;
    }

    @media (min-width: 500px) {
        .card {
            border: 1px solid #ddd;
            border-bottom-width: 2px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
    }

    @media (min-width: 850px) {
        .card:not(:first-child) {
            margin-left: 15px;
        }
    }

    @media (min-width: 850px) and (max-width: 1200px) {
        .cardGroup.cardGroup--large .card:not(:first-child) {
            margin-left: 0;
        }
    }

    .card.card--small {
        flex-basis: 45%;
    }

    .card.card--big {
        flex-basis: 55%;
    }

    .card.card--welcome {
        flex-basis: 100%;
    }

    .card--login {
        flex-basis: 400px;
        overflow: visible;
    }

    @media (min-width: 500px) and (max-width: 849px) {
        .card--login-allBtn {
            display: flex;
            justify-content: center;
        }
    }

    .loginBtn {
        background-color: #4d88b7;
        border: 1px solid #496f99;
        border-bottom-width: 2px;
        border-radius: 3px;
        color: #fff;
        display: block;
        font-weight: bold;
        padding: 8px 15px;
        margin: 20px 0;
        text-align: center;
        text-decoration: none;
        white-space: nowrap;
    }

    @media (min-width: 500px) and (max-width: 849px) {
        .loginBtn {
            margin: 0 10px;
        }
    }

    .card-title {
        color: #49996f;
    }

    ol,
    ul {
        padding-left: 25px;
    }

    abbr {
        cursor: help;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;
    }

    td {
        border-top: 1px solid #eee;
        padding: 5px 10px;
    }

    tr:nth-child(2n+1) td {
        background-color: #f9f9f9;
    }

    tr.totalPoints td {
        border-bottom: 1px dashed #aaa;
        border-top: 1px dashed #aaa;
        color: #333;
        font-weight: bold;
    }

    .scorePoints {
        color: #49996f;
        font-weight: bold;
        white-space: nowrap;
    }

</style>
