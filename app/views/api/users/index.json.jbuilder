@users.each do |user|
  json.set! user.username do
    json.extract! user, :id, :username
    json.isOnline user.is_online
    json.subscribedChannels user.channels.map { |channel| channel.name }
    json.lastVisitedChannel user.last_visited_channel
    json.memberships user.memberships.map{ |membership| membership.id}
    json.directMessageChannels user.direct_message_channels.map { |dm| dm.id }
  end
end
