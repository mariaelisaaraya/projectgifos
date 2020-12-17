const myKey = "RoFq898LQn130ZY7iP2TBlrDuefnjvV0";

//Get theme on opening window
window.onload = loadTheme()

function loadTheme() {
    let theme;
    if (!window.localStorage.getItem('theme')) {
        theme = 'light'
    } else{
        theme = window.localStorage.getItem('theme');
    }
    document.getElementById('theme').className = theme;
}

//Open Theme Menu

document.getElementById('choose_topic').addEventListener('click',openMenu);

function openMenu() {
    let theme_button = document.getElementById("theme_button")
    theme_button.classList.toggle("display");
}

//Switch Theme

document.getElementById('light').addEventListener('click', setLight);
document.getElementById('dark').addEventListener('click', setDark);

function setLight() {
    document.getElementById('theme').className = 'light';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('theme_button').classList.toggle('display');
}

function setDark() {
    document.getElementById('theme').className = 'dark';
    //Save Theme
    let theme = document.getElementById('theme').className;
    window.localStorage.setItem('theme',theme);
    //Hide theme Dropdown
    document.getElementById('theme_button').classList.toggle('display');
}

//Open Crear Gif
document.getElementById('create_guifos').addEventListener('click',function () {
    document.getElementById('nav_button').classList.toggle('noDisplay');
    document.getElementById('nav_button').classList.toggle('displayFlex');
    let displayBtns = document.getElementById('nav_button').className;
    let gifRecorder = 'displayFlex';
    window.localStorage.setItem('gifRecorder',gifRecorder);
    window.localStorage.setItem('displayBtns',displayBtns);
    window.location.href = 'myGifos.html';
});

//Open Mis Guifos
document.getElementById('guifos_go').addEventListener('click',function () {
    let displayBtns = document.getElementById('nav_button').className;
    let gifRecorder = 'noDisplay';
    window.localStorage.setItem('gifRecorder',gifRecorder);
    window.localStorage.setItem('displayBtns',displayBtns);
    window.location.href = 'myGifos.html';
});

//Search gifs

document.getElementById('search').addEventListener('click',search);
function search() {
    document.getElementById('results_content').innerHTML = '';
    let searchTerm = document.getElementById('search_input').value;
    let searchTermClean = searchTerm.replace(' ','+')
    let searchGif = fetch('https://api.giphy.com/v1/gifs/search?&api_key='+myKey+'&q='+searchTermClean+'&limit=14')
    searchGif
        .then(response => response.json())
        .then(datos => {
            for (let i = 0; i < datos.data.length; i++){
                let url = (datos.data[i].images.downsized.url);
                let newDiv = document.createElement('div');
                let newGif = document.createElement('img');
                let results_content = document.getElementById('results_content');
                newGif.id = 'newGifSearch'+[i];
                newDiv.className = 'gifCont';
                newDiv.appendChild(newGif);
                results_content.appendChild(newDiv);
                document.getElementById('newGifSearch'+[i]).src = url;
                document.getElementById('search_results').style.display = 'block';
                document.getElementById('trending').style.display = 'none';
                document.querySelector('.results_title .resp_title').innerHTML = searchTerm;
                document.getElementById('search_input').value = '';
                document.getElementsByClassName('search_results')[0].classList.remove('display');
                document.getElementsByClassName('results_title')[0].scrollIntoView();
            }
        })
        .catch(error => console.error(error))
}

//Show Search suggestions

function displaySugg() {
    let search_resultsCont = document.getElementsByClassName('search_results')[0];
    if (!search_resultsCont.classList.contains('display')) {
        search_resultsCont.classList.toggle('display');
    }
}

//search_results Search bar
function search_results() {
    let auto = document.getElementsByClassName('auto');
    let searchTerm = document.getElementById('search_input').value;
    let searchTermClean = searchTerm.replace(' ','+')
    url = 'https://api.giphy.com/v1/gifs/search/tags?api_key='+myKey+'&q='+searchTermClean+'&limit=3'
    let search_resultsSugg = fetch(url);
    search_resultsSugg
        .then(response => response.json())
        .then(datos => {
            for (let i = 0; i < datos.data.length; i++) {
                auto[i].innerHTML = datos.data[i].name;
            }
        })
}

