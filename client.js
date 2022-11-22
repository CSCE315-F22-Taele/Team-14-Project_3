let buttons = document.querySelectorAll("button");
let count = 0;
let entree_count = 0;
let protein_count = 0;
let combo_count = 0;
let topping_count=0;
let dressing_count=0;
let starter_count = 0;
let drink_count = 0;


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
    if (!(localStorage.getItem("stored_combo") == ""  || localStorage.getItem("stored_combo") == null)) {
        document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
        <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_combo")}</div>
        `)
    }
    for (let i = 1; i < 5; i++) {
        if (!(localStorage.getItem("stored_topping" + i) == ""  || localStorage.getItem("stored_topping" + i) == null)) {
            document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
            <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_topping" + i)}</div>
            `)
        }
    }
    if (!(localStorage.getItem("stored_dressing") == ""  || localStorage.getItem("stored_dressing") == null)) {
        document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
        <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_dressing")}</div>
        `)
    }
    if (!(localStorage.getItem("stored_drink") == ""  || localStorage.getItem("stored_drink") == null)) {
        document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
        <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_drink")}</div>
        `)
    }
    if (!(localStorage.getItem("stored_starter") == ""  || localStorage.getItem("stored_starter") == null)) {
        document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
        <div class="inner_order_content" id="inner_cart_content">${localStorage.getItem("stored_starter")}</div>
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
                localStorage.setItem("stored_protein", "");
            }
            if(buttons[i].classList.contains('combo_btn')){
                combo_count--;
                localStorage.setItem("stored_combo", "");
            }
            if(buttons[i].classList.contains('topping_btn')){
                topping_count--;
                // localStorage.setItem("stored_topping", "");
            }
            if(buttons[i].classList.contains('dressing_btn')){
                dressing_count--;
                localStorage.setItem("stored_dressing", "");
            }
            if(buttons[i].classList.contains('starter_btn')){
                starter_count--;
                localStorage.setItem("stored_starter", "");
            }
            if(buttons[i].classList.contains('drink_btn')){
                drink_count--;
                localStorage.setItem("stored_drink", "");
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
            if (buttons[i].classList.contains('topping_btn')) {
                if(topping_count>=4){
                    alert("You can only select 4 toppings!");
                    buttons[i].classList.remove('active');
                }else{
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    localStorage.setItem("stored_topping" + (topping_count + 1), this.innerHTML);
                    topping_count++;
                }
            }
            if (buttons[i].classList.contains('dressing_btn')) {
                if(dressing_count>=1){
                    alert("You can only select 1 dressing!");
                    buttons[i].classList.remove('active');
                }else{
                    dressing_count++;
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    localStorage.setItem("stored_dressing", this.innerHTML);
                }
            }
            if (buttons[i].classList.contains('starter_btn')) {
                if(starter_count>=1){
                    alert("You can only select 1 starter!");
                    buttons[i].classList.remove('active');
                }else{
                    starter_count++;
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    localStorage.setItem("stored_starter", this.innerHTML);
                }
            }
            if (buttons[i].classList.contains('drink_btn')) {
                if(drink_count>=1){
                    alert("You can only select 1 drink!");
                    buttons[i].classList.remove('active');
                }else{
                    drink_count++;
                    document.getElementById('cart_content').insertAdjacentHTML('beforeend', `
                    <div class="inner_order_content" id="inner_cart_content">${this.innerHTML}</div>
                    `)
                    localStorage.setItem("stored_drink", this.innerHTML);
                }
            }
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
            }
        }
        if(buttons[i].classList.contains("to_starter")){
            if((topping_count != 1 || dressing_count != 1)){
                alert("Select an atleast 1 topping and 1 dressing before proceeding!");
                event.preventDefault();
            }
            else{
                location.href = "starter";
            }
        }
    });
}

