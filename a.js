const fs = require("fs").promises;

const api = (cursor, limit) =>
  fetch(
    `https://api.juejin.cn/user_api/v1/follow/followees?aid=2608&uuid=7110085621494416896&user_id=2295436008498765&cursor=${cursor}&limit=${limit}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7,it;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        cookie:
          "MONITOR_WEB_ID=0cebc492-ed2c-4cfa-a7a4-2ed736558b25; _ga=GA1.2.915203784.1655445823; _tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227110085621494416896%2522%252C%2522user_unique_id%2522%253A%25227110085621494416896%2522%252C%2522timestamp%2522%253A1655445823612%257D; _gid=GA1.2.1367319112.1657504969",
        Referer: "https://juejin.cn/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  ).then((a) => a.json());

async function main() {
  let data = [0, 20, 40, 60, 80, 100, 120];
  let a = await Promise.all(data.map((i) => api(i, 20)));
  let res = a
    .map((r) => r.data.data)
    .flat()
    .sort((a, b) => a.follower_count - b.follower_count)
    .filter((user) => user.follower_count < 10 && user.post_article_count < 10);
  console.log(res, res.length);
  fs.writeFile("demo.json", JSON.stringify({ data: res }), (err) => {
    console.log(err);
  });
}
main();
