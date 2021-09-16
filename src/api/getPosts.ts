// GET https://www.dcard.tw/v2/posts?popular=true

export const getPosts = async() => {
    let data
    await fetch("/proxy_domain/posts", {
        method: "GET",
        headers: {
            'Content-Type': "application/json; charset=utf-8",
        },
        mode: "cors",
        credentials: 'include'
    })
        .then(response => response.json())
        .then(res => data = res)
        .catch(err => {
            console.info(`%c${err}`, "color: red")
        });
    return data;
}
