function replaceEmoticons(text) {
	var emoticons ={
        ":)" : "icon_01.png",

        ":-)" : "icon_01.png",

        ":D" : "icon_02.png",

        ":-D" : "icon_02.png",

        ":d" : "icon_02.png",

        ":-d" : "icon_02.png",

        ";)" : "icon_03.gif",

        ";-)" : "icon_03.gif",

        ":-O" : "icon_04.png",

        ":O" : "icon_04.png",

        ":o" : "icon_04.png",

        ":-o" : "icon_04.png",

        ":p" : "icon_05.png",

        ":-p" : "icon_05.png",

        ":P" : "icon_05.png",

        ":-P" : "icon_05.png",

        "(H)" : "icon_06.png",

        "(h)" : "icon_06.png",

        ":@" : "icon_07.png",

        ":-@" : "icon_07.png",

        ":-s" : "icon_08.png",

        ":-S" : "icon_08.png",

        ":s" : "icon_08.png",

        ":S" : "icon_08.png",

        ":$" : "icon_09.png",

        ":-$" : "icon_09.png",

        ":(" : "icon_10.png",

        ":-(" : "icon_10.png",

        ":&#039;(" : "icon_11.gif",

        ":|" : "icon_12.png",

        ":-|" : "icon_12.png",

        "(A)" : "icon_13.png",

        "(a)" : "icon_13.png",

        "<:o)" : "icon_17.gif",

        "<o)" : "icon_17.gif",

        "|-)" : "icon_18.gif",

        "*-)" : "icon_19.gif",

        ":-#" : "icon_20.png",

        ":-*" : "icon_21.png",

        "^o)" : "icon_22.png",

        "8o|" : "icon_14.png",

        "8-|" : "icon_15.png",

        "+o(" : "icon_16.png",

        "8-)" : "icon_23.gif",

        "8o)" : "icon_23.gif",

        "(L)" : "icon_24.png",

        "(l)" : "icon_24.png",

        "(U)" : "icon_25.png",

        "(u)" : "icon_25.png",

        "(M)" : "icon_26.png",

        "(m)" : "icon_26.png",

        "(@)" : "icon_27.png",

        "(&)" : "icon_28.png",

        "(sn)" : "icon_29.png",

        "(SN)" : "icon_29.png",

        "(bah)" : "icon_30.png",

        "(BAH)" : "icon_30.png",

        "(S)" : "icon_31.png",

        "(s)" : "icon_31.png",

        "(*)" : "icon_32.png",

        "(#)" : "icon_33.png",

        "(R)" : "icon_34.png",

        "(r)" : "icon_34.png",

        "({)" : "icon_35.png",

        "(})" : "icon_36.png",

        "(K)" : "icon_37.png",

        "(k)" : "icon_37.png",

        "(F)" : "icon_38.png",

        "(f)" : "icon_38.png",

        "(W)" : "icon_39.gif",

        "(w)" : "icon_39.gif",

        "(O)" : "icon_40.gif",

        "(o)" : "icon_40.gif",

        ":-[" : "bat.gif",

        ":[" : "bat.gif",

        "(^)" : "cake.gif",

        "(~)" : "film.png",

        "(6)" : "devil_smile.png",

        "(8)" : "note.png",

        "(B)" : "beer_mug.png",

        "(b)" : "beer_mug.png",

        "(C)" : "coffee.png",

        "(c)" : "coffee.png",

        "(D)" : "martini.png",

        "(d)" : "martini.png",

        "(E)" : "envelope.png",

        "(e)" : "envelope.png",

        "(G)" : "present.png",

        "(g)" : "present.png",

        "(I)" : "lightbulb.png",

        "(i)" : "lightbulb.png",

        "(N)" : "thumbs_down.png",

        "(n)" : "thumbs_down.png",

        "(P)" : "camera.png",

        "(p)" : "camera.png",

        "(T)" : "phone.png",

        "(t)" : "phone.png",

        "(X)" : "girl.png",

        "(x)" : "girl.png",

        "(Y)" : "thumbs_up.png",

        "(y)" : "thumbs_up.png",

        "(Z)" : "guy.png",

        "(z)" : "guy.png",

        "(pl)" : "55_55.png",

        "(||)" : "56_56.png",

        "(pi)" : "57_57.png",

        "(so)" : "58_58.png",

        "(au)" : "59_59.png",

        "(ap)" : "60_60.png",

        "(AP)" : "60_60.png",

        "(um)" : "61_61.png",

        "(UM)" : "61_61.png",

        "(ip)" : "62_62.png",

        "(IP)" : "62_62.png",

        "(co)" : "63_63.png",

        "(CO)" : "63_63.png",

        "(mp)" : "64_64.png",

        "(MP)" : "64_64.png",

        "(st)" : "66_66.png",

        "(ST)" : "66_66.png",

        "(mo)" : "69_69.png",

        "(MO)" : "69_69.png",

        "(li)" : "73_73.gif",

        "(LI)" : "73_73.gif",

        ";-\\" : "icon_41.png",

        ";@" : "icon_42.gif",

        ":8)" : "icon_43.png",

        ":^)" : "icon_44.gif",

        ":-\\" : "icon_45.png",

        ":&#039;|" : "icon_46.gif",

        ":]" : "icon_47.gif",

        ":}" : "icon_48.png",

        "('" : "icon_49.png",

        "*|" : "icon_50.gif",

        "*\\" : "icon_51.png",

        "(BOO)" : "icon_52.png",

        "(boo)" : "icon_52.png",

        "(brb)" : "icon_53.gif",

        "(bus)" : "icon_54.png",

        "(ff)" : "icon_55.gif",

        "(fm)" : "icon_56.gif",

        "(h5)" : "icon_57.gif",

        "(J)" : "icon_58.png",

        "(j)" : "icon_58.png",

        "(jk)" : "icon_59.png",

        "(lol)" : "icon_60.gif",

        "(nnh)" : "icon_61.png",

        "*p*" : "icon_62.png",

        "(pu)" : "icon_63.png",

        "(rotfl)" : "icon_64.gif",

        "*s*" : "icon_65.png",

        "(tu)" : "icon_66.png",

        "(V)" : "icon_67.png",

        "(v)" : "icon_67.png",

        "(wm)" : "icon_68.png",

        "(wo)" : "icon_69.png",

        "(xo)" : "icon_70.gif",

        "(xx)" : "icon_71.png",

        "(yn)" : "icon_72.png"
    }, url = "http://akcontent.ebuddy.com/web/va2.11.11/gfx/emoticons/msn/", patterns = [],
     metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;


  for (var i in emoticons) {
    if (emoticons.hasOwnProperty(i)){ // escape metacharacters
      patterns.push('('+i.replace(metachars, "\\$&")+')');
    }
  }

  // build the regular expression and replace
  return text.replace(new RegExp(patterns.join('|'),'g'), function (match) {
    return typeof emoticons[match] != 'undefined' ?
           '<img src="'+url+emoticons[match]+'"/>' :
           match;
  });
}
