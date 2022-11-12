let buttons = document.querySelectorAll("button");
let count = 0;
let entree_count = 0;
let protein_count = 0;
let combo_count = 0;
let topping_count=0;
let dressing_count=0;

/*Plan of action:
if we use cart_content we have to parse through that entire string of choices. also adding the choices to cart_content would be diff
can we add a Order object to the js file and just save the order through it?
*/
function fillCart() {
    if (!(localStorage.getItem("stored_entree") == ""  || localStorage.getItem("stored_entree") == null)) {
        document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
        <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_entree")}</div>
        `)
    }
    if (!(localStorage.getItem("stored_protein") == ""  || localStorage.getItem("stored_protein") == null)) {
        document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
        <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_protein")}</div>
        `)
    }

}
fillCart();
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
                localStorage.setItem("stored_entree", "");
            }
            if(buttons[i].classList.contains('protein_btn')){
                protein_count--;
                localStorage.setItem("stored_entree", "");
            }
            if(buttons[i].classList.contains('combo_btn')){
                combo_count--;
                localStorage.setItem("stored_entree", "");
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
                if (entree_count == 1) {//already have one selected, can't select another entree
                    alert("You can only select 1 entree!");
                    buttons[i].classList.remove('active');
                } else if (combo_count == 1) {
                    alert("Remove your combo to choose the entree!");
                    buttons[i].classList.remove('active');
                } else if (entree_count == 0){
                    entree_count++; 
                    if (count == 0) {
                        document.getElementById('cart_content').innerHTML = "";
                    }
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    count++;
                    localStorage.setItem("stored_entree", this.innerHTML);
                }
            }

            if (buttons[i].classList.contains('protein_btn')) {
                if (protein_count == 1) {
                    alert("You can only select 1 protein!");
                    buttons[i].classList.remove('active');
                } else if (combo_count == 1) {
                    alert("Remove your combo to choose the protein!");
                    buttons[i].classList.remove('active');
                } else if (protein_count == 0){
                    protein_count++;
                    if (count == 0) {
                        document.getElementById('cart_content').innerHTML = "";
                    }
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    count++;
                    localStorage.setItem("stored_protein", this.innerHTML);
                }
            }
            if (buttons[i].classList.contains('combo_btn')) {
                if (protein_count == 1 || entree_count == 1) {
                    alert("To add a combo, you have to remove your protein and entree selections!");
                    buttons[i].classList.remove('active');
                }
                else if (combo_count == 0) {
                    combo_count++;
                    if (count == 0) {
                        document.getElementById('cart_content').innerHTML = "";
                    }
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    count++;
                    localStorage.setItem("stored_combo", this.innerHTML);
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
for (let i = buttons.length - 2; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        if (buttons[i].classList.contains("to_toppings")) {
            if (!(combo_count == 1 || count == 2)) {
                alert("Select an entree, protein, or a combo before proceeding to toppings!");
                event.preventDefault();
            }
            else{
                location.href = "topping";
                // fillCart();
                // if(localStorage.getItem("stored_entree") !== ""){
                //     console.log(localStorage.getItem().innerHTML);
                //     console.log(localStorage.getItem());
                //     // document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                //     // <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem(().innerHTML}</div>
                //     // `)
                // }
            }
        }
    });
}
function orderFunction(){
    //array of options
    const Entrees =["Grain Bowl","Salad","Pita","Green & Grains"];
    const Proteins =["Gyro","Falafel","Vegetable Medley","Meatballs"];//need to finish toppings list
    const Toppings =["Pickled Onions", "Diced Cucumbers","Citris Couscous","Roasted Cauliflower","Tomato-Onion Salad"];
    const Starters =["2 Falafels","Hummus & Pita","Vegan Box","Garlic Fries"];
    const Drinks =["Bottled Water","Bottled Soda","Fountain Soda"];

    //setting  up order assuming local storage is used
    let type=-1
    let Protein=0;
    if(localStorage.getItem(stored_combo)==null){
        for(let i=0;i<Entrees.length;i++){
            if(Entrees[i]==localStorage.getItem(stored_entree)){
                type=i;
            }
        }

        for(let i=0;i<Proteins.length;i++){
            if(Proteins[i]==localStorage.getItem(stored_entree)){
                Proetien=i+1;//setting ups entree codes like in java
            }
        }
    }
    else{//combo chosen
        console.log("combo chosen functionality not added yet")
    }
    let entreeCode
    const topingChoice=[0,0,0,0];
    let drink=0;
    let starter=0;

    
    
/**
 * 1. Parse through cart
 * 2. Set order values
 * 3. Send order to database
 * 4. Clear local storage
 */




    clearStorage();
}

function clearStorage() {
    // localStorage.$reset();
    localStorage.clear();
    // var key; 
    // for (var i = 0; i < localStorage.length; i++) {   
    //     key = localStorage.key(i);    
    //     // if(key != particularKey) {       
    //     //     localStorage.removeItem(key);   
    //     // } 
    //     localStorage.removeItem(key);   
    // }
}