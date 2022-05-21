

loadAllCustomer();
function customerAddOrUpdate() {
    /*var id=$("#txtCusID").val();
    var name=$("#txtCusName").val();
    var address=$("#txtCusAddress").val();
    var salary=$("#txtCusSalary").val();*/

    var id=$("#txtCusID").val();
    var name=$("#txtCusName").val();
    var address=$("#txtCusAddress").val();
    var salary=$("#txtCusSalary").val();

    var customer={
        id : id,
        name : name,
        address : address,
        salary : salary
    }


    console.log(id,name,address,salary);

    $.ajax({

        url:"customer",
        method : "POST",
        contentType : "application/json",
        data : JSON.stringify(customer),

        success : function (res){
            if (res.status==200){
                alert(res.message);
                clearAll();
                loadAllCustomer();
            }else if (res.status==400){
                alert(res.message)
                clearAll();
            }else {
                alert(res.data);
                clearAll();
            }
        }


    });
}
$("#btnCustomer").click(function (){
    customerAddOrUpdate();
});

function loadAllCustomer(){
    $.ajax({
        url:"customer?option=GetALL",
        method : "GET",
        success:function(resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
                $("#tblCustomer").append(row);
            }
        }
    });
}

function clearAll(){
    $("#txtCusID").val('');
    $("#txtCusName").val('');
    $("#txtCusAddress").val('');
    $("#txtCusSalary").val('');
}



$("#btnSearch").click(function () {

    $.ajax({
        url :"customer?option=GETONE&id="+$("#txtSearchCusID").val(),
        method : "GET",
        success : function (res){
            if (res.status==200){
                $("#txtCusID").val(res.data.id);
                $("#txtCusName").val(res.data.name);
                $("#txtCusAddress").val(res.data.address);
                $("#txtCusSalary").val(res.data.salary);

            }else if(res.status==400){
                alert(res.message);
            }
        }
    })

});

/*function searchCustomer(customerId) {
    for (var i in customerDB) {
        if (customerId==customerDB[i].getId()){
            return customerDB[i];
        }
    }
}*/

//SearchCustomer end


//Delete Customer
$("#btnDelete").click(function () {
/*
    var id=$("#txtCusID").val();
    if(searchCustomer(id)==null);
    alert("No Such As A Customer");


    var id=$("#txtCusID").val();
    for (var i in customerDB) {
        if (id==customerDB[i].getId()){
            customerDB.splice(i,1);
            loadAllCustomer();
            alert("Customer Delete Complete");
            clearAll();
            break;
        }
    }*/


    $.ajax({
        url :"customer?id="+$("#txtSearchCusID").val(),
        method : "DELETE",
        success : function (res){

            if (res.status == 200){
                alert(res.message);
            }else if(res.status == 400){
                alert(res.message);
            }


        }




    });
});

// validation start
/*
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
*/




/*
$("#btnCustomer").prop('disabled', true);


$("#mainDiv input").on('keydown',function (a) {
    if (a.key == "Tab") {
        a.preventDefault(); // stop execution of the button
    }
    validate(a);
    //console.log(e.key);

})
*/

/*function validate(a){
    var id=$("#txtCusID").val();
    var name=$("#txtCusName").val();
    var address=$("#txtCusAddress").val();
    var salary=$("#txtCusSalary").val();

    if (cusIDRegEx.test(id)){

        $("#txtCusID").css('border', '2px solid green');
        $("#lblcusid").text("");
        $("#btnCustomer").prop('disabled', false);
        if (a.key=="Enter"){$("#txtCusName").focus()

        }

        if (cusNameRegEx.test(name)){
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            $("#btnCustomer").prop('disabled', false);
            if (a.key=="Enter"){$("#txtCusAddress").focus()}

            if (cusAddressRegEx.test(address)){
                $("#txtCusAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                $("#btnCustomer").prop('disabled', false);
                if (a.key=="Enter"){$("#txtCusSalary").focus()}

                if (cusSalaryRegEx.test(salary)){
                    $("#txtCusSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    $("#btnCustomer").prop('disabled', false);
                    if (a.key=="Enter"){ customerAddOrUpdate()  }
                    $("#btnCustomer").prop('disabled', false);


                }else {
                    $("#txtCusSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    $("#btnCustomer").prop('disabled', true);
                }

            }else{
                $("#txtCusAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                $("#btnCustomer").prop('disabled', true);
            }

        }else{
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            $("#btnCustomer").prop('disabled', true);
        }

    }else{
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        $("#btnCustomer").prop('disabled',true);
    }
}*/
