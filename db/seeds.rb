# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
Membership.destroy_all

# users
user1 = User.create({username: 'guest', password: 'password123'})

# channels
channel1 = Channel.create({name: 'bread', creator_id: user1.id, members: [], purpose: 'we like bread', topic: 'bread on the 5th floor!'})

# memberships
membership1 = Membership.create({member_id: user1.id, channel_id: channel1.id})
