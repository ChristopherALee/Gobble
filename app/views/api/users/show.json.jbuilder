json.extract! @user, :id, :username
json.subscribedChannels @user.channels.map { |channel| channel.id }
