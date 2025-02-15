# PlaylistFetcher

`PlaylistFetcher` 是一個用於透過 YouTube 播放清單 ID 來抓取影片資訊的工具。這個腳本會根據提供的播放清單 ID，使用 YouTube Data API 獲取每個影片的標題、描述、發佈時間、縮圖等相關資訊。

## 功能

- 根據 YouTube 播放清單 ID 抓取影片資訊
- 顯示影片的標題、描述、發佈時間以及縮圖
- 使用者可以提供自己的 YouTube API 密鑰

## 安裝

1. 克隆專案：
    ```bash
    git clone https://github.com/f00215a5/PlaylistFetcher.git
    cd PlaylistFetcher
    ```

2. 安裝依賴：
    ```bash
    npm install
    ```

3. 創建 `config.json` 文件來儲存你的 API 密鑰，或者直接運行腳本時會提示你輸入 API 密鑰。

## 使用方法

1. 在終端中運行腳本：
    ```bash
    node index.js
    ```

2. 輸入你的 YouTube API 密鑰，這樣會將其保存在本地的 `config.json` 中。你可以使用它來進行後續的查詢。

3. 然後，腳本會要求你輸入 YouTube 播放清單 ID。輸入後，腳本將列出該播放清單中的所有影片資訊。

## 範例輸出

當你輸入有效的 API 密鑰和播放清單 ID 時，腳本會顯示每個影片的資訊，像是這樣：
```
  {
    "channelId": "",     // 頻道 ID
    "channelTitle": "",  // 頻道名稱
    "description": "",   // 影片資訊欄
    "thumbnails": {
      "maxres": {
        "url": ""        // 最大解析度縮圖 URL
      },
      "high": {
        "url": ""        // 高解析度縮圖 URL
      }
    },  
    "title": "",        // 影片標題
    "videoId": ""       // 影片 ID
  }
```

## 配置 API 密鑰

1. 當你首次運行腳本時，它會提示你輸入 YouTube API 密鑰。這個密鑰將儲存在本地的 `config.json` 中，以便後續使用。
2. 若要配置 API 密鑰，只需要執行以下命令：
    ```bash
    node index.js
    ```

3. 依照提示輸入 API 密鑰，並繼續執行腳本。

# PlaylistFetcher

`PlaylistFetcher` is a tool that fetches video information from a YouTube playlist using the playlist ID. This script uses the YouTube Data API to retrieve information such as video title, description, published date, thumbnails, and more for each video in the playlist.

## Features

- Fetch video information based on YouTube playlist ID
- Display video title, description, published date, and thumbnails
- Users can provide their own YouTube API key

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/f00215a5/PlaylistFetcher.git
    cd PlaylistFetcher
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `config.json` file to store your API key, or the script will prompt you to enter the API key when you run it.

## Usage

1. Run the script in your terminal:
    ```bash
    node index.js
    ```

2. Enter your YouTube API key when prompted. It will be saved locally in the `config.json` file for future use.

3. The script will then ask you to enter the YouTube playlist ID. After entering it, the script will list the video information for all videos in the playlist.

## Example Output

When you enter a valid API key and playlist ID, the script will display information for each video like this:
```
  {
    "channelId": "",     
    "channelTitle": "",  
    "description": "",  
    "thumbnails": {
      "maxres": {
        "url": ""    
      },
      "high": {
        "url": ""     
      }
    },  
    "title": "",       
    "videoId": ""     
  }
```

## Configure API Key

1. When you run the script for the first time, it will prompt you to enter your YouTube API key. The key will be stored in the local `config.json` file for later use.
2. To configure the API key, simply run the following command:
    ```bash
    node index.js
    ```

3. Follow the prompts to enter the API key and continue running the script.
