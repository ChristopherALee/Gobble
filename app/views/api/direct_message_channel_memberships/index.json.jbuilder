@direct_message_channel_memberships.each do |membership|
  json.set! membership.id do
    json.memberName membership.member.username
    json.directMessageId membership.direct_message_channel.id
  end
end
