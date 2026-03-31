
// Function Is Endpoint for Adding Newest Description
function updateDescription(newDescription) {
    const description = document.getElementById("description");
    const sound = document.getElementById("alert");
    const prev = document.createElement("p");

    prev.textContent = newDescription;
    description.appendChild(prev);
    description.scrollTop = description.scrollHeight;
    sound.currentTime = 0;
    sound.play();
}