$(document).ready(function() {

	$("#message").characterCounter()
	$("#alertModal").modal()
	$("#loadingModal").modal()


	$("#btnSub").on("click",function(e) {

		e.preventDefault();

		var err = 0

		$(".invalid").each(function() {
			err++
		})

		var msg = ""
		var name = $("#fname").val()
		var email = $("#email").val()
		var mesg = $("#message").val()

		if (name == "") {
			$("#fname").addClass("invalid")
			err++
		}

		if (email == "") {
			$("#email").addClass("invalid")
			err++
		}

		if (mesg == "") {
			$("#message").addClass("invalid")
			err++
		}

		if (err > 0) {
			$("#alertModal .modal-body").empty().append("Please correct all fields with errors!")
			$("#alertModal").modal("open")
			return
		} else {
			$("#loadingModal p").empty().append("Sending")
			$("#loadingModal").modal({onOpenEnd : sendEmail})
			$("#loadingModal").modal("open")
			
		  }

	})

})

/*
 #######################################################################
 #
 #  FUNCTION NAME : sendEmail
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : May 06, 2019 PDT
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : sends email to the author
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function sendEmail() {

	var name = $("#fname").val()
	var email = $("#email").val()
	var mesg = $("#message").val()

	$.ajax({
	    url: '/send',
	    method: 'POST',
	    data: {name : name, email : email, message : mesg},
	    async: false,
	}).done(function(r){

			$("#loadingModal").modal("close")

			if (r) {
				$("#alertModal .modal-body").empty().append("E-mail Sent")
				$("#alertModal").modal("open")
				$("#fname, #email, #message").val("").removeClass("valid")
				$(".prefix, label").removeClass("active")
				$("#message").characterCounter()
			} else {
				$("#alertModal .modal-body").empty().append("E-mail Not Sent")
				$("#alertModal").modal("open")
			}
	
	   });

}