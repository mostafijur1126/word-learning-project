
const inputText =document.getElementById("inputText");
document.getElementById("PlayBtn").addEventListener("click",() =>{
    const getValue = inputText.value;
    // pronounceWord(getValue);
    pronounceWord(getValue, "female");
})


let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  if (!voices.length) {
    // try again if empty
    setTimeout(loadVoices, 100);
  }
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function pronounceWord(word, gender = "female") {
    if (!word) return; // empty string check
  const utterance = new SpeechSynthesisUtterance(word);

  let selectedVoice;

  if (gender === "male") {
    selectedVoice = getMaleVoice();
  } else {
    selectedVoice = getFemaleVoice();
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

    utterance.lang = "en-AU"; //"en-US"; American , "en-GB"; British , "en-AU" Australian
  utterance.rate = 0.9;  // speed 0.7 >1.5
  utterance.pitch = 1.5; // tone 0.5; Deep voice > 1.8; High voice
  utterance.volume = 1; // volume 0.5; 50% volume > 1;  Full volume

  window.speechSynthesis.speak(utterance);
}

function getFemaleVoice() {
  return voices.find(v =>
    v.name.toLowerCase().includes("zira") || //"zira" Windows female , "samantha" Mac female
    v.name.toLowerCase().includes("female")
  );
}

function getMaleVoice() {
  return voices.find(v =>
    v.name.toLowerCase().includes("david") ||
    v.name.toLowerCase().includes("male")
  );
}