document.getElementById('search_input').addEventListener('input',displaySugg);
document.getElementById('search_input').addEventListener('input',search_results);


//Click search_results

document.getElementsByClassName('auto')[0].addEventListener('click',autoSearch);
document.getElementsByClassName('auto')[1].addEventListener('click',autoSearch);
document.getElementsByClassName('auto')[2].addEventListener('click',autoSearch);

//Search clicked suggestion

function autoSearch() {
    document.getElementById('search_input').value = this.innerHTML;
    search();
}

//Suggested gifs

let suggestedGifs = fetch("https://api.giphy.com/v1/gifs/trending?api_key="+myKey+"&limit=4");
suggestedGifs
    .then(response => response.json())
    .then(datos => {
        for (let i = 0; i < datos.data.length; i++) {
            let url = (datos.data[i].images.original.url);
            let window = document.createElement('div');
            let bar = document.createElement('div');
            let title = document.createElement('h4');
            let closeBtn = document.createElement('img');
            let gifCont = document.createElement('div');
            let newGif = document.createElement('img');
            let moreBtn = document.createElement('button');
            let suggestions_content = document.getElementsByClassName('suggestions_content')[0];
            window.className = 'window';
            bar.className = 'bar';
            title.className = 'gifTitle'
            closeBtn.src = './assets/button3.svg';
            gifCont.className = 'gif';
            newGif.id = 'newGif'+[i];
            moreBtn.className = 'more';
            suggestions_content.appendChild(window);
            window.appendChild(bar);
            window.appendChild(gifCont);
            bar.appendChild(title);
            bar.appendChild(closeBtn);
            gifCont.appendChild(newGif);
            gifCont.appendChild(moreBtn);
            moreBtn.innerHTML = 'Ver más...'
            moreBtn.setAttribute('type', 'button');
            document.getElementById('newGif'+[i]).src = url;
            let titleString = datos.data[i].title;
            let titleArray = titleString.split(' ');
            title.innerHTML = '#'+titleArray[0]+' '+titleArray[1]+' '+titleArray[2];
        };
        //Get position of Ver Mas.. clicked
        let more = document.getElementsByClassName('more');
        for (let i = 0; i < more.length; i++) {
            function getPos(index) {
                more[i].onclick = function() {
                    console.log(document.getElementsByClassName('gifTitle')[index].innerHTML.substring(1));
                    searchMore(index);
                }
            }
            getPos(i);
        }
    })
    .catch(error => console.error(error))



//Click ver mas Suggested gifs
function searchMore(pos) {
    let gifTitle = document.getElementsByClassName('gifTitle')[pos].innerHTML.substring(1);
    document.getElementById('search_input').value = gifTitle
    search();

}
//Trending gifs

let trendingGif = fetch("https://api.giphy.com/v1/gifs/trending?api_key="+myKey+"&offset=4&limit=14");
trendingGif
    .then(response => response.json())
    .then(datos => {
        for (let i = 0; i < datos.data.length; i++)     {
            let url = (datos.data[i].images.original.url);
            let newDiv = document.createElement('div');
            let newGif = document.createElement('img');
            let trend_content = document.getElementById('trend_content');
            let hoverBar = document.createElement('div');
            let tags = document.createElement('span');
            let gifTags = datos.data[i].title;
            let tagArray = gifTags.split(' ');
            hoverBar.className = 'hoverBar';
            tags.innerHTML = '#'+tagArray[0]+' #'+tagArray[1]+' #'+tagArray[2];
            newGif.className = 'newGif';
            newDiv.className = 'gifCont';
            newDiv.appendChild(newGif);
            newDiv.appendChild(hoverBar);
            hoverBar.appendChild(tags);
            trend_content.appendChild(newDiv);
            document.getElementsByClassName('newGif')[i].src = url;
        }
    })
    .catch(error => console.error(error))
/*
function create_guifosCont() {
    let newDiv = document.createElement('div');
    let newGif = document.createElement('img');
    let trend_content = document.getElementById('trend_content');
    newGif.className = 'newGif'+[i]
    newDiv.appendChild(newGif);
    trend_content.appendChild(newDiv);
    return gifCont
}
*/

