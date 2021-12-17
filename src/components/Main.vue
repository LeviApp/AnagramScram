<template>
    <div>
        <section class="top">
            <button :data-empty="letters.length === 0 && guess.length === 0 && gameover === false && level!=='∞'" @click="start()">Start</button>
            <button :data-empty="(letters.length === 0 && guess.length === 0 && gameover === true) || level==='∞'" @click="restart()">Restart</button>
            <h2>Time: {{seconds}}</h2>
            <section>
            <h2>Highscore: {{highscore}}</h2>
            <h2>Score: {{score}}</h2>
            <h2>Lives: {{lives}}</h2>
            <h2>Rearrange: {{rearrange}}</h2>
            <h2>Level: {{level}}</h2>

            </section>
        </section>
        <section class="game-area">
            <section :data-open="betweenLetters.length>=1 || level==='∞'" class="word extra">
                <h3 :data-open="betweenLetters.length>=1 || level==='∞'" :data-empty="betweenLetters[index][0] === ' '" :key="index" v-for="(betweenL,index) in betweenLetters">{{betweenLetters[index][0]}}</h3>
            </section>
            <section class="word">
                <h3 :data-open="letters[index][1]" :key="index" v-for="(letter,index) in letters" @click="guessLetter(index)">{{letters[index][0]}}</h3>
            </section>
            <section class="guess">
                <h3 :key="index" v-for="(letter,index) in guess">{{guess[index]}}</h3>
            </section>
            <button :data-empty="letters.length === 0" class="rearrange" :disabled='rearrange===0' @click="rearrangeLetters()">Rearrange</button>
            <button :data-empty="letters.length === 0 || guess.length === 0" class="reset" @click="reset()">Reset</button>
            <button :data-empty="letters.length === 0 || guess.length === 0" class="submit" @click="submitAnswer()">Submit</button>
        </section>
    </div>
</template>

