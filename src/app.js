import {http} from './http';
import {ui} from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#post').addEventListener('click', deletePost);
document.querySelector('#post').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;
    const data ={
        title,
        body
    }

    if(title === '' || body=== ''){
        ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
        // check if edit
        if(id === ''){
            // create post
            // create post
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                ui.showAlert('Post Added!', "alert alert-success");
                ui.clearFields();
                getPosts();
            })
            .catch(err => console.log(err))
        } else {
            // update post
            http.put(`http://localhost:3000/posts/${id}`, data)
            .then(data => {
                ui.showAlert('Post Updated!', "alert alert-success");
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err))
        }
    

    }

}

function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete'))
    {
        const id = e.target.parentElement.dataset.id;
        if (confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(data => {
                    ui.showAlert('Post deleted', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err))
        }
        
    }
    e.preventDefault();
}

function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        // console.log(e.target.parentElement.dataset.id)
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // fill form with current data
        ui.fillForm(data);

        
    }


    e.preventDefault();
}


function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}