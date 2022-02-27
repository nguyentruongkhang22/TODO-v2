let todos = [];
const url = 'https://stormy-escarpment-82036.herokuapp.com/';
const getData = async () => {
    let todos = await (await fetch(`${url}api/v1/data`)).json();
    todos = todos.data.tasks;
    const items = await document.querySelector('.all-todos');
    todos.forEach((element) => {
        let HTML = `
        <div class="item">
            <div id="item-title">
				<h3 contenteditable="true" onclick="editTask(this)" spellcheck="false">
					${element.title || 'Title'}
				</h3>
                <button class="remove-btn" onclick="deleteTask(\'${element['_id']}\',this.parentElement)">X</button>
            </div>
            <div id="item-desc">
				<p contenteditable="true" onclick="editTask(this)" spellcheck="false">
				${element.description || 'Description'} 
				</p>
			</div>
			<button class="edit-btn" onclick="updateTask(\'${element['_id']}\', this)">Save</button>
        </div>
        `;
        items.innerHTML += HTML;
    });
};

getData();

const deleteTask = async (currentId, item) => {
    try {
        item.parentElement.remove();
        console.log(currentId);
        await axios.delete(`${url}api/v1/task/${currentId}`);
    } catch (error) {
        // parentNode.parentNode.remove();
        console.log(error);
    }
};

const updateTask = async (currentId, e) => {
    try {
        const titlePatch = await e.parentElement.firstElementChild.firstElementChild.innerHTML.trim();
        const descPatch = await e.parentElement.childNodes[3].innerText.trim();
        console.log(descPatch);
        await axios.patch(`${url}api/v1/task/${currentId}`, {
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
    e.parentElement.parentElement.lastElementChild.style.visibility = 'visible';
}

const removeBtn = async (e) => {
    e.style.visibility = 'hidden';
};
