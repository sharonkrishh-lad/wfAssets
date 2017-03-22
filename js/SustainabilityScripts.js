
$(document).ready(function () {
	/* //For ellipsis
	$('p.wf-card-body-description').ellipsis({
  lines: 2,             // force ellipsis after a certain number of lines. Default is 'auto'
  ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
  responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
}); */
	$('p.wf-card-body-description').each(function(){
		function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}
	});
	
    window.config = {};
	window.homeSliders = {};
    function getConfigOptions(mode) {
        return {
            autoStart: false,
            auto: false,
            mode: mode,
            pause: 3000,
            pager: false,
			preloadImages: 'all',
            controls: false,
            autoControls: false,
            touchEnabled: false,
            easing: 'ease-out',
            speed: 1000
        };
    }

    function switchDirection(config, direction) {
        var c = $.extend({}, config);
        c.mode = direction;
        return c;
    }

    var bxsliderConfigOpt = getConfigOptions('vertical');
    bxsliderConfigOpt.pause = 3000;
   
    bxsliderConfigOpt.speed = 2000;
    bxsliderConfigOpt.touchEnabled = false;
    bxsliderConfigOpt.infiniteLoop = false;
    
    var pageNo = 0;
	var busyFlag = false;
    $('#arrNext').css('opacity', '0.3');
    // handle custom events
    $('#arrPrev').on('click', function (e) {
        if (busyFlag == true) {
            return false;
        }
        e.preventDefault();
        slider.goToNextSlide();
    });
    $('#arrNext').on('click', function (e) {
        if (busyFlag == true) {
            return false;
        }
        e.preventDefault();
        slider.goToPrevSlide();
    });


	var bgColors = [];
	bxsliderConfigOpt.onSliderLoad = function(){
		$('ul.bxsliderBlock>li').each(function(){
			bgColors.push($(this).css('background-color'));
		});
	};
    bxsliderConfigOpt.onSlideAfter = function (el, oldIndex, newIndex) {
		var lastSlide = $('li:eq(' + oldIndex + ')', $(this));
		$(lastSlide).css('background-color', bgColors[oldIndex]);
		
		
		busyFlag = false;
    };
    bxsliderConfigOpt.onSlideBefore = function (el, oldIndex, newIndex) {
		busyFlag = true;
    };
	bxsliderConfigOpt.onSlideNext = function (el, oldIndex, newIndex) {
        
        var pageCount = slider.getSlideCount();
        if (pageNo < pageCount) {
            pageNo++;
            if (pageNo == (pageCount-1)) {
                $('#arrPrev').css('opacity', '0.3');
            }
            $('#arrNext').css('opacity', '1');
		}
    };
	bxsliderConfigOpt.onSlidePrev = function (el, oldIndex, newIndex) {
        
        if (pageNo > 0) {
            pageNo--;
            if (pageNo == 0) {
                $('#arrNext').css('opacity', '0.3');
            }
            $('#arrPrev').css('opacity', '1');
        }
    };
	
	
	
	// DETECT CURRENT DEVICE SIZE AND HANDLE RESIZE EVENT
	var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        isMobile = true;


    function getDeviceSize() {
        // using media query
        if (window.matchMedia("(max-width: 39.9375em)").matches) {
            return 'small';
        } else if (window.matchMedia("(min-width: 40em) and (max-width: 63.9375em)").matches) {
            return 'medium';
        } else {
            return 'large';
        }
    }

    var deviceSize = getDeviceSize();
    
    if (deviceSize == "small") {
        bxsliderConfigOpt = switchDirection(bxsliderConfigOpt, 'horizontal');
    }
	
	
	
	
	
    // INITIALIZE SLIDER
    var slider = $('.bxsliderBlock').bxSlider(bxsliderConfigOpt);
    
	
	var lastDeviceSize = deviceSize;

    $(window).on('resize orientationchange load', function () {
        var currentDeviceSize = getDeviceSize();

        if (currentDeviceSize !== lastDeviceSize) {
            $(window).trigger('breakpoint-changed', currentDeviceSize);
            lastDeviceSize = currentDeviceSize;
        }
    });





    //WINDOW RESIZE HANDLER
    $(window).on('breakpoint-changed', function (e, breakpoint) {
		$('#arrNext').css('opacity', '0.3');
		$('#arrPrev').css('opacity', '1');
		pageNo = 0;
        console.log(breakpoint);
        if (breakpoint === 'small') {
            e.preventDefault();
            curTopSliderOrientation = 'horizontal';
            if (slider) {
                slider.reloadSlider(switchDirection(bxsliderConfigOpt, 'horizontal'));
            }
        }
        if (breakpoint === 'medium') {
            e.preventDefault();
            if (slider) {
                slider.reloadSlider(switchDirection(bxsliderConfigOpt, 'horizontal'));
            }
        }
        if (breakpoint === 'large') {
            e.preventDefault();
            if (slider) {
                slider.reloadSlider(switchDirection(bxsliderConfigOpt, 'vertical'));
            }
        }
    });

	


});

