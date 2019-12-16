  
  var script_url = "https://script.google.com/macros/s/AKfycby51J4kfqivMi0gqs3AuA8AQ7IUrG2vlIkH27vKibpd3deUsahc/exec";
  
  // Make an AJAX call to Google Script
  function insert_value() {
    
	$("#re").css("visibility","hidden");
	 document.getElementById("loader").style.visibility = "visible";
	$('#mySpinner').addClass('spinner');

var id1=	$("#id").val();
	var data= $("#data").val();
	
	
    	var url = script_url+"?data="+data+"&id="+id1+"&action=insert";
	fetch(url, {
	  mode: 'no-cors' // 'cors' by default
	})
		.then((response) => response.json())
		.then((json) => {
			if (json.result.startsWith("fail")) {
				showToast(json.result);
			}  else {
				showToast('insert success');
			}
			ctrlq(json);
		})
		.catch((error) => {
			showToast('Unexpected error connecting database');
		})

  }


  
  
 
  
  
  function update_value(){
	$("#re").css("visibility","hidden");
     document.getElementById("loader").style.visibility = "visible";
	
	
var id1=	$("#id").val();
	var data= $("#data").val();
	
	
	
    	var url = script_url+"?data="+data+"&id="+id1+"&action=update";
	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			if (json.result.startsWith("fail")) {
				showToast(json.result);
			} else {
				showToast('update success');
			}
			ctrlq(json);
		})
		.catch((error) => {
			showToast('Unexpected error connecting database');
		})  


	
  }

  
 
  
  
  function delete_value(){
	$("#re").css("visibility","hidden");
     document.getElementById("loader").style.visibility = "visible";
	$('#mySpinner').addClass('spinner');
var id1=	$("#id").val();
	var data= $("#data").val();
	
	
    	var url = script_url+"?data="+data+"&id="+id1+"&action=delete";
	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			if (json.result.startsWith("fail")) {
				showToast(json.result);
			} else {
				showToast('delete success');
			}
			ctrlq(json);
		})
		.catch((error) => {
			showToast('Unexpected error connecting database');
		}) 

  }


  
  
  // print the returned data
  function ctrlq(e) {
  
	
	$("#re").html(e.result);
	$("#re").css("visibility","visible");
	read_value();
	
  }
  
  

  
function read_value() {

$("#re").css("visibility","hidden");
   
   document.getElementById("loader").style.visibility = "visible";
	var url = script_url+"?action=read";

 fetch(url)
		.then((response) => response.json())
		.then((json) => {
			if (json.status == 'success') {
				showToast('read success');
			}  else {
				showToast('read problem');
			}
			
		// Set the variables from the results array
  
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        var header = table.createTHead();
		var row = header.insertRow(0);     
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
	
		cell1.innerHTML = "<b>ID</b>";
		cell2.innerHTML = "<b>DATA</b>";
        
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < json.records.length; i++) {

            tr = table.insertRow(-1);
				var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = json.records[i].id;
				tabCell = tr.insertCell(-1);
				tabCell.innerHTML = json.records[i].data;
            }
      

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
		document.getElementById("loader").style.visibility = "hidden";
		$("#re").css("visibility","visible");
		})
		.catch((error) => {
			showToast('Unexpected error connecting database');
		}) 
 

	}
  