var app = angular.module("ClientApp", []);


app.controller("Register_Client", function($scope,$window, $http) {
  var client = localStorage.getItem("client");
  console.log(client);
  $scope.regClient= function(regData){
    $http.post('/client/signup',regData).then(function successCallback(response){

      if(response.data.success== false){
        alert("Email or username already taken");
      }

      else{
        $window.location.href = "/login_client"
      }

      console.log(response.data.success);

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);

  })

  }
})


app.controller("Login_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/login',regData).then(function successCallback(response){

    if(response.data.success== false){
      alert("incorrect username or password");
    }
  else{
        var client=response.data.user;
        var online=1;
        localStorage.setItem("client", JSON.stringify(client));
        localStorage.setItem("online", JSON.stringify(online));


        $window.location.href = "/"}
    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})




app.controller("forget_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClient= function(regData){
    $http.post('/client/recover',regData).then(function successCallback(response){


      console.log(response.data.success);
      $window.location.href = '/change_password';

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})


app.controller("logout_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.regClientlogout= function(){
    $http.post('/client/logout').then(function successCallback(response){

var online=0;

localStorage.setItem("online", JSON.stringify(online));
$window.location.reload();


    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})




app.controller("verify_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.verifyClient= function(regData){
    $http.post('/client/reset',regData).then(function successCallback(response){


      console.log(response.data.success);
      if(response.data.success==true){
        alert("Password has been changed Successfully");
        $window.location.href = '/';
      }


    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})





app.controller("login_facebook", function($scope,$window, $http) {
  console.log("hi");
  $scope.login_facebook= function(){

    $http.post('/client/login/facebook').then(function successCallback(response){


      console.log(response.data.success);
    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})



app.controller("profile_client", function($scope,$window, $http) {
  var client = JSON.parse(localStorage.getItem("client"));
  var online1 = JSON.parse(localStorage.getItem("online"));
  console.log(client);
  console.log(online1);
  $scope.client = client;
 console.log(client.email);

})



app.controller("main", function($scope,$window, $http) {
  var online = JSON.parse(localStorage.getItem("online"));
  $scope.online=online;
  console.log(online);
})





app.controller("edit_Client", function($scope,$window, $http) {
  console.log("hi");
  $scope.editClient= function(regData){
    $http.post('/client/edit',regData).then(function successCallback(response){

    var client=response.data.user;
    localStorage.setItem("client", JSON.stringify(client));

      console.log(response.data.success);
      $window.location.reload();

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})




app.controller("getcorporates", function($scope,$window, $http) {

  $http.post('/client/corporates').then(function successCallback(response){

    $scope.corporates = response.data.corp;

  }, function errorCallback(response) {//needs handling
    console.log(response.data.success);
})


})



app.controller("getcorporate", function($scope,$window, $http) {
  $scope.service;
  $scope.getcorporate= function(regData){
    $http({
      method: 'POST',
      url: '/client/corporate',
      data: "_id=" + regData._id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function successCallback(response){

    var corporate=response.data.corporate;
    console.log(corporate);
    localStorage.setItem("corporate_any", JSON.stringify(corporate));


        $window.location.href = "/profile_corporate_any";


    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})


app.controller("corporateprofile", function($scope,$window, $http) {
  var corporate = JSON.parse(localStorage.getItem("corporate_any"));
  console.log(corporate);
  $scope.corporatet = corporate;
})






app.controller("getservices", function($scope,$window, $http) {

  $http.post('/client/services').then(function successCallback(response){

    $scope.services = response.data.Entertainments;

  }, function errorCallback(response) {//needs handling
    console.log(response.data.success);
})


})





app.controller("getservice", function($scope,$window, $http) {
  $scope.service;
  $scope.getservice= function(regData){
    $http({
      method: 'POST',
      url: '/client/service',
      data: "id=" + regData._id,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(function successCallback(response){

    var service=response.data.Entertainments;
    console.log(service);
    localStorage.setItem("service_any", JSON.stringify(service));

    var online = JSON.parse(localStorage.getItem("online"));

    if(online==1){
      $window.location.href = "/entertainement_service_client";
    }
    else{
      $window.location.href = "/entertainement_service_visitor";
    }


    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})


app.controller("serviceprofile", function($scope,$window, $http) {
  var service = JSON.parse(localStorage.getItem("service_any"));
  console.log(service);
  $scope.service = service;
})


app.controller("add_rating", function($scope,$window, $http) {
  $scope.addrating= function(regData){
    var service = JSON.parse(localStorage.getItem("service_any"));
    regData.id=service._id;
    console.log(service._id);
    $http.post('/client/service/rate', regData).then(function successCallback(response){


      localStorage.setItem("service_any", JSON.stringify(response.data.Entertainments));
      console.log(response.data.success);
      $window.location.reload();

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})



app.controller("add_review", function($scope,$window, $http) {
  $scope.addreview= function(regData){
    var service = JSON.parse(localStorage.getItem("service_any"));
    regData.entertainment=service._id;
    console.log(service._id);
    $http.post('/client/review', regData).then(function successCallback(response){
      console.log(response.data.success);

      localStorage.setItem("service_any", JSON.stringify(response.data.service));




      $window.location.reload();

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})



app.controller('searchCtrl', function($http,$scope,$window){

  $scope.items;

  $scope.search= function(searchData){
    $http.post('/search',searchData).then(function successCallback(response){
      console.log(searchData);
      console.log(response.data.fail);

  if(response.data.fail==null){
    localStorage.setItem("searched", JSON.stringify(response.data.items));
    console.log(searchData);
    console.log(response.data.fail);
    $window.location.href="/services_search";
  }
  else{
    if(response.data.fail ==0){
      alert("Please specify a criteria");
    }
    else{
      alert("Please Fill the empty blanks");
    }
  }




    }, function errorCallback(response){
    console.log(response.data.success);
    })
  }
});



app.controller('viewSearch', function($http,$scope,$window){
  var items = JSON.parse(localStorage.getItem("searched"));
  $scope.items=items;
});


app.controller("reserve", function($scope,$window, $http) {
  console.log("hi");
  $scope.reserve= function(regData){

    var service_corp = JSON.parse(localStorage.getItem("service_any"));
    var client = JSON.parse(localStorage.getItem("client"));
    regData.reserveId=regData._id;
    regData.Entid = service_corp._id;
    regData.price= service_corp.price;
    regData.name= service_corp.name;
    regData.balance=client.balance;

    $http.post('/book', regData).then(function successCallback(response){

      if(response.data.success==22){
        alert("You don't have enough Money");
      }

    var newBalance=parseFloat(client.balance)-parseFloat(regData.price);
     var service_any = response.data.Entertainments;
     client.balance=newBalance;
     localStorage.setItem("service_any", JSON.stringify(service_any));
     localStorage.setItem("client", JSON.stringify(client));

     $window.location.reload();

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})



app.controller("reservations_client", function($scope,$window, $http) {


  $http.post("/view_reservations").then(function successCallback(response){
      var y = response.data.reservations;
      $scope.reservations = y;
      console.log(y);
    }, function errorCallback(response) {//needs handling



  })


})
