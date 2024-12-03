// Home 3 Page

(function ($, undefined) {
    $.ui.slider.prototype.options = $.extend({}, $.ui.slider.prototype.options, {
        orientation: "vertical", // Set the orientation to vertical
        paddingMin: 0,
        paddingMax: 0
    });

    $.ui.slider.prototype._refreshValue = function () {
        var oRange = this.options.range,
            o = this.options,
            self = this,
            animate = (!this._animateOff) ? o.animate : false,
            valPercent,
            _set = {},
            elementHeight,
            paddingMinPercent,
            paddingMaxPercent,
            paddedBarPercent,
            lastValPercent,
            value,
            valueMin,
            valueMax;

        // Calculate height and padding for vertical orientation
        elementHeight = this.element.outerHeight();
        paddingMinPercent = (o.paddingMin * 100) / elementHeight;
        paddedBarPercent = ((elementHeight - (o.paddingMin + o.paddingMax)) * 100) / elementHeight;

        if (this.options.values && this.options.values.length) {
            this.handles.each(function (i) {
                valPercent =
                    (((self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin())) * 100) *
                    (paddedBarPercent / 100) + paddingMinPercent;

                _set["bottom"] = valPercent + "%"; // Adjust position from the bottom
                $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);

                if (self.options.range === true) {
                    if (i === 0) {
                        self.range.stop(1, 1)[animate ? "animate" : "css"]({
                            bottom: valPercent + "%"
                        }, o.animate);
                    }
                    if (i === 1) {
                        self.range[animate ? "animate" : "css"]({
                            height: (valPercent - lastValPercent) + "%"
                        }, {
                            queue: false,
                            duration: o.animate
                        });
                    }
                }
                lastValPercent = valPercent;
            });
        } else {
            value = this.value();
            valueMin = this._valueMin();
            valueMax = this._valueMax();
            valPercent =
                (((valueMax !== valueMin) ? (value - valueMin) / (valueMax - valueMin) : 0) *
                    100 *
                    paddedBarPercent) /
                    100 +
                paddingMinPercent;

            _set["bottom"] = valPercent + "%"; // Set handle position from the bottom

            this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);

            if (oRange === "min") {
                this.range.stop(1, 1)[animate ? "animate" : "css"]({
                    height: valPercent + "%"
                }, o.animate);
            }
            if (oRange === "max") {
                this.range[animate ? "animate" : "css"]({
                    height: (100 - valPercent) + "%"
                }, {
                    queue: false,
                    duration: o.animate
                });
            }
        }
    };
    
    $.ui.slider.prototype._normValueFromMouse =
        function (position) {
            var
                o = this.options,
                pixelTotal,
                pixelMouse,
                percentMouse,
                valueTotal,
                valueMouse;

            if (this.orientation === "horizontal") {
                pixelTotal = this.elementSize.width - (o.paddingMin + o.paddingMax);
                pixelMouse = position.x - this.elementOffset.left - o.paddingMin - (this._clickOffset ? this._clickOffset.left : 0);
            } else {
                pixelTotal = this.elementSize.height - (o.paddingMin + o.paddingMax);
                pixelMouse = position.y - this.elementOffset.top - o.paddingMin - (this._clickOffset ? this._clickOffset.top : 0);
            }

            percentMouse = (pixelMouse / pixelTotal);
            if (percentMouse > 1) {
                percentMouse = 1;
            }
            if (percentMouse < 0) {
                percentMouse = 0;
            }
            if (this.orientation === "vertical") {
                percentMouse = 1 - percentMouse;
            }

            valueTotal = this._valueMax() - this._valueMin();
            valueMouse = this._valueMin() + percentMouse * valueTotal;

            return this._trimAlignValue(valueMouse);
        };
}
)(jQuery);

