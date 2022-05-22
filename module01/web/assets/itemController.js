
loadAllItems();

//add or update Items start
function itemAddOrUpdate(){
    var code=$("#txtItemCode").val();
    var name=$("#txtItemName").val();
    var qty=$("#txtItemQty").val();
    var price=$("#txtItemPrice").val();

    var item={
        code:code,
        name:name,
        qty:qty,
        price:price
    }


    $.ajax({
        url: "item",
        method : "POST",
        contentType : "application/json",
        data : JSON.stringify(item),

        success : function (res){
            if (res.status==200){
                alert(res.message);
                clearAll();
            }else if (res.status==400){
                alert(res.message)

            }else {
                alert(res.data);

            }
        }

    });
}

$("#btnNewItem").click(function (){
    itemAddOrUpdate();
});

//add or update items End


function clearAll() {
    $("#txtItemCode").val('');
    $("#txtItemName").val('');
    $("#txtItemQty").val('');
    $("#txtItemPrice").val('');
}

//search item start

$("#btnSearchItem").click(function () {
    $.ajax({
        url: "item?option=GETONE&id="+$("#txtSearchItem").val(),
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#txtItemCode").val(res.data.itemCode);
                $("#txtItemName").val(res.data.name);
                $("#txtItemQty").val(res.data.qty);
                $("#txtItemPrice").val(res.data.price);

            }else if (res.status==400){
                alert("Item not found");
            }
        },

        error : function (res){
            alert("System Error");
        }


    })
});

//search item End


function loadAllItems(){
    $.ajax({
        url: "item?option=GETALL",
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#itemTable").empty();
                for (const item of res.data){
                    let row = `<tr><td>${item.itemCode}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
                    $("#itemTable").append(row);
                }

            }else if (res.status==400){
                alert("Item not found");
            }
        },

        error : function (res){
            alert("System Error");
        }


    })
}

//delete items

$("#btnDeleteItem").click(function () {

    $.ajax({
        url :"item?id="+$("#txtItemCode").val(),
        method : "DELETE",
        success : function (res){

            if (res.status == 200){
                alert(res.message);
            }else if(res.status == 400){
                alert(res.message);
            }

        },

        error : function (){
            alert("System error");
        }


    });
    /*var id=$("#txtSearchItem").val();
    if(searchItem(id)==null){
        alert("no such as Item !");
    }
    for(var i in itemDB){
        if (id==itemDB[i].getId()){
            itemDB.splice(i,1);
            loadAllItems();
            alert("Item Delete complete");

            break;
        }
    }*/

});
/*
//Validation Start
// Item regular expressions
const itemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[a -z ]{3,20}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$("#btnNewItem").prop('disabled', true);

$("#mainItemDiv input").on('keydown',function (e) {
    if (e.key == "Tab") {
        e.preventDefault(); // stop execution of the button
    }
    validateItem(e);
    //console.log(e.key);

})

function validateItem(e){
    var id=$("#txtItemCode").val();
    var name=$("#txtItemNameName").val();
    var qty=$("#txtItemQty").val();
    var price=$("#txtItemPrice").val();

    if (itemCodeRegEx.test(id)){

        $("#txtItemCode").css('border', '2px solid green');
        $("#lblItemCode").text("");
        $("#btnNewItem").prop('disabled', false);
        if (e.key=="Enter"){$("#txtItemName").focus()

        }

        if (itemNameRegEx.test(name)){
            $("#txtItemName").css('border', '2px solid green');
            $("#lblItemName").text("");
            $("#btnNewItem").prop('disabled', false);
            if (e.key=="Enter"){$("#txtItemQty").focus()}

            if (itemQtyRegEx.test(qty)){
                $("#txtItemQty").css('border', '2px solid green');
                $("#lblItemQty").text("");
                $("#btnNewItem").prop('disabled', false);
                if (e.key=="Enter"){$("#txtItemPrice").focus()}

                if (itemPriceRegEx.test(price)){
                    $("#txtItemPrice").css('border', '2px solid green');
                    $("#lblItemPrice").text("");
                    $("#btnNewItem").prop('disabled', false);
                    if (e.key=="Enter"){ itemAddOrUpdate()  }
                    $("#btnNewItem").prop('disabled', false);

                }else {
                    $("#txtItemPrice").css('border', '2px solid red');
                    $("#lblItemPrice").text("Item Price is a required field : Pattern 100.00 or 100");
                    $("#btnNewItem").prop('disabled', true);
                }

            }else{
                $("#txtItemQty").css('border', '2px solid red');
                $("#lblItemQty").text("Item QTY is a required field : Minimum 2");
                $("#btnNewItem").prop('disabled', true);
            }

        }else{
            $("#txtItemName").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            $("#btnNewItem").prop('disabled', true);
        }

    }else{
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblItemCode").text("Item ID is a required field : Pattern I00-000");
        $("#btnNewItem").prop('disabled',true);
    }
}*/
