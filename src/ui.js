class UI {
    constructor() {
        this.post = document.querySelector('#post');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';

    }

    showPosts(posts) {
        let output ='';

        posts.forEach((post) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>

                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
            `
        });
        this.post.innerHTML = output;

    }

    showAlert(msg, className) {
        this.clearAlert();

        // clear alert div
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        // get parent
        const container = document.querySelector('.postsContainer')
        // get posts
        const posts = document.querySelector('#post');
        container.insertBefore(div, posts);

        // time out 
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value ='';
        this.bodyInput.value='';
    }

    fillForm(data) {
        this.titleInput.value= data.title;
        this.bodyInput.value= data.body;
        this.idInput.value =data.id;
        
        this.changeFormState('edit');
    }

    changeFormState(state) {
        if (state === 'edit'){
            this.postSubmit.textContent ='Update Post';
            this.postSubmit.className ='post-submit btn btn-warning btn-block'

            // create a cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // get parent
            const parent = document.querySelector('.card-form');
            // get element to insert before
            const formEnd = document.querySelector('.form-end');
            // insert cancel button
            parent.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent ='Post It';
            this.postSubmit.className ='post-submit btn btn-primary btn-block'

            if( document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // clear id from hidden field
            this.clearIdInput();

            this.clearFields();


        }
    }

    clearIdInput() {
        this.idInput.value = '';
    }
    
}

export const ui = new UI();