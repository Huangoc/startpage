function dateTime() {
	const date = new Date();
	
	// 中文日期格式
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const weekDay = weekDays[date.getDay()];
	
	const today = `${year}年${month}月${day}日 ${weekDay}`;
	
	// 中文时间格式
	const time = date.toLocaleTimeString('zh-CN', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
	
	document.getElementById('date-time').innerHTML = '<p id="date">' + today + '</p><p id="time">' + time + '</p>';
	setTimeout(dateTime, 1000);
}

function weatherBalloon(cityID) {
	var apiKey = ''; //OpenWeather API key
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + apiKey)
		.then(function(resp) {
			return resp.json()
		})
		.then(function(data) {
			let weatherIcon = data.weather[0].icon;
			let tempK = parseFloat(data.main.temp);
			let tempC = Math.round(tempK - 273.15);
			let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
			document.getElementById('weather').innerHTML = '<p id="location">' + data.name + '</p><p id="details" ' + 'title="' + tempF + '&deg;F">' + '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '.png">' + data.weather[0].description + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
		});
}

function setSearchEngine(engine) {
	const searchForm = document.getElementById('search-form');
	const searchInput = document.getElementById('search-input');
	const searchEngineSelector = document.getElementById('search-engine-selector');
	const baiduIcon = searchEngineSelector?.querySelector('.baidu-icon');
	const googleIcon = searchEngineSelector?.querySelector('.google-icon');

	if (!searchForm || !searchInput || !searchEngineSelector || !baiduIcon || !googleIcon) {
		return;
	}

	if (engine === 'google') {
		searchEngineSelector.dataset.engine = 'google';
		searchEngineSelector.setAttribute('aria-label', '当前搜索引擎：Google，点击切换至 Baidu');
		searchEngineSelector.setAttribute('title', '当前：Google（点击切换至 Baidu）');
		searchForm.action = 'https://www.google.com/search';
		searchInput.name = 'q';
		baiduIcon.style.display = 'none';
		googleIcon.style.display = 'block';
	} else {
		searchEngineSelector.dataset.engine = 'baidu';
		searchEngineSelector.setAttribute('aria-label', '当前搜索引擎：Baidu，点击切换至 Google');
		searchEngineSelector.setAttribute('title', '当前：Baidu（点击切换至 Google）');
		searchForm.action = 'https://www.baidu.com/s';
		searchInput.name = 'wd';
		baiduIcon.style.display = 'block';
		googleIcon.style.display = 'none';
	}

	try {
		localStorage.setItem('searchEngine', searchEngineSelector.dataset.engine);
	} catch (error) {
		// Ignore storage errors (e.g., disabled storage)
	}
	searchInput.focus();
}

function switchSearchEngine() {
	const searchEngineSelector = document.getElementById('search-engine-selector');
	const nextEngine = (searchEngineSelector?.dataset.engine || 'baidu') === 'baidu' ? 'google' : 'baidu';
	setSearchEngine(nextEngine);
}

function traichu() {
	dateTime();
	weatherBalloon(1816670); //OpenWeather city ID - Beijing, China
    const selector = document.getElementById('search-engine-selector');
    if (selector) {
		selector.addEventListener('click', switchSearchEngine);
		let savedEngine = null;
		try {
			savedEngine = localStorage.getItem('searchEngine');
		} catch (error) {
			savedEngine = null;
		}
		setSearchEngine(savedEngine === 'google' ? 'google' : 'baidu');
	}
}
