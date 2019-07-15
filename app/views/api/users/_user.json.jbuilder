# json.user do 
    json.extract! user, :username, :email, :verified, :id, :liked_objects

    # user.liked_objects.each do |object|
    #     json.liked_object_ids do 
    #         json.set! object.id do
    #         end
    #     end
    # end
# end