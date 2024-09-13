const cardsPerPage = 2;
const content = document.getElementById('content');
const cards = Array.from(content.getElementsByClassName('card'));
const totalPages = Math.ceil(cards.length/cardsPerPage);
const pageLinks = document.querySelectorAll('.page-link'); 
const pageNumbers = document.getElementById('page-no'); 
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let currentPage = 1; 

pageLinks.forEach((link) => { 
    link.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const page = parseInt(link.getAttribute('data-page')); 
        if (page !== currentPage) { 
            currentPage = page; 
            displayPage(currentPage); 
            updatePagination(); 
        } 
    }); 
}); 

function displayPage(page) {
    const startIndex = (page-1)*cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    cards.forEach((card, index)=>{
        if(index >= startIndex && index < endIndex){
            card.style.display = 'block';
        }else{
            card.style.display = 'none';
        }
    });
}

function updatePagination() { 
    pageNumbers.textContent = 
        `Page ${currentPage} of ${totalPages}`; 
    pageLinks.forEach((link) => { 
        const page = parseInt(link.getAttribute('data-page')); 
        link.classList.toggle('active', page === currentPage); 
    }); 
} 

leftBtn.addEventListener('click', ()=>{
    console.log("left btn clicked")
    if(currentPage > 1){
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
});

rightBtn.addEventListener('click', ()=>{
    console.log("right btn clicked")
    if(currentPage < totalPages){
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
});


// Initial page load 
displayPage(currentPage); 
updatePagination();