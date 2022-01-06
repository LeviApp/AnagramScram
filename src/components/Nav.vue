<template>
    <div class="nav" >
        <img src="../assets/anagramscramlogomain.png" alt="">
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
        width: 15%
    }

    h1 {
        font-size: 3rem;
        margin: 0;
    }
    
</style>