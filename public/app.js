var image = {};

function uploadHandler(path, status, xhr){
  var file_parts = path.split(".")
  var extension = file_parts[file_parts.length - 1]
  if(["jpg", "png", "gif"].indexOf(extension.toLowerCase()) >= 0){
    $("#file-listing").append("<li><img src='" + path + "' /></li>")
  } else {
    $("#file-listing").append("<li><a href='" + path + "' target='_blank'>" + path + "</a></li>")
  }
}

$(function(){

  $("#attachment").change(function(event){
    $.each(event.target.files, function(index, file) {
      var reader = new FileReader();
      reader.onload = function (event) {  
        image.filename = file.name;
        image.data = event.target.result;
      };  
      reader.readAsDataURL(file);
    });
  });

  $("#ajax-attachment-upload-form").submit(function(form){
    $.ajax({url: "/ajax-upload",
            type: 'POST',
            data: {filename: image.filename, data: image.data},
            success: uploadHandler
          });
    form.preventDefault();
  });

});

