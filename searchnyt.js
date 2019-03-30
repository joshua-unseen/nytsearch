$("#search").click(function (event) {
    event.preventDefault();
    var searchTerm = $("#searchterm").val().trim();  //the term field
    var startYear = $("#startyear").val().trim();   // the start year field
    var endYear = $("#endyear").val().trim();     // the end year field
    var numRecs = parseInt($("#records").val());     // the end year field
    var apiKey = "iespxMkc7izOyMd3e5M9WLeDQfiqcRPR";

    if (searchTerm.length) {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
            + searchTerm
            + "&api-key=" + apiKey;

        if (startYear.length) {
            var getStartYear = "&begin_date=" + startYear + "0101";
            queryURL += getStartYear;
        }
        if (endYear.length) {
            var getEndYear = "&end_date=" + endYear + "1231";
            queryURL += getEndYear;
        }

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (nytStuff) {
            console.log(nytStuff);

            //        nytStuff.docs[i].headline.main
            //        nytStuff.docs[i].source
            //        nytStuff.docs[i].web_url
            var thisList = $("<ol>");
            for (var i = 0; i < numRecs; i++) {
                var thisItem = $("<li>")
                var headline = $("<h4>").text(nytStuff.response.docs[i].headline.main);
                var source = $("<p>").text(nytStuff.response.docs[i].source);
                thisItem.append(headline, source);
                thisItem.appendTo(thisList);
            }
            $("#articles").html(thisList);
        });
    }
});