@users.each do |user|
  json.set! user.username do
    json.extract! user, :id, :username
  end
end
