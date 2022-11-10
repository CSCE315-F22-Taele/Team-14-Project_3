let buttons = document.querySelectorAll("button");
let count = 0;
let entree_count = 0;
let protein_count = 0;
let combo_count = 0;

for (let i = 0; i < buttons.length - 2; i++) {
    buttons[i].addEventListener('click', function () {
        if (buttons[i].classList.contains('active')) {
            count--;
            if (count == 0) {
                document.getElementById('cart_content').innerHTML = "Your cart is currently empty!";
            }
            buttons[i].classList.remove('active');
            if(buttons[i].classList.contains('entree_btn')){
                entree_count--;
            }
            if(buttons[i].classList.contains('protein_count')){
                protein_count--;
            }
            if(buttons[i].classList.contains('combo_count')){
                combo_count--;
            }
            
            let d = document.getElementsByClassName('inner_order_content');
            for (let j = 0; j < d.length; j++) {
                //console.log(d[j].innerHTML);
                //console.log(buttons[j].innerHTML);
                if (buttons[i].innerHTML == d[j].innerHTML) {
                    d[j].parentNode.removeChild(d[j]);
                    
                }
            }

        }
        else {
            buttons[i].classList.add('active');
            if (buttons[i].classList.contains('entree_btn')) {
                if (entree_count <= 1) { //the first time
                    entree_count++; 
                }
                
                if (entree_count > 1) {//already have one selected, can't select another entree
                    alert("You can only select 1 entree");
                    buttons[i].classList.remove('active');
                    entree_count = 1;
                } else {
                    if (count == 0) {
                        document.getElementById('cart_content').innerHTML = "";
                    }
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    count++;
                }
            }

            if (buttons[i].classList.contains('protein_btn')) {
                if(protein_count<= 1){
                    protein_count++;
                }
                if (protein_count > 1) {
                    alert("You can only select 1 protein");
                    buttons[i].classList.remove('active');
                    protein_count = 1;
                } else {
                    if (count == 0) {
                        document.getElementById('cart_content').innerHTML = "";
                    }
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    count++;
                }
            }
            if (buttons[i].classList.contains('combo_btn')) {
                if (protein_count >= 1 || entree_count >= 1) {
                    alert("To add a combo, you have to remove your protein and entree selections");
                    buttons[i].classList.remove('active');
                }
                if(combo_count<=1){combo_count++;}
                else {
                    if (count == 0) {
                        document.getElementById('cart_content').innerHTML = "";
                    }
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    count++;
                }

            }
            // if(count==0){
            //     document.getElementById('cart_content').innerHTML ="";
            // }
            // document.getElementById('cart_content').innerHTML += `
            //       <div class="order_content" id="cart_content">${this.innerHTML}</div>
            // `;  

            // document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
            //        <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
            //  `)
            //count++;
        }
    });
}