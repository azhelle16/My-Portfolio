$(document).ready(function() {

	$('.carousel').carousel({
	    numVisible : 6
	});

	$(".carousel-item").on("click",function() {

		var id = $(this).attr("href")

		$(".animated").each(function(){
			
			$(this).removeClass("animated fadeInUp").addClass("dispHide")

		})

		$(""+id).removeClass("dispHide").addClass("animated fadeInUp")

		$(".projTitle").each(function(){
			
			$(this).removeClass("dispHide").addClass("dispHide")

		})

		$(this).children().eq(1).removeClass("dispHide")

	})

	$('.tooltipped').tooltip();

})