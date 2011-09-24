function drawLine( lineObjectHandle, Ax, Ay, Bx, By, lineImgPath )
{
    /*
     *	lineObjectHandle = an IMG tag with position:absolute
     */
    var
        xMin        = Math.min( Ax, Bx ),
        yMin        = Math.min( Ay, By ),
        xMax        = Math.max( Ax, Bx ),
        yMax        = Math.max( Ay, By ),
        boxWidth    = Math.max( xMax-xMin, 1 ),
        boxHeight   = Math.max( yMax-yMin, 1 ),
        tmp         = Math.min( boxWidth, boxHeight ),
        smallEdge   = 1,
        newSrc;


    while( tmp>>=1 )
        smallEdge<<=1;

    newSrc = lineImgPath+ smallEdge +( (Bx-Ax)*(By-Ay)<0?"up.gif":"down.gif" );
    if( lineObjectHandle.src.indexOf( newSrc )==-1 )
        lineObjectHandle.src = newSrc;

    with( lineObjectHandle.style )
    {
        width   = boxWidth	+"px";
        height  = boxHeight	+"px";
        left    = xMin		+"px";
        top     = yMin		+"px";
    }
}