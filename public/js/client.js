let todos = [];
let currentEl;
const getData = async () => {
    let todos = await (await fetch('http://localhost:3000/api/v1/data')).json();
    todos = todos.data.tasks;
    const items = await document.querySelector('.all-todos');
    for (let i = 0; i < todos.length; i++) {
        let HTML = `
        <div class="item">
            <div id="item-title">
				<h3 contenteditable="true" onclick="editTask(this)" spellcheck="false">
					${todos[i].title || 'Title'}
				</h3>
                <button id="remove-btn" onclick="deleteTask(this.parentNode)">X</button>
            </div>
            <div id="item-desc">
				<p contenteditable="true" onclick="editTask(this)" spellcheck="false">
				${todos[i].description || 'Description'} 
				</p>
			</div>
			<button class="edit-btn" onclick="updateTask(this)">Save</button>
        </div>
        `;
        items.innerHTML += HTML;
    }
};
getData();

const deleteTask = async (parentNode) => {
    try {
        const titleDelete = await parentNode.innerText.split('\n')[1];
        await axios.delete(`http://localhost:3000/api/v1/task/${titleDelete}`);
        parentNode.parentNode.remove();
    } catch (error) {
        parentNode.parentNode.remove();
    }
};

const updateTask = async (e) => {
    try {
        const titlePatch =
            await e.parentElement.firstElementChild.firstElementChild.innerHTML.trim();

        const descPatch = await e.parentElement.childNodes[3].innerText.trim();
        console.log(descPatch);
        await axios.patch(`http://localhost:3000/api/v1/task/${titlePatch}`, {
            title: titlePatch,
            description: descPatch,
        });
        console.log('success');
        removeBtn(e);
    } catch (error) {
        removeBtn(e);
        console.log(error);
    }
};

async function editTask(e) {
    currentEl = await e;
    e.parentElement.parentElement.lastElementChild.style.visibility = 'visible';
}

const removeBtn = async (e) => {
    e.style.visibility = 'hidden';
};

// const newThing = async (req, res) => {};
