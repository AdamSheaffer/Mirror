import '../node_modules/jquery.qrcode/jquery.qrcode.min';
import { Location } from 'location';
import { weatherService } from 'weather';
import { greetingService } from 'greeting';
import { voiceService } from 'voiceService';
import { clock } from 'clock';
import { newsService } from 'newsService';

const clockComponent = $('#clock');
const mainMessageComponent = $('#greeting');

/********* GLOBAL *********/
const hideAll = () => {
    $('#mirror').fadeOut(500);
}

const showAll = () => {
    $('#mirror').fadeIn(500);
}

/********* WEATHER *********/
const degreeChar = String.fromCharCode(176);

const createForecastHour = (forecast) => {
    let el = `<div class="forecast hour">${forecast.hour}</div>` + 
            `<img class="forecast icon" src="${forecast.icon}" />` +
            `<div class="forecast temp">` +
                `<span>${forecast.temp}</span>` +
                `<span class="degree">${degreeChar}</span>` +
            `</div>`;
    return el;
}

const onForecastReady = (forecast) => {
    let table = $('.hourly-forecast');
    table.empty();
    forecast.hourly.forEach((h) => {
        let td = $(`<td>${createForecastHour(h)}</td>`)
        table.append(td);
    })
};

const onConditionsReady = (conditions) => {
    let targetEl = $('.current-temp');
    let conditionsEl = $(`<h5>${conditions.location}</h5>` +
                        `<h1>${conditions.temp}${degreeChar}</h1>` +
                        `<p>${conditions.weather}</p>` +
                        `<img src="${conditions.icon}"/>`);
    targetEl.empty();
    targetEl.append(conditionsEl);
}

const onSunsetReady = (sunset) => {
    let targetEl = $('#sunset');
    let sunsetEl = $(`<div><img src="${sunset.iconUrl}" id="sunset-icon"><span class="sunset-message">${sunset.message}</span></div>`);
    targetEl.empty();
    targetEl.append(sunsetEl);
}

const location = new Location();
location.getCoords((coords) => {
    weatherService.subscribe('forecast', 900000, coords, onForecastReady);
    weatherService.subscribe('conditions', 1800000, coords, onConditionsReady);
    weatherService.subscribe('sunset', 1800000, coords, onSunsetReady);
});

/********* GREETING *********/
const setGreeting = () => {
    mainMessageComponent.text(greetingService.getCompliment());
};
setGreeting();

greetingService.loopCompliments(600, (comp) => {
    mainMessageComponent.text(comp);
});

/********* CLOCK *********/
clock.init((now) => {
    clockComponent.text(now.time);
});

/********* NEWS FEED *********/
const newsTargetEl = $('#news-feed');
let showingArticles = true;

const renderQrCode = (article) => {
    $('#qrcode').empty();
    $('#qrcode').qrcode({
        text: article.url,
        background: '#FFFFFF',
        foreground: '#000000',
        height: 100,
        width: 100
    });
}

const renderNewsArticle = (article) => {
    if (!showingArticles) return;

    newsTargetEl.empty();
    let articleEl = $(`<div class="row">` +
                        `<img class="thumbnail three columns" src="${article.urlToImage}" onerror="this.src='images/day/unknown.png'"/>` + 
                        `<div class="seven columns">` +
                            `<h5>${article.title}</h3>` +
                            `<p>${article.description}</p>` +
                        `</div>` +
                        `<div id="qrcode" class="two columns"></div>` +
                    `</div>`);
    newsTargetEl.append(articleEl);
    renderQrCode(article);
}

const getNewsSourceEl = (source) => {
    return $(`<div class="three columns news-source">` +
                `${source.name}` + 
            `</div>`);
}

const renderNewsSourcesPage = (sources) => {
    newsTargetEl.empty();
    sources.forEach((s) => {
        newsTargetEl.append(getNewsSourceEl(s));
    });
}

const getNewsSources = () => {
    showingArticles = false;
    newsService.unsubscribe();
    newsService.getSources(renderNewsSourcesPage);
}

const getNext = () => {
    let sources = newsService.getNextPageSources();
    renderNewsSourcesPage(sources);
}

const returnToNews = () => {
    if (showingArticles) return;
        showingArticles = true;
        newsService.unsubscribe();
        newsService.subscribe(45, 45, renderNewsArticle);
}

const getNewsFrom = (source) => {
    showingArticles = true;
    newsService.unsubscribe();
    newsService.changeSource(source, () => {
        newsService.subscribe(120, 45, renderNewsArticle);
    });
}

newsService.subscribe(45, 45, renderNewsArticle);

/********* VOICE *********/
const commandsEl = $('<ul></ul>');

const showCommands = () => {
    mainMessageComponent.empty();
    commandsEl.empty();
    voiceService.getTriggers().forEach((com) => {
        if (com === 'Show me commands') return;
        commandsEl.append(`<li class="command">${com}</li>`);
    });
    mainMessageComponent.append(commandsEl);
    setTimeout(setGreeting, 20000)
}

voiceService
    .whenSaid('Show me commands', showCommands)
    .whenSaid('How do I look', setGreeting)
    .whenSaid('Show me news sources', getNewsSources)
    .whenSaid('Show me next', getNext)
    .whenSaid('Show me the news', returnToNews)
    .whenSaid('Show me news from *source', getNewsFrom)
    .whenSaid('Go back', newsService.getPreviousArticle)
    .whenSaid('Hide all', hideAll)
    .whenSaid('Show all', showAll)
    .start();