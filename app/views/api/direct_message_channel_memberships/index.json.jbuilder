@direct_message_channel_memberships.each do |membership|
  json.set! membership.id do
    json.memberName membership.member.username
    json.channelId membership.direct_message_channel.id
  end
end
