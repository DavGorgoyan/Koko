export const possibleFiles = { 
    services: [{ name: `image`, maxCount:1 }, { name: `price_list`, maxCount:1 }],
    team: [ { name: `image`, maxCount: 1 }, { name: `certificates` } ],
    courses: [{ name: `image`, maxCount: 1 }, { name: `backdrop_image`, maxCount: 1 }]
} 
const types = { 
    gallery: { media: `image/video` },
    image: { forAll: `allow`, type: `image`  }
}


export default types; 
