/* Set the width of the side navigation to 250px */
function openNav(isEditing) {
	if (!isEditing){ clearForm();}
    $("#main").css("z-index", "-1");
    $("#mySidenav").css("z-index", "100");
    //$( "#main" ).addClass( "blur" );
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	$("#mySidenav").css("z-index", "-1");
	$("#main").css("z-index", "1");
    document.getElementById("mySidenav").style.width = "0";
}


function clearForm(){
	    $("#title-action").text("Add Classified");
	    $("button.btn.btn-warning.update-classified").hide();
	    $("button.btn.btn-primary.add-classified").show();
		$("input#title-input.form-control.title").val("");
		$("input.form-control.price-input").val("");
		$("input.form-control.description-input").val("");
		$("input.form-control.imageLink-input").val("");
	}