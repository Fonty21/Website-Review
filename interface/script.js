$(document).ready(function(){


    var data;


    $.ajax({

        url:"Game Review.csv", dataType:"text", async: false,

        success: function(result){

            var JSONfile = csvJSON(result);
            data = JSON.parse(JSONfile);

        }   
    })

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

    console.log(data);



    $('#searchGame').on('click',function(){
        search();
    })
    $('#submit').on('click',function(){
        submit();
    })
    $('#reset').on('click',function(){
        reset();
    })

    //Enter Button on search bar
    $("#searchBar").keypress(function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            search();
        }
    })

    function search(){

        checkGame = $('#searchBar').val();
    
        //console.log(checkGame);
    
        for(var i=0;i<data.length;i++){
            if(data[i]["Name"].toLowerCase() == checkGame.toLowerCase()){
    
                console.log(data[i]);

                console.log(data[i]['Image\r']);

                $(".ImageBox").html("").append('<img src='+data[i]['Image\r']+'></img>').children().attr("src", data[i]["Image"]);                
                $(".Name").html("Name:" + " " + data[i]["Name"]);
                $(".Year").html("Year:" + " " + data[i]["Year"]);
                $(".Console").html("Consoles:" + " " + (data[i]["Consoles"]).replaceAll("|", ","));
                $(".Genres").html("Genre:" + " " + (data[i]["Genre"]).replaceAll("|", ","));
                $(".Modes").html("Modes:" + " " + (data[i]["Modes"]).replaceAll("|", ","));
                //$(".Rating").html("");
                $(".InformationReview").html("Description:" + " " + data[i]["Description"]);


    
            }    
    
        }
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