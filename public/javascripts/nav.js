var toggleHor = 0 , toggleVert = 0;

$('#toggle').on( 'click' , function(){

    if( $(window).width() < 1300 )
    {
        if ( $('#nav').is(':visible') )
        {
            $('#nav').animate({
                'height' : 'hide'
            },400);

            toggleVert = 1;
        }

        else
        {
            $('#nav').animate({
                'height' : 'show'
            },400);

            toggleVert = 0;
        }
    }
    else
    {
        if ( $('#nav').is(':visible') )
        {
            $('#nav').animate({
                'width' : 'hide'
            },400);

            toggleHor = 1;
        }

        else
        {
            $('#nav').animate({
                'width' : 'show'
            },400);

            toggleHor = 0;
        }
    }

} );
