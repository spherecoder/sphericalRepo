#!/bin/sh

convert line_empty.gif -geometry 512x512 -stroke white -strokewidth 2 -draw 'line 0,0 511,511' line512down.gif 
convert line_empty.gif -geometry 256x256 -stroke white -strokewidth 2 -draw 'line 0,0 255,255' line256down.gif 
convert line_empty.gif -geometry 128x128 -stroke white -strokewidth 2 -draw 'line 0,0 127,127' line128down.gif 
convert line_empty.gif -geometry 64x64 -stroke white -strokewidth 2 -draw 'line 0,0 63,63' line64down.gif 
convert line_empty.gif -geometry 32x32 -stroke white -strokewidth 2 -draw 'line 0,0 31,31' line32down.gif 
convert line_empty.gif -geometry 16x16 -stroke white -strokewidth 2 -draw 'line 0,0 15,15' line16down.gif 
convert line_empty.gif -geometry 8x8 -stroke white -strokewidth 2 -draw 'line 0,0 7,7' line8down.gif 


convert line_empty.gif -geometry 512x512 -stroke white -strokewidth 2 -draw 'line 0,511 511,0' line512up.gif 
convert line_empty.gif -geometry 256x256 -stroke white -strokewidth 2 -draw 'line 0,255 255,0' line256up.gif 
convert line_empty.gif -geometry 128x128 -stroke white -strokewidth 2 -draw 'line 0,127 127,0' line128up.gif 
convert line_empty.gif -geometry 64x64 -stroke white -strokewidth 2 -draw 'line 0,63 63,0' line64up.gif 
convert line_empty.gif -geometry 32x32 -stroke white -strokewidth 2 -draw 'line 0,31 31,0' line32up.gif 
convert line_empty.gif -geometry 16x16 -stroke white -strokewidth 2 -draw 'line 0,15 15,0' line16up.gif 
convert line_empty.gif -geometry 8x8 -stroke white -strokewidth 2 -draw 'line 0,7 7,0' line8up.gif 


