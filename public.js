document.addEventListener("DOMContentLoaded", ()=>{

    // ===== Login Check =====
    if(localStorage.getItem("userType") !== "player"){
        alert("Unauthorized! Please login as player.");
        window.location.href = "login.html";
    }

    const allMatchesBtn = document.getElementById("allMatchesBtn");
    const myMatchesBtn = document.getElementById("myMatchesBtn");
    const contactUsBtn = document.getElementById("contactUsBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const allMatchesSection = document.getElementById("allMatchesSection");
    const myMatchesSection = document.getElementById("myMatchesSection");
    const contactInfo = document.getElementById("contactInfo");

    // ===== Sidebar Buttons =====
    allMatchesBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display="block";
        myMatchesSection.style.display="none";
        contactInfo.style.display="none";
    });
    myMatchesBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display="none";
        myMatchesSection.style.display="block";
        contactInfo.style.display="none";
    });
    contactUsBtn.addEventListener("click", ()=>{
        allMatchesSection.style.display="none";
        myMatchesSection.style.display="none";
        contactInfo.style.display="block";
    });

    // ===== Logout =====
    logoutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("userType");
        localStorage.removeItem("userEmail");
        alert("Logged out");
        window.location.href = "login.html";
    });

    // ===== Upcoming Matches / Cards =====
    const matchesList = document.getElementById("matchesList");
    const myMatchesList = document.getElementById("myMatchesList");
    const matches = JSON.parse(localStorage.getItem("matches")) || [];
    const userEmail = localStorage.getItem("userEmail");

    function renderMatches(){
        matchesList.innerHTML="";
        myMatchesList.innerHTML="";
        if(matches.length===0){
            matchesList.innerHTML="<p>No upcoming matches</p>";
            return;
        }

        matches.forEach((m,index)=>{
            // All Matches Card
            const card = document.createElement("div");
            card.className="match-card";
            card.innerHTML=`
                <h3>${m.name}</h3>
                <p>Date: ${m.date}</p>
                <p>Time: ${m.time}</p>
                <p>Players: ${m.players}</p>
                <button id="registerBtn${index}">Register</button>
            `;
            matchesList.appendChild(card);

            // Register Button
            card.querySelector(`#registerBtn${index}`).addEventListener("click", ()=>{
                window.open("https://forms.gle/ucxE3a8moxr3QrXp6","_blank");
                // Add player to approvals in localStorage
                let approvals = JSON.parse(localStorage.getItem("approvals")) || {};
                if(userEmail && !approvals[userEmail]){
                    approvals[userEmail]="Pending";
                    localStorage.setItem("approvals",JSON.stringify(approvals));
                }
                alert("Registration submitted! Wait for admin approval.");
            });

            // My Matches
            const myCard = document.createElement("div");
            myCard.className="match-card";
            const approvals = JSON.parse(localStorage.getItem("approvals")) || {};
            if(approvals[userEmail]=="approved"){
                myCard.innerHTML=`
                    <h3>${m.name}</h3>
                    <p>Date: ${m.date}</p>
                    <p>Time: ${m.time}</p>
                    <p>Room ID: ${m.roomID || "N/A"}</p>
                    <p>Password: ${m.password || "N/A"}</p>
                `;
                myMatchesList.appendChild(myCard);
            }
        });
    }

    renderMatches();

});
