$(document).ready(function(){


    var data;

    var reviewData;


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

    const firebaseConfig = {
        apiKey: "AIzaSyD95ZBPlQLvYtzasiTAwDtfdhOnhGtk2YY",
        authDomain: "gamepedia-8dc95.firebaseapp.com",
        databaseURL: "https://gamepedia-8dc95-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "gamepedia-8dc95",
        storageBucket: "gamepedia-8dc95.appspot.com",
        messagingSenderId: "697468970696",
        appId: "1:697468970696:web:6347b040b60efd1c9927fd"
      };
      
      // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
      
        var database = firebase.database();
    
        function readAllData(){
            var getUserId = firebase.database().ref();
    
            getUserId.on('value', (snapshot) => {
                reviewData = snapshot.val();
    
                console.log(reviewData);
        
            })
        }
        
        delayfunction()
        function delayfunction(){
            readAllData();
            setTimeout(function(){
                 console.log
            },6000);
        };

    //console.log(reviewData);

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

                //console.log(data[i]['Image\r']);

                $(".ImageBox").html("").append('<img src='+data[i]['Image\r']+'></img>').children().attr("src", data[i]["Image"]).css({
                    width: "100%", height: "600px"});                
                $(".Name").html("Name:" + " " + data[i]["Name"]);
                $(".Year").html("Year:" + " " + data[i]["Year"]);
                $(".Console").html("Consoles:" + " " + (data[i]["Consoles"]).replaceAll("|", ","));
                $(".Genres").html("Genre:" + " " + (data[i]["Genre"]).replaceAll("|", ","));
                $(".Modes").html("Modes:" + " " + (data[i]["Modes"]).replaceAll("|", ","));
                $(".Rating").html("Rating:" + " " + data[i]["Rating\r"]);
                $(".InformationReview").html("Description:" + " " + data[i]["Description"]);
                $(".reviewContainer").html("");
            
            for(var j=0;j<reviewData.length;j++){
                    if (reviewData[j]["game"].toLowerCase() == checkGame.toLowerCase()){

                            //if there is any reviews from firebase, display
                            $(".reviewContainer").append("<div></div>").children().last().html("First Name:" + " " + reviewData[j]["firstName"]);
                            $(".reviewContainer").append("<div></div>").children().last().html("Last Name:" + " " + reviewData[j]["lastName"]);
                            $(".reviewContainer").append("<div></div>").children().last().html("Star Rating:" + " " + reviewData[j]["StarRating"]);
                            $(".reviewContainer").append("<div></div>").children().last().html("Game:" + " " + reviewData[j]["game"]);
                            $(".reviewContainer").append("<div></div>").children().last().html("Review:" + " " + reviewData[j]["review"]);
                          
                    }
                }
            }   
        }

        
        
    }
    
    function reset(){
        $("#searchBar").val("").attr("placeholder", "Search Game");
        $("#placeholderFirst").val("").attr("placeholder", "Enter First Name");
        $("#placeholderLast").val("").attr("placeholder", "Enter Last Name");
        $("#DropDown").val("").attr("selected", "Star Rating");
        $("#reviewBox").val("").attr("placeholder", "Enter Review");
        $(".ImageBox").html("")
        $(".InformationReview").html("")
        $(".GameReview").children().html("")
        $(".reviewContainer").children().html("")
    }


    function writeSpecificData(path, firstName, lastName, StarRating, game, review){
        firebase.database().ref(path).set({
    
          firstName:firstName,
          lastName:lastName,
          StarRating:StarRating,
          game:game,
          review:review
    
        });
      }
    
    function submit(){
            var game = $("#searchBar").val()
                for(var i=0;i<data.length;i++){
                    if(data[i]["Name"].toLowerCase() == game.toLowerCase()){
                        game = data[i]["Name"]
                    }
                }

            var firstName = $("#placeholderFirst").val()
            firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

            var lastName = $("#placeholderLast").val()
            lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

            var StarRating = $("#DropDown").val()

            var review = $("#reviewBox").val()

            //writeSpecificData("reviewData/0", firstName, lastName, StarRating, game, review);
            
    }

});