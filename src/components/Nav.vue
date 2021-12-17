<template>
    <img alt="Vue logo" src="../assets/anagramscramlogomain.png">
    <h1>AnagramScram</h1>
    <section>
        <a>Animals</a>
    </section>
</template>

<script>
    export default {
    name: 'Nav',
    props: {
    
    }
    ,
    methods: {
        testClick() {
            console.log("click is working")
        }
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