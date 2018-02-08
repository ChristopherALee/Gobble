@memberships.each do |membership|
  json.set! membership.id do
    json.extract! membership, :id, :member_id, :channel_id
  end
end
