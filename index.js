let books = [];

const getFilterBooks = async () => {
  books = [];
  document.querySelector(".row").innerHTML = "";

  const searchTerm = document.querySelector("input").value;
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/books"
    );
    const list = await response.json();

    console.log(list);
    const filterList = list.filter((book) => book.title.includes(searchTerm));

    console.log(filterList);

    list.forEach((element) => {
      if (element.title.includes(searchTerm)) {
        books.push(element);
        createCard(element);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  try {
    const responseObj = await fetch(
      "https://striveschool-api.herokuapp.com/books"
    );
    const books = await responseObj.json();
    console.log(books);

    ArrayOfBooks = [...books];
    document.querySelector("input").classList.remove("d-none");

    renderBooks(books);
  } catch (err) {
    console.log(err);
  }

  console.log("FROM WINDOW ONLOAD", ArrayOfBooks);
};

const renderBooks = (array) => {
  const row = document.getElementById("row");
  if (Array.isArray(array)) {
    array.forEach((book) => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      col.innerHTML = `<div class="card">
                        
                            <img src="${book.img}" class="card-img-top" alt="${book.title}" height="300"/>
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.category}</p>
                                <p class="card-text">$${book.price}</p>
                                </div>
                                <button  class="btn btn-primary m-2" onclick="addCart(event)">Add To Cart</button>
                                <button  class="btn btn-warning m-2" onclick="hideCard(event)">Skip This Book</button>
                                
                                </div>`;

      row.appendChild(col);
    });
  } else {
    // alert("please provide a proper array")
  }
};
renderBooks();

const hideCard = (event) => {
  let card = event.target.closest(".card");
  card.classList.add("d-none");
};

const list = document.getElementById("cart");
const addCart = (event) => {
  const newButton = document.createElement("button");
  newButton.classList.add("newButton");
  newButton.innerHTML = "Added To Cart!";
  let origonalCard = event.target.closest(".card");
  origonalCard.appendChild(newButton);
  const newDiv = document.createElement("div");
  newDiv.classList.add("card");
  const checkoutButton = document.createElement("button");
  checkoutButton.style.backgroundColor = "green";
  checkoutButton.style.color = "white";
  checkoutButton.innerHTML = "Checkout";
  const DeleteCartCard = document.createElement("button");
  DeleteCartCard.style.backgroundColor = "red";
  DeleteCartCard.style.color = "white";
  DeleteCartCard.innerHTML = "Remove From Cart";
  newDiv.innerHTML = origonalCard.innerHTML;
  newDiv.appendChild(checkoutButton);
  newDiv.classList.add("removeButton");
  newDiv.appendChild(DeleteCartCard);
  list.appendChild(newDiv);
  DeleteCartCard.addEventListener("click", () => {
    newDiv.remove();
  });

  const emptyCart = document.getElementById('emptyCart')
emptyCart.addEventListener('click', () =>{
    list.remove()
})

};