<script>
    export default {
    name: 'Main',
      data: function() {
       return {
            seconds: 10000,
            timer: {},
            words: [
                        [
                            'DOG', 'PIG', 'RAT',
                            'COW', 'EMU', 'FOX',
                            'OWL', 'ELK', 'FLY',
                            'YAK'
                        ],
                        [
                            'TUNA', 'WORM',
                            'MULE', 'GOAT',
                            'FROG', 'LYNX',
                            'SWAN', 'DUCK',
                            'HAWK', 'TOAD'
                        ],
                        [
                            'EAGLE', 'TIGER',
                            'BISON', 'OTTER',
                            'SKUNK', 'CAMEL',
                            'MOUSE', 'KOALA',
                            'LEMUR', 'HORSE'
                        ],
                        [
                            'WALRUS', 'SPIDER',
                            'TURTLE', 'BABOON',
                            'DONKEY', 'JAGUAR',
                            'FALCON', 'BEETLE',
                            'LIZARD', 'HORNET'
                        ],
                        [
                            'OSTRICH', 'GIRAFFE',
                            'CHEETAH', 'OCTOPUS',
                            'CRICKET', 'PIRANHA',
                            'GAZELLE', 'PEACOCK',
                            'WARTHOG', 'GORILLA'
                        ],
                        [
                            'KANGAROO', 'SQUIRREL',
                            'ANTEATER', 'CHIPMUNK',
                            'FLAMINGO', 'MOSQUITO',
                            'SCORPION', 'GOLDFISH',
                            'PORPOISE', 'REINDEER'
                        ],
                        [
                            'CROCODILE', 'ARMADILLO',
                            'CENTIPEDE', 'PORCUPINE',
                            'TARANTULA', 'WOLVERINE',
                            'JELLYFISH', 'ALLIGATOR',
                            'ORANGUTAN', 'BUMBLEBEE'
                        ],
                        [
                            'JACKRABBIT', 'RHINOCEROS',
                            'WILDEBEEST', 'WOODPECKER',
                            'SALAMANDER', 'HERMITCRAB',
                            'TIMBERWOLF', 'CHIMPANZEE',
                            'HAMMERHEAD', 'BLOODHOUND'
                        ],
                        [
                            'CATERPILLAR',
                            'GRASSHOPPER',
                            'ELECTRICEEL',
                            'RATTLESNAKE',
                            'GILAMONSTER',
                            'KILLERWHALE',
                            'SNOWLEOPARD',
                            'GRIZZLYBEAR',
                            'HONEYBADGER',
                            'HUMMINGBIRD'
                        ],
                        [
                            'HIPPOPOTAMUS',
                            'MOUNTAINLION',
                            'WATERBUFFALO',
                            'ELEPHANTSEAL',
                            'BIGHORNSHEEP',
                            'SPOTTEDHYENA',
                            'HOWLERMONKEY',
                            'ROYALPENGUIN',
                            'KOMODODRAGON',
                            'RAINBOWTROUT'
                        ]
                    ],
            wordsReset: [
                        [
                            'DOG', 'PIG', 'RAT',
                            'COW', 'EMU', 'FOX',
                            'OWL', 'ELK', 'FLY',
                            'YAK'
                        ],
                        [
                            'TUNA', 'WORM',
                            'MULE', 'GOAT',
                            'FROG', 'LYNX',
                            'SWAN', 'DUCK',
                            'HAWK', 'TOAD'
                        ],
                        [
                            'EAGLE', 'TIGER',
                            'BISON', 'OTTER',
                            'SKUNK', 'CAMEL',
                            'MOUSE', 'KOALA',
                            'LEMUR', 'HORSE'
                        ],
                        [
                            'WALRUS', 'SPIDER',
                            'TURTLE', 'BABOON',
                            'DONKEY', 'JAGUAR',
                            'FALCON', 'BEETLE',
                            'LIZARD', 'HORNET'
                        ],
                        [
                            'OSTRICH', 'GIRAFFE',
                            'CHEETAH', 'OCTOPUS',
                            'CRICKET', 'PIRANHA',
                            'GAZELLE', 'PEACOCK',
                            'WARTHOG', 'GORILLA'
                        ],
                        [
                            'KANGAROO', 'SQUIRREL',
                            'ANTEATER', 'CHIPMUNK',
                            'FLAMINGO', 'MOSQUITO',
                            'SCORPION', 'GOLDFISH',
                            'PORPOISE', 'REINDEER'
                        ],
                        [
                            'CROCODILE', 'ARMADILLO',
                            'CENTIPEDE', 'PORCUPINE',
                            'TARANTULA', 'WOLVERINE',
                            'JELLYFISH', 'ALLIGATOR',
                            'ORANGUTAN', 'BUMBLEBEE'
                        ],
                        [
                            'JACKRABBIT', 'RHINOCEROS',
                            'WILDEBEEST', 'WOODPECKER',
                            'SALAMANDER', 'HERMITCRAB',
                            'TIMBERWOLF', 'CHIMPANZEE',
                            'HAMMERHEAD', 'BLOODHOUND'
                        ],
                        [
                            'CATERPILLAR',
                            'GRASSHOPPER',
                            'ELECTRICEEL',
                            'RATTLESNAKE',
                            'GILAMONSTER',
                            'KILLERWHALE',
                            'SNOWLEOPARD',
                            'GRIZZLYBEAR',
                            'HONEYBADGER',
                            'HUMMINGBIRD'
                        ],
                        [
                            'HIPPOPOTAMUS',
                            'MOUNTAINLION',
                            'WATERBUFFALO',
                            'ELEPHANTSEAL',
                            'BIGHORNSHEEP',
                            'SPOTTEDHYENA',
                            'HOWLERMONKEY',
                            'ROYALPENGUIN',
                            'KOMODODRAGON',
                            'RAINBOWTROUT'
                        ]
                    ],
letters: [],
gameover: false,
betweenWords: [],
betweenLetters: [["W", true], ["E", true], ["L", true], ["C", true], ["O", true], ["M", true], ["E", true], ["!", true]],
guess: [],
solution: "",
highscore: 0,
score: 0,
lives: 10,
rearrange: 10,
level: 1
        }
    },
    props: {
    
    },
    methods: {
        start() {
            console.log(this.wordsReset, this.words)

            if (this.score >= 500000) {
                this.seconds = 20000;
                this.rearrange = 20
            }
            else if (this.score >= 250000) {
                this.seconds = 15000;
                this.rearrange = 15
            }
            else {
                this.seconds = 10000;
                this.rearrange = 10;
            }
            this.betweenWords = [];
            this.betweenLetters = [];
            this.words[this.level-1].sort(() => Math.random() - 0.5)
            let word = this.words[this.level-1][0].split("")
            this.solution = this.words[this.level-1][0]
            for (let i = 0; i < word.length; i++) {
                this.letters.push([word[i], true])
                this.guess.push("")
            }
            this.letters.sort(() => Math.random() - 0.5)
            this.timer = window.setInterval(() => {
            this.changeSeconds()

            }, 1)
        },

        changeSeconds() {
            while (this.seconds > 0) {
            this.seconds = this.seconds - 1
            return this.seconds;
            }

            clearInterval(this.timer)

            if (this.lives > 0) {
                this.lives--

            }
            if (this.lives === 0) {
                    this.words = []
                    this.betweenWords = [["GAME OVER!"]]
                    this.gameover = true;
                    this.betweenLetters = [];
                    this.seconds = 0;
                    this.letters = []
                    this.guess = []
                    let word = this.betweenWords[0][0].split("")
                    for (let i = 0; i < word.length; i++) {
                    this.betweenLetters.push([word[i], true])
                    }

                    if (this.score > this.highscore) {
                        this.highscore = this.score
                    }
                    
                }
            else {
                this.letters = [];
                this.guess = [];
                this.rearrange = 10;
                this.start();

            }

        },

        clearClick() {
            clearInterval(this.timer)
        },

        guessLetter(val) {
            this.letters[val][1] = false;
            for (let i = 0; i<this.guess.length; i++) {
                if (this.guess[i] === "") {
                    this.guess[i] = this.letters[val][0];
                    break;
                } 
            }
        },

        reset() {
            this.letters.map(letter => letter[1] = true)

            for (let i = 0; i < this.guess.length; i++) {
                this.guess[i] = "";
            }
            
        },

        submitAnswer() {
            if (this.guess.join('') === this.solution) {
                this.clearClick()
                this.score+=this.seconds
                this.words[this.level-1].shift()
                this.letters = []
                this.guess = []
        
                this.betweenWords = [["GREAT JOB!"]]

                let word = this.betweenWords[0][0].split("")

                for (let i = 0; i < word.length; i++) {
                this.betweenLetters.push([word[i], true])
                }

                if (this.words[this.level-1].length === 0) {
                    this.level++
                    if (this.level === 11) {
                        this.level = "∞";
                        this.betweenWords = [["YOU WON!"]]
                        this.betweenLetters = []
                        let word = this.betweenWords[0][0].split("")

                        for (let i = 0; i < word.length; i++) {
                        this.betweenLetters.push([word[i], true])
                        }

                        if (this.score > this.highscore) {
                            this.highscore = this.score;
                        }
                    }
                }
                
            }
            else {
                this.lives--
                if (this.lives < 1) {
                    this.words = []
                    this.betweenWords = [["GAME OVER!"]]
                    this.gameover = true;
                    this.betweenLetters = [];
                    this.seconds = 0;

                    this.letters = []
                    this.guess = []
                    let word = this.betweenWords[0][0].split("")
                    for (let i = 0; i < word.length; i++) {
                    this.betweenLetters.push([word[i], true])
                    }
                }
            }
        },

        rearrangeLetters() {
            this.letters.sort(() => Math.random() - 0.5)
            if (this.lives !== 0) {
                this.rearrange--
            }
        },

        restart() {
                this.seconds = 10000;
                this.timer = {};
                this.words = [];
                this.score = 0;
                this.level = 1;
                this.lives = 10;
                this.gameover = false;
                this.betweenLetters = [["W", true], ["E", true], ["L", true], ["C", true], ["O", true], ["M", true], ["E", true], ["!", true]];
                this.letters = [];
                this.betweenWords = [];
                this.guess = [];
                this.solution = "";
                this.rearrange = 10;

                for (let i = 0; i < this.wordsReset.length; i++) {
                    this.words.push(this.wordsReset[i].slice())
                }
        }

    }
    }
