<template>
    <div class="page--profile">

        <div class="card card--editProfile">
            <label class="profile-nameInput--wrapper">
                Prénom et Nom :
                <input v-model="name" type="text" class="profile-nameInput" placeholder="Mes collègues">
            </label>
            <label class="profile-avatarInput--wrapper">
                Avatar (HTTPS uniquement) :
                <input v-model="avatarUrl" type="text" class="profile-avatarInput" placeholder="https://placekitten.com/g/100/200">
            </label>
            <label class="profile-isPublic--wrapper">
                Apparaître anonymement dans le classement général : <input v-model="isPublic" type="checkbox" class="profile-isPublic">
            </label>
            <button class="profile-createBtn">Mettre à jour le profil</button>
        </div>
    </div>

</template>

<script>
</script>

<style scoped>

    @media (min-width: 500px) {
        .page--profile {
            padding: 15px 7px;
        }
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

    .card--editProfile {
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
    }

    .profile-nameInput--wrapper,
    .profile-avatarInput--wrapper,
    .profile-isPublic--wrapper {
        color: #777;
        font-style: italic;
        font-weight: bold;
        margin: 10px;
    }

    .profile-nameInput,
    .profile-avatarInput {
        width: 100%;
    }

    .profile-nameInput,
    .profile-avatarInput,
    .profile-isPublic {
        background-color: #f9f9f9;
        border: none;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        font-size: 16px;
        padding: 10px 8px 8px 8px;
        margin-top: 5px;
    }

    .profile-createBtn {
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
