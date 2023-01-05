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
    },
    bookFilters: {
      filters: '.filters',
    }
  };

  const className = {
    favorite: 'favorite',
    hidden: 'hidden',
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
  // eslint-disable-next-line no-unused-vars
  const filters = [];

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

    const form = document.querySelector(select.bookFilters.filters);

    form.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value);
        if(event.target.checked == true){
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
        console.log(filters);
      }
      filterBooks();
    });
  }

  function filterBooks() {
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if(shouldBeHidden == true){
        bookImage.classList.add(className.hidden);
      } else {
        bookImage.classList.remove(className.hidden);
      }
    }
  }


  renderBooks();
  initActions();

}