import 'bootstrap';
import 'jquery';
import $ from 'jquery';
import './maskedinput.js';
import 'slick-carousel';


$(document).ready(function () {
	$('[name="phone"]').inputmask({
		keepStatic: false,
		clearIncomplete: true,
		definitions: {
			'z': {
				validator: '0'
			},
			't': {
				validator: '3'
			}
		},
		mask: [
			'+380 5z 999-99-99',
			'+380 63 999-99-99',
			'+380 66 999-99-99',
			'+380 67 999-99-99',
			'+380 68 999-99-99',
			'+380 7t 999-99-99',
			'+380 75 999-99-99',
			'+380 77 999-99-99',
			'+380 \\91 999-99-99',
			'+380 \\93 999-99-99',
			'+380 \\94 999-99-99',
			'+380 \\95 999-99-99',
			'+380 \\96 999-99-99',
			'+380 \\97 999-99-99',
			'+380 \\98 999-99-99',
			'+380 \\9\\9 999-99-99'
		]
	}).attr('required', true);
	// Assuming your form has an id "myForm"
	$('form').on('submit', function (e) {
		// Prevent the form from submitting
		e.preventDefault();

		// Check if the phone input is complete
		var phoneInput = $(this).find('[name="phone"]');
		if (phoneInput.inputmask("isComplete")) {
			// If the phone input is complete, submit the form
			$(this).children(".button").hide();
			this.submit();
		} else {
			// If the phone input is incomplete, show an error message
			alert("Введіть повний номер телефону.");
		}
	});

	$('select[name="product"]').on('change', function() {
		var count = $(this).find('option:selected').data('count');
		var prise = $(this).find('option:selected').data('prise');
		var product_id = $(this).find('option:selected').data('productid');
		$('input[name="count"]').val(count);
		$('input[name="product_price"]').val(prise);
		$('input[name="product_id"]').val(product_id);
	});

	$('select[name="comment"]').on('change', function() {
		var count = $(this).find('option:selected').data('count');
		var prise = $(this).find('option:selected').data('prise');
		var product_id = $(this).find('option:selected').data('productid');
		$('input[name="count"]').val(count);
		$('input[name="product_price"]').val(prise);
		$('input[name="product_id"]').val(product_id);
	});

	$('a[href^="#"]').click(function (){
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 100);
        if($(this).is("#for-place")) {
            var sum = $(".new.for-place").text();
            $("form input[name='comment']").val("4-х Местная |" + sum);
        }
        return false;
    });

	/* timer */
    
	let now = new Date();
    var perem = (24-now.getHours())*3600;
    $(".el-timer").attr("data-timer", perem);
    

	
	function update() {
		var Now = new Date(), Finish = new Date();
		Finish.setHours( 23);
		Finish.setMinutes( 59);
		Finish.setSeconds( 59);
		if( Now.getHours() === 23  &&  Now.getMinutes() === 59  &&  Now.getSeconds === 59) {
			Finish.setDate( Finish.getDate() + 1);
		}
		var sec = Math.floor( ( Finish.getTime() - Now.getTime()) / 1000);
		var hrs = Math.floor( sec / 3600);
		sec -= hrs * 3600;
		var min = Math.floor( sec / 60);
		sec -= min * 60;
		$(".timer .hours").text( pad(hrs));
		$(".timer .minutes").text( pad(min));
		$(".timer .seconds").text( pad(sec));
		setTimeout( update, 200);
	}
	function pad(s) { return ('00'+s).substr(-2) }
	update();

	/* sliders */

    $('.gallery').slick({
      dots: false,
      infinite: true,
      speed: 200,
      fade: false,
      cssEase: 'linear'
    }); 
    
    $('.reviews').slick({
      dots: false,
      infinite: false,
      speed: 200,
      fade: false,
      cssEase: 'linear'
    }); 
	 
});
