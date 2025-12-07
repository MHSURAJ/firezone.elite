let editingIndex = null;

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Popup open
function openMatchPopup(editIndex = null) {
  editingIndex = editIndex;

  if (editIndex !== null) {
    const m = JSON.parse(localStorage.getItem("matches"))[editIndex];

    document.getElementById("popupTitle").innerText = "Edit Match";
    document.getElementById("matchName").value = m.name;
    document.getElementById("matchId").value = m.matchId;
    document.getElementById("entryFee").value = m.entryFee;
    document.getElementById("prize").value = m.prize;
    document.getElementById("date").value = m.date;
    document.getElementById("time").value = m.time;
    document.getElementById("roomId").value = m.roomId;
    document.getElementById("password").value = m.password;

  } else {
    document.getElementById("popupTitle").innerText = "Add Match";
    document.querySelectorAll(".popup input").forEach(inp => inp.value = "");
  }

  document.getElementById("popupOverlay").style.display = "flex";
}

// Close popup
function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

// Save or Update match
function saveMatch() {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];

  const newMatch = {
    name: matchName.value,
    matchId: matchId.value,
    entryFee: entryFee.value,
    prize: prize.value,
    date: date.value,
    time: time.value,
    roomId: roomId.value,
    password: password.value
  };

  if (editingIndex !== null) {
    matches[editingIndex] = newMatch;
  } else {
    matches.push(newMatch);
  }

  localStorage.setItem("matches", JSON.stringify(matches));
  loadMatches();
  closePopup();
}

// Load match cards
function loadMatches() {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];
  let box = document.getElementById("matchList");

  box.innerHTML = "";

  matches.forEach((m, i) => {
    box.innerHTML += `
      <div class="match-card">
        <h3>${m.name}</h3>
        <p><b>Match ID:</b> ${m.matchId}</p>
        <p><b>Entry Fee:</b> ${m.entryFee}</p>
        <p><b>Prize:</b> ${m.prize}</p>
        <p><b>Date:</b> ${m.date}</p>
        <p><b>Time:</b> ${m.time}</p>

        <div class="card-btns">
          <button class="edit-btn" onclick="openMatchPopup(${i})">Edit</button>
          <button class="delete-btn" onclick="deleteMatch(${i})">Delete</button>
        </div>
      </div>
    `;
  });
}

function deleteMatch(i) {
  let matches = JSON.parse(localStorage.getItem("matches")) || [];
  matches.splice(i, 1);
  localStorage.setItem("matches", JSON.stringify(matches));
  loadMatches();
}

window.onload = loadMatches;
