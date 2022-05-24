

$("#btnCustomerSearch").click(function () {
    $.ajax({
        url :"customer?option=GETONE&id="+$("#txtCustomerId").val(),
        method : "GET",
        success : function (res){
            if (res.status==200){
                $("#txtCustomerId").val(res.data.id);
                $("#txtCustomerName").val(res.data.name);
                $("#txtCustomerSalary").val(res.data.salary);
                $("#txtCustomerAddress").val(res.data.address);

            }else if(res.status==400){
                alert(res.message);
            }
        }
    })
});
//ItemSearch
$("#btnOrderItemSearch").click(function () {
    $.ajax({
        url: "item?option=GETONE&id="+$("#txtICode").val(),
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#txtICode").val(res.data.itemCode);
                $("#txtIName").val(res.data.name);
                $("#txtQtyOnHand").val(res.data.qty);
                $("#txtIPrice").val(res.data.price);

            }else if (res.status==400){
                alert("Item not found");
            }
        },

        error : function (res){
            alert("System Error");
        }


    })
});


//Add to table

$("#btnAdd").click(function () {
    var itemCode= $("#txtICode").val();
    var itemName= $("#txtIName").val();
    var itemPrice= $("#txtIPrice").val();
    var qtyOnHand=$("#txtQtyOnHand").val();

    var qty=parseInt( $("#txtOrderQty").val());

    /*  var itemFinallyPrice= itemPrice-((discount/100)itemPrice);/
    /*  var totalItemPrice=itemPrice*qty;*/


    //var itemFinallyPrice= itemPrice-((discount/100)*itemPrice);
    var totalItemPrice=itemPrice*qty;
    console.log(totalItemPrice);


    var itemExist=0;
    for(var i in cartItems){
        if (cartItems[i].getItemCode()==itemCode){

            var oldItemQty =parseInt(cartItems[i].getItemQty());
            var newItemQty=oldItemQty+qty;

            cartItems[i].setItemQty(newItemQty);
            cartItems[i].setItemPrice(itemPrice);
            cartItems[i].setTotalItemPrice(totalItemPrice);
            itemExist=1;
            loadCart();
            break;
        }
    }


    if (itemExist==0){
        let orderCart = new OrderCart(itemCode,itemName,qty,itemPrice,totalItemPrice)
        cartItems.push(orderCart);
        loadCart();
    }

});

function loadCart(){
    var total=0;
    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}
        </td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;

        total+=parseInt(i.getTotalItemPrice());
        console.log(i.getTotalItemPrice());
        $("#orderTable").append(row);
    });
    $("#txtTotal").val('');
    $("#txtTotal").val(total);
    console.log(total);
    $("#txtSubTotal").val('');
    $("#txtSubTotal").val(total);
}



//Total Amount
$("#txtCash,#txtFinalDiscount").on('keyup',function (e) {
    console.log(e.key);
    keyPress();
});

function keyPress() {
    var total=$("#txtTotal").val();
    var subTotal=$("#txtSubTotal").val();
    var cash= $("#txtCash").val();
    var discount=$("#txtFinalDiscount").val();

    $("#txtSubTotal").val(itemFinallytotal);

    if (cash!='') {
        $("#txtBalance").val('');
        $("#txtBalance").val(cash - $("#txtSubTotal").val());
        if (discount!=''){
            var itemFinallytotal= total-((discount/100)*total);
            $("#txtSubTotal").val('');
            $("#txtSubTotal").val(itemFinallytotal);
            $("#txtBalance").val('');
            $("#txtBalance").val(cash - $("#txtSubTotal").val());
        }else {
            $("#txtSubTotal").val('');
            $("#txtSubTotal").val(total);
            $("#txtBalance").val('');
            $("#txtBalance").val(cash - $("#txtSubTotal").val());

        }
    }else {
        $("#txtBalance").val('');
    }
}

//parches Order
$("#btnPurchase").click(function () {
    alert("button wda");
    /*let res=confirm("Place order?");
    if (res) {

        if (generateResOrderId() == $("#txtOrderId").val()) {

            var orderId = $("#txtOrderId").val();
            var custId = $("#txtCustomerId").val();
            var date = $("#txtOrderDate").val();
            var cost = $("#txtSubTotal").val();
            var discount = $("#txtFinalDiscount").val();


            alert(custId);
            let order = new Order(orderId ,date, custId, discount,cost);
            let orderDetailsArray = order.getOrderDetails();
            for (var i in cartItem) {
                orderDetailsArray.push(new OrderDetails(cartItem[i].getItemCode, cartItem[i].getItemName(), cartItem[i].getItemQty, cartItem[i].getItemPrice()));
            }

            orders.push(order);

            alert("order Placed Complete");
            clearAll();
            generateOrderId();
            updateDate();

        } else {
            alert("Order Fail OrderId Incorrect");
            let res=confirm("Automatically reset order ID?");
            if (res){
                generateOrderId();

            }
        }
    }*/

    var order={
        orderId:$("#txtOrderId").val(),
        custId:$("#txtCustomerId").val(),
        date:$("#txtOrderDate").val()
    }

    $.ajax({
        url:"order",
        method:"POST",
        contentType:"application/json",

        data : JSON.stringify(order),

        success : function (res) {
                if (res.status==200){
                    alert(res.message);
                }else if (res.status==400){
                    alert(res.message);
                }


            },
            error : function (res){

                alert("System Error");

            }
    })
})


