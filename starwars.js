// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado
let audio = new Audio('https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3');
audio.play();

function obtemListaDeFilmes() {
  $.ajax({
    url: "https://swapi.co/api/films/",
    method: 'GET',
    success: function (resposta) {
      ordenaEpisodios(resposta)
      preencheListaDeFilmes(resposta);
    }
  });
}

function obtemFilme(urlDoFilme) {
  $.ajax({
    url: urlDoFilme,
    method: 'GET',
    success: function (resposta) {
      let texto = 'Episode ' + converteParaRomano(resposta.episode_id) + '\n' +
        resposta.title.toUpperCase() + '\n\n' +
        resposta.opening_crawl;
      atualizaTexto(texto);
      audio.currentTime = 0;
      audio.play();
    }
  });
}

function atualizaTexto(texto) {
  let elementoTexto = document.querySelector('.container>.flow>.reading-animation');
  elementoTexto.innerText = texto;
  localStorage.setItem('ultimoFilme', texto);
}

function preencheListaDeFilmes(listaDeFilmes) {
  let navFilmes = document.querySelector('#movies');
  let elementoUl = document.createElement('ul');

  for (let i = 0; i < listaDeFilmes.count; i++) {
    let novoLi = document.createElement('li');
    let tituloDoFilme = listaDeFilmes.results[i].title;

    let texto = 'Episode ' + converteParaRomano(listaDeFilmes.results[i].episode_id) + ': ' + tituloDoFilme;

    novoLi.appendChild(document.createTextNode(texto));
    novoLi.addEventListener('click', () => {
      obtemFilme(listaDeFilmes.results[i].url);
    });
    elementoUl.appendChild(novoLi);
  }

  navFilmes.appendChild(elementoUl);
}

function converteParaRomano(numero) {
  const listaRomana = [null, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  return listaRomana[numero];
}

function ordenaEpisodios(listaDeFilmes) {
  listaDeFilmes.results.sort(function (a, b) {
    return a.episode_id - b.episode_id;
  });
}

obtemListaDeFilmes();
let ultimoFilme = localStorage.getItem('ultimoFilme');
if (ultimoFilme) {
  let elementoTexto = document.querySelector('.container>.flow>.reading-animation');
  elementoTexto.innerText = ultimoFilme;
}
