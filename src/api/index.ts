// GET https://www.dcard.tw/v2/posts?popular=true

fetch("/proxy_domain/posts", {
    method: "GET",
    headers: {
        'Content-Type': "application/json; charset=utf-8",
    },
    mode: "cors",
    credentials: 'include'
})
    .then(response => response.json())
    .then(json => {
        console.info(json)
    })
    .catch(err => {
        console.info(`%c${err}`, "color: red")
    })