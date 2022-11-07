let buttons = document.querySelectorAll("button");
// //let buttons = document.getElementsByClassName("item_btn");
// let count = 1;
// buttons.forEach(button => {
//     button.addEventListener('click', function () {
//         this.classList.add('active');
//         if(count==1){
//            document.getElementById('cart_content').innerHTML ="";   
//         }
//         //document.getElementById('cart_content').innerHTML += this.innerHTML;
//         document.getElementById('cart_content').innerHTML += `
//              <div class="order_content" id="cart_content">${this.innerHTML}</div>
//         `;  
//         count++; 
//     });
// });

let count=0;
for(let i=0; i<buttons.length-2; i++){
    buttons[i].addEventListener('click', function(){
        if(buttons[i].classList.contains('active')){
            count--;
            if(count==0){
                document.getElementById('cart_content').innerHTML="Your cart is currently empty!";
            }
            buttons[i].classList.remove('active');
            let d = document.getElementsByClassName('order_content');
            for(let j=0; j<d; j++){
                console.log(d[i].classList.innerHTML);
                console.log(buttons[i].classList.innerHTML);
            }
            
        }
        else{
            buttons[i].classList.add('active');
            if(count==0){
                document.getElementById('cart_content').innerHTML ="";
            }
            // document.getElementById('cart_content').innerHTML += `
            //       <div class="order_content" id="cart_content">${this.innerHTML}</div>
            // `;  
            document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                   <div class="order_content" id="cart_content">${this.innerHTML}</div>
             `)
            count++;
        }
    });
}