/*$("#txtOrderId").on('keydown',function (event) {

    if (event.key=="Enter"){

        if (($("#txtOrderId").val())!=''){

            for (var ob of orders){

                if (ob.getOrderId()==($("#txtOrderId").val())){

                    $("#txtOrderId").val(ob.getOrderId());
                    $("#txtOrderDate").val(ob.getOrderDate());
                    $("#txtCustomerId").val(ob.getCustId());

                    for(var i of customerDB){
                        if (i.getId()==ob.getCustId()){

                            $("#txtCustomerName").val(i.getName());
                            $("#txtCustomerSalary").val(i.getSalary());
                            $("#txtCustomerAddress").val(i.getAddress());
                            break;
                        }
                    }

                    break;
                }

            }

        }
    }

});*/

//end

function clearAll() {
    $("#txtOrderId").val('');
    $("#txtOrderDate").val('');
    $("#txtCustomerId").val('');
    $("#txtCustomerName").val('');
    $("#txtCustomerSalary").val('');
    $("#txtCustomerAddress").val('');
    $("#txtICode").val('');
    $("#txtIName").val('');
    $("#txtQtyOnHand").val('');
    $("#txtOrderQty").val('');
    $("#txtTotal").val('');
    $("#txtSubTotal").val('');
    $("#txtCash").val('');
    $("#txtFinalDiscount").val('');
    $("#txtBalance").val('');
    $("#orderTable").empty();

}

//generate OrderID

/*function generateOrderId() {
    if (orders.length!=0) {

        let lastrecord = orders[orders.length - 1].getOrderId();
        let split = lastrecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let generateId="O00-" + "00" + splitElement;
            $("#txtOrderId").val(generateId);

        } else if (splitElement > 99) {
            let generateId="O00-" + splitElement
            $("#txtOrderId").val(generateId);



        } else {
            let generateId="O00-001"
            $("#txtOrderId").val(generateId);

        }
    }else{
        let generateId="O00-001"
        $("#txtOrderId").val(generateId);

    }
}*/

//genarateResOrderId

function generateResOrderId() {
    /*if (orders.length!=0) {

        let lastRecord = orders[orders.length - 1].getOrderId();
        let split = lastRecord.split("-");
        let splitElement = ++split[1];
        if (splitElement < 10 && splitElement > 0) {
            let generateId="O00-" + "00" + splitElement;

            return generateId;
        } else if (splitElement > 99) {
            let generateId="O00-" + splitElement;

            return generateId;

        } else {

            let generateId="O00-001";
            return generateId;
        }
    }else{
        let generateId="O00-001";
        return generateId;

    }*/
}

/*$("#txtOrderId").on('keyup',function () {
    if ($("#txtOrderId").val()==''){
        generateOrderId();
    }
});*/

//get order
/*
$("#txtOrderId").on('keydown',function (event) {

    if (event.key=="Enter"){

        if (($("#txtOrderId").val())!=''){

            for (var order of orders){

                if (order.getOrderId()==($("#txtOrderId").val())){

                    $("#txtOrderId").val(order.getOrderId());
                    $("#txtOrderDate").val(order.getOrderDate());
                    $("#txtCustomerId").val(order.getCustId());

                    for(var i of customerDB){
                        if (i.getId()==order.getCustId()){

                            $("#txtCustomerName").val(i.getName());
                            $("#txtCustomerSalary").val(i.getSalary());
                            $("#txtCustomerAddress").val(i.getAddress());
                            break;
                        }
                    }

                    $("#orderTable").empty();
                    for (var obj of (order.getOrderDetails())){
                        let row = `<tr><td>${obj.getItemCode()}</td><td>${obj.getItemName()}</td><td>${obj.getItemQty()}</td><td>${obj.getItemUnitPrice()}</td><td>${obj.getItemUnitPrice()*obj.getItemQty()}</td></tr>`;
                        $("#orderTable").append(row);
                    }



                    break;
                }

            }

        }



    }

});*/
