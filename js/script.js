
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const showSongList = document.getElementById('show-song-list');
const showSingleResult = document.getElementById('show-single-result');

var loading = `<div class="spinner-border" role="status">
<span class="sr-only">Loading..</span>
</div>`

            //show song list and result
    searchButton.addEventListener('click',function(e){
    document.getElementById("data-loading").innerHTML = loading;
    const InputValue = searchInput.value;
    document.getElementById('show-single-result').innerHTML="";
         //get song data form api
    fetch('https://api.lyrics.ovh/suggest/'+InputValue+'')
    .then(res => res.json())
    .then(data => setData(data));
    const setData =  data =>{
        for (let i = 0; i < 10; i++) {
            const id = data.data[i].id;
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            const picture = data.data[i].artist.picture;
            const audio = data.data[i].preview;
            const randomIdNum = Math.random()*10000;

            showSingleResult.innerHTML += 
            ` <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-8 d-flex">
                        <img class="h-100 mr-5" src="${picture}" alt="">
                        <div class="details">
                            <h3 class="lyrics-name">${title}</h3>
                            <p class="author lead">Album by <span>${artist}</span></p>
                        </div>
                    </div>
                    <div class="col-md-4 text-md-right text-center">
                        <button class="btn mr-2 btn-sm btn-success" onclick="getLyric('${artist}', '${title}', '${id}' , '${randomIdNum}')">Get Lyrics</button>
                        <button class="btn btn-info btn-sm" onclick="playAudio('${audio}')">Play</button>
                    </div>
                </div>
                <h3 id="${randomIdNum}" class="text-center"></h3>
                <div id="${id}" class="text-center"></div>`
        }

    }
    e.preventDefault();
    document.getElementById("data-loading").innerHTML = "";
});

//single lyric list  section
const getLyric = (artist, title, id, unknowId) =>{
    fetch('https://api.lyrics.ovh/v1/'+artist+'/'+title+'')
    .then(res => res.json())
    .then(data => setLyric(data));
    const setLyric = data => {
        if(data.lyrics != undefined){
            const lyric = data.lyrics;
            document.getElementById(unknowId).innerHTML += `
            <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${title}</h2>
                <pre class="lyric text-white">${artist}</pre>`
            
            document.getElementById(id).innerText = lyric;
        }else{
            document.getElementById(unknowId).innerText = 'Lyric not found';
        }
    }
}

// play audio
function playAudio(link) {
    musicPlay.src = link;
    musicPlay.style.display = "block";
    musicPlay.play();
  }