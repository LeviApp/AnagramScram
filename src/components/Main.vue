<template>
    <div>
        <section class="top">
            <button :data-empty="letters.length === 0 && guess.length === 0 && gameover === false && level!=='∞'"
                @click="start()">Start</button>
            <button :data-empty="(letters.length === 0 && guess.length === 0 && gameover === true) || level==='∞'"
                @click="restart()">Restart</button>
            <h2>Time: {{seconds}}</h2>
            <section>
                <h2>Highscore: {{highscore}}</h2>
                <h2>Score: {{score}}</h2>
                <h2>Lives: {{lives}}</h2>
                <h2>Rearrange: {{rearrange}}</h2>
                <h2>Level: {{level}}</h2>
            </section>
            <section class="options">
                <h2>Check:</h2>
                <section>
                    <input type="radio" name="check" value="never" checked=true @click="changeVal()">
                    <h3>Never</h3>
                    <input type="radio" name="check" value="submit" @click="changeVal()">
                    <h3>On Submit</h3>
                    <input type="radio" name="check" value="select" @click="changeVal()">
                    <h3>On Select</h3>
                </section>
            </section>
            <section class="options">
                <h2>Reset:</h2>
                <section>
                    <input type="radio" name="reset" value="all" checked=true @click="changeVal()">
                    <h3>All</h3>
                    <input type="radio" name="reset" value="incorrect" @click="changeVal()">
                    <h3>Incorrect</h3>
                </section>
            </section>
        </section>
        <section class="game-area">
            <section class="word-play">
                <section :data-open="betweenLetters.length>=1 || level==='∞'" class="word extra">
                    <h3 :data-open="betweenLetters.length>=1 || level==='∞'"
                        :data-empty="betweenLetters[index][0] === ' '" :key="index"
                        v-for="(betweenL,index) in betweenLetters">{{betweenLetters[index][0]}}</h3>
                </section>
                <section class="word">
                    <button :data-open="letters[index][1]" :key="index" v-for="(letter,index) in letters"
                        @click="guessLetter(index)">{{letters[index][0]}}</button>
                </section>
                <section class="guess">
                    <h3 :key="index"
                        :class="(guess[index].length === 0 || diff === 3) ? '' : (diff === 1 && guess[index] === solution[index]) ? 'right' : diff === 1 && guess[index] !== solution[index] ? 'wrong' : !submitted ? '' : guess[index] === solution[index] ? 'right' : 'wrong'"
                        v-for="(letter,index) in guess">{{guess[index]}}</h3>
                </section>
            </section>
            <section class="button-group">
                <button :data-empty="letters.length === 0" class="rearrange" :disabled='rearrange===0'
                    @click="rearrangeLetters()">Rearrange</button>
                <button :data-empty="letters.length === 0 || guess.length === 0" class="reset"
                    @click="reset()">Reset</button>
            </section>
            <button :data-empty="letters.length === 0 || guess.length === 0" class="submit"
                @click="submitAnswer()">Submit</button>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        data: function () {
            return {
                seconds: Number(localStorage.getItem('seconds')) || 10000,
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
                betweenLetters: [
                    ["W", true],
                    ["E", true],
                    ["L", true],
                    ["C", true],
                    ["O", true],
                    ["M", true],
                    ["E", true],
                    ["!", true]
                ],
                guess: [],
                solution: "",
                highscore: Number(localStorage.getItem('highscore')) || 0,
                score: Number(localStorage.getItem('score')) || 0,
                lives: Number(localStorage.getItem('lives')) || 10,
                rearrange: Number(localStorage.getItem('rearrange')) || 10,
                submitted: false,
                level: Number(localStorage.getItem('level')) || 1,
                diff: 3,
                resetter: 1,
                currentWords: JSON.parse(localStorage.getItem("currentWords")) || []
            }
        },
        props: {

        },
        methods: {
            start() {
                if (localStorage.getItem("currentWords") === null) {
                    this.currentWords = [
                        'DOG', 'PIG', 'RAT',
                        'COW', 'EMU', 'FOX',
                        'OWL', 'ELK', 'FLY',
                        'YAK'
                    ]
                }
                else {
                    if (this.currentWords.length === 0) {
                        this.currentWords = this.words[this.level - 1];
                    }
                }
                this.submitted = false
                if (this.score >= 500000) {
                    this.seconds = 20000;
                    this.rearrange = 20
                } else if (this.score >= 250000) {
                    this.seconds = 15000;
                    this.rearrange = 15
                } else {
                    this.seconds = 10000;
                    this.rearrange = 10;
                }
                this.betweenWords = [];
                this.betweenLetters = [];
                this.currentWords.sort(() => Math.random() - 0.5)
                let word = this.currentWords[0].split("")
                this.solution = this.currentWords[0].split("")
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
                    this.betweenWords = [
                        ["GAME OVER!"]
                    ]
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
                        localStorage.setItem('seconds', 10000);
                        localStorage.setItem('rearrange', 10);
                        localStorage.setItem('highscore', this.highscore);
                        localStorage.setItem('score', 0);
                        localStorage.setItem('lives', 10);
                        localStorage.setItem('level', 1);
                        localStorage.setItem('currentWords', JSON.stringify([
                        'DOG', 'PIG', 'RAT',
                        'COW', 'EMU', 'FOX',
                        'OWL', 'ELK', 'FLY',
                        'YAK'
                    ]));
                } else {
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
                for (let i = 0; i < this.guess.length; i++) {
                    if (this.guess[i] === "") {
                        this.guess[i] = this.letters[val][0];
                        break;
                    }
                }
            },

            reset() {
                this.submitted = false
                if (this.resetter === 1) {
                    this.letters.map(letter => letter[1] = true)
                    for (let i = 0; i < this.guess.length; i++) {
                        this.guess[i] = "";
                    }
                }
                else {
                    let cor = {};
                    for (let i = 0; i < this.guess.length; i++) {
                        if (this.guess[i] === this.solution[i]) {
                            if (cor[this.guess[i]] === undefined) {
                                cor[this.guess[i]] = 1;
                            } else {
                                cor[this.guess[i]]++;
                            }
                        } else {
                            this.letters[i][1] = true;
                            this.guess[i] = "";
                        }
                    }

                    for (let i = 0; i < this.letters.length; i++) {
                    if (cor[this.letters[i][0]] !== undefined && cor[this.letters[i][0]] > 0) {
                        cor[this.letters[i][0]]--
                        this.letters[i][1] = false;
                    } else {
                        this.letters[i][1] = true;
                    }
                    }
                }
            },

            submitAnswer() {
                this.submitted = true
                if (this.guess.join('') === this.solution.join('')) {
                    this.clearClick()
                    this.score += this.seconds
                    this.currentWords.shift()
                    this.letters = []
                    this.guess = []

                    this.betweenWords = [
                        ["GREAT JOB!"]
                    ]

                    let word = this.betweenWords[0][0].split("")

                    for (let i = 0; i < word.length; i++) {
                        this.betweenLetters.push([word[i], true])
                    }

                    if (this.currentWords.length === 0) {
                        this.level++
                        if (this.level === 11) {
                            this.level = "∞";
                            this.betweenWords = [
                                ["YOU WON!"]
                            ]
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

                } else {
                    this.lives--
                    if (this.lives < 1) {
                        this.words = []
                        this.betweenWords = [
                            ["GAME OVER!"]
                        ]
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

                if (this.level === "∞" || this.lives === 0) {
                    localStorage.setItem('seconds', 10000);
                    localStorage.setItem('rearrange', 10);
                    localStorage.setItem('highscore', this.highscore);
                    localStorage.setItem('score', 0);
                    localStorage.setItem('lives', 10);
                    localStorage.setItem('level', 1);
                    localStorage.setItem('currentWords', JSON.stringify([
                    'DOG', 'PIG', 'RAT',
                    'COW', 'EMU', 'FOX',
                    'OWL', 'ELK', 'FLY',
                    'YAK']));
                }

                else {
                    if (this.score < 250000) {
                        localStorage.setItem('seconds', 10000);
                        localStorage.setItem('rearrange', 10);
                    }
                    else if (this.score < 500000) {
                        localStorage.setItem('seconds', 15000);
                        localStorage.setItem('rearrange', 15);
                    }
                    else {
                        localStorage.setItem('seconds', 20000);
                        localStorage.setItem('rearrange', 20);
                    }
                    localStorage.setItem('highscore', this.highscore);
                    localStorage.setItem('score', this.score);
                    localStorage.setItem('lives', this.lives);
                    localStorage.setItem('level', this.level);
                    if (this.currentWords.length === 0) {
                        localStorage.setItem('currentWords', JSON.stringify(this.words[this.level - 1]));
                    }
                    else {
                        localStorage.setItem('currentWords', JSON.stringify(this.currentWords));
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
                this.betweenLetters = [
                    ["W", true],
                    ["E", true],
                    ["L", true],
                    ["C", true],
                    ["O", true],
                    ["M", true],
                    ["E", true],
                    ["!", true]
                ];
                this.letters = [];
                this.betweenWords = [];
                this.guess = [];
                this.solution = "";
                this.rearrange = 10;

                for (let i = 0; i < this.wordsReset.length; i++) {
                    this.words.push(this.wordsReset[i].slice())
                }
                    this.currentWords = [
                        'DOG', 'PIG', 'RAT',
                        'COW', 'EMU', 'FOX',
                        'OWL', 'ELK', 'FLY',
                        'YAK'
                    ]
            },

            changeVal() {
                if (event.target.value === "never") {
                    this.diff = 3;
                }
                else if (event.target.value === "submit") {
                    this.diff = 2;
                }
                else if (event.target.value === "select") {
                    this.diff = 1;
                }
                else if (event.target.value === "all") {
                    this.resetter = 1;
                }
                else {
                    this.resetter = 0;
                }
            }



        }
    }
</script>

<style scoped>
    @keyframes finished {
        0% {
            opacity: 0;
            transform: rotateY(180deg);
            left: -100px
        }

        10% {
            opacity: 0.5
        }

        50% {
            opacity: 1;
            transform: rotateY(180deg);
            left: 100px
        }

        51% {
            opacity: 1;
            transform: rotateY(0deg);
            left: 100px
        }

        90% {
            opacity: 0.5
        }

        99% {
            transform: rotateY(0deg)
        }

        100% {
            opacity: 0;
            transform: rotateY(180deg);
            left: -100px
        }
    }

    div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        height: 100%;
        background: deepskyblue
    }

    input {
        display: inline;
    }

    .top {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
        margin-left: 20px;
        align-self: flex-start;
    }

    .top section {
        display: flex;
        flex-direction: column;
        align-items: flex-start
    }

    .top .options {
        flex-direction: column;
        justify-content: center;
    }

    .top .options section {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    h3 {
        margin: 0px 5px;
        font-size: 1rem;
    }

    .top button[data-empty=true] {
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        background: black;
        color: yellow;
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
        font-size: 1.25rem;
    }

    .game-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
        margin: 20px 0;

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
        margin-right: 5px;
        grid-row: 1;
        font-size: 1.25rem;
        cursor: pointer;
        background: black;
        color: yellow;
        width: 100%;
    }

    .game-area .rearrange:disabled {
        pointer-events: none;
        opacity: 0.5;
        width: 100%
    }

    .game-area .reset[data-empty=false] {
        border-radius: 10px;
        padding: 20px;
        margin: 0px;
        grid-row: 2;
        font-size: 1.25rem;
        cursor: pointer;
        width: 100%;
        background: black;
        color: yellow;
    }

    .game-area .submit[data-empty=false] {
        border-radius: 10px;
        padding: 20px;
        margin: 0;
        grid-row: 1 / span 2;
        font-size: 1.25rem;
        cursor: pointer;
        background: black;
        color: yellow;
    }

    .game-area button[data-empty=true] {
        display: none;
    }

    .word-play {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

    }

    .word {
        display: flex;
        justify-content: center;
        grid-row: 1;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    .word button[data-open=true] {
        display: flex;
        justify-content: center;
        align-items: center;
        background: yellow;
        padding: 5px;
        font-size: 1rem;
        margin: 2px;
        border-radius: 10px;
        width: 100%;
        min-width: 20px;
        text-align: center;
        cursor: pointer;
        border: 2px solid yellow;
    }

    .word button[data-open=false] {
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
        color: yellow;
        padding: 5px;
        font-size: 1rem;
        margin: 2px;
        border-radius: 10px;
        width: 100%;
        min-width: 20px;
        pointer-events: none;
        transition-duration: 1000ms;
        border: 2px solid black;

    }

    .guess {
        display: flex;
        justify-content: center;
        grid-row: 2;
        width: 100%;
        height: 100%;

    }

    .guess h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 3px;
        font-size: 1rem;
        margin: 2px;
        border-radius: 10px;
        border: 1px dashed black;
        width: 100%;
        min-width: 12px;
        height: 25px;
        cursor: pointer;

    }

    .guess .right {
        background: lightgreen
    }

    .guess .wrong {
        background: lightcoral
    }

    .extra[data-open=false] {
        display: none;
    }

    .extra h3[data-open=true] {
        display: flex;
        align-items: center;
        justify-content: center;
        background: yellow;
        padding: 5px;
        font-size: 1.25rem;
        margin: 2px;
        border-radius: 10px;
        width: 35px;
        height: 35px;
        cursor: pointer;
        border: 2px solid yellow;
    }

    .extra h3[data-open=false] {
        display: none;
    }

    .extra h3[data-empty=true] {
        visibility: hidden;

    }

    .button-group {
        display: flex;
        flex-direction: row;
        margin: 10px 0;
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

    @media screen and (min-width: 640px) {

        .word button[data-open=true] {
            font-size: 1.75rem
        }

        .word button[data-open=false] {
            font-size: 1.75rem
        }

        .guess h3 {
            font-size: 1.75rem;
            height: 22px;
            padding: 10px;
            border: 2px dashed
        }

        .extra h3[data-open=true] {
            padding: 20px;
            font-size: 1.75rem;
        }

        .top .options {
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .options h3 {
            font-size: 1.25rem
        }

        .top h2 {
            font-size: 1.5rem
        }


    }


    @media screen and (min-width: 1230px) {
        .game-area {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 95%;
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
            color: yellow;
            width: auto;
        }

        .game-area .rearrange:disabled {
            pointer-events: none;
            opacity: 0.5;
            width: auto;
        }

        .game-area .reset[data-empty=false] {
            border-radius: 10px;
            padding: 20px;
            margin: 10px;
            grid-row: 2;
            font-size: 1.5rem;
            cursor: pointer;
            background: black;
            color: yellow;
            width: auto;
        }

        .game-area .submit[data-empty=false] {
            border-radius: 10px;
            padding: 20px;
            margin: 5px;
            grid-row: 1 / span 2;
            font-size: 1.5rem;
            cursor: pointer;
            background: black;
            color: yellow;
        }

        .game-area button[data-empty=true] {
            display: none;
        }

        .word-play {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: fit-content;
        }

        .word {
            display: flex;
            justify-content: center;
            grid-row: 1;
            margin: 0;
            width: 100%;
            height: 100%;
        }

        .word button[data-open=true] {
            background: yellow;
            padding: 0px 20px;
            font-size: 1.75rem;
            margin: 5px;
            border-radius: 10px;
            width: 100%;
            max-width: 75px;
            min-width: 40px;

            cursor: pointer;
            border: 2px solid yellow;
        }

        .word button[data-open=false] {
            background: black;
            color: yellow;
            padding: 0px 20px;
            font-size: 1.75rem;
            margin: 5px;
            border-radius: 10px;
            width: 100%;
            max-width: 75px;
            min-width: 40px;
            pointer-events: none;
            transition-duration: 1000ms;
            border: 2px solid black;

        }

        .guess {
            display: flex;
            justify-content: center;
            grid-row: 2;
            width: 100%;
            height: 100%;

        }

        .guess h3 {
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            padding: 10px;
            font-size: 1.75rem;
            margin: 5px;
            border-radius: 10px;
            border: 2px dashed black;
            width: 100%;
            max-width: 51px;
            min-width: 16px;
            height: auto;

            cursor: pointer;

        }

        .extra h3[data-open=true] {
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

        .extra h3[data-open=false] {
            display: none;
        }

        .extra h3[data-empty=true] {
            visibility: hidden;

        }

        .button-group {
            display: flex;
            flex-direction: column;
            margin: 0;
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
    }
</style>