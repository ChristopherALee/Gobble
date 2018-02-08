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
user2 = User.create({username: 'chris', password: 'password123'})
user3 = User.create({username: 'lily', password: 'password123'})

# channels
channel1 = Channel.create({name: 'bread', creator_id: user1.id, purpose: 'we like bread', topic: 'bread on the 5th floor!'})
channel2 = Channel.create({name: 'hangouts', creator_id: user2.id, purpose: 'find random places to perch', topic: '8th street park! now!!'})
channel3 = Channel.create({name: 'windows', creator_id: user3.id, purpose: 'how do they work?', topic: 'stop crashing into windows'})

# memberships
membership1 = Membership.create({member_id: user1.id, channel_id: channel1.id})
membership2 = Membership.create({member_id: user2.id, channel_id: channel1.id})
membership3 = Membership.create({member_id: user3.id, channel_id: channel1.id})
membership4 = Membership.create({member_id: user1.id, channel_id: channel2.id})
membership5 = Membership.create({member_id: user2.id, channel_id: channel2.id})
membership6 = Membership.create({member_id: user3.id, channel_id: channel2.id})
membership7 = Membership.create({member_id: user1.id, channel_id: channel3.id})
membership8 = Membership.create({member_id: user2.id, channel_id: channel3.id})
membership9 = Membership.create({member_id: user3.id, channel_id: channel3.id})