var cpu_arr = new Array('1VCPU', '2VCPU', '4VCPU', '6VCPU', '8VCPU', '3VCPU');
var space_arr = new Array('100GB', '110GB', '120GB', '140GB', '160GB', '150GB');
var connection_arr = new Array('7Gbps', '8Gbps', '10Gbps', '12Gbps', '14Gbps', '18Gbps');
var data_arr = new Array('20GB', '22GB', '24GB', '26GB', '28GB', '25GB');
var tracfficdata_arr = new Array('4TB', '6TB', '8TB', '5TB', '7TB', '2TB');
var backupdata_arr = new Array('$1/M', '$3/M', '$5/M', '$7/M', '$9/M', '$6/M');
var b_url = 'https://www.your-domain.com/?cmd=cart&action=add&id=';

// This is what you want the default position to be
var def_pos = 3;

$(document).ready(function () {
// Function to calculate padding based on screen width
function calculatePadding() {
    const screenWidth = $(window).width();
    let paddingMin, paddingMax;

    if (screenWidth < 576) {
        paddingMin = 10;
        paddingMax = 20;
    } else if (screenWidth >= 576 && screenWidth < 1024) {
        paddingMin = 5;
        paddingMax = 25;
    } else {
        paddingMin = 5;
        paddingMax = 25;
    }

    return { paddingMin, paddingMax };
}

// Initialize the slider with dynamic padding
function initializeSlider() {
    const { paddingMin, paddingMax } = calculatePadding();

    $("#home3slider").slider({
        range: 'min',
        animate: true,
        min: 1,
        max: 5,
        paddingMin: paddingMin,
        paddingMax: paddingMax,
        slide: function (event, ui) {
            $('.home3slider-container #space_val span.value').html(space_arr[ui.value - 1]);
            $('.home3slider-container #cpu_val span.value').html(cpu_arr[ui.value - 1]);
            $('.home3slider-container #connection_val span.value').html(connection_arr[ui.value - 1]);
            $('.home3slider-container #data_val span.value').html(data_arr[ui.value - 1]);
            $('.home3slider-container #tracfficdata_val span.value').html(tracfficdata_arr[ui.value - 1]);
            $('.home3slider-container #backupdata_val span.value').html(backupdata_arr[ui.value - 1]);

            $('.home3slider-container a.buynow-button').attr('href', b_url + backupdata_arr[ui.value - 1]);
            $(".home3slider-container div.price_rangetxt div").removeClass("current");
            for (var i = 0; i < ui.value; i++) {
                $(".home3slider-container div.price_rangetxt div#icon-" + i).addClass("current");
            }
        },
        change: function (event, ui) {
            $('.home3slider-container #space_val span.value').html(space_arr[ui.value - 1]);
            $('.home3slider-container #cpu_val span.value').html(cpu_arr[ui.value - 1]);
            $('.home3slider-container #connection_val span.value').html(connection_arr[ui.value - 1]);
            $('.home3slider-container #data_val span.value').html(data_arr[ui.value - 1]);
            $('.home3slider-container #tracfficdata_val span.value').html(tracfficdata_arr[ui.value - 1]);
            $('.home3slider-container #backupdata_val span.value').html(backupdata_arr[ui.value - 1]);

            $('.home3slider-container a.buynow-button').attr('href', b_url + backupdata_arr[ui.value - 1]);
            for (var i = 0; i < ui.value; i++) {
                $(".home3slider-container div.price_rangetxt div#icon-" + i).addClass("current");
            }
        }
    });

    $("#amount").val("$" + $("#home3slider").slider("value"));
    $('#home3slider').slider('value', def_pos);
}

// Initialize the slider on page load
initializeSlider();

// Recalculate padding and reinitialize slider on window resize
$(window).resize(function () {
    initializeSlider();
});

// Handle icon click to change slider value
$('.icon').click(function () {
    let ch_value = parseInt(this.id.slice(5)) + 1;
    $(".home3slider-container div.price_rangetxt div").removeClass("current");
    $('#home3slider').slider('value', ch_value);
});
});