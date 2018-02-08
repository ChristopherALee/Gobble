@channels.each do |channel|
  json.set! channel.name do
    json.extract! channel, :id, :name, :creator_id, :members, :purpose, :topic
  end
end
