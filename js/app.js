$(document).ready(function () {
    var form = $("#addBook");
    var bookList = $("#bookList");
    var data;
    var type;
    var url;

    refreshBookList();

    form.on("submit", function (event) {
        url = "http://localhost:8080/books/";
        type = "POST";
        data = JSON.stringify(objectifyForm($(this).serializeArray()));
        event.preventDefault();
        contactServer(url,type, data, refreshBookListWithAlert);
    });

    function objectifyForm(formArray) {
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]["name"]] = formArray[i]["value"];
        }
        return returnArray;
    }

    function contactServer(url, type, data, action) {
        $.ajax({
            url: url,
            headers: {"Content-Type":"application/json"},
            data: data,
            type: type,
            dataType: "JSON"
        }).done(function (result) {
            action(result);
        }).fail(function (xhr, status, err) {
            alert("Wystąpił błąd!");
            console.log("Error:" + err);
            console.log("Status: " + status);
            console.dir(xhr);
        })
    }

    function refreshBookListWithAlert() {
        $("#successAlert").fadeTo(2000, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
        url = "http://localhost:8080/books/";
        type = "GET";
        data = "";
        contactServer(url, type, data, showBookList);
    }

    function refreshBookList() {
        url = "http://localhost:8080/books/";
        type = "GET";
        data = "";
        contactServer(url, type, data, showBookList);
    }
    function showBookList(result) {
        bookList.empty();
        var heading = $("<h3 class='pt-3'>Lista książek</h3>");
        bookList.append(heading);
        for (var i = 0; i < result.length; i++) {
            var book = result[i];
            var newRow = $("<div class='row mx-2'>");
            var newTitle = $("<div class='col-md-9 title p-3 m-2 bg-light text-black font-weight-bold mx-auto' style='width: 85%'>");
            var newDiv = $("<div class='details font-weight-normal'>");
            var deleteDiv = $("<div class='col-md align-self-center'>");
            var deleteButton = $("<button type='submit' class='btn btn-primary btn-block mt-2' data-toggle='modal' data-target='#deleteModal'>Usuń</button>");

            newTitle.text(book.title);
            newTitle.data("id", book.id);
            newTitle.attr("id", book.id);
            deleteButton.data("id", book.id);
            bookList.append(newRow);
            newRow.append(newTitle);
            newTitle.append(newDiv);
            newRow.append(deleteDiv);
            deleteDiv.append(deleteButton);
            // $(".title, .bookList button").css("display", "inline-block");
            newTitle.one("click", function () {
                var bookId = $(this).data("id");
                url = "http://localhost:8080/books/" + bookId;
                type = "GET";
                data = "";
                contactServer(url, type, data, showBookDetails);
            })
        }
    }

    bookList.on("click", ".title", function () {
        $(this).find(".details").slideToggle();
    });

    function showBookDetails(result) {
        var selector = "#"+result.id;
        var currentTitle = $(selector);
        var details = $(currentTitle).find(".details");
        details.html("Autor: " + result.author + "<br>ISBN: " + result.isbn + "<br>Wydawca: " +
            result.publisher + "<br>Typ: " + result.type);
        details.slideDown();
    }

    $("#deleteModal").on("show.bs.modal", function (event) {
        var deleteId = $(event.relatedTarget).data("id");
        $("#confirmDelete").data("deleteId", deleteId);
        $("#confirmDelete").one("click", function (event) {
            event.stopImmediatePropagation();
            deleteId = $(this).data("deleteId");
            url = "http://localhost:8080/books/" + deleteId;
            type = "DELETE";
            data = "";
            contactServer(url, type, data, refreshBookList);
            $("#deleteModal").modal("hide");
        });
    });

});