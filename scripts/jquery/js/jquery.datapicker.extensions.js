jQuery.datepicker.movePickerRelativelyToTriggerIcon = function (input, inst) {
    var offset = jQuery(input).offset().left;
    var width = parseFloat(inst.dpDiv.css('width').replace('px', ''));
    var move = offset + input.offsetWidth + width < jQuery(window).width();
    inst.dpDiv.css({
        marginLeft:move ? input.offsetWidth + 'px' : 0
    });
};