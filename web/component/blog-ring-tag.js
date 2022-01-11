const template = document.createElement('template');

template.innerHTML = `
        <div id='blogcard'>
            I recommend <a target='_blank' id='link' href=''></a>. <span id="description"></span> 
            &nbsp;<p id="next_post" title='Get New Blog' style='cursor: pointer;'>Click ♻️ for random blog.</p>
        
        </div>
        `

class BlogRing extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.totalPosts = 0;
    }
    

    async connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Get the metatadata of the blogring in sync
        //Most important one is total number of blogs
        //So then we can get one of the random blog.
        await this.getMetaData();        

        // Get a random Post and 
        this.getRandomBlog();

        this.shadowRoot.querySelector('#next_post').addEventListener("click", (event) => {
            this.getRandomBlog()
        });
    }

    /* This gets the meta data. We actually have to call this only once.
    *  We need to call this before we get the random blog
    */
    async getMetaData() {
        console.log("Get meta data");
        const response = await fetch("https://data.thejeshgn.com/blogring/meta");
        const json = await response.json();
        this.totalPosts = json['total'];
    }


    getRandomBlog() {
        let random_blog = Math.floor((Math.random() * this.totalPosts) + 1)
        console.log("random_blog",random_blog)
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
        this.shadowRoot.querySelector('#link').href = data["url"];
        this.shadowRoot.querySelector('#link').innerHTML = data["title"];
        this.shadowRoot.querySelector('#description').innerHTML = data["description"];
    }

}

window.customElements.define('blog-ring', BlogRing);