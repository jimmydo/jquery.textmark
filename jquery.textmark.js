// Gives a text field a watermark that disappears either when the text field
// receives focus or when the text field is not empty.
//
// Depends on jquery.textchange plugin.
//
// Usage:
// HTML:
//     <!--
//      NOTE: label must have 'for' attribute that references the text
//      field's ID.
//     -->
//     <div>
//         <label for="username">Username</label>
//         <input id="username" type="text" />
//     </div>
//
// CSS:
//     .watermark
//     {
//         color: #999999;
//         position: absolute;
//     }
//
//     .watermark-focus
//     {
//         /* Lighten watermark when text field is focused... */
//         color: #dddddd;
//
//         /* ...OR hide the watermark instead. */
//         /*display: none;*/
//     }
//
//     .watermark-hide
//     {
//         display: none;
//     }
//
//     .watermark-field
//     {
//         background-color: transparent;
//         position: relative;
//     }
//
// JS:
//     $('#username').textmark();
(function ($) {
    $.fn.textmark = function (options) {
        var opts = $.extend({}, $.fn.textmark.defaults, options);
        this.each(function () {
            function update() {
                var notEmpty = !!textField.val();
                label.toggleClass(opts.labelHideClass, notEmpty);
                textField.toggleClass(opts.fieldNotEmptyClass, notEmpty);
            }
            var textField = $(this);
            var textId = textField.attr('id');
            if (!textId) {
                return;
            }
            var label = $('label[for="' + textId + '"]');
            if (!label.length) {
                return;
            }
            label.addClass(opts.labelClass);
            textField.addClass(opts.fieldClass);
            textField.focus(function () {
                label.addClass(opts.labelFocusClass);
            });
            textField.blur(function () {
                label.removeClass(opts.labelFocusClass);
            });
            textField.bind('textchange', update);
            update();
        });
    };
    $.fn.textmark.defaults = {
        labelClass: 'watermark',
        labelFocusClass: 'watermark-focus',
        labelHideClass: 'watermark-hide',
        fieldClass: 'watermark-field',
        fieldNotEmptyClass: 'watermark-field-not-empty'
    };
}(jQuery));

