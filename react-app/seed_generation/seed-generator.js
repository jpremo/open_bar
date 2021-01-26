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

const makeUsers = async () => {
  const users = []
  for(let i = 0; i<100; i++) {
      const profileImage = faker.image.imageUrl()
      users.push({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          profileImage
      })
  }
  return users
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
  if(data) return data.meals[0].strDrinkThumb
  return "https://www.thecocktaildb.com/images/media/drink/iuwi6h1504735724.jpg"
}

let postNumber = 100;

const generateCatPost = async (id) => {
  const breed = await getCatBreed()
  const images = []
  const imNum = getRandom(1, 5)
  const catAdjectives = ['Kitty Cat', 'Chonkzilla', 'Floofykin', 'Meowy Meowy Cat', 'Cat', 'Kitten']
  const catPrefixes = ['Purry', 'Happy', 'Lazy', 'Goofy', 'Funny', 'Silly', 'Adorable', 'Cute']
  for (let i = 0; i < imNum; i++) {
    const url = await getCatImage(breed.id)
    images.push({url, title:`${randomArr(catPrefixes)} ${randomArr(catAdjectives)}`, locationId:id, userId:2})
  }

  const catRelated = ['Kitty', 'Cat', 'Chonker', 'Meowser', 'Catnip', 'Purr Purr']
  const addressSuffix = ['Ln.', 'St.', 'Ct.', 'Blvd.', 'Rd.']
  const businessArr = ['Pizzeria', 'Ice Cream Parlor', 'Repairs', 'Auto Dealer', 'Restaurant', 'Lawn Care']
  let extraInfo = {
    businessCategory: randomArr(businessArr),
    catbreed: breed
  }
  const businessInfo = {
    userId: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    address: `${getRandom(100, 10000)} ${randomArr(catRelated)} ${randomArr(addressSuffix)}`,
    name: `${randomArr(catRelated)} ${extraInfo.businessCategory}`,
    businessCategory: null,
    petCategory: null,
    coordinates: JSON.stringify({ lat: getRandom(392629, 393201) / 10000, lng: getRandom(-767587, -764449) / 10000, zoom: getRandom(12, 18) })
  }

  const postNum = getRandom(1, 25)
  const posts = []
  const adjectives = [['Awful', 'Abysmal', 'Terrible'], ['Bad', 'Lacking', 'Not-Fun'], ['Mediocre', 'Average', 'Solid'],
['Great', 'Nice', 'Good'], ['Fantastic', 'Exquisite', 'Divine']]
  const catSuffixes = ['Here!', 'Alert', 'Resides Here', 'Floofs about this place']
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
      mid = randomArr(catAdjectives)
      end = randomArr(catSuffixes)
    }
    const title = `${adj} ${mid} ${end}`
    const post = {
      title,
      userId,
      rating,
      locationId:id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    }
    posts.push(post)
    postNumber++

    const imNum = getRandom(1, 5)

    for (let i = 0; i < imNum; i++) {
      const url = await getCatImage(breed.id)
      const title = `${randomArr(catPrefixes)} ${randomArr(catAdjectives)}`
      images.push({url, title, locationId:id, userId})
    }
  }

  const averageReview = posts.reduce((acc,el) => acc+el.rating, 0)/posts.length
  businessInfo.averageRating = averageReview;
  businessInfo.reviewNumber = posts.length;
  const finalObj = { businessInfo, images, extraInfo, posts }
//   console.log(finalObj)
  return finalObj
}

// console.log(generateCatPost(5))




const writeIt = async () => {
    users = await makeUsers()
    let data = []
    for(let i = 1; i <=50; i++) {
        const val = await generateCatPost(i)
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

writeItTest()
