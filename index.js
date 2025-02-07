const pdivloc = document.querySelector("#location")
let newLoc;
function findgeo(){
    navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        address(lat,lon);
        console.log("start")
    })
} 
 async function address(lat,lon){
        const token = "pk.6534e3094ee6cf98c0422d78e13e2f42";
        const url = `https://us1.locationiq.com/v1/reverse?key=${token}&lat=${lat}&lon=${lon}&format=json&`
        
        try{
            const data = await fetch(url)
            if(data.ok){
               const response = await data.json()
               newLoc=response.address.state_district
                    pdivloc.innerHTML=newLoc+" , "+response.address.state;
            }else{
                console.log("failed to fetch")
            }
        }catch(err){
            console.log("error :" ,err)
        }  
 }
findgeo()
let allProducts = []; 

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        allProducts = data.products; 
        displayProducts(allProducts); 
        setupCategoryFilters(); 
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; 
    
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img 
                    src="${product.thumbnail}" 
                    alt="${product.title}" 
                    class="product-image"
                >
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description.slice(0, 100)}...</p>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-rating">
                        <span>⭐ ${product.rating}</span>
                        <span>${product.stock} in stock</span>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

function setupCategoryFilters() {
    const navLinks = document.querySelectorAll('.timing a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
           
            navLinks.forEach(link => link.classList.remove('active'));
          
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('href').replace('#', '').toLowerCase();
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    let filteredProducts;
    
    switch(category) {
        case 'groceries':
            filteredProducts = allProducts.filter(product => 
                product.category === 'groceries' || 
                product.category === 'food');
            break;
        case 'beauty':
            filteredProducts = allProducts.filter(product => 
                product.category === 'skincare' || 
                product.category === 'fragrances');
            break;
        case 'furniture':
            filteredProducts = allProducts.filter(product => 
                product.category === 'furniture' || 
                product.category === 'home-decoration');
            break;
        case 'fragrances':
            filteredProducts = allProducts.filter(product => 
                product.category === 'fragrances');
            break;
        default:
            filteredProducts = allProducts;
    }
    
    displayProducts(filteredProducts);
}

document.addEventListener('DOMContentLoaded', fetchProducts);
