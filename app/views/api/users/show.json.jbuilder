json.extract! @user, :id, :username
json.isOnline @user.is_online
json.lastVisitedChannel @user.last_visited_channel
json.subscribedChannels @user.channels.map { |channel| channel.name }
json.memberships @user.memberships.map{ |membership| {membershipId: membership.id, channelId: membership.channel_id}}
json.directMessageChannels @user.direct_message_channels.map { |channel| channel.id }
json.directMessageMemberships @user.direct_message_channel_memberships.map { |membership| {membershipId: membership.id, channelId: membership.direct_message_channel.id}}
