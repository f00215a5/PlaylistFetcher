const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const axios = require('axios').default;

const CONFIG_FILE = 'apiConfig.json';
const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const VIDEO_API_URL = 'https://www.googleapis.com/youtube/v3/videos';
const LIST_URI_REGEX = /^https?:\/\/www\.youtube\.com\/playlist\?list=([A-Za-z0-9_-]+)$/;
const DIRECTORY_PATH = path.dirname(process.argv[0]); //process.argv[0] Get the directory where the file is located

let API_KEY = "";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let videoList = [];

const loadingConfig = () => {
    if(fs.existsSync(CONFIG_FILE)) {
        try {
            const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
            if (config.API_KEY) {
                API_KEY = config.API_KEY;
                console.log('成功讀取 API_KEY！');
                askPlaylistId();
                return;
            }
        } catch (error) {
            console.error('讀取設定檔失敗，請重新輸入 API_KEY。');
        }
    }
    setAPIKey();
};

const setAPIKey = () => {
    rl.question('請輸入你的 YouTube API_KEY: ', (input) => {
        if (!input.trim()) {
            console.error('API_KEY 不能為空，請重新輸入。');
            setAPIKey();
            return;
        }
        API_KEY = input.trim();
        const filePath = path.join(DIRECTORY_PATH, CONFIG_FILE);
        fs.writeFileSync(filePath, JSON.stringify({ API_KEY }, null, 2));
        console.log(`API_KEY 已儲存至 ${CONFIG_FILE}！`);
        askPlaylistId();
    });
};

const isValidListId = (input) => {
    const match = input.match(LIST_URI_REGEX);
    return match ? match[1] : input;
};

const askPlaylistId = () => {
    rl.question('輸入播放列表ID (輸入 "out" 可退出): ', (input) => {

        if (input.toLowerCase() === 'out') { 
            console.log('腳本關閉');
            rl.close();
            process.exit(0);
        }
        
        if (!input) {
            console.error('播放列表 ID 不能为空');
            askPlaylistId();
            return;
        }

        const playListId = isValidListId(input);

        getListInfo(playListId);
    });
};

const getListInfo = ((playlistId, pageToken) => {
    axios.get(API_URL, {
        params: {
            part: 'snippet',
            playlistId: playlistId,
            key: API_KEY,
            maxResults: 50,
            pageToken: pageToken,
        },
    })
    .then((res) => {
        let count = 1;
        videoList = [
            ...videoList, 
            ...res.data.items.map(item => item.snippet.resourceId.videoId)
        ];

        if(res.data.nextPageToken) {
            getListInfo(playlistId, res.data.nextPageToken);
        }

        getVideoInfo(videoList, playlistId);

    })
    .catch((err) => {
        console.log(err);
        askPlaylistId();
    })
})

const getVideoInfo = async (videoList, playlistId) => {

    let dataItems = [];

    for (const videoId of videoList) {
        try {
            const res = await axios.get(VIDEO_API_URL, {
                params: {
                    part: 'snippet',
                    id: videoId,
                    key: API_KEY,
                }
            });
            console.log(res.data.items[0].snippet.title);
            if (res.data.items && res.data.items.length > 0) {
                const item = res.data.items[0];
                dataItems.push({
                    channelId: item.snippet.channelId,
                    channelTitle: item.snippet.channelTitle,
                    description: item.snippet.description,
                    publishedAt: item.snippet.publishedAt,
                    thumbnails: {
                        ...(item.snippet.thumbnails.maxres ? { maxres: { url: item.snippet.thumbnails.maxres.url } } : {}),
                        high: { url: item.snippet.thumbnails.high.url },
                    },
                    title: item.snippet.title,
                    videoId: item.id,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    exportJsonFile(dataItems, playlistId);
}

const exportJsonFile = (dataItems, playlistId) => {

    const outputDir = path.join(DIRECTORY_PATH, 'output');
    const fileName = `playlist_${playlistId}.json`;
    const filePath = path.join(outputDir, fileName);
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const jsonData = JSON.stringify(dataItems, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log(`總共 ${dataItems.length} 筆資料`);
    console.log(`已經輸出至 ${filePath}`);
    console.log();
    askPlaylistId();
};

loadingConfig();