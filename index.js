let ArrayOfBooks = []

        const filterBooks = (event) => {
            const searchQuery = event.target.value
            console.log("FROM FILTER", ArrayOfBooks)

            // fetch("https://striveschool-api.herokuapp.com/books")
            //     .then(response => response.json())
            //     .then(books => {

            //         const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
            //         renderBooks(filteredBooks)
            //     })



            const filteredBooks = ArrayOfBooks.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
            renderBooks(filteredBooks)

        }


    


        window.onload = async () => {

            try {
                const responseObj = await fetch("https://striveschool-api.herokuapp.com/books")
                const books = await responseObj.json()
                console.log(books)

                ArrayOfBooks = [...books]
                document.querySelector("input").classList.remove("d-none")

                renderBooks(books)
            } catch (err) {
                console.log(err)
            }

            console.log("FROM WINDOW ONLOAD", ArrayOfBooks)
        }

        const renderBooks = (array) => {
            
            const row = document.getElementById('row')
            if (Array.isArray(array)) {
                array.forEach(book => {
                    const col = document.createElement("div")
                    col.className = "col-md-3"

                    col.innerHTML =
                        `<div class="card">
                        
                            <img src="${book.img}" class="card-img-top" alt="${book.title}" height="300"/>
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.category}</p>
                                <p class="card-text">$${book.price}</p>
                                </div>
                                <button  class="btn btn-primary m-2" onclick="addCart(event)">Add To Cart</button>
                                <button  class="btn btn-warning m-2" onclick="hideCard(event)">Skip This Book</button>
                                
                                </div>`

                    row.appendChild(col)
                })
            } else {
                // alert("please provide a proper array")
            }
        }
        renderBooks()


        const hideCard = (event) => {
            let card = event.target.closest(".card")
            card.classList.add('d-none')
            
        }

        
        const list = document.getElementById('cartList')
        const addCart = (event) => {
            const newButton = document.createElement('button')
            newButton.classList.add('newButton')
            newButton.innerHTML="Added To Cart!"
            let added = event.target.closest('.card')
            added.appendChild(newButton)
          
        }
       



        
