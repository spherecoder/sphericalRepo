<?php
echo "{
	identifier: 'testid',
	label: 'name',
	items: [ 
	{ testid: 'sphMasterDark_SV', recipe: 'sph_ifs_master_dark', date: '16.1.2010',
       version: '0.6.1', responsible: 'mfeldt@mpia.de', getmail: 'false', description: 'A nice test', sof: [{tag: 'IFS_DARK_RAW', filename: 'super_duper_dark_file'}], parameters: [{param: 'ifs.master_dark.sigma_clip', type: 'double', value: '5.0'}], verifications: [{tag: 'IFS_DARK_CALIB',filename: 'ifs_master_dark.fits', scriptname: 'identical_image.py'}]
	} 
]}";
?>
