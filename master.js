let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit = document.getElementById('submit');
let mood = 'create'

let tmp;
//Get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    }
    else {
        total.innerHTML = '';
    }
}

//Create Product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []; 
}

//Save LocalStorage

sumbit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if (title.value != '' && price.value != '' && category.value != ''
        && newPro.count < 1001
    ) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro[tmp] = newPro;
            mood = "create";
            sumbit.innerHTML = "create";
            count.style.display = "block";
        }
        clearData()
    }
    localStorage.setItem('product', JSON.stringify(dataPro))
    showData();
}

//Cleat inputs Data

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//Read

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}e</td>
                        <td><button onclick="updataData(${i})" id="update" >Updata</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    }
    else {
        btnDelete.innerHTML = ``
    }
}
showData();


//Delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//Updata
function updataData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    document.getElementById('submit').innerHTML = 'Update'
    mood = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth'
    })
}


//Search
let searchMood = 'title';

function getSearchMode(id) {
    let search = document.getElementById('search')
    if (id == 'searchTitle') {
        searchMood = 'title'
        search.placeholder = 'search by title'
    } else {
        searchMood = 'category'
        search.placeholder = 'search bb category'
    }
    search.focus()
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++){
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>phon${dataPro[i].category}e</td>
                        <td><button onclick="updataData(${i})" id="update" >Updata</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++){
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>phon${dataPro[i].category}e</td>
                        <td><button onclick="updataData(${i})" id="update" >Updata</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//Dark Mode 
let dark = document.getElementById('dark');
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        dark.innerHTML = `Light Mode
                <i class="fa-solid fa-moon"></i>`
    } else {
        dark.innerHTML = `Dark Mode
                <i class="fa-solid fa-moon"></i>`
    }
}

//clean data
