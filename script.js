const apikey = '6a4d0c80320c41aa991ab9dd7a08f205';

const blogContainer = document.getElementById("blog-container");
const searchFeild = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const urlName = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apikey=${apikey}`;
        const response = await fetch(urlName);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


async function fetchNewsQuery(query) {
    try {

        const urlName = `https://newsapi.org/v2/everything?q=${query}&pageSize=50&apikey=${apikey}`;
        const response = await fetch(urlName);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchFeild.value.trim();
    if (query !== "") {
        try {

            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        const img = document.createElement("img");

        img.src = article.urlToImage || "default-image.jpg";
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30
            ? article.title.slice(0, 30) + "...."
            : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");

        const truncatedDes = article.description && article.description.length > 120
            ? article.description.slice(0, 120) + "...."
            : article.description || "No description available";
        description.textContent = truncatedDes;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogcard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
