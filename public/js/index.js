$(document).on("click", "#scrapeButton", function(event){
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data){
        console.log("We have scraped articles");
    })
})

$(document).on("click", ".saveButton", function(event){
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/save/" + thisId
    }).then(function(data){
        console.log("Saved this Article");
    })
})

$(document).on("click", ".commentButton", function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/comment/" + this.id
    }).then(function(data){
        console.log("Commented on this Article");
    })
})

$(document).on("click", ".removeButton", function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/remove/" + thisId
    }).then(function(data){
        console.log("Removed this Article");
    })
})