let myLibrary = []

// BOOK OBJECT CREATOR

function Book(title, author, pages, readit) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readit = readit
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + readit
    }
}

const theLittlePrince = new Book("The Little Prince", "Antoine de Saint-Exupéry", "96", "yes")
const donQuixote = new Book("Don Quixote", "Miguel de Cervantes", "462", "no")

// ADD INITIAL BOOKS TO LIBRARY

function addBookToLibrary(book) {
    myLibrary.push(book)
}

addBookToLibrary(theLittlePrince);
addBookToLibrary(donQuixote);
displayFullLibrary();

// LIBRARY MANAGEMENT

function displayBook(index) {
    const book = myLibrary[index];
        
    const bookCard = document.createElement("div")
    bookCard.classList.add("card")

    const cardFirstDiv = document.createElement("div")
    cardFirstDiv.classList.add("card-first-div")

    const cardSecondDiv = document.createElement("div")
    cardSecondDiv.classList.add("card-second-div")

    bookCard.appendChild(cardFirstDiv)
    bookCard.appendChild(cardSecondDiv)

    const bookTitle = document.createElement("h3")
    bookTitle.textContent = book.title
    bookTitle.classList.add("book-title")
    
    const bookAuthor = document.createElement("div")
    bookAuthor.textContent = book.author
    bookAuthor.classList.add("book-author")

    const bookPages = document.createElement("div")
    bookPages.textContent = book.pages + " pages"
    bookPages.classList.add("book-pages")

    const bookInfoDiv = document.createElement("div")
    bookInfoDiv.appendChild(bookAuthor)
    bookInfoDiv.appendChild(bookPages)

    const readItText = document.createElement("p")
    readItText.classList.add("read-it-text")
    readItText.textContent = "Read";

    const readitDivParent = document.createElement("div")
    readitDivParent.classList.add("read-it-div-parent")
    const readitDivChild = document.createElement("div")
    
    const readIt = document.createElement("label")
    readIt.classList.add("switch")
    const checkBox = document.createElement("input")
    checkBox.setAttribute("type","checkbox")
    if (book.readit == "yes") {
        checkBox.checked = true;       
    }
    else if (book.readIt == "no") {
        checkBox.checked = false;
    }

    const slider = document.createElement("div")
    slider.classList.add("slider")
    slider.classList.add("round")

    readIt.appendChild(checkBox)
    readIt.appendChild(slider)

    readitDivChild.appendChild(readIt)

    readitDivParent.appendChild(readItText)
    readitDivParent.appendChild(readitDivChild)

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    deleteButton.textContent = "Delete Book";
    deleteButton.setAttribute("data-booknumber",index);
    
    cardFirstDiv.appendChild(bookTitle)
    cardFirstDiv.appendChild(bookInfoDiv)
    cardSecondDiv.appendChild(deleteButton)
    cardSecondDiv.appendChild(readitDivParent)
    
    const cards = document.querySelector("#cards")
    cards.appendChild(bookCard)
}

function displayFullLibrary() {
    for (let index = 0; index < myLibrary.length; index++) {
        displayBook(index);
    }
}

function displayNewBook() {
    const lastBookIndex = (myLibrary.length)-1;
    displayBook(lastBookIndex);
}

function emptyOnScreenLibrary() {
    const booksOnScreen = document.querySelectorAll(".card")
    const cards = document.querySelector("#cards")

    for (let i = 0; i < booksOnScreen.length; i++) {   
        cards.removeChild(booksOnScreen[i])
    }
}

function deleteBook(book){
    myLibrary.splice(book, 1);
}

// FORM POP-UP

// Open close form

function openForm() {
    document.getElementById("book-form-div").style.display = "flex";
}

function closeForm() {
    document.getElementById("book-form-div").style.display = "none";
}

const newBookBtn = document.getElementById("new-book-btn")
newBookBtn.addEventListener('click', () => {
    openForm();
});

// Send Form

const bookForm = document.querySelector("#book-form")
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(bookForm.title.value, bookForm.author.value, bookForm.pages.value, bookForm.readit.value)
    addBookToLibrary(newBook);
    displayNewBook();
})

// Events

const outsideForm = document.querySelector(".form-popup")
outsideForm.addEventListener('click', function(e) {
    if (e.target.classList.contains('form-popup')) {
        closeForm();
        console.log(e);
    }
});

const cardsParent = document.getElementById("cards")
cardsParent.addEventListener("click", function (e) {
    if (e.target.matches(".delete-button")) {
        deleteBook(e.target.dataset.booknumber);
        emptyOnScreenLibrary()
        displayFullLibrary();
    }
}, false);