Live link: 
https://shafikul-islam-ashik.github.io/New/
___________


How the "crud" functionality are created
__________________________________________


I create the 'preview, edit and update' functionality by adding an attribute "product_index" and class at virtual dom (in <td> : in icon) in "getAllProducts()" function.

Then catching the attribute and index, I perform the above functionality.


--------------------------------------------------



Another way/option
_____________________________

Instead of adding any attribute and class,

By adding "onclick" function into the virtual dom (tr - td - <a onclick = 'editProduct(${index})'>    ),
 
 It is very easy to create the above function.(same as before)

Similarly, others functionality could be added.








