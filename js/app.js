const allPlayers = () => {
    document.getElementById('player-container').innerHTML = "";
    document.getElementById('spinner').style.display = "block";
    const searchValue = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.player == null);
            if (data.player == null) {
                document.getElementById('spinner').style.display = "block";
            }
            else {
                showplayersDetails(data.player);
                document.getElementById('spinner').style.display = "none";
            }
        })
};
document.getElementById('spinner').style.display = "none";
const showplayersDetails = players => {
    if (players == playerDetails) {
        document.getElementById('spinner').style.display = "block";
    }
    else {
        document.getElementById('spinner').style.display = "none";
    }
    for (const player of players) {
        const parents = document.getElementById("player-container");
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card border p-5">
    <div class="pro-pic">
        <img class="w-50" src="${player.strThumb}" alt="">
    </div>
    <h2>Name: ${player.strPlayer}</h2>
    <h5>Country: ${player.strNationality}</h5>
    <p></p>
    <div class="all-button">
        <button class="btn btn-danger">Delete</button>
        <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-success">Details</button>
    </div>
</div>
    `;
        parents.appendChild(div);
        console.log(players)
    }
}

const playerDetails = id => {
    const url = `
    https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => playerDetailsId(data.players[0]))
}
const playerDetailsId = info => {
    console.log(info.strGender);
    if (info.strGender == 'Male') {
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    }
    else {
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }
    const detailsId = document.getElementById('details-container');
    detailsId.innerHTML = `
    <div>
    <img class="w-50" src="${info.strThumb}" alt="">
    <h2>Name: ${info.strPlayer}</h2>
    <h5>Player Id: ${info.idPlayer}</h5>
    </div>
    `;
}