

// Function Is Endpoint for Adding Newest Description
let descriptionCount = 0
let currentDescription = 0

//maps from scenario id to the sequence of timestamps to play audio at (in seconds from beginning of audio file)
const scenarioTimestamps = {
    "attention" : [5, 22, 37, 70, 75, 80, 87],
    "virtue" : [15, 20, 23, 45, 50, 67],
    "line_graph" : [6, 40, 45],
    "pie_chart" : [0, 0, 0, 0],
}
const scenarioDescriptions = {
    "attention" : ["Caption: Figure 1: The Transformer Model Architecture. Depicts a vertical neural network architecture with an input section on the left and an output section on the right.",
                "Bottom has inputs and outputs fed into input and output embedding layers",
                "Circles labeled Positional Encodings are added to input embeddings", 
                "line right under Multi Head Attention branches off and joins output of attention in block labeled Add & Norm", 
                "line after previous Add & Norm splits, one goes through a feed forward network, the other joins it later in another Add & Norm block", 
                "line from input block joins output block mid-way in a Multi-Head Attention block", 
                "On the left: a gray box surrounds the multihead attention, feedforward network, and Add& Norm blocks. On the Right: A gray box surrounds both Multi-Head Attention Blocks, feedforward and Add/Norm blocks"],
    "virtue" : ["writes Virtues on the board", 
            "writes Courage under Virtues",
            "adds Justice",
            "writes Prudence in large letters",
            "circles Prudence and draws lines from it to the other virtues",
            "writes Temperance, draws a line from it to Prudence"],
    "line_graph" : ["Line Graph. X-axis: 'word position withis sentence'; Y-axis: 'Mean RT in ms'",
                    "Mean of about 520 milliseconds",
                    "Positions 2 to 14 are all around 375 milliseconds, 15 rises to 425 milliseconds"],
    "pie_chart" : ['Slide contains a pie chart called “Global Greenhouse Gas Emissions by Gas"',
                    "Carbon Dioxide (fossil fuel and industrial processes) 65%",
                    "Carbon Dioxide (forestry and other land use) 11%",
                    "Over 3 quarters"],
}

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