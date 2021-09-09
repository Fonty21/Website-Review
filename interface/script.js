$(document).ready(function(){


    var data;


    $.ajax({

        url:"Game Review.csv", dataType:"text", async: false,

        success: function(result){

            var JSONfile = csvJSON(result);
            data = JSON.parse(JSONfile);

        }   
    })

    console.log(data);

    function csvJSON(csv){

        var lines=csv.split("\n");
  
        var result = [];
  
        var headers=lines[0].split(",");
  
        for(var i=1;i<lines.length;i++){
  
            var obj = {};
            var currentline=lines[i].split(",");
  
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
  
            result.push(obj);
  
        } 
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }

    $('#searchGame').on('click',function(){
        search();
    })
    $('#submit').on('click',function(){
        submit();
    })
    $('#reset').on('click',function(){
        reset();
    })


    function search(){

        checkGame = $('#searchBar').val();
    
        //console.log(checkGame);
    
        for(var i=0;i<data.length;i++){
            if(data[i]["Name"] == checkGame){ // data[i]["Name"] == 
    
                console.log(data[i]);
    
            }    
    
        }
    
        /*$("#searchBar").val("Game Review.csv") == true
            $(".GameReview").append("<div></div>").children().last()*/
    }
    
    function reset(){
        $("#searchBar").val("").attr("placeholder", "Search Game");
        $("#placeholderFirst").val("").attr("placeholder", "First Name");
        $("#placeholderLast").val("").attr("placeholder", "Last Name");
        $("#DropDown").val("").attr("selected", "Star Rating");
        $("#reviewBox").val("").attr("placeholder", "Enter Review");
    }
    
    function submit(){
        $("#submit")
    }


});