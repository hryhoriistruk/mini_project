

const url = 'https://jsonplaceholder.typicode.com/users/';
const id = new URL(location.href).searchParams.get('id');
let userDetails = document.querySelector('.userDetails');
let renderPosts = document.querySelector('.renderPosts');


async function getUser() {
    try {
        let result = await fetch(url + id);
        return result.json();
    } catch (error) {
        userDetails.innerHTML = 'Lost connection with server';
        console.log(error);
    }
}


async function getPosts() {
    try {
        let result = await fetch(url + id + '/posts');
        return result.json();
    } catch (error) {
        renderPosts.innerHTML = 'Lost connection with server';
        console.log(error);
        renderPosts.classList.add('show-post');
        // let postsBut = document.querySelector('.posts')
        // let click = false;
        // postsBut.addEventListener('click', () => {
        //     (!click) ? renderPosts.classList.add('show-post') : renderPosts.classList.remove('show-post');
        //     click = !click;
        // })
    }
}


async function renderUser() {
    let user = await getUser();
    createUser(user, userDetails)
}


function createUser(obj, tag) {
    for (const key in obj) {
        if (typeof obj[key] !== 'object') {
            let keyDiv = document.createElement('div');
            keyDiv.innerHTML = `${key.toUpperCase().fontcolor('#383638')}: ${obj[key]}`
            tag.append(keyDiv);
        } else {
            let div = document.createElement('div');
            div.classList.add('sub');
            div.innerHTML = key.toUpperCase().fontcolor('#383638');
            createUser(obj[key], div);
            tag.append(div);
        }
    }
}

//Створюємо фунцію рендеру даних постів
async function renderAllPosts() {
    let posts = await getPosts();
    let postsBut = document.querySelector('.posts')
    let click = false;


    posts.forEach(post => {
        let divPost = document.createElement('div');
        let title = document.createElement('h6');
        let postBut = document.createElement('button');

        title.innerHTML = post.title;
        postBut.innerHTML = `Details`;
        postBut.classList.add('userBut');
        divPost.classList.add('divPost');

        divPost.append(title, postBut);
        renderPosts.appendChild(divPost);

        postBut.addEventListener("click", () => {
            location.href = `post-details.html?postId=${post.id}&userId=${id}`;
        })
    })


    postsBut.addEventListener('click', () => {
        (!click) ? renderPosts.classList.add('show-post') : renderPosts.classList.remove('show-post');
        click = !click;
    })
}


renderUser();
renderAllPosts();


let butPrev = document.querySelector('.prev');
butPrev.addEventListener('click', () => {
    window.location.href = 'index.html';
})