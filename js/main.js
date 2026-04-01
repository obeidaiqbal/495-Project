

// Function Is Endpoint for Adding Newest Description
let descriptionCount = 0
function updateDescription(newDescription) {
    const description = document.getElementById("description");
    const sound = document.getElementById("alert");
    const prev = document.createElement("p");
    prev.id = "desc-" + descriptionCount;
    descriptionCount++;

    prev.textContent = newDescription;
    description.appendChild(prev);
    description.scrollTop = description.scrollHeight;
    sound.currentTime = 0;
    sound.play();
}