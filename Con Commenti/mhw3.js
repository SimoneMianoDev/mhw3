
const numResults = 15;

const key_anime = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MDYiLCJuYmYiOjE2NTEwNzI5NTMsImV4cCI6MTY1MzY2NDk1MywiaWF0IjoxNjUxMDcyOTUzfQ.vXVnOeiug5fHGn0BUaChuwY0JOnq3lBAUEs7i_vIGBc';		
const anime_api_endpoint = 'https://api.aniapi.com/v1/anime';

//Keys and endpoints			
const client_id = 'b5f17affb0da481da6a48ef2d44d8c87';
const client_secret = '056380bea19c4188af7578d47a5383e1';
const album_endpoint = 'https://api.spotify.com/v1/search?type=album&q='
let token;

/*
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
*/

// OTTENERE IL TOKEN
fetch("https://accounts.spotify.com/api/token", {
	method: "post",
	body: "grant_type=client_credentials",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		'Authorization': 'Basic '+ btoa(client_id + ':' + client_secret)
	}
}).then(onResponse).then(onJson_Token);

function onJson_Token(json) {
    console.log('Token ricevuto');
    console.log(json);

	token = json.access_token;
}

// VISUALIZZARE RISULTATI DELLA RICERCA ALBUM
function onJson_anime(json) {
    console.log('JSON Img ricevuto');
    // Stampiamo il JSON per capire quali attributi ci servono
    console.log(json);

     // Leggi il numero di risultati
    const results = json.data.documents;
     // Svuotiamo la libreria

	const album = document.querySelector('#album-view');

	album.innerHTML='';


    for(let result of results) {
            console.log(result +' questo e un result');

            const animeContainer = document.createElement('div');


            const img = document.createElement('img');
            img.src = result.cover_image;
            
            // img.addEventListener('click', apriModale);
        
            // Aggiungiamo immagine e didascalia al div
            animeContainer.appendChild(img);
            album.appendChild(animeContainer);
        }

}

/*
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
*/

// VISUALIZZARE RISULTATI DELLA RICERCA ANIME
function onJson_album(json) {
    console.log('JSON Img ricevuto');
    // Stampiamo il JSON per capire quali attributi ci servono
    console.log(json);

     // Leggi il numero di risultati
    const results = json.albums.items;
     // Svuotiamo la libreria

	const album = document.querySelector('#album-view');

	album.innerHTML='';


    for(let result of results) {
            console.log(result +' questo e un result');

            const animeContainer = document.createElement('div');


            const img = document.createElement('img');
            img.src = result.images[1].url;
            
        
            // Aggiungiamo immagine e didascalia al div
            animeContainer.appendChild(img);
            album.appendChild(animeContainer);
        }

}

/*
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
*/


function search(event){
	event.preventDefault();
  
	// Leggi valore del campo di testo
	const content = document.querySelector('#content').value;
	console.log(content);

	if (content){
		const text = encodeURIComponent(content);
		console.log(text);

		// Leggi l'opzione scelta
		const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' + tipo);

		//in base al tipo selezionato, eseguo funzioni diverse
		if(tipo === "anime") {
	  		// Esegui fetch
			  anime_request_by_title = anime_api_endpoint  +  '?key='  + key_anime + '&title=' + text + '&per_page=' + numResults;
			  console.log(anime_request_by_title);
			  fetch(anime_request_by_title).then(onResponse).then(onJson_anime);

			} else if(tipo === "genere") {

				anime_request_by_generes = anime_api_endpoint + '?key='  + key_anime + '&genres=' + text + '&per_page=' + numResults;
				console.log(anime_request_by_generes);

				fetch(anime_request_by_generes,{
					headers: {
						'Authorization': 'Bearer ' + access_token,
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					}
				}).then(onResponse).then(onJson_anime);

				} else if (tipo === "musica"){

					fetch (album_endpoint + text +'&per_page=' + numResults, 
						{
							headers: 
								{
									'Authorization':'Bearer ' + token
								}
						}).then(onResponse).then(onJson_album);

				}
	}

	else {
		alert("Brutto deficente, scrivi qualcosa. <3");
	}
	

}


function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


const form = document.querySelector('#search_content');
form.addEventListener('submit', search);



