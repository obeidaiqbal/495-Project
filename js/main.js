

// Function Is Endpoint for Adding Newest Description
let descriptionCount = 0
let currentDescription = 0

function updateDescription(newDescription) {
    const description = document.getElementById("description");
    const sound = document.getElementById("alert");
    const prev = document.createElement("p");
    prev.id = "desc-" + descriptionCount;
    descriptionCount++;
    currentDescription = descriptionCount -1 ;

    prev.textContent = newDescription;
    description.appendChild(prev);
    description.scrollTop = description.scrollHeight;
    sound.currentTime = 0;
    sound.play();
}
//add buttons for playDescription, rewind, forward in the scenario thingy

function playDescription() {
    const description = document.getElementById("desc-"+currentDescription).textContent; 
    const sound = new SpeechSynthesisUtterance(description);
    sound.rate = 1.75;
    window.speechSynthesis.speak(sound);
}

function rewind() {
    if(currentDescription > 0){
        currentDescription = currentDescription - 1;
        playDescription();
    }
}

function forward() {
    if(currentDescription < descriptionCount - 1){
        currentDescription = currentDescription + 1;
        playDescription();
    }
}