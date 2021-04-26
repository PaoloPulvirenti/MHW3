
function cerca(event)
{
    event.preventDefault();
    //randomImage
    const contenuto=document.querySelector('#tipo').value;
    let Richiesta='https://foodish-api.herokuapp.com/api/images/'+contenuto;
    fetch(Richiesta).then(onResponse).then(onJson);
    //randomImage

    //richiesta prodotti
    prodottoUrl="/recipes/complexSearch?query="+contenuto+"&number="+nProdotti;
    let RichiestaProdotti=Url+prodottoUrl+"&apiKey="+APIKey;
    fetch(RichiestaProdotti).then(onResponse).then(onJsonProduct);
    //richiesta prodotti

    
}

function onJsonProduct(json)
{
    console.log(json);
    let div=document.querySelector("#prodotto");
    div.innerHTML='';
    let p=document.querySelector('#testoCibo')
    p.textContent="Inoltre ci sono altri prodotti come questi!!";
    p.classList.remove('hidden');    
    let doc;
    for(let i=0;i<nProdotti;i++)
    {
        doc=json.results[i];
        let div2=document.createElement('div');
        let imgDoc=document.createElement('img');
        imgDoc.src=doc.image;
        let titoloImg=document.createElement('h1');
        titoloImg.textContent=doc.title;
        div2.appendChild(imgDoc);
        div2.appendChild(titoloImg);
        div.appendChild(div2);
    }
}

function onJson(json)
{
    console.log(json);
    let div=document.querySelector('#foto');
    div.innerHTML='';
    let imgDoc=document.createElement('img');
    imgDoc.src=json.image;
    imgDoc.classList.add('grandezza');
    div.appendChild(imgDoc); 

}
function onResponse(response)
{
	return response.json();
}


const form=document.querySelector('#ricerca');
form.addEventListener('submit',cerca);

//credenziali spoonacular

const APIKey="4809006e91064a3aa64c8d8ceabd554a";
let Url="https://api.spoonacular.com/";
let nProdotti=2;
//credenziali spoonacular







