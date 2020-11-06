/// Danny Walker
// Spring 2020
// Web233 Javascript
// Date: 11/5/2020
// Week 13, Shopping List Version to GitHub

//It should have a place to store SHOPPINGLIST
var shoppinglists = [];
//v 3.1 -- It should add new placeholder for shopping cart
//v 3.1 addtocart empty tray
var addtocart = [];
//It should have an object properties for MyList for name and cost
//v 3.0 Create Objects for Shoppinglist
var MyItems = {
  name:"",
  price:""
};

//v 4.0 -- It should have ability to load & read cookie file function on Windows load
//v 4.0 read cookie on load and display
//Week 13: Add popup describing app when visitors load webpage the first time
window.onload = function()
{
  alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Students**\n\nQuestions?\nemail Professor Chuck Konkol\nc.konkol@rockvalleycollege.edu\n\nRegister @ RockValleyCollege.edu");
  populateShoppinglistOnLoad();
  displayShoppinglists();
  clearFocus();
}

//v 4.0 -- It should have ability to create new cookie file from shoppinglist array
//v 4.0 -- It should have ability to save new cookie file after displayshoppinglist function (via a call to the saveCookie function whenever the display function is called)
//v 4.0 save cookie
function saveCookie()
{
  delete_cookie('walkerlist');
  var date = new Date();
  //keeps for a year
  date.setTime(date.getTime() + Number(365) * 3600 * 1000);
  document.cookie = 'walkerlist' + "=" + escape(shoppinglists.join(',')) + "; path = /; expires = " + date.toGMTString();
}

