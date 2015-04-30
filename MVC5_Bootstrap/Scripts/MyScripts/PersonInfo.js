/// <reference path="../jquery-2.1.3.min.js" />
/// <reference path="../knockout-3.2.0.js" />


(function () {
    var viewModel = function () {
        var self = this;

        var IsUpdatable = false;

        self.PersonId = ko.observable(0);
        self.FirstName = ko.observable("");
        self.MiddleName = ko.observable("");
        self.LastName = ko.observable("");
        self.Address = ko.observable("");
        self.City = ko.observable("");
        self.State = ko.observable("");
        self.PhoneNo = ko.observable("");
        self.MobileNo = ko.observable("");
        self.EmailAddress = ko.observable("");
        self.Occupation = ko.observable("");


        var PersonInfo = {
            PersonId: self.PersonId,
            FirstName: self.FirstName,
            MiddleName: self.MiddleName,
            LastName: self.LastName,
            Address: self.Address,
            City: self.City,
            State: self.State,
            PhoneNo: self.PhoneNo,
            MobileNo: self.MobileNo,
            EmailAddress: self.EmailAddress,
            Occupation: self.Occupation
        };

        self.Persons = ko.observable([]);

        self.Message = ko.observable("");

        self.Occupations =ko.observableArray(["Employeed","Self-Employeed","Doctor","Teacher","Other"]);
        self.SelectedOccupation = ko.observable();
      
        self.SelectedOccupation.subscribe(function (text) {
            self.Occupation(text);
        });


        self.States = ko.observableArray(["Jammu and Kashmir", "Delhi", "Himachal Pradesh",
        "Uttarakhand", "Punjab", "Hariyana", "Uttar Pradesh", "Rajasthan",
        "Madhya Pradesh", "Odissa", "Assam", "Arunchal Pradesh", "Manipur",
        "Mizoram", "Tripura", "Manupur", "Nagaland", "Jharkhand", "Bihar", "Sikkim",
        "Maharashtra", "Gujarat", "GOA", "Karnatak", "Telangana", "Simandhra",
        "Tamilnadu","Kerla","Andaman and Nikobar"]);

        self.SelectedState = ko.observable();
      
        self.SelectedState.subscribe(function (text) {
            self.State(text);
        });




        loadInformation();

        function loadInformation() {
         
            $.ajax({
                url: "/api/PersonAPI",
                type:"GET"
            }).done(function (resp) {
                self.Persons(resp);
            }).error(function (err) {
                self.Message("Error! " + err.status);
            });
        }

        self.getSelected = function (per) {
            self.PersonId(per.PersonId);
            self.FirstName(per.FirstName);
            self.MiddleName(per.MiddleName);
            self.LastName(per.LastName);
            self.Address(per.Address);
            self.City(per.City);
            self.State(per.State);
            self.PhoneNo(per.PhoneNo);
            self.MobileNo(per.MobileNo);
            self.EmailAddress(per.EmailAddress);
            self.Occupation(per.Occupation);
            IsUpdatable = true;
            $("#modalbox").modal("show");
        }

        self.save = function () {
            if (!IsUpdatable) {

                $.ajax({
                    url: "/api/PersonAPI",
                    type: "POST",
                    data: PersonInfo,
                    datatype: "json",
                    contenttype: "application/json;utf-8"
                }).done(function (resp) {
                    self.PersonId(resp.PersonId);
                    $("#modalbox").modal("hide");
                    loadInformation();
                }).error(function (err) {
                    self.Message("Error! " + err.status);
                });
            } else {
                $.ajax({
                    url: "/api/PersonAPI/"+self.PersonId(),
                    type: "PUT",
                    data: PersonInfo,
                    datatype: "json",
                    contenttype: "application/json;utf-8"
                }).done(function (resp) {
                    $("#modalbox").modal("hide");
                    loadInformation();
                    IsUpdatable = false;
                }).error(function (err) {
                    self.Message("Error! " + err.status);
                    IsUpdatable = false;
                });

            }
        }

        self.delete = function (per) {
            $.ajax({
                url: "/api/PersonAPI/" + per.PersonId,
                type: "DELETE",
            }).done(function (resp) {
                loadInformation();
            }).error(function (err) {
                self.Message("Error! " + err.status);
            });
        }

    };
    ko.applyBindings(new viewModel());
})();