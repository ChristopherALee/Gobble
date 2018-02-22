json.extract! @user, :id, :username
json.lastVisitedChannel @user.last_visited_channel
json.subscribedChannels @user.channels.map { |channel| channel.name }
json.memberships @user.memberships.map{ |membership| {membershipId: membership.id, channelId: membership.channel_id}}
