@channels.each do |channel|
  json.set! channel.name do
    json.extract! channel, :id, :name, :purpose, :topic
    json.creatorName channel.creator.username
    json.members channel.members.map { |member| member.username }
  end
end
