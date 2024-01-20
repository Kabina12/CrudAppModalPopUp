$(document).ready(function () {

   
    GetProducts();
    $('#btnAdd').click(function () {
        $('#modal-1').modal('show');

    });

    

});


    









function GetProducts() {

    $.ajax({
        url: '/Product/GetProducts',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (response) {
            

            if (response == null || response == undefined || response.length == 0) {
                var object = '';  //nullable
                object += '<tr>';
                object += '<td colspan="5">' + 'Products not available'+ '</td>';

                object += '</tr>';

                $('#table_data').html(object);
            }
            else {
                var object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.id + '</td>';
                    object += '<td>' + item.name + '</td>';
                    object += '<td>' + item.price + '</td>';
                    object += '<td>' + item.qty + '</td>';
                    object += '<td> <a href="#" class="btn btn-primary btn-sm" onclick="Edit(' + item.id + ')">Edit</a>  <a href="#" class="btn btn-primary btn-sm" onclick="Delete(' + item.id + ')">Delete</a></td>';
                });


                $('#table_data').html(object);





            }
        },

        error: function () {
            alert("Data cannot get");
        }
    });
}





// Insert

//function Insert() {
//    //read the data from view
//    var objData = {
//    Id:$('#Id').val(),
//    Name:$('#Name').val(),           // id ko through value get garera Name ma rakheko.and sabai data lai objdata i.e object ma store gareko
//    Price:$('#Price').val(),
//    Qty:$('#Qty').val(),
//    }

//    // call ajax method to post it

//    $.ajax({
//        url: '/Product/Insert',

//        type:'Post', // post data to db
//        dataType:'json',
//        contentType: 'application/json; charset=UTF-8',
//        success: function (response) {
//            if (response == null || response == undefined || response.length == 0) {
//                alert('Unable to save the data.');

//            }
//            else {
//                GetProducts();
//                alert(response);
//            }


//        },

//        error: function () {
//            alert('Unable to save the data.')
//        }





//    });




//}

function Insert() {

var productName = $('#Name').val();  //retrieves the data enter by the user in modal
var productPrice = $('#Price').val();
var productQty = $('#Qty').val();

// Check if the values are not empty
if (!productName || !productPrice || !productQty) {
    alert("Please fill in all fields");
    return;
}

// Build the newProduct object
var newProduct = {
    Name: productName,
    Price: parseFloat(productPrice),
    Qty: parseInt(productQty)
};

// Send data to the server for insertion
$.ajax({
    url: '/Product/Insert',
    type: 'POST',
    data: JSON.stringify(newProduct),
    contentType: 'application/json; charset=UTF-8',
    success: function (response) {
        GetProducts();                                             //called to refresh the list of products on the page.fetches the updated list of products from the 
                                                                    //server and updates the UI with the latest data.This ensures that users see the most recent information 
                                                                    //without having to manually refresh the entire page.

        $('#modal-1').modal('hide');
        $('#Save').css('display', 'block');
    },
    error: function (xhr, status, error) {
        console.error("Error inserting product:", status, error, xhr.responseText);
        alert("Error inserting product. Check the console for details.");
    }
});
}

function Edit(id) {
    $.ajax({
        url: '/Product/Edit?id=' +id,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('unable to read');
            }
            else {
                $('#modal-1').modal('show');
                $('#modal-title').text('Update Product');
                $('#Save').css('display', 'none');
                $('#btnUpdate').show();
              
                $('#id').val(response.id);
                $('#Name').val(response.name);
                $('#Price').val(response.price);
                $('#Qty').val(response.qty);
                
            }

        },

        error: function () {
            alert('unable to read the data');
        }

    });


}



    function Update() {
        var updatedProduct = {
            Id: $('#id').val(),
            Name: $('#Name').val(),
            Price: parseFloat($('#Price').val()),
            Qty: parseInt($('#Qty').val())
        };

        $.ajax({
            url: '/Product/Update',
            type: 'POST', // Corrected to POST method
            data: JSON.stringify(updatedProduct),
            contentType: 'application/json; charset=UTF-8',
            success: function (response) {
                if (response == null || response==undefined || response.length==0){
                    alert('unable to save the data');
                } else {
                    $('#modal-1').modal('hide');
                    GetProducts();
                    alert(response); // Corrected to 'response' instead of 're
                }
            },
            error: function (xhr, status, error) {
                console.error('Ajax error:', status, error, xhr.responseText);
                alert('Error updating product details. Check the console for details.');
            }
        });
    }


    //var updatedProduct = {
    //    Name: productName,
    //    Price: parseFloat(productPrice),
    //    Qty: parseInt(productQty);


    //$.ajax({
    //    url: '/Product/Update',
    //    type: 'Get',
    //    dataType: 'json',
    //    contentType: 'application/json; charset=UTF-8',
    //    success: function (response) {
    //        if (response == null || response == undefined || response.length == 0) {
    //            alert('unable to save');
    //        }
    //        else {
    //            GetProducts();
    //            alert(reponse);
    //        }

    //    },

    //    error: function () {
    //        alert('unable to save the data');
    //    }

    //});



function Delete(id) {
    if (confirm('Are you sure to delete')) {



        $.ajax({
            url: '/Product/Delete?id=' + id,
            type: 'post',

            success: function (response) {
                if (response == null || response == undefined || response.length == 0) {
                    alert('unable to delete');
                }
                else {
                    GetProducts();
                    alert(response);

                }

            },

            error: function () {
                alert('unable to read the data');
            }

        });
    }


}



       
           



