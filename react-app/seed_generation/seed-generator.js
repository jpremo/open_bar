'use strict';
const faker = require("faker");
const fs = require('fs')
const fetch = require('node-fetch');

let users

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomArr = (arr) => {
  return arr[getRandom(0, arr.length - 1)]
}


const getMealImage = async () => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  const data = await res.json()
  if(data) return data.meals[0].strMealThumb
  return "https://www.themealdb.com/images/media/meals/rjhf741585564676.jpg"
}

const getDrinkImage = async () => {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
  const data = await res.json()
  if(data) return data.drinks[0].strDrinkThumb
  return "https://www.thecocktaildb.com/images/media/drink/iuwi6h1504735724.jpg"
}

const makeUsers = async () => {
  const users = []
  for(let i = 0; i<100; i++) {
      const profileImg = await getDrinkImage()
      users.push({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          profileImg
      })
  }
  return users
}

const getImage = async () => {
  const rand = getRandom(1, 10)

  if(rand > 7) {
    return await getMealImage()
  } else {
    return await getDrinkImage()
  }
}

let postNumber = 100;

const generateBar = async (id) => {

  const images = []
  const imNum = getRandom(5, 20)


  for (let i = 0; i < imNum; i++) {
    const photoUrl = await getImage()
    images.push({photoUrl, barId:id})
  }

  const barRelated = ['Hops', 'Bottom Barrel', 'Chonker', 'Craft', 'Fantastic Fermenters', 'Grainy', 'Lauter Tun', 'Family Owned']
  const addressSuffix = ['Ln.', 'St.', 'Ct.', 'Blvd.', 'Rd.']
  const businessArr = ['Bar', 'Tavern', 'Winery', 'Dive Bar', 'Pirate Bar', 'Dance Bar', 'Ale House', 'Brewery', 'Canteen', 'Pub']
  let extraInfo = {
    businessCategory: randomArr(businessArr),
  }
  const bannerImg = await getDrinkImage()
  const businessInfo = {

    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    name: `${randomArr(barRelated)} ${extraInfo.businessCategory}`,
    phoneNumber: faker.phone.phoneNumber(),
    longitude: getRandom(-739638, -739066) / 10000,
    latitude: getRandom(407020, 407592) / 10000,
    street: `${getRandom(100, 10000)} ${randomArr(barRelated)} ${randomArr(addressSuffix)}`,
    state: 'NY',
    zipcode: getRandom(10002, 10007),
    barSeats: getRandom(4, 20),
    dayAndTime: JSON.stringify({
      monday: `${getRandom(12, 16)}-${getRandom(0, 2)}`,
      tuesday: `${getRandom(12, 16)}-${getRandom(0, 2)}`,
      wednesday: `${getRandom(12, 16)}-${getRandom(0, 2)}`,
      thursday: `${getRandom(12, 16)}-${getRandom(0, 2)}`,
      friday: `${getRandom(10, 16)}-${getRandom(0, 4)}`,
      saturday: `${getRandom(10, 16)}-${getRandom(0, 4)}`,
      sunday: `${getRandom(12, 16)}-${getRandom(0, 2)}`,

    }),
    bannerImg: bannerImg,
    ownerId: 2,
  }

  const postNum = getRandom(1, 25)
  const posts = []
  const adjectives = [['Awful', 'Abysmal', 'Terrible'], ['Bad', 'Lacking', 'Not-Fun'], ['Mediocre', 'Average', 'Solid'],
['Great', 'Nice', 'Good'], ['Fantastic', 'Exquisite', 'Divine']]
  const barAdjectives = ["beer", "food", "drinking", "liquor", "vodka", "martinis", "service", "rum", "ale"]
  const barSuffixes = ['here!', 'at this location.', 'joint.', 'spot!', "place"]
  const businessSuffixes = ['Service', 'Spot', 'Place']
  const userNumArr = []
  for (let i = 3; i < 101; i++) {
    userNumArr.push(i)
  }
  for (let i = 0; i < postNum; i++) {
    const userId = userNumArr.splice(getRandom(0, userNumArr.length-1),1)[0]
    const rating = getRandom(1, 5)
    const adj = adjectives[rating-1][getRandom(0,2)]
    let mid
    let end
    if(getRandom(0,1)) {
      mid = extraInfo.businessCategory
      end = randomArr(businessSuffixes)
    } else {
      mid = randomArr(barAdjectives)
      end = randomArr(barSuffixes)
    }
    const title = `${adj} ${mid} ${end}`
    const post = {
      overall: rating,
      food: Math.min(Math.max(rating + getRandom(-1, 1), 1), 5),
      service: Math.min(Math.max(rating + getRandom(-1, 1), 1), 5),
      ambience: Math.min(Math.max(rating + getRandom(-1, 1), 1), 5),
      value: Math.min(Math.max(rating + getRandom(-1, 1), 1), 5),
      userId,
      barId:id,
      review: title
    }
    posts.push(post)
  }

  const finalObj = { businessInfo, images, extraInfo, posts }
  // console.log(finalObj)
  console.log(`${finalObj.businessInfo.name} : (${id}/50)`)

  return finalObj
}

// console.log(generateCatPost(5))




const writeIt = async () => {
    users = await makeUsers()
    let data = []
    for(let i = 1; i <=50; i++) {
        const val = await generateBar(i)
        data.push(val)
    }
    let businessSeeder = []
    let postSeeder = []
    let imageSeeder = []
    data.forEach((el) => {
       businessSeeder.push(el.businessInfo)
       postSeeder.push(...el.posts)
       imageSeeder.push(...el.images)
    })

    fs.writeFileSync('./seed-data.json', JSON.stringify({businessSeeder, postSeeder, imageSeeder, userSeeder: users}))
}

const writeItTest = async () => {
  users = await makeUsers()

  fs.writeFileSync('./seed-data.json', JSON.stringify({userSeeder: users}))
}

writeIt()