</script>

<style scoped>

    @keyframes finished {
        0%   {opacity: 0; transform: rotateY(180deg); left: -100px}
        10%   {opacity: 0.5}
        50%  {opacity: 1; transform: rotateY(180deg); left: 100px}
        51%  {opacity: 1; transform: rotateY(0deg); left: 100px}
        90%  {opacity: 0.5}
        99%  {transform: rotateY(0deg)}
        100% {opacity: 0; transform: rotateY(180deg); left: -100px}
        } 

    div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 20px;
        height: 100%;
        background: deepskyblue
    }

    .top {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 20px;
    }

    .top  section{
        display: flex;
        flex-direction: column;
        align-items: flex-start
    }

    .top button[data-empty=true] {
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        background: black;
        color: darkgray;
    }

    .top button[data-empty=false] {
        display: none
    }

    .top button[data-empty=true]:hover {
        cursor: pointer;
        background: yellow;
        color: black;
        transition-duration: 1000ms
    }

    .top h2 {
        margin: 5px;
    }

    .game-area {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: auto;
        justify-content: center;
        width: 100%;
    }

    .game-area button[data-empty=false]:hover {
        cursor: pointer;
        background: yellow;
        color: black;
        transition-duration: 1000ms
    }

    .game-area .rearrange[data-empty=false] {
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        grid-row: 1;
        font-size: 1.5rem;
        cursor: pointer;
        background: black;
        color: darkgray;
    }

    .game-area .rearrange:disabled {
       pointer-events: none;
       opacity: 0.5;
    }

    .game-area .reset[data-empty=false] {
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        grid-row: 2;
        font-size: 1.5rem;
        cursor: pointer;
        background: black;
        color: darkgray;
    }

    .game-area .submit[data-empty=false] {
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        grid-row: 1 / span 2;
        font-size: 1.5rem;
        cursor: pointer;
        background: black;
        color: darkgray;
    }

    .game-area button[data-empty=true] {
        display: none;
    }

    .word {
        display: flex;
        justify-content: center;
        grid-row: 1;
        margin: 0;
    }
    .word h3[data-open=true] {
        background: yellow;
        padding: 20px;
        font-size: 2rem;
        margin: 5px;
        border-radius: 10px;
        width: 35px;
        height: 35px;
        cursor: pointer;
        border: 2px solid yellow;
    }

    .word h3[data-open=false] {
        background: black;
        padding: 20px;
        font-size: 2rem;
        margin: 5px;
        border-radius: 10px;
        width: 35px;
        height: 35px;
        pointer-events: none;
        transition-duration: 1000ms;
        border: 2px solid black;

    }

    .guess {
        display: flex;
        justify-content: center;
        grid-row: 2

    }

    .guess h3 {
        background: white;
        padding: 20px;
        font-size: 2rem;
        margin: 5px;
        border-radius: 10px;
        border: 2px dashed black;
        width: 35px;
        height: 35px;
        cursor: pointer;
    }

    .extra[data-open=false] {
        display: none;
    }

    .extra h3[data-open=true] {
        pointer-events: none
    }

    .extra h3[data-open=false] {
        display: none;
    }

    .extra h3[data-empty=true] {
        visibility: hidden;

    }

    .level-up[data-empty=false] {
        display: none;
    }

    .level-up[data-empty=true] {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: flex-start
    }
    .level-up img {
        opacity: 0;
        top: -125px;
        left: -100px;
        position: absolute;
        width: 200px;
        animation: finished 1000ms linear 2s infinite;

    }
</style>