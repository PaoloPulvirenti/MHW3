function Spotify(event)
{

    RichiestaSpotify='https://api.spotify.com/v1/search?type=playlist&q=';
    {
        fetch(RichiestaSpotify+event.currentTarget.value,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + tokenRisposta
                }
            }).then(onResponse).then(onJson);
            creaStruttura(event.currentTarget.textContent);
    }
}


function onJson(json)
{   
    const id=json.playlists.items[0].id;
    const url='https://api.spotify.com/v1/playlists/';
    fetch(url+id+"/tracks",
            {
                headers:
                {
                    'Authorization': 'Bearer ' + tokenRisposta
                }
            }).then(onResponse).then(onJsonPlaylist);
}

function onJsonPlaylist(json)
{   
    
    let div=document.querySelector("#immagini");    
    let div2=document.querySelector('#testo2');
    div2.innerHTML='';
    let intes2=document.createElement('p');
    intes2.textContent="Le canzoni riprodotte in questa sala!!";
    div2.appendChild(intes2);
    div.innerHTML='';
    
    for(let i=0;i<nTracce;i++)
    {
        divConteiner=document.createElement('div');
        divConteiner.classList.add('conteiner');
        let imgDoc=document.createElement('img');
        console.log(json);
        imgDoc.src=json.items[i].track.album.images[1].url;
        let intes=document.createElement('h2');
        intes.textContent='Titolo';
        intes.classList.add('intes');
        let intes1=document.createElement('h2');
        intes1.textContent='Autore';
        intes1.classList.add('intes');
        let titoloImg=document.createElement('h1');
        titoloImg.textContent=json.items[i].track.name
        let Autore=document.createElement('h1');
        Autore.textContent=json.items[i].track.album.artists[0].name;
        divConteiner.appendChild(imgDoc);
        divConteiner.appendChild(intes);
        divConteiner.appendChild(titoloImg);
        divConteiner.appendChild(intes1);
        divConteiner.appendChild(Autore);
       
        div.appendChild(divConteiner);
    }

    
}

function creaStruttura(nome)
{  
    let div=document.querySelector('#fotoSale');
    div.innerHTML='';
    let imgSale;
    let i=1;
    if(nome=='Sala Preziosa')i=2;
    do
    {
            imgSale=document.createElement('img');
            imgSale.src="img/"+nome+i+".jpg";
            div.appendChild(imgSale);
            i++;
    }while(i<5)

}


function onResponse(response)
{
	return response.json();
}

function onTokenSave(json)
{
    tokenRisposta=json.access_token;
}

//prendere il token per Spotify
const clientID="15761d5c553c4fd591573ca1fcf74f89";
const clientSecret="ed97a47f5866414e99f7c0e4368513d4";
let tokenRisposta;
let URLToken="https://accounts.spotify.com/api/token";
let nTracce=10; //album da visualizzare
fetch(URLToken,
    {
        method: "post",
        body: 'grant_type=client_credentials',
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' +btoa(clientID + ':' + clientSecret)
        }

    }).then(onResponse).then(onTokenSave);


//prendere il token per Spotify

const button=document.querySelectorAll("button");
for (let i = 0; i < button.length; i++) 
{
    button[i].addEventListener('click',Spotify);    
}


