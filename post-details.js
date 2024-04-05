
const url = 'https://jsonplaceholder.typicode.com/posts/';
const postId = new URL(location.href).searchParams.get('postId');
let renderPost = document.querySelector('.renderPost');
let renderComments = document.querySelector('.renderComments');


async function getPost() {
    try {
        let result = await fetch(url + postId);
        return result.json();
    } catch (error) {
        renderPost.innerHTML = 'Lost connection with server';
        console.log(error);
    }
}


async function getComments() {
    try {
        let result = await fetch(url + postId + '/comments');
        return result.json();
    } catch (error) {
        renderComments.innerHTML = 'Lost connection with server';
        console.log(error);
    }
}


function createBlock(mass, tag) {
    for (const key in mass) {
        let keyDiv = document.createElement('div');
        keyDiv.innerHTML = `${key.toUpperCase().fontcolor('#383638')}: ${mass[key]}`
        tag.append(keyDiv);
    }
}


async function renderAllPost() {
    let post = await getPost();
    let renderPost = document.querySelector('.renderPost');
    createBlock(post, renderPost);
}


async function renderAllComments() {
    let comments = await getComments();
    let renderComments = document.querySelector('.renderComments');
    for (const comment of comments) {
        let comDiv = document.createElement('div');
        comDiv.classList.add('comDiv');
        createBlock(comment, comDiv);
        renderComments.append(comDiv)
    }
}


renderAllPost();
renderAllComments()


const userId = new URL(location.href).searchParams.get('userId');
let butPrev = document.querySelector('.prev');
butPrev.addEventListener('click', () => {
    window.location.href = `user-details.html?id=${userId}`;
})