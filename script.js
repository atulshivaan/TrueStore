let allProducts = [];
let cart = [];
let isCartOpen = false;

function bodyload() {
    fetchAllProducts();
    LoadCategories(); 
}
function LoadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then((response) => response.json())
        .then((data) => {
            data.unshift("All");
            const selectElement = document.getElementById("categorySelect");
            for (let item of data) {
                let option = document.createElement("option");
                option.text = item.toUpperCase();
                option.value = item;
                selectElement.appendChild(option);
            }
        })
        .catch((error) => {
            console.error("Error loading categories:", error);
        });
}

function fetchAllProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            allProducts = data;
            LoadProduct(allProducts); 
        })
        .catch((error) => {
            console.error("Error loading products:", error);
        });
}
function handleselect() {
    const selectedCategory = document.getElementById("categorySelect").value; 

    if (selectedCategory === "All") {
        LoadProduct(allProducts); 
    } else {
        const filteredProducts = allProducts.filter(
            (product) => product.category === selectedCategory
        );
        LoadProduct(filteredProducts);
    }
}
function LoadProduct(products) {
    const catalog = document.getElementById("catalog");
    catalog.innerHTML = ""; 

    products.forEach((item) => {
        let div1 = document.createElement("div");
        div1.className = "card m-2 p-2";
        div1.style.width = "200px";

        div1.innerHTML = `
            <img src="${item.image}" height="150" class="card-img-top" alt="${item.title}">
            <div class="card-header" style="height: 80px;">
                <p>${item.title}</p>
            </div>
            <div class="card-body">
                <dl>
                    <dt>Price</dt>
                    <dd>$${item.price}</dd>
                    <dt>Rating</dt>
                    <dd>${item.rating?.rate || "N/A"} (${item.rating?.count || 0} reviews)</dd>
                </dl>
                <button onclick="handleCart(${item.id})" class="btn btn-primary w-100">Add to Cart</button>
            </div>
        `;
        catalog.appendChild(div1);
    });
}

function handleCart(productId) {
    
    const product = allProducts.find((item) => item.id === productId);
    if (product) {
        
        cart.push(product);
        updateCartCount();  
        
      
        if (isCartOpen) {
            showCart();
        }
    }

    alert("Item added to cart!");
}

function updateCartCount() {
    const cartButton = document.querySelector(".btn-danger");
    cartButton.textContent = `View Cart (${cart.length})`;
}

function showCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; 
    cartContainer.style.display = "block"; 
    // map() to display cart items
    cart.map((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <p>Item: ${item.title}</p>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCartCount();
    showCart(); 
}

function toggleCart() {
    const cartContainer = document.getElementById("cart-items");
    isCartOpen = !isCartOpen;
    if (isCartOpen) {
        cartContainer.style.display = "block"; 
        showCart(); 
    } else {
        cartContainer.style.display = "none"; 
    }
}