function orderFunction(){
    /**
     * 1. Parse through cart
     * 2. Set order values
     * 3. Send order to database
     * 4. Clear local storage
     */
    //array of options
    console.log("Order Function Started");
    const Entrees =["Grain Bowl","Salad","Pita","Green & Grains"];
    const Proteins =["Gyro","Falafel","Vegetable Medley","Meatballs"];//need to finish toppings list
    
    const Toppings =["Pickled Onions", "Diced Cucumbers","Citris Couscous","Roasted Cauliflower","Tomato-Onion Salad"];
    const Dressings=["Hummus","Red Pepper Hummus","Jalepeno Feta","Tzatziki","Greek Vinagrette","Harissa Yogurt","Lemon Herb Tahini","Yogurt Dill"];
    
    const Starters =["2 Falafels","Hummus & Pita","Vegan Box","Garlic Fries"];
    const StarterPrices=[2.85,3.50,6.49,1.99]
    const Drinks =["Bottled Water","Bottled Soda","Fountain Soda"];

    //setting  up order assuming local storage is used
    //this sets up the type and protein from local storage
    let total=7.69;
    let type=-1;
    let Protein=0;
    if(localStorage.getItem("stored_combo")==null){
        for(let i=0;i<Entrees.length;i++){
            if(Entrees[i]==localStorage.getItem("stored_entree")){
                type=i;
            }
        }

        for(let i=0;i<Proteins.length;i++){
            if(Proteins[i]==localStorage.getItem("stored_protein")){
                Protein=i+1;
            }
        }
    }
    else{//combo chosen
        type=4;//wrap
        Protein=1;//gyro
        //need to handle combos in front end before this is finalized
        total=8.99;

    }
    let entreeCode=type*5+Protein;//generates entree code

    let Dressing=0;
    for(let i=0;i<Dressings.length;i++){
        if(Dressings[i]==localStorage.getItem("stored_dressing")){
            Dressing=i+1;
        }
    }

    const toppingChoice=[0,0,0,0];//need to set up toppings need confirmation from front
    
    if(localStorage.getItem("stored_topping1")!=null){
        for(let i=0;i<Toppings.length;i++){
            if(Toppings[i]==localStorage.getItem("stored_topping1")){
                toppingChoice[0]=i+1;
            }
        }
    }
    if(localStorage.getItem("stored_topping2")!=null){
        for(let i=0;i<Toppings.length;i++){
            if(Toppings[i]==localStorage.getItem("stored_topping2")){
                toppingChoice[1]=i+1;
            }
        }
    }

    if(localStorage.getItem("stored_topping3")!=null){
        for(let i=0;i<Toppings.length;i++){
            if(Toppings[i]==localStorage.getItem("stored_topping3")){
                toppingChoice[2]=i+1;
            }
        }
    }

    if(localStorage.getItem("stored_topping4")!=null){
        for(let i=0;i<Toppings.length;i++){
            if(Toppings[i]==localStorage.getItem("stored_topping4")){
                toppingChoice[0]=i+1;
            }
        }
    }

    let Drink=0;
    if(localStorage.getItem("stored_drink")!=null){
        for(let i=0;i<Drinks.length;i++){
            if(Drinks[i]==localStorage.getItem("stored_drink")){
                Drink=i+1;
            }
        }
        total=8.99;
    }
    let Starter=0;
    if(localStorage.getItem("stored_starter")!=null){
        for(let i=0;i<Starters.length;i++){
            if(Starters[i]==localStorage.getItem("stored_starter")){
                Starter=i+1;
                total+=StarterPrices[i];
            }
        }
    }
    //command generated
    const command="INSERT INTO \"Order\" (\"Date\", \"Server ID\", \"Total Amount\", \"Entree ID\", \"Topping IDs\", \"Dressing ID\", \"Starter ID\", \"Drinks ID\" ) values ('" + new Date().toLocaleDateString() + "', "+ 0 +"," + total + "," + entreeCode + ", ARRAY[" + toppingChoice.toString() +"], "  +Dressing +", " + Starter+", " + Drink+ ");";
    console.log(command);
    
    fetch('/ordersent', {
        method: 'POST',
        body: JSON.stringify({
            command,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => console.log(data));

    clearStorage();
    alert("Your order is confirmed! Thank you for choosing us!");
}


function clearStorage() {
    // localStorage.$reset();
    localStorage.clear();
    localStorage.setItem("stored_entree", "");
    localStorage.setItem("stored_protein", "");
    localStorage.setItem("stored_combo", "");
    localStorage.setItem("stored_topping1", "");
    localStorage.setItem("stored_topping2","");
    localStorage.setItem("stored_topping3","");
    localStorage.setItem("stored_topping4","");

    let d = document.getElementsByClassName('inner_order_content');
    for (let j = 0; j < d.length; j++) {
        //console.log(d[j].innerHTML);
        //console.log(buttons[j].innerHTML);
        //if (buttons[j].innerHTML == d[j].innerHTML) {
            d[j].parentNode.removeChild(d[j]);
            
        //}
    }
    console.log("localStorage cleared");
}

function clearTandS() {
    localStorage.setItem("stored_topping1", "");
    localStorage.setItem("stored_topping2", "");
    localStorage.setItem("stored_topping3", "");
    localStorage.setItem("stored_topping4", "");
    localStorage.setItem("stored_dressing", "");
    localStorage.setItem("stored_starter", "");
    localStorage.setItem("stored_drink", "");
}