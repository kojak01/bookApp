{
  'use strict';

  const select = {
    bookSzablon: {
      template: '#template-book',
    },
    bookList: {
      lista: '.books-list',
    },
    book: {
      image: '.books-list .book__image'
    }
  };

  const className = {
    favorite: 'favorite',
  };

  // eslint-disable-next-line no-unused-vars
  const templates = {
    SzablonBook: Handlebars.compile(document.querySelector(select.bookSzablon.template).innerHTML),
  };

  function renderBooks(){
    for(let book of dataSource.books){
      const generatedHTML = templates.SzablonBook(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const containerMenu = document.querySelector(select.bookList.lista);
      containerMenu.appendChild(generatedDOM);
    }
  }
  const favoriteBooks = [];

  function initActions(){
    const books = document.querySelectorAll(select.book.image);
    for(let book of books){
      book.addEventListener('dblclick', function(event){
        if(event.target.offsetParent.classList.contains('book__image')){
          event.preventDefault();
          const clickedBook = book.getAttribute('data-id');
          if(!favoriteBooks.includes(clickedBook)){
            book.classList.add(className.favorite);
            favoriteBooks.push(clickedBook);
          } else {
            book.classList.remove(className.favorite);  
            const index = favoriteBooks.indexOf(clickedBook);
            favoriteBooks.splice(index, 1);
          }
        }
      });
    }
  }

  renderBooks();
  initActions();

}