require 'sinatra/base'
require 'json'
require 'base64'

class Application < Sinatra::Base
  
  configure do
  end

  get '/' do
    erb :index
  end

  post '/ajax-upload' do
    data = params[:data]
    filename = params[:filename]

    ## Decode the image
    data_index = data.index('base64') + 7
    filedata = data.slice(data_index, data.length)
    decoded_image = Base64.decode64(filedata)
    
    ## Write the file to the system
    file = File.new("public/uploads/#{filename}", "w+")
    file.binmode
    file.write(decoded_image)

    "/uploads/#{filename}"
  end

end