//get elements

const productForm = document.getElementById('add-product-form');
const msg = document.querySelector('#msg');
const editMsg = document.getElementById('edit-msg');

const tableBody = document.getElementById('table-body');

const singleProduct = document.getElementById('single-product');
const productUpdateForm = document.getElementById('product-update-form');


const searchTextBox = document.getElementById('searchtextbox');









/******************************************
  function for show product in table from local storage
*******************************************/

const getAllProducts = () => {

  //get gata from ls
  let data = readLsData('product');

  //check ls data !exist 
  if (!data || data.length === 0) {

    tableBody.innerHTML = `<tr>
                <td colspan = "7" class="text-center"> Data not found </td>
                </tr>`;
  } else {

    //initial value
    let total = 0;
    let html = '';

    data.forEach((item, index) => {

      //sum up total price
      total += item.price * item.quantity;

      html += `<tr>
                          <td>${index + 1}</td>
                          <td><img src="${item.photo}" style="height: 40px; width: 40px; object-fit: cover; border-radius: 4px"></td>
                          <td>${item.name}</td>
                          <td style='font-weight:bold'>${item.price} BDT</td>
                          <td>${item.quantity}</td>
                          <td style='font-weight:bold'>${item.price * item.quantity} BDT</td>
                          <td>
                            <a href="#preview-single-modal" data-toggle="modal" class="btn btn-info btn-sm" product_index = "${index}" onclick="previewSingleProduct(${index})">
                             <img class="preview" src="./img/eye.svg" alt="" height="10" width="10">
                           </a>
                            
                            <a href="#edit-modal" data-toggle="modal" class="btn btn-sm btn-warning " product_index = "${index}" onclick="editProduct(${index})">
                             <img class="edit" src="./img/edit.svg" alt="" height="10" width="10">
                            </a>
                             
                            <button class="btn btn-sm btn-danger" product_index = "${index}" onclick="deleteProduct(${index})">
                             <img class="delete" src="img/trash.svg" height="10" width="10">
                            </button>
                          </td>
                        </tr>`;

    });

    html += `<tr>
      <td colspan = "6" class="text-right"> Total amount : ${total} BDT</td>
      <td></td>
      </tr>`;


    tableBody.innerHTML = html;

  }

}
getAllProducts();









/******************************************
  img processing for add product form
*******************************************/

//get img file
let imgTag = productForm.querySelector('#photo');
let imgBox = productForm.querySelector('img');


//init val (global variable)
let imgSrc = '';


imgTag.onchange = function() {

  let r = new FileReader();

  r.onload = () => {

    //set img src to imgSrc variable 
    imgSrc = r.result;

    //display img 
    imgBox.setAttribute('src', imgSrc);
  }
  r.readAsDataURL(this.files[0]);




  /* set alert if img size is over
    if (imgTag.files[0].size > 1000000) {
        
      msg.innerHTML = setAlert('Image size could be within 1 mb', 'warning');
    } else {
      msg.innerHTML = '';
    }
    */

}









/******************************************
  submit product form
*******************************************/

productForm.onsubmit = (e) => {
  e.preventDefault();


  //get form data from formData object
  let formData = new FormData(e.target);
  let productData = Object.fromEntries(formData.entries());


  let { name, price, quantity } = Object.fromEntries(formData.entries());





  //form validation
  if (!name.trim() || !imgSrc || !price || !quantity) {

    //set alert massage
    msg.innerHTML = setAlert('All fields are required');

  } else if (quantityCheck(quantity) === false || priceCheck(price) === false) {

    //set alert massage
    msg.innerHTML = setAlert('Invalid input', 'warning');

    //check img size (1mb max)
  } else if (imgTag.files[0].size > 1000000) {

    msg.innerHTML = setAlert('Image should be within 1mb', 'danger');

  } else {

    //set url of img into productData
    productData.photo = imgSrc;


    //save data in ls
    createLsData('product', productData);

    //success massage 
    msg.innerHTML = setAlert('Product Added Successfully', 'success');

    //success massage remove automatically 
    setTimeout(() => {
      msg.innerHTML = '';
    }, 2000);

    e.target.reset();
    imgBox.setAttribute('src', '');
    getAllProducts();
  }
}






/******************************************
  functionality for preview, edit and delete product
*******************************************/
/*

tableBody.onclick = (e) => {
  e.preventDefault();

  //get single ptoduct data ID
  let index = e.target.parentElement.getAttribute('product_index');


  //checking for preview icon clicked 
  if (e.target.classList.contains('preview')) {

    //call function for preview single product 
    previewSingleProduct(index);


    //checking for edit icon clicked   
  } else if (e.target.classList.contains('edit')) {

    //call function for edit single product
    editProduct(index);

    //checking for delete icon clicked       
  } else if (e.target.classList.contains('delete')) {

    //call function for delete single product
    deleteProduct(index);

  }

} // onclick function ends


*/


/******************************************
  function for preview single product
  *******************************************/

