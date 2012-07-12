var files = [];

function uploadHandler(path, status, xhr) {
  var file_parts = path.split(".");
  var extension = file_parts[file_parts.length - 1];
  if(["jpg", "png", "gif"].indexOf(extension.toLowerCase()) >= 0) {
    $("#file-listing").append("<li><img src='" + path + "' /></li>");
  } else {
    $("#file-listing").append("<li><a href='" + path + "' target='_blank'>" + path + "</a></li>");
  }
}

$(function(){

  $("#attachment").change(function(event) {
    $.each(event.target.files, function(index, file) {
      var reader = new FileReader();
      reader.onload = function(event) {  
        object = {};
        object.filename = file.name;
        object.data = event.target.result;
        files.push(object);
      };  
      reader.readAsDataURL(file);
    });
  });

  $("#ajax-attachment-upload-form").submit(function(form) {
    $.each(files, function(index, file) {
      $.ajax({url: "/ajax-upload",
            type: 'POST',
            data: {filename: file.filename, data: file.data},
            success: uploadHandler
      });      
    });
    files = [];
    form.preventDefault();
  });

});

