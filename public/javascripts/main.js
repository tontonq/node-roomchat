var aktif=1;
var socket;


function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a target='_blank' style='color:blue;text-decoration:none;' href='$1'>$1</a>"); 
}

function escapeHtml(unsafe) {
  return replaceEmoticons(replaceURLWithHTMLLinks(unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")));
}

function escapenick(unsafe) {
  return replaceURLWithHTMLLinks(unsafe
      .replace(/&/g, "nickimyok"+Math.floor(Math.random() * 1))
      .replace(/</g, "nickimyok"+Math.floor(Math.random() * 1))
      .replace(/>/g, "nickimyok"+Math.floor(Math.random() * 1))
      .replace(/"/g, "nickimyok"+Math.floor(Math.random() * 1))
      .replace(/'/g, "nickimyok"+Math.floor(Math.random() * 1)));
}





function kay()
{
//$('#konusmaPenceresi').animate({scrollTop: 1000000000000}, 100);
document.getElementById("konusmaPenceresi").scrollTop = document.getElementById("konusmaPenceresi").scrollHeight;
//var t = setTimeout(kay, 250);
}

function priv(kim)
{
    $('#mesaj').val(kim+':');
    $('#mesaj').focus();
}


function SocketTarafi(kulIsmi,odam){
    var socket = io.connect(document.location.protocol+'//'+document.domain);
    socket.on("connect", function(){
        socket.emit("addUser", kulIsmi,odam);

    });


    socket.on("sendMessage", function(kullaniciadi,data,renk,ozelmi,yetkilimi){
	bildirim();

        var d = new Date();
        var curr_hour = d.getHours();
        var curr_min = d.getMinutes();
        tamzaman=curr_hour + ":" + curr_min;


        if(ozelmi)
        {
        $('#konusmaPenceresi').append("["+tamzaman+"]<b style='color:red;text-decoration: bold;'>(" + kullaniciadi[0] + ") - (" + kullaniciadi[1] + ")</b> <font color="+renk+">" + escapeHtml(data) + "</font><br/>");
        }
        else
        {
		
		if(yetkilimi) {
		
		
             $('#konusmaPenceresi').append("["+tamzaman+"]<b style='text-decoration: bold;color:#"+renk+"'> ("+kullaniciadi + ")</b> <b><font color="+renk+">" + escapeHtml(data) + "</font></b><br/>");
        
		
		}
		else {
		

		
		 $('#konusmaPenceresi').append("["+tamzaman+"]<b style='color:black;text-decoration: bold;'> ("+kullaniciadi + ")</b> <font color="+renk+">" + escapeHtml(data) + "</font><br/>");
		
		}
		
		
		}
        kay();
    });

        // Uyari Gonderme Fonksiyonu
    socket.on("uyari", function(data){
	alert(data);
    $('#btnBaglan').removeAttr('disabled');
    $("#loading").hide();
    });


    //uzaklastirma
    socket.on("uzaklas", function(data){
    socket.disconnect();
	alert("Go away noob!");
    top.location.href='http://google.com';
    });
	
	socket.on("kopgit", function(data){
    socket.disconnect();
    });

	socket.on("disconnect", function(data){
    top.location.href=top.location.href;
    });

    socket.on("girisyap", function(data){ 
            $('#isimGirisEkrani').fadeOut("fast", function(){
            $('#chatBolumu').fadeIn("fast");
        });
    
    });


    socket.on("kullanicilariYenile", function(data,kackisi){
		
		$("#topkullan").html("Users : "+kackisi);
        $('#kullanicilar').empty();
        
        $.each(data, function(key, value){
        if(value.room==$('#oda').val())
		{
        var eklenecek="<div><a href='#' style='color:black;' title=\""+key+" Send Private Message \" onclick=\"priv('"+key+"')\">▪ "+key+"</a></div>";
        $('#kullanicilar').append(eklenecek);
        }
            

        });
    });

    
    $('#mesajiYolla').click(function() {
        var message = $('#mesaj').val();
		var renk = $('#renk').val();
        $('#mesaj').val('');
        
        socket.emit('sentMessage', message,renk);
        
    });
}

$(function(){

     $('#temizle').click(function() {
        $("#konusmaPenceresi").html('Screen Cleaned...<br>');
       });


    $('#btnBaglan').click(function(){

        var kulIsmi = $('#txtIsim').val();
		var odam = $('#oda').val();

        if(kulIsmi === "") {
            alert('Please enter your name');
        } 

        else if(kulIsmi.length>23) {

            alert('Please enter less nick');

        }

            else {
            SocketTarafi(kulIsmi,odam);
        }

    });

    $('#mesaj').keypress(function(e) {
        if(e.which == 13) {
            $('#mesajiYolla').click();
        }
    });
	
	$('#txtIsim').keypress(function(e) {
        if(e.which == 13) {
            $('#btnBaglan').click();
        }
    });
	


    soundManager.onready(function() {
        soundManager.createSound({
            id: 'mesaj',
            url: '/mesaj.mp3',
            autoLoad: true,
            autoPlay: false,
            onload: function() {
                //$('#soundnotification').removeAttr('disabled');
                //$('#soundnotification').attr('checked', 'checked');
            },
            onerror: function() {
            },
            ontimeout: function() {
            }
        });
    });

		$('#colorSelector').ColorPicker({
			color: '#0000ff',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#colorSelector div').css('backgroundColor', '#' + hex);
				$('#renk').val(hex);
			}
			});
			
});

$(window).focus(function(){
aktif=1;
});
$(window).blur(function(){
aktif=0;
});

function bildirim(etk) {
if($('#baslikbildirim').is(':checked'))
{
       $.titleAlert("<!~ New Message ~!>", {
            requireBlur:true,
            stopOnFocus:true,
            duration:10000,
            interval:500
        });
}
if(!aktif && $('#seslibildirim').is(':checked'))
{
        soundManager.play('mesaj');
}
}