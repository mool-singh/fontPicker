// this is the code which will be injected into a given page...
var fontLoader = function (param) {
	var headID = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	headID.appendChild(link);
	link.href = 'https://fonts.googleapis.com/css?family='+param.family;

};



// Collect font-family
(function() {

	chrome.storage.local.get('funtion_to_run',function(items){

		var funtion_to_run=items.funtion_to_run;
		if(funtion_to_run=="font_family")
		{
			// Get saved data from chrome strorage
			chrome.storage.local.get(['font_Family','elem_id'], function (items) {
				var font_Family=items.font_Family;
				var elem_id  = items.elem_id;

				// function will change style
				change_style(font_Family,elem_id);

			});

			return;

		}
		if(funtion_to_run=="font_weight")
		{

			// Get saved data from chrome strorage
			chrome.storage.local.get(['font_weight','elem_id'], function (items) {
				var font_weight=items.font_weight;
				var elem_id  = items.elem_id;
				
				document.getElementById(elem_id).style.fontWeight=font_weight;

			});

			return;

		}
		if(funtion_to_run=="text_align")
		{

			// Get saved data from chrome strorage
			chrome.storage.local.get(['text_align','elem_id'], function (items) {
				var text_align=items.text_align;
				var elem_id  = items.elem_id;
				
				document.getElementById(elem_id).style.textAlign=text_align;

			});

			return;

		}
		if(funtion_to_run=="reset")
		{

			// Get saved data from chrome strorage
			chrome.storage.local.get(['elem_id'], function (items) {
				var elem_id  = items.elem_id;
				
				document.getElementById(elem_id).style.textAlign='';
				
				document.getElementById(elem_id).style.fontSize='';

				document.getElementById(elem_id).style.fontWeight='';

				document.getElementById(elem_id).style.fontFamily='';

			});

			return;

		}
		else
		{
			
			// Get saved data from chrome strorage
			chrome.storage.local.get(['font_size','elem_id'], function (items) {
				var font_size=items.font_size;
				var elem_id  = items.elem_id;
				
				document.getElementById(elem_id).style.fontSize=font_size+"px";

			});

			return;

		}

	})
	
	

})();


	// apply style
  function change_style(fontFamily,elem_id)
  {
	
	fontLoader({
		family: fontFamily
	});

   document.getElementById(elem_id).style.fontFamily=fontFamily;
  }


