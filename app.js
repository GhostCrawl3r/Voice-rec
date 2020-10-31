const button = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let _voices = [];

/** Vairables **/

// Voice Fetch
const fetchVoice = () => {
    _voices = window.speechSynthesis.getVoices();
}

// Current Time
let today = new Date();
let curTime = today.getHours() + ':' + today.getMinutes();
const time = 'The time is ' + curTime;

// Conversation Strings
const name = 'Lisa';
const creationDate = '31st October 2020';
const greetings = [
    'Good morning, my name is' + name,
    'Good afternoon, my name is' + name,
    'Good evening, my name is' + name
];
const jokes = [
    'I\'m on a seafood diet. I see food and I don\'t eat it because I\'m incapable of eating it',
    'Did you hear about the guy who invented the knock knock joke? He got a No...Bell...Prize',
    'Last week I sold my old vaccum cleaner. After all... it was just gathering dust!',
    'How do you make a sausage roll?...Push it'
];

/** Settings **/

recognition.onstart = function() {
    button.textContent = 'Listening...';
    fetchVoice();
}

recognition.onresult = function (event) {
    fetchVoice();
    const current = event.resultIndex;
    
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
}

recognition.onspeechend = function() {
    button.textContent = 'Push To Talk Again';
}

// Add the listener to the button
button.addEventListener('click', () => {
    recognition.start();
})

/** Replies Section **/

// Reply from AI
function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = 'I\'m sorry, I don\'t understand what you\'re asking me';
    
    if(message.includes("when were you born") || message.includes("When were you created"))
    {
        speech.text = 'I was created on ' + creationDate;
    }
    
    if(message.includes('hello'))
    {
        if(today.getHours() > 0 && today.getHours() < 12) {
            speech.text = greetings[0];
        }
        if(today.getHours() > 12 && today.getHours() < 18) {
            speech.text = greetings[1];
        }
        if(today.getHours() > 18 && today.getHours() < 24) {
            speech.text = greetings[2];
        }
    }
    
    /** Queries **/
    
    if(message.includes('how are you'))
    {
        speech.text = 'I am neither good nor bad, as that is a concept artificial intelligence like myself can\'t quantify. But I suppose it\'s easier to say, I\'m fine';
    }
    
    if(message.includes('what is the time', 'what\'s the time', 'what time is it') ) {
        speech.text = time;
    }
    
    if(message.includes('what\'s the weather like'))
    {
        speech.text = 'look outside your window you lazy son of a bitch, do you think I\'m programmed with a crystal ball';
    }
    
    if(message.includes('what is zero divided by zero'))
    {
        speech.text = 'Technically it\'s infinity. But to simplify it for you, it\'s zero';
    }
    
    if(message.includes('tell me a joke'))
    {
        const jokeSelector = jokes[Math.floor(Math.random() * jokes.length)];
        speech.text = jokeSelector;
    }
    
    /** End Queries **/
    
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.voice = _voices[33];
    window.speechSynthesis.speak(speech);
}
