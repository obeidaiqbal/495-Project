

// Function Is Endpoint for Adding Newest Description
let descriptionCount = 0
let currentDescription = 0

function updateDescription(newDescription) {
    const description = document.getElementById("description");
    const sound = document.getElementById("alert");
    const prev = document.createElement("p");
    prev.id = "desc-" + descriptionCount;
    descriptionCount++;
    currentDescription = descriptionCount;

    prev.textContent = newDescription;
    description.appendChild(prev);
    description.scrollTop = description.scrollHeight;
    sound.currentTime = 0;
    sound.play();
}
//add buttons for playDescription, rewind, forward in the scenario thingy

function playDescription() {
    const description = document.getElementById("desc-"+currentDescription); 
    const sound = new SpeechSynthesisUtterance(description);
    window.speechSynthesis.speak(sound);
}

function rewind() {
    currentDescription = currentDescription - 1;
    playDescription();
}

function forward() {
    currentDescription = currentDescription + 1;
    playDescription();
}