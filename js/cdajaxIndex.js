$(document).ready(function(){
  var pageNum = 1;
  doAjax("http://uscapasa.com/page/" + pageNum, $('#msg'), $('#featuredBlogPost'));

  function doAjax(url,msg,container){
    // if the URL starts with http
    if(url.match('^http')){
      // assemble the YQL call
      msg.removeClass('error');
      msg.html(' (loading...)');
      $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        function(data){
          if(data.results[0]){
            var data = filterData(data.results[0]);
            data = data.substring(data.indexOf("<!-- #masthead -->"),data.indexOf("<!-- #post -->"));
            console.log(data);
            while(data.indexOf("<a") != -1) {
              var i = data.indexOf("<a");
              var tempStr = "";
              while (data[i]!=">") {
                tempStr += data[i];
                i++;
              }
              tempStr += ">";
              data = data.replace(tempStr, "");
            }
            data = data.replace("</a>", "");
            msg.html('');
            container.
              html(data)
          } else {
            msg.html('');
            msg.addClass('error');
            var errormsg = '<p>Error: could not load the page.</p>';
            container.
              html(errormsg);
          }
        }
      );
    } else {
      $.ajax({
        url: url,
        timeout:5000,
        success: function(data){
          msg.html('');
          container.
            html(data);
        },
        error: function(req,error){
          msg.html('');
          msg.addClass('error');
          if(error === 'error'){error = req.statusText;}
          var errormsg = 'There was a communication error: '+error;
            container.
              html(errormsg);
        },
        beforeSend: function(data){
          msg.removeClass('error');
          msg.html(' (loading...)');
        }
      });
    }
  }

  function filterData(data){
    // filter all the nasties out
    // no body tags
    data = data.replace(/<?\/body[^>]*>/g,'');
    // no linebreaks
    data = data.replace(/[\r|\n]+/g,'');
    // no comments
    data = data.replace(/<--[\S\s]*?-->/g,'');
    // no noscript blocks
    data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
    // no script blocks
    data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
    // no self closing scripts
    data = data.replace(/<script.*\/>/,'');
    // [... add as needed ...]
    return data;
  }
});