const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}

function tellJoke(joke) {
    VoiceRSS.speech({
        key: '5782756fa7b141ccb9158825911c1ca4',
        src: joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJoke() {
    let joke = '';
    const apiURL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
    } else {
        joke = data.joke;
    }
    // Text-to-Speech
    tellJoke(joke);
    // Disable Button
    toggleButton();
    }
    catch(error) {
        // Where we Catch Errors
        console.log("Whoops", error);
    }
}

// Event Listeners

button.addEventListener('click', getJoke, audioElement.play)
audioElement.addEventListener('ended', toggleButton)