//v 4.0 -- It should have ability to read cookie file and update shoppinglist array
//v 4.0 read cookie and return
function readCookie(name)
{
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

//v 4.0 -- It should have ability to delete cookie file
//v 4.0 delete cookie
function delete_cookie(name)
{
  document.cookie = name + '=; expires = Thu, 01 Jan 1970 00:00:01 GMT;';
}

//v 4.0 -- It should have ability to populate shoppinglist array from cookie file
//v 4.0 populate shoppping list on load
function populateShoppinglistOnLoad()
{
  shoppinglists = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('walkerlist');
  //remove unwanted chars and format
  y = remove_unwanted(y);
  //split array by comma %2C
  y = y.split('%2C');
  if (y)
  {
    shoppinglists = y;
  }
}

//v 4.0 remove and format cookie
function remove_unwanted(str)
{
  if ((str === null) || (str === ''))
  {
    return false;
  }
  else
  {
    str= str.toString();
    str = str.replace(/%20/g, "");
    str = str.replace(/%24/g, "$");
    str = str.replace(/%7C/g, " | ");
    return str.replace(/[^\x20-\x7E]/g, '');
  }
}

//It should add to Function SHOPPINGLISTS using object properties to Web Page Using DOM
//v 3.0 Update function addShoppinglist by adding objects
function addShoppinglist(item)
{
  //v 3.0 declare variable for groc string
  var groc = "";
  //v 3.0 v 3.0 declare variable for loop count
  var count = 0;
  //v 3.0 Challenge: Verify a value is entered in name and cost before updating list
  if (item !== "") {
    
      //v 3.0 edit value for MyItems.name
      //MyItems.name = item;
      //v 3.0 edit value for MyItems.cost
      //MyItems.price = cost;
      //v 3.0 for loop through object propterties and
      //for (var x in MyItems) {
        //if (count === 1) {
          //groc += "$";
        //}
        //add to groc string from object array item
        //groc += MyItems[x];
        //if (count === 0) {
          //groc += " | ";
        //}
        //increment count by 1
        //count++;
      //}
      //push to shoppinglist
      //shoppinglists.push(groc);
      shoppinglists.push(item);
      //display shoppinglist
      displayShoppinglists();
      //v 3.1: display shopping cart
      displayShoppingCart();
      //v 4.0 save cookie
      saveCookie();
    
  }  
  //v 2.1: call function 'clearFocus'  
  clearFocus();
}

//v 3.1 (revised function) -- It should have ability to display shopping list
//(v 3.0) It should have a FUNCTION to display a SHOPPINGLISTS to Web Page Using DOM
//v 3.1: update function displayShoppinglists() to display shoppinglists & add 'remove', 'edit item', and 'add to cart' buttons
function displayShoppinglists()
{
  //v 2.1: add and initialize variable 'TheList' with empty string
  var theList = "";
  //v 2.1: add and intitialize variable 'arrayLength' with shoppinglist.length
  var arrayLength = shoppinglists.length;
  //It should display remove button with logic to remove item (display handled here, in displayShoppinglists; logic passed to and handled in deleteShoppinglists)  
  //v 2.1: declare a for loop
  for (var i = 0; i < arrayLength; i++)
  {
    //v 3.0 add remove button using below i index (should go inside the 'for' loop to capture the correct 'i' value for position)
    var btnDelete = ' <input class = "button" name = "delete" type = "button" value = "Remove Item" onclick = "deleteShoppinglists(' + i + ')"/>';
    //v 3.1 add edit button using below i index
    var btnUpdate = ' <input class = "button" name = "edit" type = "button" value = "Edit Item" onclick = "changeShoppinglist(' + i + ')"/>';
    //v 3.1 add 'add to cart' button using below i index
    var arrays = shoppinglists[i];
    arrays = "'" + arrays + "'";
    var btnAddCart = ' <input class = "button" name = "add" type = "button" value = "Add to Shopping Cart" onclick = "addToShopCart('+ arrays + ',' + i + ')"/>';
    //From v 2.1 (now commented out): Concatentate TheList with each array item plus <br> tag
    //theList = theList + shoppinglists[i] + '<br>';
    //v 3.1 (revised) Concatenating the list plus adding 'remove', 'edit item', and 'add to cart' buttons to end of item
    theList = theList +shoppinglists[i] + btnDelete + ' ' + btnUpdate + ' ' + btnAddCart + '<br>';
  }
  //v 3.1 (revised display): Display 'theList" to document ID 'MyList'
  //v 3.1 challenge: Hide Shopping List when no items are displaying
  if(shoppinglists.length !== 0)
  {
    document.getElementById("MyList").innerHTML = 'Shopping List ' + '<br>' + theList;
  }
  else
  {
    document.getElementById("MyList").innerHTML = '';
  }
}

//v 3.2: Changes to displayShoppingCart function
//v 3.1 -- It should have ability to display shopping cart
function displayShoppingCart()
{
  var theList = "";
  var theRow = "";
  var arrayLength = addtocart.length;
  for (var i = 0; i < arrayLength; i++)
  {
    //v 3.1add remove button using below i index
    var btnDelete = ' <input class = "button" name = "delete" type = "button" value = "Remove Item" onclick = "deleteShoppingCart(' + i + ')"/>';
    //v 3.2 -- Remove edit button
    ////(commented out) v 3.1 add edit button using below i index
    //var btnUpdate = ' <input class = "button" name = "edit" type = "button" value = "Edit Item" onclick = "changeShoppingCart(' + i + ')"/>';
    //v 3.1 add 'add to shopping list' button using below i index
    var arrays = addtocart[i];
    arrays = "'" + arrays + "'";
    //v 3.2 -- Change add button to checkbox (add button commented out)    
    //var btnAddList = ' <input class = "button" name = "add" type = "button" value = "Add to Shopping List" onclick = "addBackToShoppinglist('+ arrays + ',' + i + ')"/>';
    var btnAddList = '<label><input name = "add" type = "checkbox" id = "adds" value = "Add to Shopping List" onclick = "addBackToShoppinglist('+ arrays + ',' + i + ')" checked = "checked"/></label>';
    theRow = "<li>" + addtocart[i] + btnDelete + " " + " " + btnAddList + "<br></li>";
    theList += theRow;
    //From v 3.0 and 3.1, commented out
    ////Concatenating the list plus adding 'remove', 'edit item', and 'add to shopping list' buttons to end of item
    //theList = theList +addtocart[i] + btnDelete + ' ' + btnUpdate + ' ' + btnAddList + '<br>';
  }
  //v 3.2 -- When checkbox checked and under "Shopping Cart" and unchecked above "Shopping Cart"
  if(addtocart.length !== 0)
  {
    //Display 'theList" to document ID 'MyCart'
    document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + theList + '</ul>';
    ////(commented out) v 3.1 challenge: Hide Shopping Cart when no items are displaying
    //document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br>' + theList;
  }
  else
  {
    document.getElementById("MyCart").innerHTML = '';
  }
}

//v 3.1 (revised function) -- It should have ability to delete shopping list
//(from v. 3.0) It should display remove button with logic to remove item (display handled in displayShoppinglists; logic passed to and handled here in deleteShoppinglists)
function deleteShoppinglists(position)
{
  shoppinglists.splice(position, 1);
  displayShoppinglists();
  //Also display shopping cart
  displayShoppingCart();
  //v 4.0 save cookie
  saveCookie();
}
//v 3.1 -- It should have ability to delete shopping cart
function deleteShoppingCart(position)
{
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
  //v 4.0 save cookie
  saveCookie();
}

//v 3.1 -- It should have ability to UPDATE ITEMS from shopping list
function changeShoppinglist(position)
{
  //Not sure what assignment the below commented-out item came from, but adding for reference:
  //document.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglists[position];
  arrays = arrays.split (",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var replacedAmount = e2.replace (/\$/g,'');
  var eitem = prompt ("Please enter new item", e1);
  var ecost = prompt ("Please enter new cost", replacedAmount);
  shoppinglists[position] = eitem + "," + "$" + ecost;
  displayShoppinglists();
  displayShoppingCart();
  //v 4.0 save cookie
  saveCookie();
}
//v 3.1 -- It should have ability to UPDATE ITEMS from shopping cart
function changeShoppingCart(position)
{
  //document.getElementById("My Cart").innerHTML = shoppinglists[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
  var e1 = arrays[0];
  var e2 = arrays[1];
  var replacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter new cost", replacedAmount);
  addtocart[position] = eitem + "," + "$" + ecost;
  displayShoppinglists();
  displayShoppingCart();
  //v 4.0 save cookie
  saveCookie();
}

//v 3.1 -- It should have ability to move items from shopping cart to shopping list
function addBackToShoppinglist(item,num)
{
  //push to deleteShoppinCart
  deleteShoppingCart(num);
  shoppinglists.push(item);
  //display shoppinglist
  displayShoppinglists();
  //display shopping cart
  displayShoppingCart();
  //v 4.0 save cookie
  saveCookie();
  clearFocus();
}

//v 3.1 -- It should have ability to move items from shopping list to shopping cart
function addToShopCart(item,num)
{
  //push to deleteShoppingLists
  deleteShoppinglists(num);
  addtocart.push(item);
  //display shoppinglist
  displayShoppinglists();
  //display shopping cart
  displayShoppingCart();
  //v 4.0 save cookie
  saveCookie();
  clearFocus();
}

//It should clear inputbox for Name and Cost
//It should focus on inputbox on Name after text is cleared
function clearFocus()
{
  //v 2.1: clear inputbox value out by id
  //v 2.1: http://stackoverflow.com/questions/4135818/how-to-clear-a-textbox-using-javascript
  document.getElementById("item").value = "";
  //v 3.0 clear cost field
  document.getElementById("cost").value = "";
  //v 2.1: set focus on inputbox after text is cleared
  //v 2.1: http://stackoverflow.com/questions/17500704/javascript-set-focus-to-html-form-element
  document.getElementById("item").focus();
}

//Below is OLD SCRIPT from Shopping List 2.0, for reference.
////It should have a place to store SHOPPINGLIST
////Create a SHOPPINGLISTS array of three REAL grocery items (Milk, bread, etc)
////var shoppinglists = ['item 1', 'item 2', 'item 3'];

////Display shoppinglist
//displayShoppinglists();

////Add new item and display (to the 'add' function without an argument)
//addShoppinglist1();
//displayShoppinglists();

////Add new item and display (to the 'add' function with an argument)
//addShoppinglist2('add new item 5');

////Change first item and display
//changeShoppinglist(0, 'changed item 1');

////Add new item and display, then change item and display, then delete same item and display
//addShoppinglist2('add new item 6');
//changeShoppinglist(5, 'changed item 6');
//deleteShoppinglist(5);

////FUNCTIONS

////It should have a FUNCTION to display SHOPPINGLIST
//function displayShoppinglists()
//{
  //document.write('<br>My Shopping List: ', shoppinglists);
//}

////It should have a FUNCTION to add new SHOPPINGLIST
////Function that does not take an argument, but contains item in the function
//function addShoppinglist1()
//{
  //shoppinglists.push('add new item 4');
//}

////Function that takes an item as an argument
//function addShoppinglist2(listItem)
//{
  //shoppinglists.push(listItem);
  //displayShoppinglists();
//}

////It should have a FUNCTION to change a SHOPPINGLIST
//function changeShoppinglist(position, listItem)
//{
  //shoppinglists[position] = listItem;
  //displayShoppinglists();
//}

////It should have a FUNCTION to delete a SHOPPINGLIST
//function deleteShoppinglist (position)
//{
  //shoppinglists.splice(position, 1);
  //displayShoppinglists();
//}
