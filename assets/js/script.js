var row_data=[];
var category_keyword=[];
var count_keyword=[];
$(document).ready(function() {  
	//keyup funtion for input field
    $(".keywords-title").keyup(function(){
	  //get input value and pass to setKeywords function
      var title = $(".keywords-title").val();
	  var keywords_list = setKeywords(title);
      $("#keywords-table-data").html(formatKeywords(keywords_list));

	  //hide default div
	  $("default-data").hide();
	  setTimeout(() => {
      	chart();
      }, 1000);

    });
    
});

//function to set the keywords
    function setKeywords(title){
		//set keywords variable to empty and set minimum word length
		var keywords = "";
		var min_lenght = 4;
		var max_lenght = 150;
        var split = title.split(" ");
        for(var i = 0; i < split.length; i++) {
			//remove possible dot
        	var text = split[i].replace(/\./g,'');
			
			//check if word meets criteria
            if(meetsCriteria(text, keywords, min_lenght, max_lenght)){
            	//console.log(keywords);
			  //add to keywords string separated by comma
              keywords += text+",";
            } 
        }      
		//remove possible consecutive commas
		keywords = keywords.replace(/^,|,$|(,)+/g, '$1');
        //remove last appended comma
        keywords = keywords.replace(/,\s*$/, "");
        return keywords;
    }
	
	
	//function to check if text meets criteria
	function meetsCriteria(text, current_keywords, min_lenght, max_lenght){
		//words to exclude
		//console.log(current_keywords.indexOf(text));
        var exclude_array = ['a','about','all','also','and','as','at','be','because','but','by','can','come','could','day','do','even','find','first','for','from','get','give','go','have','he','her','here','him','his','how','I','if','in','into','it','its','just','know','like','look','make','man','many','me','more','my','new','no','not','now','of','on','one','only','or','other','our','out','people','say','see','she','so','some','take','tell','than','that','the','their','them','then','there','these','they','thing','think','this','those','time','to','two','up','use','very','want','way','we','well','what','when','which','who','will','with','would','year','you','your','has','was','why'];
		//check if word meets lenght, not number, not a duplicate, and not in exclude array
		if(text.length >= min_lenght && text.length <= max_lenght && !$.isNumeric(text) && (current_keywords.indexOf(text) < 0) && (jQuery.inArray(text.toLowerCase(), exclude_array) < 0)) {
		  //console.log(current_keywords);
		  return true;
		} 
		return false;
	}
	
	//format keywords csv string to table data
	function formatKeywords(keywords){
		var str_array = keywords.split(',');
		var return_data = "";
		var loop_count = 1;
		var title = $(".keywords-title").val();
		var w = title.split(/\s/);
		for(var i = 0; i < str_array.length; i++) {
			var c=1;
		   // trim the excess whitespace.
		   str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
		   // format as table data with copy
		   for (var j=0,len=w.length;j<len;j++){
		        if (w[j] === str_array[i]){
		            c++;
		        }
	    	}
	    	category_keyword[i]=str_array[i];
	    	count_keyword[i]=c;
	        row_data[i]={"sr_no":loop_count, "keyword":str_array[i], "count":c};
		   //return_data += "<tr><td>"+loop_count+"</td><td id='keyword-"+loop_count+"' value='"+str_array[i]+"'>"+str_array[i]+"</td><td>"+c+"</td></tr>";
		   loop_count++;
		}
		console.log(row_data);
		//return return_data;
	}


	function chart(){
		console.log(count_keyword);
		Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: {
        categories: category_keyword,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'no of repeat Keywords in text',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Keyword Count',
        data: count_keyword
    }]
});
	}