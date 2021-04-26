/* Funzione mostra più dettagli nella descrizone del piatto*/
function onMostraClick(event)
{
    const mostra=event.currentTarget;  
    const pa=mostra.parentElement.dataset.name;  

        mostra.textContent="▼ Mostra meno contenuti";
        for(let i in RESULTS)
        {
            if(pa===i)
            {
                const newDesc=document.createElement('p');
                newDesc.textContent=RESULTS[i].descrizione;
                mostra.parentElement.appendChild(newDesc);
            }
        }
    mostra.removeEventListener('click',onMostraClick);
    mostra.addEventListener('click',onNotMostraClick);
}

/* Funzione mostra meno dettagli nella descrizone del piatto*/
function onNotMostraClick(event)
{
    const mostra=event.currentTarget;  
    const pa=mostra.parentElement; 
    mostra.textContent="▶ Mostra di piu";
    const t=pa.querySelector('section p');
    t.remove();
    mostra.removeEventListener('click',onNotMostraClick);
    mostra.addEventListener('click',onMostraClick);
}
/* Funzione che aggiunge glie elementi ai preferiti */
function PreferClick(event)
{
    let titolo;
    let img;
    const star=event.currentTarget;
    const pa=star.parentElement.dataset.name;
    document.querySelector('.Preferiti').classList.remove('hidden');
    for (let i in RESULTS) 
    {
        if(pa===i)
        {
            titolo=RESULTS[i].titolo;
            img=RESULTS[i].img;
        }
    }
    contatore++;
    const pref=document.querySelector('.Preferiti');
    const newDiv=document.createElement('div');
    newDiv.classList.add('pref');
    pref.appendChild(newDiv);
    const app=document.createElement('h1');
    app.textContent=titolo;
    newDiv.appendChild(app);
    const newImg=document.createElement('img');
    newImg.src=img;
    newImg.classList.add('WHImg');
    newDiv.appendChild(newImg);
    const newImg2=document.createElement('img');
    newImg2.src="./img/menored.png";
    newImg2.classList.add('img2');
    newDiv.appendChild(newImg2);
    star.removeEventListener('click',PreferClick);
    newImg2.addEventListener('click',NotPreferClick);
}

/* Funzione che toglie dai preferiti l'elemento*/
function NotPreferClick(event)
{

    const menored=event.currentTarget;
    const pa=menored.parentElement;
    const pe=document.querySelectorAll(".item");
    const tit=pa.querySelector('h1').textContent;
    for (let i of pe) 
    {
        for (let j in RESULTS) 
        {

            if(tit===RESULTS[j].titolo)
            {
                const botton=i.querySelector('.imgplus');                
                botton.addEventListener('click',PreferClick);
            }          
        }
    }
    pa.remove();
    contatore--;
    if(contatore===0)
    {
        document.querySelector('.Preferiti').classList.add('hidden');
    }
}

/* Funzione che permette di fare la ricerca nella sezione contenuti*/
function SearchPress()
{
    const input=document.getElementById('cerca');
    const filter =input.value.toUpperCase();
    const table=document.querySelector('section');
    const items = table.getElementsByClassName('item');
    
      
        for (let i = 0; i < items.length; i++) 
        {
          let titolo  = items[i].getElementsByTagName('h1')[0];
          if (titolo) {
          let  txtValue = titolo.textContent;
          //txtValue=txtValue.substring(0,filter.length); -------Se volessi cercare solo gli elementi che iniziano per il testo cercato
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              items[i].style.display = "";
            } 
            else {
              items[i].style.display = "none";
            }    
          }    
        }
}

/* Creazione sezione contenuti caricando dal file contents le informazioni */
let contatore=0;
const c=document.querySelectorAll(".item");
for (let divs of c) 
{
    for (let p in RESULTS) 
    {
         if(divs.dataset.name===p)
         {
            const newIMG= document.createElement('img');
            newIMG.src=RESULTS[p].img;
            const newTitle= document.createElement('h1');
            newTitle.textContent=RESULTS[p].titolo;
            const testo= document.createElement('h4');
            testo.textContent="Add preferiti";
            testo.classList.add('prefer');
            const newMostra= document.createElement('h4');
            newMostra.textContent="▶ Mostra di piu";
            newMostra.classList.add('mostra');
            newMostra.addEventListener('click',onMostraClick);
            const newIMG2= document.createElement('img');
            newIMG2.classList.add('imgplus');
            newIMG2.src="./img/plus.png";
            newIMG2.addEventListener('click',PreferClick);
            divs.appendChild(testo);
            divs.appendChild(newIMG2);
            divs.appendChild(newIMG);
            divs.appendChild(newTitle);
            divs.appendChild(newMostra); 
         }       
    }
}

/* Creazione preferiti sopra la sezione contenuti*/
const pref=document.querySelector('.Preferiti');
const newDiv=document.createElement('div');
newDiv.classList.add('text');
pref.appendChild(newDiv);
const text=document.createElement('h1');
text.textContent="I miei piatti preferiti";
newDiv.appendChild(text);
pref.classList.add('hidden');
/* Creazione tasto cerca sopra la sezione contenuti*/
const cerca=document.querySelector('#cerca');
cerca.addEventListener('keyup',SearchPress);









