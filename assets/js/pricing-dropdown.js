// Pricing box dropdown

$(document).ready(function(e) {
    $('.select_menu_con').each(function() {
        var $dropdown = $(this);

        $dropdown.find('.select_value').click(function(e) {
            $dropdown.find('.select_menu').slideToggle('slow');
        });

        $dropdown.find('.select_menu li').click(function(e) {
            $dropdown.find('.select_value').html($(this).html());
            $dropdown.find('.select_menu').slideToggle('slow');
        });
    });
});