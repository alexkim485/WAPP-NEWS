const apiKey = 'a290de4fa51e41c0860a83b11b700b02';
const defaultSource = 'Wired';
const sourceSelector = document.querySelector('#sources');
const newsArticles = document.querySelector('main');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e => {
  sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
  updateNewsSources().then(() => {
    sourceSelector.value = defaultSource;
    updateNews();
  });
});

window.addEventListener('online', () => updateNews(sourceSelector.value));

async function updateNewsSources() {
  const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
  const json = await response.json();
  sourceSelector.innerHTML =
    json.sources
      .map(source => `<option value="${source.id}">${source.name}</option>`)
      .join('\n');
}

async function updateNews(source = defaultSource) {
  newsArticles.innerHTML = '';
  const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
  const json = await response.json();
  newsArticles.innerHTML =
    json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
    <div class="fx-d">
    <div class="fx-10">
    <div class="fx-d fx-col fx-col-rwd">
    <div class="fx-4 card card-hover bg-white rd-8 mr-16">
    <div class="fx-d fx-j-ct">
    <div class="article">
    <a href="${article.url}" >
     <h2>${article.title}</h2>
      <h4>${article.author}<h4>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
        <a href="${article.url}" class="btn btn-c-1 btn-blk rd-8"><i class=""></i>Read Full Article</a>

      </a>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  `;
}
