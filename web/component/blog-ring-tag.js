const template = document.createElement('template');

template.innerHTML = `
        <div id='blogcard'>
            I recommend <a target='_blank' id='link' href=''></a>. <span id="description"></span> &nbsp;<span id="next_post" title='Get New Blog' style='cursor: pointer;'>♻️</span>
        </div>
        `

class BlogRing extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.totalPosts = 0;
        this.getMetaData();
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#next_post').addEventListener("click", (event) => {
            this.getRandomPost()
        });
        this.shadowRoot.querySelector('#description').addEventListener("click", (event) => {
            this.getRandomPost()
        });
    }


    getMetaData() {
        console.log("Get meta data");
        return new Promise((res, rej) => {
            fetch('https://data.thejeshgn.com/blogring/meta')
                .then(data => data.json())
                .then((json) => {
                    this.totalPosts = json['total']
                    this.getRandomPost();
                    res();
                })
                .catch((error) => rej(error));
        })
    }


    getRandomPost() {
        let random_blog = Math.floor((Math.random() * this.totalPosts) + 1)

        return new Promise((res, rej) => {
            fetch('https://data.thejeshgn.com/blogring/' + random_blog)
                .then(data => data.json())
                .then((json) => {
                    this.renderBlogring(json);
                    res();
                })
                .catch((error) => rej(error));
        })
    }

    renderBlogring(data) {
        console.log(this.shadowRoot);
        this.shadowRoot.querySelector('#link').href = data["url"];
        this.shadowRoot.querySelector('#link').innerHTML = data["title"];
        this.shadowRoot.querySelector('#description').innerHTML = data["description"];
    }

}

window.customElements.define('blog-ring', BlogRing);