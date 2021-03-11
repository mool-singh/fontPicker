$(function(){

    //  set select option
    $(document).ready(function(){
        GoogleFonts();
        // $('#font_family').selectize();

        

    })

    // User select change event
    $("#font_family").change(function(){

        if(check_el_id() && elemet_exits())
        {
            var fontFamily = $(this).val();
            var elemId =$("#el_id").val();

            //  Save data in local storage and run inject file
            chrome.storage.local.set({
                font_Family: fontFamily,elem_id:elemId,funtion_to_run:"font_family"
            }, function () {
                chrome.tabs.executeScript({
                    file: "inject.js"
                });
            });
        }
        else
        {
            $('#font_family').prop('selectedIndex', 0);
        }  

    })

    // font-size range slider
    $("#font-size-slider").on("input",function(e){
        var font_size = $(this).val();
        
        if(check_el_id() && elemet_exits())
        {
            var el_id=$("#el_id").val();
    
            //  Save data in local storage and run inject file
            chrome.storage.local.set({
                font_size: font_size,elem_id:el_id,funtion_to_run:"font_size"
            }, function () {
                chrome.tabs.executeScript({
                    file: "inject.js"
                });
            });
    
        }
    
    })

    $("#el_id").on("input",function(){
        check_el_id();
    })

    $(".reset-btn").click(function(){
        if(check_el_id())
        {
            var el_id=$("#el_id").val();

            chrome.storage.local.set({
                elem_id:el_id,funtion_to_run:"reset"
            }, function () {
                chrome.tabs.executeScript({
                    file: "inject.js"
                });
            });
            
        }
    })
    
    
    // font weight range slider
    // range slider
    $("#font-weight-slider").on("input",function(e){
        var font_weight = $(this).val();
        
        if(check_el_id() && elemet_exits())
        {
            var el_id=$("#el_id").val();
    
            //  Save data in local storage and run inject file
            chrome.storage.local.set({
                font_weight: font_weight,elem_id:el_id,funtion_to_run:"font_weight"
            }, function () {
                chrome.tabs.executeScript({
                    file: "inject.js"
                });
            });
    
        }
    
    })

    $("#el_id").change(function(){

        
            elemet_exits();
        
    })


    // font weight range slider
    // range slider
    $(".btn-li").on("click",function(e){
        var text_align = $(this).attr("data");

        

        
        if(check_el_id() && elemet_exits())
        {
            var el_id=$("#el_id").val();

            $(".btn-li").each(function(){
                $(this).removeClass("active");
            })
    
            $(this).addClass("active");
    
            //  Save data in local storage and run inject file
            chrome.storage.local.set({
                text_align: text_align,elem_id:el_id,funtion_to_run:"text_align"
            }, function () {
                chrome.tabs.executeScript({
                    file: "inject.js"
                });
            });
    
        }
    
    })




});



async function GoogleFonts() {
	let response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBG3YhQPBcWsZ7TwxJFs2i1G5HbBXNhRU4");

	if (response.ok) {
	  let json = await response.json();

        
      
      let options = "<option value='0' selected>Select font-family</option>";
	  json['items'].forEach(function(items, i, arr) {

        
        let font_Family = items['family'];
        

        if(font_Family=="shipporiminchob1")
        {
            return;

        }


            // var select_option = new Option();
			var font = new FontFace(items['family'], `url(${items['files']['regular']})`);
			document.fonts.add(font);

            
            
            if(font_Family!="")
            {
                options="<optgroup style='font-family:"+font_Family+"'><option value='"+font_Family+"'>"+font_Family+"<option></optgroup>";
                $("#font_family").append(options);    
            }


        
	  });

      
      
      $('select option').filter(function() 
        {
             return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
        }).remove();

	  
	}
}




function check_el_id()
{
    if($("#el_id").val()=="")
    {

        $("#error").text("Please enter element id.");

        $("#error").removeClass("d-none");
        $("#error").addClass("d-block");

        setTimeout(() => {
            shake_label();
        }, 100);

        $("#el_id").focus();
        return false;
    }

    

    $("#error").addClass("d-none");
    $("#error").removeClass("d-block");
    return true;
}

function shake_label()
{
    $("#error").attr("style","transform: translate(20px);");

    setTimeout(() => {    
     $("#error").attr("style","");
    }, 100);

    $("#error").attr("style","transform: translate(20px);");

    setTimeout(() => {
        $("#error").attr("style","");
    }, 100);
}


function elemet_exits()
{
    var id=$("#el_id").val();

    if(id!="")
    {
        chrome.tabs.executeScript({
            code: 'document.getElementById("'+id+'").innerHTML'
          }, function(results) {
            
            if(results[0]==null)
            {

                $("#error").html("Elemnt with id <strong style='font-size:15px;color:red'>"+id+"</strong> doesn't exist on this page.");

                
                $("#error").removeClass("d-none");
                $("#error").addClass("d-block");

                setTimeout(() => {
                    shake_label();
                }, 100);

                $("#el_id").focus();
                return false;
            }
            
          });
    }  

    return true;

}