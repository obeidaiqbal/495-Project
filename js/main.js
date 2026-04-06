
let descriptionCount = 0
let currentDescription = 0

//maps from scenario id to the sequence of timestamps to play audio at (in seconds from beginning of audio file)
const scenarioData = {
    "attention" : {
        audioSrc: "audio/attention_is_all_you_need.m4a",
        title: "Scenario 4: Transformer Architecture Diagram",
        timestamps: [5, 22, 37, 70, 75, 80, 87],
        descriptions: [
            "Caption: Figure 1: The Transformer Model Architecture. Depicts a vertical neural network architecture with an input section on the left and an output section on the right.",
            "Bottom has inputs and outputs fed into input and output embedding layers",
            "Circles labeled Positional Encodings are added to input embeddings",
            "line right under Multi Head Attention branches off and joins output of attention in block labeled Add & Norm",
            "line after previous Add & Norm splits, one goes through a feed forward network, the other joins it later in another Add & Norm block",
            "line from input block joins output block mid-way in a Multi-Head Attention block",
            "On the left: a gray box surrounds the multihead attention, feedforward network, and Add& Norm blocks. On the Right: A gray box surrounds both Multi-Head Attention Blocks, feedforward and Add/Norm blocks"
        ]
    },
    "virtue" : {
        audioSrc: "audio/virtue_ethics.m4a",
        title: "Scenario 5: Philosophy Class Whiteboard Lecture",
        timestamps: [15, 20, 23, 45, 50, 67],
        descriptions: [
            "writes Virtues on the board",
            "writes Courage under Virtues",
            "adds Justice",
            "writes Prudence in large letters",
            "circles Prudence and draws lines from it to the other virtues",
            "writes Temperance, draws a line from it to Prudence"
        ]
    },
    "line_graph" : {
        audioSrc: "audio/line_graph_audio.mp3",
        title: "Scenario 1: Linguistics Presentation",
        timestamps: [6, 40, 45],
        descriptions: [
            "Line Graph. X-axis: 'word position within sentence'; Y-axis: 'Mean RT in ms'",
            "Mean of about 520 milliseconds",
            "Positions 2 to 14 are all around 375 milliseconds, 15 rises to 425 milliseconds"
        ]
    },
    "hopfield" : {
        audioSrc: "audio/hopfield networks.m4a",
        title: "Scenario 3: Hopfield Network Lecture",
        timestamps: [0, 26, 30, 52, 57],
        descriptions: [
            "Slide contains two grids of changing black and white pixels",
            "left grid",
            "Pixels display a black E on white background",
            "right grid",
            "Pixels display a white E on black background"
        ]
    },
    "piechart" : {
        audioSrc: "audio/global-emissions.m4a",
        title: "Scenario 2: Climate Change Lecture",
        timestamps: [2, 11, 15, 24],
        descriptions: ['Slide contains a pie chart called “Global Greenhouse Gas Emissions by Gas"',
                    "Carbon Dioxide (fossil fuel and industrial processes) 65%",
                    "Carbon Dioxide (forestry and other land use) 11%",
                    "Over 3 quarters"]
    }
}

let scheduledDescriptions = []
let nextScheduledDescription = 0

function updateDescription(newDescription) {
    const description = document.getElementById("description");
    const sound = document.getElementById("alert");

    if (!description) {
        return;
    }

    const waitingMessage = document.getElementById("waiting-message");
    if (waitingMessage) {
        waitingMessage.remove();
    }

    const prev = document.createElement("p");
    prev.id = "desc-" + descriptionCount;
    descriptionCount++;
    currentDescription = descriptionCount - 1;

    prev.textContent = newDescription;
    description.appendChild(prev);
    description.scrollTop = description.scrollHeight;

    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function playDescription() {
    const current = document.getElementById("desc-" + currentDescription);
    if (!current) {
        return;
    }

    const description = current.textContent;
    const sound = new SpeechSynthesisUtterance(description);
    sound.rate = 1.5;
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

function initializeScenarioPage() {
    const audio = document.getElementById("scenario-audio");
    if (!audio) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const scenarioId = params.get("scenario");
    const scenario = scenarioData[scenarioId];
    const title = document.getElementById("scenario-title");

    if (!scenario) {
        if (title) {
            title.textContent = "Descriptions Page";
        }
        return;
    }

    if (title) {
        title.textContent = scenario.title;
    }

    audio.src = scenario.audioSrc;
    scheduledDescriptions = scenario.timestamps.map((timestamp, index) => ({
        timestamp,
        description: scenario.descriptions[index]
    }));
    nextScheduledDescription = 0;

    audio.addEventListener("timeupdate", function () {
        while (
            nextScheduledDescription < scheduledDescriptions.length &&
            audio.currentTime >= scheduledDescriptions[nextScheduledDescription].timestamp
        ) {
            updateDescription(scheduledDescriptions[nextScheduledDescription].description);
            nextScheduledDescription++;
        }
    });

    audio.addEventListener("seeked", function () {
        let newIndex = 0;
        while (
            newIndex < scheduledDescriptions.length &&
            scheduledDescriptions[newIndex].timestamp <= audio.currentTime
        ) {
            newIndex++;
        }
        nextScheduledDescription = newIndex;
    });
}

function gotoURL(){
    document.getElementById("lecture-link-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let value = document.getElementById("lecture-url").value.trim();
    const server = window.location.origin  ;
    console.log("Redirecting to:", value);
    window.location.href =  value;
});
}

document.addEventListener("DOMContentLoaded", gotoURL);
window.addEventListener("DOMContentLoaded", initializeScenarioPage);
