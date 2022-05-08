if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// array

let movies = [
    {
        "id": 1, 
        "title": "The Call", 
        "director": "Lee Chung-hyeon", 
        "runtime": "1Hr 52min", 
        "release_year": 2020, 
        "description": "Connected by phone in the same home but 20 years apart, a serial killer puts another woman's past -- and life -- on the line to change her own fate.", 
        "poster_url":  document.appendChild(call), 
        "cinema_number": 1, 
        "ticket_price": 10, 
        "tickets_in_cart": 0 
    },
    {
        "id": 2, 
        "title": "Fractured", 
        "director": "Brad Anderson", 
        "runtime": "1Hr 40min", 
        "release_year": 2019, 
        "description": "After his wife and injured daughter disappear from the emergency room, a man becomes convinced the hospital is hiding something.", 
        "poster_url":"./images/fractured.jpg", 
        "cinema_number": 2, 
        "ticket_price": 15, 
        "tickets_in_cart": 0 
    },
    {
        "id": 3, 
        "title": "Sightless", 
        "director": "Cooper Karl", 
        "runtime": "1Hr 29min", 
        "release_year": 2020, 
        "description": "After a vicious attack leaves a young woman blind, she must fight back to escape her new reality in which people are not who they seem to be.", 
        "poster_url": "./images/sightless.jpg", 
        "cinema_number": 3, 
        "ticket_price": 15, 
        "tickets_in_cart": 0 
    },
    {
        "id": 4, 
        "title": "Room", 
        "director": "Cooper Karl", 
        "runtime": "1Hr 29min", 
        "release_year": 2020, 
        "description": "After a vicious attack leaves a young woman blind, she must fight back to escape her new reality in which people are not who they seem to be.", 
        "poster_url": "./images/room.jpg", 
        "cinema_number": 4, 
        "ticket_price": 10, 
        "tickets_in_cart": 0 
     },
     ];
//  function that is called to listen to the btn click event handler and remove the row when remove buttton is clicked 
function ready() {
    var removeCartItem = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartItem.length; i++) {
        var button = removeCartItem[i]
        button.addEventListener('click', removeCartItem)
    }

   
//  when book ticket btn is clicked and add movies to an array
    var addMovie = document.getElementsByClassName('book-ticket')
    for (var i = 0; i < addMovie.length; i++) {
        var button = addMovie[i]
        button.addEventListener('click', bookTicket)
    }

    
}


//  function that is called when remove buttton is clicked and it calls the updatecart function that will keep track of the index
function removeTicket(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCart()
}
// when quantity of movies changes but cant be lower than 1 user enters a number and num not less that 1
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCart()
}
// function for when book ticket is clicked
function bookTicket(event) {
    var button = event.target
    var movieItem = button.parentElement.parentElement
    var title = movieItem.getElementsByClassName('movie-title')[0].innerText
    var price = movieItem.getElementsByClassName('movie-price')[0].innerText
    
    addMovieToCart(title, price) 
    updateCart()
}

function addMovieToCart(title, price){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This movie is already in the cart')
            return
        }
    }
    // template literals
    var MoviesInCart = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = MoviesInCart
    cartItems.append(cartRow)
    // calls the remove movie function when the remove button is clicked
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeTicket)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
//  updates cart when an item is added 
function updateCart() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    // loops through cart rows and gets price and quantity
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var moviePrice = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // Replace rand sign with an empty space
        var rand = parseFloat(moviePrice.innerText.replace('R', ''))
        var quantity = quantityElement.value
        total = total + (rand * quantity)
    }
    //total cost calculation
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('totalCost')[0].innerText = 'R' + total
}