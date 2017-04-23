var app = angular.module("AdminApp", []);

app.controller("AORCorp", function($scope,$window, $http) { // admin accept or reject corporates

    $scope.accept = function(mail){
      console.log(mail);
      email = mail;

      $http({
        method: 'POST',
        url: '/admin/accept',
        data: "email=" + mail,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("yes");
        $window.location.reload();
      }
    })
    }
    $scope.reject = function(mail){
      console.log(mail);
      email = mail;

      $http({
        method: 'POST',
        url: '/admin/reject',
        data: "email=" + mail,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("yes");
        $window.location.reload();
      }
    })
    }

    $http.post("/admin/requests").then(function successCallback(response){
        var y = response.data.corporations;
        console.log(y);
        $scope.data = y;
      }, function errorCallback(response) {//needs handling

        console.log(response.data.success);


    })


});



app.controller("adminClients", function($scope,$window, $http) {

    $scope.remove = function(id){
      console.log(id);
      criteria = id;

      $http({
        method: 'POST',
        url: '/admin/remove',
        data: "criteria=" + id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("client removed!");
        $window.location.reload();
      }
    })
    }

    $http.post("/admin/clients").then(function(response){
      console.log(response.data.success);
      $scope.data = response.data.clients;
    })

});



app.controller("login_admin", function($scope,$window, $http) {




  $scope.regAdmin= function(regData){
    $http.post('/admin/login',regData).then(function successCallback(response){

      console.log(response.data.success);
      if(response.data.admin){

        $window.location.href="/admin_page";
      }
      else{
        alert("Invaild Admin Credentials");
      }

    }, function errorCallback(response) {//needs handling

      console.log(response.data.success);


  })

  }
})



app.controller("review_admin", function($scope,$window, $http) { // admin accept or reject corporates

    $scope.remove = function(data){
      review = data;

      $http({
        method: 'POST',
        url: '/admin/review/remove',
        data: "reviewID=" + review,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("yes");
        $window.location.reload();
      }
    })
    }

    $http.post("/admin/reviews").then(function successCallback(response){
        var y = response.data.reviews;
        console.log(y);
        $scope.data = y;
      }, function errorCallback(response) {//needs handling

        console.log(response.data.success);


    })


});


app.controller("admin_service", function($scope,$window, $http) { // admin accept or reject corporates

    $scope.remove = function(data){
      id = data;

      $http({
        method: 'POST',
        url: '/admin/service/remove',
        data: "id=" + id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
      console.log(response.statusText);
      if(response.statusText == "OK"){
        console.log("yes");
        $window.location.reload();
      }
    })
    }

    $http.post("/admin/services").then(function successCallback(response){
        var y = response.data.Entertainments;
        console.log(y);
        $scope.data = y;
      }, function errorCallback(response) {//needs handling

        console.log(response.data.success);


    })


});



app.controller("online_check", function($scope,$window, $http) {


  $http.post("/check_online").then(function successCallback(response){
      var y = response.data.online;
      $scope.online = y;
      console.log(y);
    }, function errorCallback(response) {//needs handling



  })


})
