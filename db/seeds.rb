# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

user1 = User.create!({username: 'demo', email: 'demouser@demosite.com', password: 'password' })
user2 = User.create!({username: 'testaccount', email: 'test@tester.com', password: 'password' })
user3 = User.create!({username: 'The Content Creator', email: 'content', password: 'password' })

video1 = Video.create({title: 'every time I ask my PM for help', description: 'this happens a lot', author_id: 1})
vidfile1 = open('https://voustube-seed.s3.amazonaws.com/im_not_sure_where_to_start.mp4')
imgfile1 = open('https://voustube-seed.s3.amazonaws.com/inception.png')
video1.video.attach(io: vidfile1, filename:'im_not_sure_where_to_start.mp4')
video1.thumbnails.attach(io: imgfile1, filename:'inception.png')

video2 = Video.create({title: 'This Is America but it\'s Amerika by Rammstein', description: 'this is America, Amerika ist wunderbar', author_id: 3})
vidfile2 = open('https://voustube-seed.s3.amazonaws.com/This_Is_Amerika.mp4')
imgfile2 = open('https://voustube-seed.s3.amazonaws.com/america_screenshot.png')
video2.video.attach(io: vidfile2, filename:'This_Is_Amerika.mp4')
video2.thumbnails.attach(io: imgfile2, filename:'america_screenshot.png')

video3 = Video.create({title: 'this one has no thumbnail', description: 'you can do this!', author_id: 2})
vidfile3 = open('https://voustube-seed.s3.amazonaws.com/what_make_of_man.mp4')
# imgfile3 = open('https://voustube-seed.s3.amazonaws.com/inception.png')
video3.video.attach(io: vidfile3, filename:'what_make_of_man.mp4')
# video3.thumbnails.attach(io: imgfile3, filename:'inception.png')

video4 = Video.create({title: 'hey remember Ned\'s Declassified School Survival Guide', description: 'cause I sure do', author_id: 3})
vidfile4 = open('https://voustube-seed.s3.amazonaws.com/coconut_head_sad.mp4')
imgfile4 = open('https://voustube-seed.s3.amazonaws.com/neds_declassified.png')
video4.video.attach(io: vidfile4, filename:'coconut_head_sad.mp4')
video4.thumbnails.attach(io: imgfile4, filename:'neds_declassified.png')

video5 = Video.create({title: 'one more without a thumbnail and also with a really long name so yall can see how this app handles text overflows which I will admit is not a perfect solution but it is good enough for now', description: 'descriptions are another shortcoming', author_id: 1})
vidfile5 = open('https://voustube-seed.s3.amazonaws.com/next_ones_coming_faster.mp4')
# imgfile5 = open('https://voustube-seed.s3.amazonaws.com/inception.png')
video5.video.attach(io: vidfile5, filename:'next_ones_coming_faster.mp4')
# video5.thumbnails.attach(io: imgfile1, filename:'inception.png')

video6 = Video.create({title: 'W H A T U P P P P', description: 'Jeremy Davies (born Jeremy Boring; October 8, 1969) is an American film and television actor.', author_id: 3})
vidfile6 = open('https://voustube-seed.s3.amazonaws.com/WHAT_UP_PIMPS.mp4')
imgfile6 = open('https://voustube-seed.s3.amazonaws.com/lojackscreen.jpg')
video6.video.attach(io: vidfile6, filename:'WHAT_UP_PIMPS.mp4')
video6.thumbnails.attach(io: imgfile6, filename:'lojackscreen.jpg')

