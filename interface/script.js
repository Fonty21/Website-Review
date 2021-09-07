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

    function search(){
        $("searchBar")
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


})