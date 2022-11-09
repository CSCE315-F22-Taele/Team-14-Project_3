let buttons = document.querySelectorAll("button");
let count=0;
let entree_count=0;
let protein_count=0;
let combo_count=0;
for(let i=0; i<buttons.length-2; i++){
    buttons[i].addEventListener('click', function(){
        if(buttons[i].classList.contains('active')){
            count--;
            if(count == 0){
                document.getElementById('cart_content').innerHTML="Your cart is currently empty!";
            }
            buttons[i].classList.remove('active');
            let d = document.getElementsByClassName('inner_order_content');
            for(let j=0; j<d.length; j++){
                //console.log(d[j].innerHTML);
                //console.log(buttons[j].innerHTML);
                if(buttons[i].innerHTML == d[j].innerHTML){
                    d[j].parentNode.removeChild(d[j]);
                }
            }
            
        }
        else{
            buttons[i].classList.add('active');
            // if(buttons[i].classList.contains('entree_btn')){entree_count++;}
            // if(buttons[i].classList.contains('protein_btn')){protein_count++;}
            // if(buttons[i].classList.contains('combo_btn')){
                
            // }
            if(count==0){
                document.getElementById('cart_content').innerHTML ="";
            }
            // document.getElementById('cart_content').innerHTML += `
            //       <div class="order_content" id="cart_content">${this.innerHTML}</div>
            // `;  
    
            document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                   <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
             `)
            count++;
        }
    });
}