const previewSingleProduct = (index) => {



  //get ls data
  let data = readLsData('product');


  //get data key
  let { name, price, photo, quantity } = data[index];


  //send data to modal
  singleProduct.innerHTML = `<div class="card-body">
                        <div class="row">
                          <div class="col-sm-5">
          
                            <img class="product-img" src="${photo}" style="object-fit: cover; max-width: 100%; max-height : 100%; border-radius: 4px; border: 4px skyblue solid;">
          
                          </div>
          
                          <div class="col-sm-7">
                            <table class="table" id="preview-table">
                              <tr>
                                <th scope="row">Product Name</th>
                                <td class="product-name">${name}</td>
                              </tr>
                              <tr>
                                <th scope="row">Price</th>
                                <td class="price style">${price}</td>
                              </tr>
                              <tr>
                                <th scope="row">Quantity</th>
                                <td class="quantity">${quantity}</td>
                              </tr>
                              <tr>
                                <th scope="row">Total</th>
                                <td class="total style">${price * quantity}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>`;
}





/******************************************
  function for edit product 
*******************************************/

const editProduct = (index) => {

  //get ls data
  let data = readLsData('product');


  //get data key
  let { name, price, photo, quantity } = data[index];


  //send data to edit-modal-form
  productUpdateForm.innerHTML = `<div class="py-2">
                        <label for="">Name</label>
                        <input class="form-control" type="text" name="name" value="${name}">
                      </div>
                      
                      <div class="py-2">
                        <label for="">Price</label>
                        <input class="form-control" type="text" name="price" value="${price}">
                      </div>
                      <div class="py-2">
                        <label for="">Quantity</label>
                        <input class="form-control" type="text" name="quantity" value="${quantity}">
                      </div>
                      <div class="py-2">
                                         <label for="">Photo</label>
                                           <input class="form-control" type="file" accept="image/jpg" id="photo" name="photo" img_src="${photo}">
                                      </div>
                      <div class="py-2">
                        <img class ="edit-img" src="${photo}">
                      </div>
                      
                      <input type="hidden" name="index" value="${index}">
                      
                      <div class="py-2">
                        <input type="submit" name="save-btn" value="Update now" class="btn btn-primary w-100">
                      </div>`;




  /******************************************
    img processing for update product form
  *******************************************/

  //init val (global variable)
  let u_imgSrc = '';


  //get img file
  let u_imgTag = productUpdateForm.querySelector('#photo');
  let u_imgBox = productUpdateForm.querySelector('.edit-img');



  u_imgTag.onchange = function() {

    let r = new FileReader();

    r.onload = () => {

      //set img src to imgSrc variable 
      u_imgSrc = r.result;
      u_imgTag.setAttribute('img_src', u_imgSrc);
      u_imgBox.setAttribute('src', u_imgSrc);

    }
    r.readAsDataURL(this.files[0]);




    /* set alert if img size is over
      if (imgTag.files[0].size > 1000000) {
          
        msg.innerHTML = setAlert('Image size should be within 1 mb', 'warning');
      } else {
        msg.innerHTML = '';
      }
      */

  }

}









/******************************************
  update product 
*******************************************/


//submit update product form

productUpdateForm.onsubmit = (e) => {
  e.preventDefault();


  //get img input file and updated img src from update form
  let u_imgTag = e.target.querySelector('#photo');
  let u_imgSrc = e.target.querySelector('#photo').getAttribute('img_src');





  //get form data
  let formData = new FormData(e.target);

  let { name, price, quantity, index } = Object.fromEntries(formData.entries());




  //form validation

  if (!name.trim() || !price || !quantity) {

    //set alert massage
    editMsg.innerHTML = setAlert('All fields are required');

  } else if (quantityCheck(quantity) === false || priceCheck(price) === false) {

    //set alert massage
    editMsg.innerHTML = setAlert('Invalid input', 'warning');

  }
  //check img size (1mb max)
 /* else if (u_imgTag.files[0].size > 1000000) {

    editMsg.innerHTML = setAlert('Image should be within 1mb', 'warning');

  }*/
  else {

    //get ls data
    let data = readLsData('product');

    //update data 

    data[index] = {
      name: name,
      price: price,
      photo: u_imgSrc,
      quantity: quantity
    };



    //data[index] = { name, price, photo, quantity };

    //save data into ls
    setLsData('product', data);


    //show data in table from ls
    getAllProducts();


    //success massage 
    editMsg.innerHTML = setAlert('Product updated Successfully', 'success');

    //remove success massage and update product form automatically 
    setTimeout(() => {
      editMsg.innerHTML = '';
      //document.getElementById('edit-modal').click();
    }, 2000);
  }
}






/******************************************
  function for delete product  
*******************************************/

const deleteProduct = (index) => {

  //get confirmation result
  let confirmation = confirm('Are you sure to delete?');

  if (confirmation === true) {

    //get ls data
    let data = readLsData('product');

    //delete the data
    data.splice(index, 1);

    //save remaining data into ls
    setLsData('product', data);

    //show data into table from ls
    getAllProducts();
  }
}






/******************************************
  function for search product
*******************************************/


searchTextBox.oninput = (e) => {

  //get all <tr> from product table
  let trList = tableBody.querySelectorAll('tr');

  //get search box value
  let searchTextBoxVal = e.target.value;


  //generate array from the tr list and display which are matched
  Array.from(trList).forEach((item) => {

    //get products name from data-table tr td
    let productName = item.getElementsByTagName('td')[2].innerText;

    //generate regular expression by "search box value"
    let regExp = new RegExp(searchTextBoxVal, 'gi');

    //matching products name with regExp and display products(tr) which are matched 

    if (productName.match(regExp)) {
      item.style.display = 'table-row';
    } else {
      item.style.display = 'none';
    }

  });

}
