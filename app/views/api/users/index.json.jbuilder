@users.each do |user|
  json.set! user.username do
    json.extract! user, :id, :username
    json.subscribedChannels user.channels.map { |channel| channel.name }
    json.lastVisitedChannel user.last_visited_channel
    json.memberships user.memberships.map{ |membership| membership.id}
  end
end
