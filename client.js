let buttons = document.querySelectorAll("button");
//let buttons = document.getElementsByClassName("item_btn");
let count = 1;
buttons.forEach(button => {
    button.addEventListener('click', function () {
        this.classList.add('active');
        if(count==1){
           document.getElementById('cart_content').innerHTML ="";   
        }
        //document.getElementById('cart_content').innerHTML += this.innerHTML;
        document.getElementById('cart_content').innerHTML += `
             <div class="order_content" id="cart_content">${this.innerHTML}</div>
        `;  
        count++; 
    });
});