json.extract! @user, :id, :username
json.lastVisitedChannel @user.last_visited_channel
json.subscribedChannels @user.channels.map { |channel| channel.id }
