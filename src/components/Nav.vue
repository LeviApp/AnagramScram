<template>
    <div class="nav" >
        <img src="../assets/anagramscramlogomain.png" alt="AnagramScram logo">
        <h1>AnagramScram</h1>
        <section>
            <a>ANIMALS</a>
        </section>
    </div>
</template>

<script>
    export default {
    name: 'Nav',
    props: {
    
    }
    ,
    methods: {
    
    }
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center
    }

    section a {
        font-size: 1.25rem;
        color: blue;
    }

    img {
        min-width: 75px;
        width: 10%;
        max-width: 125px;
    }

    h1 {
        font-size: 2rem;
        margin: 0;
    }

    @media screen and (min-width: 640px) {
        h1 {
            font-size: 2.5rem;
        }
    }

    @media screen and (min-width: 1230px) {
        h1 {
            font-size: 3rem;
        }
    }

    
</style>