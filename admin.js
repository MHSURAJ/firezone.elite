document.addEventListener("DOMContentLoaded", ()=>{

    const addMatchBtn = document.getElementById("addMatchBtn");
    const modal = document.getElementById("matchModal");
    const saveMatchBtn = document.getElementById("saveMatchBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const matchesList = document.getElementById("matchesList");

    let editingIndex = null;

    let matches = JSON.parse(localStorage.getItem("matches")) || [];

    function renderMatches(){
        matchesList.innerHTML = "";

        if(matches.length === 0){
            matchesList.innerHTML = "<p>No matches added</p>";
            return;
        }

        matches.forEach((m, index)=>{

            const card = document.createElement("div");
            card.className = "match-card";
            
            card.innerHTML = `
                <h3>${m.name}</h3>
                <p>ID: ${m.matchID}</p>
                <p>Date: ${m.date}</p>
                <p>Time: ${m.time}</p>
                <p>Players: ${m.players}</p>
                <p>Entry Fee: ₹${m.fee}</p>
                <p>Prize: ₹${m.prize}</p>
                <button onclick="editMatch(${index})">Edit</button>
                <button onclick="deleteMatch(${index})">Delete</button>
            `;

            matchesList.appendChild(card);
        });
    }

    window.editMatch = function(index){
        editingIndex = index;
        const m = matches[index];

        document.getElementById("modalTitle").innerText = "Edit Match";
        
        m_name.value = m.name;
        m_id.value = m.matchID;
        m_fee.value = m.fee;
        m_prize.value = m.prize;
        m_date.value = m.date;
        m_time.value = m.time;
        m_players.value = m.players;
        m_roomId.value = m.roomID;
        m_roomPass.value = m.roomPass;

        modal.style.display = "flex";
    }

    window.deleteMatch = function(index){
        matches.splice(index, 1);
        localStorage.setItem("matches", JSON.stringify(matches));
        renderMatches();
    }

    addMatchBtn.addEventListener("click", ()=>{
        editingIndex = null;
        modal.style.display = "flex";

        document.getElementById("modalTitle").innerText = "Add Match";

        m_name.value = "";
        m_id.value = "";
        m_fee.value = "";
        m_prize.value = "";
        m_date.value = "";
        m_time.value = "";
        m_players.value = "";
        m_roomId.value = "";
        m_roomPass.value = "";
    });

    closeModalBtn.addEventListener("click", ()=>{
        modal.style.display = "none";
    });

    saveMatchBtn.addEventListener("click", ()=>{

        const matchObj = {
            name: m_name.value,
            matchID: m_id.value,
            fee: m_fee.value,
            prize: m_prize.value,
            date: m_date.value,
            time: m_time.value,
            players: m_players.value,
            roomID: m_roomId.value,      // secret
            roomPass: m_roomPass.value   // secret
        };

        if(editingIndex === null){
            matches.push(matchObj);
        } else {
            matches[editingIndex] = matchObj;
        }

        localStorage.setItem("matches", JSON.stringify(matches));
        modal.style.display = "none";

        renderMatches();
    });

    renderMatches();
});
